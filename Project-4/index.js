import express from "express";
import connectDB from "./config/database.js";
import ContactRouter from "./routes/contacts.route.js";

const app = express();

connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", ContactRouter);

app.listen(3000, () => {
    console.log("Server started successfully.");
});