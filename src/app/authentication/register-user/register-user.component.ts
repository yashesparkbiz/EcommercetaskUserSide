import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersModel } from 'src/app/_interfaces/user-for-registration-dto';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit {
  
  registerForm!: FormGroup;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(''),
      gender: new FormControl(''),
      age: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    });
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName)?.hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };
    
    const user: UsersModel = {
      in: {
      UserName: formValues.userName,
      Email: formValues.email,
      PhoneNumber: formValues.phoneNumber,
      Gender: formValues.gender,
      Age: formValues.age,
      Password: formValues.password,
      ConfirmPassword: formValues.confirmPassword,
      Role: "Customer"
      }
    };
    debugger
    this.authService.registerUser("Users/create-user", user)
    .subscribe({
      next: (_) => {
        console.log("Successful registration");this.router.navigate(["/authentication/login"]); alert("Congrats! Your account has been created successfully.");
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });
  };
}