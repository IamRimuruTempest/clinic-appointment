import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentHistoryPage } from './appointment-history.page';

describe('AppointmentHistoryPage', () => {
  let component: AppointmentHistoryPage;
  let fixture: ComponentFixture<AppointmentHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppointmentHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
