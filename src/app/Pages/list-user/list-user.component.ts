import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/Model/userData.model';

import { UserFetchService } from 'src/app/Services/user-fetch.service';

import {ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  userDataList!: UserData[];
  value: string = '';
  deleted: boolean = false;

  constructor(private userDataService: UserFetchService, private router:Router) {}
  ngOnInit(): void {
    this.userDataService.getUserData().subscribe((data) => {
      this.userDataList = data;
    }
    ,(error)=> console.log(error)
    );
  }

  // Function to remove a user from the list
  removeUser(index: number): void {
    this.removeById(index);
    this.userDataService.removeUserData(index).subscribe(
      (data) => {
        this.deleted = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeById=(id:number):void =>{
    const idToRemove= this.userDataList.findIndex(user=>user.id==id);

    if(idToRemove !== -1)
    {
      this.userDataList.splice(idToRemove,1);
    }
  }

  update(id: number) {
    this.router.navigate(['/update', id]);
  }
}
