import Contact from "../models/contacts.models.js";

export const getContacts = async (req, res) => {

    const contactData = await Contact.find()
    // res.send(contactData);
    res.render('contact', { contacts: contactData });
}

export const showContacts = async (req, res) => {

    const contactData = await Contact.findById({ _id: req.params.id })
    // res.send(contactData);
    res.render('show', { contacts: contactData });
}

export const addContacts = (req, res) => {
    res.render('add');
}

export const postContacts = async (req, res) => {

    // const contactData = await Contact.insertOne({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, phone: req.body.phone, address: req.body.address });
    const contactData = await Contact.create(req.body);
    res.redirect('/contact')
}

export const updateContacts = async (req, res) => {
    const contactData = await Contact.findById({ _id: req.params.id })
    res.render('update', { contacts: contactData });
}

export const postUpdateContacts = async (req, res) => {

    await Contact.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.redirect('/contact')
}

export const deleteContacts = async (req, res) => {
    await Contact.findByIdAndDelete({ _id: req.params.id })
    res.redirect('/contact')
}