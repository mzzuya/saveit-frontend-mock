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
      axios
        .post(
          "/api/analyze", 
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((res) => {
          setSummary(res.data.summary);
        })
        .catch((err) => {
          console.log("실패:", err);
          setSummary("분석 요청에 실패했습니다");
        });
    }, []);


    return (
        <StyleComment $isMobile={isMobile}>
            <article className='AIcomment'>
              <div>{summary?summary.split('\n').map((line,idx)=>(<p key={idx}>{line}</p>)):<p>소비 분석중..</p>}</div>
            </article>
        </StyleComment>
    )
}