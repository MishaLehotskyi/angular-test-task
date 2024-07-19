import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Contact} from "../../types/contact";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsService} from "../../services/contacts.service";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    FaIconComponent
  ],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent implements OnInit {
  contact!: Contact;
  id!: string
  faPencil = faPencil;
  faTrash = faTrash;

  constructor(private route:ActivatedRoute, private contactsService:ContactsService, private router: Router, public dialog: MatDialog) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    const contact = this.contactsService.getContactById(this.id)

    if (!contact) {
      this.router.navigate(['/404']);
      return
    }

    this.contactsService.setCurrentContact(contact);
    this.contactsService.getCurrentContact().subscribe(currentContact => {
      this.contact = currentContact;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        contact: this.contact,
        mode: 'edit-current',
      },
    });
  }

  deleteContact() {
    this.contactsService.deleteContact(this.contact.id);
    this.contactsService.resetCurrentContact();
    this.router.navigate(['/contacts']);
  }
}
