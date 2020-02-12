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
            this.error = 'Please resolve errors before proceeding.';
            return false;
        }
        const newUser: User = {"firstName": this.f.firstname.value, "lastName": this.f.lastname.value, "password": "test", "id": this.users.length + 1, "username": this.f.username.value};
        
        this.loading = true;
        this.userService.addUser(newUser)
            .pipe(first())
            .subscribe(
                data => {
                    this.userService.getAll().pipe(first()).subscribe(users => {
                        this.loading = false;
                        this.users = users;
                        this.error = '';
                        this.submitted = false;
                        this.addUserForm.reset({
                            'firstname': '',
                            'lastname': '',
                            'username': ''
                        });  
                    });
                                      
                },
                error => {
                    this.error = '';
                    this.loading = false;
                });
    }
    
    onEdit(user: User) {
        console.log(user);
    }

    onDelete(user: User) {
        this.loading = true;
        this.submitted = false;
        this.userService.deleteUser(user.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.userService.getAll().pipe(first()).subscribe(users => {
                        this.loading = false;
                        this.users = users;
                        this.error = '';
                        this.addUserForm.reset({
                            'firstname': '',
                            'lastname': '',
                            'username': ''
                        });  
                    });
                                      
                },
                error => {
                    this.error = '';
                    this.loading = false;
                });
    }
}