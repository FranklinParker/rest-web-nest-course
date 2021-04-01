import { Injectable, NotFoundException, Param } from "@nestjs/common";

@Injectable()
export class ContactsService {
  contacts = [
    { id: 1, name: 'Jim', email: 'j@aol.com' },
    { id: 2, name: 'Joe', email: 'joe@aol.com' },
    { id: 3, name: 'Mary', email: 'mary@aol.com' },
  ];
  getAll() {
    const contacts = this.contacts.map((contact) => {
      return { name: contact.name, email: contact.email };
    });
    return [...contacts];
  }

  getOne(contactId: string) {
    const search = this.contacts.find((contact) => contact.id === +contactId);
    if (!search) {
      throw new NotFoundException('Contact does not exist');
    }
    const { id, ...contact } = search;
    return { ...contact, result: 'hi' };
  }
}
