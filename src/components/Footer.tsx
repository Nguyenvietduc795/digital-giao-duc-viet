
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
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p>Số 123, Đường Lê Lợi, Quận 1</p>
              <p>Thành phố Hồ Chí Minh, Việt Nam</p>
              <p>Email: contact@digitaledu.vn</p>
              <p>Số điện thoại: 028 1234 5678</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Digital Education. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
