import type { FilterType } from '../../types/FilterType';

type FilterTodoProps = {
  filter: FilterType;
  onFilter: (filter: FilterType) => void;
};

const isFilterType = (value: string): value is FilterType =>
  ['All', 'Completed', 'Incomplete'].includes(value);

export const Filter = ({ filter, onFilter }: FilterTodoProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (isFilterType(value)) {
      onFilter(value);
    }
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
          checked={filter === 'All'}
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
          checked={filter === 'Completed'}
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
          checked={filter === 'Incomplete'}
        />
        Incomplete
      </label>
    </div>
  );
};
