import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
    await this.contactService.exists(id);
    return await this.contactService.getOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createContact(@Body() contact: ContactDto) {
    return await this.contactService.create(contact);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() body: ContactDto,
    @Body('name', UpperCasePipe) name: string,
  ) {
    await this.contactService.exists(id);
    return this.contactService.update(body, id);
  }

  @Patch('/:id')
  @UsePipes(new MandatoryFieldsPipe(['name']))
  async partialUpdate(@Param('id') contactId: string, @Body() body: any) {
    await this.contactService.exists(contactId);
    return await this.contactService.partialUpdate(body, contactId);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') contactId: string) {
    const result = await this.contactService.delete(contactId);
    console.log('count: ' + result.deletedCount);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Contact does not exist');
    }
  }
}
