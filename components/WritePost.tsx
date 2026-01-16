import React, { useState } from 'react';
import { generateNostalgicPost } from '../services/geminiService';
import { Post } from '../types';

interface WritePostProps {
  onPostCreated: (post: Post) => void;
  onCancel: () => void;
}

export const WritePost: React.FC<WritePostProps> = ({ onPostCreated, onCancel }) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    const result = await generateNostalgicPost(topic);
    setIsGenerating(false);

    if (result) {
        const newPost: Post = {
            id: Date.now().toString(),
            category: 'Daily Life',
            title: result.title,
            content: result.content,
            date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
            comments: [],
            likes: 0
        };
        onPostCreated(newPost);
    }
  };

  return (
    <div className="bg-white p-6 border border-[#ccc]">
      <h2 className="text-[14px] font-bold text-[#2DB400] mb-4 pb-2 border-b border-[#eee]">새 글 쓰기 (AI 작문)</h2>
      
      <div className="mb-4">
        <label className="block text-[12px] font-bold text-[#444] mb-2">글감 / 기분</label>
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="예: 비 오는 날의 우울함, 헤어진 남친 생각, 떡볶이 먹방"
          className="w-full border border-[#ccc] p-2 text-[12px] focus:outline-none focus:border-[#2DB400]"
        />
        <p className="text-[11px] text-[#888] mt-1">
            * AI가 2010년 감성으로 글을 작성해줍니다.
        </p>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        <button 
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="bg-[#2DB400] text-white px-6 py-2 font-bold text-[12px] border border-[#238c00] hover:bg-[#238c00] disabled:opacity-50"
        >
            {isGenerating ? '작성 중...' : '확인'}
        </button>
        <button 
            onClick={onCancel}
            className="bg-white text-[#666] px-6 py-2 font-bold text-[12px] border border-[#ccc] hover:bg-[#f9f9f9]"
        >
            취소
        </button>
      </div>
    </div>
  );
};