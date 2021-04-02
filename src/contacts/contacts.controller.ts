import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  NotFoundException,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { Contact } from './model/contact';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  contacts = [
    { id: 1, name: 'Jim', email: 'j@aol.com' },
    { id: 2, name: 'Joe', email: 'joe@aol.com' },
    { id: 3, name: 'Mary', email: 'mary@aol.com' },
  ];

  constructor(private readonly contactService: ContactsService) {}
  @Get()
  getAll() {
    return this.contactService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') contactId: string) {
    return this.contactService.getOne(contactId);
  }

  @Post()
  createContact(@Body() contact: Contact | Contact[]) {
    return this.contactService.create(contact);
  }

  @Put('/:id')
  update(@Param('id') contactId: string, @Body() body) {
    return this.contactService.update(body, contactId);
  }

  @Patch('/:id')
  partialUpdate(@Param('id') contactId: string, @Body() body) {
    const idx = this.contacts.findIndex((contact) => contact.id === +contactId);
    if (idx === -1) {
      throw new NotFoundException('Contact does not exist');
    }
    body.id = parseInt(contactId);
    this.contacts[idx] = { ...this.contacts[idx], ...body };
    return [...this.contacts];
  }

  @Delete('/:id')
  delete(@Param('id') contactId) {
    const idx = this.contacts.findIndex((contact) => contact.id == contactId);
    if (idx === -1) {
      throw new NotFoundException('Contact does not exist');
    }
    this.contacts.splice(idx, 1);
    return [...this.contacts];
  }
}
