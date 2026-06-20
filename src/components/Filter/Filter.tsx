import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { filters, type FilterType } from '../../types/FilterType';

type FilterProps = {
  filter: FilterType;
  onFilter: (filter: FilterType) => void;
};

const isFilterType = (value: string): value is FilterType =>
  filters.some((filter) => filter === value);

export const Filter = ({ filter, onFilter }: FilterProps) => {
  const handleChange = (value: string) => {
    if (isFilterType(value)) {
      onFilter(value);
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
