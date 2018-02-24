import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {PoliticalService} from '../../service/political.service';
import {Coalizione, Partito} from '../../model/partiti';
import {Router} from "@angular/router";

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit, OnDestroy{
    public tableData1: TableData;
    public termometro;

    constructor(public polticalService: PoliticalService, public router: Router){
        this.initTermometroPolitico();
    }

    ngOnInit(){
        if(!this.polticalService.pageGrafici){
            this.router.navigateByUrl('dashboard');
        }
        else{
            const element = document.getElementById('navTop');
            element.scrollIntoView();
            // set riepilogo
            let data = new Array();
            let labelpronostico = new Array();
            let dataPronostico = new Array();

            for(let coalizione of this.polticalService.pronostico.coalizioni){
                for (let p of coalizione.partiti){
                    data.push([p.nome,p.percentuale]);
                    labelpronostico.push(p.nome);
                    dataPronostico.push(p.percentuale);
                }
            }
            let dataTermometro = new Array();
            let labelTermometro = new Array();

            for(let cTerm of this.termometro){
                for(let pTerm of cTerm.partiti){
                    labelTermometro.push(pTerm.nome);
                    dataTermometro.push(pTerm.percentuale);
                    for(let d of data){
                        if(d[0] === pTerm.nome){
                            if(pTerm.percentuale === 0){
                                d[2] = "Non disp";
                            }
                            else{
                                d[2] = pTerm.percentuale;
                            }
                            break;
                        }
                    }
                }
            }

            this.tableData1 = {
                headerRow: [ 'Partito', 'Pronostico', 'Sondaggio Uff.' ],
                dataRows: data
            };

            var dataPreferences = {
                series: [
                    [25, 30, 20, 25]
                ]
            };

            var optionsPreferences = {
                donut: true,
                donutSolid: true,
                donutWidth: 80,
                startAngle: 0,
                total: 100,
                showLabel: false,
                axisX: {
                    showGrid: false
                }
            };

            // torta ufficiale
            new Chartist.Pie('#termometroOfficial', dataPreferences, optionsPreferences);

            new Chartist.Pie('#termometroOfficial', {
                labels: labelTermometro,
                series: dataTermometro
            });

            // torta pronostici
            new Chartist.Pie('#pronostico', dataPreferences, optionsPreferences);

            new Chartist.Pie('#pronostico', {
                labels: labelpronostico,
                series: dataPronostico
            });
        }

    }

    ngOnDestroy(){
        this.polticalService.init();
        this.polticalService.pageGrafici = false;
    }

    private initTermometroPolitico(){
        this.termometro = new Array<Coalizione>();

        let partito1 = new Partito('Forza It', 'Silvio Berlusconi', '../../assets/img/loghi/FI.jpg', 15.3);

        let partito2 = new Partito('Lega', 'Matteo Salvini', '../../assets/img/loghi/leganord.png', 14.8);
        let partito3 = new Partito('FDI', 'Giorgia Meloni', '../../assets/img/loghi/Fratelli-dItalia.jpg', 5.5);
        let partito4 = new Partito('UDC', 'Raffaele Fitto', '../../assets/img/loghi/NCI.jpg', 2);

        let partito5 = new Partito('PD', 'Matteo Renzi', '../../assets/img/loghi/PD.png', 21.8);
        let partito6 = new Partito('+Europa', 'Emma Bonino', '../../assets/img/loghi/europa.png', 2.1);
        let partito7 = new Partito('Civica Pop.', 'Beatrice Lorenzin', '../../assets/img/loghi/Lorenzin.jpg', 0.5);
        let partito8 = new Partito('Insieme', 'Giulio Santagata', '../../assets/img/loghi/Insieme.jpg', 0.7);

        let partito9 = new Partito('M5S', 'Luigi Di Maio', '../../assets/img/loghi/M5S.png', 26.8);
        let partito10 = new Partito('LEU', 'Pietro Grasso', '../../assets/img/loghi/Leu.jpg', 5.3);
        let partito11 = new Partito('CP','Simone Di Stefano', '../../assets/img/loghi/Casa_pound.jpg', 1.9);
        let partito12 = new Partito('PAP','Viola Carofalo', '../../assets/img/loghi/PAP.jpeg', 1.5 );
        let partito13 = new Partito('FN', 'Roberto Fiore', '../../assets/img/loghi/forza_nuova.jpg', 0.3);
        let partito15 = new Partito('10 VM','Andrea Dusi', '../../assets/img/loghi/10voltemeglio.jpg', 0);
        let partito16 = new Partito('Altri', '-', '../../assets/img/loghi/beer-icon.png', 2.3);

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
        let coalizione9 = new Coalizione('Coalizione 10 Volte Meglio');
        coalizione9.addPartiti([partito15]);
        let coalizione10 = new Coalizione('Altri');
        coalizione10.addPartiti([partito16]);

        this.termometro.push(coalizione2, coalizione1, coalizione3,
            coalizione4, coalizione5, coalizione6, coalizione7, coalizione9, coalizione10);
    }
}
