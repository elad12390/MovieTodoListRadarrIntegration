import {IMovieTodo, IRadarrMovie, setTodoCreated} from "../../models";
import {
    Avatar, Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia, Checkbox,
    FormControlLabel, FormGroup, Grid, IconButton,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import useColorThief, {FormatString} from 'use-color-thief';
import {green, yellow} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useEffectExceptFirst} from "../../utils/hooks/useEffectAsync";
import {httpClient} from "../../httpClient";
import {useContext} from "../../utils/hooks/useContext";
import {SharedContext, UseStateFunctionResult} from "../Layout/App/App";

const MovieTodoAvatar = ({title, color}: {title: string, color: string}) =>
    <Avatar sx={{ bgcolor: color }} aria-label="movie-title">{
        title.split(' ').map(a => a[0]).filter(a => a == a.toUpperCase()).join('')
    }</Avatar>

export interface MovieTodoParams extends IMovieTodo {
    onChange?: (todo: IMovieTodo) => void;
}

export const MovieTodo = (movieTodoParams: MovieTodoParams) => {
    const {id, radarrId, title, movieSpan, imageSrc, overView, isWatched, onChange} = movieTodoParams;

    const [watched, setWatched] = useState(isWatched);
    const [imageUrl, _] = useState('http://' + imageSrc)
    const moviesStateFnResult = useContext(SharedContext, 'radarrMovies') as UseStateFunctionResult<IRadarrMovie[]>;

    const onWatchedClick = () => {
        setWatched(!watched);
    }

    const onDeleteClick = async (ev: any) => {
        await httpClient.delete(`MovieTodo/${id}`);
        setTodoCreated(moviesStateFnResult, radarrId, false);
        onChange?.({ ...movieTodoParams});
    }

    useEffectExceptFirst(async () => {
        const url = watched ? 'Watched' : 'NotWatched';
        await httpClient.put(`MovieTodo/${url}/${id}`);
    }, [watched])

    const { color } = useColorThief(imageUrl, {
        format: FormatString.hex,
        colorCount: 10,
        quality: 10,
    });

    return (<>{ <Card style={{backgroundColor: watched ? green[200] : yellow[50]}}>
            <Grid container spacing={0}>
                <Grid item sx={{width: 114}}>
                    <CardMedia
                        component="img"
                        sx={{height: 168, width: 114}}
                        image={imageUrl}
                        alt={title}
                    />
                </Grid>
                <Grid item xs>
                    <CardHeader
                        avatar={<MovieTodoAvatar title={title} color={color as string}/>}
                        title={title}
                        subheader={movieSpan}
                        sx={{padding: '.5rem'}}
                    />
                    <CardContent sx={{maxHeight: '5.5rem', paddingTop: '5px'}}>
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox checked={watched} onClick={onWatchedClick} icon={<TvOutlinedIcon/>} checkedIcon={<AssignmentTurnedInIcon/>}/>
                            } label={watched ? "Watched" : "Need to Watch"}/>
                        </FormGroup>
                        <Typography
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                            }}
                            variant="body2" color="text.secondary">
                            {overView}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <IconButton onClick={onDeleteClick} aria-label="Delete" sx={{transform: 'scale(1.5)'}}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Card>}
    </>)
}
