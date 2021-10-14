import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[$@#^!%*?&])[A-Za-zd$@$!%*?&].{7,15}'
          ),
        ],
      ],
    });
    // this.authenticationService.logout();
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    console.log(this.f.email.value);
    console.log(this.f.password.value);
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .subscribe((res) => {
        this.loading = false;
        console.log(res);
        let temp = res.filter((m) => {
          if (m.email == this.f.email.value) {
            console.log(m);
            return m;
          }
        });
        if (temp.length != 0) {
          this.router.navigate(['home/companies']);
        } else {
          this.error = 'Incorrect email address';
        }
      });
  }

  getErrorMessage(data) {
    if (data == 'email') {
      if (this.f.email.hasError('required')) {
        return 'Email is required';
      }
      return this.f.email.hasError('email') ? 'Not a valid email' : '';
    } else {
      if (this.f.password.hasError('required')) {
        return 'Password is required';
      }
      return this.f.password.hasError('pattern') ? 'Weak password' : '';
    }
  }
  // .pipe(first())
  //     .subscribe((data) => {
  //       console.log('comp suc');
  //       if (data.status != 400) {
  //         console.log(data.user.role);

  //         this.router.navigate([data.user.role.trim()]);
  //       } else {
  //         this.error = data.message;
  //         this.loading = false;
  //       }
  //     });
}
