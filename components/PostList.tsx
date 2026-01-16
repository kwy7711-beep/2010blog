import React, { useState } from 'react';
import { Post } from '../types.ts';

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
          <div className="border-t-2 border-t-[#2DB400] overflow-x-auto">
              <div className="min-w-[500px]">
                <div className="flex bg-[#f9f9f9] border-b border-[#ccc] py-2 text-[11px] font-bold text-[#555] text-center">
                    <div className="w-[50px]">번호</div>
                    <div className="flex-1">제목</div>
                    <div className="w-[80px]">작성자</div>
                    <div className="w-[80px]">날짜</div>
                    <div className="w-[50px]">조회</div>
                </div>
                {posts.map((post, index) => (
                    <div key={post.id} className="flex border-b border-[#eee] py-2 text-[11px] text-[#666] hover:bg-[#f5f5f5] items-center text-center">
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
      );
  }

  return (
    <div className="space-y-8">
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

          <div className="min-h-[100px] text-[12px] leading-relaxed text-[#444] mb-6 px-1 text-center">
            {renderContent(post.content)}
          </div>

          {post.attachmentName && (
            <div className="mb-6 border border-[#ddd] bg-[#f8f8f8] p-3 rounded-sm text-left">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#666]">첨부파일:</span>
                        <div className="flex items-center gap-1 bg-white border border-[#ccc] px-2 py-1 cursor-pointer" onClick={() => setActiveNotepad(post.id)}>
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