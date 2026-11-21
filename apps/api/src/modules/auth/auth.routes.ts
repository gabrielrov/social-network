import { login, loginAsGuest, register } from '@/modules/auth/auth.controller'
import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/guest', loginAsGuest)
authRouter.post('/register', register)
