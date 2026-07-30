export default function CircuitBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 circuit-bg [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)] ${className}`}
    />
  );
}
