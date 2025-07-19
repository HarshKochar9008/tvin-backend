import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import notesRouter from "./routes/notes.js";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/notes', notesRouter);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;

// Always export the handler for serverless, but only use it if needed
export const handler = serverless(app);

// Start server for Render and local development
if (!process.env.SERVERLESS) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
