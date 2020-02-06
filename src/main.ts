import * as $ from 'jquery';

import { ManageCheckbox } from "./manage-checkbox";
import { SpinnerLoader } from "./spinner-loader";
import { MovieService } from './services/movie-service';
import { MovieModel } from './models/movie-model';
import { SearchComponent } from './components/search-component';

/**
 * @name Main
 * @author Jean-Luc (jla.webprojet@gmail.com) - Jan. 2020
 * @version 1.0.0
 *  Entry point of the application
 */
class Main {
    public constructor(){
        const loader: SpinnerLoader = new SpinnerLoader();
        loader.present();

        const title: HTMLElement = document.querySelector('h1');
        title.innerHTML = 'Movies';

        loader.dismiss();

        const searchComponent: SearchComponent = new SearchComponent();
    }
}

// Main app instanciation
document.addEventListener(
    'DOMContentLoaded', // Event to listen...
    () => { // What to do when event is triggered
        console.log('Hey Buddy, i\'m ready... play now !');
        new Main();
    }
);
