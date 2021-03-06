import { Component, OnInit, AfterViewInit } from '@angular/core';
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

export class DashboardComponent implements OnInit, AfterViewInit {
  locationCode: any;
  selectedCustomer: string;
  selectedYear: any;
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

  tripsChart: any = {};
  violationsChart: any = {};
  fleetUtilizationsChart: any = {};
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

  ngAfterViewInit() {

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
    this.getTransporters();
  }

  getTrips() {
    this.dashboardservice.getYearlyTrips().subscribe((response: any) => {
      this.tripsChart.data = response.tripMetricsList;
      this.drawTripsChartYearwise(response.tripMetricsList);
    });
  }

  drawTripsChartYearwise(tripsResponse) {
    this.tripsChart.drill = 0;
    const tripsData = [[]];
    tripsData[0] = [];
    tripsData[0].push('year')
    tripsResponse[0].tripsList.forEach(element => {
      tripsData[0].push(element.tripType);
      tripsData[0].push({ type: 'string', role: 'tooltip' });
    });
    tripsData[0].push('All');
    tripsResponse.forEach((element, index) => {
      tripsData[index + 1] = [];
      tripsData[index + 1].push('' + element.year);
      element.tripsList.forEach(el => {
        tripsData[index + 1].push(el.count);
        tripsData[index + 1].push(`${element.year}\n${el.tripType}:${el.count}\nTotal: ${element.count}`);
      });
      tripsData[index + 1].push(0);
    });

    const data = google.visualization.arrayToDataTable(tripsData);
    const options = {
      //bar: { groupWidth: "10%" },
      hAxis: {
        title: 'Year',
        // format: '#a'
        // viewWindow: {
        //   max: new Date().getFullYear() - 2,
        //   min: new Date().getFullYear()
        // }
      },
      vAxis: {
        title: 'Count'
      },
      isStacked: true
      // title: 'Tags Issued Monthly Trend',
      // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('tripChart'));
    google.visualization.events.addListener(chart, 'click', (e) => {
      const parts = e.targetID.split('#');
      if (parts[0] == "hAxis") {
        this.getTripsByYear(tripsData[parseInt(parts[3]) + 1][0]);
      } else if (parts[0] == 'legendentry') {
        const tripsResponse: any[] = JSON.parse(JSON.stringify(this.tripsChart.data));
        if (parseInt(parts[1]) != tripsResponse[0].tripsList.length) {
          tripsResponse.forEach(o => {
            o.tripsList.forEach((i, index) => {
              if (index != parseInt(parts[1])) {
                i.count = 0;
              }
            });
          });
        }
        this.drawTripsChartYearwise(tripsResponse);
      }

    });
    chart.draw(data, options);
    $('#tripChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
    $('#tripChart > div > div > div > svg > g > g').css('cursor', 'pointer');
  }

  getTripsByYear(year: number) {
    this.tripsChart.year = year;
    this.dashboardservice.getMonthlyTrips(year).subscribe((response: any) => {
      this.tripsChart.data = response.tripMetricsList;
      this.drawTripsChartByYear(year, response.tripMetricsList);
    })
  }

  drawTripsChartByYear(year, tripMonthlyList) {
    this.tripsChart.drill = 1;
    const tripsData = [[]];
    tripsData[0] = [];
    tripsData[0].push('month')
    tripMonthlyList[0].tripsList.forEach(element => {
      tripsData[0].push(element.tripType);
      tripsData[0].push({ type: 'string', role: 'tooltip' });
    });
    tripsData[0].push('All');
    tripMonthlyList.forEach((element, index) => {
      tripsData[index + 1] = [];
      tripsData[index + 1].push(months[element.month - 1]);
      element.tripsList.forEach(el => {
        tripsData[index + 1].push(el.count);
        tripsData[index + 1].push(`${months[element.month - 1]}\n${el.tripType}:${el.count}\nTotal: ${element.count}`);
      });
      tripsData[index + 1].push(0);
    });

    const data = google.visualization.arrayToDataTable(tripsData);
    const options = {
      hAxis: { title: 'Months of ' + year },
      vAxis: { title: 'Count' },
      isStacked: true
      // title: 'Tags Issued Monthly Trend',
      // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('tripChart'));
    google.visualization.events.addListener(chart, 'click', (e) => {
      const parts = e.targetID.split('#');
      if (parts[0] == "hAxis") {
        this.getTripsByMonth(year, months.indexOf(tripsData[parseInt(parts[3]) + 1][0]) + 1);
      } else if (parts[0] == 'legendentry') {
        const tripsResponse: any[] = JSON.parse(JSON.stringify(this.tripsChart.data));
        if (parseInt(parts[1]) != tripsResponse[0].tripsList.length) {
          tripsResponse.forEach(o => {
            o.tripsList.forEach((i, index) => {
              if (index != parseInt(parts[1])) {
                i.count = 0;
              }
            });
          });
        }
        this.drawTripsChartByYear(year, tripsResponse);
      }

    });
    chart.draw(data, options);
    $('#tripChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
    $('#tripChart > div > div > div > svg > g > g').css('cursor', 'pointer');
  }

  getTripsByMonth(year: number, month: number) {
    this.tripsChart.year = year;
    this.tripsChart.month = month;
    this.dashboardservice.getDayWiseTrips(year, month).subscribe((response: any) => {
      this.tripsChart.data = response.tripMetricsList;
      this.drawTripsChartByMonth(month, year, response.tripMetricsList)
    })
  }

  drawTripsChartByMonth(month, year, tripMonthlyList) {
    this.tripsChart.drill = 2;
    const tripsData = [[]];
    tripsData[0] = [];
    tripsData[0].push('Day')
    tripMonthlyList[0].tripsList.forEach(element => {
      tripsData[0].push(element.tripType);
      tripsData[0].push({ type: 'string', role: 'tooltip' });
    });
    tripsData[0].push('All');

    tripMonthlyList.forEach((element, index) => {
      tripsData[index + 1] = [];
      tripsData[index + 1].push('' + element.day);
      element.tripsList.forEach(el => {
        tripsData[index + 1].push(el.count);
        tripsData[index + 1].push(`${element.day}\n${el.tripType}:${el.count}\nTotal: ${element.count}`);
      });
      tripsData[index + 1].push(0);
    });

    const data = google.visualization.arrayToDataTable(tripsData);
    const options = {
      hAxis: { title: 'Days of ' + months[month - 1] + '-' + year },
      vAxis: { title: 'Count' },
      isStacked: true
      // title: 'Tags Issued Monthly Trend',
      // colors: ['#26c6da', '#ff425c', '#2ad8a4', '#ff864a', '#a94442']
    };
    const chart = new google.visualization.ColumnChart(document.getElementById('tripChart'));
    google.visualization.events.addListener(chart, 'click', (e) => {
      const parts = e.targetID.split('#');
      if (parts[0] == 'legendentry') {
        const tripsResponse: any[] = JSON.parse(JSON.stringify(this.tripsChart.data));
        if (parseInt(parts[1]) != tripsResponse[0].tripsList.length) {
          tripsResponse.forEach(o => {
            o.tripsList.forEach((i, index) => {
              if (index != parseInt(parts[1])) {
                i.count = 0;
              }
            });
          });
        }
        this.drawTripsChartByMonth(month, year, tripsResponse);
      }

    });
    chart.draw(data, options);
    $('#tripChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
    $('#tripChart > div > div > div > svg > g > g').css('cursor', 'pointer');
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
      this.selectedCustomer = 'ECUS875';
      this.getFleetUtilizationByCustId(this.Transporter);
      this.getViolationsByCustomer(this.selectedCustomer);
    })
  }


  getViolationsByCustomer(custId) {
    this.dashboardservice.getViolationsByCustomerId(custId).subscribe(response => {
      this.violationsChart.data = response.violationsMetricsList;
      this.drawViolationChart(custId, response.violationsMetricsList);
    })
  }

  drawViolationChart(custId, violationsMetricsList): any {
    this.violationsChart.drill = 0;
    const violationChartData = [[]];
    violationChartData[0] = ['Year']
    violationsMetricsList[0].violations.forEach(element => {
      violationChartData[0].push(element.name);
    });
    violationChartData[0].push('All');

    violationsMetricsList.forEach((element, index) => {
      violationChartData[index + 1] = [];
      violationChartData[index + 1][0] = '' + element.year;
      element.violations.forEach(e => {
        violationChartData[index + 1].push(e.count);
      });
      violationChartData[index + 1].push(0);
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
      else if (parts[0] == 'legendentry') {
        const violationsMetricsList = JSON.parse(JSON.stringify(this.violationsChart.data));
        if (parseInt(parts[1]) != violationsMetricsList[0].violations.length) {
          violationsMetricsList.forEach(o => {
            o.violations.forEach((i, index) => {
              if (index != parseInt(parts[1])) {
                i.count = 0;
              }
            });
          });
        }
        this.drawViolationChart(custId, violationsMetricsList);
      }
    });
    chart.draw(data, options);
    $('#violationChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
    $('#violationChart > div > div > div > svg > g > g').css('cursor', 'pointer');
  }

  getViolatonsByYear(year, custId) {
    this.dashboardservice.getViolationsByCustomerIdAndYear(year, custId).subscribe(response => {
      this.violationsChart.data = response.violationsMetricsList;
      this.drawViolationChartByMonth(custId, year, response.violationsMetricsList);
    })
  }

  drawViolationChartByMonth(custId, year, violationsMetricsList): any {
    this.violationsChart.drill = 1;
    this.violationsChart.year = year;
    const violationChartData = [[]];
    violationChartData[0] = ['Month']
    violationsMetricsList[0].violations.forEach(element => {
      violationChartData[0].push(element.name);
    });
    violationChartData[0].push('All');
    violationsMetricsList.forEach((element, index) => {
      violationChartData[index + 1] = [];
      violationChartData[index + 1][0] = '' + months[element.month - 1];
      element.violations.forEach(e => {
        violationChartData[index + 1].push(e.count);
      });
      violationChartData[index + 1].push(0);
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
      else if (parts[0] == 'legendentry') {
        const violationsMetricsList = JSON.parse(JSON.stringify(this.violationsChart.data));
        if (parseInt(parts[1]) != violationsMetricsList[0].violations.length) {
          violationsMetricsList.forEach(o => {
            o.violations.forEach((i, index) => {
              if (index != parseInt(parts[1])) {
                i.count = 0;
              }
            });
          });
        }
        this.drawViolationChartByMonth(custId, year, violationsMetricsList);
      }
    });
    chart.draw(data, options);
    $('#violationChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
    $('#violationChart > div > div > div > svg > g > g').css('cursor', 'pointer');
  }

  getViolatonsByYearAndMonth(custId, year, month) {
    this.dashboardservice.getViolationsByCustomerIdAndYearAndMonth(year, month, custId).subscribe(response => {
      this.violationsChart.data = response.violationsMetricsList;
      this.drawViolationChartByDay(year, month, response.violationsMetricsList);
    })
  }

  drawViolationChartByDay(year, month, violationsMetricsList): any {
    this.violationsChart.drill = 2;
    const violationChartData = [[]];
    violationChartData[0] = ['Day']
    violationsMetricsList[0].violations.forEach(element => {
      violationChartData[0].push(element.name);
    });
    violationChartData[0].push('All');
    violationsMetricsList.forEach((element, index) => {
      violationChartData[index + 1] = [];
      violationChartData[index + 1][0] = '' + element.day;
      element.violations.forEach(e => {
        violationChartData[index + 1].push(e.count);
      });
      violationChartData[index + 1].push(0);
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
    google.visualization.events.addListener(chart, 'click', (e) => {
      const parts = e.targetID.split('#');
      if (parts[0] == 'legendentry') {
        const violationsMetricsList = JSON.parse(JSON.stringify(this.violationsChart.data));
        if (parseInt(parts[1]) != violationsMetricsList[0].violations.length) {
          violationsMetricsList.forEach(o => {
            o.violations.forEach((i, index) => {
              if (index != parseInt(parts[1])) {
                i.count = 0;
              }
            });
          });
        }
        this.drawViolationChartByDay(year, month, violationsMetricsList);
      }
    });
    chart.draw(data, options);
    $('#violationChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
    $('#violationChart > div > div > div > svg > g > g').css('cursor', 'pointer');
  }

  getFleetUtilizationByCustId(custId) {
    this.dashboardservice.getFleetUtilizationByCustId(custId).subscribe((response) => {
      this.fleetUtilizationsChart.data = response.list;
      this.drawFleetUtilization(custId, response.list);
    }, (error) => {

    })
  }

  drawFleetUtilization(custId, fleetUtilizations) {
    this.fleetUtilizationsChart.drill = 0;
    const fleetUtilizationChartData = [[]];
    fleetUtilizationChartData[0] = ['Year', 'Percent', { type: 'string', role: 'tooltip' }];
    fleetUtilizations.forEach(v => {
      fleetUtilizationChartData.push(['' + v.year, v.percent, `Total: ${v.total},\nUtilized: ${v.utilized},\nPercent: ${v.percent}`]);
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
    $('#fleetUtilizationChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
  }

  getFleetUtilizationByCustIdAndYear(year, custId) {
    this.dashboardservice.getFleetUtilizationByCustIdAndYear(year, custId).subscribe((response) => {
      this.fleetUtilizationsChart.data = response.list;
      this.drawFleetUtilizationByYear(year, custId, response.list);
    }, (error) => {

    })
  }

  drawFleetUtilizationByYear(year, custId, fleetUtilizations) {
    this.fleetUtilizationsChart.drill = 1;
    this.fleetUtilizationsChart.year = year;
    const fleetUtilizationChartData = [[]];
    fleetUtilizationChartData[0] = ['Month', 'Percent', { type: 'string', role: 'tooltip' }];
    fleetUtilizations.forEach(v => {
      fleetUtilizationChartData.push([months[v.month - 1], v.percent, `Total: ${v.total},\nUtilized: ${v.utilized},\nPercent: ${v.percent}`]);
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
    $('#fleetUtilizationChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
  }

  getFleetUtilizationByCustIdAndYearAndMonth(month, year, custId) {
    this.dashboardservice.getFleetUtilizationByCustIdYearAndMonth(year, month, custId).subscribe((response) => {
      this.fleetUtilizationsChart.data = response.list;
      this.drawFleetUtilizationByYearAndMonth(month, year, custId, response.list);
    }, (error) => {

    })
  }

  drawFleetUtilizationByYearAndMonth(month, year, custId, fleetUtilizations) {
    this.fleetUtilizationsChart.drill = 2;
    const fleetUtilizationChartData = [[]];
    fleetUtilizationChartData[0] = ['Day', 'Percent', { type: 'string', role: 'tooltip' }];
    fleetUtilizations.forEach(v => {
      fleetUtilizationChartData.push(['' + v.day, v.percent, `Total: ${v.total},\nUtilized: ${v.utilized},\nPercent: ${v.percent}`]);
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
    $('#fleetUtilizationChart > div > div > div > svg > g > g > g').css('cursor', 'pointer');
  }

  onResizeWindow() {
    switch (this.tripsChart.drill) {
      case 0:
        this.drawTripsChartYearwise(this.tripsChart.data);
        break;
      case 1:
        this.drawTripsChartByYear(this.tripsChart.year, this.tripsChart.data);
        break;
      case 2:
        this.drawTripsChartByMonth(this.tripsChart.month, this.tripsChart.year, this.tripsChart.data)
        break;
    }

    switch (this.violationsChart.drill) {
      case 0:
        this.drawViolationChart(this.selectedCustomer, this.violationsChart.data);
        break;
      case 1:
        this.drawViolationChartByMonth(this.selectedCustomer, this.violationsChart.year, this.violationsChart.data)
        break;
      case 2:
        this.drawViolationChartByDay(this.violationsChart.year, this.violationsChart.month, this.violationsChart.data);
        break;
    }

     switch (this.fleetUtilizationsChart.drill) {
       case 0:
        this.drawFleetUtilization(this.Transporter, this.fleetUtilizationsChart.data)
        break;
       case 1:
         this.drawFleetUtilizationByYear(this.fleetUtilizationsChart.year, this.Transporter, this.fleetUtilizationsChart.data);
         break;
       case 2:
         this.drawFleetUtilizationByYearAndMonth(this.fleetUtilizationsChart.month, this.fleetUtilizationsChart.year, this.Transporter, this.fleetUtilizationsChart.data);
         break;

     }
  }

  drillBackCharts(name, drillCount) {
    switch (name) {
      case 'tripChart':
        switch (drillCount) {
          case 1:
            this.getTrips();
            break;
          case 2:
            this.getTripsByYear(this.tripsChart.year);
            break;
        }
        break;

      case 'violationChart':
        switch (drillCount) {
          case 1:
            this.getViolationsByCustomer(this.selectedCustomer);
            break;
          case 2:
            this.getViolatonsByYear(this.violationsChart.year, this.selectedCustomer);
            break;
        }
        break;

      case 'fleetUtilizationChart':
        switch (drillCount) {
          case 1:
            this.getFleetUtilizationByCustId(this.Transporter);
            break;
          case 2:
            this.getFleetUtilizationByCustIdAndYear(this.fleetUtilizationsChart.year, this.Transporter);
            break;
        }
        break;
    }
  }

}



