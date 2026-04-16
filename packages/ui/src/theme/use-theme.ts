import { useContext } from 'react';
import { ThemeModeContext } from './theme-context';

export function useTheme() {
  return useContext(ThemeModeContext);
}
