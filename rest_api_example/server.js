import express from "express";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./src/user_routes.js";
import { noteRouter } from "./src/note_routes.js";

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', userRouter)
app.use('/api/v1', noteRouter)

app.use(express.static('public'))

app.listen(3000, () => {
    console.log('HTTP Server is running on port http://localhost:3000')
})