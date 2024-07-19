import { Routes } from '@angular/router';
import { PhoneBookComponent } from "./components/phone-book/phone-book.component";
import { ContactInfoComponent } from "./components/contact-info/contact-info.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: PhoneBookComponent },
  { path: 'contacts/:id', component: ContactInfoComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
