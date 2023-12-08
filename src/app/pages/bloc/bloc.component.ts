import { Component,  Input,Output, OnInit, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from 'src/app/services/bloc.service';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent implements OnInit {
  @Input() b: Bloc[] = [];
  blocs : Bloc[] ;
  bloc: Bloc = new Bloc(); 
  showAddForm: boolean = false;
  filterId: number; 
  isFiltered: boolean = false; 
  searchTerm: string = '';
  @Output() blocRemoved: EventEmitter<number> = new EventEmitter<number>();
  show:boolean=true;
  buttonStates: { [key: number]: boolean } = {};
  
  constructor(private blocService: BlocService, private router: Router) {}

  ngOnInit() {
    this.loadAllBlocs();
  }
  deleteBloc(idBloc: number) {
    if(confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')){
      this.blocService.deleteBloc(idBloc).subscribe(() => {
      this.b = this.b.filter(bloc => bloc.idBloc !== idBloc);
      this.blocRemoved.emit(idBloc); // Emit the removed student's ID
    });
  }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  navigateToBlocForm() {
    this.router.navigate(['/bloc-form']);
  }

  navigateToUpdateForm(blocId: number) {
    this.router.navigate(['/updateBloc', blocId]);
  }

  private loadAllBlocs() {
    this.blocService.getAllBlocs().subscribe((blocs) => {
      console.log(blocs);  // Check the console for the loaded data
      this.b = blocs;
    });
  }
  
  searchBlocs(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.loadAllBlocs();
      return;
    }

    this.b = this.b.filter(
      (bloc) =>
        bloc.nomBloc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bloc.capaciteBloc.toString().includes(searchTerm)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadAllBlocs();
  }
  
  close(){
    this.show=true;
  }

  open(bloc:Bloc) {
    this.show = false;
    this.bloc = bloc;
  }

  

  
}
