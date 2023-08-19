const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");

//?desc   Get all contacts
//?route  GET /api/contacts
//?access private
exports.getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//?desc Get single contacts
//?route GET /api/contacts/:id
//?access private
exports.getContact = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  const contact = await Contact.findById(req.params.id);
  // console.log(contact);
  res.status(200).json(contact);
});

//?desc create new contacts
//?route POST /api/contacts
//?access private
exports.createContacts = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//?desc update  contacts
//?route PUT /api/contacts/:id
//?access private
exports.updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("unauthorized to update");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedContact);
});

//?desc delete contacts
//?route DELETE /api/contacts/:id
//?access public
exports.deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("unauthorized to delete");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});
