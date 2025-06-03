import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface TagInputProps {
  value: string[];
  onChange: (hashtags: string[]) => void;
  maxTags?: number;
  separators?: string[];
}
const TagInput = ({ 
  value, 
  onChange, 
  maxTags,
  separators = ['Enter', ','] // Default separators
} :TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [duplicateError, setDuplicateError] = useState('');  /** State to manage duplicate tag message */
  const inputRef = useRef<HTMLInputElement>(null);

  const isTagLimitReached = maxTags !== undefined && value.length >= maxTags; 

  /** Clear duplicate error message */
  useEffect(() => {
    if (duplicateError) {
      const timer = setTimeout(() => {
        setDuplicateError('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [duplicateError]); 

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (separators.includes(e.key) && !isTagLimitReached) {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed) {
        if (value.includes(trimmed)) {
          setDuplicateError(`"${trimmed}" is already added`);
          setInputValue('');
        } else {
          onChange([...value, trimmed]);
          setInputValue('');
        }
      }
    }
    if (e.key === 'Backspace' && inputValue === '') {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemove = (index: number) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          border: '1px solid #ccc',
          borderRadius: '6px',
          padding: '8px',
          minHeight: '48px',
          cursor: 'text',
          backgroundColor: isTagLimitReached ? '#f5f5f5' : 'white',
        }}
        onClick={() => !isTagLimitReached && inputRef.current?.focus()}
      >
        {value.map((tag, index) => (
          <div
            key={index}
            style={{
              background: '#e0e0e0',
              padding: '4px 8px',
              borderRadius: '16px',
              margin: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>#{tag}</span>
            <button
              onClick={() => handleRemove(index)}
              style={{
                background: 'transparent',
                border: 'none',
                marginLeft: '6px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>
        ))}
        {!isTagLimitReached && (
          <input
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              minWidth: '100px',
              padding: '4px',
              margin: '4px',
            }}
            placeholder="Type and press enter..."
          />
        )}
      </div>
      <div style={{ minHeight: '20px' }}>
        {duplicateError && (
          <span style={{
            color: '#dc3545',
            fontSize: '0.8rem',
            animation: 'fadeIn 0.3s ease-in-out',
          }}>
            {duplicateError}
          </span>
        )}
        {maxTags !== undefined && (
          <span style={{ 
            fontSize: '0.8rem', 
            color: isTagLimitReached ? '#dc3545' : '#666',
            float: 'right'
          }}>
            {value.length} / {maxTags} tags used
          </span>
        )}
      </div>
    </div>
  );
};

export default TagInput;
