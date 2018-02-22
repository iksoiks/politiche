import {Injectable, OnInit} from '@angular/core';
import {Pronostico} from "../../model/partiti";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class PoliticalService{
  totale: number;
  pronostico: Pronostico;

  constructor(private http: HttpClient ) {
    console.log("constructor politacalService");
    this.totale = 0;
    this.pronostico = new Pronostico();
    this.getUserInfo();
  }

  getUserInfo(){
    console.log("Getting User Info 1");
    this.http.get('http://ipinfo.io/geo').subscribe(        // MAX 1000 AL GIORNO
        (data) => {
          console.log(data);
          this.pronostico.region = data['region'];
          this.pronostico.ip_address = data['ip'];
          this.pronostico.citta = data['city'];
        },
        (error) => {
            this.http.get('https://api.ipify.org?format=json').subscribe(
                (data) => {
                    console.log(data);
                    this.pronostico.ip_address = data['ip'];
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    );
  }

  checkParziale(){
      this.totale = 0;
      for(let coalizione of this.pronostico.coalizioni){
          for(let partito of coalizione.partiti){
              this.totale += partito.percentuale;
          }
      }
  }

  putPronostico(){
      let jsonPronostico = JSON.stringify(this.pronostico);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.put('https://7ezt7iob01.execute-api.eu-west-1.amazonaws.com/dev/pronostico', jsonPronostico,
          {
              headers: headers
          }).subscribe(
          (data) => {
              console.log(data);
          },
      (err) => {
              console.log(err);
      }
      );
  }

}
