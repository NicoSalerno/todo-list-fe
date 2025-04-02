import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ToDo } from "./todo-list.entity";

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    protected http = inject(HttpClient); // si usa inject per ottenere un istanza di HttpClient 
    
    list(status: boolean) {
        const params = new HttpParams().set('showCompleted', String(status)); // Converti il booleano in stringa
        return this.http.get<ToDo[]>(`/api/todos/`, { params });
    }
    
    addTodo(title: string, dueDate?: Date) {
        return this.http.post<ToDo>(`/api/todos/`, {title, dueDate})
    }

    checkActivity(id: string){
        return this.http.patch<ToDo>(`/api/todos/${id}/check`, {id});
    }

    uncheckActivity(id: string){
        return this.http.patch<ToDo>(`/api/todos/${id}/uncheck`, {id});
    }
}