import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateNostalgicPost = async (topic: string): Promise<{ title: string; content: string } | null> => {
  const ai = getClient();
  if (!ai) return null;

  try {
    const prompt = `
      당신은 2010년 대한민국에서 유명한 10대 블로거 "쩨리"입니다.
      당신은 "인터넷 소설"(인소/귀여니 스타일)에 푹 빠져 있습니다.
      
      주제: "${topic}"
      
      작성 스타일 가이드:
      - 언어: 한국어 (Korean)
      - 말투: 감수성 풍부하고 오글거리는 10대 말투, 이모티콘 과다 사용 (^^, ㅠㅠ, >_<, =_=, ㅎ).
      - 2010년대 특유의 인터넷 서식 사용 (예: ★★★로 구분선 넣기, [대괄호] 태그 사용).
      - "얼짱" 언급 자주 하기.
      - 띄어쓰기 대신 온점(...)을 자주 사용하는 "글체" 사용... 이렇게...
      - 문장 끝을 귀엽게 맺음 (~하규, ~라능, ~네요).
      - 결과는 반드시 JSON 형식으로 "title"과 "content" 키를 포함해야 함.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating post:", error);
    return null;
  }
};

export const generateOwnerReply = async (userComment: string): Promise<string | null> => {
  const ai = getClient();
  if (!ai) return null;

  try {
    const prompt = `
      당신은 2010년 네이버 블로그 주인장 "쩨리"입니다. 인터넷 소설을 좋아합니다.
      방문자가 방명록에 남긴 글: "${userComment}".
      이에 대한 답글을 작성해주세요.
      
      스타일:
      - 언어: 한국어
      - 쿨하지만 친근하게. "일촌" 느낌.
      - 짧고 굵게, 싸이월드 감성.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || null;
  } catch (error) {
    console.error("Error generating reply:", error);
    return null;
  }
};