import * as $ from 'jquery';
import { MovieService } from './services/movie-service';
import { MovieModel } from './models/movie-model';
import { RowComponent } from './components/row/row-component';
import { ManageCheckbox } from './manage-checkbox';

export class SearchComponent {
    private service: MovieService;
    private currentResult: MovieModel;
    private resultFromBack: MovieModel;

    // Dès qu'on instancie la classe, il construit l'instance avec ses deux attributs :
    // - l'attribut service est une nouvelle instanciation d'un MovieService, qui sera utilisée dans la méthode privée
    // - la méthode privée _setHandlers qu'on a définie plus bas, c'est elle qui fait tout
    public constructor() {
        this.service = new MovieService();
        this._setHandler();
    }

    // Methode privée de la classe
    private _setHandler(): void {
        $('[type="search"]').on(
            'keyup', // Dès qu'on relâche la touche, l'événement se déclenche
            (event: any): void => {
                const searchField: JQuery = $(event.target);
                
                // I need currentResults here
                const currentResults: JQuery = $('tbody tr');  // ça c'est le contenu ACTUEL du tableau

                // SI il y a au moins 2 caractères recherchés
                if (searchField.val().toString().trim().length >= 2) {
                    // Call service...
                    
                    // Je récupère le movie dont le titre partiel correspond à la recherche
                    this.service.getByTitle(searchField.val().toString().trim())
                    // et à ce moment-là je crée une instance movies de type "tableau d'éléments de type MovieModel"
                    .then((movies: MovieModel[]) => {
                        // TODO
                        // Pour chaque élément movie au sein de movies, qu'on suit avec son index
                        movies.forEach((movie: MovieModel, index: number) => {
                            
                            // 
                            const rowComponent: RowComponent = new RowComponent(movie);

                            // Pour tout rang du movie, l'ajouter au tableau tbody
                            rowComponent.load().then((row: JQuery) => {
                                const responseFromBack: JQuery = .append(row); // ça c'est le contenu 
                                // $('tbody').append(row);
                            });
                        });
                        new ManageCheckbox();
                    });

                } else {

                    // Removes all previous rows
                    this._removeRows();
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


}