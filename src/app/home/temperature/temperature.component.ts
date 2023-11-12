import { Component, Renderer2, AfterViewInit,Input, signal, computed, OnInit, ViewChild, ElementRef, ContentChild, HostListener, effect } from '@angular/core';
import { Subscription, debounce, debounceTime, forkJoin, fromEvent, merge, mergeMap, take, takeUntil, tap, zip } from 'rxjs'

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],

})
export class TemperatureComponent implements OnInit, AfterViewInit{
  @Input() points = signal(40);
  @Input() radius = signal(180);
  @Input() max = signal(60);
  @Input() peaks = signal([10, 30, 50]);
  @Input() digit = signal(40);
  @Input() unit = signal('°C');
  @Input() subtitle = signal('Celcious');
  arr = signal<any>([]);
  displayDigit = signal(0)
  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    for (let i = 1; i <= this.max(); i++) {
      this.arr.update(() => [...this.arr(), {
        deg: Math.floor(6 * i),
        isPeak: this.peaks().includes(i),
        value: this.digit() <= i ? true : false,
      } ])
    }

    this.testdfsf()
  }

  testdfsf() {
    if (this.digit() === this.displayDigit()){
      return
    }
    const setDigit = setTimeout(() => {
      this.displayDigit.update(() =>this.displayDigit() + 1);
      this.testdfsf()
      clearTimeout(setDigit)
   }, 10)
  }



}
