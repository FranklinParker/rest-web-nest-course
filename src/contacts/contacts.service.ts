import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from './model/contact';

import * as fs from 'fs';
const fileName = './contacts.json';
@Injectable()
export class ContactsService {
  contacts = [];
  constructor() {
    try {
      const content = fs.readFileSync(fileName, 'utf-8');
      this.contacts = JSON.parse(content);
    } catch (e) {
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

  create(contactRecord: Contact | Contact[]) {
    const newId = this.NextId;
    console.log('newId:' + newId);
    if (contactRecord instanceof Array) {
      contactRecord.forEach((newContact: Contact, idx) => {
        newContact.id = newId + idx;
      });
      this.contacts.push(...contactRecord);
    } else {
      const { id, ...contact } = contactRecord;
      this.contacts.push({ id: newId, ...contact });
    }
    return [...this.contacts];
  }

  update(contact: Contact, id) {
    if (!this.exists(id)) {
      throw new NotFoundException('Contact does not exist');
    }
    const idx = this.contacts.findIndex((contact) => contact.id == id);
    contact.id = parseInt(id);
    this.contacts[idx] = contact;
    return [...this.contacts];
  }

  getOne(contactId: string) {
    const search = this.contacts.find((contact) => contact.id === +contactId);
    if (!search) {
      throw new NotFoundException('Contact does not exist');
    }
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
  exists(id) {
    return this.contacts.findIndex((c) => c.id == id) !== -1;
  }
}
