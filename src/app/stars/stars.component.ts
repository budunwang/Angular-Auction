import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})

export class StarsComponent implements OnInit {

  private stars: boolean[];

  @Input()
  private rating: number;

  constructor() {
  }

  ngOnInit() {
    this.stars = [];
    for (let i = 0; i < 5; i++) {
      this.stars.push( this.rating < i);
    }
  }
}
