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
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log('page:' + page);
    return await this.contactService.getAll(page, limit);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    if (!(await this.contactService.exists(id))) {
      throw new NotFoundException('Contact does not exist');
    }
    return await this.contactService.getOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createContact(@Body() contact: ContactDto) {
    return await this.contactService.create(contact);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body(new MandatoryFieldsPipe(['name', 'email'])) body,
    @Body('name', UpperCasePipe) name: string,
  ) {
    if (!this.contactService.exists(id)) {
      throw new NotFoundException('Contact does not exist');
    }
    console.log('body', body);
    console.log('name:' + name);

    return this.contactService.update(body, id);
  }

  @Patch('/:id')
  partialUpdate(@Param('id', ParseIntPipe) contactId: string, @Body() body) {
    if (!this.contactService.exists(contactId)) {
      throw new NotFoundException('Contact does not exist');
    }
    return this.contactService.partialUpdate(body, contactId);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) contactId: string) {
    return this.contactService.delete(contactId);
  }
}
