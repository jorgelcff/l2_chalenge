import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterComponent {
  $RegisterForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.$RegisterForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
  }

  processRegister() {
    if (this.$RegisterForm.valid) {
      const { username, password, email, phone, birthDate } =
        this.$RegisterForm.value;
      this.register(username, password, email, phone, birthDate);
    }
  }

  register(
    username: string,
    password: string,
    email: string,
    phone: string,
    birthDate: string
  ) {
    this.authService
      .register({ username, password, email, phone, birthDate })
      .subscribe({
        next: () => {
          this.toastr.success('Registro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao registrar. Por favor, tente novamente.';
          this.toastr.error(this.errorMessage);
        },
      });
  }
}
