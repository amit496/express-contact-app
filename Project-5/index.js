import express from "express";

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();

});


app.get('/', (req, res) => {
    res.send('<h1>Home</h1>');
});


app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
});

app.listen(3000, () => {
    console.log("Server started successfully.");
});