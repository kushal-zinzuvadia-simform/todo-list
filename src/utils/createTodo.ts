import type { Todo } from '@/types/TodoItem';

export const createTodo = (text: string): Todo => {
  const now = new Date();

  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAtDate: now.toLocaleDateString('en-GB'),
    createdAtTime: now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};
