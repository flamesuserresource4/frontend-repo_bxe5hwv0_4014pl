import React from 'react';
import { AlertTriangle, CheckCircle2, Eye, Contrast, MousePointerClick } from 'lucide-react';

function InsightItem({ type = 'warn', title, detail }) {
  const styles = {
    warn: {
      icon: <AlertTriangle className="text-amber-500" size={18} />,
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
    },
    ok: {
      icon: <CheckCircle2 className="text-emerald-600" size={18} />,
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
    },
  }[type];

  return (
    <div className={`rounded-md border ${styles.border} ${styles.bg} p-3`}> 
      <div className={`flex items-start gap-2 ${styles.text}`}>
        {styles.icon}
        <div>
          <p className="font-medium">{title}</p>
          {detail && <p className="text-sm opacity-90">{detail}</p>}
        </div>
      </div>
    </div>
  );
}

export default function InsightPanel({ selectedBlock }) {
  if (!selectedBlock) {
    return (
      <aside className="w-full rounded-lg border bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-600">Select a block to see live UX insights and accessibility hints.</p>
      </aside>
    );
  }

  // Simple heuristics for demo purposes
  const insights = [];

  if ((selectedBlock.type === 'Form' || selectedBlock.type === 'CTA') && selectedBlock.y < 80) {
    insights.push({
      type: 'warn',
      title: 'Primary action appears above expected reading flow',
      detail: 'Place key actions after context so users understand what they are acting on.',
    });
  }
  if (selectedBlock.type === 'Image' && selectedBlock.alt?.trim() === '') {
    insights.push({
      type: 'warn',
      title: 'Image missing alt text',
      detail: 'Add descriptive alt text for screen readers and better accessibility.',
    });
  }
  if (selectedBlock.type === 'CTA' && selectedBlock.label.length < 3) {
    insights.push({
      type: 'warn',
      title: 'CTA label is too short',
      detail: 'Use action-oriented labels like “Start free trial” or “Continue to checkout”.',
    });
  }
  if (selectedBlock.type === 'Header') {
    insights.push({
      type: 'ok',
      title: 'Clear visual entry point',
      detail: 'A strong header helps set context and reduces cognitive load.',
    });
  }

  // Universal hints
  insights.push({
    type: 'ok',
    title: 'Tap target size',
    detail: 'Ensure interactive elements are at least 44x44px for touch accessibility.',
  });

  return (
    <aside className="w-full rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
        <Eye size={16} /> Live insights • <Contrast size={16} /> Accessibility • <MousePointerClick size={16} /> Best placement
      </div>
      <div className="grid gap-2">
        {insights.map((ins, i) => (
          <InsightItem key={i} type={ins.type} title={ins.title} detail={ins.detail} />
        ))}
      </div>
    </aside>
  );
}
