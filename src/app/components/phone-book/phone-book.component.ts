import {Component} from '@angular/core';
import { Contact } from "../../types/contact";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {PhoneItemComponent} from "../phone-item/phone-item.component";
import {MatButton} from "@angular/material/button";
import {ContactsService} from "../../services/contacts.service";

@Component({
  selector: 'app-phone-book',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    FontAwesomeModule,
    PhoneItemComponent,
    MatButton,
    NgIf
  ],
  templateUrl: './phone-book.component.html',
  styleUrl: './phone-book.component.scss'
})

export class PhoneBookComponent {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  query: string = '';

  constructor(private contactsService: ContactsService) {
    this.contactsService.getQuery().subscribe(query => {
      this.query = query;
      this.filterContacts();
    });
    this.contactsService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.filterContacts();
    });
  }

  filterContacts() {
    if (!this.query) {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.firstname.toLowerCase().includes(this.query.toLowerCase())
        || contact.lastname.toLowerCase().includes(this.query.toLowerCase())
        || contact.phone.includes(this.query)
      );
    }
  }
}
