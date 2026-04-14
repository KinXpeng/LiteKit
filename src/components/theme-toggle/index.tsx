import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // 从 localStorage 加载主题
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Button
      type="text"
      onClick={toggleTheme}
      className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
      style={{
        color: theme === 'dark' ? 'var(--text-primary)' : 'var(--text-primary)',
        borderColor: 'var(--border-color)'
      }}
    >
      {theme === 'dark' ? '🌞 浅色' : '🌙 深色'}
    </Button>
  );
};

export default ThemeToggle;