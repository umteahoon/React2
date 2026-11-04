'use client';

import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export default function ThemeStatus() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={toggleTheme}>테마 전환</button>
    </div>
  );
}
