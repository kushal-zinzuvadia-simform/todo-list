import { useState } from 'react';
import type { Todo } from '../types/TodoItem';

export function useTodoData() {
  const [todoData, setTodoData] = useState<Todo[]>([]);

  function addItem(text: string) {
    if (!text) return false;

    setTodoData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date().toLocaleDateString('en-GB'),
      },
    ]);

    return true;
  }

  return { todoData, addItem };
}
