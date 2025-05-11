import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

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

  task2Signals = signal([
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
  ])

  nameSignal = signal('Ivan Ortega Whit Signal Example')

  name = 'Ivan Ortega';
  age = 28;

  items = ['Item 1', 'Item 2', 'Item 3'];

  disabled = true;

  handleClick() {
    alert('Click');
  }

  changeHandler(ev: Event) {
    ev.preventDefault();
    console.log(ev);
    this.age = Number((ev.target as HTMLInputElement).value);
  }

  changeHandlerName(ev: Event) {
    ev.preventDefault();
    console.log(ev);
    this.name = (ev.target as HTMLInputElement).value;
  }

  changeHandlerNameSignal(ev: Event) {
    console.log(ev);
    const input = ev.target as HTMLInputElement;
    this.nameSignal.set(input.value);
  }

  // usar un solo handler para los eventos con multiple inputs
  changeHandlerMultipleInputs(ev: Event) {
    ev.preventDefault();
    console.log(ev);
    this.name = (ev.target as HTMLInputElement).value;
    this.age = Number((ev.target as HTMLInputElement).value);
  }
}
