import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import type { AddResult } from '@/types/AddResult';
import type { FilterType } from '@/types/FilterType';
import type {
  TodoAction,
  TodoProviderProps,
  TodoState,
} from '@/types/TodoProviderType';
import { fetchData } from '@/utils/fetchTodos';
import { filterTodos } from '@/utils/filterTodos';
import { validateTodos } from '@/utils/validateTodos';

import { TodoContext } from './todo-context';

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todoData: [...state.todoData, action.payload],
      };

    case 'TOGGLE_TODO':
      return {
        todoData: state.todoData.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        todoData: state.todoData.filter((todo) => todo.id !== action.payload),
      };

    case 'EDIT_TODO':
      return {
        todoData: state.todoData.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    default:
      return state;
  }
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todoData: fetchData(),
  });

  const [filter, setFilter] = useState<FilterType>('All');

  const { todoData } = state;

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');

    const prunedTodos = todoData.filter((todo) => todo.createdAtDate === today);

    localStorage.setItem('todoData', JSON.stringify(prunedTodos));
  }, [todoData]);

  const addItem = useCallback((text: string): AddResult => {
    const result = validateTodos(text);

    if (!result.isValid) {
      return result.message;
    }

    const now = new Date();

    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: crypto.randomUUID(),
        text: result.text,
        completed: false,
        createdAtDate: now.toLocaleDateString('en-GB'),
        createdAtTime: now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    });

    return 'success';
  }, []);

  const editTodo = useCallback((id: string, text: string): AddResult => {
    const result = validateTodos(text);

    if (!result.isValid) {
      return result.message;
    }

    dispatch({
      type: 'EDIT_TODO',
      payload: {
        id,
        text: result.text,
      },
    });

    return 'success';
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: id,
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: id,
    });
  }, []);

  const filteredTodos = useMemo(
    () =>
      filterTodos({
        todos: todoData,
        filter,
      }),
    [todoData, filter]
  );

  const value = useMemo(
    () => ({
      todoData,
      addItem,
      editTodo,
      toggleTodo,
      deleteTodo,
      setFilter,
      filter,
      filteredTodos,
    }),
    [todoData, filter, filteredTodos, addItem, editTodo, toggleTodo, deleteTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
