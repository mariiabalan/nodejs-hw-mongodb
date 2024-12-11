import { ContactsCollection } from '../models/Contact.js';
import createError from 'http-errors';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    throw createError(500, 'Failed to fetch contacts');
  }
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (data) => {
  try {
    console.log('Received data for creating contact:', data); // Логування вхідних даних
    const newContact = await ContactsCollection.create(data);
    console.log('New contact created:', newContact); // Логування створеного контакту
    return newContact;
  } catch (error) {
    console.error('Error creating contact:', error.message); // Логування помилки
    throw createError(500, 'Failed to create contact');
  }
};

export const updateContact = async (contactId, data) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    data,
    { new: true },
  );
  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
  return deletedContact;
};
