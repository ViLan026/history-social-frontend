'use client';

import { useState, useEffect } from 'react';

export default function TodayInHistory() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('vi-VN', { 
      day: 'numeric', 
      month: 'long' 
    }));
  }, []);

  const historicalEvents = [
    {
      year: 1975,
      title: 'Giải phóng miền Nam',
      description: 'Chiến dịch Hồ Chí Minh kết thúc với thắng lợi hoàn toàn',
    },
    {
      year: 1945,
      title: 'Cách mạng tháng Tám',
      description: 'Nhân dân Việt Nam giành chính quyền',
    },
    {
      year: 1954,
      title: 'Chiến thắng Điện Biên Phủ',
      description: 'Thắng lợi lịch sử chấn động địa cầu',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a2332] to-[#0d1720] rounded-2xl p-6 shadow-[8px_8px_24px_rgba(0,0,0,0.4),-4px_-4px_16px_rgba(255,255,255,0.02)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">Ngày này năm xưa</h2>
        <span className="text-gray-400 text-sm">{currentDate}</span>
      </div>

      <div className="space-y-4">
        {historicalEvents.map((event, index) => (
          <div
            key={index}
            className="bg-[#0d1720] rounded-xl p-4 shadow-[inset_3px_3px_8px_rgba(0,0,0,0.4),inset_-2px_-2px_6px_rgba(255,255,255,0.02)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4f6f91] to-[#2c4a6b] shadow-[3px_3px_8px_rgba(0,0,0,0.4)] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{event.year}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm mb-1">{event.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 rounded-xl bg-gradient-to-br from-[#4f6f91] to-[#2c4a6b] text-white text-sm font-medium shadow-[4px_4px_12px_rgba(0,0,0,0.3),-2px_-2px_6px_rgba(255,255,255,0.05)] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.3)] transition-all duration-200">
        Xem thêm
      </button>
    </div>
  );
}