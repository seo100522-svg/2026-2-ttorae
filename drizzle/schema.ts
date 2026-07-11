import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * 또래친구 신청 테이블
 * 학생의 신청 정보를 저장합니다.
 */
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  // 기본 정보
  studentName: varchar("studentName", { length: 100 }).notNull(),
  studentId: varchar("studentId", { length: 20 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  college: varchar("college", { length: 100 }).notNull(),
  department: varchar("department", { length: 100 }).notNull(),
  nationalityType: mysqlEnum("nationalityType", ["local", "international"]).notNull(),
  nationality: varchar("nationality", { length: 100 }),
  // 상담 주제 (JSON 배열로 저장)
  topics: text("topics").notNull(), // JSON string
  // 상담 내용
  storyDetails: text("storyDetails"),
  // 상태
  status: mysqlEnum("status", ["pending", "matched", "cancelled"]).default("pending").notNull(),
  // 타임스탐프
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

/**
 * 척도 검사 응답 테이블
 * 대학생활적응 검사의 5점 리커트 척도 응답을 저장합니다.
 */
export const scaleResponses = mysqlTable("scaleResponses", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("applicationId").notNull(),
  // 5가지 척도 항목 (각 1~5점)
  q1: int("q1").notNull(), // 대학교 분위기 적응
  q2: int("q2").notNull(), // 고민 나눌 친구
  q3: int("q3").notNull(), // 학업 관심 및 만족
  q4: int("q4").notNull(), // 캠퍼스 활동 참여
  q5: int("q5").notNull(), // 전반적 대학생활 만족도
  // 타임스탐프
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ScaleResponse = typeof scaleResponses.$inferSelect;
export type InsertScaleResponse = typeof scaleResponses.$inferInsert;