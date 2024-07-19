import {Component, Input} from '@angular/core';
import {faPencil, faTrash, faInfo} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Contact} from "../../types/contact";
import {ContactsService} from "../../services/contacts.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-phone-item',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
  ],
  templateUrl: './phone-item.component.html',
  styleUrl: './phone-item.component.scss'
})
export class PhoneItemComponent {
    faTrash = faTrash;
    faPencil = faPencil;
    faInfo = faInfo;
    @Input('contact') contact!: Contact;

    constructor(public dialog: MatDialog, private contactsService: ContactsService, private router: Router) {}

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        data: {
          contact: this.contact,
          mode: 'edit',
        },
      });
    }

    deleteContact() {
      this.contactsService.deleteContact(this.contact.id);
    }

    info() {
      this.router.navigate([`/contacts/${this.contact.id}`]);
    }
}
