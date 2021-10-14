import { Component, OnInit } from '@angular/core';
import { TransferService } from '../services/transfer.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  public companiesList: any;
  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    this.transferService.getCompanies().subscribe((res) => {
      console.log(res);
      this.companiesList = res;
    });
  }
}
