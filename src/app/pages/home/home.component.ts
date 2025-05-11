import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '@/app/models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  task = signal<Task[]>([
    {
      id: 1,
      title: 'User el CLI de angular',
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: 'Crear un proyecto de angular',
      completed: false,
      editing: false
    },
    {
      id: 3,
      title: 'Crear un componente',
      completed: false,
      editing: false
    }
  ]);

  // Add Task antiguo sin formularios
  // addTask(event: Event){
  //   event.preventDefault();

  //   const fields = Object.fromEntries(new FormData(event.target as HTMLFormElement));
  //   const taskName = fields['taskName'] as string;

  //   if(!taskName || taskName.trim() === ''){  
  //     alert('Por favor ingresa un nombre para la tarea');
  //     return;
  //   }

  //   this.task.update(tasks => [...tasks, { id: tasks.length +1, title: taskName, completed: false}]);

  //   (event.target as HTMLFormElement).reset();
  // }


  toggleTask(id: number) {
    this.task.update(tasks => tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  deleteTask(id: number) {
    this.task.update(tasks => tasks.filter(task => task.id !== id))
  }

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]
  });

  addTask(event: Event) {
    event.preventDefault();
    if (this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if (value === '') {
        alert('Por favor ingresa un nombre para la tarea');
        return;
      }
      this.task.update(tasks => [...tasks, { id: tasks.length + 1, title: value, completed: false, editing: false }]);
      this.newTaskControl.reset();
    }
  }

  updateTaskEditingMode(id: number) {
    this.task.update(prevTasks => {
      return prevTasks.map(task =>
        task.id === id
          ? { ...task, editing: !task.editing }
          : { ...task, editing: false }
      )
    })
  }

  updateTaskTitle(ev: Event, id: number) {
    ev.preventDefault();

    const value = (ev.target as HTMLFormElement)['updateTitle'].value.trim();
    if (value === '') {
      alert('Por favor ingresa un nombre para la tarea');
      return;
    }
    this.task.update(prevTasks => {
      return prevTasks.map(task =>
        task.id === id
          ? { ...task, title: value, editing: false }
          : task
      )
    })
  }

}
