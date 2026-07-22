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
  gender: mysqlEnum("gender", ["male", "female", "other"]),
  grade: varchar("grade", { length: 50 }),
  // 신청 유형 및 상담자 정보
  applicationType: mysqlEnum("applicationType", ["pre_arranged", "direct"]).notNull(),
  counselorName: varchar("counselorName", { length: 100 }),
  agreedSchedule: varchar("agreedSchedule", { length: 255 }),
  availableTimes: text("availableTimes"), // JSON array string
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
 * 대학생활적응 검사의 20문항 리커트 척도 응답을 저장합니다.
 */
export const scaleResponses = mysqlTable("scaleResponses", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("applicationId").notNull(),
  // 20개 AUCCQ 척도 항목 (각 1~5점)
  q1: int("q1").notNull(),
  q2: int("q2").notNull(),
  q3: int("q3").notNull(),
  q4: int("q4").notNull(),
  q5: int("q5").notNull(),
  q6: int("q6").notNull(),
  q7: int("q7").notNull(),
  q8: int("q8").notNull(),
  q9: int("q9").notNull(),
  q10: int("q10").notNull(),
  q11: int("q11").notNull(),
  q12: int("q12").notNull(),
  q13: int("q13").notNull(),
  q14: int("q14").notNull(),
  q15: int("q15").notNull(),
  q16: int("q16").notNull(),
  q17: int("q17").notNull(),
  q18: int("q18").notNull(),
  q19: int("q19").notNull(),
  q20: int("q20").notNull(),
  // 타임스탐프
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ScaleResponse = typeof scaleResponses.$inferSelect;
export type InsertScaleResponse = typeof scaleResponses.$inferInsert;
