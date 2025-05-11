import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Todo App Angular Learning';
  tasks = [
    {
      id: 1,
      title: 'Task 1',
      completed: false
    },
    {
      id: 2,
      title: 'Task 2',
      completed: false
    },
    {
      id: 3,
      title: 'Task 3',
      completed: false
    }
  ];

  name = 'Ivan Ortega';
  age = 28;

  items = ['Item 1', 'Item 2', 'Item 3'];

  disabled = true;
}
