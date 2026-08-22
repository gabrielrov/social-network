import { login, register } from '@/modules/auth/auth.controller'
import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
