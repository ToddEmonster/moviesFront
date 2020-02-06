import * as $ from 'jquery';
import { MovieService } from '../services/movie-service';
import { MovieModel } from '../models/movie-model';
import { RowComponent } from './row/row-component';
import { ManageCheckbox } from '../manage-checkbox';
import { SpinnerLoader } from '../spinner-loader';

export class SearchComponent {
    private service: MovieService;
    private movies: MovieModel[]; // State
    private spinner: SpinnerLoader;
    
    // Dès qu'on instancie la classe, il construit l'instance avec ses deux attributs :
    // - l'attribut service est une nouvelle instanciation d'un MovieService, qui sera utilisée dans la méthode privée
    // - la méthode privée _setHandlers qu'on a définie plus bas, c'est elle qui fait tout
    public constructor() {
        this.service = new MovieService();
        this.movies = new Array<MovieModel>();
        this.spinner = new SpinnerLoader();
        this._setHandler();
    }

    // Methode privée de la classe
    private _setHandler(): void {
        $('[type="search"]').on(
            'keyup', // Dès qu'on relâche la touche, l'événement se déclenche
            (event: any): void => {
                const searchField: JQuery = $(event.target);

                // SI il y a au moins 2 caractères recherchés
                if (searchField.val().toString().trim().length >= 2) {
                    this.spinner.present();
                    // Call service...
                    // Je récupère le movie dont le titre partiel correspond à la recherche
                    this.service.getByTitle(searchField.val().toString().trim())
                    // et à ce moment-là je crée une instance movies de type "tableau d'éléments de type MovieModel"
                    .then((movies: MovieModel[]) => {
                        if (!this._compareTo(movies)) {
                            this.movies = movies;
                            this._removeRows();
                            // Pour chaque élément movie au sein de movies, qu'on suit avec son index
                            movies.forEach((movie: MovieModel, index: number) => {
                                const rowComponent: RowComponent = new RowComponent(movie);
                                // Pour tout rang du movie, l'ajouter au tableau tbody
                                rowComponent.load().then((row: JQuery) => {
                                    $('tbody').append(row);
                                });
                            });
                            new ManageCheckbox();
                        }
                    });
                    this.spinner.dismiss();
                } else {
                    // Removes all previous rows
                    this._removeRows();
                    this.movies = [];
                } 
            }
        );
        
        // "Dès qu'il y a une recherche, on efface TOUS les rows"
        $('[type="search"]').on(
            'search',
            (event: any): void => {
                this._removeRows();
            }
        );
    }

    private _removeRows(): void {
        $('tbody tr').remove();
    }

    private _compareTo(movies: Array<MovieModel>): boolean {
        let isEqual: boolean = false;

        const input: Array<MovieModel> = movies.slice().sort(MovieModel.compare);
        const state: Array<MovieModel> = this.movies.slice().sort(MovieModel.compare);

        if (state.length !== 0) {
            if (input.length === state.length) {
                state.forEach((stateMovie: MovieModel, index: number) => {
                    if (stateMovie.compareTo(input[index])) {
                        isEqual = true;
                    } else {
                        isEqual = false;
                    }
                });
            }
        }

        return isEqual;
    }

}