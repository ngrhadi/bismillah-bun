import { atom } from 'jotai';

// Define a todo schema
interface TodoItem {
  id: number; // Unique identifier for the todo item
  description: string; // Todo item description
  budget: number; // Budget for the todo item
  datetime: string; // Datetime for the todo item
}

// Create an atom to store the todo list
export const todoListAtom = atom<TodoItem[]>([]);

export const initialTodo: TodoItem = {
  id: 0,
  description: '',
  budget: 0,
  datetime: '',
};
