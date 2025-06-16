import React from 'react';
import { Info, Target, GraduationCap, Rocket, Users, Award, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="relative flex justify-center items-start min-h-[calc(100vh-80px)] py-8 bg-gradient-to-br from-[#fddde6] via-[#fbeff4] to-[#f8c6d8] overflow-hidden">
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
        <div className="rounded-3xl shadow-2xl bg-white/80 border border-white/40 backdrop-blur-xl relative overflow-hidden pt-10 pb-10 px-8 mb-8">
          {/* Tiêu đề */}
          <div className="flex items-center justify-center mb-4">
            <Info className="w-8 h-8 text-pink-400 mr-2" />
            <h1 className="text-3xl font-bold text-center text-pink-500">{t('about_us_digital_education')}</h1>
          </div>
          <p className="text-xl text-gray-700 text-center mb-6">
            {t('world_changing_by_tech_education_right')}
          </p>
          {/* Vision Section */}
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-6 text-center">
              {t('vision_statement_part1')} <em className="text-pink-500 font-medium">{t('vision_statement_quote')}</em>.<br/>
              {t('vision_statement_part2')}
            </p>
          </div>
          {/* Mission Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-pink-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">{t('our_mission')}</h2>
            </div>
            <div className="bg-white/80 rounded-2xl shadow p-6 mb-4">
              <p className="text-lg text-gray-600 text-center">
                {t('mission_statement_part1')} <strong className="text-pink-500">{t('mission_statement_quote')}</strong>.<br/>
                {t('mission_statement_part2')}
              </p>
            </div>
          </div>
          {/* Features Grid */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">{t('what_makes_us_special')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <FeatureCard 
              icon={<GraduationCap className="w-6 h-6" />} 
              title={t('feature_courses_title')} 
              description={t('feature_courses_desc')} 
            />
            <FeatureCard 
              icon={<Rocket className="w-6 h-6" />} 
              title={t('feature_content_title')} 
              description={t('feature_content_desc')} 
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6" />} 
              title={t('feature_community_title')} 
              description={t('feature_community_desc')} 
            />
          </div>
          {/* Development Journey */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-pink-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">{t('development_journey_title')}</h2>
            </div>
            <p className="text-lg text-gray-600 text-center">
              {t('development_journey_desc_part1')} <strong className="text-pink-500">{t('development_journey_desc_highlight')}</strong> {t('development_journey_desc_part2')}.
            </p>
          </div>
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl p-8 md:p-12 text-center text-white mb-2 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t('join_our_community_title')}</h2>
            <p className="text-lg text-pink-100 max-w-2xl mx-auto mb-4">
              {t('join_our_community_desc')}
            </p>
            <p className="text-xl font-semibold">
              {t('digital_education_slogan')}
            </p>
          </div>
          {/* Hiệu ứng gợn sóng phía dưới card */}
          <img src="/wave.svg" alt="wave" className="absolute left-0 bottom-0 w-full pointer-events-none select-none" style={{zIndex:0}} />
        </div>
      </div>
    </div>
  );
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col items-center">
      <div className="p-3 bg-pink-100 rounded-xl text-pink-500 mb-2">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default About; 