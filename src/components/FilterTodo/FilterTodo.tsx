import { useState } from 'react';

import type { FilterType } from '../../types/FilterTodo';

type FilterTodoProps = {
  onFilter: (filter: FilterType) => void;
};

export const FilterTodo = ({ onFilter }: FilterTodoProps) => {
  const [selectedValue, setSelectedValue] = useState<FilterType>('All');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as FilterType;

    setSelectedValue(value);
    onFilter(value);
  };

  return (
    <div className="flex gap-4">
      <h3>Filter:</h3>
      <label htmlFor="allTodos" className="flex gap-1">
        <input
          type="radio"
          name="filter"
          value="All"
          id="allTodos"
          onChange={handleChange}
          checked={selectedValue === 'All'}
        />
        All
      </label>

      <label htmlFor="completedTodos" className="flex gap-1">
        <input
          type="radio"
          name="filter"
          value="Completed"
          id="completedTodos"
          onChange={handleChange}
          checked={selectedValue === 'Completed'}
        />
        Completed
      </label>

      <label htmlFor="incompleteTodos" className="flex gap-1">
        <input
          type="radio"
          name="filter"
          value="Incomplete"
          id="incompleteTodos"
          onChange={handleChange}
          checked={selectedValue === 'Incomplete'}
        />
        Incomplete
      </label>
    </div>
  );
};
