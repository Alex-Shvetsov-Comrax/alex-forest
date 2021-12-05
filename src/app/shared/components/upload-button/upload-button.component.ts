import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
})
export class UploadButtonComponent implements OnInit {

  @Input() multi: boolean;
  @Input() table: boolean;
  @Input() public label: string = 'לחץ להעלאת קובץ';

  public fileName: string;

  @Output() file: EventEmitter<File> = new EventEmitter<File>();

  constructor() {}

  ngOnInit(): void {}

  public onFileChange(file: File) {
    this.fileName = file.name;
    this.file.emit(file);
  }
}
