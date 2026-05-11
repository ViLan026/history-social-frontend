// src/features/onthisday/components/OnThisDayHeader.tsx
export default function OnThisDayHeader() {
  const today = new Date();
  
  const dateStr = today.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="neu-inset bg-surface border border-border rounded-3xl p-8 mb-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="uppercase text-xs tracking-widest text-primary font-medium mb-1">
            HÔM NAY LÀ
          </div>
          <div className="text-4xl md:text-5xl font-bold text-foreground">
            {dateStr}
          </div>
        </div>
        
        <div className="text-7xl opacity-10 hidden md:block">
          📜
        </div>
      </div>
    </div>
  );
}