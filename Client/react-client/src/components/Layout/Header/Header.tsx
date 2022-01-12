import {
    alpha,
    AppBar,
    Autocomplete,
    Box,
    InputBase,
    styled,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import {useDebounceTime} from "../../../utils/hooks/useDebounceTime";
import {SharedContext, UseStateFunctionResult} from "../App/App";
import {IRadarrMovie, setTodoCreated} from "../../../models";
import {useEffect} from "../../../utils/hooks/useEffectAsync";
import {httpClient} from "../../../httpClient";
import {useContext} from "../../../utils/hooks/useContext";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

(styled(InputBase)(({ theme }) => ({
})));

export const Header = () => {
    const [movies, setMovies] = useContext(SharedContext, 'radarrMovies') as UseStateFunctionResult<IRadarrMovie[]>;
    const [todos, setTodos] = useContext(SharedContext, 'todos') as UseStateFunctionResult<IRadarrMovie[]>;

    const searchInputOnChange = (event: any, value: IRadarrMovie | null) => {
        event.preventDefault();
        event.stopPropagation();

        setSelectedRadarrMovie(value);
    }

    const [selectedRadarrMovie, setSelectedRadarrMovie] = useDebounceTime<IRadarrMovie | null>(200)
    useEffect(async () => {
        if (!selectedRadarrMovie) return;

        setSelectedRadarrMovie(null);
        await httpClient.post(`MovieTodo/${selectedRadarrMovie.id}`);
        setTodoCreated([movies, setMovies], selectedRadarrMovie.id, true);

        const {data: newMovieTodos} = await httpClient.get('MovieTodo')
        setTodos(newMovieTodos);
    }, [selectedRadarrMovie])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Movie Todo List
                    </Typography>
                    <Search style={{display: 'flex'}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <Autocomplete
                            disablePortal
                            sx={{
                                color: 'white',
                                width: 300,
                                '& .MuiOutlinedInput-input': {
                                    paddingLeft: '2.3rem !important',
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    paddingLeft: '2rem',
                                    color: 'white',
                                }
                            }}
                            groupBy={(option) => option.todoCreated == true ? 'Created' : option.title[0].toUpperCase()}
                            getOptionDisabled={option => option.todoCreated === true}
                            onChange={(event, values) => searchInputOnChange(event, values)}
                            options={movies && movies.sort((m1, m2) => {
                                if (m1.todoCreated === m2.todoCreated && m1.todoCreated === true) {
                                    return 0
                                } else if(m1.todoCreated !== m2.todoCreated) {
                                    return m1.todoCreated === true ? -1 : 1;
                                } else {
                                    return m1.title.localeCompare(m2.title);
                                }
                            })}
                            autoSelect={false}
                            isOptionEqualToValue={(option, value) => option.todoCreated === value.todoCreated && option.id === value.id}
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option) => <li {...props} key={option.tmdbId}>
                                {option.title}
                            </li>}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
