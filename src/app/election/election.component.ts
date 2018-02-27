import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ElectionService } from '../services/election.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import * as cryptoJS from 'crypto-js';
import { MatSelectionList, MatSelectionListChange, MatSnackBar, MatDialog } from '@angular/material';
import { ShowCandidateComponent } from '../modals/show-candidate/show-candidate.component';

declare var Pusher: any;
@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  election;
  positions;
  selectedCandidates = [];
  myVotedCandidates;
  myVotedCandidatesMetadata;
  candidateStanding;
  dataIsLoaded = false;
  isVoting = false;
  pusher;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService, private electionService: ElectionService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.initElection();
    this.electionService.source.subscribe(res => this.initElection()
    );
    this.initPusher();



  }


  initPusher() {
    this.pusher = new Pusher('4051662bb310056f8c60', {
      cluster: 'eu',
      encrypted: true
    });

    const user = this.authService.getProfile();

    const dep_id = user.department.id;
    const sy = user.school_year.id;
    const subscribeTo = `vote${dep_id}sy${sy}`;
    const channel = this.pusher.subscribe(subscribeTo);

    const election = this.getElection();
    Pusher.logToConsole = true;
    channel.bind(`vote${election.id}`, (data) => {
      this.candidateStanding = data.meta.standing_masked;
      try {

        this.cd.detectChanges();
      } catch (err) {

      }
    });
  }

  getElection() {
    const decodeKey = this.authService.checkToken();
    const decrypt = cryptoJS.AES.decrypt(localStorage.getItem('election'), decodeKey);
    return JSON.parse(decrypt.toString(cryptoJS.enc.Utf8));
  }


  initElection() {

    const election = this.getElection();
    const student = this.authService.getProfile();

    const getElection = this.electionService.getElection(election.id);
    const getPosition = this.electionService.getPosition(election.id);
    const myVotes = this.electionService.myVotes(election.id, student.id);

    let is_masked;
    if (election.is_active) {
      is_masked = 1;
    } else if (election.is_published) {
      is_masked = 0;
    }

    const candidateStanding = this.electionService.candidateStanding(election.id, is_masked);
    this.dataIsLoaded = false;
    combineLatest([getElection, getPosition, myVotes, candidateStanding]).subscribe(
      (res: any) => {
        this.dataIsLoaded = true;
        this.election = res[0].data;
        this.positions = res[1].data;
        this.myVotedCandidatesMetadata = res[2];
        this.myVotedCandidates = this.parseCandidates(this.myVotedCandidatesMetadata.data);
        this.candidateStanding = res[3].data;


      }
    );
  }


  onSelectCandidate(event: MatSelectionListChange, position) {

    const selectedCandidate = event.option.value;

    // get number of candidates in position
    const candidatesInPositionCount = this.selectedCandidates.filter((candidate) => candidate.position.id == position.id).length;

    // find candidate in collection

    const findCandidate = this.selectedCandidates.find((candidate) => candidate.id == selectedCandidate.id);

    // allowed candidates for position
    const getPositionMaxLength = position.number_of_winners;


    // check if select
    if (event.option.selected == true) {

      // check if maxed candidates for position
      if (candidatesInPositionCount < getPositionMaxLength) {

        this.selectedCandidates.push(selectedCandidate);
      } else {
        event.option.selected = false;
        this.snackBar.open(`Max number of candidates for ${position.name} is ${getPositionMaxLength}`, 'Okay', {
          duration: 5000
        });
      }

    } else {
      // remove candidate by filtering
      const removeByFilter = this.selectedCandidates.filter((candidates) => candidates.id != selectedCandidate.id);
      this.selectedCandidates = removeByFilter;

    }

    // sort candidates by rank
    this.selectedCandidates.sort((a, b) => {
      if (a.position.rank > b.position.rank) {
        return 1;
      }
      if (a.position.rank < b.position.rank) {
        return -1;
      }
      return 0;
    });



  }

  confirmVote() {
    const user = this.authService.getProfile();
    const candidateIds = this.selectedCandidates.map(candidate => candidate.id);

    this.isVoting = true;
    this.electionService.vote(this.election.id, user.id, candidateIds).subscribe(
      (res: any) => {
        this.electionService.source.next();
        this.isVoting = false;
        this.snackBar.open('You have successfully voted', 'Okay', {
          duration: 5000
        });
      },
      (err) => {
        if (err.status == 422 && 'externalMessage' in err.error) {
          this.snackBar.open(err.error.externalMessage, 'Okay', {
            duration: 5000
          });
        }
        this.isVoting = false;
      }
    );


  }

  parseCandidates(data: Array<any>) {


    const mappedCandidates = data.map(vote => vote.candidate);
    const sortedCandidates = mappedCandidates.sort((a, b) => {
      if (a.position.rank > b.position.rank) {
        return 1;
      }
      if (a.position.rank < b.position.rank) {
        return -1;
      }
      return 0;
    });
    return sortedCandidates;

  }

  showCandidate(candidate) {
    this.dialog.open(ShowCandidateComponent, {
      width: '450px',
      data: {
        candidate: candidate,
        election: this.election

      }
    });
  }


}
