import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSlotComponent } from './team-slot.component';

describe('TeamSlotComponent', () => {
  let component: TeamSlotComponent;
  let fixture: ComponentFixture<TeamSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamSlotComponent]
    });
    fixture = TestBed.createComponent(TeamSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
