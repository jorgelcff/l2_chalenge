import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  $LoginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.$LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  processLogin() {
    if (this.$LoginForm.valid) {
      const { username, password } = this.$LoginForm.value;
      this.login(username, password);
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: (data: any) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', data.user);
        this.toastr.success('Login successful!');
        this.router.navigate(['/']);
      },
      error: () => {
        this.toastr.error('Login failed. Please check your credentials.');
      },
    });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
