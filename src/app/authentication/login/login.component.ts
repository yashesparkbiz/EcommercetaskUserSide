import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthResponseDto } from 'src/app/_interfaces/responce';
import { User } from 'src/app/_interfaces/user';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl?: string ;
  loginForm!: FormGroup ;
  errorMessage: string = '';
  showError?: boolean;
  
  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName)
  }

  loginUser = (loginFormValue: any) => {
    debugger
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: User = {
      in:{
      email: login.username,
      password: login.password,
      rememberMe: true
    }
    }
    this.authService.loginUser('Users/login', userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
       this.getuserbyemail(login.username);
       localStorage.setItem("token", res.token);
       this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      this.errorMessage = err.message;
      this.showError = true;
    }})
  }

  getuserbyemail(email:string){
    this.authService.getuserbyemail(email).subscribe((data) => {
       localStorage.setItem("id", data.id.toString());
   });
  }
}