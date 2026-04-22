// import EraFilter from './Erafilter';

export default function LeftSidebar() {
  return (
    <div className="sticky top-20 space-y-6">
      <div className="bg-gradient-to-br from-[#1a2332] to-[#0d1720] rounded-2xl p-6 shadow-[8px_8px_24px_rgba(0,0,0,0.4),-4px_-4px_16px_rgba(255,255,255,0.02)]">
        <h2 className="text-white font-semibold text-lg mb-4">Menu</h2>
        <nav className="space-y-2">
          {['Trang chủ', 'Trendings', 'reviews books', 'Theo dõi', 'Đã lưu'].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-[#0d1720] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.4)] transition-all duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}