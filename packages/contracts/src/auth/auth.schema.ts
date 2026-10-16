import * as z from 'zod'

export const loginSchema = z.object({
  username: z.string().nonempty().trim(),
  password: z.string().nonempty().trim(),
})

export type LoginDTO = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    username: z.string().nonempty().trim(),
    firstName: z.string().nonempty().trim(),
    surname: z.string().nonempty().trim(),

    password: z.string().min(6),
    confirmPassword: z.string().nonempty(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'password_mismatch' as never,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export type RegisterDTO = z.infer<typeof registerSchema>
