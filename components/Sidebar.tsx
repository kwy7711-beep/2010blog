import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  visitCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategory, onSelectCategory, visitCount }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Profile Widget */}
      <div className="bg-white border border-[#ccc] p-3 text-center rounded-sm">
        {/* Responsive profile image size for mobile vs desktop if needed, currently fixed is fine or can be flex */}
        <div className="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-0">
            <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] shrink-0 mx-auto bg-gray-100 border border-[#eee] mb-0 md:mb-2 overflow-hidden relative group">
                <img 
                    src="https://cywd2.jjerrii.uk/S/IMG_2714.JPG" 
                    alt="Profile" 
                    className="w-full h-full object-cover contrast-125"
                />
                <div className="absolute bottom-0 right-0 bg-[#2DB400] text-white text-[9px] px-1">Today Is..</div>
            </div>
            
            <div className="text-left md:text-center">
                <div className="font-bold text-[#2DB400] mb-1">★쩨리★</div>
                <div className="text-[11px] text-[#888] mb-2 font-serif italic leading-tight">
                인소 광팬♥<br/>
                얼짱시대 광팬♥<br/>
                (인소광 / 얼짱시대/ 프사는 얼짱 주혜선님)
                </div>
                <div className="flex md:justify-center gap-1 text-[11px] text-[#666]">
                    <button className="border border-[#ddd] px-1 bg-[#f9f9f9] hover:bg-white">관리</button>
                    <button className="border border-[#ddd] px-1 bg-[#f9f9f9] hover:bg-white">통계</button>
                </div>
            </div>
        </div>
      </div>

      {/* Counter Widget */}
      <div className="text-[11px] text-[#666] text-center hidden md:block">
        <span className="text-[#2DB400] font-bold">Total</span> {visitCount.toLocaleString()}
        <span className="mx-1">|</span>
        <span className="text-orange-500 font-bold">Today</span> 8,241
      </div>

      {/* Category Widget */}
      <div className="bg-white border-t-2 border-t-[#555] p-3">
        <h3 className="font-bold text-[12px] mb-2 text-black pb-1 border-b border-dotted border-[#ccc]">카테고리</h3>
        <ul className="text-[11px] space-y-1">
          <li 
            className={`cursor-pointer hover:text-[#2DB400] ${activeCategory === 'all' ? 'font-bold text-[#2DB400]' : 'text-[#666]'}`}
            onClick={() => onSelectCategory('all')}
          >
            ● 전체보기
          </li>
          <li className="h-[1px] border-b border-dotted border-[#ddd] my-1"></li>
          {categories.map(cat => (
            <li 
              key={cat.id} 
              className={`cursor-pointer hover:underline hover:text-[#2DB400] pl-1 ${activeCategory === cat.id ? 'font-bold text-[#2DB400]' : 'text-[#666]'}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              └ {cat.name} <span className="text-[10px] text-[#999]">({cat.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Music Player Widget (Visual Only) - Hide on mobile to save space */}
      <div className="bg-white border border-[#ccc] p-2 hidden md:block">
         <div className="text-[11px] font-bold text-[#333] mb-1">뮤직 플레이어</div>
         <div className="bg-gray-100 h-[20px] flex items-center px-1 text-[10px] text-[#555] border border-[#ddd] overflow-hidden whitespace-nowrap">
            ♪ MC몽 - I Love U Oh Thank U
         </div>
         <div className="flex justify-center gap-2 mt-1">
             <span className="cursor-pointer text-[10px]">◀</span>
             <span className="cursor-pointer text-[10px]">||</span>
             <span className="cursor-pointer text-[10px]">▶</span>
         </div>
      </div>
      
      {/* Calendar Widget (Simplified) - Hide on mobile */}
      <div className="bg-white border border-[#ccc] p-2 text-center hidden md:block">
        <div className="text-[11px] font-bold text-[#2DB400] mb-2">2010년 10월</div>
        <div className="grid grid-cols-7 text-[10px] gap-1 text-[#666]">
            <span className="text-red-500">일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span className="text-blue-500">토</span>
            {Array.from({length: 31}).map((_, i) => (
                <span key={i} className={`hover:bg-[#eee] cursor-pointer rounded-sm ${i === 14 ? 'bg-[#2DB400] text-white font-bold' : ''}`}>
                    {i+1}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};