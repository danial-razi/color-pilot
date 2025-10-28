import React, { useState, useRef } from 'react';
import { getTextColorForBackground } from '../utils/colors';
import { ClipboardIcon, CheckIcon } from './Icons';

interface PaletteProps {
  colors: string[];
  onReorder: (newColors: string[]) => void;
}

const ColorCard: React.FC<{ color: string }> = ({ color }) => {
  const [copied, setCopied] = useState(false);
  const textColorClassName = getTextColorForBackground(color);
  const textColorHex = textColorClassName === 'text-white' ? '#FFFFFF' : '#000000';

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-lg h-32 md:h-48 flex flex-col p-4 text-sm font-mono group transition-all duration-300"
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 pointer-events-none bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex justify-end">
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-full transition-all ${textColorClassName} bg-white/20 hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80`}
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            aria-label="Copy color code"
            title="Copy color to clipboard"
          >
            {copied ? <CheckIcon /> : <ClipboardIcon />}
          </button>
        </div>
        <div className="mt-auto">
          <span className={textColorClassName}>{color}</span>
        </div>
      </div>
    </div>
  );
};


const Palette: React.FC<PaletteProps> = ({ colors, onReorder }) => {
  const dragItem = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
    setTimeout(() => setIsDragging(true), 0);
  };

  const handleDragEnter = (index: number) => {
    if (dragItem.current !== null && index !== dragItem.current) {
      setDragOverIndex(index);
    }
  };
  
  const handleDragEnd = () => {
    dragItem.current = null;
    setDragOverIndex(null);
    setIsDragging(false);
  };

  const handleDrop = (index: number) => {
    if (dragItem.current !== null && dragOverIndex === null) {
      setDragOverIndex(index);
    }

    if (dragItem.current === null || dragOverIndex === null || dragItem.current === dragOverIndex) {
      handleDragEnd();
      return;
    }

    const newColors = [...colors];
    const [reorderedItem] = newColors.splice(dragItem.current, 1);
    newColors.splice(dragOverIndex, 0, reorderedItem);
    
    onReorder(newColors);
    handleDragEnd();
  };


  if (colors.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">
        <p>No palette generated yet.</p>
        <p className="text-sm">Upload an image or paste some CSS to start.</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      onDragLeave={() => setDragOverIndex(null)}
    >
      {colors.map((color, index) => (
        <div
          key={`${color}-${index}`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={(e) => {
            e.preventDefault();
            handleDragEnter(index);
          }}
          onDrop={() => handleDrop(index)}
          onDragEnd={handleDragEnd}
          title="Drag to reorder"
          className={`
            cursor-move rounded-lg transition-all duration-200 
            ${!isDragging ? 'hover:scale-105' : ''} 
            ${dragOverIndex === index ? 'ring-2 ring-offset-2 ring-offset-slate-800/50 ring-sky-400 animate-pulse' : ''}
            ${isDragging && dragItem.current === index ? 'opacity-50 scale-95' : 'opacity-100'}
          `}
        >
          <ColorCard color={color} />
        </div>
      ))}
    </div>
  );
};

export default Palette;
