import {Component, OnInit} from '@angular/core';
import {InformationService} from '../services/information.service';
import {Chart} from 'angular-highcharts';
import {States} from '../models/states.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  chart;
  data: States[] = [{state: '', hospitalizedCurrently: 0}];

  constructor(private dataService: InformationService) {
  }

  ngOnInit(): void {
    // We get the data frm the service and sort it descending, then we call the draw cart function
    this.dataService.getData().subscribe(res => {
      this.data = this.dataService.sort(res);
      this.drawChart();
    });
  }

  drawChart() {
    this.chart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Top 5 States of COVID-19 Hospitalized Patients'
      },
      credits: {
        enabled: true
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
    });
    this.data.forEach(states => {
      this.chart.addSeries({
        name: states.state,
        data: [states.hospitalizedCurrently],
        dataLabels: {enabled: true}
      });
    });
  }

  reload() {
    window.location.reload();
  }
}
