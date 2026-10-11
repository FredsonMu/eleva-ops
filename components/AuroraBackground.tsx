// Decorative page background. Uses radial gradients instead of `filter: blur()`
// so the compositor doesn't re-run large blur filters every frame while scrolling.
export function AuroraBackground({ noiseClassName = 'opacity-[0.15] dark:opacity-[0.08]' }: { noiseClassName?: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Primary Blue Aurora */}
      <div className="aurora-blob aurora-blue top-[-25%] left-[-25%] w-[100vw] md:w-[80vw] h-[100vw] md:h-[80vw]"></div>
      {/* Secondary Cyan Aurora */}
      <div className="aurora-blob aurora-cyan bottom-[-25%] right-[-25%] w-[90vw] md:w-[70vw] h-[90vw] md:h-[70vw]"></div>
      {/* Center Accent */}
      <div className="aurora-blob aurora-purple top-[30%] left-[10%] w-[75vw] md:w-[55vw] h-[75vw] md:h-[55vw]"></div>
      {/* Subtle Noise Texture */}
      <div className={`absolute inset-0 bg-[url('/noise.png')] bg-[length:128px_128px] ${noiseClassName}`}></div>
    </div>
  );
}
