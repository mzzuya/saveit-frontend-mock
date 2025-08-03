import styled from "styled-components";
import { ResponsiveContext } from "@context/ResponsiveContext"
import { useContext } from "react"
import StyleCard from "@component/styleComponent/StyleCard";
import Expension from "./Expension";
import Current from "./Current";

const GoalCard = styled(StyleCard)`
  flex: 0 1 35%;
  min-width: ${({ $isMobile, $isTablet }) => ($isMobile ? "100%" : $isTablet ? "290px": "320px")};
` 

export default function Goal() {
    const {isMobile, isTablet} = useContext(ResponsiveContext);
    return (
        <GoalCard className='goal' $isMobile={isMobile} $isTablet={isTablet}>
            <Current/>
            <Expension/>
        </GoalCard>
    )
}