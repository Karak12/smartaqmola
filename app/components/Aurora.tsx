// Мягкий градиентный фон (aurora): статичные цветовые пятна под контентом.
// Специально без анимации — три больших размытых слоя, которые двигались бы
// каждый кадр, роняли FPS даже в простое. Статичные — красиво и бесплатно.

type AuroraProps = {
  className?: string;
};

export default function Aurora({ className = "" }: AuroraProps) {
  const blobs = [
    { color: "rgba(37,99,235,0.18)", size: 340, x: "-10%", y: "-20%" },
    { color: "rgba(56,162,201,0.16)", size: 300, x: "70%", y: "10%" },
    { color: "rgba(139,92,246,0.14)", size: 260, x: "30%", y: "60%" },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: b.color,
          }}
        />
      ))}
    </div>
  );
}
