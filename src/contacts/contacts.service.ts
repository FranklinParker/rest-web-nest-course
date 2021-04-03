import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from './interfaces/contact';
import * as path from 'path';

import * as fs from 'fs';
import { ContactDto } from './dto/contactDto';
const fileName = '../../contacts.json';
@Injectable()
export class ContactsService {
  contacts = [];
  fullPath = path.join(__dirname, fileName);
  constructor() {
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
  getAll() {
    const contacts = this.contacts.map((contact) => {
      return { name: contact.name, email: contact.email };
    });
    return [...contacts];
  }

  create(contactRecord: ContactDto | ContactDto[]) {
    const newId = this.NextId;
    console.log('newId:' + newId);
    if (contactRecord instanceof Array) {
      contactRecord.forEach((newContact: Contact, idx) => {
        newContact.id = newId + idx;
      });
      this.contacts.push(...contactRecord);
    } else {
      this.contacts.push({ id: newId, ...contactRecord });
    }
    this.writeToFile();
    return [...this.contacts];
  }

  delete(id: number) {
    this.contacts = this.contacts.filter((cont) => cont.id !== id);
    this.writeToFile();
    return [...this.contacts];
  }

  update(contact: Contact, id: number) {
    const idx = this.contacts.findIndex((contact) => contact.id === id);
    contact.id = id;
    this.contacts[idx] = contact;
    this.writeToFile();
    return [...this.contacts];
  }
  partialUpdate(contact, id) {
    const idx = this.contacts.findIndex((contact) => contact.id == id);
    contact.id = parseInt(id);
    this.contacts[idx] = { ...this.contacts[idx], ...contact };
    this.writeToFile();
    return [...this.contacts];
  }

  getOne(contactId: number) {
    const search = this.contacts.find((contact) => contact.id === +contactId);
    const { id, ...contact } = search;
    return { ...contact, result: 'hi' };
  }
  get NextId() {
    if (this.contacts.length === 0) {
      return 1;
    }
    const ids = this.contacts.map((contact) => contact.id);
    const newId = Math.max(...ids) + 1;
    return newId;
  }
  exists(id: number) {
    return this.contacts.findIndex((c) => c.id === id) !== -1;
  }

  private writeToFile() {
    fs.writeFileSync(this.fullPath, JSON.stringify(this.contacts), 'utf-8');
  }
}
