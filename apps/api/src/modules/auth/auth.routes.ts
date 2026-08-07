import { login } from '@/modules/auth/auth.controller'
import { Router } from 'express'

const router = Router()

router.post('/login', login)

// TODO:
// router.post('/register')

export default router
