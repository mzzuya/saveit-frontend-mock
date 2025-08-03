import StyleQuote from '@component/styleComponent/StyleQuote';
import CallQuote from '@utils/callQuote';
import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideLeft = keyframes`
    0%{transform: translateX(10%);}
    100%{transform: translateX(-100%);}
`;

const TickerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  height: 40px;
  overflow: hidden;
`;

const TickerText = styled.p`
  display: inline-block;
  animation: ${slideLeft} 120s linear infinite;
  font-size: 1rem;
  white-space: nowrap;

  span{
    margin-right: 30rem;
  }
`

export default function Quote() {
  const [quotes, setQuotes] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef(null);

  const fetchQuotes = async () => {
    const results = await CallQuote(['business', 'success', 'famous'], 10);
    setQuotes(results);
    setCurrentIdx(0);
  };

  useEffect(() => {
    fetchQuotes();

    // 번역 버전인데 cors 오류 있어서 백단이랑 같이 처리해야됨
    // (async () => {
    //   const raw = await CallQuote(['business', 'success', 'famous-qutes']); // 명언 api 호출
    //   const translated = await translateText(raw.content); // 번역 api 호출
    //   setQuote({
    //     original: raw.content,
    //     translated,
    //     author: raw.author,
    //   });
    // })(); // 즉시 시행;
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    timerRef.current = setInterval(() => {
      setCurrentIdx((prevIdx) => {
        const nextIdx = prevIdx + 1;
        if (nextIdx >= quotes.length) {
          fetchQuotes();
          return 0;
        }
        return nextIdx;
      });
    }, 13000);
    return () => clearInterval(timerRef.current);
  }, [quotes]);

  const quote = quotes[currentIdx];
  if (!quote) return null;

  return (
    <StyleQuote>
      <TickerWrapper className='tickerWrapper'>
        <TickerText className='tickerText'>
          {quotes.map((q, i) => (
            <span key={i}>
              “{q.content}” — {q.author}
            </span>
          ))}
        </TickerText>
      </TickerWrapper>
    </StyleQuote>
  );
}
