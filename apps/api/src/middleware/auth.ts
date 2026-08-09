import { passport } from '@/lib/passport'

export const authenticate = passport.authenticate('jwt', { session: false })
