import { useEffect, useState } from 'react';

import type { AddResult } from '../types/AddResult';
import type { Todo } from '../types/TodoItem';

type UseTodoDataReturn = {
  todoData: Array<Todo>;
  addItem: (text: string) => AddResult;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const isTodo = (item: unknown): item is Todo => {
  if (typeof item !== 'object' || item === null) return false;

  const obj = item as Record<string, unknown>;

  return (
    typeof obj.id === 'string' &&
    typeof obj.text === 'string' &&
    typeof obj.completed === 'boolean' &&
    typeof obj.createdAtDate === 'string' &&
    typeof obj.createdAtTime === 'string'
  );
};

const isTodoArray = (value: unknown): value is Array<Todo> =>
  Array.isArray(value) && value.every(isTodo);

const fetchData = (): Array<Todo> => {
  try {
    const stored = localStorage.getItem('todoData');
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    return isTodoArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function useTodoData(): UseTodoDataReturn {
  const [todoData, setTodoData] = useState<Array<Todo>>(fetchData);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB');
    const prunedTodos = todoData.filter((todo) => todo.createdAtDate === today);

    localStorage.setItem('todoData', JSON.stringify(prunedTodos));
  }, [todoData]);

  function addItem(text: string): AddResult {
    const trimmedText = text.trim();

    if (!trimmedText) return 'empty';

    const alphanumericCount = (trimmedText.match(/[a-zA-Z0-9]/g) ?? []).length;

    const specialCharacterCount = (trimmedText.match(/[^a-zA-Z0-9\s]/g) ?? [])
      .length;

    if (specialCharacterCount > 5) return 'too-many-special-characters';

    if (alphanumericCount < 3) return 'too-short';

    const now = new Date();

    setTodoData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: trimmedText,
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
