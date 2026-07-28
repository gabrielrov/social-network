import 'dotenv/config'
import env from '@/config/env'
import router from '@/routes'
import express from 'express'

const app = express()

app.use('/api', router)

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`)
})
