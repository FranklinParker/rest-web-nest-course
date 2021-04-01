import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateContact } from './model/createContact';

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

  @Get('/:id')
  getOne(@Param('id') contactId: string) {
    const search = this.contacts.find((contact) => contact.id === +contactId);
    if (!search) {
      throw new NotFoundException('Contact does not exist');
    }
    const { id, ...contact } = search;
    return { ...contact, result: 'hi' };
  }

  @Post()
  createContact(@Body() contacts: CreateContact | CreateContact[]) {
    const ids = this.contacts.map((contact) => contact.id);
    const newId = Math.max(...ids) + 1;
    if (contacts instanceof Array) {
      console.log('contact', contacts);
      contacts.forEach((contact: CreateContact, idx) => {
        contact.id = newId + idx;
      });
      this.contacts.push(...contacts);
    } else {
      const { id, ...contact } = contacts;
      this.contacts.push({ id: newId, ...contact });
    }
    return [...this.contacts];
  }

  @Put('/:id')
  update(@Param('id') contactId: string, @Body() body) {
    const idx = this.contacts.findIndex((contact) => contact.id === +contactId);
    if (idx === -1) {
      throw new NotFoundException('Contact does not exist');
    }
    body.id = parseInt(contactId);
    this.contacts[idx] = body;
    return [...this.contacts];
  }
}
