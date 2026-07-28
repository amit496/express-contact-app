import express from "express";
import { getContacts, showContacts, addContacts, postContacts, updateContacts, postUpdateContacts, deleteContacts } from "../controller/contact.controller.js";

const router = express.Router();


router.get('/contact', getContacts);

router.get('/show-contact/:id', showContacts);

router.get('/add-contact', addContacts);

router.post('/add-contact', postContacts);


router.get('/update-contact/:id', updateContacts);




router.post('/update-contact/:id', postUpdateContacts);


router.get('/delete-contact/:id', deleteContacts);

export default router;