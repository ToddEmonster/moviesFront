import * as $ from 'jquery';

/**
 * @name SpinnerLoader
 * @author Aélion - Feb. 2020
 * @version 1.0.0
 *  Spinner loader service
 */
export class SpinnerLoader {
    /**
     * @var JQuery loader
     * DOM structure of the spinner loader
     */
    private loader: JQuery;

    constructor() {
        this._spinnerBuilder();
    }

    public present(): void {
        console.log('Show the loader');
        this.loader.appendTo($('body'));
    }

    public dismiss(): void {
        setTimeout(
            () => {
                this.loader.remove();
                console.log('Loader was gone');
            },
            1500
        );
    }

    private _spinnerBuilder(): void {
        // Create the outer div of the spinner
        this.loader = $('<div>');
        this.loader.addClass('outer-loader');

        const inner: JQuery = $('<div>');
        inner.addClass('inner-loader');

        const spinner: JQuery = $('<img>');
        spinner.attr('src', '/assets/images/blue-cat-spinner.gif');
        
        // Stack DOM elements into loader property
        inner.append(spinner); // Stack spinner into inner
        this.loader.append(inner); // Stack inner into outer
    }
}