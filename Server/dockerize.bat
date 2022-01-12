docker build -f ".\MovieTodo.Api\Dockerfile" -t movie-todo-list-server:1.0.1-prod .
docker tag movie-todo-list-server:1.0.1-prod eladiut/movie-todo-list-server