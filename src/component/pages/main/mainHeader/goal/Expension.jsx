import { getUserExpense } from "@api/goal";
import { useState, useEffect } from "react"
import { ResponsiveContext } from "@context/ResponsiveContext"
import { useContext } from "react"
import styled from "styled-components"

const StyleExpension = styled.article`
  display: flex;
  flex-direction: column;
  font-size: ${({ $isMobile }) => ($isMobile ? "17px" : "18px")};
  line-height: 1.5;
  gap: 6px;

  .totalExpension, .averExpension{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span{
    font-weight: bold;
    font-size: 15px;
    color: #666;
  }
`

export default function Expension() {
  const {isMobile} = useContext(ResponsiveContext);
  const [totalExpense, setTotalExpense] = useState(0);
  
  useEffect(()=> {
    getUserExpense()
    .then((res)=> {
      setTotalExpense(res.totalExpense)
    })
    .catch((err) => console.error("데이터 불러오기 실패", err))
  }, [])

    return (
        <StyleExpension  $isMobile={isMobile}>
                <div className='totalExpension'><span>이번 달 지출</span> {totalExpense}원</div>
                <div className='averExpension'><span>하루 평균 소비</span> {parseInt(totalExpense / 30)}원</div>
        </StyleExpension>
    )
}