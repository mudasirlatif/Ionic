import { Injectable } from '@angular/core';
import { Promotion } from '../../shared/promotion';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: Http, private processhttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello PromotionProvider Provider');
  }
 getPromotions(): Observable<Promotion>
{
	return this.http.get(baseURL + 'promotions')
	.map(res => {return this.processhttpmsgService.extractData(res);})
	.catch(error => {return this.processhttpmsgService.handleError(error);});
}
getPromotion(id: number): Observable<Promotion>
{
	return this.http.get(baseURL + 'promotions/' + id)
	.map(res => {return this.processhttpmsgService.extractData(res);})
	.catch(error => {return this.processhttpmsgService.handleError(error);});
}
getFeaturedPromotion(): Observable<Promotion>
{
	return this.http.get(baseURL + 'promotions?featured=true')
	.map(res => {return this.processhttpmsgService.extractData(res)[0];})
	.catch(error => {return this.processhttpmsgService.handleError(error);});
}
}
