import express from "express";
import Contact from "../models/contacts.models.js";
const router = express.Router();

router.get('/contact', async (req, res) => {

    const contactData = await Contact.find()
    // res.send(contactData);
    res.render('contact', { contacts: contactData });
});

router.get('/show-contact/:id', async (req, res) => {

    const contactData = await Contact.findById({ _id: req.params.id })
    // res.send(contactData);
    res.render('show', { contacts: contactData });
});

router.get('/add-contact', (req, res) => {
    res.render('add');
});

router.post('/add-contact', async (req, res) => {

    // const contactData = await Contact.insertOne({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone, address: req.body.address });
    const contactData = await Contact.create(req.body);
    res.redirect('/contact')
});
router.get('/update-contact/:id', async (req, res) => {
    const contactData = await Contact.findById({ _id: req.params.id })
    res.render('update', { contacts: contactData });
});




router.post('/update-contact/:id', async (req, res) => {

    await Contact.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.redirect('/contact')
});


router.get('/delete-contact/:id', async (req, res) => {
    await Contact.findByIdAndDelete({ _id: req.params.id })
    res.redirect('/contact')
});

export default router;