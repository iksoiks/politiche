/**
 * Created by lorenzo on 21/02/18.
 */
import { v4 as uuid } from 'uuid';
import {rangeEta, sesso} from './sesso';

export class Pronostico {
    coalizioni: Coalizione[];
    region: string;
    ip_address: string;
    citta: string;
    email: string;
    eta: rangeEta;
    sesso: sesso;
    data: Date;

    constructor(){
        this.coalizioni = new Array<Coalizione>();
        this.data = new Date();
        this.ip_address = '';
        this.region = 'default-region';
        this.email = '';
        this.eta = 0;
        this.citta = 'default-city';
        this.sesso = 0;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    checkTotale(){      // true se è minore uguale a 100 e maggiore uguale a 0
        let tot = 0;
        for(let coalizione of this.coalizioni){
            for(let partito of coalizione.partiti){
                tot += partito.percentuale;
            }
        }
        return ((tot <= 100) && (tot >= 0));
    }

    avanzaQualcosa(){   // true se si ha più del 5% a disposizione da mettere
        let tot = 0;
        for(let coalizione of this.coalizioni){
            for(let partito of coalizione.partiti){
                tot += partito.percentuale;
            }
        }
        return (tot < 95);
    }
}

export class Coalizione {
    nome: string;
    partiti: Partito[];

    constructor(nome) {
        this.nome = nome;
        this.partiti = new Array<Partito>();
    }

    addPartiti(partiti: Partito[]){
        for(let p of partiti){
            this.partiti.push(p);
        }
    }

}

export class Partito{
    nome: string;
    percentuale: number;
    leader: string;
    src: string;

    constructor(nome, leader, src) {
        this.nome = nome;
        this.leader = leader;
        this.percentuale = 0;
        this.src = src;
    }
}

