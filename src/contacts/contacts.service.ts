import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactsService {
  contacts = [
    { id: 1, name: 'Jim', email: 'j@aol.com' },
    { id: 2, name: 'Joe', email: 'joe@aol.com' },
    { id: 3, name: 'Mary', email: 'mary@aol.com' },
  ];
  getAll() {
    return [...this.contacts];
  }
}
