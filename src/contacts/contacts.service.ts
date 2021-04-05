import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';

import * as fs from 'fs';
import { ContactDto } from './dto/contactDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schema/contact.schema';
import { Message } from './schema/Message.schema';
const fileName = '../../contacts.json';
@Injectable()
export class ContactsService {
  contacts = [];
  fullPath = path.join(__dirname, fileName);
  constructor(
    @InjectModel('Contact') private ContactModel: Model<Contact>,
    @InjectModel('Message') private MessageModel: Model<Message>,
  ) {
    try {
      const content = fs.readFileSync(this.fullPath, 'utf-8');
      this.contacts = JSON.parse(content);
      console.log('contacts loaded', this.contacts);
    } catch (e) {
      console.log('err', e);
      this.contacts = [
        { id: 1, name: 'Jim', email: 'j@aol.com' },
        { id: 2, name: 'Joe', email: 'joe@aol.com' },
        { id: 3, name: 'Mary', email: 'mary@aol.com' },
      ];
    }
  }
  async getAll(page: number, limit: number) {
    const contacts = await this.ContactModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'message',
        select: 'text description',
      })
      .populate({ path: 'messages', select: 'text description' });
    return [...contacts];
  }

  async create(contactRecord: ContactDto) {
    const message = await this.MessageModel.create({
      text: 'new message',
      description: 'description',
    });
    contactRecord.messages = [];
    contactRecord.message = message._id;
    contactRecord.messages.push(message._id);
    return this.ContactModel.create(contactRecord);
  }

  delete(id: string) {
    return this.ContactModel.deleteOne({ _id: id });
  }

  async update(contact: ContactDto, id: string) {
    console.log('update');
    return this.ContactModel.findByIdAndUpdate(id, contact, { new: true });
  }
  async partialUpdate(contact, id) {
    return this.ContactModel.findByIdAndUpdate(
      id,
      { $set: contact },
      { new: true },
    );
  }

  async getOne(id: string) {
    return this.ContactModel.findById(id).populate({
      path: 'messages',
      select: 'text description',
    });
  }
  get NextId() {
    if (this.contacts.length === 0) {
      return 1;
    }
    const ids = this.contacts.map((contact) => contact.id);
    const newId = Math.max(...ids) + 1;
    return newId;
  }
  async exists(id: string) {
    const record = await this.ContactModel.findById(id);
    if (record === null) {
      throw new NotFoundException('Contact does not exist');
    }
  }

  private writeToFile() {
    fs.writeFileSync(this.fullPath, JSON.stringify(this.contacts), 'utf-8');
  }
}
