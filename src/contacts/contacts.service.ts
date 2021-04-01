import { Injectable, NotFoundException, Param } from "@nestjs/common";

import * as fs from 'fs';
@Injectable()
export class ContactsService {
  contacts = [];
  constructor() {
    try {
      const content = fs.readFileSync('./contacts.json', 'utf-8');
      this.contacts = JSON.parse(content);
    } catch (e) {
      console.log('error', e);
      this.contacts = [];
    }
  }
  getAll() {
    const contacts = this.contacts.map((contact) => {
      return { name: contact.name, email: contact.email };
    });
    return [...contacts];
  }

  getOne(contactId: string) {
    const search = this.contacts.find((contact) => contact.id === +contactId);
    if (!search) {
      throw new NotFoundException('Contact does not exist');
    }
    const { id, ...contact } = search;
    return { ...contact, result: 'hi' };
  }
}
