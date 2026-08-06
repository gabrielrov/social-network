import 'dotenv/config'
import env from '@/config/env'
import router from '@/routes'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`)
})
