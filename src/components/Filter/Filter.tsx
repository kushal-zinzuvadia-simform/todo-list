import { useDispatch, useSelector } from 'react-redux';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { AppDispatch, RootState } from '@/redux/store';
import { setFilter } from '@/redux/slices/todoSlice';
import { filters, type FilterType } from '@/types/FilterType';

const isFilterType = (value: string): value is FilterType =>
  filters.some((filter) => filter === value);

export const Filter = () => {
  const filter = useSelector((state: RootState) => state.todos.filterCategory);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (value: string) => {
    if (isFilterType(value)) {
      dispatch(setFilter(value));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <h3 className="text-sm font-medium">Filter:</h3>

      <RadioGroup
        value={filter}
        onValueChange={handleChange}
        className="flex flex-row gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="All" id="allTodos" />
          <Label htmlFor="allTodos">All</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Completed" id="completedTodos" />
          <Label htmlFor="completedTodos">Completed</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Incomplete" id="incompleteTodos" />
          <Label htmlFor="incompleteTodos">Incomplete</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
