import { sql } from 'drizzle-orm';
import { boolean, check, date, decimal, integer, pgEnum, pgTable, smallint, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userGender = pgEnum('gender', ['man', 'woman', 'unknown']);

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  email: varchar('email', { length: 128 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  phoneNumber: varchar('phone_number', { length: 11 }),
  fullName: varchar('full_name', { length: 128 }),
  name: text('name').notNull(),
  image: text('image'),
  avatarUrl: varchar('avatar_url', { length: 512 }),
  height: decimal('height'),
  gender: userGender('gender').default('unknown'),
  birthday: date('birthday'),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  name: varchar('name', { length: 128 }).unique(),
});

export const coaches = pgTable(
  'coaches',
  {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    planPrice: integer('plan_price').notNull(),
    biography: varchar('biography', { length: 512 }).notNull(),
    description: varchar('description', { length: 512 }).notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id),
  },
  table => [check('check_price', sql`${table.planPrice} >= 20000`)],
);

export const exerciseType = pgEnum('exercise_type', ['reps', 'time']);

export const exercises = pgTable('exercises', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  name: varchar('name', { length: 128 }).notNull(),
  imageUrl: varchar('image_url', { length: 512 }).notNull(),
  description: varchar('description', { length: 512 }).notNull(),
  type: exerciseType('type').notNull(),
  category: varchar('category', { length: 128 }).array().default([]),
});

export const planRequests = pgTable(
  'plan_requests',
  {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    weight: smallint('weight').notNull(),
    numberOfSessions: smallint('number_of_sessions').notNull(),
    description: varchar('description', { length: 512 }).notNull(),
    leftSidePhoto: varchar('left_side_photo', { length: 512 }).notNull(),
    rightSidePhoto: varchar('right_side_photo', { length: 512 }).notNull(),
    frontSidePhoto: varchar('front_side_photo', { length: 512 }).notNull(),
    backSidePhoto: varchar('back_side_photo', { length: 512 }).notNull(),
  },
  table => [
    check('check_number_of_sessions', sql`${table.numberOfSessions} >= 1`),
    check('check_min_weight', sql`${table.weight} > 10`),
    check('check_max_weight', sql`${table.weight} < 200`),
  ],
);

export const planStatus = pgEnum('plan_status', ['pending', 'complete']);

export const plans = pgTable(
  'plans',
  {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    coachId: text('coach_id')
      .notNull()
      .references(() => coaches.id),
    customerId: text('customer_id')
      .notNull()
      .references(() => users.id),
    requestId: text('request_id')
      .notNull()
      .references(() => planRequests.id),
    price: integer('price').notNull(),
    status: planStatus('status').notNull(),
  },
  table => [check('check_price', sql`${table.price} >= 20000`)],
);

export const planSessions = pgTable('plan_sessions', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  planId: text('plan_id')
    .notNull()
    .references(() => plans.id),
  title: varchar('title', { length: 128 }).notNull(),
  description: varchar('description').notNull(),
});

export const sessionExercises = pgTable('session_exercises', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  sessionId: text('session_id')
    .notNull()
    .references(() => planSessions.id),
  exerciseId: text('exercise_id')
    .notNull()
    .references(() => exercises.id),
  notes: varchar('notes', { length: 512 }).notNull(),
});

export const exerciseSetsType = pgEnum('exercise_sets_type', ['time', 'drop', 'normal', 'range']);

export const exerciseSets = pgTable('exercise_sets', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  sessionExerciseId: text('session_exercise_id')
    .notNull()
    .references(() => sessionExercises.id),
  type: exerciseSetsType('type').notNull(),
  order: integer('order').notNull(),
  value: integer('value').notNull(),
});

export const paymentStatus = pgEnum('payment_status', ['pending', 'complete']);

export const payments = pgTable('payments', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  planId: text('plan_id')
    .notNull()
    .references(() => plans.id),
  status: paymentStatus('status').notNull(),
});

export const schema = {
  users,
  sessions,
  accounts,
  verifications,
  organizations,
  coaches,
  exercises,
  planRequests,
  plans,
  planSessions,
  exerciseSets,
  sessionExercises,
  payments,
};
