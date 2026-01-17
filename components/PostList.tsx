
import React, { useState } from 'react';
import { Post } from '../types.ts';

interface PostListProps {
  posts: Post[];
  loading: boolean;
  activeCategory: string;
  onOpenSecret: () => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, loading, activeCategory, onOpenSecret }) => {
  const [activeNotepad, setActiveNotepad] = useState<string | null>(null);

  const isListViewMode = ['casting', 'ulzzang', 'diary'].includes(activeCategory);

  if (loading) {
    return (
      <div className="py-10 text-center text-[#666]">
        로딩중...
      </div>
    );
  }

  if (posts.length === 0) {
    return <div className="py-10 text-center text-[#666] border-t border-b border-[#eee] bg-[#f9f9f9]">작성된 글이 없습니다.</div>;
  }

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        return (
          <div key={i} className="flex justify-center my-4">
            <img 
              src={imgMatch[2]} 
              alt={imgMatch[1] || 'content-image'} 
              className="max-w-full md:max-w-[400px] border border-[#ccc] p-1 bg-white shadow-sm"
            />
          </div>
        );
      }

      const parts = line.split(/(\[(?:pink|blue)\].*?\[\/(?:pink|blue)\])/g);

      return (
        <React.Fragment key={i}>
          {parts.map((part, index) => {
              const colorMatch = part.match(/^\[(pink|blue)\](.*?)\[\/\1\]$/);
              if (colorMatch) {
                  const colorClass = colorMatch[1] === 'pink' ? 'text-[#ff1493]' : 'text-[#0000ff]';
                  return <span key={index} className={`font-bold ${colorClass}`}>{colorMatch[2]}</span>;
              }
              return <span key={index}>{part}</span>;
          })}
          <br />
        </React.Fragment>
      );
    });
  };

  if (isListViewMode) {
      return (
        <>
          {/* Mobile: Card List Style */}
          <div className="md:hidden border-t-2 border-[#2DB400]">
             {posts.map((post) => (
                <div key={post.id} className="py-3 border-b border-[#eee] px-2 active:bg-gray-50">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#333] font-bold text-[13px] line-clamp-1">{post.title}</span>
                      {post.comments.length > 0 && <span className="text-[#ff0000] text-[10px] font-bold">[{post.comments.length}]</span>}
                      <span className="text-[#2DB400] text-[9px] font-bold border border-[#2DB400] px-[2px] rounded-sm">N</span>
                   </div>
                   <div className="flex justify-between items-center text-[11px] text-[#888]">
                      <div className="flex gap-2">
                        <span>{post.date}</span>
                        <span>|</span>
                        <span>쩨리</span>
                      </div>
                      <div className="text-[10px] bg-[#f5f5f5] px-1 border border-[#eee] rounded-sm">
                        조회 {post.likes * 3 + 15}
                      </div>
                   </div>
                </div>
             ))}
          </div>

          {/* Desktop: Table Style */}
          <div className="hidden md:block border-t-2 border-t-[#2DB400] overflow-x-auto">
              <div className="min-w-[500px]">
                <div className="flex bg-[#f9f9f9] border-b border-[#ccc] py-2 text-[11px] font-bold text-[#555] text-center">
                    <div className="w-[50px]">번호</div>
                    <div className="flex-1">제목</div>
                    <div className="w-[80px]">작성자</div>
                    <div className="w-[80px]">날짜</div>
                    <div className="w-[50px]">조회</div>
                </div>
                {posts.map((post, index) => (
                    <div key={post.id} className="flex border-b border-[#eee] py-2 text-[11px] text-[#666] hover:bg-[#f5f5f5] items-center text-center cursor-pointer">
                        <div className="w-[50px]">{posts.length - index}</div>
                        <div className="flex-1 text-left px-2 text-[#333]">
                            {post.title} 
                            {post.comments.length > 0 && <span className="text-[#ff0000] text-[10px] font-bold ml-1">[{post.comments.length}]</span>}
                            <span className="ml-1 text-[9px] text-[#2DB400] font-bold">N</span>
                        </div>
                        <div className="w-[80px]">쩨리</div>
                        <div className="w-[80px] font-sans text-[10px] text-[#888]">{post.date}</div>
                        <div className="w-[50px] font-sans text-[10px]">{post.likes * 3 + 15}</div>
                    </div>
                ))}
              </div>
          </div>
        </>
      );
  }

  return (
    <div className="space-y-8 relative">
      {/* Notepad Modal Layer */}
      {activeNotepad && (() => {
          const post = posts.find(p => p.id === activeNotepad);
          if (!post || !post.attachmentContent) return null;
          return (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setActiveNotepad(null)}>
                  <div className="w-full max-w-[600px] h-[500px] bg-white border-2 border-[#0055ea] shadow-[5px_5px_15px_rgba(0,0,0,0.5)] flex flex-col font-mono text-[13px]" onClick={e => e.stopPropagation()}>
                      {/* Windows XP Title Bar Style */}
                      <div className="h-[30px] bg-gradient-to-r from-[#0058ee] via-[#3593ff] to-[#0058ee] text-white px-2 flex justify-between items-center select-none">
                           <div className="flex items-center gap-2">
                               <img src="https://win98icons.alexmeub.com/icons/png/notepad-0.png" className="w-4 h-4" alt="icon" />
                               <span className="font-bold text-shadow shadow-black">{post.attachmentName} - 메모장</span>
                           </div>
                           <div className="flex gap-1">
                               <button onClick={() => setActiveNotepad(null)} className="w-[20px] h-[20px] bg-[#d7432e] hover:bg-[#ff0000] text-white font-bold flex items-center justify-center rounded-[2px] border border-white/30 text-[12px]">X</button>
                           </div>
                      </div>
                      
                      {/* Menu Bar */}
                      <div className="bg-[#ece9d8] text-black px-2 py-1 border-b border-[#aca899] text-[11px] flex gap-3 select-none">
                          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">파일(F)</span>
                          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">편집(E)</span>
                          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">서식(O)</span>
                          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">보기(V)</span>
                          <span className="hover:bg-[#316ac5] hover:text-white px-1 cursor-pointer">도움말(H)</span>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 overflow-y-auto p-4 bg-white text-black whitespace-pre-wrap leading-relaxed outline-none font-[Gulim]">
                          {post.attachmentContent}
                          
                          <div className="mt-32 mb-12 flex justify-center items-center opacity-30 hover:opacity-100 transition-opacity duration-1000">
                             <div className="relative group cursor-pointer" onClick={onOpenSecret}>
                                 <div className="text-[10px] text-[#ccc] font-mono tracking-[0.5em] group-hover:text-red-600 group-hover:font-bold group-hover:tracking-normal transition-all duration-300">
                                     %00%DATA_CORRUPT%00%
                                 </div>
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                     <div className="bg-black text-red-600 border border-red-600 px-2 py-1 text-[12px] font-mono animate-pulse">
                                         &gt;&gt; ACCESS_MEMORY &lt;&lt;
                                     </div>
                                 </div>
                             </div>
                          </div>
                      </div>
                  </div>
              </div>
          );
      })()}

      {posts.map(post => (
        <div key={post.id} className="bg-white relative">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#ddd]">
            <div className="flex items-center gap-2">
                <span className="text-[#2DB400] text-[11px]">|</span>
                <h2 className="text-[13px] font-bold text-[#333]">{post.title}</h2>
            </div>
            <div className="text-[11px] text-[#888] font-sans">
              {post.date}
            </div>
          </div>
          
          <div className="flex justify-end text-[11px] text-[#888] gap-2 mb-4">
            <span className="cursor-pointer hover:underline">주소복사</span>
            <span className="cursor-pointer hover:underline">스크랩</span>
          </div>

          <div className="min-h-[100px] text-[13px] md:text-[12px] leading-relaxed text-[#444] mb-6 px-1 text-center">
            {renderContent(post.content)}
          </div>

          {post.attachmentName && (
            <div className="mb-6 border border-[#ddd] bg-[#f8f8f8] p-3 rounded-sm text-left">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#666]">첨부파일:</span>
                        <div className="flex items-center gap-1 bg-white border border-[#ccc] px-2 py-1 cursor-pointer hover:bg-[#eee]" onClick={() => setActiveNotepad(post.id)}>
                            <img src="https://win98icons.alexmeub.com/icons/png/notepad-0.png" className="w-3 h-3" alt="file" />
                            <span className="text-[11px] text-[#333] underline decoration-dotted">{post.attachmentName}</span>
                        </div>
                    </div>
                    <span className="text-[10px] text-[#999]">1.2KB</span>
                </div>
            </div>
          )}

          <div className="flex items-center justify-between bg-[#f7f7f7] border-t border-b border-[#eee] p-2 text-[11px]">
             <div className="flex gap-3 text-[#555]">
                <span className="font-bold text-[#2DB400]">덧글 {post.comments.length}</span>
                <span className="cursor-pointer hover:text-black">공감 {post.likes}</span>
             </div>
             <div className="flex gap-1">
                 <button className="bg-white border border-[#ccc] px-2 py-[1px] text-[#666]">목록</button>
             </div>
          </div>

          {post.comments.length > 0 && (
             <div className="bg-[#fcfcfc] border-b border-[#eee] p-3 space-y-2 text-left">
                {post.comments.map(comment => (
                    <div key={comment.id} className="flex gap-2 items-start text-[11px]">
                        <span className={`font-bold ${comment.isOwner ? 'text-[#2DB400]' : 'text-[#333]'}`}>
                            {comment.author}
                        </span>
                        <span className="text-[#555] flex-1">{comment.content}</span>
                        <span className="text-[#999] text-[10px]">{comment.date}</span>
                    </div>
                ))}
             </div>
          )}
        </div>
      ))}
    </div>
  );
};
