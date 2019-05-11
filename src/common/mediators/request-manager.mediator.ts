import { Injectable } from '@nestjs/common';
import { IObserver, ObserverUpdate } from './../interfaces/IObserver';

type RequestEvent = 'NEW_EVENT' | 'NEW_REQUEST' | 'REJECTED_REQUEST' | 'ACCEPTED_REQUEST';

class RequestObserver implements IObserver {
  public constructor(public event: RequestEvent, public callback: ObserverUpdate) {}
}

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class RequestManager {
  private _listeners: Map<RequestEvent, RequestObserver[]>;
  private static _instance: RequestManager;
  public static get instance() {
    if (this._instance === undefined) {
      this._instance = new RequestManager();
    }
    return this._instance;
  }

  private constructor() {
    this._listeners = new Map<RequestEvent, RequestObserver[]>();
  }

  public subscribe(event: RequestEvent, callback: ObserverUpdate): RequestObserver {
    const observer = new RequestObserver(event, callback);
    let listeners = this._listeners.get(event);
    if (!listeners) {
      listeners = [];
    }
    listeners.push(observer);
    this._listeners.set(event, listeners);
    return observer;
  }

  public unsubscribe(observer: RequestObserver) {
    const newListeners = this._listeners
      .get(observer.event)
      .filter(currentObserver => currentObserver !== observer);
    this._listeners.set(observer.event, newListeners);
  }

  public notify(event: RequestEvent, ...data: any[]) {
    const listeners = this._listeners.get(event);
    if (listeners) {
      listeners.forEach(observer => observer.callback(...data));
    }
  }
}
