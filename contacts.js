const path = require("path");
const fs = require("fs").promises;
const nanoid = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data));
  } catch (error) {
    (error) => console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data).find((option) => option.id === contactId));
  } catch (error) {
    (error) => console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const newData = JSON.parse(data).filter(
      (option) => option.id !== contactId
    );
    const newContactList = `${JSON.stringify(newData)}`;

    await fs.writeFile(contactsPath, newContactList, "utf8");
    console.table(newData);
  } catch (error) {
    (error) => console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const data = await fs.readFile(contactsPath, "utf8");
    const newData = JSON.parse(data);
    newData.push(newContact);
    const newContactList = `${JSON.stringify(newData)}`;

    await fs.writeFile(contactsPath, newContactList, "utf8");
    console.table(newData);
  } catch (error) {
    (error) => console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
