import { useRef } from 'react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { AddResult } from '../../types/AddResult';

type InputFormProps = {
  onAdd: (todo: string) => AddResult;
};

export const InputForm = ({ onAdd }: InputFormProps) => {
  const todoRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = todoRef.current;

    if (!input) return;

    const todo = input.value.trim();
    const result = onAdd(todo);

    input.focus();

    if (result === 'empty') {
      toast.error('Please enter a todo item to add');
      return;
    }

    if (result === 'too-short') {
      toast.error('Todo must contain at least 3 alphanumeric characters');
      return;
    }

    if (result === 'too-many-special-characters') {
      toast.error('Todo must not contain more than 5 special characters');
      return;
    }

    e.currentTarget.reset();
    toast.success(`Added "${todo}"`, { duration: 3000 });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Input
          ref={todoRef}
          type="text"
          placeholder="Enter Todo"
          title="Enter Todo"
          maxLength={35}
          className="max-w-sm"
        />

        <Button type="submit">Add Todo</Button>
      </form>
    </div>
  );
};
