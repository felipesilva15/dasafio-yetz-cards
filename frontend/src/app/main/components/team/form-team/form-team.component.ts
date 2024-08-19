import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Team } from 'src/app/main/api/team';
import { TeamService } from 'src/app/main/service/team.service';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html',
  styleUrl: './form-team.component.scss'
})
export class FormTeamComponent {
  data!: Team;
  formGroup!: FormGroup;
  isLoading: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private config: DynamicDialogConfig, 
    private ref: DynamicDialogRef,
    private teamService: TeamService,
    private fb: FormBuilder
  ) {
    
    this.data = {
      id: this.config.data?.id,
      name: this.config.data?.name,
      game_id: this.config.data?.game_id,
    };
    
    this.formGroup = this.buildFormGroup();
  }

  private buildFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(40)]]
    });
  }

  get name() {
    return this.formGroup.get('name');
  }

  convertFormToObject(): void {
    this.data.name = this.name.value;
  }

  submit(): void {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      this.scrollTop();

      return;
    }

    this.isSubmitting = true;

    this.convertFormToObject();
    
    if (this.data.id) {
      this.update();
    } else {
      this.create();
    }
  }

  scrollTop(): void {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  create(): void {
    this.teamService.create(this.data).subscribe({
      next: (res: Team) => {
        this.close(res);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  update(): void {
    this.teamService.update(this.data, this.data.id).subscribe({
      next: (res: Team) => {
        this.close(res);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  close(data?: Team) {
    this.ref.close(data);
  }
}
