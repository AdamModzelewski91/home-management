import { Component, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = signal<string>('home-management')
  title$ = toObservable(this.title);
  counterObservable = interval(1000);
  counter = toSignal(this.counterObservable, {initialValue: 0})
  ngOnInit(): void {
    this.title.set('new home')
    this.title$.subscribe(x => console.log(x + '_' + this.counter()))
  }
}
