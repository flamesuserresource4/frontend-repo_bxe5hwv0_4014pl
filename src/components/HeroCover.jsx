import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroCover({ onGetStarted }) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0" aria-hidden>
        <Spline
          scene="https://prod.spline.design/LU2mWMPbF3Qi1Qxh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center text-white">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur">
          <Rocket size={16} className="text-yellow-300" />
          <span>Visual Journey Builder • Real-time UX insights</span>
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
          Design customer journeys with live UX guidance
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
          Build flows with drag-and-drop blocks that look like real screens. See potential issues, best placement tips, and accessibility hints as you arrange your journey.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGetStarted}
            className="rounded-md bg-white px-5 py-3 font-medium text-gray-900 shadow hover:shadow-lg transition-shadow"
          >
            Get started
          </button>
          <a
            href="#how-it-works"
            className="rounded-md border border-white/30 px-5 py-3 font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
