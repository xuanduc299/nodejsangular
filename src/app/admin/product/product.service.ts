import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly PATH = "http://localhost:8085/"

  constructor() { }

  public async searchBanner() {
    return await this.PATH + "/api/student";
  }
}
