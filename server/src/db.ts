export type Todo = { id: string; title: string; completed: boolean };

// Imaginary database
let todos: Todo[] = [];

export const db = {
    todo: {
        findMany: async () => todos,
        findById: async (id: string) => todos.find((todo) => todo.id === id),
        create: async (data: { title: string }) => {
            const todo = { id: String(Date.now()), completed: false, ...data };
            todos.push(todo);
            return todo;
        },
        update: async (data: { id: string; title?: string; completed?: boolean }) => {
            const todoIndex = todos.findIndex((item) => item.id === data.id);
            todos[todoIndex] = { ...todos[todoIndex], ...data };

            return todos[todoIndex];
        },
        delete: async (id: string) => {
            const tempTodos = todos.filter((todo) => todo.id !== id);
            todos = tempTodos;

            return todos;
        }
    },
};