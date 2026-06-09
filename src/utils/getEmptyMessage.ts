import type { FilterType } from '../types/FilterType';

export const getEmptyMessage = (filter: FilterType) => {
  switch (filter) {
    case 'Completed':
      return 'No completed tasks yet.';

    case 'Incomplete':
      return 'All tasks are completed.';

    default:
      return 'No tasks added yet.';
  }
};
