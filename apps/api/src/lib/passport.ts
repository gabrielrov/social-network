import env from '@/config/env'
import { prisma } from '@/lib/prisma'
import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwtSecret,
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
        })

        if (!user) return done(null, false)

        done(null, user)
      } catch (err) {
        done(err)
      }
    },
  ),
)

export { passport }
