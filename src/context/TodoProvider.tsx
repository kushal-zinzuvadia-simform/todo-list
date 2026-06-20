import {
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';

import type { AddResult } from '@/types/AddResult';
import type { FilterType } from '@/types/FilterType';
import type { Todo } from '@/types/TodoItem';
import { fetchData } from '@/utils/fetchTodos';
import { filterTodos } from '@/utils/filterTodos';

import { TodoContext } from './todo-context';

type TodoState = {
  todoData: Array<Todo>;
};

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string };

type TodoProviderProps = {
  children: ReactNode;
};

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
    const trimmedText = text.trim();

    if (!trimmedText) return 'empty';

    const alphanumericCount = (trimmedText.match(/[a-zA-Z0-9]/g) ?? []).length;

    const specialCharacterCount = (trimmedText.match(/[^a-zA-Z0-9\s]/g) ?? [])
      .length;

    if (specialCharacterCount > 5) {
      return 'too-many-special-characters';
    }

    if (alphanumericCount < 3) {
      return 'too-short';
    }

    const now = new Date();

    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: crypto.randomUUID(),
        text: trimmedText,
        completed: false,
        createdAtDate: now.toLocaleDateString('en-GB'),
        createdAtTime: now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    });

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
