# # Hashtag Input Component

A flexible and user-friendly React component for handling hashtag inputs with TypeScript support. This component provides a modern, intuitive interface for adding and managing hashtags with various customization options.

## Features

- 🏷️ Add hashtags using customizable separator keys (Enter, Space, Comma, etc.)
- 🚫 Prevents duplicate tags with user feedback
- ⌫ Remove tags via 'x' button or backspace key
- 📏 Optional maximum tag limit
- 🎨 Clean, modern design with pill-style tags
- 💡 Built-in visual feedback for user actions
- 📱 Responsive and mobile-friendly
- 🔍 TypeScript support with full type definitions

## Usage

Basic usage example:

```tsx
import React, { useState } from 'react';
import HashtagInput from './components/HashtagInput';

function App() {
  const [hashtags, setHashtags] = useState<string[]>([]);

  return (
    <HashtagInput
      value={hashtags}
      onChange={setHashtags}
    />
  );
}
```

The page will reload if you make edits.\
You will also see any lint errors in the console.

Advanced usage with all props:

```tsx
<HashtagInput
  value={hashtags}
  onChange={setHashtags}
  maxTags={5}
  separators={['Enter', ' ', ',']}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string[]` | Yes | - | Array of current hashtags |
| `onChange` | `(hashtags: string[]) => void` | Yes | - | Callback function when tags change |
| `maxTags` | `number` | No | undefined | Maximum number of allowed tags |
| `separators` | `string[]` | No | `['Enter', ',']` | Keys that trigger new tag creation |

## Features in Detail

### 1. Tag Creation
- Tags can be added using customizable separator keys
- Default separators are Enter and comma
- Whitespace is automatically trimmed
- Empty tags are ignored

### 2. Duplicate Prevention
- Automatically prevents duplicate tags
- Shows a friendly error message when duplicates are attempted
- Error message fades out automatically after 2 seconds

### 3. Tag Removal
Two ways to remove tags:
- Click the 'x' button next to any tag
- Press backspace when the input is empty to remove the last tag

### 4. Maximum Tags Limit
When `maxTags` is set:
- Shows current tag count (e.g., "3/5 tags used")
- Prevents adding more tags when limit is reached
- Visual feedback when limit is reached
- Input field is hidden when maximum is reached

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
