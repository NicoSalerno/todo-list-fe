import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ToDo } from '../../../services/todo-list.entity'
import { TodoService } from '../../../services/todo.service';
import { BehaviorSubject, catchError, combineLatest, map, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  protected tdSrv = inject(TodoService);

  private refresh$ = new Subject<void>();

  protected showAll$ = new BehaviorSubject<boolean>(true); 

  todos$ = combineLatest([
    this.refresh$.pipe(startWith(undefined)), 
    this.showAll$
  ]).pipe(
    switchMap(([_, showCompleted]) => {
      return this.tdSrv.list(showCompleted).pipe(
        catchError(err => {
          return []
        }
      ))
    }),
    map(items => items.reverse())
  );

  seeAll(){
    this.showAll$.next(!this.showAll$.value);
    console.log('check on seAll')
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
