// Small hand-painted-style flowers, echoing the florals in Grace's paintings.
// Purely decorative: hidden from screen readers.

type Props = {
  color?: string;
  center?: string;
  size?: number;
  petals?: number;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Flower({
  color = "var(--pink)",
  center = "var(--mustard)",
  size = 64,
  petals = 5,
  rotate = 0,
  className,
  style,
}: Props) {
  const list = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      {list.map((deg) => (
        <ellipse key={deg} cx="50" cy="27" rx="15" ry="23" fill={color} transform={`rotate(${deg} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="12" fill={center} />
    </svg>
  );
}

export function Leaf({ color = "var(--leaf)", size = 48, rotate = 0, className, style }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={className}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <path d="M50 96 C20 70 18 30 50 4 C82 30 80 70 50 96 Z" fill={color} />
      <path d="M50 92 L50 14" stroke="rgba(0,0,0,.18)" strokeWidth="3" fill="none" />
    </svg>
  );
}
