import React, { useState, useRef, useCallback, useEffect } from 'react';
import ColorThief from 'colorthief';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Palette as PaletteType, InputMode } from './types';
import { rgbToHex, extractColorsFromCss } from './utils/colors';
import { exportAsJson, exportAsAse } from './utils/export';
import Palette from './components/Palette';
import SavedPalettes from './components/SavedPalettes';
import { PictureIcon, CodeBracketIcon, BookmarkIcon, ArrowDownTrayIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon, ArrowPathIcon } from './components/Icons';

const App: React.FC = () => {
  const [inputMode, setInputMode] = useState<InputMode>('image');
  const [currentPalette, setCurrentPalette] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cssText, setCssText] = useState<string>('/* Paste your CSS here */\n\nbody {\n  background-color: #0f172a;\n  color: #f8fafc;\n}\n\na {\n  color: rgb(59, 130, 246);\n}');
  const [savedPalettes, setSavedPalettes] = useLocalStorage<PaletteType[]>('colorpilot-palettes', []);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  // State for zoom and pan
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const resetZoomAndPan = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const extractFromImage = useCallback(() => {
    if (imageRef.current) {
      try {
        const colorThief = new ColorThief();
        const paletteRGB = colorThief.getPalette(imageRef.current, 10);
        const paletteHex = paletteRGB.map((rgb: [number, number, number]) => rgbToHex(rgb[0], rgb[1], rgb[2]));
        setCurrentPalette(paletteHex);
        setError(null);
      } catch (e) {
        setError('Could not extract colors. Please try a different image format.');
        setCurrentPalette(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      resetZoomAndPan();
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        // We need to wait for the image element to load the new src
        // The `extractFromImage` is called from the image's `onLoad` handler
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCssExtract = () => {
    setIsLoading(true);
    setError(null);
    try {
        const colors = extractColorsFromCss(cssText);
        setCurrentPalette(colors);
    } catch(e) {
        setError("Failed to parse CSS.");
        setCurrentPalette(null);
    }
    setIsLoading(false);
  };

  const handleSavePalette = () => {
    if (currentPalette && currentPalette.length > 0) {
      const name = prompt("Enter a name for this palette:", `Palette ${savedPalettes.length + 1}`);
      if (name) {
          const newPalette: PaletteType = {
            id: crypto.randomUUID(),
            name,
            colors: currentPalette,
            createdAt: new Date().toISOString(),
          };
          setSavedPalettes([newPalette, ...savedPalettes]);
      }
    }
  };
  
  const handleSelectSavedPalette = (palette: PaletteType) => {
    setCurrentPalette(palette.colors);
    setImagePreview(null);
    resetZoomAndPan();
    setInputMode('image');
  }
  
  const handleDeleteSavedPalette = (id: string) => {
    if (window.confirm("Are you sure you want to delete this palette?")) {
        setSavedPalettes(savedPalettes.filter(p => p.id !== id));
    }
  }

  const handlePaletteReorder = (newColors: string[]) => {
    setCurrentPalette(newColors);
  };
  
  const handleExport = (format: 'json' | 'ase') => {
    if (currentPalette && currentPalette.length > 0) {
      const paletteName = prompt("Enter a name for your palette export:", `My-Palette`);
      if (paletteName) {
        if (format === 'json') {
          exportAsJson(currentPalette, paletteName);
        } else if (format === 'ase') {
          exportAsAse(currentPalette, paletteName);
        }
        setIsExportMenuOpen(false); // Close menu after export
      }
    }
  };

  // Zoom and Pan Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || zoom <= 1) return;
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    e.preventDefault();
    setPosition({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
  };
  const handleMouseUpOrLeave = () => setIsPanning(false);
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    const newZoom = e.deltaY < 0 ? zoom * zoomFactor : zoom / zoomFactor;
    setZoom(Math.max(1, Math.min(newZoom, 5)));
  };
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(1, prev - 0.2));


  const TabButton: React.FC<{ mode: InputMode; label: string; children: React.ReactNode }> = ({ mode, label, children }) => (
    <button
      onClick={() => setInputMode(mode)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${inputMode === mode ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
      title={`Switch to ${label} mode`}
    >
      {children}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-white">ColorPilot</h1>
            <p className="text-slate-400 mt-1">Extract color palettes from images & CSS.</p>
          </header>
          
          <div className="bg-slate-800/50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-4 p-1 bg-slate-800 rounded-lg">
              <TabButton mode="image" label="Image"><PictureIcon /></TabButton>
              <TabButton mode="css" label="CSS"><CodeBracketIcon /></TabButton>
            </div>
            {inputMode === 'image' && (
              <div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                {imagePreview ? (
                  <div className="relative group">
                    <div 
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUpOrLeave}
                      onMouseLeave={handleMouseUpOrLeave}
                      onWheel={handleWheel}
                      className={`h-48 bg-slate-900/50 rounded-lg overflow-hidden transition-colors ${zoom > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
                      title="Scroll to zoom, drag to pan"
                    >
                      <img 
                        ref={imageRef} 
                        src={imagePreview} 
                        alt="Preview"
                        draggable="false"
                        onLoad={extractFromImage}
                        className="w-full h-full object-contain transition-transform duration-100 ease-out"
                        style={{ transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)` }}
                      />
                    </div>
                    <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button onClick={handleZoomIn} title="Zoom In" className="p-1.5 bg-slate-800/70 text-white rounded-full hover:bg-slate-700"><MagnifyingGlassPlusIcon /></button>
                        <button onClick={handleZoomOut} title="Zoom Out" className="p-1.5 bg-slate-800/70 text-white rounded-full hover:bg-slate-700"><MagnifyingGlassMinusIcon /></button>
                        <button onClick={resetZoomAndPan} title="Reset View" className="p-1.5 bg-slate-800/70 text-white rounded-full hover:bg-slate-700"><ArrowPathIcon /></button>
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 left-2 text-xs bg-slate-800/70 text-white py-1 px-2 rounded-full hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100 z-10"
                      title="Upload a different image"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-600 rounded-lg p-6 h-48 flex flex-col justify-center items-center text-center cursor-pointer hover:border-sky-500 hover:bg-slate-800 transition-colors"
                    title="Click to upload an image"
                  >
                    <div className="text-slate-400">
                      <PictureIcon />
                      <p>Click or drop image here</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {inputMode === 'css' && (
              <div className="space-y-4">
                <textarea
                  value={cssText}
                  onChange={(e) => setCssText(e.target.value)}
                  className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                  placeholder="Paste your CSS here..."
                />
                <button
                  onClick={handleCssExtract}
                  disabled={isLoading}
                  className="w-full bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                  title="Extract colors from the CSS code"
                >
                  {isLoading ? 'Extracting...' : 'Extract Colors from CSS'}
                </button>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Saved Palettes</h2>
            <div className="bg-slate-800/50 p-4 rounded-xl max-h-96 overflow-y-auto">
                <SavedPalettes palettes={savedPalettes} onSelect={handleSelectSavedPalette} onDelete={handleDeleteSavedPalette} />
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Generated Palette</h2>
                {currentPalette && currentPalette.length > 0 && (
                     <div className="flex items-center gap-2">
                        <button
                            onClick={handleSavePalette}
                            className="flex items-center gap-2 bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                            title="Save the current palette"
                        >
                            <BookmarkIcon />
                            Save Palette
                        </button>
                        <div className="relative" ref={exportMenuRef}>
                            <button
                                onClick={() => setIsExportMenuOpen(prev => !prev)}
                                className="flex items-center gap-2 bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                                aria-haspopup="true"
                                aria-expanded={isExportMenuOpen}
                                title="Export the current palette"
                            >
                                <ArrowDownTrayIcon />
                                Export
                            </button>
                            {isExportMenuOpen && (
                                <div 
                                    className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-xl z-20 py-1 origin-top-right ring-1 ring-black ring-opacity-5"
                                    role="menu"
                                    aria-orientation="vertical"
                                >
                                    <a 
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); handleExport('json'); }} 
                                        className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 w-full text-left"
                                        role="menuitem"
                                        title="Export as a .json file"
                                    >
                                        Export as JSON (.json)
                                    </a>
                                    <a 
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); handleExport('ase'); }} 
                                        className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 w-full text-left"
                                        role="menuitem"
                                        title="Export as an Adobe .ase file"
                                    >
                                        Export for Adobe (.ase)
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl min-h-[20rem] flex justify-center items-center">
                {isLoading ? (
                    <div className="text-slate-400">Loading...</div>
                ) : error ? (
                    <div className="text-red-400">{error}</div>
                ) : currentPalette ? (
                    <Palette colors={currentPalette} onReorder={handlePaletteReorder} />
                ) : (
                    <div className="text-center text-slate-500">
                        <p className="text-lg">Your generated palette will appear here.</p>
                        <p className="text-sm mt-1">Start by selecting an image or pasting CSS code.</p>
                    </div>
                )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
