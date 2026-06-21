import { useEffect, useMemo, useReducer, useState } from 'react';

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
  const [state, dispatch] = useReducer(todoReducer, { todoData: fetchData() });
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');

    const prunedTodos = state.todoData.filter(
      (todo) => todo.createdAtDate === today
    );

    localStorage.setItem('todoData', JSON.stringify(prunedTodos));
  }, [state.todoData]);

  const { todoData } = state;

  const addItem = (text: string): AddResult => {
    const result = validateTodos(text);

    if (!result.isValid) {
      return result.message;
    }

    const now = new Date();

    const todo = {
      id: crypto.randomUUID(),
      text: result.text,
      completed: false,
      createdAtDate: now.toLocaleDateString('en-GB'),
      createdAtTime: now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    dispatch({
      type: 'ADD_TODO',
      payload: todo,
    });

    return 'added';
  };

  const editTodo = (id: string, text: string): AddResult => {
    const result = validateTodos(text);

    if (!result.isValid) {
      return result.message;
    }

    dispatch({ type: 'EDIT_TODO', payload: { id, text: result.text } });

    return 'added';
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const filteredTodos = useMemo(() => {
    return filterTodos({
      todos: todoData,
      filter,
    });
  }, [todoData, filter]);

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
    [todoData, filter, filteredTodos]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
