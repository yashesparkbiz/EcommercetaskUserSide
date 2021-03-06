import { SocialAuthService, SocialUser, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ExternalAuthDto } from 'src/app/_interfaces/external-auth-dto';
import { AuthResponseDto } from 'src/app/_interfaces/responce';
import { User } from 'src/app/_interfaces/user';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl?: string;
  loginForm!: FormGroup;
  errorMessage: string = '';
  showError?: boolean;
  // private extAuthChangeSub = new Subject<SocialUser>();
  // public extAuthChanged = this.extAuthChangeSub.asObservable();
  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private externalAuthService: SocialAuthService) { }

  ngOnInit(): void {
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
    const login = { ...loginFormValue };
    const userForAuth: User = {
      in: {
        email: login.username,
        password: login.password,
        rememberMe: true
      }
    }
    this.authService.loginUser('Users/login', userForAuth)
      .subscribe({
        next: (res: AuthResponseDto) => {
          this.getuserbyemail(login.username);
          localStorage.setItem("token", res.token);
          this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this.router.navigate([this.returnUrl]);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      })
  }

  getuserbyemail(email: string) {
    this.authService.getuserbyemail(email).subscribe((data) => {
      localStorage.setItem("id", data.id.toString());
    });
  }

  // externalLogin = () => {
  //   debugger
  //   this.showError = false;
  //   this.authService.signInWithGoogle();
  //   this.extAuthChanged.subscribe(user => {
  //     const externalAuth: ExternalAuthDto = {
  //       in: {
  //         provider: user.provider,
  //         idToken: user.idToken
  //       }
  //     }
  //     alert(externalAuth);
  //     this.validateExternalAuth(externalAuth);
  //   })
  // }

  // private validateExternalAuth(externalAuth: ExternalAuthDto) {
  //   debugger
  //   this.authService.externalLogin('Users/ExternalLogin', externalAuth)
  //     .subscribe({
  //       next: (res) => {
  //         localStorage.setItem("token", res.token);
  //         this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
  //         alert("returnurl = " + this.returnUrl);
  //         this.router.navigate([this.returnUrl]);
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         this.errorMessage = err.message;
  //         this.showError = true;
  //         this.authService.signOutExternal();
  //       }
  //     });
  // }
}