import styled from "styled-components"
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { ResponsiveContext } from "@context/ResponsiveContext";

const StyleComment = styled.article`
  flex: 2;
  min-width: 0;
  text-align: ${({ $isMobile }) => ($isMobile ? "center" : "right")};

  h3{
    font-size: 18px;
    font-weight: bold;
  }
  p{
    font-size: 15px;
    padding: 3px 0;
  }
  span{
    font-size: 13px;
  }
`

export default function AI_Comment() {
    const {isMobile} = useContext(ResponsiveContext);
    const[summary,setSummary] =useState("");

    useEffect(() => {
      // axios
      //   .post(
      //     "/api/analyze", 
      //     {},
      //     {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     setSummary(res.data.summary);
      //   })
      //   .catch((err) => {
      //     console.log("실패:", err);
      //     setSummary("분석 요청에 실패했습니다");
      //   });
      setSummary(`이번 달 소비가 예산보다 20% 많았습니다.
      외식비가 평균보다 높았고, 교통비도 증가했습니다.
      절약을 위해 식비와 커피 지출을 줄여보세요.`);
    }, []);


    return (
        <StyleComment $isMobile={isMobile}>
            <article className='AIcomment'>
              <div>{summary?summary.split('\n').map((line,idx)=>(<p key={idx}>{line}</p>)):<p>소비 분석중..</p>}</div>
            </article>
        </StyleComment>
    )
}