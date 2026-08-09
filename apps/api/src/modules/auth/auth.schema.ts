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

    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterDTO = z.infer<typeof registerSchema>
