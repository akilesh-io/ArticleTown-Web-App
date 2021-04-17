import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserArticlesService} from 'src/app/datas/user-articles/user-articles.service';


export interface Tag {
  name: string;
}


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {


  selectedImageFile: File;

  auth = new FirebaseTSAuth;
  firestorage = new FirebaseTSFirestore;
  storage = new FirebaseTSStorage;

  constructor(
    private userArticle: UserArticlesService,
    private dialog: MatDialogRef<CreatePostComponent>) { }
  ngOnInit(): void {
  }



  //Chips 
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  articles: Tag[] = [];

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

  remove(article: Tag): void {
    const index = this.articles.indexOf(article);

    if (index >= 0) {
      this.articles.splice(index, 1);
    }
  }




  onPostClick(
    articleName: HTMLInputElement,
    articleDiscription: HTMLInputElement,
    commentInput: HTMLTextAreaElement
  ) {
    let title = articleName.value;
    let discription = articleDiscription.value;
    let comment = commentInput.value;
    if (comment.length <= 0) return;           //Without article upload

    if (this.selectedImageFile) {               //Can upload photo without article
      this.uploadImagesPost(title, discription, comment);
    } else {
      this.uploadPost(title, discription, comment);
    }

  }

  uploadImagesPost(
    title: string,
    discription: string,
    comment: string) {
    let postId = this.firestorage.genDocId();
    this.storage.upload(
      {
        uploadName: "Upload image Post",
        path: ["Post", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          this.firestorage.create(
            {
              path: ['Posts', postId],
              data: {
                title: title,
                discription: discription,
                article: comment,
                creatorId: this.auth.getAuth().currentUser.uid,
                imageUrl: downloadUrl,
                timestamp: FirebaseTSApp.getFirestoreTimestamp()
              },
              onComplete: (docId) => {
                this.dialog.close();
              }
            }
          );
        }
      }
    );
  }



  uploadPost(
    title: string,
    discription: string,
    comment: string) {
    this.firestorage.create(
      {
        path: ['Posts'],
        data: {
          title: title,
          discription: discription,
          article: comment,
          creatorId: this.auth.getAuth().currentUser.uid,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          this.dialog.close();
        }
      }
    );
  }


  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files[0];

    if (!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result.toString();
        let postPreviewImage = <HTMLInputElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    );

  }
}
