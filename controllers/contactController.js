//install express-event-handler to use the below thing
const asyncHandler = require('express-async-handler');

// import this to apply CRUD operations
const Contact = require('../models/contactModel');
const contactModel = require('../models/contactModel');

// @description Get all contacts
// @route GET /api/contacts
// @acess public

// we will not need to write try catch blocks manually, whenever there is need
// asyncHandler will manage it
const getAllContact = asyncHandler( async(req, res) => {
    const contacts = await Contact.find();
    res.status(200).send(contacts)
});

// @description create contacts
// @route POST /api/contacts
// @acess public

const createContact = asyncHandler( async(req, res) => {
    console.log("the req body is", req.body);
    const {name,email,phone} = req.body;
    if(!name || !phone || !email){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    });

    res.status(201).send(contact);
})


// @description Get Contact
// @route PUT /api/contacts/:id
// @acess public

const getContact = asyncHandler( async(req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contacts);
})


// @description Update contacts
// @route PUT /api/contacts/:id
// @acess public

const updateContact = asyncHandler( async(req, res) => {
    const contacts = await Contact.findById(req.params.id);
    // console.log(contacts)
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new : true,
        }
    );
    res.status(200).json(updateContact);
});

// @description delete contacts
// @route DELETE /api/contacts/:id
// @acess public

const deleteContact = asyncHandler( async(req, res) => {
    console.log("inside delete");
    console.log(req.params.id);
    const contacts = await Contact.findById(req.params.id);
    console.log(JSON.stringify(contacts))
    if(!contacts){
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contacts);
});



module.exports = { getAllContact, 
    createContact, 
    deleteContact, 
    getContact, 
    updateContact 
};