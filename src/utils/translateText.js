import axios from 'axios';

export async function translateText(text) {
  try {
    const res = await axios.post(
      'https://libretranslate.de/translate', // 이거 번역이 cors 문제로 동작을 안함, 백에서 처리하면 된다는데요?
      {
        q: text,
        source: 'en',
        target: 'ko',
        format: 'text',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data.translatedText;
  } catch (err) {
    console.error('번역 실패:', err.message);
    return '번역 실패';
  }
}
