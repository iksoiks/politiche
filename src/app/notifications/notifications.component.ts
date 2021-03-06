import {Component, OnInit} from '@angular/core';
import {PoliticalService} from "../../service/political.service";
import {Router} from "@angular/router";

declare var $:any;

@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'notifications.component.html'
})

export class NotificationsComponent implements OnInit{
    public invioInCorso: boolean;
    constructor(public politicalService: PoliticalService, public router: Router){
    }

    ngOnInit(){
        this.invioInCorso = false;
        if(!this.politicalService.pageInvia){
            this.router.navigateByUrl('dashboard');
        }
        const element = document.getElementById('navTop');
        element.scrollIntoView();
    }

    tornaIndietro(){
        this.router.navigateByUrl('dashboard');
    }

    inviaPronostico(){
        if(this.checkData()){
            this.invioInCorso = true;
            this.waiting("Invio in corso");
            this.politicalService.putPronostico((inviato:boolean) => {
                 if(inviato){
                 this.wellDone("Pronostico inviato, grazie per aver partecipato.");
                 this.invioInCorso = false;
                 this.politicalService.pageGrafici = true;
                 this.router.navigateByUrl('table');
                 }
                 else {
                 this.warning("Problema nell'invio del pronostico, riprovare o controllare la connessione.");
                 this.invioInCorso = false;
/*                 // dev testing only
                     this.politicalService.pageGrafici = true;
                     this.router.navigateByUrl('table');*/
                 }
             });
        }
        else{
            this.warning("Compila tutti i campi")
        }
    }

    private checkData(){
        // controllo che sia una mail non vuota
        return !((this.politicalService.pronostico.email === '' || this.politicalService.pronostico.email === ' ' || this.politicalService.confermaEmail === '' ) ||
        this.politicalService.pronostico.sesso === 0 || this.politicalService.pronostico.eta === 0);
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
}
