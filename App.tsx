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

  // 2. Casting Posts (Exactly 10 unique items)
  const castingTitles = [
    "[가캐] 서열0위 길들이기 - 설휘영(강지한) & 윤하늘(천은비) 싱크 100% 도전",
    "서열0위 길들이기 영화화된다면? 휘영이는 무조건 이분...",
    "[투표] 서열0위 설휘영 역할, 반휘혈vs류신우 누가 더 어울림?",
    "늑대의 유혹 - 반해원 역할에 신비오님 어때요? (이미지 有)",
    "그놈은 멋있었다 - 지은성 역할 가상캐스팅 (태클 ㄴㄴ)",
    "도레미파솔라시도 - 은규 역할에 얼짱 설우석님 추천합니다",
    "나쁜남자가 끌리는 이유 - 강지한 실사판 ㄷㄷ (사진첨부)",
    "[요청] 내 남자친구는 일진 가캐 부탁드려요!! (급함)",
    "악마의 키스 - 여주 역할 추천좀 해주세요 ㅠㅠ (청순가련st)",
    "사악소녀교사일기 - 건방진 남주 역할 모음 (스압주의)"
  ];

  castingTitles.forEach((title, i) => {
    posts.push({
      id: `casting-${i}`,
      category: 'casting',
      title: title,
      content: '', // No content for list view
      date: `2010.10.${14 - i}`,
      comments: Array.from({ length: Math.floor(Math.random() * 8) }).map((_, idx) => ({
        id: `c-cast-${i}-${idx}`,
        author: '익명',
        content: '퍼가요~',
        date: '2010.10.14'
      })),
      likes: Math.floor(Math.random() * 100) + 20
    });
  });

  // 3. Ulzzang Posts (Exactly 10 unique items)
  const ulzzangTitles = [
    "레전드 얼짱 반휘혈님 최근 미니홈피 사진 털이 (존잘주의)",
    "[충격] 천은비님 실물 후기... 진짜 인형인줄 알았음",
    "강지한님 쇼핑몰 모델 시절 희귀사진 (저장필수!!)",
    "류신우 vs 설우석 - 님들의 선택은? (투표ㄱㄱ)",
    "요즘 뜨는 신인 얼짱 한소율님 아시나요? 대박 예쁨",
    "[정보] 백장미님이 쓰는 틴트 정보 공유함 (에뛰드 아님)",
    "얼짱시대 시즌4 출연자 명단 유출??? (헐 대박)",
    "민도윤님 오늘자 홍대 목격담 ㄷㄷ 키 진짜 큼",
    "얼짱 커플 유다인♥신비오 100일 기념 사진 (부러움 주의)",
    "과거 논란 없는 클린한 얼짱 추천좀요..."
  ];

  ulzzangTitles.forEach((title, i) => {
    posts.push({
      id: `ulzzang-${i}`,
      category: 'ulzzang',
      title: title,
      content: '',
      date: `2010.10.${14 - i}`,
      comments: Array.from({ length: Math.floor(Math.random() * 20) }).map((_, idx) => ({
        id: `c-ul-${i}-${idx}`,
        author: '얼짱팬',
        content: '와 미쳤다...',
        date: '2010.10.13'
      })),
      likes: Math.floor(Math.random() * 300) + 50
    });
  });

  // 4. Diary Posts (Exactly 10 unique items)
  const diaryTitles = [
    "오늘 날씨 진짜 우울하다... (비오는날 싫어)",
    "학원 땡땡이 치고 노래방 갔음 ㅋㅋ (엄마한텐 비밀)",
    "체육대회 반티 정함!! 붉은악마 컨셉 어때?",
    "중간고사 망함... 평균 10점 떨어짐 ㅠㅠ 죽고싶다",
    "싸이 투데이수 대박 ㅋㅋ 1000명 돌파 자축",
    "일촌신청 좀 받아줘... 파도타기 하다가 외로움",
    "남친이랑 헤어짐... 다시는 사랑 안해 (비공개)",
    "오늘 급식 최악 ㅡㅡ 코다리 강정 실화냐",
    "새로 산 틴트 색깔 존예 (디올 어딕트 저렴이)",
    "짝남이 나한테 말걸었다!!! 심장 터지는줄 >_<"
  ];

  diaryTitles.forEach((title, i) => {
    posts.push({
      id: `diary-${i}`,
      category: 'diary',
      title: title,
      content: '',
      date: `2010.10.${14 - i}`,
      comments: [],
      likes: Math.floor(Math.random() * 15)
    });
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

      {/* Main Blog Container */}
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

        {/* Layout Grid: Sidebar on left, Content on right in Desktop */}
        <div className="flex flex-col md:flex-row px-2 md:px-4 gap-4">
            {/* Sidebar (Left on Desktop, Top on Mobile) */}
            <aside className="w-full md:w-[180px] shrink-0 order-2 md:order-1">
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

            {/* Main Content Area (Right on Desktop, Bottom on Mobile) */}
            <main className="flex-1 bg-white min-h-[400px] md:min-h-[600px] border border-[#ccc] p-3 md:p-4 relative order-1 md:order-2">
                
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