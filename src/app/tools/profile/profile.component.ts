import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

//For chips
export interface Article {
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  @Input() show: boolean;                         //Control when the user detail shown

  user = false;
  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;


  //DOB setting 
  minDate: Date;
  maxDate: Date;
  constructor() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear - 2, 11, 31);

    this.firestore = new FirebaseTSFirestore;
    this.auth = new FirebaseTSAuth;
  }


  //Chips 
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  articles: Article[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our article preference
    if ((value || '').trim()) {
      this.articles.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(article: Article): void {
    const index = this.articles.indexOf(article);

    if (index >= 0) {
      this.articles.splice(index, 1);
    }
  }



  //button click event to db
  onContinueClick(
    firstName: HTMLInputElement,
    lastName: HTMLInputElement
  ) {

    let Fname = firstName.value;
    let Lname = lastName.value;
    this.firestore.create(
      {
        path: ["Users", this.auth.getAuth().currentUser.uid],
        data: {
          firstName: Fname,
          lastName: Lname
        },
        onComplete: (docId) => {
          alert("profile is created"),
          firstName.value = "";
          lastName.value = "";
          userdb();
        },
        onFail: (err) => {
          alert('Not uploaded')

        }
      }
    );
    function userdb() {
      return this.user = true;
    }
  }




  ngOnInit(): void {



  }

}
