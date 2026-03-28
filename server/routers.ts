import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContactSubmission } from "./db";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
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

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email address"),
          phone: z.string().optional(),
          company: z.string().optional(),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        // Store in database
        await createContactSubmission({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone || null,
          company: input.company || null,
          message: input.message,
        });

        // Notify the project owner
        try {
          await notifyOwner({
            title: `New Contact Form Submission from ${input.fullName}`,
            content: [
              `**Name:** ${input.fullName}`,
              `**Email:** ${input.email}`,
              input.phone ? `**Phone:** ${input.phone}` : null,
              input.company ? `**Company:** ${input.company}` : null,
              `\n**Message:**\n${input.message}`,
            ]
              .filter(Boolean)
              .join("\n"),
          });
        } catch (err) {
          // Notification failure shouldn't block the submission
          console.warn("[Contact] Failed to notify owner:", err);
        }

        return { success: true, message: "Thank you for your message. We'll be in touch shortly." };
      }),
  }),
});

export type AppRouter = typeof appRouter;
