import type { Todo } from '../types/TodoItem';
import type { FilterType } from '../types/FilterTodo';

export const useFilter = (todos: Todo[], filter: FilterType) => {
  return todos.filter((todo) => {
    switch (filter) {
      case 'Completed':
        return todo.completed;

      case 'Incomplete':
        return !todo.completed;

      default:
        return true;
    }
  });
};
