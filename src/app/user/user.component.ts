import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    ngOnInit(){
        const element = document.getElementById('navTop');
        element.scrollIntoView();
    }
}
