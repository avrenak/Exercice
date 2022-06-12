import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { ErrorWidgetComponent } from "./components/error-widget/error-widget.component";
import { SelectorWidgetComponent } from './components/selector-widget/selector-widget.component';

@NgModule({
  declarations: [
    ErrorWidgetComponent,
    SelectorWidgetComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ErrorWidgetComponent,
    SelectorWidgetComponent,
    MaterialModule
  ]
})
export class SharedModule {}
