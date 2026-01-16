import React, { useState, useEffect } from 'react';
import { NaverGlobalHeader } from './components/NaverGlobalHeader';
import { Sidebar } from './components/Sidebar';
import { PostList } from './components/PostList';
import { Guestbook } from './components/Guestbook';
import { WritePost } from './components/WritePost';
import { Post, Category, ViewMode } from './types';

// Data Generators
const generateDummyPosts = (): Post[] => {
  const posts: Post[] = [];
  
  // 1. Main Inso Post (Detailed View)
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
    결국 기억 돌아오고 신채아네 집안 비리 터져서 망했을 때 솔직히 쫌 통쾌했잖아요?
    
    근데!! 시즌2에서!!
    그 신채아가 3년 만에 다시 돌아왔습니다... (헐)
    그것도 쫄딱 망한 거지가 아니라, 엄청난 부자가 돼서요;;;
    
    와... 진짜 사람 안 변하나 봐요.
    3년 전엔 기억 잃은 휘영이 이용해 먹더니,
    이젠 돈이랑 권력으로 휘영이랑 하늘이 사이 또 갈라놓으려고 함...
    
    휘영이는 당연히 기겁하죠.
    자기가 기억 잃었을 때 기만했던 여자니까 얼마나 끔찍하겠음?
    근데 채아는 눈 하나 깜짝 안 하고 뻔뻔하게 나옴... 와 기 쎄다...
    
    우리 불쌍한 하늘이 ㅠㅠ

    근데 미 완 결 입니다 

    야화 작가님이 돌아오지 않고 계셔요 (흑흑)
    
    ======================================
    
    [가상캐스팅 / 가캐]
    
    [pink]윤하늘 女[/pink]
    지켜주고 싶은 유리조각 같은 그녀
    
    
    ![](https://cywd2.jjerrii.uk/S/IMG_2706.jpg)
    얼짱 백루아님

    "휘영아... 옛날 일은 다 잊자...
    채아가 돌아와서 무섭지만... 난 네가 있으니까 괜찮아."


                      ♥


    [blue]설휘영 男[/blue]
    집안의 반대에도 하늘이만 바라보는 그
    
    ![](https://cywd2.jjerrii.uk/S/IMG_2711.jpg)
    얼짱 진서후님

    "3년 전, 내 기억이 없던 틈을 타 날 가지고 놀았지.
    신채아, 이번엔 내가 널 가지고 놀 차례야."
    
    
    ======================================
    
    [명대사]
    
    "내 머릿속이 하얘졌을 때, 넌 내 세상인 척 연기했어.
    그 대가... 처절하게 치르게 해 줄게."
    - 설휘영 (기억 찾고 흑화함 ㄷㄷ)
    
    "하늘이는 건드리지 마.
    걔는 너처럼 더러운 애가 아니니까."
    - 설휘영 (캬 사이다!!!!)
    
    ======================================
    
    첨부파일에 [야화-서열0위 길들이기2] 넣어놨어요!
    시즌1 안 보신 분들은 요약본 먼저 읽으셔야 이해됨!
    (신채아가 얼마나 나쁜 X인지 알 수 있음...)
    
    퍼가실 땐 덧글 필수! 불펌하면 신고함!! 凸`,
    date: '2010.10.14',
    comments: [
      { id: 'c1', author: '휘영앓이', content: '와 대박 휘영이 가캐 싱크로율 100% ㅠㅠㅠㅠㅠ', date: '2010.10.14' },
      { id: 'c2', author: '권선징악', content: '하늘이 너무 청순하다... 채아랑 비교됨 ㅡㅡ', date: '2010.10.14' },
      { id: 'c3', author: '하늘천사', content: '하늘이 이제 좀 행복하려는데 건드리지 마라 진짜 ㅡㅡ 휘영이가 지켜주겠지?', date: '2010.10.15' }
    ],
    likes: 1024,
    attachmentName: '[텍본]야화_서열0위 길들이기2_미완결.txt',
    attachmentContent: `
[제목: 서열0위 길들이기 - The History]

## PART 1. 시즌1 요약 (The Past)
* **사건의 발단:** 서열 0위 설휘영이 윤하늘을 구하려다 집단 린치를 당해 머리를 다치고 '기억상실증'에 걸림.
* **악녀의 거짓말:** 신채아(당시 재벌가 딸)는 기억을 잃은 휘영에게 "우린 서로 사랑하는 사이였고, 윤하늘이 우리 사이를 방해하던 스토커"라고 거짓말을 함.
* **비극:** 휘영은 채아의 거짓말에 속아, 자신이 목숨 걸고 지키려 했던 하늘을 기억하지 못한 채 차갑게 대하고 상처를 줌. 채아는 그 옆에서 여왕처럼 군림함.
* **기억의 회복:** 하늘이 학교 계단에서 굴러떨어지는 사고를 목격한 순간, 휘영의 트라우마가 자극되며 모든 기억이 돌아옴.
* **결말:** 휘영은 자신을 기만한 채아를 처절하게 응징함. 때마침 채아네 집안의 비리가 터지며 가문이 몰락하고, 채아는 도망치듯 학교를 떠남.
    `,
    cyworldLink: 'https://www.cyworld.com'
  });

  // 2-4. Other Dummy Posts
  const categories = ['casting', 'ulzzang', 'diary'] as const;
  categories.forEach(cat => {
    for(let i=0; i<10; i++) {
        posts.push({
            id: `${cat}-${i}`,
            category: cat,
            title: `[${cat}] 2010년 그 시절 감성 게시물 ${i+1}`,
            content: '',
            date: `2010.10.${14-i}`,
            comments: [],
            likes: Math.floor(Math.random() * 50)
        });
    }
  });

  return posts;
};

// Initial Mock Data
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

  // Load initial posts on mount
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
    <div className="min-h-screen pb-10">
      <NaverGlobalHeader />

      {/* Main Blog Container - PC width 980px is standard for Naver at that time */}
      <div className="w-full max-w-[980px] mx-auto md:mt-4 bg-white shadow-sm border border-[#ccc] pb-4 overflow-hidden">
        
        {/* Blog Top Header (Banner) */}
        <div className="h-[120px] md:h-[180px] bg-slate-200 relative mb-4 overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-pink-900/10 mix-blend-overlay"></div>
            <div className="absolute top-4 left-4 md:top-6 md:left-8 text-white shadow-md z-10 text-left">
                <h1 className="text-[20px] md:text-[26px] font-bold font-serif mb-1 drop-shadow-lg text-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  ★ 쩨리의 인소 천국 ★
                </h1>
                <p className="text-[10px] md:text-[12px] opacity-90 drop-shadow-sm">인소 없는 세상은... 상상할 수 없어...</p>
            </div>
            
            {/* Top Menu inside Banner */}
            <div className="absolute bottom-0 right-0 bg-white/90 px-4 py-1 flex gap-4 text-[11px] font-bold text-[#444] rounded-tl-lg shadow-sm whitespace-nowrap overflow-x-auto max-w-full">
                <span 
                    className={`cursor-pointer hover:text-[#2DB400] ${viewMode === ViewMode.BLOG ? 'text-[#2DB400]' : ''}`}
                    onClick={() => setViewMode(ViewMode.BLOG)}
                >
                    블로그
                </span>
                <span className="text-[#ccc]">|</span>
                <span 
                    className="text-[#999] cursor-not-allowed"
                    title="준비중입니다"
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

        {/* Layout Grid: Classic Side-by-Side */}
        <div className="flex flex-col md:flex-row px-2 md:px-4 gap-4">
            
            {/* Sidebar (Always Left on PC) */}
            <aside className="w-full md:w-[180px] shrink-0 order-1">
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

            {/* Main Content Area (Always Right on PC) */}
            <main className="flex-1 bg-white min-h-[400px] md:min-h-[600px] border border-[#ccc] p-3 md:p-4 relative order-2">
                
                {/* Search Bar & Write Button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-[#2DB400] pb-2 gap-2">
                    <div className="text-[11px] text-[#666]">
                        <span className="text-[#2DB400] font-bold">오늘의 주제:</span> 짝사랑...
                    </div>
                    <div className="flex gap-2 w-full md:w-auto justify-end">
                         <div className="flex border border-[#ccc] bg-white">
                            <input type="text" className="h-[20px] w-[120px] md:w-[150px] text-[11px] px-1 focus:outline-none" />
                            <button className="bg-[#f0f0f0] px-2 text-[10px] border-l border-[#ccc]">검색</button>
                         </div>
                         <button 
                            onClick={() => setViewMode(ViewMode.WRITE)}
                            className="bg-[#2DB400] text-white px-3 h-[22px] text-[11px] font-bold flex items-center shrink-0"
                         >
                            글쓰기
                         </button>
                    </div>
                </div>

                {/* Content Switching */}
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
      <footer className="w-full max-w-[980px] mx-auto mt-4 text-center text-[10px] text-[#888] pb-8 px-4">
         <div className="mb-2">
            <span>개인정보취급방침</span> | <span>이용약관</span> | <span>청소년보호정책</span>
         </div>
         <p>Copyright © <span className="font-bold">NAVER Corp.</span> All Rights Reserved.</p>
      </footer>
    </div>
  );
}