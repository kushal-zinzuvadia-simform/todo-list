import { useMemo, useState, type ReactNode } from 'react';

import { useTodoData } from '@/hooks/useTodoData';
import { filterTodos } from '@/utils/filterTodos';
import type { FilterType } from '@/types/FilterType';

import { TodoContext } from './todo-context';

type TodoProviderProps = {
  children: ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [filter, setFilter] = useState<FilterType>('All');
  const { todoData, addItem, toggleTodo, deleteTodo } = useTodoData();

  const filteredTodos = filterTodos({
    todos: todoData,
    filter,
  });

  const value = useMemo(
    () => ({
      todoData,
      addItem,
      toggleTodo,
      deleteTodo,
      setFilter,
      filter,
      filteredTodos,
    }),
    [
      todoData,
      addItem,
      toggleTodo,
      deleteTodo,
      setFilter,
      filter,
      filteredTodos,
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
