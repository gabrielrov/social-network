import env from '@/config/env'
import router from '@/routes'
import { errorHandler } from '@/middleware/error'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`)
})
