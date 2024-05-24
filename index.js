import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js"
import { moviesRouter } from "./routes/movies.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(json())
app.use(corsMiddleware())
app.use('/movies', moviesRouter)

app.listen(PORT, ()=>{
  console.log(`server listening on port ${PORT}`)
})