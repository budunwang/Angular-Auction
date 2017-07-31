import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebSocketService {

  private ws: WebSocket;

  constructor() {
  }

  // 创建与服务器的ws通讯
  createObservableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMessage({productId: id});
        return () => this.ws.close();
      }
    );
  }

  // 客户端发送信息
  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
