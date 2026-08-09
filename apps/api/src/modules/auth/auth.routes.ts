import { login, register } from '@/modules/auth/auth.controller'
import { Router } from 'express'

const router = Router()

router.post('/login', login)
router.post('/register', register)

export default router
