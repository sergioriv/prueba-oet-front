import { Component, OnInit } from '@angular/core';
import { ButtonModule, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormModule, RowComponent } from '@coreui/angular';
import { LabelRequiredComponent } from '../../../components/label-required/label-required.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OwnerService } from '../../../core/services/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-owner-form',
  standalone: true,
  imports: [ReactiveFormsModule, RowComponent, ColComponent, FormModule, ButtonModule, CardComponent, CardHeaderComponent, CardBodyComponent, LabelRequiredComponent],
  templateUrl: './owner-form.component.html',
  styleUrl: './owner-form.component.scss'
})
export class OwnerFormComponent implements OnInit {
  title = 'Nuevo propietario';
  ownerFrom: FormGroup;
  ownerEditingid!: number;
  public errorMessage!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: OwnerService,
    private route: ActivatedRoute
  ) {
    this.ownerFrom = this.fb.group({
      document: new FormControl(''),
      first_name: new FormControl(''),
      second_name: new FormControl(''),
      last_names: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl('')
    })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getOwner(Number.parseInt(id))
        .pipe(catchError((error:string) => {
          this.errorMessage = error;
          return EMPTY;
        }))
        .subscribe(response => {

          let ownerEditing = response.data;
          this.ownerEditingid = Number.parseInt(id);

          this.title = `Propietario: ${ownerEditing?.full_name}`

          this.ownerFrom.patchValue({
            document: ownerEditing?.document,
            first_name: ownerEditing?.first_name,
            second_name: ownerEditing?.second_name,
            last_names: ownerEditing?.last_names,
            city: ownerEditing?.city,
            address: ownerEditing?.address,
            phone: ownerEditing?.phone
          })

        });
    }
  }

  onSubmit() {
    if (this.ownerEditingid) {
      this.service.updateOwner(this.ownerFrom.value, this.ownerEditingid).subscribe({
        next:() => {
          this.router.navigate(['/pages/owners'])
        }
      })
    }
      this.service.createOwner(this.ownerFrom.value).subscribe({
        next:() => {
          this.router.navigate(['/pages/owners'])
        }
      })
  }
}
