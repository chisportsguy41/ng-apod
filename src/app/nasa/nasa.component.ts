import { Component, OnInit } from '@angular/core';
import { NASA } from '../nasa';
import { NasaService } from '../nasa.service';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.scss']
})
export class NasaComponent implements OnInit {
  NASA: NASA;

  constructor(private nasaService: NasaService) { }

  ngOnInit() {
    this.getNasa();
  }

  getNasa(date = null): void {
    this.nasaService.getNasa(date)
      .subscribe(response=> this.NASA = response);
  }

  submit(): void {
    var x = document.getElementById("inputDate");
    var date = x[0].value;
    this.getNasa(date);
  }

}
