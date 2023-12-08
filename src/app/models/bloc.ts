import { Foyer } from "./foyer";

export class Bloc {
    idBloc !: number ;
    nomBloc !:string;
    capaciteBloc !: number;
    chambres: any[]; // Assurez-vous de définir le type correct pour les chambres
    foyer: Foyer;
}