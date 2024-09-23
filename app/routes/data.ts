export type ContactRecord = {
  id: number;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

const contacts = [
  {
    id: 1,
    first: "Dhruv",
    last: "Patel",
    avatar: "https://picsum.photos/200/200",
    twitter: "@dhruvmpatel",
    notes: "Software Developer",
    favorite: true,
  },
];

export function getContacts() {
  return contacts;
}

export function getContact(contactId: number) {
  return getContacts().find((c) => c.id === contactId);
}

export function createEmptyContact() {
  const newContact = {
    id: contacts.length + 1,
    first: "New",
    last: "Contact",
    avatar: "https://picsum.photos/200/200",
    twitter: "@newcontact",
    notes: "Something something",
    favorite: false,
  };
  contacts.push(newContact)
  return newContact;
}

export function updateContact(contactId: number, data: Partial<ContactRecord>) {
  const contact = getContact(contactId);
  if (!contact) return;
  Object.assign(contact, data);
}
