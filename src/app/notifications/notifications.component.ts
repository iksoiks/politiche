import {Component, OnInit} from '@angular/core';
import {PoliticalService} from "../../service/political.service";

declare var $:any;

@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'notifications.component.html'
})

export class NotificationsComponent implements OnInit{
    constructor(public politicalService: PoliticalService){
    }

    ngOnInit(){}
}
