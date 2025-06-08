import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

const commonFields = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp({ withTimezone: true }).notNull(),
};

export const usersTable = pgTable('users', {
  ...commonFields,
  email: varchar().notNull().unique(),
  phone: varchar().unique().default(''),
  full_name: varchar().notNull(),
  avatar_url: varchar().notNull(),
  height: integer().notNull(),
  gender: integer().notNull(),
  birthday: timestamp({ withTimezone: true }).notNull(),
});

export const organizationsTable = pgTable('organizations', {
  ...commonFields,
  name: varchar(),
});

export const coachesTable = pgTable('coaches', {
  ...commonFields,
  plan_price: varchar().notNull(),
  biography: varchar().notNull(),
  description: varchar().notNull(),
  user_id: integer().notNull(), // relation
  organization_id: integer().notNull(), // relation
});

export const planRequestsTable = pgTable('plan_requests', {
  ...commonFields,
  number_of_sessions: integer().notNull(),
  description: varchar().notNull(),
  left_side_photo: varchar().notNull(),
  right_side_photo: varchar().notNull(),
  front_side_photo: varchar().notNull(),
  back_side_photo: varchar().notNull(),
});

export const plansTable = pgTable('plans', {
  ...commonFields,
  coach_id: integer().notNull(), // relation
  customer_id: integer().notNull(), // relation
  request_id: integer().notNull(), // relation
  price: integer().notNull(),
  status: varchar().notNull(), // published, pending-payment, draft or ...
});

export const planSessionsTable = pgTable('plan_sessions', {
  ...commonFields,
  plan_id: integer().notNull(), // relation
  title: varchar().notNull(),
  description: varchar().notNull(),
});

export const planSessionExercisesTable = pgTable('plan_session_exercises', {
  ...commonFields,
  plan_session_id: integer().notNull(), // relation
  exercise_id: integer().notNull(), // relation
  notes: varchar().notNull(),
});

const planSessionExerciseSetsType = pgEnum('type', ['time', 'drop', 'normal', 'range']);
export const planSessionExerciseSetsTable = pgTable('plan-session-exercise-sets', {
  ...commonFields,
  plan_session_exercise_id: integer().notNull(), // relation
  type: planSessionExerciseSetsType(),
  order: integer().notNull(),
  value: integer().notNull(),
});

export const paymentsTable = pgTable('payments', {
  ...commonFields,
  plan_id: integer().notNull(), // relation
  // status ??
});

const exerciseType = pgEnum('type', ['reps', 'time']);
export const exercisesTable = pgTable('exercises', {
  ...commonFields,
  name: varchar().notNull(),
  image_url: varchar().notNull(),
  description: varchar().notNull(),
  type: exerciseType().notNull(),
});

export const coachesRelations = relations(coachesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [coachesTable.user_id],
    references: [usersTable.id],
  }),
  organization: one(organizationsTable, {
    fields: [coachesTable.organization_id],
    references: [organizationsTable.id],
  }),
}));

export const plansRelations = relations(plansTable, ({ one }) => ({
  coach: one(coachesTable, {
    fields: [plansTable.coach_id],
    references: [coachesTable.id],
  }),
  customer: one(usersTable, {
    fields: [plansTable.customer_id],
    references: [usersTable.id],
  }),
  request: one(planRequestsTable, {
    fields: [plansTable.request_id],
    references: [planRequestsTable.id],
  }),
}));

export const planSessionsRelations = relations(planSessionsTable, ({ one }) => ({
  plan: one(plansTable, {
    fields: [planSessionsTable.plan_id],
    references: [plansTable.id],
  }),
}));

export const planSessionExercisesRelations = relations(planSessionExercisesTable, ({ one }) => ({
  plan_session: one(planSessionsTable, {
    fields: [planSessionExercisesTable.plan_session_id],
    references: [planSessionsTable.id],
  }),
  exercise: one(exercisesTable, {
    fields: [planSessionExercisesTable.exercise_id],
    references: [exercisesTable.id],
  }),
}));

export const planSessionExerciseSetsRelations = relations(planSessionExerciseSetsTable, ({ one }) => ({
  plan_session_exercise: one(planSessionExercisesTable, {
    fields: [planSessionExerciseSetsTable.plan_session_exercise_id],
    references: [planSessionExercisesTable.id],
  }),
}));

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  plan: one(plansTable, {
    fields: [paymentsTable.plan_id],
    references: [plansTable.id],
  }),
}));
