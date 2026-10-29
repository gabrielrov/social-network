import { authenticate } from '@/middleware/auth'
import {
  getUserByToken,
  getUserByUsername,
} from '@/modules/users/users.controller'
import { Router } from 'express'

export const usersRouter = Router()

usersRouter.get('/me', authenticate, getUserByToken)
usersRouter.get('/:username', getUserByUsername)
