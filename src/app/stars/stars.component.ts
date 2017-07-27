import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})

export class StarsComponent implements OnInit, OnChanges {

  private stars: boolean[];

  @Input()
  private rating: number;

  @Input()
  private readOnly: boolean;

  @Output()
  private ratingClick: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    // 初始化星星组件
    this.renderStars();
  }

  // 这里需要监视一下rating的变化
  // 当评论区关闭复原时，需要重新渲染一下星星组件
  ngOnChanges(changes: SimpleChanges): void {
    this.renderStars();
  }

  // 画出星星组件
  renderStars() {
    this.stars = [];
    for (let i = 0; i < 5; i++) {
      this.stars.push(this.rating < i);
    }
  }

  // 星星点击事件
  clickStar(index: number) {
    if (!this.readOnly) {
      // 修改评价星星数，ngOnChanges会监视并进行重新渲染星星组件
      this.rating = index;
      // 触发点击事件，发送星星数
      this.ratingClick.emit(index);
    }
  }
}
