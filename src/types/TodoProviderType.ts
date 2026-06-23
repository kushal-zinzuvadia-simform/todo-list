import type { ReactNode } from 'react';
import type { Todo } from './TodoItem';

export type TodoState = {
  todoData: Array<Todo>;
};

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } };

export type TodoProviderProps = {
  children: ReactNode;
};
