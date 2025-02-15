import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts/contacts.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class HomeComponent implements OnInit {
  contacts: any[] = [];
  contactForm: FormGroup;
  displayDialog: boolean = false;
  limit: number = 10;
  skip: number = 0;
  sortBy: string = 'firstName';
  order: string = 'asc';
  totalRecords: number = 0;
  isLoading: boolean = false;
  user: any;
  first = 0;

  rows = 10;
  skeletonItems: number[] = Array(10).fill(0);

  constructor(
    private contactsService: ContactsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadUser();
    this.loadContacts();
  }

  loadUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.user = {
        firstName: 'Mock',
        lastName: 'User',
        email: 'mockuser@example.com',
        image: 'https://dummyjson.com/icon/emilys/1024',
      };
    }
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }

  loadContacts() {
    this.isLoading = true;
    this.contactsService
      .getContacts({
        limit: this.limit,
        skip: this.skip,
        sortBy: this.sortBy,
        order: this.order,
      })
      .subscribe((data) => {
        this.contacts = data.users;
        this.totalRecords = data.total;
        this.isLoading = false;
      });
  }

  addContact() {
    this.contactForm.reset();
    this.contactForm.get('id')?.setValue(null); // Ensure the ID is null for new contacts
    this.displayDialog = true;
  }

  editContact(contact: any) {
    this.contactForm.patchValue(contact);
    this.contactForm.get('id')?.setValue(contact.id); // Ensure the ID is set in the form
    this.displayDialog = true;
  }

  saveContact() {
    if (this.contactForm.valid) {
      const contact = this.contactForm.value;
      if (contact.id) {
        this.contactsService.updateContact(contact.id, contact).subscribe(
          () => {
            this.loadContacts();
            this.displayDialog = false;
            this.toastr.success('Contact updated successfully');
          },
          (error) => {
            this.toastr.error('Failed to update contact');
          }
        );
      } else {
        this.contactsService.createContact(contact).subscribe(
          () => {
            this.loadContacts();
            this.displayDialog = false;
            this.toastr.success('Contact created successfully');
          },
          (error) => {
            this.toastr.error('Failed to create contact');
          }
        );
      }
    }
  }

  cancelDialog() {
    this.displayDialog = false;
  }

  deleteContact(id: number) {
    this.contactsService.deleteContact(id).subscribe(
      () => {
        this.loadContacts();
        this.toastr.success('Contact deleted successfully');
      },
      (error) => {
        this.toastr.error('Failed to delete contact');
      }
    );
  }

  onRowsPerPageChange(event: any) {
    this.limit = event.target.value;
    this.skip = 0;
    this.loadContacts();
  }

  onPage(event: any) {
    this.limit = event.rows;
    this.skip = event.first;
    this.loadContacts();
  }

  next() {
    if (!this.isLastPage()) {
      this.skip += this.limit;
      this.loadContacts();
    }
  }

  prev() {
    if (!this.isFirstPage()) {
      this.skip -= this.limit;
      this.loadContacts();
    }
  }

  reset() {
    this.skip = 0;
    this.loadContacts();
  }

  pageChange(event: { first: number; rows: number }) {
    this.skip = event.first;
    this.limit = event.rows;
    this.loadContacts();
  }

  isLastPage(): boolean {
    return this.skip + this.limit >= this.totalRecords;
  }

  isFirstPage(): boolean {
    return this.skip === 0;
  }
}
