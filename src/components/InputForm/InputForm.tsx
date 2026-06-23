import { useRef } from 'react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodoContext } from '@/hooks/useTodoContext';
import { showErrorToast } from '@/utils/showErrorToast';

export const InputForm = () => {
  const { addItem } = useTodoContext();

  const todoRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = todoRef.current;

    if (!input) return;

    const todo = input.value.trim();
    const result = addItem(todo);

    input.focus();
    showErrorToast(result);

    e.currentTarget.reset();
    toast.success(`Added "${todo}"`, { duration: 3000 });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Input
          ref={todoRef}
          type="text"
          placeholder="Add a task"
          title="Enter Todo"
          maxLength={35}
          className="max-w-sm"
        />

        <Button type="submit" title="Add Todo">
          Add Todo
        </Button>
      </form>
    </div>
  );
};
