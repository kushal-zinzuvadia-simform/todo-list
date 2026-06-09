import type { Todo } from '../types/TodoItem';
import type { FilterType } from '../types/FilterType';

type filterTodosProps = {
  todos: Array<Todo>;
  filter: FilterType;
};

export function filterTodos({ todos, filter }: filterTodosProps): Array<Todo> {
  switch (filter) {
    case 'Completed':
      return todos.filter((todo) => todo.completed);

    case 'Incomplete':
      return todos.filter((todo) => !todo.completed);

    default:
      return todos;
  }
}
