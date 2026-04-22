export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-r from-[#001427] to-[#1a2332] shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Lịch Sử Việt</h3>
            <p className="text-gray-400 text-sm">
              Nền tảng chia sẻ kiến thức lịch sử Việt Nam
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Chính sách</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Theo dõi</h3>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-[#1a2332] shadow-[2px_2px_8px_rgba(0,0,0,0.3),-1px_-1px_4px_rgba(255,255,255,0.02)] flex items-center justify-center hover:shadow-[inset_2px_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200"
                >
                  <span className="text-gray-400 text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © 2024 Lịch Sử Việt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}