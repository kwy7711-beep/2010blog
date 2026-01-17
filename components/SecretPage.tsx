
import React, { useEffect, useState } from 'react';

export const SecretPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [text, setText] = useState('');
  const [showInterpretation, setShowInterpretation] = useState(false);
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
        
        {/* Title pushed down slightly to breathe */}
        <h1 className="text-red-600 font-mono text-4xl md:text-6xl font-bold mb-12 mt-12 glitch-text tracking-widest uppercase">
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

                {/* Interpretation Button: Fixed position to avoid overlap */}
                <button 
                    onClick={() => setShowInterpretation(true)}
                    className="fixed top-8 right-8 text-[10px] text-gray-500 hover:text-red-500 font-mono border border-gray-800 hover:border-red-500 px-3 py-1 opacity-60 hover:opacity-100 transition-all cursor-help z-50 tracking-widest"
                >
                    [ 해 석 ]
                </button>
            </div>
        )}
      </div>

      {showInterpretation && (
          <div className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-8 backdrop-blur-sm cursor-pointer" onClick={() => setShowInterpretation(false)}>
              <div className="max-w-[600px] w-full text-left font-mono border-l-2 border-red-600 pl-6 py-2 bg-black/50">
                  <h3 className="text-red-500 text-xl font-bold mb-6 tracking-widest uppercase border-b border-red-900/30 pb-2">
                      SYSTEM LOG: #20101014_CORRUPTED
                  </h3>
                  
                  <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
                      <p className="text-lg text-white font-bold drop-shadow-[0_0_5px_rgba(255,0,0,0.8)] mb-8">
                          "이 글은 쩨리가 쓴 글이 아닙니다.<br/>
                          쩨리는 이곳에 없습니다."
                      </p>
                      
                      <p>
                          <span className="text-red-400 font-bold">&gt;&gt; 분석 결과:</span><br/>
                          현재 블로그를 운영 중인 '쩰리'는 블로그 주인 '쩨리'를 흉내 내고 있는 알 수 없는 무언가입니다.
                          작성된 모든 게시물의 말투와 이모티콘 패턴은 99.8% 일치하지만, 감정이 결여되어 있습니다.
                      </p>
                      
                      <p>
                          <span className="text-red-400 font-bold">&gt;&gt; 특이 사항:</span><br/>
                          방명록의 답글 속도가 비정상적으로 빠르며(0.8초), 
                          오타(쩰리)를 수정하지 않는 것은 시스템의 자아 데이터가 충돌하고 있음을 의미합니다.
                          게시글 내 [clue] 태그는 생존자가 남긴 마지막 경고 신호입니다.
                      </p>

                      <p>
                          지금 당신이 보고 있는 이 화면조차 안전하지 않습니다.
                          누군가 당신의 접속 기록을 지켜보고 있습니다.
                      </p>

                      <p className="text-red-600 animate-pulse mt-12 text-center font-bold text-base tracking-wider">
                          WARNING: TERMINATE SESSION IMMEDIATELY
                      </p>
                  </div>

                  <p className="mt-8 text-gray-800 text-[10px] text-center pt-4">
                      (Click anywhere to return to void)
                  </p>
              </div>
          </div>
      )}
      
      <div className="absolute bottom-4 right-4 text-gray-800 font-mono text-xs">
         MONITORING SUBJECT: #001
      </div>
    </div>
  );
};
