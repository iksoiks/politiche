import {Injectable, OnInit} from '@angular/core';
import {Pronostico} from "model/partiti";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Coalizione, Partito} from "model/partiti";

@Injectable()
export class PoliticalService{
  totale: number;
  pronostico: Pronostico;
  pageInvia: boolean;
  confermaEmail: string;

  constructor(private http: HttpClient ) {
    console.log("constructor politacalService");
    this.totale = 0;
    this.confermaEmail = '';
    this.pronostico = new Pronostico();
    this.getUserInfo();

    this.init();
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

  updateParziale(){
      this.totale = 0;
      for(let coalizione of this.pronostico.coalizioni){
          for(let partito of coalizione.partiti){
              this.totale += partito.percentuale;
          }
      }
  }

  putPronostico(callback){
      let jsonPronostico = JSON.stringify(this.pronostico);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.put('https://7ezt7iob01.execute-api.eu-west-1.amazonaws.com/dev/pronostico', jsonPronostico,
          {
              headers: headers
          }).subscribe(
          (data) => {
              callback(true);
          },
          (err) => {
              callback(false);
      }
      );
  }

  public init(){
      this.pageInvia = false;
      this.totale = 0;
      this.confermaEmail = '';
      this.pronostico.reset();

      let partito1 = new Partito('Forza It','Silvio Berlusconi', '../../assets/img/loghi/FI.jpg');

      let partito2 = new Partito('Lega','Matteo Salvini', '../../assets/img/loghi/leganord.png');
      let partito3 = new Partito('FDI','Giorgia Meloni', '../../assets/img/loghi/Fratelli-dItalia.jpg');
      let partito4 = new Partito('UDC','Raffaele Fitto', '../../assets/img/loghi/NCI.jpg');

      let partito5 = new Partito('PD','Matteo Renzi', '../../assets/img/loghi/PD.png');
      let partito6 = new Partito('+Europa','Emma Bonino', '../../assets/img/loghi/europa.png');
      let partito7 = new Partito('Civica Pop.','Beatrice Lorenzin', '../../assets/img/loghi/Lorenzin.jpg');
      let partito8 = new Partito('Insieme','Giulio Santagata', '../../assets/img/loghi/Insieme.jpg');

      let partito9 = new Partito('M5S','Luigi Di Maio', '../../assets/img/loghi/M5S.png');
      let partito10 = new Partito('LEU','Pietro Grasso', '../../assets/img/loghi/Leu.jpg');
      let partito11 = new Partito('CP','Simone Di Stefano', '../../assets/img/loghi/Casa_pound.jpg');
      let partito12 = new Partito('PAP','Viola Carofalo', '../../assets/img/loghi/PAP.jpeg');
      let partito13 = new Partito('FN', 'Roberto Fiore', '../../assets/img/loghi/forza_nuova.jpg');
      let partito14 = new Partito('ALA', 'Denis Verdini', '../../assets/img/loghi/ala.png');
      let partito15 = new Partito('10 VM','Andrea Dusi', '../../assets/img/loghi/10voltemeglio.jpg');
      let partito16 = new Partito('Altri', '-', '../../assets/img/loghi/beer-icon.png');

      let coalizione1 = new Coalizione('Coalizione Centro-Destra');
      coalizione1.addPartiti([partito1, partito2, partito3, partito4]);
      let coalizione2 = new Coalizione('Coalizione Centro-Sinistra');
      coalizione2.addPartiti([partito5, partito6, partito7, partito8]);
      let coalizione3 = new Coalizione('Coalizione Movimento 5 Stelle');
      coalizione3.addPartiti([partito9]);
      let coalizione4 = new Coalizione('Coalizione Liberi e Uguali');
      coalizione4.addPartiti([partito10]);
      let coalizione5 = new Coalizione('Coalizione CasaPound');
      coalizione5.addPartiti([partito11]);
      let coalizione6 = new Coalizione('Coalizione Potere al Popolo');
      coalizione6.addPartiti([partito12]);
      let coalizione7 = new Coalizione('Coalizione Forza Nuova');
      coalizione7.addPartiti([partito13]);
      let coalizione8 = new Coalizione('Coalizione ALA');
      coalizione8.addPartiti([partito14]);
      let coalizione9 = new Coalizione('Coalizione 10 Volte Meglio');
      coalizione9.addPartiti([partito15]);
      let coalizione10 = new Coalizione('Altri');
      coalizione10.addPartiti([partito16]);

      this.pronostico.coalizioni.push(coalizione2, coalizione1, coalizione3,
          coalizione4, coalizione5, coalizione6,
          coalizione7, coalizione8, coalizione9, coalizione10);
  }
}
