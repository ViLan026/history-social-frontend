// src/features/onthisday/components/OnThisDayHeader.tsx
export default function OnThisDayHeader() {
  const today = new Date();
  
  const dateStr = today.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="neu-inset bg-surface border border-border rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="uppercase text-[10px] tracking-widest text-primary font-semibold mb-0.5">
            HÔM NAY LÀ
          </div>
          <div className="text-lg md:text-2xl font-bold text-foreground leading-snug">
            {dateStr}
          </div>
        </div>
        
        <div className="text-3xl opacity-10 hidden md:block select-none">
          📜
        </div>
      </div>
    </div>
  );
}
