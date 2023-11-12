import { NgModule } from "@angular/core";

import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatListModule,MatSliderModule, MatProgressSpinnerModule],
  exports: [MatSidenavModule, MatButtonModule, MatIconModule, MatListModule,MatSliderModule, MatProgressSpinnerModule],
})

export class MaterialModule {}
