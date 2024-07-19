import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {PhoneBookComponent} from "./components/phone-book/phone-book.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {faSearch, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ContactsService} from "./services/contacts.service";
import {DialogComponent} from "./components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Location, NgIf} from "@angular/common";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhoneBookComponent, FormsModule, MatFormField, MatInput, MatLabel, ReactiveFormsModule, FaIconComponent, NgIf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  faSearch = faSearch;
  faPlus = faPlus;
  query = '';
  showHeaderActions = false;

  constructor(public dialog: MatDialog, private contactsService: ContactsService, private location: Location, private router: Router) {
  }

  onInputChange(): void {
    this.contactsService.updateQuery(this.query);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        contact : {
          firstname: '',
          lastname: '',
          phone: '',
          birthdate: '',
          email: '',
          address: '',
        },
        mode : 'create',
      },
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showHeaderActions = this.location.path() === '/contacts'
    });
  }
}
