import { ResponsiveContext } from "@context/ResponsiveContext";
import { useContext } from "react";
import styled from "styled-components";

const StyleRight = styled.article`
  font-size: ${({$isMobile})=>($isMobile ? "9px" : "13px")};
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isMobile, $isTablet }) =>
    $isMobile || $isTablet ? "center" : "flex-end"};
  text-align: ${({ $isMobile, $isTablet }) =>
    $isMobile || $isTablet ? "center" : "right"};
  margin-top: auto;


  p{
    display: ${({ $isMobile, $isTablet }) =>
      $isMobile || $isTablet ? "none" : "block"};
  }
  span{
    display: block;
    text-align: center;
    padding-top: 12px;
  }
`

export default function Right() {
    const {isMobile, isTablet} = useContext(ResponsiveContext);

    return (
        <StyleRight $isMobile={isMobile} $isTablet={isTablet} className='footRight'>
            <p>이용약관 | 개인정보처리방침 | 전자금융거래약관 | 청소년보호정책</p>
            <span>© 2025 SaveIT, Inc. All rights reserved.</span>
        </StyleRight>
    )
}