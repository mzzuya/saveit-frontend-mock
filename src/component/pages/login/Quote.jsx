import StyleQuote from '@component/styleComponent/StyleQuote';
//import CallQuote from '@utils/callQuote';
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

const MOCK_QUOTES = [
  { content: '돈을 버는 것보다 지키는 것이 더 어렵다.', author: '토마스 풀러' },
  { content: '저축은 가장 확실한 투자다.', author: '벤자민 프랭클린' },
  { content: '적은 돈이라도 꾸준히 모으면 큰 부를 이룰 수 있다.', author: '세네카' },
  { content: '재산을 잃는 것은 조금 잃는 것이지만, 시간을 잃는 것은 모든 것을 잃는 것이다.', author: '벤자민 프랭클린' },
  { content: '지출을 줄이는 것은 새로운 수입을 찾는 것보다 더 빠른 부의 길이다.', author: '벤자민 프랭클린' },
];

export default function Quote() {
  const [quotes] = useState(MOCK_QUOTES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef(null);

  // const fetchQuotes = async () => {
  //   // const results = await CallQuote(['business', 'success', 'famous'], 10);
  //   // setQuotes(results);
  //   // setCurrentIdx(0);
  // };

  // useEffect(() => {
  //   fetchQuotes();

  //   // 번역 버전인데 cors 오류 있어서 백단이랑 같이 처리해야됨
  //   // (async () => {
  //   //   const raw = await CallQuote(['business', 'success', 'famous-qutes']); // 명언 api 호출
  //   //   const translated = await translateText(raw.content); // 번역 api 호출
  //   //   setQuote({
  //   //     original: raw.content,
  //   //     translated,
  //   //     author: raw.author,
  //   //   });
  //   // })(); // 즉시 시행;
  // }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    // timerRef.current = setInterval(() => {
    //   setCurrentIdx((prevIdx) => {
    //     const nextIdx = prevIdx + 1;
    //     if (nextIdx >= quotes.length) {
    //       fetchQuotes();
    //       return 0;
    //     }
    //     return nextIdx;
    //   });
    // }, 13000);
    timerRef.current = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % quotes.length);
    }, 13000);

    // return () => clearInterval(timerRef.current);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quotes.length]);

  const quote = quotes[currentIdx];
  if (!quote) return null;

  return (
    <StyleQuote>
      <TickerWrapper className='tickerWrapper'>
        <TickerText className='tickerText'>
          {[...quotes, ...quotes].map((q, i) => (
            <span key={i}>
              “{q.content}” — {q.author}
            </span>
          ))}
        </TickerText>
      </TickerWrapper>
    </StyleQuote>
  );
}
