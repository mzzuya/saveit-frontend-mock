import styled from "styled-components";
import Expend from "./expend/Expend";
import Goal from "./goal/Goal";
import { useContext } from 'react';
import { ResponsiveContext } from "@context/ResponsiveContext";

const StyleMainHeader = styled.section`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  gap: 24px;
  padding: ${({$isMobile, $isTablet})=>
    $isMobile ? "0 16px" : $isTablet ? "0 24px" : "0 48px"};
`

export default function MainHeader() {
    const {isMobile, isTablet} = useContext(ResponsiveContext);

    return (
        <StyleMainHeader $isMobile={isMobile} $isTablet={isTablet} className='mainHeader'>
            <Goal />
            <Expend />
        </StyleMainHeader>
    )
}