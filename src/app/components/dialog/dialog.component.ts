import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {Contact} from "../../types/contact";
import {ContactsService} from "../../services/contacts.service";
import { v4 as uuid4 } from 'uuid';

interface DialogData {
  contact: Contact;
  index: number;
  mode: 'edit' | 'create' | 'edit-current';
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormField,
    FormsModule,
    MatDialogClose,
    MatButton,
    MatDialogActions,
    MatInput,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FaIconComponent,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit{
  contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstname: [this.data.contact.firstname.trim(), Validators.required],
      lastname: [this.data.contact.lastname.trim(), Validators.required],
      phone: [this.data.contact.phone.trim(), [Validators.pattern('^[0-9]+$'), Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      birthdate: [this.data.contact.birthdate, [Validators.required, this.dateNotGreaterThanTodayValidator()]],
      email: [this.data.contact.email.trim(), [Validators.required, Validators.email]],
      address: [this.data.contact.address.trim(), [Validators.required]],
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      const contact: Contact = { id: this.data.contact.id, ...this.contactForm.value };

      switch (this.data.mode) {
        case 'edit': {
          this.contactsService.updateContact(contact);
          this.dialogRef.close();
          break;
        }
        case 'create': {
          this.contactsService.createContact({  id: uuid4(), ...this.contactForm.value });
          this.dialogRef.close();
          break;
        }
        case 'edit-current': {
          this.contactsService.updateContact(contact);
          this.contactsService.setCurrentContact(contact);
          this.dialogRef.close();
          break;
        }
      }
    }
  }
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private contactsService: ContactsService) {}

  dateNotGreaterThanTodayValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const selectedDate = new Date(control.value);
      const today = new Date();

      if (selectedDate > today) {
        return { 'dateGreaterThanToday': true };
      }

      return null;
    };
  }
}
