import {gql} from "@apollo/client";

export const TODOS_LIST = gql`
    query Todos {
        todos {
            id
            title
            completed
        }
    }
`;

export const CREATE_TODO = gql`
    mutation CreateTodo ($title: String!) {
        addTodo( input: { title: $title }) {
            id
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo ($id: String!) {
        deleteTodo(id: $id) {
            id
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo ($id: String!, $completed: Boolean) {
        updateTodo( input: { id: $id, completed: $completed }) {
            id
        }
    }
`;