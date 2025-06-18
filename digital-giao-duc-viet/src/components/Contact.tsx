import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Globe, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="relative flex justify-center items-start min-h-[calc(100vh-80px)] py-8" style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 50%, #f9d976 100%)' }}>
      {/* Nền trang trí */}
      <div className="absolute inset-0 -z-20">
        <img src="/profile-bg.svg" alt="bg" className="w-full h-full object-cover opacity-70" />
        {/* Blob lớn */}
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-white opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[260px] h-[260px] bg-pink-200 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[180px] h-[180px] bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-[200px] h-[200px] bg-pink-100 opacity-10 rounded-full blur-2xl"></div>
        {/* Chấm tròn lớn nổi bật */}
        <div className="absolute top-[120px] left-[calc(50%-180px)] w-32 h-32 bg-pink-300 opacity-50 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-[120px] right-[calc(50%-180px)] w-24 h-24 bg-pink-400 opacity-40 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-[60%] left-[20%] w-20 h-20 bg-pink-200 opacity-50 rounded-full blur-md animate-pulse"></div>
        <div className="absolute top-[30%] right-[15%] w-16 h-16 bg-pink-400 opacity-30 rounded-full blur animate-pulse"></div>
      </div>
      <div className="w-full max-w-2xl mx-auto px-2 relative z-10">
        <div className="rounded-3xl shadow-2xl bg-white/80 border border-white/40 backdrop-blur-xl relative overflow-hidden pt-10 pb-10 px-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-pink-500 flex items-center justify-center gap-2">
            <Mail className="w-8 h-8 text-pink-400" /> Liên Hệ
          </h1>
          <p className="text-lg text-gray-700 text-center mb-6">Bạn cần hỗ trợ? Hãy liên hệ với chúng tôi qua các kênh sau hoặc gửi ý kiến góp ý trực tiếp!</p>
          {/* Thông tin liên hệ */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-pink-400" /> <span>Email:</span> <a href="mailto:support@digitaleducation.vn" className="text-pink-500 hover:underline">support@digitaleducation.vn</a></div>
              <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-pink-400" /> <span>Hotline:</span> <span className="text-pink-500">1900 1234</span></div>
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-pink-400" /> <span>Địa chỉ:</span> <span>211 Nguyễn Văn Cừ, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ</span></div>
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-pink-400" />
                <a href="https://facebook.com/onlinehoc" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Facebook</a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-pink-400" />
                <a href="https://tiktok.com/@onlinehoc" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">TikTok</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-pink-400" />
                <a href="https://zalo.me/0901234567" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Zalo</a>
              </div>
            </div>
            {/* Form liên hệ */}
            <form className="bg-white/80 rounded-2xl shadow p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Họ và tên</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 rounded border border-gray-200 focus:ring-2 focus:ring-pink-200" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 rounded border border-gray-200 focus:ring-2 focus:ring-pink-200" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Nội dung</label>
                <textarea name="message" value={form.message} onChange={handleChange} className="w-full p-2 rounded border border-gray-200 focus:ring-2 focus:ring-pink-200" rows={3} required />
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-400 text-white font-semibold rounded-full px-6 py-2 shadow transition">
                <Send className="w-4 h-4" /> Gửi liên hệ
              </button>
              {sent && <div className="text-green-600 text-center mt-2">Cảm ơn bạn đã gửi liên hệ!</div>}
            </form>
          </div>
          {/* Hiệu ứng gợn sóng phía dưới card */}
          <img src="/wave.svg" alt="wave" className="absolute left-0 bottom-0 w-full pointer-events-none select-none" style={{zIndex:0}} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
