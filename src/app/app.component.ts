import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'todo';
  todos: Todo[] = [];
  newTask: string = '';
  editingId: number | null = null;

  addTodo() {
    if (this.newTask.trim()) {
      this.todos.push({
        id: this.todos.length + 1,
        task: this.newTask,
        completed: false
      });
      this.newTask = '';
      this.saveTodos()
    }
  }
  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
  }

  startEdit(id: number) {
    this.editingId = id;
  }

  saveEdit(todo: Todo) {
    this.editingId = null;
  }
}