import React, { useRef, useState, useMemo } from 'react';
import { GripVertical } from 'lucide-react';

const palette = [
  { type: 'Header', color: 'bg-indigo-500' },
  { type: 'Image', color: 'bg-pink-500' },
  { type: 'Form', color: 'bg-emerald-500' },
  { type: 'CTA', color: 'bg-amber-500' },
];

function Block({ data, selected, onSelect, onDrag }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const start = { x: data.x, y: data.y };
    setDragging(true);

    const move = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      onDrag(data.id, { x: start.x + dx, y: start.y + dy });
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <div
      ref={ref}
      onMouseDown={(e) => {
        onSelect(data.id);
        handleMouseDown(e);
      }}
      role="button"
      tabIndex={0}
      className={`absolute select-none rounded-lg border ${selected ? 'border-gray-900' : 'border-gray-300'} bg-white shadow-lg`}
      style={{ left: data.x, top: data.y, width: data.w, height: data.h }}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-lg">
        <div className={`flex items-center justify-between px-2 py-1 text-white ${palette.find(p => p.type === data.type)?.color || 'bg-gray-500'}`}>
          <span className="text-xs font-medium">{data.type}</span>
          <GripVertical size={14} className="opacity-80" />
        </div>
        <div className="flex-1 bg-gray-50 p-3 text-xs text-gray-600">
          {data.type === 'Header' && <div className="text-lg font-semibold text-gray-900">Page headline</div>}
          {data.type === 'Image' && <div className="h-full w-full rounded-md bg-gradient-to-br from-gray-200 to-gray-300" aria-label="Image placeholder" />}
          {data.type === 'Form' && (
            <div className="grid gap-2">
              <input className="w-full rounded border px-2 py-1" placeholder="Email" />
              <input className="w-full rounded border px-2 py-1" placeholder="Password" />
            </div>
          )}
          {data.type === 'CTA' && (
            <button className="rounded-md bg-gray-900 px-3 py-2 text-white">{data.label || 'Continue'}</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Canvas({ blocks, setBlocks, selectedId, setSelectedId }) {
  const canvasRef = useRef(null);

  const addBlock = (type) => {
    const id = Math.random().toString(36).slice(2);
    const base = { w: 260, h: 140 };
    setBlocks((prev) => [
      ...prev,
      {
        id,
        type,
        x: 40 + prev.length * 20,
        y: 40 + prev.length * 10,
        w: base.w,
        h: base.h,
        label: type === 'CTA' ? 'Get started' : undefined,
        alt: type === 'Image' ? '' : undefined,
      },
    ]);
    setSelectedId(id);
  };

  const onDrag = (id, pos) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...pos } : b)));
  };

  const selectedBlock = useMemo(() => blocks.find((b) => b.id === selectedId), [blocks, selectedId]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-9">
        <div ref={canvasRef} className="relative h-[600px] w-full rounded-lg border bg-white/60">
          {blocks.map((b) => (
            <Block key={b.id} data={b} selected={b.id === selectedId} onSelect={setSelectedId} onDrag={onDrag} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {palette.map((p) => (
            <button
              key={p.type}
              onClick={() => addBlock(p.type)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
            >
              Add {p.type}
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-12 md:col-span-3">
        {/* Placeholder for external insight panel consumer; actual panel rendered in parent */}
      </div>
    </div>
  );
}
