
import * as $ from 'jquery';

import { MovieModel } from "./../models/movie-model";

export class MovieService {
    private readonly api: string = 'http://localhost:8080/api/movie';
    private uri: string;
    private httpVerb: string = 'get';
    private dataType: string = 'json';

    public getAll(): Promise<MovieModel[]> {
        this.uri = this.api;
        return this.httpClient()
    }

    public getByTitle(title: string): Promise<MovieModel[]> {
        this.uri = `${this.api}/byTitle?t=${title}`;
        return this.httpClient();
    }

    private httpClient(): Promise<MovieModel[]> {
        return new Promise<MovieModel[]>((resolve) => {
            let movies: MovieModel[] = new Array<MovieModel>();

            $.ajax({
                url: this.uri,
                method: this.httpVerb,
                dataType: this.dataType,
                success: (response: any[]) => {
                    movies = response.map<MovieModel>((movie: any, index: number) => {
                        return new MovieModel().deserialize(movie);
                    });
                    resolve(movies);
                }
            });
        });
        
 
    }
}