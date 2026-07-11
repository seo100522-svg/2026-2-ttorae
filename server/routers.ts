import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getApplications, getApplicationById, getScaleResponse, createApplication, createScaleResponse, updateApplicationStatus } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  applications: router({
    /**
     * 또래친구 신청 목록 조회 (관리자 전용)
     */
    list: publicProcedure.query(async () => {
      return getApplications(100, 0);
    }),
    /**
     * 또래친구 신청 조회 (상세 정보)
     */
    getById: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "id" in val) {
          return { id: Number((val as { id: unknown }).id) };
        }
        throw new Error("Invalid input");
      })
      .query(async ({ input }) => {
        const app = await getApplicationById(input.id);
        if (!app) return null;
        const scale = await getScaleResponse(input.id);
        return { ...app, scale };
      }),
    /**
     * 또래친구 신청 생성
     */
    create: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null) {
          const data = val as Record<string, unknown>;
          return {
            studentName: String(data.studentName || ""),
            studentId: String(data.studentId || ""),
            phoneNumber: String(data.phoneNumber || ""),
            college: String(data.college || ""),
            department: String(data.department || ""),
            nationalityType: (data.nationalityType === "international" ? "international" : "local") as "local" | "international",
            nationality: data.nationality ? String(data.nationality) : undefined,
            topics: String(data.topics || "[]"),
            storyDetails: data.storyDetails ? String(data.storyDetails) : undefined,
            scaleResponses: data.scaleResponses as Record<string, number> | undefined,
          };
        }
        throw new Error("Invalid input");
      })
      .mutation(async ({ input }) => {
        const result = await createApplication({
          studentName: input.studentName,
          studentId: input.studentId,
          phoneNumber: input.phoneNumber,
          college: input.college,
          department: input.department,
          nationalityType: input.nationalityType,
          nationality: input.nationality,
          topics: input.topics,
          storyDetails: input.storyDetails,
        });
        
        // 척도 검사 응답 저장
        if (input.scaleResponses && result.insertId) {
          await createScaleResponse({
            applicationId: Number(result.insertId),
            q1: input.scaleResponses.q1 || 0,
            q2: input.scaleResponses.q2 || 0,
            q3: input.scaleResponses.q3 || 0,
            q4: input.scaleResponses.q4 || 0,
            q5: input.scaleResponses.q5 || 0,
          });
        }
        
        return { success: true, id: result.insertId };
      }),
    /**
     * 또래친구 신청 상태 업데이트
     */
    updateStatus: publicProcedure
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null) {
          const data = val as Record<string, unknown>;
          return {
            id: Number(data.id || 0),
            status: (data.status === "matched" || data.status === "cancelled" ? data.status : "pending") as "pending" | "matched" | "cancelled",
          };
        }
        throw new Error("Invalid input");
      })
      .mutation(async ({ input }) => {
        await updateApplicationStatus(input.id, input.status);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
