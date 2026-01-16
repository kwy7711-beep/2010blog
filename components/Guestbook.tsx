import React, { useState } from 'react';

interface GuestbookEntry {
  id: string;
  author: string;
  content: string;
  date: string;
  reply?: string;
}

const RANDOM_REPLIES = [
  "제 스토리를 플레이해주셔서 진심으로 감사해요 ㅠㅠ 감동...",
  "부족한 쩨리의 스토리... 좋아해주셔서 감사합니다 사랑해요♥",
  "와주셔서 정말 고마워요!! 님 덕분에 제가 있어요 >_<",
  "제 세상에 놀러와주셔서 감사합니다! 알라뷰 쏘 머치~",
  "끝까지 함께해주셔서 영광이에요... 잊지 않을게요!!",
  "방문자님은 저의 천사...♡ 사랑합니다 진짜루!!",
  "제 블로그를 방문해주셔서 감사해요 흑흑.. 감동의 쓰나미가 ㅠㅠ",
  "이렇게 찾아와주시고... 전 정말 행복한 사람이에요 ☞☜",
  "제 스토리의 주인공은 바로 님이에요!! 감사합니당~",
  "사랑하는 방문자님!! 저랑 평생 가요 약속~ 도장 꾹!",
  "플레이해주셔서 감사합니다! 님은 진짜 감동 그 자체...",
  "제 마음... 느껴지시나요? 사랑해요 방문자님!! (하트)",
  "쩨리의 인소 세상... 함께 즐겨주셔서 넘넘 고마워요!!",
  "진짜 사랑합니다!!(하트)",
  "제 글 읽어주셔서 감사해요... 님은 제 보물 1호!!",
  "소중한 시간 내주셔서 감사합니다! 행복만 가득하세여~",
  "제 스토리 플레이해주신 님... 복 받으실 거예요 얍!!",
  "완전 소중한 방문자님!! 격하게 아끼고 사랑합니다♥",
  "저... 님 때문에 울고 있어요... 너무 고마워서요 ㅠㅠ",
  "제 이야기에 귀 기울여 주셔서 감사합니다 (꾸벅) (--)(__)",
  "당신이 있어서 쩨리가 존재해요! 알라뷰~♥",
  "제 맘대로 쓴 글인데... 좋아해주셔서 진짜 감사해요!!",
  "방문자님 사랑해요!! 이 말로도 부족해요 엉엉 ㅠㅠ",
  "제 스토리를 빛내주셔서 감사합니다! 님 좀 짱인듯 b",
  "언제나 응원할게요! 제 이야기 봐주셔서 감사합니당 >_<",
  "님은 사랑 그 자체...♥ 와주셔서 진짜 감사해요!!",
  "제 작은 세상에 와주셔서 큰 기쁨 주셨어요... 사랑해여!!",
  "플레이해주셔서 감사합니다... 이 마음 평생 간직할게요!!",
  "마지막까지 함께해주신 님... 진짜 완전 사랑합니다!!",
  "제 스토리의 해피엔딩은 바로 방문자님이에요! 고마워요♥"
];

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([
    { id: '1', author: '이혜지', content: '야 너 왜 학교 안왔어?O_O 쌤이 너 찾더라 ㅋㅋㅋ', date: '2010.10.14 14:22', reply: '아 진짜? ㅠㅠ 나 배아파서... 내일 갈게' },
  ]);
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newContent.trim()) return;
    
    setLoading(true);
    const newId = Date.now().toString();
    const entry: GuestbookEntry = {
      id: newId,
      author: '지나가던행인', // Anonymous for now
      content: newContent,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
    };

    // Optimistic update
    setEntries(prev => [entry, ...prev]);
    setNewContent('');

    // Simulate "Real-time" fake reply delay (0.8s)
    setTimeout(() => {
        const randomReply = RANDOM_REPLIES[Math.floor(Math.random() * RANDOM_REPLIES.length)];
        
        setEntries(prev => prev.map(e => e.id === newId ? { ...e, reply: randomReply } : e));
        setLoading(false);
    }, 800);
  };

  return (
    <div className="p-4 bg-white min-h-[400px]">
      <div className="border-b-2 border-[#eee] pb-2 mb-4">
        <h2 className="text-[13px] font-bold text-[#2DB400]">방명록</h2>
      </div>

      {/* Write Area */}
      <div className="bg-[#f0f0f0] p-3 border border-[#ddd] mb-6 flex gap-2">
        <div className="w-[60px] h-[60px] bg-white border border-[#ccc] flex items-center justify-center text-[#ddd] overflow-hidden">
             <img src="https://cywd2.jjerrii.uk/S/IMG_2714.JPG" className="w-full h-full object-cover opacity-50 grayscale" alt="default" />
        </div>
        <div className="flex-1">
            <textarea 
                className="w-full h-[60px] border border-[#ccc] p-2 text-[11px] focus:outline-none focus:border-[#2DB400] resize-none"
                placeholder="쩨리에게 하고 싶은 말을 남겨주세요... (비밀글 가능)"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
            />
            <div className="flex justify-end mt-1">
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[#2DB400] text-white px-4 py-1 text-[11px] font-bold border border-[#238c00] hover:bg-[#238c00] disabled:opacity-50"
                >
                    {loading ? '등록중...' : '등록'}
                </button>
            </div>
        </div>
      </div>

      {/* List Area */}
      <div className="space-y-4">
        {entries.map(entry => (
            <div key={entry.id} className="group">
                <div className="flex items-center gap-2 mb-1 bg-[#f9f9f9] p-1 border-t border-b border-[#eee]">
                    <span className="font-bold text-[11px] text-[#333]">{entry.author}</span>
                    <span className="text-[10px] text-[#999]">({entry.date})</span>
                </div>
                <div className="pl-4 pr-2 py-2 text-[12px] text-[#444] min-h-[40px] flex items-center">
                    {entry.content}
                </div>
                
                {/* Reply Section */}
                {entry.reply ? (
                    <div className="ml-4 mt-2 bg-[#f0f9ff] p-2 border border-[#dceef9] flex gap-2 items-start">
                        <span className="text-[#2DB400] font-bold text-[11px] whitespace-nowrap">쩨리:</span>
                        <span className="text-[11px] text-[#555]">{entry.reply}</span>
                    </div>
                ) : loading && entry.id === entries[0].id ? (
                    <div className="ml-4 mt-2 text-[10px] text-[#999] italic">쩨리님이 답글 입력 중...</div>
                ) : null}
            </div>
        ))}
      </div>
    </div>
  );
};