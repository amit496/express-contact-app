import express from "express";

const app = express();

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.send('<h1>Home</h1>');
});


app.get('/profile', (req, res) => {
    res.render('user-profile');
});

app.get('/form', (req, res) => {
    res.render('form', {message: null});
});

app.post('/form-submit', (req, res) => {

    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(name);
    console.log(email);
    console.log(password);

    const message = `Hello ${name}, Your registration is successful.`;

    res.render("form", {message: message});
});

app.get('/about', (req, res) => {
    res.render('about', {title : "About Us", Message : "This is the about us page.", status : "ture"});
});

app.listen(3000, () => {
    console.log("Server started successfully.");
});