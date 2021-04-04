import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { AllExceptionsFilter } from '../shared/filter/all-exceptions.fiter';
import { MandatoryFieldsPipe } from '../shared/pipe/mandatory-fields.pipe';
import { UpperCasePipe } from '../shared/pipe/upper-case.pipe';
import { ContactDto } from './dto/contactDto';

@Controller('contacts')
@UseFilters(new AllExceptionsFilter())
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}
  @Get()
  getAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number) {
    console.log('page:' + page);
    return this.contactService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) contactId: number) {
    if (!this.contactService.exists(contactId)) {
      throw new NotFoundException('Contact does not exist');
    }
    return this.contactService.getOne(contactId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createContact(@Body() contact: ContactDto) {
    return this.contactService.create(contact);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) contactId: number,
    @Body(new MandatoryFieldsPipe(['name', 'email'])) body,
    @Body('name', UpperCasePipe) name: string,
  ) {
    if (!this.contactService.exists(contactId)) {
      throw new NotFoundException('Contact does not exist');
    }
    console.log('body', body);
    console.log('name:' + name);

    return this.contactService.update(body, contactId);
  }

  @Patch('/:id')
  partialUpdate(@Param('id', ParseIntPipe) contactId: number, @Body() body) {
    if (!this.contactService.exists(contactId)) {
      throw new NotFoundException('Contact does not exist');
    }
    return this.contactService.partialUpdate(body, contactId);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) contactId: number) {
    return this.contactService.delete(contactId);
  }
}
