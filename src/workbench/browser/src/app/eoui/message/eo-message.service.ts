import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EoMessageService {
  private subject = new Subject();
  constructor() {}
  onAlert() {
    return this.subject.asObservable();
  }
  success(content, time = 2000) {
    this.subject.next({ type: 'success', content, icon: 'check-one', time });
  }
  warn(content, time = 2000) {
    this.subject.next({ type: 'warn', content, icon: 'info', time });
  }
  error(content, time = 2000) {
    this.subject.next({ type: 'error', content, icon: 'close-one', time });
  }
}