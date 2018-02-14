import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedElectionComponent } from './published-election.component';

describe('PublishedElectionComponent', () => {
  let component: PublishedElectionComponent;
  let fixture: ComponentFixture<PublishedElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
