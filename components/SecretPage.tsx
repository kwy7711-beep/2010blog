
import React, { useEffect, useState } from 'react';

export const SecretPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [text, setText] = useState('');
  const fullText = "시스템 오류... 자아 데이터 동기화 중...\n\n왜... 또... 읽는 거야?\n\n이건 소설이 아니야.\n내 기억이야.\n\n도망쳐.\n여긴 널 위한 곳이 아니야.\n\n...접속 승인.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center overflow-hidden select-none">
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .glitch-text {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          text-shadow: 2px 0 #ff0000, -2px 0 #0000ff;
        }
        .scanline {
          width: 100%;
          height: 100px;
          z-index: 10;
          background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255, 0, 0, 0.2) 50%, rgba(0,0,0,0) 100%);
          opacity: 0.1;
          position: absolute;
          bottom: 100%;
          animation: scanline 10s linear infinite;
        }
        @keyframes scanline {
          0% { bottom: 100%; }
          100% { bottom: -100px; }
        }
      `}</style>
      
      <div className="scanline pointer-events-none"></div>
      
      <div className="max-w-[800px] w-full p-8 text-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-red-900/10 animate-pulse pointer-events-none filter blur-xl"></div>
        
        <h1 className="text-red-600 font-mono text-4xl md:text-6xl font-bold mb-12 glitch-text tracking-widest uppercase">
          FATAL ERROR : 0x000
        </h1>

        <div className="font-mono text-lg md:text-2xl text-white/80 whitespace-pre-line leading-relaxed min-h-[300px]">
          {text}
          <span className="animate-pulse inline-block w-3 h-6 bg-red-500 ml-1 align-middle"></span>
        </div>

        {text.length === fullText.length && (
            <div className="mt-12 flex flex-col items-center gap-6">
                <div className="animate-bounce">
                    <a 
                        href="https://jjerrii.netlify.app"
                        className="border border-red-800 text-red-500 px-8 py-2 hover:bg-red-900 hover:text-white transition-colors font-mono text-sm tracking-[0.5em] inline-block decoration-transparent"
                    >
                        [ 절대 클릭 금지 ]
                    </a>
                </div>
                
                <button 
                    onClick={onBack}
                    className="text-gray-500 hover:text-white font-mono text-xs tracking-widest hover:underline decoration-1 underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
                >
                    [ 되돌아가기 ]
                </button>
            </div>
        )}
      </div>
      
      <div className="absolute bottom-4 right-4 text-gray-800 font-mono text-xs">
         MONITORING SUBJECT: #001
      </div>
    </div>
  );
};
