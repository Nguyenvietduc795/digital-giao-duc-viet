import React from 'react';

const HeroBackground: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-[32rem] md:h-[40rem] z-10 pointer-events-none select-none">
    {/* Sóng trắng nhiều nhịp lượn sóng, cong mạnh */}
    <svg
      viewBox="0 0 1440 500"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: '100vw' }}
    >
      <path
        fill="#fff"
        fillOpacity="1"
        d="M0,400 
          C120,300 240,500 360,400
          C480,300 600,500 720,400
          C840,300 960,500 1080,400
          C1200,300 1320,500 1440,400
          L1440,500 L0,500 Z"
      />
    </svg>
  </div>
);

export default HeroBackground; 