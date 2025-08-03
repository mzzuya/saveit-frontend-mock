import { useEffect, useRef, useState } from 'react';
import { addDate, getDateString } from '../utils/dateUtil';

export default function useAddItem(dateArray, setDateArray, maxCount = 5, offset, setOffset) {
  const containerRef = useRef(null);

  // 이전 날짜 데이터 추가
  const addPrevDate = () => {
    const first = new Date(dateArray[0]);
    const newDate = getDateString(addDate(first, -1));
    setOffset(prev => prev -1);
    if (dateArray.includes(newDate)) return;

    setDateArray((prev) => {
      const updated = [newDate, ...prev];
      return updated.length > maxCount ? updated.slice(0, maxCount) : updated;
    });
  };

  // 다음 날짜 추가
  const addNextDate = () => {
    const last = new Date(dateArray[dateArray.length - 1]);
    const newDate = getDateString(addDate(last, 1));
    setOffset(prev => prev +1);
    if (dateArray.includes(newDate)) return;

    setDateArray((prev) => {
      const updated = [...prev, newDate];
      return updated.length > maxCount ? updated.slice(-maxCount) : updated;
    });
  };

  return { containerRef, addPrevDate, addNextDate };
}
