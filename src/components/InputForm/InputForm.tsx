import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addTodo } from '@/redux/slices/todoSlice';
import type { AppDispatch } from '@/redux/store';
import { createTodo } from '@/utils/createTodo';
import { showErrorToast } from '@/utils/showErrorToast';
import { validateTodos } from '@/utils/validateTodos';

export const InputForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const todoRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = todoRef.current;
    if (!input) return;

    const result = validateTodos(input.value);

    if (result.isValid === false) {
      showErrorToast(result.message);
      return;
    }

    dispatch(addTodo(createTodo(result.text)));

    toast.success(`Added "${result.text}"`);

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
