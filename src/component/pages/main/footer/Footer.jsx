import { ResponsiveContext } from "@context/ResponsiveContext";
import { useContext } from "react";
import styled from "styled-components";
import Right from "./Right";

const StyleFooter = styled.footer`
  max-width: 1024px;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  padding: ${({$isMobile, $isTablet})=>
    $isMobile ? "16px" : $isTablet ? "24px" : "20px 48px"};
  margin-top: auto;
  display: flex;
  justify-content: ${({$isMobile, $isTablet}) =>
    $isMobile || $isTablet ? "center" : "space-between"};
  align-items: ${({$isMobile, $isTablet}) =>
    $isMobile || $isTablet ? "center" : "flex-start"};
  flex-wrap: wrap;
  text-align: ${({$isMobile, $isTablet}) =>
    $isMobile || $isTablet ? "center" : "left"};
  font-size: 13px;
  line-height: 1.5;

  p{
    padding-top: 20px;
  }
`
const Info = styled.article`
  display: ${({ $isMobile, $isTablet }) => ($isMobile || $isTablet ? "none" : "block")};
  flex: 3;
`;

export default function Footer() {
    const {isMobile, isTablet} = useContext(ResponsiveContext);

    return (
        <StyleFooter $isMobile={isMobile} $isTablet={isTablet}>
            <Info $isMobile={isMobile} $isTablet={isTablet}>
                <p>(주)세이빗 | 대표 Thein 2Team<br />
                    사업자등록번호 123-45-67890 | 통신판매업 신고 2025-서울강남-1234<br />
                    서울특별시 강남구 테헤란로 123, 4층 (06123)</p>
                <p>고객센터 1588-1234 (평일 09:00~18:00) | E-mail support@saveit.co.kr</p>
            </Info>
            <Right/>
            
        </StyleFooter>
    )
}