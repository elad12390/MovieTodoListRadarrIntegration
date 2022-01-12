import React from "react";
import {Grid} from "@mui/material";
import {MovieTodo} from "../../MovieTodo/MovieTodo";
import {SharedContext, UseStateFunctionResult} from "../App/App";
import {useContext} from "../../../utils/hooks/useContext";
import {IMovieTodo, IRadarrMovie} from "../../../models";
import {httpClient} from "../../../httpClient";

export const Main = (): JSX.Element => {
    const [movies, setMovies] = useContext(SharedContext, 'radarrMovies') as UseStateFunctionResult<IRadarrMovie[]>;
    const [movieTodos, setTodos] = useContext(SharedContext, 'todos') as UseStateFunctionResult<IMovieTodo[]>;
    const onChange = async (todo: IMovieTodo) => {
        const {data: todos} = await httpClient.get<IMovieTodo[]>("MovieTodo");
        setTodos(todos);
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{padding: '0 10%', maxHeight: '90vh', overflowY: 'auto', marginTop: '1rem'}}>
                <Grid style={{justifyContent: 'center'}} container spacing={2} direction="column" alignItems="stretch">
                    {movieTodos?.map((movieTodo) =>
                        <Grid item key={movieTodo.id}>
                            <MovieTodo {...movieTodo} onChange={onChange}/>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
}
