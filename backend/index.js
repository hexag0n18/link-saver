import { connectDB } from './db/db.js'
import { PORT } from './config.js'
import app from './app.js'

connectDB()

const port = PORT

app.listen(port)
console.log('Server running in port', port)