import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/providers/dashboard.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare let google: any;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
@Component({
  selector: 'app-dashboard-cmp',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  locationCode: any;
  selectedCustomer: string;
  selectedYear: any;
  fleetUtilizationData: { "custId": string; "list": { "date": string; "total": number; "count": number; "percent": number; }[]; };
  violations: any[];
  transporters: any[];
  Transporter = "";
  vehicleAvailablity: any[] = [];
  locations: any[];
  viewPanel = true;
  viewPanel1 = true;


  // for dashboard card
  totalRevanue = 0;
  totalRevanueValue = false;
  totalIssue = 0;
  totalIssueValue = false;
  totalInactive = 0;
  newActivetedTags = 0;
  newActivetedTagsValue = false;
  totalRecharge = 0;
  totalRechargeValue = false;
  months = months;
  constructor(private dashboardservice: DashboardService, private activateRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.dashboardservice.getLocations().subscribe((response: any[]) => {
      this.locations = response
    })
    this.dashboardservice.loadScript().subscribe(
      (res) => { },
      (err) => { },
      () => {
        this.loadGoogleChart();

      }
    );
  }

  loadGoogleChart() {
    google.charts.load('current', { packages: ['corechart', 'bar'], language: 'hi_ln' });

    google.charts.setOnLoadCallback(() => {
      this.activateRoute.queryParams.subscribe((res) => {
        this.selectedYear = (res.year) ? res.year : (new Date()).getFullYear() - 1;
        this.viewPanel = true;
        this.viewPanel1 = true;
        this.getAllChart();
        this.viewPanel = true;
        this.viewPanel1 = true;

      });
    });

  }

  // all at a time
  getAllChart() {
    this.getTrips();
    this.locationCode = '001';
    this.getVehicleAvailability('001');
    this.getViolations();
    this.getTransporters();
  }

  getTrips() {
    this.dashboardservice.getYearlyTrips().subscribe((response: any[]) => {
      const tripMonthlyList = response;
      const tripsData = [[]];
      tripsData[0] = [];
      tripsData[0].push('year')
      tripMonthlyList[0].tripsList.forEach(element => {
        tripsData[0].push(element.tripType);
      });
      tripMonthlyList.forEach((element, index) => {
        tripsData[index + 1] = [];
        tripsData[index + 1].push(element.year);
        element.tripsList.forEach(el => {
          tripsData[index + 1].push(el.count);
        })
      });

      const data = google.visualization.arrayToDataTable(tripsData);
      const options = {
        hAxis: {
          title: 'Year',
          format: ' ',
          viewWindow: {
            max: new Date().getFullYear() - 2,
            min: new Date().getFullYear() + 2
          }
        },
        vAxis: {
          title: 'Count'
        }
        // title: 'Tags Issued Monthly Trend',
        // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
      };
      const chart = new google.visualization.LineChart(document.getElementById('tripChart'));
      google.visualization.events.addListener(chart, 'click', (e) => {
        console.log(e);

        const parts = e.targetID.split('#');
        if (parts[0] == "hAxis")
          console.log(parts);

        // this.getTripsByYear(2019);
      });
      chart.draw(data, options);
    })

  }

  getTripsByYear(year: number) {
    this.dashboardservice.getTripsByYear(year).subscribe((response: any) => {
      const tripMonthlyList = response.tripMonthlyList;
      const tripsData = [[]];
      tripsData[0] = [];
      tripsData[0].push('month')
      tripMonthlyList[0].trips.forEach(element => {
        tripsData[0].push(element.tripType);
      });
      tripMonthlyList.forEach((element, index) => {
        tripsData[index + 1] = [];
        tripsData[index + 1].push(months[element.month - 1]);
        element.trips.forEach(el => {
          tripsData[index + 1].push(el.count);
        })
      });

      const data = google.visualization.arrayToDataTable(tripsData);
      const options = {
        hAxis: { title: 'Month' },
        vAxis: { title: 'Count' }
        // title: 'Tags Issued Monthly Trend',
        // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
      };
      const chart = new google.visualization.LineChart(document.getElementById('tripChart'));
      chart.draw(data, options);
    })
  }

  getVehicleAvailability(locCode) {
    this.dashboardservice.getVehicleAvailablity(locCode).subscribe(response => {
      this.vehicleAvailablity = response;
    })
  }

  hidePanel(val) {
    if (val === 1) {
      this.viewPanel = true;
      // this.monthlyTagIssueTrend();

    } else {
      this.viewPanel1 = true;
      // this.totalMonthlyRevenue();

    }
    // this.loadGoogleChart();
    // if (num) {
    //   this.monthlyRevenueTitle = (num === 1) ? 'Tags Issued Monthly Trend' : ' Retails Tags Issued Monthly Trend';
    //   this.viewPanel1 = value;
    // } else {
    //   this.monthlyIssuedTite = ' Tags Issued Monthly ';
    //   this.viewPanel = value;

    // }
  }


  giveHtmlTooltip(month: string, percent: string, value: string, activeType: string) {
    return `
    <div style="padding:5px;max-width:250px !important">
    <h6 style="margin:0;padding:0">${month}</h6>
    <p style="margin:0;font-size:small">Active (%): <b>${percent}</b></p>
    <p style="margin:0;font-size:small">Tags Issued ${activeType === '30' ? 'Till' : 'In'}: <b>${value}</b></p>
    </div>
    `;
  }

  giveIndianStyleDecimal(amount: number) {
    if (typeof amount !== 'number' && Number.isNaN(amount)) {
      throw Error('Input parameter must be of type number');
    }



    let str = amount.toString();
    // check if amount contains any fraction part
    let fraction = '';
    const dotIndex = str.indexOf('.');
    if (dotIndex > -1) {
      fraction = str.slice(dotIndex + 1);
      str = str.slice(0, dotIndex);
    }

    let newStr = '';
    let sepCount = 0;
    const l = str.length;
    for (let i = l - 1; i > -1; i--) {
      newStr = str[i] + newStr;
      sepCount += 1;
      if (sepCount === 3) {
        if (i !== 0) {
          newStr = ',' + newStr;
        }
        sepCount = 0;
      }
      if (sepCount === 2 && newStr.length > 3) {
        if (i !== 0) {
          newStr = ',' + newStr;
        }
        sepCount = 0;
      }
    }
    return newStr + (fraction ? `.${fraction}` : '');
  }

  getTransporters() {
    this.dashboardservice.getTransporters().subscribe((response: any[]) => {
      this.transporters = response;
      this.Transporter = 'ECUS519'
      this.getFleetUtilizationByCustId(this.Transporter);
    })
  }

  getViolations() {
    this.dashboardservice.getViolations().subscribe((response: any[]) => {
      this.violations = response;
      this.selectedCustomer = 'ECUS875';
      this.getViolationsByCustomer('ECUS875');

    })
  }

  getViolationsByCustomer(custId) {
    this.dashboardservice.getViolationsByCustomerId(custId).subscribe(response => {
      this.drawViolationChart(custId, response.violationsMetricsList);
    })
  }

  drawViolationChart(custId, violationsMetricsList): any {
    const violationChartData = [[]];
    violationChartData[0] = ['Year']
    violationsMetricsList[0].violations.forEach(element => {
      violationChartData[0].push(element.name);
    });
    violationsMetricsList.forEach((element, index) => {
      violationChartData[index + 1] = [];
      violationChartData[index + 1][0] = '' + element.year;
      element.violations.forEach(e => {
        violationChartData[index + 1].push(e.count);
      });
    });
    const data = google.visualization.arrayToDataTable(violationChartData);
    const options = {
      hAxis: { title: 'Year' },
      vAxis: { title: 'Count' },
      isStacked: true
      // title: 'Tags Issued Monthly Trend',
      // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('violationChart'));
    google.visualization.events.addListener(chart, 'click', (e) => {
      const parts = e.targetID.split('#');
      if (parts[0] == "hAxis")
        this.getViolatonsByYear(violationChartData[parseInt(parts[3]) + 1][0], custId);
    });
    chart.draw(data, options);
  }

  getViolatonsByYear(year, custId) {
    this.dashboardservice.getViolationsByCustomerIdAndYear(year, custId).subscribe(response => {
      this.drawViolationChartByMonth(custId, year, response.violationsMetricsList);
    })
  }

  drawViolationChartByMonth(custId, year, violationsMetricsList): any {
    const violationChartData = [[]];
    violationChartData[0] = ['Month']
    violationsMetricsList[0].violations.forEach(element => {
      violationChartData[0].push(element.name);
    });
    violationsMetricsList.forEach((element, index) => {
      violationChartData[index + 1] = [];
      violationChartData[index + 1][0] = '' + months[element.month - 1];
      element.violations.forEach(e => {
        violationChartData[index + 1].push(e.count);
      });
    });
    const data = google.visualization.arrayToDataTable(violationChartData);
    const options = {
      hAxis: { title: 'Months of ' + year },
      vAxis: { title: 'Count' },
      isStacked: true,
      // title: 'Tags Issued Monthly Trend',
      colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('violationChart'));
    google.visualization.events.addListener(chart, 'click', (e) => {
      const parts = e.targetID.split('#');
      if (parts[0] == "hAxis")
        this.getViolatonsByYearAndMonth(custId, year, months.indexOf(violationChartData[parseInt(parts[3]) + 1][0]) + 1);
    });
    chart.draw(data, options);
  }

  getViolatonsByYearAndMonth(custId, year, month) {
    this.dashboardservice.getViolationsByCustomerIdAndYearAndMonth(year, month, custId).subscribe(response => {
      this.drawViolationChartByDay(year, month, response.violationsMetricsList);
    })
  }

  drawViolationChartByDay(year, month, violationsMetricsList): any {
    const violationChartData = [[]];
    violationChartData[0] = ['Day']
    violationsMetricsList[0].violations.forEach(element => {
      violationChartData[0].push(element.name);
    });
    violationsMetricsList.forEach((element, index) => {
      violationChartData[index + 1] = [];
      violationChartData[index + 1][0] = '' + element.day;
      element.violations.forEach(e => {
        violationChartData[index + 1].push(e.count);
      });
    });
    const data = google.visualization.arrayToDataTable(violationChartData);
    const options = {
      hAxis: { title: 'Days of ' + months[month - 1] + '-' + year },
      vAxis: { title: 'Count' },
      isStacked: true,
      // title: 'Tags Issued Monthly Trend',
      colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('violationChart'));
    chart.draw(data, options);
  }

  getFleetUtilizationByCustId(custId) {
    this.dashboardservice.getFleetUtilizationByCustId(custId).subscribe((response) => {
      this.drawFleetUtilization(custId, response.list);
    }, (error) => {

    })
  }

  drawFleetUtilization(custId, fleetUtilizations) {
    const fleetUtilizationChartData = [[]];
    fleetUtilizationChartData[0] = ['Year', 'Percent', { type: 'string', role: 'tooltip' }];
    fleetUtilizations.forEach(v => {
      fleetUtilizationChartData.push(['' + v.year, v.percent, `Total: ${v.total},\nCount: ${v.count},\nPercent: ${v.percent}`]);
    });
    const data = google.visualization.arrayToDataTable(fleetUtilizationChartData);
    const options = {
      hAxis: {
        title: 'Year'
        // slantedText: true,
        // slantedTextAngle: 30
      },
      vAxis: { title: 'Percent' },
      // title: 'Tags Issued Monthly Trend',
      colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('fleetUtilizationChart'));
    google.visualization.events.addListener(chart, 'click', (e) => {
      const parts = e.targetID.split('#');
      if (parts[0] == "hAxis")
        this.getFleetUtilizationByCustIdAndYear(fleetUtilizationChartData[parseInt(parts[3]) + 1][0], custId);
    });
    chart.draw(data, options);
  }

  getFleetUtilizationByCustIdAndYear(year, custId) {
    this.dashboardservice.getFleetUtilizationByCustIdAndYear(year, custId).subscribe((response) => {
      this.drawFleetUtilizationByYear(year, custId, response.list);
    }, (error) => {

    })
  }

  drawFleetUtilizationByYear(year, custId, fleetUtilizations) {
    const fleetUtilizationChartData = [[]];
    fleetUtilizationChartData[0] = ['Month', 'Percent', { type: 'string', role: 'tooltip' }];
    fleetUtilizations.forEach(v => {
      fleetUtilizationChartData.push([months[v.month - 1], v.percent, `Total: ${v.total},\nCount: ${v.count},\nPercent: ${v.percent}`]);
    });
    const data = google.visualization.arrayToDataTable(fleetUtilizationChartData);
    const options = {
      hAxis: {
        title: 'Months of ' + year
        // slantedText: true,
        // slantedTextAngle: 30
      },
      vAxis: { title: 'Percent' },
      // title: 'Tags Issued Monthly Trend',
      colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('fleetUtilizationChart'));
    google.visualization.events.addListener(chart, 'click', (e) => {
      const parts = e.targetID.split('#');
      if (parts[0] == "hAxis") {
        this.getFleetUtilizationByCustIdAndYearAndMonth(months.indexOf(fleetUtilizationChartData[parseInt(parts[3]) + 1][0]) + 1, year, custId)
      }

    });
    chart.draw(data, options);
  }

  getFleetUtilizationByCustIdAndYearAndMonth(month, year, custId) {
    this.dashboardservice.getFleetUtilizationByCustIdYearAndMonth(year, month, custId).subscribe((response) => {
      this.drawFleetUtilizationByYearAndMonth(month, year, custId, response.list);
    }, (error) => {

    })
  }

  drawFleetUtilizationByYearAndMonth(month, year, custId, fleetUtilizations) {
    const fleetUtilizationChartData = [[]];
    fleetUtilizationChartData[0] = ['Day', 'Percent', { type: 'string', role: 'tooltip' }];
    fleetUtilizations.forEach(v => {
      fleetUtilizationChartData.push(['' + v.day, v.percent, `Total: ${v.total},\nCount: ${v.count},\nPercent: ${v.percent}`]);
    });
    const data = google.visualization.arrayToDataTable(fleetUtilizationChartData);
    const options = {
      hAxis: {
        title: 'Days of ' + months[month - 1] + '-' + year
        // slantedText: true,
        // slantedTextAngle: 30
      },
      vAxis: { title: 'Percent' },
      // title: 'Tags Issued Monthly Trend',
      colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('fleetUtilizationChart'));
    chart.draw(data, options);
  }

}



