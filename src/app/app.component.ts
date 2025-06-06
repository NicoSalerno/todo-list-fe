import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ToDo } from '../services/todo-list.entity';
import { TodoService } from '../services/todo.service';
import { BehaviorSubject, combineLatest, startWith, Subject, switchMap } from 'rxjs';

export type ToDoSeeEvent = {
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {

  protected tdSrv = inject(TodoService);

  private refresh$ = new Subject<void>();

  protected showAll$ = new BehaviorSubject<boolean>(true); 

  todos$ = combineLatest([
    this.refresh$.pipe(startWith(undefined)), 
    this.showAll$
  ]).pipe(
    switchMap(([_, showCompleted]) => this.tdSrv.list(showCompleted))
  );

  seeAll(){
    this.showAll$.next(!this.showAll$.getValue());
  }

  onCheck(toDo: ToDo){
    this.tdSrv.checkActivity(toDo.id).subscribe(() => {
      this.refresh$.next();
    });
  }

  unCheck(toDo: ToDo){
    this.tdSrv.uncheckActivity(toDo.id).subscribe(() => {
      this.refresh$.next();
    });
  }

  onAdd(event: { title: string; dueDate: Date }) {
    this.tdSrv.addTodo(event.title, event.dueDate).subscribe((newToDo: ToDo) => {
      this.refresh$.next(); // Aggiorna la lista
    });
  }
  
}

