import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()  // Create an Express app instance
const port = process.env.PORT || 4000 // Define the port number (either from environment or default to 4000)

// Connect to the database and cloud storage
connectDB() // Establish MongoDB connection
connectCloudinary() // Connect to Cloudinary for media storage

// middlewares
app.use(express.json())

// CORS
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// Simple GET route to check if the API is working
app.get('/', (req, res)=> {
  res.send("API is working great... hurray:)") // Sends a message when accessing the root endpoint
})

// Start the server and listen for requests
app.listen(port, ()=> {
  console.log("server started", port) // Log a message indicating the server is running
})