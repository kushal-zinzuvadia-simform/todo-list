import { useEffect, useState } from 'react';

import type { Todo } from '../types/TodoItem';
import type { AddResult } from '../types/AddResult';

type UseTodoDataReturn = {
  todoData: Todo[];
  addItem: (text: string) => AddResult;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const fetchData = () => {
  try {
    const stored = localStorage.getItem('todoData');

    if (!stored) return [];

    const todos: Todo[] = JSON.parse(stored);
    const today = new Date().toLocaleDateString('en-GB');

    return todos.filter((todo) => todo.createdAtDate === today);
  } catch {
    return [];
  }
};

export function useTodoData(): UseTodoDataReturn {
  const [todoData, setTodoData] = useState<Array<Todo>>(fetchData);

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }, [todoData]);

  function addItem(text: string): AddResult {
    if (!text.trim()) return 'empty';
    if (!/[a-zA-Z0-9]/.test(text)) return 'invalid';

    const now = new Date();

    setTodoData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAtDate: now.toLocaleDateString('en-GB'),
        createdAtTime: now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);

    return 'added';
  }

  function toggleTodo(id: string): void {
    setTodoData((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: string): void {
    setTodoData((prev) => prev.filter((todo) => todo.id !== id));
  }

  return { todoData, addItem, toggleTodo, deleteTodo };
}
