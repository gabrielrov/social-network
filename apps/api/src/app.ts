import router from '@/routes'
import 'dotenv/config'
import express from 'express'

const app = express()

app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
