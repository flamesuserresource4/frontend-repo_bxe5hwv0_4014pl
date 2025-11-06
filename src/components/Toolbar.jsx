import React from 'react';
import { Plus, Hand, MousePointer2, Trash2 } from 'lucide-react';

export default function Toolbar({ mode, onModeChange, onAddBlock, onClear }) {
  const Button = ({ active, children, onClick, label }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active ? 'bg-gray-900 text-white' : 'bg-white text-gray-800 hover:bg-gray-50'
      } border border-gray-200 shadow-sm`}
    >
      {children}
    </button>
  );

  return (
    <div className="sticky top-0 z-20 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <Button label="Select" active={mode === 'select'} onClick={() => onModeChange('select')}>
            <MousePointer2 className="mr-1 inline-block" size={16} /> Select
          </Button>
          <Button label="Pan" active={mode === 'pan'} onClick={() => onModeChange('pan')}>
            <Hand className="mr-1 inline-block" size={16} /> Pan
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button label="Add block" onClick={onAddBlock}>
            <Plus className="mr-1 inline-block" size={16} /> Add block
          </Button>
          <Button label="Clear canvas" onClick={onClear}>
            <Trash2 className="mr-1 inline-block" size={16} /> Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
