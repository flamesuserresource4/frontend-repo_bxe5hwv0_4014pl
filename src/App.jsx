import React, { useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import InsightPanel from './components/InsightPanel';

export default function App() {
  const [mode, setMode] = useState('select');
  const [blocks, setBlocks] = useState([
    { id: 'h1', type: 'Header', x: 40, y: 40, w: 320, h: 120 },
    { id: 'img1', type: 'Image', x: 420, y: 60, w: 260, h: 160, alt: '' },
    { id: 'cta1', type: 'CTA', x: 80, y: 220, w: 220, h: 120, label: 'Start free trial' },
  ]);
  const [selectedId, setSelectedId] = useState('h1');

  const onAddBlock = () => {
    const id = Math.random().toString(36).slice(2);
    setBlocks((prev) => [
      ...prev,
      { id, type: 'Form', x: 80 + prev.length * 16, y: 120 + prev.length * 12, w: 280, h: 150 },
    ]);
    setSelectedId(id);
  };

  const onClear = () => {
    setBlocks([]);
    setSelectedId(undefined);
  };

  const selectedBlock = useMemo(() => blocks.find((b) => b.id === selectedId), [blocks, selectedId]);

  const scrollToBuilder = () => {
    const el = document.getElementById('builder');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-900">
      <HeroCover onGetStarted={scrollToBuilder} />

      <div id="builder" className="mx-auto max-w-6xl px-4 pb-16">
        <Toolbar mode={mode} onModeChange={setMode} onAddBlock={onAddBlock} onClear={onClear} />

        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            <Canvas
              blocks={blocks}
              setBlocks={setBlocks}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </div>
          <div className="col-span-12 lg:col-span-3">
            <InsightPanel selectedBlock={selectedBlock} />
          </div>
        </div>

        <section id="how-it-works" className="mt-16 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-700">
            <li>Drag blocks to arrange your customer journey like real screens.</li>
            <li>Click a block to see live UX suggestions and accessibility hints.</li>
            <li>Use the toolbar to add new blocks or reset your canvas.</li>
          </ol>
        </section>
      </div>

      <footer className="border-t bg-white/70 py-6">
        <div className="mx-auto max-w-6xl px-4 text-sm text-gray-600">
          Built for designers who want visual flows with real-time UX guidance.
        </div>
      </footer>
    </div>
  );
}
