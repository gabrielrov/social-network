import 'dotenv/config'

export const envWrapper = {
  port: process.env.PORT!,
  jwtSecret: process.env.JWT_SECRET!,
  databaseURL: process.env.DATABASE_URL!,
}
