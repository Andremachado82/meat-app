import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './../../shared/messages/notification.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private noticationService: NotificationService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/'
  }

  login() {
    this.loginService.login(this.loginForm.value.email,
      this.loginForm.value.password)
      .subscribe(user => this.noticationService.notify(`Bem vindo/a, ${user.name}`),
        // tslint:disable-next-line: comment-format
        response => //Do tipo HttpErrorResponse
          this.noticationService.notify(response.error.message),
        () => {
          this.router.navigate([this.navigateTo])
        })
  }

}
