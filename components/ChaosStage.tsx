'use client';
import { ChaosToOrder } from './ChaosToOrder';

// The chaos → order block on its own (used on /solutions).
export function ChaosStage() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <ChaosToOrder />
      </div>
    </section>
  );
}
