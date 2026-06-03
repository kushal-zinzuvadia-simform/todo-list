import type { Todo } from '../types/TodoItem';
import type { FilterType } from '../types/FilterTodo';

export function filterTodos(todos: Array<Todo>, filter: FilterType): Todo[] {
  switch (filter) {
    case 'Completed':
      return todos.filter((todo) => todo.completed);

    case 'Incomplete':
      return todos.filter((todo) => !todo.completed);

    default:
      return todos;
  }
}
