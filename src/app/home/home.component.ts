import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    addUserForm: FormGroup;
    submitted = false;
    error = '';

    constructor(private userService: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        this.addUserForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.addUserForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addUserForm.invalid) {
            return;
        }

        this.loading = true;
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.error = error;
        //             this.loading = false;
        //         });
    }
}