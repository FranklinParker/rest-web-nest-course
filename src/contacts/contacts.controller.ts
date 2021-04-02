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
    return this.contactService.partialUpdate(body, contactId);
  }

  @Delete('/:id')
  delete(@Param('id') contactId) {
    return this.contactService.delete(contactId);
  }
}
