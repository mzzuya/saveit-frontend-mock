import styled from "styled-components";
import StyleCard from "@component/styleComponent/StyleCard";
import { ResponsiveContext } from "@context/ResponsiveContext";
import AI_Comment from "./AI_Comment";
import Graph from "./Graph";
import { useContext } from 'react';

const ExpCard = styled(StyleCard)`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  justify-content: space-between;
  align-items: center;
  gap: ${({ $isTablet }) => ($isTablet ? "20px" : "40px")};
  width: 100%;
`

export default function Expend() {
    const {isMobile, isTablet} = useContext(ResponsiveContext);

    return (
        <ExpCard $isMobile={isMobile} $isTablet={isTablet} className="expend">
            <AI_Comment/>
            <Graph/>
        </ExpCard>
    )
}