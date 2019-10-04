import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../providers/dashboard.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  selectedYear: string;
  yearList: string[];
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    // this.getMinYear();
    this.activateRoute.queryParams.subscribe((res) => {
      this.selectedYear = (res.year) ? res.year : (new Date()).getFullYear() - 1;
    });
  }

  getMinYear() {
    this.dashboardService.getMinYear()
      .subscribe(res => {
        const currentYear = new Date().getFullYear();
        let minY = res[0].year;

        this.yearList = [];
        while (minY <= currentYear) {
          this.yearList.push(minY);
          minY++;
        }
      }, err => { });
  }

  onYearChange(selectedYear) {
    this.router.navigate(['home/dashboard'], { queryParams: { year: selectedYear } });
  }
}
