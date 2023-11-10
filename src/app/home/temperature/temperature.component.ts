import { Component, Renderer2, AfterViewInit,Input, signal, computed, OnInit, ViewChild, ElementRef, ContentChild, HostListener } from '@angular/core';
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
  @Input() digit = signal(10);

  @ViewChild('outer') outer!: ElementRef;

  clickListen!: Subscription;

  step = computed(() => (this.max() + 1) / this.points());
  realPeaks = computed(() => this.peaks().map(peak => Math.floor(peak * (1 / this.step()))));
  hueStep = computed(() => 120 / this.points()) ;

  data = signal<any[]>([]);
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.setTermomentr();

    console.log(this.testingNum("MCMXCIV"))
  }

  testingNum(s: string) {
    let fs = s.split('');
    let groupNum:string[] = [];
    for (let i = 0; i < fs.length; i++) {
      if (fs[i] === 'I' && ['V','X'].includes(fs[i + 1])
        || fs[i] === 'X' && ['L','C'].includes(fs[i + 1])
        || fs[i] === 'C' && ['D','M'].includes(fs[i + 1])){
        groupNum = [...groupNum, fs[i]+fs[i+1]];
        i++
      } else {
        groupNum = [...groupNum, fs[i]]
      }
    }
    console.log(groupNum)
  }

  ngAfterViewInit(): void {
    const { top, left, width, height }  = this.outer.nativeElement.getBoundingClientRect()
    let y = top + height / 2;
    let x = left + width / 2;
    const mouseDown$ = fromEvent(this.outer.nativeElement, 'mousedown');
    const mouseMove$ = fromEvent(window, 'mousemove');
    const mouseUp$ = fromEvent(window, 'mouseup');

    mouseDown$.subscribe((event) => {

      mouseMove$
        .pipe(takeUntil(mouseUp$),debounceTime(5))
        .subscribe((moveEvent) => {
          console.log(moveEvent);
          this.tracker(moveEvent, y, x)
        });
    });
  }

tracker(e: any, y:number, x: number) {


    let pointerY = e.pageY;
    let pointerX = e.pageX;
    console.log(e)


    let rad = Math.atan2(pointerY - y, pointerX - x);
    if (rad < 0) {
      rad = 2 * Math.PI + rad;
    }
    let deg = 180 * rad / Math.PI - 135;
    if (deg > -135 && deg < -90) {
      deg = 225 + (135 + deg);
    }
    if (deg < 0) {
      if (deg < -45) {
        deg = 180;
      } else {
        deg = 0;
      }
    }
    let v = deg / 270 * (this.max() - 0) + 0
    this.onDigitChange(Math.floor(v))

  }

  onDigitChange(number: number){
    console.log(number)
    if(number) {
      this.digit.set(number)

    }
  }

  setTermomentr(){

    for (let i = 0; i < this.points(); i++) {
      let obj = {};
      const iString = i.toString()
      const degree = i * (this.radius() / (this.points() - 1)) - this.radius() / 2;
      obj = Object.assign(obj, {degree: degree});
      const isPeak = this.realPeaks().indexOf(i) > -1;
      const gaugeInner = `<i class="bar${isPeak ? ' peak' : ''}" style="transform: rotate(${degree}deg)"></i>`;
      obj = Object.assign(obj, {isPeak: isPeak});
      const intStep = Math.ceil(this.step() * i);
      const intNextStep = Math.ceil(this.step() * (i + 1));

      let styles = `transition-delay: ${ (i / this.digit()) * (i / this.digit()) + 1 }s;`;

      if (intStep <= this.digit()) {
          styles += `background-color: hsl(${240 + i * this.hueStep()}, 92%, 64%);`;
      }
      const hsl = 240 + i * this.hueStep();
      obj = Object.assign(obj, {hsl: hsl});
      if (intStep > this.digit() || (intStep <= this.digit() && intNextStep <= this.digit())) {
          styles += `
      -webkit-transform: rotate(${degree}deg);
      -moz-transform: rotate(${degree}deg);
      -ms-transform: rotate(${degree}deg);
      -o-transform: rotate(${degree}deg);
      transform: rotate(${degree}deg);`;
      } else {
          if (intNextStep > this.digit())
              styles += `
          -webkit-transform: rotate(${degree}deg) translateY(-.3em);
          -moz-transform: rotate(${degree}deg) translateY(-.3em);
          -ms-transform: rotate(${degree}deg) translateY(-.3em);
          -o-transform: rotate(${degree}deg) translateY(-.3em);
          transform: rotate(${degree}deg) translateY(-.3em);
          height: 1em;`;
      }


      const gaugeOuter = `<i class="bar" style="${styles}"></i>`;

      if (isPeak) {
          // const digit = $(`<span class="digit">${this.peaks[this.realPeaks.indexOf(i)]}</span>`);
          // const peakOffset = gaugeInner.find('.peak').last().offset();

          // gaugeDigits.append(digit);

          // if (degree > -5 && degree < 5)
          //     digit.offset({left: peakOffset.left - 5, top: peakOffset});
          // else
          //     digit.offset(peakOffset);

          // setTimeout(function () {
          //     gaugeDigits.addClass('scale');
          // }, 1)

      }
      this.data.set([...this.data(), obj])
    }
    console.log(this.data())
  }
}
