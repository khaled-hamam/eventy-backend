export type ObserverUpdate = (...data: any[]) => void;

export interface IObserver {
  event?: string;
  callback: ObserverUpdate;
}
