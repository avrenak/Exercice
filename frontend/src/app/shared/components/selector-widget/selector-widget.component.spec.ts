import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorWidgetComponent } from './selector-widget.component';

describe('SelectorWidgetComponent', () => {
  let component: SelectorWidgetComponent;
  let fixture: ComponentFixture<SelectorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
