import express from "express";
import mongoose from 'mongoose';
import Contact from "./models/contacts.models.js";

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/contactus-crud').then(() => {
    console.log("Database connected successfully.");
}).catch((err) => {
    console.log(err);
});



app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/contact', async (req, res) => {

    const contactData = await Contact.find()
    // res.send(contactData);
    res.render('contact', { contacts: contactData });
});

app.get('/show-contact/:id', async (req, res) => {

    const contactData = await Contact.findById({ _id: req.params.id })
    // res.send(contactData);
    res.render('show', { contacts: contactData });
});

app.get('/add-contact', (req, res) => {
    res.render('add');
});

app.post('/add-contact', async (req, res) => {

    // const contactData = await Contact.insertOne({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone, address: req.body.address });
    const contactData = await Contact.create(req.body);
    res.redirect('/contact')
});
app.get('/update-contact/:id', async (req, res) => {
    const contactData = await Contact.findById({ _id: req.params.id })
    res.render('update', { contacts: contactData });
});




app.post('/update-contact/:id', async (req, res) => {

    await Contact.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.redirect('/contact')
});


app.get('/delete-contact/:id', async (req, res) => {
    await Contact.findByIdAndDelete({ _id: req.params.id })
    res.redirect('/contact')
});

app.listen(3000, () => {
    console.log("Server started successfully.");
});