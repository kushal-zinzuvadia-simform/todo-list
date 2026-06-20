import { createContext } from 'react';

import type { AddResult } from '@/types/AddResult';
import type { Todo } from '@/types/TodoItem';
import type { FilterType } from '@/types/FilterType';

export type TodoContextValue = {
  todoData: Array<Todo>;
  addItem: (text: string) => AddResult;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  filter: FilterType;
  filteredTodos: Array<Todo>;
};

export const TodoContext = createContext<TodoContextValue | null>(null);
