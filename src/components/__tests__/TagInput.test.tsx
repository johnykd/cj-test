import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TagInput from '../TagInput';

describe('TagInput Component', () => {
  const mockOnChange = jest.fn();
  
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders without crashing', () => {
    render(<TagInput value={[]} onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText('Type and press enter...')).toBeInTheDocument();
  });

  it('displays existing tags', () => {
    render(<TagInput value={['react', 'typescript']} onChange={mockOnChange} />);
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#typescript')).toBeInTheDocument();
  });

  it('adds new tag when pressing Enter', () => {
    render(<TagInput value={[]} onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Type and press enter...');
    
    fireEvent.change(input, { target: { value: 'newTag' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnChange).toHaveBeenCalledWith(['newTag']);
  });

  it('adds new tag when pressing comma', () => {
    render(<TagInput value={[]} onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Type and press enter...');
    
    fireEvent.change(input, { target: { value: 'newTag' } });
    fireEvent.keyDown(input, { key: ',' });
    
    expect(mockOnChange).toHaveBeenCalledWith(['newTag']);
  });

  it('prevents adding duplicate tags', () => {
    render(<TagInput value={['existing']} onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Type and press enter...');
    
    fireEvent.change(input, { target: { value: 'existing' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(screen.getByText('"existing" is already added')).toBeInTheDocument();
  });

  it('removes tag when clicking remove button', () => {
    render(<TagInput value={['tag1', 'tag2']} onChange={mockOnChange} />);
    const removeButtons = screen.getAllByText('×');
    
    fireEvent.click(removeButtons[0]);
    
    expect(mockOnChange).toHaveBeenCalledWith(['tag2']);
  });

  it('removes last tag when pressing backspace with empty input', () => {
    render(<TagInput value={['tag1', 'tag2']} onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Type and press enter...');
    
    fireEvent.keyDown(input, { key: 'Backspace' });
    
    expect(mockOnChange).toHaveBeenCalledWith(['tag1']);
  });

  it('respects maxTags limit', () => {
    render(<TagInput value={['tag1', 'tag2']} onChange={mockOnChange} maxTags={2} />);
    
    expect(screen.getByText('2 / 2 tags used')).toBeInTheDocument();
    expect(screen.getByText('2 / 2 tags used')).toHaveStyle({ color: '#dc3545' });
    
    // Input should not be visible when max tags reached
    expect(screen.queryByPlaceholderText('Type and press enter...')).not.toBeInTheDocument();
  });

  it('handles custom separators', () => {
    render(<TagInput value={[]} onChange={mockOnChange} separators={['Enter', ' ']} />);
    const input = screen.getByPlaceholderText('Type and press enter...');
    
    fireEvent.change(input, { target: { value: 'newTag' } });
    fireEvent.keyDown(input, { key: ' ' });
    
    expect(mockOnChange).toHaveBeenCalledWith(['newTag']);
  });

  it('trims whitespace from input', () => {
    render(<TagInput value={[]} onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText('Type and press enter...');
    
    fireEvent.change(input, { target: { value: '  tag  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnChange).toHaveBeenCalledWith(['tag']);
  });
});
