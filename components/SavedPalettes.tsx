import React from 'react';
import { Palette as PaletteType } from '../types';
import { TrashIcon } from './Icons';

interface SavedPalettesProps {
  palettes: PaletteType[];
  onSelect: (palette: PaletteType) => void;
  onDelete: (id: string) => void;
}

const SavedPalettes: React.FC<SavedPalettesProps> = ({ palettes, onSelect, onDelete }) => {
  if (palettes.length === 0) {
    return (
      <div className="text-center py-6 text-slate-500 text-sm">
        <p>You have no saved palettes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {palettes.map((palette) => (
        <div
          key={palette.id}
          className="bg-slate-800 p-3 rounded-lg flex items-center justify-between group hover:bg-slate-700 transition-colors"
        >
          <div 
            className="flex items-center gap-4 cursor-pointer flex-grow" 
            onClick={() => onSelect(palette)}
            title="Load this palette"
          >
            <div className="flex -space-x-2">
              {palette.colors.slice(0, 5).map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-slate-800"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex flex-col">
                <span className="font-medium text-slate-200">{palette.name}</span>
                <span className="text-xs text-slate-400">{palette.colors.length} colors</span>
            </div>
          </div>
          <button
            onClick={() => onDelete(palette.id)}
            className="p-2 rounded-full text-slate-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Delete palette"
            title="Delete this palette"
          >
            <TrashIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedPalettes;