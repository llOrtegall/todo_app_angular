import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '@/app/models/task.model'

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  task = signal<Task[]>([
    {
      id: 1,
      title: 'User el CLI de angular',
      completed: false
    },
    {
      id: 2,
      title: 'Crear un proyecto de angular',
      completed: false
    },
    {
      id: 3,
      title: 'Crear un componente',
      completed: false
    }
  ]);

  addTask(event: Event){
    event.preventDefault();
    
    const input = event.target as HTMLFormElement;
    const newTask = input['taskName'].value;

    this.task.update(tasks => [...tasks, { id: tasks.length + 1, title: newTask, completed: false }])
    input['taskName'].value = '';
  }

  toggleTask(id: number){
    this.task.update(tasks => tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task))
  }

  deleteTask(id: number){
    this.task.update(tasks => tasks.filter(task => task.id !== id))
  }
}
