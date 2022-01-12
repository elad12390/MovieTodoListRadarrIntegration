import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {Header} from "../Header/Header";
import {Main} from "../Main/Main";
import {IMovieTodo, IRadarrMovie, setTodoCreated} from "../../../models";
import {httpClient} from "../../../httpClient";
import {useEffect} from "../../../utils/hooks/useEffectAsync";

export type UseStateFunctionResult<S> = [S, Dispatch<SetStateAction<S>>];
export interface IStoreData {
    todos?: UseStateFunctionResult<IMovieTodo[]>;
    radarrMovies?: UseStateFunctionResult<IRadarrMovie[]>;
}

export const SharedContext = React.createContext({} as IStoreData);
export const App = () => {
    const todosUseState = useState([] as IMovieTodo[])
    const radarrMoviesUseState = useState([] as IRadarrMovie[])

    const [todos, setTodos] = todosUseState;
    const [radarrMovies, setRadarrMovies] = radarrMoviesUseState;

    useEffect(async () => {
        const {data: todos} = await httpClient.get<IMovieTodo[]>("MovieTodo");
        setTodos(todos);

        const {data: radarrMovies} = await httpClient.get<IRadarrMovie[]>("radarr/movie");
        for (const todo of todos) {
            const movie = radarrMovies.find(m => m.id == todo.radarrId)
            if (movie) {
                movie.todoCreated = true;
            }
        }
        setRadarrMovies(radarrMovies)
    }, [])
    return <>
        <SharedContext.Provider value={{todos: todosUseState, radarrMovies: radarrMoviesUseState}}>
            <header>
                <Header/>
            </header>
            <Main/>
        </SharedContext.Provider>
    </>
}
