import React, { useState, useEffect } from 'react';
import { Post } from '../types';

interface PostListProps {
  posts: Post[];
  loading: boolean;
  activeCategory: string;
}

export const PostList: React.FC<PostListProps> = ({ posts, loading, activeCategory }) => {
  const [activeNotepad, setActiveNotepad] = useState<string | null>(null);

  const isListViewMode = ['casting', 'ulzzang', 'diary'].includes(activeCategory);

  if (loading) {
    return (
      <div className="py-10 text-center text-[#666]">
        <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" className="mx-auto w-4 h-4 mb-2 opacity-50" />
        로딩중...
      </div>
    );
  }

  if (posts.length === 0) {
    return <div className="py-10 text-center text-[#666] border-t border-b border-[#eee] bg-[#f9f9f9]">작성된 글이 없습니다.</div>;
  }

  // Helper to render content with markdown-style images and custom color tags
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Check for strict markdown image syntax
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

      // Parse custom color tags [pink]...[/pink] and [blue]...[/blue]
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

  // Render Logic for List View Mode (Table) - READ ONLY LIST
  if (isListViewMode) {
      return (
          <div className="border-t-2 border-t-[#2DB400] overflow-x-auto">
              {/* Min-width ensures table structure holds on small screens */}
              <div className="min-w-[500px]">
                {/* Table Header */}
                <div className="flex bg-[#f9f9f9] border-b border-[#ccc] py-2 text-[11px] font-bold text-[#555] text-center">
                    <div className="w-[50px]">번호</div>
                    <div className="flex-1">제목</div>
                    <div className="w-[80px]">작성자</div>
                    <div className="w-[80px]">날짜</div>
                    <div className="w-[50px]">조회</div>
                </div>
                {/* List Items */}
                {posts.map((post, index) => (
                    <div key={post.id} className="flex border-b border-[#eee] py-2 text-[11px] text-[#666] hover:bg-[#f5f5f5] items-center text-center">
                        <div className="w-[50px]">{posts.length - index}</div>
                        <div className="flex-1 text-left px-2 text-[#333]">
                            {post.title} 
                            {post.comments.length > 0 && <span className="text-[#ff0000] text-[10px] font-bold ml-1">[{post.comments.length}]</span>}
                            {/* New icon simulation */}
                            <span className="ml-1 text-[9px] text-[#2DB400] font-bold">N</span>
                        </div>
                        <div className="w-[80px]">쩨리</div>
                        <div className="w-[80px] font-sans text-[10px] text-[#888]">{post.date}</div>
                        <div className="w-[50px] font-sans text-[10px]">{post.likes * 3 + 15}</div>
                    </div>
                ))}
              </div>
              {/* Pagination (Visual Only) */}
              <div className="flex justify-center mt-4 gap-1 text-[11px] text-[#888]">
                  <span className="font-bold text-black cursor-pointer">[1]</span>
                  <span className="cursor-pointer hover:underline">[2]</span>
                  <span className="cursor-pointer hover:underline">[3]</span>
              </div>
          </div>
      );
  }

  // Normal Blog View Mode
  return (
    <div className="space-y-8">
      {posts.map(post => (
        <div key={post.id} className="bg-white relative">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#ddd]">
            <div className="flex items-center gap-2">
                <span className="text-[#2DB400] text-[11px]">|</span>
                <h2 className="text-[13px] font-bold text-[#333]">{post.title}</h2>
            </div>
            <div className="text-[11px] text-[#888] font-sans">
              {post.date}
            </div>
          </div>
          
          {/* Post Util Bar */}
          <div className="flex justify-end text-[11px] text-[#888] gap-2 mb-4">
            <span className="cursor-pointer hover:underline">주소복사</span>
            <span className="cursor-pointer hover:underline">스크랩</span>
            <span className="cursor-pointer hover:underline">인쇄</span>
          </div>

          {/* Content */}
          <div className="min-h-[100px] text-[12px] leading-relaxed text-[#444] mb-6 px-1 font-['Gulim'] text-center">
            {renderContent(post.content)}
          </div>

          {/* File Attachment / Notepad Simulation */}
          {post.attachmentName && (
            <div className="mb-6 border border-[#ddd] bg-[#f8f8f8] p-3 rounded-sm text-left">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#666]">첨부파일:</span>
                        <div className="flex items-center gap-1 bg-white border border-[#ccc] px-2 py-1 cursor-pointer hover:bg-gray-50" onClick={() => setActiveNotepad(post.id)}>
                            <img src="https://cdn-icons-png.flaticon.com/512/136/136538.png" className="w-3 h-3 grayscale" alt="txt" />
                            <span className="text-[11px] text-[#333] underline decoration-dotted">{post.attachmentName}</span>
                        </div>
                    </div>
                    <span className="text-[10px] text-[#999]">1.2KB</span>
                </div>
            </div>
          )}

          {/* Notepad Modal */}
          {activeNotepad === post.id && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4" onClick={() => setActiveNotepad(null)}>
                <div className="bg-white w-full max-w-[600px] h-[500px] shadow-2xl border border-[#333] flex flex-col font-mono" onClick={e => e.stopPropagation()}>
                    {/* Notepad Title Bar */}
                    <div className="h-[28px] bg-gradient-to-r from-[#0058ee] to-[#4c91ea] flex items-center justify-between px-2 cursor-move">
                        <div className="flex items-center gap-2">
                             <img src="https://cdn-icons-png.flaticon.com/512/136/136538.png" className="w-3 h-3 invert" alt="icon" />
                             <span className="text-white text-[11px] drop-shadow-md truncate">{post.attachmentName} - 메모장</span>
                        </div>
                        <div className="flex gap-1">
                            <button className="w-[18px] h-[18px] bg-[#d74533] text-white flex items-center justify-center text-[10px] border border-white/30 rounded-sm hover:bg-[#ff5f52]" onClick={() => setActiveNotepad(null)}>X</button>
                        </div>
                    </div>
                    {/* Notepad Menu */}
                    <div className="h-[20px] bg-[#f0f0f0] border-b border-[#d9d9d9] flex items-center px-2 gap-3 text-[11px] text-[#333]">
                        <span>파일(F)</span>
                        <span className="hidden md:inline">편집(E)</span>
                        <span className="hidden md:inline">서식(O)</span>
                        <span className="hidden md:inline">보기(V)</span>
                        <span>도움말(H)</span>
                    </div>
                    {/* Notepad Content */}
                    <div className="flex-1 p-4 overflow-auto bg-white scrollbar-hide text-left relative">
                        <pre className="text-[13px] font-['Gulim'] text-black whitespace-pre-wrap leading-relaxed mb-8">
                            {post.attachmentContent || "(내용이 없습니다...)"}
                        </pre>

                        {/* Mysterious Button Section (Something that shouldn't be there) */}
                        {post.cyworldLink && (
                            <div className="mt-24 pt-4 pb-8 flex flex-col items-center justify-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
                                {/* Glitchy System Text */}
                                <div className="text-[9px] font-mono text-[#ccc] mb-2 select-none tracking-widest text-center">
                                    [SYSTEM] : CORRUPTED_SECTOR_FOUND<br/>
                                    [WARNING] : UNAUTHORIZED_LINK_DETECTED
                                </div>
                                
                                <a href={post.cyworldLink} target="_blank" rel="noreferrer" className="group relative inline-block no-underline">
                                    {/* The Button */}
                                    <div className="
                                        w-[220px] h-[45px] 
                                        bg-[#1a1a1a] 
                                        border-l-4 border-l-red-600 border-t border-r border-b border-[#444]
                                        flex items-center justify-between px-4
                                        shadow-[0px_0px_10px_rgba(0,0,0,0.1)]
                                        group-hover:bg-black group-hover:border-l-[#ff0000] group-hover:shadow-[0px_0px_15px_rgba(255,0,0,0.3)]
                                        transition-all duration-300
                                        cursor-help
                                        relative overflow-hidden
                                    ">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-[#666] font-mono group-hover:text-red-500">UNKNOWN.exe</span>
                                            <span className="text-[11px] text-[#eee] font-bold tracking-wider font-mono group-hover:text-white group-hover:animate-pulse">
                                                ??? (클릭하지 마시오)
                                            </span>
                                        </div>
                                        
                                        {/* Icon */}
                                        <div className="text-[#444] text-[16px] group-hover:text-red-600 transition-colors">
                                            ⚠
                                        </div>

                                        {/* Glitch Overlay */}
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity mix-blend-overlay"></div>
                                        <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-[-20deg] group-hover:animate-[shimmer_1s_infinite]"></div>
                                    </div>

                                    {/* Secret Tooltip */}
                                    <div className="absolute -bottom-6 w-full text-center text-[9px] font-mono text-red-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        ※ 강제 접속을 시도합니다...
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          )}

          {/* Post Footer/Interaction */}
          <div className="flex items-center justify-between bg-[#f7f7f7] border-t border-b border-[#eee] p-2 text-[11px]">
             <div className="flex gap-3 text-[#555]">
                <span className="font-bold text-[#2DB400]">덧글 {post.comments.length}</span>
                <span className="cursor-pointer hover:text-black">공감 {post.likes}</span>
                <span className="cursor-pointer hover:text-black">신고</span>
             </div>
             <div className="flex gap-1">
                 <button className="bg-white border border-[#ccc] px-2 py-[1px] text-[#666] hover:border-[#999]">목록</button>
                 <button className="bg-white border border-[#ccc] px-2 py-[1px] text-[#666] hover:border-[#999]">맨위</button>
             </div>
          </div>

          {/* Comments Section (Simplified for list view) */}
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