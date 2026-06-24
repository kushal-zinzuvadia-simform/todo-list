import type { Todo } from './TodoItem';
import type { FilterType } from './FilterType';

export type TodoSliceState = {
  todoData: Array<Todo>;
  filterCategory: FilterType;
};
