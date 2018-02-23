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
    constructor(public politicalService: PoliticalService, public router: Router){
    }

    ngOnInit(){
        this.politicalService.pageInvia = false;
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
            this.politicalService.pageInvia = true;
            this.router.navigateByUrl('notifications');
        }
    }

    checkParziale(){
        this.politicalService.updateParziale();
    }
}
