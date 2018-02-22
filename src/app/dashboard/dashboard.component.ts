import { Component, OnInit } from '@angular/core';
import {PoliticalService} from "../../service/political.service";
import {Router} from "@angular/router";

declare var $:any;


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    public invioInCorso: boolean;
    constructor(public politicalService: PoliticalService, private router: Router){
    }

    ngOnInit(){
        this.invioInCorso = false;
    }

    inviaPronostico(){
        if(this.checkData()){
            this.invioInCorso = true;
            this.waiting("Invio in corso");
            console.log(this.politicalService.pronostico);
            this.invioInCorso = false;  // TEST
/*            this.politicalService.putPronostico((inviato:boolean) => {
                if(inviato){
                    this.wellDone("Pronostico inviato, grazie per aver partecipato");
                    this.politicalService.init();
                    this.invioInCorso = false;
                    this.router.navigateByUrl('user');
                }
                else {
                    this.warning("Problema nell'invio del pronostico, riprovare")
                }
            });*/
        }
        else{
            this.warning("Compila tutti i campi")
        }
    }

    private warning(message){
        $.notify({
            icon: 'ti-hand-open',
            message: message
        },{
            type: 'danger',
            timer: 2000,
            placement: {
                from: "top",
                align: "center"
            }
        });
    }
    private waiting(message){
        $.notify({
            icon: 'ti-settings',
            message: message
        },{
            type: 'info',
            timer: 2000,
            placement: {
                from: "top",
                align: "center"
            }
        });
    }
    private wellDone(message){
        $.notify({
            icon: 'ti-hand-open',
            message: message
        },{
            type: 'success',
            timer: 2000,
            placement: {
                from: "top",
                align: "center"
            }
        });
    }

    checkPronostico(){
        this.checkParziale();
        if(!this.politicalService.pronostico.checkTotale()){

            this.warning("Occhio alla percentuale totale!")
        }
        else {
            this.router.navigateByUrl('notifications');
        }
    }

    private checkData(){
        // controllo che sia una mail non vuota
        return !((this.politicalService.pronostico.email === '' || this.politicalService.pronostico.email === ' ' || this.politicalService.confermaEmail === '' ) ||
                this.politicalService.pronostico.sesso === 0 || this.politicalService.pronostico.eta === 0);
    }

    checkParziale(){
        this.politicalService.updateParziale();
    }
}
