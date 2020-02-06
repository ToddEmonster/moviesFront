import * as $ from 'jquery';

import { SpinnerLoader } from "./spinner-loader";
import { SearchComponent } from './search-component';
import { Favorite } from './favorite';

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

        // const Favorites: Favorite = new Favorite();
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

