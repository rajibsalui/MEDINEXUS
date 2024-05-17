import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import hospitalRoute from "./routes/hospitalRoute.js"
import medicroutes from "./routes/medicRoutes.js"
import hospitaldoctorRoute from "./routes/hospitaldoctorRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"




// ap congig
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

 //db connection
connectDB();


app.use("/api/user", userRouter)
app.use("/api/hospital_doctor", hospitaldoctorRoute)
app.use("/api/medicine", medicroutes)
app.use("/api/hospital", hospitalRoute)
app.use("/images", express.static('uploads'))

app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})