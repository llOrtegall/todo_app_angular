import { Component, computed, signal, effect, inject, Injector } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Task } from '@/app/models/task.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  injector = inject(Injector);

  // este ngOnInit se ejecuta cuando el componente se inicializa 
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.task.set(tasks);
    };

    this.trackTask();
  }

  trackTask(){
    effect(() => {
      const tasks = this.task();
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, { injector: this.injector })
  }

  task = signal<Task[]>([]);

  filter = signal<'all' | 'completed' | 'pending'>('all');

  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.task();

    if(filter === 'pending') return tasks.filter(task => !task.completed);
    if(filter === 'completed') return tasks.filter(task => task.completed);
    return tasks;
  })

  changeFilter(filter: string) {
    this.filter.set(filter as 'all' | 'completed' | 'pending');
  }
    
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
