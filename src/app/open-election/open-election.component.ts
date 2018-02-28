import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ElectionService } from '../services/election.service';

@Component({
  selector: 'app-open-election',
  templateUrl: './open-election.component.html',
  styleUrls: ['./open-election.component.scss']
})
export class OpenElectionComponent implements OnInit {
  @Input('label') label;
  @Output('selectElection') selectElection = new EventEmitter();
  elections;
  isLoaded = false;
  constructor(private authService: AuthService, private electionService: ElectionService) { }

  ngOnInit() {
    this.getOpenElections();

  }

  onSelect(election) {
    this.selectElection.emit(election);
  }

  getOpenElections() {
    this.isLoaded = false;
    const user = this.authService.getProfile();
    this.electionService.getOpenElection(user.school_year.id, user.department.id).subscribe(
      (res: any) => {

        this.elections = res.data;
        this.isLoaded = true;

      }
    );
  }

}
