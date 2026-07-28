import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("form");
});

// Handle form submission
app.post("/submit", (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    console.log({
        name,
        email,
        phone,
        subject,
        message
    });

    res.render("form", {
        success: "Your message has been submitted successfully!"
    });
});

app.listen(3000, () => {
    console.log("Server started successfully on http://localhost:3000");
});