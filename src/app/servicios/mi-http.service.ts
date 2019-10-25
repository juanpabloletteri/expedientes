import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MiHttpService {

  constructor(public http: Http) { }

  ruta: string = 'http://localhost/apimun/';
//ruta: string = 'http://expedienteshabvp.atwebpages.com/apimun/';

  public httpGetP(url: string) {
    let headers = new Headers({ token: localStorage.getItem('token') });
    let options = new RequestOptions({ 'headers': headers });
    return this.http
      .get(this.ruta + url, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  public httpPostP(url: string, objeto: any) {
    let headers = new Headers({ token: localStorage.getItem('token') });
    let options = new RequestOptions({ 'headers': headers });
    return this.http
      .post(this.ruta + url, objeto, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleError(error: Response | any) {
    return error;
  }
}
