import { useEffect, useState } from 'react';

import type { Todo } from '../types/TodoItem';

export function useTodoData() {
  const [todoData, setTodoData] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem('todoData');

      if (!stored) return [];

      const todos: Todo[] = JSON.parse(stored);
      const today = new Date().toLocaleDateString('en-GB');

      return todos.filter((todo) => todo.createdAt === today);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }, [todoData]);

  function addItem(text: string) {
    if (!text.trim()) return false;

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

  function toggleTodo(id: string) {
    setTodoData((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: string) {
    setTodoData((prev) => prev.filter((todo) => todo.id !== id));
  }

  return { todoData, addItem, toggleTodo, deleteTodo };
}
