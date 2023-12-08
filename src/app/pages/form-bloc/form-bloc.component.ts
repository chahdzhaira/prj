import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Bloc } from 'src/app/models/bloc';
import { Foyer } from 'src/app/models/foyer';
import { BlocService } from 'src/app/services/bloc.service';
import { FoyerService } from 'src/app/services/foyer.service';

@Component({
  selector: 'app-form-bloc',
  templateUrl: './form-bloc.component.html',
  styleUrls: ['./form-bloc.component.css']
})
export class FormBlocComponent implements OnInit {
  bloc : Bloc = new Bloc() ;
  idBloc :number = 0 ;
  nomBloc: string;
  nomFoyer: string;
  capaciteBloc: number; 
  foyers: Foyer[] = [];
  constructor(private blocService:BlocService , private router: Router,private ac: ActivatedRoute , private foyerService :FoyerService ) {}
  
 
  
  ngOnInit(): void {
    // Chargez la liste des foyers lors de l'initialisation du composant
    this.foyerService.getFoyers().subscribe(
      (foy: Foyer[]) => {
        this.foyers = foy;
      },
      (error) => {
        console.error('Erreur lors de la récupération des foyers:', error);
      }
    );
  }


  retournerALaListe(): void {
    this.router.navigate(['/bloc']);
  }

  ajouterEtAffecterBloc(): void {
    const blocData = {
      nomBloc: this.nomBloc,
      nomFoyerBloc: this.nomFoyer,
      capaciteBloc: this.capaciteBloc,
      idBloc: this.idBloc,
      // Ajoutez d'autres propriétés du bloc si nécessaire
    };
  
    if (!blocData.nomBloc || !blocData.nomFoyerBloc || blocData.capaciteBloc === undefined) {
      console.error('Les champs nomBloc, nomFoyerBloc et capaciteBloc sont requis.');
      return;
    }
  
    // Récupérer l'ID du bloc par son nom
    this.blocService.getBlocIdByNom(blocData.nomBloc).subscribe({
      next: (blocId) => {
        // Si l'ID est obtenu avec succès, ajoutez et affectez le bloc
        console.log('ID du bloc obtenu avec succès:', blocId);
  
        // Ajoutez l'ID du bloc à l'objet blocData
        blocData.idBloc = blocId;
  
        this.blocService.addBloc(blocData).subscribe({
          next: (addedBloc) => {
            console.log('Bloc ajouté avec succès:', addedBloc);
  
            // Affecter le bloc au foyer en utilisant l'ID du bloc
            this.blocService.affecterBlocAFoyer(String(addedBloc.idBloc), blocData.nomFoyerBloc)
              .subscribe(
                (response) => {
                  console.log('Bloc affecté avec succès au foyer:', response);
                  alert('Bloc ajouté et affecté au foyer avec succès!');
                },
                (error) => {
                  console.error('Erreur lors de l\'affectation du bloc au foyer:', error);
                }
              );
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du bloc:', error);
          },
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'ID du bloc:', error);
      },
    });
  }
}