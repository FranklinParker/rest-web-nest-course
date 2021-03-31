import { Controller, Get, Param } from "@nestjs/common";

@Controller('contacts')
export class ContactsController {
  contacts = [
    { id: 1, name: 'Jim', email: 'j@aol.com' },
    { id: 2, name: 'Joe', email: 'joe@aol.com' },
    { id: 3, name: 'Mary', email: 'mary@aol.com' },
  ];

  @Get()
  getAll() {
    return this.contacts.map((contact) => {
      return { name: contact.name, email: contact.email };
    });
  }

  @Get(':id')
  getOne(@Param('id') contactId: string) {
    const { id, name, ...contact } = this.contacts.find(
      (contact) => contact.id === +contactId,
    );
    return contact;
  }
}
