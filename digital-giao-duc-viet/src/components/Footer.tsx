import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Digital Education</h3>
            <p className="text-gray-600 mb-4">
              Nền tảng học tập trực tuyến hàng đầu Việt Nam, đem đến trải nghiệm học tập hiệu quả và tiện lợi.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hoc-sinh" className="text-gray-600 hover:text-primary">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/khoa-hoc" className="text-gray-600 hover:text-primary">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu" className="text-gray-600 hover:text-primary">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/lien-he" className="text-gray-600 hover:text-primary">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/ho-so" className="text-gray-600 hover:text-primary">
                  Hồ sơ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Khóa học</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/khoa-hoc" className="text-gray-600 hover:text-primary">
                  Lập trình & CNTT
                </Link>
              </li>
              <li>
                <Link to="/khoa-hoc" className="text-gray-600 hover:text-primary">
                  Tiếng Anh & Chứng chỉ
                </Link>
              </li>
              <li>
                <Link to="/khoa-hoc" className="text-gray-600 hover:text-primary">
                  Toán học nâng cao
                </Link>
              </li>
              <li>
                <Link to="/khoa-hoc" className="text-gray-600 hover:text-primary">
                  Luyện thi đại học
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/lien-he" className="text-gray-600 hover:text-primary">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link to="/dieu-khoan-su-dung" className="text-gray-600 hover:text-primary">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/chinh-sach-bao-mat" className="text-gray-600 hover:text-primary">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                Email: support@digitaleducation.vn
              </li>
              <li className="text-gray-600">
                Hotline: 1900 1234
              </li>
              <li className="text-gray-600">
                Địa chỉ: 211 Nguyễn Văn Cừ, Phường An Bình, Quận Ninh Kiều, TP. Cần Thơ
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>&copy; 2024 Digital Education. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
