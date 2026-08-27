import { authenticate } from '@/middleware/auth'
import { getCurrent } from '@/modules/users/users.controller'
import { Router } from 'express'

export const usersRouter = Router()

usersRouter.get('/me', authenticate, getCurrent)
