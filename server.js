const express = require("express");
const router = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", router);
app.use("/api/user", userRouter);
app.use(errorHandler);
connectDB();
app.listen(PORT, () => {
  console.log(`server funning on port ${PORT}`);
});
