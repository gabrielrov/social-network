import { Router } from 'express'
import { authRouter } from '@/modules/auth/auth.routes'

export const routes = Router()

routes.use('/auth', authRouter)
