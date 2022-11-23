import { Component, OnInit } from '@angular/core';
import { Itodo } from './itodo';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const data = localStorage.getItem('todos');
    if (data !== '' && data !== null) {
      this.todos = JSON.parse(data);
    }
  }

  constructor(private loggingservice: LoggingService) {

  }

  todos: Itodo[] = [
    { todo: 'Einkaufen', done: false },
    { todo: 'Lesen', done: false },
    { todo: 'Programmieren', done: true },
  ];

  newTodo = '';

  logging(msg: any) {
    this.loggingservice.log(msg);
  }


  setTodo(event: KeyboardEvent) {
    this.newTodo = (event.target as HTMLInputElement).value;
    console.log(this.newTodo);
  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todos.push({ todo: this.newTodo, done: false });
    }
    this.storeTodos();
    this.logging(this.todos)
  }

  storeTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  countOpenTodos() {
    const done = this.todos.filter((item) => {
      return !item.done;
    });
    return done;
  }

  toggleTodo(index: number) {
    this.todos[index].done = !this.todos[index].done;
    this.storeTodos();
  }
  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.storeTodos();
  }

  title = 'todo-app';
}
