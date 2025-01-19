import express from "express";
import db from "./config/db";

const app = express();
const port = 3000;
// Middleware to parse JSON request bodies

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
