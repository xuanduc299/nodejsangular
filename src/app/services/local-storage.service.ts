import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage; // Sử dụng localStorage
  }

  set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
