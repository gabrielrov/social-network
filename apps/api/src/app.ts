import { envWrapper } from '@/config/env'
import { routes } from '@/routes'
import { errorHandler } from '@/middleware/error'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.use(errorHandler)

app.listen(envWrapper.port, () => {
  console.log(`Server running on http://localhost:${envWrapper.port}`)
})
