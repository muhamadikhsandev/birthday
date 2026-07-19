type PageSection = 1 | 2 | 3;

interface PageIndicatorProps {
  current: PageSection;
}

export default function PageIndicator({ current }: PageIndicatorProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {([1, 2, 3] as PageSection[]).map((p) => (
        <div
          key={p}
          className="rounded-full transition-all duration-300"
          style={{
            width: current === p ? 24 : 8,
            height: 8,
            background: current === p ? "#C96868" : "#D2B48C",
          }}
        />
      ))}
    </div>
  );
}
