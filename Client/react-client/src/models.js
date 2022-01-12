"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTodoCreated = void 0;
var setTodoCreated = function (moviesUseState, id, created) {
    var movies = moviesUseState[0], setMovies = moviesUseState[1];
    var currentTodoMovie = movies.find(function (m) { return m.id === id; });
    if (currentTodoMovie) {
        currentTodoMovie.todoCreated = created;
        setMovies(movies);
    }
};
exports.setTodoCreated = setTodoCreated;
