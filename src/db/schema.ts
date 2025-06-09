import { relations, sql } from 'drizzle-orm';
import { bigint, check, date, integer, pgEnum, pgTable, smallint, timestamp, varchar } from 'drizzle-orm/pg-core';

const userGender = pgEnum('gender', ['man', 'woman', 'unknown']);

export const usersTable = pgTable('users', {
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp({ withTimezone: true }).notNull(),
  email: varchar().notNull().unique(),
  phone: varchar({ length: 11 }).unique(),
  full_name: varchar({ length: 128 }).notNull(),
  avatar_url: varchar({ length: 512 }).notNull(),
  height: smallint().notNull(),
  gender: userGender().default('unknown'),
  birthday: date().notNull(),
});

export const organizationsTable = pgTable('organizations', {
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp({ withTimezone: true }).notNull(),
  name: varchar({ length: 128 }).unique(),
});

export const coachesTable = pgTable(
  'coaches',
  {
    id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    deleted_at: timestamp({ withTimezone: true }).notNull(),
    plan_price: integer().notNull(),
    biography: varchar({ length: 512 }).notNull(),
    description: varchar({ length: 512 }).notNull(),
    user_id: bigint({ mode: 'bigint' }).notNull(),
    organization_id: bigint({ mode: 'bigint' }).notNull(),
  },
  table => [check('check_price', sql`${table.plan_price} >= 20000`)],
);

export const planRequestsTable = pgTable(
  'plan_requests',
  {
    id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    deleted_at: timestamp({ withTimezone: true }).notNull(),
    weight: smallint().notNull(),
    number_of_sessions: smallint().notNull(),
    description: varchar({ length: 512 }).notNull(),
    left_side_photo: varchar({ length: 512 }).notNull(),
    right_side_photo: varchar({ length: 512 }).notNull(),
    front_side_photo: varchar({ length: 512 }).notNull(),
    back_side_photo: varchar({ length: 512 }).notNull(),
  },
  table => [
    check('check_number_of_sessions', sql`${table.number_of_sessions} >= 1`),
    check('check_min_weight', sql`${table.weight} > 10`),
    check('check_max_weight', sql`${table.weight} < 200`),
  ],
);

const planStatus = pgEnum('plan_status', ['pending', 'complete']);

export const plansTable = pgTable(
  'plans',
  {
    id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    deleted_at: timestamp({ withTimezone: true }).notNull(),
    coach_id: bigint({ mode: 'bigint' }).notNull(),
    customer_id: bigint({ mode: 'bigint' }).notNull(),
    request_id: bigint({ mode: 'bigint' }).notNull(),
    price: integer().notNull(),
    status: planStatus().notNull(),
  },
  table => [check('check_price', sql`${table.price} >= 20000`)],
);

export const planSessionsTable = pgTable('plan_sessions', {
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp({ withTimezone: true }).notNull(),
  plan_id: bigint({ mode: 'bigint' }).notNull(),
  title: varchar({ length: 128 }).notNull(),
  description: varchar().notNull(),
});

export const planSessionExercisesTable = pgTable('plan_session_exercises', {
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp({ withTimezone: true }).notNull(),
  plan_session_id: bigint({ mode: 'bigint' }).notNull(),
  exercise_id: bigint({ mode: 'bigint' }).notNull(),
  notes: varchar({ length: 512 }).notNull(),
});

const planSessionExerciseSetsType = pgEnum('plan_session_exercise_sets_type', ['time', 'drop', 'normal', 'range']);

export const planSessionExerciseSetsTable = pgTable('plan_session_exercise_sets', {
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp({ withTimezone: true }).notNull(),
  plan_session_exercise_id: bigint({ mode: 'bigint' }).notNull(),
  type: planSessionExerciseSetsType().notNull(),
  order: integer().notNull(),
  value: integer().notNull(),
});

const paymentStatus = pgEnum('plan_status', ['pending', 'complete']);

export const paymentsTable = pgTable('payments', {
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp({ withTimezone: true }).notNull(),
  plan_id: bigint({ mode: 'bigint' }).notNull(),
  status: paymentStatus().notNull(),
});

const exerciseType = pgEnum('exercise_type', ['reps', 'time']);

export const exercisesTable = pgTable('exercises', {
  id: bigint({ mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp({ withTimezone: true }).notNull(),
  name: varchar({ length: 128 }).notNull(),
  image_url: varchar({ length: 512 }).notNull(),
  description: varchar({ length: 512 }).notNull(),
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
