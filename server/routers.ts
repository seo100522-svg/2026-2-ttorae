import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createApplication, createScaleResponse, getAllApplications } from "./db";

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
          scaleResponses: z.record(z.string(), z.number()).optional(),
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
          grade: input.grade,
          nationalityType: input.nationalityType,
          nationality: input.nationality || null,
          applicationType: input.applicationType,
          counselorName: input.counselorName || null,
          agreedSchedule: input.agreedSchedule || null,
          availableTimes: input.availableTimes ? JSON.stringify(input.availableTimes) : null,
          topics: JSON.stringify(input.topics),
          storyDetails: input.additionalMessage || null,
          status: "pending" as const,
        };

        const result = await createApplication(applicationData);
        const applicationId = result.insertId || result;
        
        // Save AUCCQ scale responses if provided
        if (input.scaleResponses && Object.keys(input.scaleResponses).length > 0) {
          const responses = input.scaleResponses as Record<string, number>;
          await createScaleResponse({
            applicationId: applicationId as number,
            q1: (responses["1"] || responses[1]) as number || 0,
            q2: (responses["2"] || responses[2]) as number || 0,
            q3: (responses["3"] || responses[3]) as number || 0,
            q4: (responses["4"] || responses[4]) as number || 0,
            q5: (responses["5"] || responses[5]) as number || 0,
            q6: (responses["6"] || responses[6]) as number || 0,
            q7: (responses["7"] || responses[7]) as number || 0,
            q8: (responses["8"] || responses[8]) as number || 0,
            q9: (responses["9"] || responses[9]) as number || 0,
            q10: (responses["10"] || responses[10]) as number || 0,
            q11: (responses["11"] || responses[11]) as number || 0,
            q12: (responses["12"] || responses[12]) as number || 0,
            q13: (responses["13"] || responses[13]) as number || 0,
            q14: (responses["14"] || responses[14]) as number || 0,
            q15: (responses["15"] || responses[15]) as number || 0,
            q16: (responses["16"] || responses[16]) as number || 0,
            q17: (responses["17"] || responses[17]) as number || 0,
            q18: (responses["18"] || responses[18]) as number || 0,
            q19: (responses["19"] || responses[19]) as number || 0,
            q20: (responses["20"] || responses[20]) as number || 0,
          });
        }
        
        return {
          success: true,
          applicationId: applicationId,
          message: "Application submitted successfully",
        };
      }),
    getAll: publicProcedure.query(async () => {
      return await getAllApplications();
    }),
    exportToExcel: publicProcedure.query(async () => {
      const applications = await getAllApplications();
      return applications;
    }),
  }),
});

export type AppRouter = typeof appRouter;
