import { Injectable } from '@angular/core';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';


@Injectable({
  providedIn: 'root'
})




// Firebase user articles
export class UserArticlesService {

  private firestore: FirebaseTSFirestore;
  articleData: UserArticleData;
  constructor() {
    this.firestore = new FirebaseTSFirestore();

    this.firestore.getDocument(
      {
        path: [
          "Posts", "FZ6qMjf3jfXUeioAwgd7"
        ],
        onComplete: (result) => {
          this.articleData = <UserArticleData>result.data();
        },
        onFail: (err) => {
          // Codes gets executed on fail.
          alert("Failed to retrieve document");
        }

      }
    );

  }
}

export interface UserArticleData {
  title: string,
  discriptin: string,
  article: string

}
