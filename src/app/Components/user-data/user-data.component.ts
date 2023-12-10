import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserData } from 'src/app/Model/userData.model';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent {
  @Input() user!: UserData;

  @Output() removeUserEvent = new EventEmitter<number>();

  removeUser(index: number): void {
    this.removeUserEvent.emit(index);
  }
}
