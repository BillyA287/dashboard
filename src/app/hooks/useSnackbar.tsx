import { useState } from 'react';

type SnackbarType = 'success' | 'error' | 'info' | 'warning';

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<{ message: string; type: SnackbarType } | null>(null);

  function showSnackbar(message: string, type: SnackbarType) {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 3000);
  }

  return { snackbar, showSnackbar };
}