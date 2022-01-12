import {UseStateFunctionResult} from "./components/Layout/App/App";

export interface IMovieTodo {
    id: number;
    radarrId: number;
    title: string;
    overView: string;
    movieSpan: string;
    isWatched: boolean;
    imageSrc: string;
}

export interface IRadarrImage {
    coverType: string;
    url: string;
    remoteUrl: string;
}

export interface IRadarrRatings {
    votes: number;
    value: number;
}

export interface IRadarrCollection {
    name: string;
    tmdbId: number;
    images: any[];
}

export interface IRadarrMovie {
    id: number;
    title: string;
    sortTitle: string;
    sizeOnDisk: number;
    overview: string;
    inCinemas: Date;
    physicalRelease: Date;
    images: IRadarrImage[];
    website: string;
    year: number;
    hasFile: boolean;
    youTubeTrailerId: string;
    studio: string;
    path: string;
    rootFolderPath?: any;
    qualityProfileId: number;
    monitored: boolean;
    minimumAvailability: string;
    isAvailable: boolean;
    folderName: string;
    runtime: number;
    cleanTitle: string;
    imdbId: string;
    tmdbId: number;
    titleSlug: string;
    certification: string;
    genres: string[];
    tags: any[];
    added: Date;
    ratings: IRadarrRatings;
    collection: IRadarrCollection;
    status: string;

    // view only
    todoCreated?: boolean;
}


export const setTodoCreated = (moviesUseState: UseStateFunctionResult<IRadarrMovie[]>, id: number, created: boolean) => {
    const [movies, setMovies] = moviesUseState;
    const currentTodoMovie = movies.find(m => m.id === id);
    if (currentTodoMovie) {
        currentTodoMovie.todoCreated = created;
        setMovies(movies);
    }
}
