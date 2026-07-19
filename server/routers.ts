import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createApplication, createScaleResponse } from "./db";

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

  // Application router
  applications: router({
    create: publicProcedure
      .input(
        z.object({
          studentName: z.string().min(1),
          studentId: z.string().min(1),
          phoneNumber: z.string().min(1),
          college: z.string().min(1),
          department: z.string().min(1),
          gender: z.enum(["male", "female", "other"]),
          grade: z.string().min(1),
          nationalityType: z.enum(["local", "international"]),
          nationality: z.string().optional(),
          applicationType: z.enum(["pre_arranged", "direct"]),
          counselorName: z.string().optional(),
          agreedSchedule: z.string().optional(),
          availableTimes: z.array(z.object({
            day: z.string(),
            startTime: z.string(),
            endTime: z.string(),
          })).optional(),
          topics: z.array(z.string()),
          additionalMessage: z.string().optional(),
          agreePrivacy: z.boolean(),
          agreeConfidentiality: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        const applicationData = {
          studentName: input.studentName,
          studentId: input.studentId,
          phoneNumber: input.phoneNumber,
          college: input.college,
          department: input.department,
          gender: input.gender,
          nationalityType: input.nationalityType,
          nationality: input.nationality || null,
          topics: JSON.stringify(input.topics),
          storyDetails: input.additionalMessage || null,
          status: "pending" as const,
        };

        const result = await createApplication(applicationData);
        return {
          success: true,
          applicationId: result,
          message: "Application submitted successfully",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
