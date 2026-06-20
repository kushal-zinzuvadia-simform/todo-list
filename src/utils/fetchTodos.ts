import type { Todo } from '@/types/TodoItem';

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

export const fetchData = (): Array<Todo> => {
  try {
    const stored = localStorage.getItem('todoData');
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    return isTodoArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
