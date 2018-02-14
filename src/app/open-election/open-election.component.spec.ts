import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenElectionComponent } from './open-election.component';

describe('OpenElectionComponent', () => {
  let component: OpenElectionComponent;
  let fixture: ComponentFixture<OpenElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
