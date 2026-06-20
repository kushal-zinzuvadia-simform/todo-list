import type { ReactNode } from 'react';
import type { Todo } from './TodoItem';

export type TodoState = {
  todoData: Array<Todo>;
};

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string };

export type TodoProviderProps = {
  children: ReactNode;
};
