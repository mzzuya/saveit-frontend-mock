import { ResponsiveContext } from "@context/ResponsiveContext"
import { useContext } from "react"
import alter from '@assets/pencil.svg'
import check from '@assets/check.svg'
import styled from 'styled-components';
import { useEffect, useRef, useState } from "react";
import { getUserGoal, getUserSave, postUserGoal } from "@api/goal.js";


const StyleCurrent = styled.div`
    p {
        font-size: ${({ $isMobile, $isTablet }) => ($isMobile ? "16px" : $isTablet ? "16px" : "18px")};
    }
    .goalSummary {
        font-size: ${({ $isMobile, $isTablet }) => ($isMobile ? "24px" : $isTablet ? "24px" : "28px")};
        font-weight: bold;
        padding: 8px 0 15px;
        display: flex;
        align-items: baseline;
        gap: 5px;
        white-space: nowrap;
    }
    span{
        font-size: 15px;
        color: #888;
    }
    .moneyInput{
        overflow: hidden;
        max-width: 85px;
    }
    .money{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    button{
        background: transparent;
        padding: 0;
        border: none;
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .check{
        display: block;
        object-fit: contain;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .alter {
        display: block;
        object-fit: contain;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    input{
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 15px;
        width: 80px;
        outline: none;
        text-align: right;
        color: #777;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input:focus {
        border-color: #007aff;
    }
    .progressBar {
        background-color: #eee;
        border-radius: 999px;
        height: 18px;
        position: relative;
        overflow: hidden;
        margin-bottom: 12px;
    }
    .fill {
        background-color: #2F80ED;
        height: 100%;
        border-radius: 999px;
        width: ${(250000 / 500000) * 100}%; /* 현재 값 계산해서 퍼센트 */
        transition: width 0.4s ease;
    } 
    .percentText {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 11px;
        color: #333;
        font-weight: 500;
    }

`

export default function Current() {
  const {isMobile, isTablet} = useContext(ResponsiveContext);


  const [visual, setVisual] = useState(false)
  const [inputGoal, setInputGoal] = useState("")
  const focusRef = useRef(null)
  const prevGoal = useRef("")

  // 
  const [totalSave, setTotalSave] = useState(0);

  useEffect(() => {
    const dummySave = {
      totalSave: 250000
    };
    setTotalSave(dummySave.totalSave);
  }, []);


  useEffect(() => {
    const dummyGoal = {
      goalAmount: 500000
    };
    setInputGoal(dummyGoal.goalAmount);
  }, []);

  // console.log(goals)
 
  useEffect(()=> {
    //수정 버튼 시 입력 값 포커스
    if(visual) {
        focusRef.current.focus()
        prevGoal.current = inputGoal    
    }
  }, [visual])

  //포커스 시 초기값이 비워져있어 사용
  const handleFocus = ()=> {
    setVisual(true)
  }

  // input에서 입력 값 변화 확인
  const handleChange = (e)=> {
    setInputGoal(e.target.value)
  }

  // 키보드 입력을 확인하는 함수
  const handleKeyDown = (e)=> {
    if(e.key === "Enter") {
        handleClick();
    }
    else if(e.key === "Escape") {
      setInputGoal(prevGoal.current)
      setVisual(false)
    }
  }

  // 클릭시 입력 값 전달
  const handleClick = async ()=> {
    setVisual(false)
    // try {
    //     const result = await postUserGoal(inputGoal)
    //     console.log("서버 응답: ", result);
    // } catch (err) {
    //     console.error("에러 발생: ", err.message);
    // }
    console.log("임시 저장됨:", inputGoal);
  }

  let saveMoney = totalSave

  let percent = Math.round((saveMoney / inputGoal) * 100);

  return (
    <StyleCurrent $isMobile={isMobile} $isTablet={isTablet}>
      <div className="current">
      <p>목표달성 현황</p>

      <div className="goalSummary">
        <div className="saveMoney">{Number(totalSave).toLocaleString()}원</div>

        <div className="money">
            <span>/</span>

            {visual ?
                <>
                <input
                  value={inputGoal}
                  type="number" 
                  required
                  ref={focusRef}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  inputmode="numeric"
                  pattern="[0-9]*"
                />

                <span>원</span>
                </>
                : 
                <span className="moneyInput">
                  {Number(inputGoal).toLocaleString()}             
                </span>
            }
            

            {visual ? 
            <button onClick={handleClick} type="button">
              <img className="check" src={check} alt="수정완료"/>
            </button>
            :
            <button onClick={handleFocus} type="button" src={alter} alt="수정하기">
              <span>원</span>
              <img className="alter" src={alter} alt="수정하기" />
            </button>
            }
          </div>
        </div>

      <div className='progressBar'>
          <div className='fill' style={{ width: `${percent}%` }} />
          <div className='percentText'>{percent}%</div>
      </div>

    </div>
    </StyleCurrent>
    
  );
}