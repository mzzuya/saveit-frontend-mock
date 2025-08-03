import axios from 'axios';

async function CallQuote(tags = [], limit = 10) {
  if (!tags || tags.length == 0) {
    throw new Error('태그가 입력되지 않았습니다');
  }

  const tagQuery = tags.join('|');
  const url = `https://api.quotable.io/quotes/random?limit=${limit}&tags=${tagQuery}`;

  try {
    const res = await axios.get(url);
    return res.data.map((q) => ({
      content: q.content,
      author: q.author,

    }));
  } catch (err) {
    console.error('명언들 불러오기 실패:', err.message);
    return Array.from({ length: limit }, () => ({
      content: '명언을 불러오는데 실패했습니다',
      author: '-',
    }));
  }
}

export default CallQuote;
