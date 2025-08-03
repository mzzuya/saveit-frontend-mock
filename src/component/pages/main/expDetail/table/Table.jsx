import { ResponsiveContext } from "@context/ResponsiveContext"
import { useContext, useMemo } from "react"
import { addDate, getDateString } from "@utils/dateUtil";
import { useEffect, useState } from "react";
import TableCard from "@component/styleComponent/TableCard";
import useAddItem from "@hooks/useAddItem";
import useWeeklyStore from "@stores/useWeeklyStore";
import TableRecord from "./tableRecord/TableRecord";
import SlipDateButton from "../../../../styleComponent/SlipDateButton";

export default function Table() {
  //캘린더 반응형에 따른 갯수
  const { isMobile, isTablet } = useContext(ResponsiveContext);
  const visibleCount = isMobile ? 1 : isTablet ? 3 : 5;

  const { fetchSave, fetchExpense, isLoadingExpense,
    isLoadingSave, error } = useWeeklyStore();
  // const expenseData = useWeeklyStore((state) => state.expenseData);
  // const saveData = useWeeklyStore((state) => state.saveData);

  // 날짜 기준 세팅
  const [offset, setOffset] = useState(0);
  const today = useMemo(() => new Date(), []);

  const dummyData = useMemo(() => {
  const dates = Array.from({ length: 5 }, (_, i) => getDateString(addDate(today, i - 2 + offset)));
    return dates.flatMap((date, i) => {
      if (i === 0) {
        return [
          { date, category: "커피", amount: 3000, type: "expense" },
          { date, category: "용돈 저축", amount: 10000, type: "save" },
        ];
      } else if (i === 1) {
        return [
          { date, category: "편의점", amount: 6000, type: "expense" },
          { date, category: "예금", amount: 15000, type: "save" },
        ];
      } else if (i === 2) {
        return [
          { date, category: "택시비", amount: 9000, type: "expense" },
          { date, category: "비상금 저축", amount: 5000, type: "save" },
        ];
      } else if (i === 3) {
        return [
          { date, category: "점심", amount: 7000, type: "expense" },
          { date, category: "적금", amount: 20000, type: "save" },
        ];
      } else {
        return [
          { date, category: "용돈 저축", amount: 30000, type: "save" },
        ];
      }
    });
  }, [offset, today]);

  //const today = getDateString(new Date()); // 오늘 날짜 확인

  // 처음 랜더링될 때 기준 상태
  const [date, setDate] = useState(() => {
    const arr = [];
    const half = Math.floor(visibleCount / 2);
    for (let i = -half; i <= half; i++) {
      arr.push(getDateString(addDate(today, i)));
    }
    return arr;
  });

  const { addPrevDate, addNextDate } = useAddItem(date, setDate, visibleCount, offset, setOffset); // 날짜 추가/제거 상태 관리

  // 캘린더 비동기화
  useEffect(() => {  

    // const getData = async () => {
    //   try {
    //     await fetchExpense(offset);
    //   } catch (err) {
    //     console.error('지출 데이터 실패:', err);
    //   }

    //   try {
    //     await fetchSave(offset);
    //   } catch (err) {
    //     console.error('저장 데이터 실패:', err);
    //   }
    // };
    // getData();
  }, [offset]);

  // 반응형 캘린더 갯수 조절
  useEffect(() => {
    const half = Math.floor(visibleCount / 2);
    const newDates = [];
    for (let i = -half; i <= half; i++) {
      newDates.push(getDateString(addDate(today, i)));
    }
    setDate(newDates);
  }, [visibleCount, today]);

  // 데이터 기록 수신
  // const dateRecords = useMemo(() => {
  //   const map = {};
  //   weeklyRecords.forEach((res) => {
  //     const { year, month, date } = res.date;
  //     const dateObj = new Date(year, month - 1, date);
  //     const key = getDateString(dateObj);
  //     if (!map[key]) {
  //       map[key] = [];
  //     }
  //     map[key].push(...res.entries);
  //   });
  //   return map;
  // }, [weeklyRecords]);




  // if (isLoadingExpense || isLoadingSave ) return '데이터를 불러오는 중입니다';
  // if (error) return <p>에러발생: {error}</p>;

  return (
    <>
      <TableCard className="table">
        <SlipDateButton onClick={addPrevDate} dir="left"></SlipDateButton>
        {date.map((date,index) => {
          // const expenseFilter = expenseData.filter(expense => expense.expenseDate === date)
          // const saveFilter = saveData.filter(save => save.saveDate === date)
          const expenseFilter = dummyData.filter(item => item.date === date && item.type === "expense");
          const saveFilter = dummyData.filter(item => item.date === date && item.type === "save");


          return  <TableRecord expense={expenseFilter} save={saveFilter} date={date} key={index} offset={offset}/>
        })}
        <SlipDateButton onClick={addNextDate} dir="right"></SlipDateButton>
      </TableCard>
    </>
  );
}
