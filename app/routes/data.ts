export type ContactRecord = {
  id: number;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

export function getContacts() {
  return [
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
}

export function getContact(contactId: number) {
  return getContacts().find((c) => c.id === contactId);
}
