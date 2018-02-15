import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ElectionService } from '../services/election.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import * as cryptoJS from 'crypto-js';
import { MatSelectionList, MatSelectionListChange, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  electionId;
  election;
  positions;
  selectedCandidates = [];
  myVotedCandidates;
  myVotedCandidatesMetadata;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private authService: AuthService, private electionService: ElectionService) { }

  ngOnInit() {
    this.initElection();

  }





  initElection() {

    const decodeKey = this.authService.checkToken();
    const decrypt = cryptoJS.AES.decrypt(localStorage.getItem('election'), decodeKey);
    const election = JSON.parse(decrypt.toString(cryptoJS.enc.Utf8));
    const student = this.authService.getProfile();

    const getElection = this.electionService.getElection(election.id);
    const getPosition = this.electionService.getPosition(election.id);
    const myVotes = this.electionService.myVotes(election.id, student.id);

    combineLatest([getElection, getPosition, myVotes]).subscribe(
      (res: any) => {

        this.election = res[0].data;
        this.positions = res[1].data;
        this.myVotedCandidatesMetadata = res[2];
        this.myVotedCandidates = this.parseCandidates(this.myVotedCandidatesMetadata.data);

        console.log(res);
        console.log(this.myVotedCandidates);



      }
    );
  }


  onSelectCandidate(event: MatSelectionListChange, position) {
    // console.log(obj);
    // console.log(event);

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

    console.log(this.selectedCandidates);



  }

  confirmVote() {
    const user = this.authService.getProfile();
    const candidateIds = this.selectedCandidates.map(candidate => candidate.id);
    console.log(this.election);

    console.log(user);
    console.log(candidateIds);
    this.electionService.vote(this.election.id, user.id, candidateIds).subscribe(
      (res: any) => {
        console.log(res);

      },
      (err) => {
        console.log(err);

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


}
