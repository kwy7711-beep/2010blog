import React, { useState, useEffect } from 'react';
import { NaverGlobalHeader } from './components/NaverGlobalHeader';
import { Sidebar } from './components/Sidebar';
import { PostList } from './components/PostList';
import { Guestbook } from './components/Guestbook';
import { WritePost } from './components/WritePost';
import { Post, Category, ViewMode } from './types';

const generateDummyPosts = (): Post[] => {
  const posts: Post[] = [];
  
  posts.push({
    id: 'post-rank0',
    category: 'inso',
    title: '[인소추천] 서열0위 길들이기 시즌2 /미완결/명대사/가캐/다운ㅇ',
    content: `안냐세요... 쩨리입니다... >_<
    
    오늘 가져온 건 저번에 대박 쳤던 그 소설!!
    ★ 서열0위 길들이기 시즌2 - 3년 후, 뒤틀린 재회 ★
    
    님들 시즌1 기억나시죠? 와 진짜...
    휘영이 "기억상실증" 걸렸을 때 신채아가 여친 행세했던 거 생각하면
    지금도 피가 거꾸로 솟음 ㅡㅡ^
    
    그때 휘영이가 하늘이 못 알아보고 채아한테 속아서
    하늘이 상처 준 거 진짜 찌통이었는데... ㅠㅠ
    
    ======================================
    [가상캐스팅 / 가캐]
    [pink]윤하늘 女[/pink]
    지켜주고 싶은 유리조각 같은 그녀
    얼짱 백루아님

    [blue]설휘영 男[/blue]
    집안의 반대에도 하늘이만 바라보는 그
    얼짱 진서후님
    ======================================
    
    첨부파일에 [야화-서열0위 길들이기2] 넣어놨어요!
    퍼가실 땐 덧글 필수! 불펌하면 신고함!! 凸`,
    date: '2010.10.14',
    comments: [
      { id: 'c1', author: '휘영앓이', content: '와 대박 휘영이 가캐 싱크로율 100% ㅠㅠㅠㅠㅠ', date: '2010.10.14' },
      { id: 'c2', author: '권선징악', content: '하늘이 너무 청순하다... 채아랑 비교됨 ㅡㅡ', date: '2010.10.14' }
    ],
    likes: 1024,
    attachmentName: '[텍본]야화_서열0위 길들이기2_미완결.txt'
  });

  const categories = ['casting', 'ulzzang', 'diary'] as const;
  categories.forEach(cat => {
    for(let i=0; i<5; i++) {
        posts.push({
            id: `${cat}-${i}`,
            category: cat,
            title: `[${cat === 'casting' ? '가캐' : cat === 'ulzzang' ? '얼짱' : '일기'}] 2010년 그 시절 감성 게시물 ${i+1}`,
            content: '내용 없음...',
            date: `2010.10.${14-i}`,
            comments: [],
            likes: Math.floor(Math.random() * 50)
        });
    }
  });

  return posts;
};

const INITIAL_CATEGORIES: Category[] = [
  { id: 'inso', name: '★추천인소★', count: 124 },
  { id: 'casting', name: '가상캐스팅', count: 42 },
  { id: 'ulzzang', name: '얼짱시대', count: 89 },
  { id: 'diary', name: '비밀일기', count: 15 },
];

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.BLOG);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(generateDummyPosts());
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setViewMode(ViewMode.BLOG);
  };

  const filteredPosts = activeCategory === 'all' 
    ? posts.filter(p => p.category === 'inso')
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#e4e4e4] pb-10">
      <NaverGlobalHeader />

      {/* Main Blog Container - PC width 980px standard */}
      <div className="w-full max-w-[980px] mx-auto md:mt-4 bg-white shadow-sm border border-[#ccc] pb-6">
        
        {/* Blog Top Header (Banner) */}
        <div className="h-[180px] bg-slate-200 relative mb-4 overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-pink-900/10 mix-blend-overlay"></div>
            <div className="absolute top-8 left-8 text-white z-10 text-left">
                <h1 className="text-[26px] font-bold font-serif mb-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  ★ 쩨리의 인소 천국 ★
                </h1>
                <p className="text-[12px] opacity-90">인소 없는 세상은... 상상할 수 없어...</p>
            </div>
            
            {/* Top Menu inside Banner (Photolog Removed) */}
            <div className="absolute bottom-0 right-0 bg-white/90 px-6 py-2 flex gap-4 text-[12px] font-bold text-[#444] rounded-tl-lg shadow-sm">
                <span 
                    className={`cursor-pointer hover:text-[#2DB400] ${viewMode === ViewMode.BLOG ? 'text-[#2DB400]' : ''}`}
                    onClick={() => setViewMode(ViewMode.BLOG)}
                >
                    블로그
                </span>
                <span className="text-[#ccc]">|</span>
                <span 
                    className="text-[#999] cursor-not-allowed"
                >
                    프롤로그
                </span>
                <span className="text-[#ccc]">|</span>
                <span 
                    className={`cursor-pointer hover:text-[#2DB400] ${viewMode === ViewMode.GUESTBOOK ? 'text-[#2DB400]' : ''}`}
                    onClick={() => setViewMode(ViewMode.GUESTBOOK)}
                >
                    방명록
                </span>
            </div>
        </div>

        {/* Layout Grid: Classic 2010 PC Sidebar Left, Content Right */}
        <div className="flex px-4 gap-6">
            
            {/* Sidebar (Left side) */}
            <aside className="w-[180px] shrink-0">
                <Sidebar 
                    categories={INITIAL_CATEGORIES}
                    activeCategory={activeCategory}
                    onSelectCategory={(id) => {
                        setActiveCategory(id);
                        setViewMode(ViewMode.BLOG);
                    }}
                    visitCount={8124560}
                />
            </aside>

            {/* Main Content Area (Right side) */}
            <main className="flex-1 bg-white min-h-[700px] border border-[#eee] p-6 relative shadow-inner">
                
                {/* Search Bar & Write Button */}
                <div className="flex justify-between items-center mb-6 border-b border-[#2DB400] pb-2">
                    <div className="text-[11px] text-[#666]">
                        <span className="text-[#2DB400] font-bold">오늘의 주제:</span> 짝사랑...
                    </div>
                    <div className="flex gap-2">
                         <div className="flex border border-[#ccc] bg-white h-[22px]">
                            <input type="text" className="w-[150px] text-[11px] px-2 focus:outline-none" />
                            <button className="bg-[#f0f0f0] px-2 text-[10px] border-l border-[#ccc]">검색</button>
                         </div>
                         <button 
                            onClick={() => setViewMode(ViewMode.WRITE)}
                            className="bg-[#2DB400] text-white px-4 h-[22px] text-[11px] font-bold"
                         >
                            글쓰기
                         </button>
                    </div>
                </div>

                {/* Content Rendering */}
                {viewMode === ViewMode.BLOG && (
                    <PostList posts={filteredPosts} loading={false} activeCategory={activeCategory} />
                )}
                {viewMode === ViewMode.GUESTBOOK && (
                    <Guestbook />
                )}
                {viewMode === ViewMode.WRITE && (
                    <WritePost onPostCreated={handlePostCreated} onCancel={() => setViewMode(ViewMode.BLOG)} />
                )}
            </main>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full max-w-[980px] mx-auto mt-6 text-center text-[11px] text-[#888] pb-10">
         <div className="mb-2">
            <span>개인정보취급방침</span> | <span>이용약관</span> | <span>블로그팀 블로그</span>
         </div>
         <p>Copyright © <span className="font-bold">NAVER Corp.</span> All Rights Reserved.</p>
      </footer>
    </div>
  );
}