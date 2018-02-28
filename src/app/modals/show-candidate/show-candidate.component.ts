import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.scss']
})
export class ShowCandidateComponent implements OnInit {
  candidate;
  election;
  profile;
  constructor( @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.candidate = this.data.candidate;
    this.election = this.data.election;
    this.profile = this.candidate.student_profile;

  }

}
