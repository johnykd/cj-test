import React, { useState } from 'react';
import './App.css';
import TagInputProps from './components/TagInput';

function App() {
  const [hashtags, setHashtags] = useState<string[]>([]);
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Hashtag Input</h2>
      <TagInputProps 
        value={hashtags} 
        onChange={setHashtags} 
        maxTags={5}
        separators={['Enter', ',']} // Add dynamic separator character
      />
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
        Tip: Press Enter or Comma to add a tag
      </p>
      <p>Output: {JSON.stringify(hashtags)}</p>
    </div>
  );
}

export default App;
