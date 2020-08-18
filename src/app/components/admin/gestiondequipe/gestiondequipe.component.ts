import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { EquipeService } from 'src/app/services/equipe.service';
@Component({
  selector: 'app-gestiondequipe',
  templateUrl: './gestiondequipe.component.html',
  styleUrls: ['./gestiondequipe.component.scss']
})
export class GestiondequipeComponent implements OnInit {

  displayedColumns: string[] = ['name','teamLeader','employee','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('delete', { static: true }) delete: ModalDirective;
  equipe: any[];
  constructor(private equipeservice: EquipeService) {
  }

  ngOnInit() {
    this.getEquipes();
  }

  getEquipes(): void{
    this.equipeservice.getAllEquipe().subscribe(
      (data) =>{
        this.equipe = data;
        this.dataSource = new MatTableDataSource(this.equipe);
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onDelete(id: string) {
    this.equipeservice.deleteEquipe(id).subscribe(
      ()=>{
        this.delete.show();
        setTimeout (() => {
          this.delete.hide();
       }, 3000);
        this.getEquipes();
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
