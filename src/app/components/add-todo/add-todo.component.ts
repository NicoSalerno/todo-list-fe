import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export type AddTodoAddEvent = {
  title: string;
  dueDate: Date;
}

@Component({
  selector: 'app-add-todo',
  standalone: false,
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  private modalService = inject(NgbModal);

  closeResult: WritableSignal<string> = signal('');

  @Output()
  save = new EventEmitter<{ title: string; dueDate: Date }>();

  modalRef: any; // Per memorizzare il riferimento al modal

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result: string) => this.closeResult.set(`Closed with: ${result}`),
      () => {}
    );
    console.log('aperto il todo-add')
  }

  onSave(titleInput: HTMLInputElement, dateInput: HTMLInputElement) {
    if (!titleInput.value) {
      alert('Inserisci titolo e data');
      return;
    }

    const newToDo = {
      title: titleInput.value,
      dueDate: new Date(dateInput.value),
    };

    this.save.emit(newToDo); // Emette il nuovo To-Do
    this.modalRef.close(); // Chiude il modal
  }
}
