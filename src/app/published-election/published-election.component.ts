import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ElectionService } from '../services/election.service';

@Component({
  selector: 'app-published-election',
  templateUrl: './published-election.component.html',
  styleUrls: ['./published-election.component.scss']
})
export class PublishedElectionComponent implements OnInit {
  @Input('label') label;
  @Output('selectElection') selectElection = new EventEmitter();

  elections;
  constructor(private authService: AuthService, private electionService: ElectionService) { }

  ngOnInit() {
    this.getPublishedElections();
  }
  onSelect(election) {
    this.selectElection.emit(election);
  }

  getPublishedElections() {
    const user = this.authService.getProfile();
    this.electionService.getPublishedElection(user.school_year.id, user.department.id).subscribe(
      (res: any) => {
        this.elections = res.data;

      }
    );
  }

}
