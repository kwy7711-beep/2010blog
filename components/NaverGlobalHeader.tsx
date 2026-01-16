import React from 'react';

export const NaverGlobalHeader: React.FC = () => {
  return (
    <div className="w-full bg-[#2DB400] h-[30px] border-b border-[#1E9E00] flex justify-center">
      {/* Container aligned with main blog width */}
      <div className="w-full max-w-[980px] flex items-center justify-between px-2 md:px-0 text-white text-[11px] font-bold">
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-black tracking-tighter cursor-pointer">NAVER</span>
          <span className="w-[1px] h-[10px] bg-green-300 opacity-50 hidden md:block"></span>
          <span className="cursor-pointer hover:underline hidden md:inline">블로그</span>
          <span className="w-[1px] h-[10px] bg-green-300 opacity-50 hidden md:block"></span>
          <span className="cursor-pointer hover:underline hidden md:inline">카페</span>
          <span className="w-[1px] h-[10px] bg-green-300 opacity-50 hidden md:block"></span>
          <span className="cursor-pointer hover:underline hidden md:inline">지식iN</span>
        </div>
        <div className="flex items-center gap-2 font-normal text-white/90">
          <span className="cursor-pointer hover:underline">로그인</span>
          <span>|</span>
          <span className="cursor-pointer hover:underline">도움말</span>
        </div>
      </div>
    </div>
  );
};