import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';

import {ModalDirective} from '../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive'
@Component({
  selector: 'app-admininfo',
  templateUrl: './admininfo.component.html',
  styleUrls: ['./admininfo.component.scss']
})
export class AdmininfoComponent implements OnInit {
  @ViewChild('info', { static: true }) info: ModalDirective;
  @ViewChild('success', { static: true }) success: ModalDirective;
  selectedFile: File ;
  uploadInput: EventEmitter<UploadInput>;
  files: UploadFile[];
  dragOver: boolean;

  loader: boolean = false;
  editProfilForm: FormGroup;  
  constructor() {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
   }

  ngOnInit() {
  }
  
  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
      if (!(this.files.length - 1 === i)) {
        files += ',';
      }
    }
    return files;
  }
  onUploadOutput(output: UploadOutput | any): void {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
  }
}
