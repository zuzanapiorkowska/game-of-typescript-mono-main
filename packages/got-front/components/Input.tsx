import { useState } from 'react';
import { Button } from './Button';
import { StartButton } from './StartButton';

interface InputProps {
  onInputChange(e: number): void;
  onStartClick(): void;
}

export function Input({ onInputChange, onStartClick }: InputProps) {
  const [inputValue, setInputValue] = useState<number>(0);
  return (
    <div className="input-box">
      <span className="label">Choose the size of he board: </span>
      <input
        className="size-input"
        type="number"
        step={1}
        onChange={(e) => {
          const value = +e.target.value;
          setInputValue(value);
          onInputChange(value);
        }}
        value={inputValue}
      />
      <StartButton onClick={() => onStartClick()} />
    </div>
  );
}
