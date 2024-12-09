import fs from 'fs';
import path from 'path';
import { Contact } from './models/Contact';
import { initMongoConnection } from './db/initMongoConnection';
// Функція для імпорту контактів
const importContacts = async () => {
  try {
    // Читаємо файл contacts.json
    const contactsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'contacts.json'), 'utf-8'),
    );

    // Перевіряємо, чи база даних вже має контакти
    const existingContacts = await Contact.find();
    if (existingContacts.length > 0) {
      console.log('Contacts already imported');
      return;
    }

    // Імпортуємо контакти в базу
    await Contact.insertMany(contactsData);
    console.log('Contacts successfully imported');
  } catch (error) {
    console.error('Error importing contacts:', error);
  }
};
initMongoConnection().then(() => {
  importContacts();
});
