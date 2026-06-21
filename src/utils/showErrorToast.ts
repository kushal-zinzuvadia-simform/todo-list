import toast from 'react-hot-toast';

import type { AddResult } from '@/types/AddResult';

export const showErrorToast = (result: AddResult): void => {
  switch (result) {
    case 'empty':
      toast.error('Todo cannot be empty');
      break;
    case 'too-short':
      toast.error('Todo must contain at least 3 alphanumeric characters');
      break;
    case 'too-many-special-characters':
      toast.error('Todo must not contain more than 5 special characters');
      break;
    default:
      break;
  }
};
