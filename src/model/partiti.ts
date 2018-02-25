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
    country: string
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
        this.country = 'deafault-country';
        this.sesso = 0;
    }

    reset(){
        this.coalizioni.splice(0);
        this.eta = 0;
        this.sesso = 0;
        this.data = new Date();
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

    constructor(nome, leader, src, percentuale?:number) {
        this.nome = nome;
        this.leader = leader;
        if(percentuale){
            this.percentuale = percentuale;
        }
        else{
            this.percentuale = 0;
        }
        this.src = src;
    }
}

