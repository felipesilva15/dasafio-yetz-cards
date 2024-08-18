
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/main/api/player';
import { PlayerService } from 'src/app/main/service/player.service';

@Component({
  selector: 'app-form-player',
  templateUrl: './form-player.component.html',
  styleUrl: './form-player.component.scss'
})
export class FormPlayerComponent {
  data!: Player;
  formGroup!: FormGroup;
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  paramId: number;

  constructor(
    private playerService: PlayerService, 
    private location: Location, 
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute
  ) {
    this.paramId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? '');
    
    this.data = {
      name: '',
      level: null,
      goalkeeper: false
    };
    
    this.formGroup = this.buildFormGroup();

    if (this.paramId) {
      this.loadData();
    }
  }

  private buildFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.data.name, [Validators.required, Validators.maxLength(80)]],
      level: [this.data.level, [Validators.required, Validators.min(1), Validators.max(5)]],
      goalkeeper: [this.data.goalkeeper, [Validators.required]]
    });
  }

  loadData(): void {
    this.isLoading = true;

    this.playerService.get(this.paramId).subscribe({
      next: (res: Player) => {
        this.data = res;

        this.formGroup.patchValue({
          name: this.data.name,
          level: this.data.level,
          goalkeeper: this.data.goalkeeper,
        });

        this.isLoading = false;
      }
    });
  }

  get name() {
    return this.formGroup.get('name');
  }

  get level() {
    return this.formGroup.get('level');
  }

  get goalkeeper() {
    return this.formGroup.get('goalkeeper');
  }

  convertFormToObject(): void {
    this.data.name = this.name.value;
    this.data.level = this.level.value;
    this.data.goalkeeper = this.goalkeeper.value;
  }

  submit(): void {
    this.formGroup.markAllAsTouched();

    if (!this.formGroup.valid) {
      this.scrollTop();

      return;
    }

    this.isSubmitting = true;

    this.convertFormToObject();
    
    if (this.paramId) {
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
    this.playerService.create(this.data).subscribe({
      next: () => {
        this.backPage();
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  update(): void {
    this.playerService.update(this.data, this.paramId).subscribe({
      next: () => {
        this.backPage();
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  backPage(): void {
    this.location.back();
  }
}
