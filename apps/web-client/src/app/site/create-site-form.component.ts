import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Site } from './site.model';

@Component({
  selector: 'safety-check-app-create-site-form',
  template: `
    <form (ngSubmit)="onCreateSite()" #createSiteForm="ngForm">
      <mat-form-field class="w-full">
        <input
          matInput
          placeholder="Site ID"
          name="siteId"
          #siteId="ngModel"
          [(ngModel)]="site.id"
          required
        />
        <mat-error *ngIf="siteId.invalid && (siteId.dirty || siteId.touched)"
          >Site ID is required.</mat-error
        >
      </mat-form-field>
      <div class="flex justify-end">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="createSiteForm.invalid"
        >
          Create
        </button>
      </div>
    </form>
  `,
  imports: [NgIf, FormsModule, MatInputModule, MatButtonModule],
  standalone: true,
})
export class CreateSiteFormComponent {
  @Output() createSite = new EventEmitter<Site>();
  @Output() cancel = new EventEmitter<void>();

  site: Site = { id: '' };

  onCreateSite() {
    this.createSite.emit(this.site);
    this.resetForm();
  }

  onCancel() {
    this.cancel.emit();
  }

  private resetForm(): void {
    this.site = { id: '' }; // Reset the form
  }
}
