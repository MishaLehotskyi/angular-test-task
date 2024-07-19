import { Injectable } from '@angular/core';
import {Contact} from "../types/contact";
import {BehaviorSubject, Observable} from "rxjs";
import { v4 as uuid4 } from 'uuid';
import {LocalStorageService} from "./local-storage.service";


const emptyContact = {
  id: '',
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  birthdate: '',
  address: '',
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([
    {
      id: uuid4(),
      firstname: 'John',
      lastname: 'Doe',
      phone: '1234567890',
      birthdate: '1990-05-15',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA'
    },
    {
      id: uuid4(),
      firstname: 'Jane',
      lastname: 'Smith',
      phone: '9876543210',
      birthdate: '1985-08-20',
      email: 'jane.smith@example.com',
      address: '456 Elm St, Othertown, USA'
    },
    {
      id: uuid4(),
      firstname: 'Michael',
      lastname: 'Johnson',
      phone: '5551234567',
      birthdate: '1982-03-10',
      email: 'michael.johnson@example.com',
      address: '789 Oak Ave, Anycity, USA'
    },
    {
      id: uuid4(),
      firstname: 'Emily',
      lastname: 'Brown',
      phone: '7778889999',
      birthdate: '1995-11-25',
      email: 'emily.brown@example.com',
      address: '321 Pine Rd, Anothercity, USA'
    },
    {
      id: uuid4(),
      firstname: 'David',
      lastname: 'Martinez',
      phone: '4445556666',
      birthdate: '1989-07-12',
      email: 'david.martinez@example.com',
      address: '555 Cedar Ln, Someville, USA'
    },
    {
      id: uuid4(),
      firstname: 'Sarah',
      lastname: 'Taylor',
      phone: '2223334444',
      birthdate: '1993-02-28',
      email: 'sarah.taylor@example.com',
      address: '222 Birch Dr, Yourtown, USA'
    },
    {
      id: uuid4(),
      firstname: 'Robert',
      lastname: 'Garcia',
      phone: '6667778888',
      birthdate: '1987-09-05',
      email: 'robert.garcia@example.com',
      address: '777 Maple Blvd, Everytown, USA'
    },
    {
      id: uuid4(),
      firstname: 'Jessica',
      lastname: 'Miller',
      phone: '3334445555',
      birthdate: '1991-12-15',
      email: 'jessica.miller@example.com',
      address: '888 Willow Ave, Nowhere, USA'
    },
    {
      id: uuid4(),
      firstname: 'Daniel',
      lastname: 'Wilson',
      phone: '8889990000',
      birthdate: '1984-04-30',
      email: 'daniel.wilson@example.com',
      address: '999 Ash St, Somewhere, USA'
    },
    {
      id: uuid4(),
      firstname: 'Olivia',
      lastname: 'Moore',
      phone: '1112223333',
      birthdate: '1997-06-20',
      email: 'olivia.moore@example.com',
      address: '111 Spruce Pl, Anywhere, USA'
    }
  ]);
  query: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentContact: BehaviorSubject<Contact> = new BehaviorSubject<Contact>(emptyContact);

  constructor(private localStorageService: LocalStorageService) {
    const localContacts = this.localStorageService.getItem('contacts')

    localContacts
      ? this.contacts.next(JSON.parse(localContacts))
      : this.localStorageService.setItem('contacts', JSON.stringify(this.contacts.getValue()));
  }

  getContacts(): Observable<Contact[]> {
    return this.contacts.asObservable();
  }

  setCurrentContact(contact: Contact) {
    this.currentContact.next(contact);
  }

  getCurrentContact(): Observable<Contact> {
    return this.currentContact.asObservable();
  }

  resetCurrentContact(): void {
    this.currentContact.next(emptyContact);
  }

  getContactById(id: string): Contact | undefined {
    console.log('contacts', this.contacts.getValue());
    return this.contacts.getValue().find((contact) => contact.id === id);
  }

  getQuery(): Observable<string> {
    return this.query.asObservable();
  }

  updateQuery(newQuery: string) {
    this.query.next(newQuery);
  }

  updateContact(updatedContact: Contact) {
    const currentContacts = this.contacts.getValue();
    const index = currentContacts.findIndex(c => c.id === updatedContact.id);

    if (index !== -1) {
      currentContacts[index] = updatedContact;
      this.contacts.next(currentContacts);
      this.localStorageService.setItem('contacts', JSON.stringify(currentContacts))
    }
  }

  deleteContact(id: string) {
    const currentContacts = this.contacts.getValue();
    const index = currentContacts.findIndex(c => c.id === id);

    if (index !== -1) {
      currentContacts.splice(index, 1);
      this.contacts.next(currentContacts);
      this.localStorageService.setItem('contacts', JSON.stringify(currentContacts))
    }
  }

  createContact(newContact: Contact) {
    const currentContacts = this.contacts.getValue();
    const updatedContacts = [...currentContacts, newContact];
    this.contacts.next(updatedContacts);
    this.localStorageService.setItem('contacts', JSON.stringify(updatedContacts))
  }
}
