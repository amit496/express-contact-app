import { error } from "console";
import express from "express";
import { body, validationResult } from "express-validator";
import multer, { MulterError } from "multer";
import path from "path";



const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },

    filename: (req, file, cb) => {
        const newFileName =
            Date.now() + path.extname(file.originalname);

        cb(null, newFileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cd(null, true)
    } else {
        cb(new Error('Invalid file type'))
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2 // 3 MB
    },
    fileFilter
});

// Validation Rules
const validation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("any")
        .withMessage("Please enter a valid phone number"),

    body("subject")
        .notEmpty()
        .withMessage("Subject is required")
        .isLength({ min: 5 })
        .withMessage("Subject must be at least 5 characters long"),

    body("message")
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 10 })
        .withMessage("Message must be at least 10 characters long"),
];

// Home Page
app.get("/", (req, res) => {
    res.render("form", {
        success: "",
        errors: [],
    });
});

// Handle Form Submission
app.post("/submit", validation, (req, res) => {
    const errors = validationResult(req);

    // Validation Failed
    if (!errors.isEmpty()) {
        return res.render("form", {
            success: "",
            errors: errors.array(),
        });
    }

    // Validation Passed
    const { name, email, phone, subject, message } = req.body;

    console.log({
        name,
        email,
        phone,
        subject,
        message,
    });

    res.render("form", {
        success: "Your message has been submitted successfully!",
        errors: [],
    });
});


app.get('/file', (req, res) => {
    res.render('file');
});

app.post('/submit/file', upload.single('file'), (req, res) => {

    if (!req.file || req.file.length == 0) {
        return res.status(400).send('No upload file.')
    }

    res.send(req.file);
}, (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).send('Multer MulterError : ' + error.message)
    } else if (error) {
        return res.status(500).send('Somthing went wrong!');
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});