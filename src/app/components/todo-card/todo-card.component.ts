import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../../../services/todo-list.entity';

@Component({
  selector: 'app-todo-card',
  standalone: false,
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})
export class TodoCardComponent {

  @Input() toDo!: ToDo; 

  @Output() onCheck: EventEmitter<ToDo> = new EventEmitter(); 
  @Output() unCheck: EventEmitter<ToDo> = new EventEmitter();  
  
  onToggleCheck() {
    if (this.toDo.completed) {
      this.unCheck.emit(this.toDo);  
      console.log('uncheck')
    } else {
      this.onCheck.emit(this.toDo);
      console.log('check')
    }
  }
}
