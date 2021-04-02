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
  UseFilters,
} from '@nestjs/common';
import { Contact } from './model/contact';
import { ContactsService } from './contacts.service';
import { HttpExceptionFilter } from '../shared/filter/http-exception.filter';

@Controller('contacts')
@UseFilters(new HttpExceptionFilter())
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}
  @Get()
  getAll() {
    return this.contactService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') contactId: string) {
    if (!this.contactService.exists(contactId)) {
      throw new NotFoundException('Contact does not exist');
    }
    return this.contactService.getOne(contactId);
  }

  @Post()
  createContact(@Body() contact: Contact | Contact[]) {
    return this.contactService.create(contact);
  }

  @Put('/:id')
  update(@Param('id') contactId: string, @Body() body) {
    if (!this.contactService.exists(contactId)) {
      throw new NotFoundException('Contact does not exist');
    }
    return this.contactService.update(body, contactId);
  }

  @Patch('/:id')
  partialUpdate(@Param('id') contactId: string, @Body() body) {
    if (!this.contactService.exists(contactId)) {
      throw new NotFoundException('Contact does not exist');
    }
    return this.contactService.partialUpdate(body, contactId);
  }

  @Delete('/:id')
  delete(@Param('id') contactId) {
    return this.contactService.delete(contactId);
  }
}
