import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';

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

  constructor() { }
  ngOnInit(): void {
  }


  onPostClick(
    commontInput: HTMLTextAreaElement
  ) {
    let commment = commontInput;
    let postId = this.firestorage.genDocId();
    this.storage.upload(
      {
        uploadName: "Upload image Post",
        path: ["Post", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete:(downloadUrl)=>{
          
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
