import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUploadComponent {
  requiredFileType = 'image/*';
  fileName = '';
  uploadProgress = 0;
  uploadSub: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.fileName = file.name;

    const formData = new FormData();
    formData.append('image', file);

    const upload$ = this.http
      .post('/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(finalize(() => this.reset()));

    this.uploadSub = upload$.subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round((100 * event.loaded) / event.total);
      }
    });
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  private reset() {
    this.uploadProgress = 0;
  }
}
