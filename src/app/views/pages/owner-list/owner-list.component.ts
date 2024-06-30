import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { OwnerService } from '../../../core/services/owner.service';
import { IOwner } from '../../../interfaces/owner';
import { ApiResponse } from '../../../interfaces/api-response';
import { ErrorMessageComponent } from '../../../components/error-message/error-message.component';
import { ButtonModule, CardBodyComponent, CardComponent, CardHeaderComponent, TableDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, ErrorMessageComponent, ButtonModule, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective],
  templateUrl: './owner-list.component.html',
  styleUrl: './owner-list.component.css'
})
export class OwnerListComponent implements OnInit {
  title = "Propietarios";
  owners$!: Observable<ApiResponse<IOwner[]>>;
  public errorMessage!: string;
  constructor(private service: OwnerService) {}

  ngOnInit(): void {
    this.owners$ = this.service.getOwnerResult()
      .pipe(catchError((error:string) => {
        this.errorMessage = error;
        return EMPTY;
      }));
  }
}
