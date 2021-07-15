export const getAllTodos = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/getAllTodos`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then((response) => {
        return response.json();
    });
}
export const getAllTodoItems = (todoId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/getAllTodoItems?todoId=${todoId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then((response) => {
        return response.json();
    });
}
export const createTodo = (todoData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/createTodo`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData)
    }).then((response) => {
        return response.json();
    });
}
export const createTodoItem = (todoitemData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/createTodoItem`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todoitemData)
    }).then((response) => {
        return response.json();
    });
}
export const deleteTodo = (todoId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/deleteTodo`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId })
    }).then((response) => {
        return response.json();
    });
}
export const deleteTodoItem = (todoItemId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/deleteTodoItem`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoItemId })
    }).then((response) => {
        return response.json();
    });
}
export const updateTodo = (data) => {
    return fetch(`${process.env.REACT_APP_API_URL}/updateTodo`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}

export const updateTodoItem = (data) => {
    return fetch(`${process.env.REACT_APP_API_URL}/updateTodoItem`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}
