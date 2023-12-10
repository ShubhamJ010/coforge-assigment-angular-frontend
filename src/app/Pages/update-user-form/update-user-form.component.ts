import {Component, OnInit} from '@angular/core';
import {UserData} from "../../Model/userData.model";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserFetchService} from "../../Services/user-fetch.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit {
  userData: UserData;
  userForm!: FormGroup;
  userService: UserFetchService;
  error: string = '';
  submitted: boolean = false;

  constructor(private fb: FormBuilder, userService: UserFetchService,private route:ActivatedRoute) {

    this.userData = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      gender: 'Male',
      password: '',
      confirmPassword: '',
      comments: '',
      address: {
        city: '',
        streetNumber: '',
        country: '',
      }
    };
    this.userService = userService;
  }

  //Cusntom validation
  confirmingPass = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (
      control.get('password')?.pristine ||
      control.get('confirmPassword')?.pristine
    )
      return null;
    return password !== confirmPassword ? { passwordMismatch: true } : null;
  };

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      const id:number=params['id'];
      this.userService.getUserDataById(id).subscribe((data)=>{
        this.userData=data;
        this.userForm.patchValue(data);
      })
    })

    this.userForm = this.fb.group(
      {
        firstName: [
          this.userData.firstName,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        lastName: [
          this.userData.lastName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(25),
          ],
        ],
        email: [
          this.userData.email,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(25),
            Validators.email,
          ],
        ],
        gender: [this.userData.gender],
        password: [this.userData.password, [Validators.required]],
        confirmPassword: [this.userData.confirmPassword, [Validators.required]],
        comments: [
          this.userData.comments,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(250),
          ],
        ],
        address: this.fb.group({
          city: [
            this.userData.address.city,
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(25),
            ],
          ],
          streetNumber: [
            this.userData.address.streetNumber,
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(25),
            ],
          ],
          country: [
            this.userData.address.country,
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(25),
            ],
          ],
        }),
      },
      { validator: this.confirmingPass }
    );
  }
  resetForm() {
    this.userForm.reset(); // Reset the entire form
  }

  onSubmit() {
    this.userData.email = this.userForm.get('email')?.value.trim();
    this.userData.firstName = this.userForm.get('firstName')?.value.trim();
    this.userData.lastName = this.userForm.get('lastName')?.value.trim();
    this.userData.gender = this.userForm.get('gender')?.value.trim();
    this.userData.password = this.userForm.get('password')?.value.trim();
    this.userData.confirmPassword = this.userForm.get('confirmPassword')?.value.trim();
    this.userData.comments = this.userForm.get('comments')?.value.trim();

    // Address fields
    this.userData.address.city = this.userForm
      .get('address.city')
      ?.value.trim();
    this.userData.address.streetNumber = this.userForm
      .get('address.streetNumber')
      ?.value.trim();
    this.userData.address.country = this.userForm
      .get('address.country')
      ?.value.trim();

    this.userService.updateUser(this.userData).subscribe(
      (data) => {
        console.log('User added:', data);
        this.submitted = true;
        this.resetForm();
      },
      (SentError: HttpErrorResponse) => {
        console.error('Error adding user:', SentError);
        this.error = SentError.status + '!! ' + SentError.error;
      }
    );
  }
}
