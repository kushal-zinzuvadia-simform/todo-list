import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addTodo } from '@/redux/slices/todoSlice';

export const InputForm = () => {
  const dispatch = useDispatch();

  const todoRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = todoRef.current;
    if (!input) return;

    const todo = input.value.trim();

    dispatch(addTodo(todo));

    input.focus();
    e.currentTarget.reset();
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
