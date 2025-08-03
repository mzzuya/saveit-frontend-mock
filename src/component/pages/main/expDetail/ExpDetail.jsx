import { ResponsiveContext } from "@context/ResponsiveContext"
import { useContext } from "react"
import styled from "styled-components"
import Table from "./table/Table"

const StyleExpDetail = styled.section`
  width: 100%;
  max-width: 1024px;
  overflow-x: auto;
  padding: ${({$isMobile, $isTablet})=>
    $isMobile ? "24px 16px" : $isTablet ? "22px 24px" : "22px 48px"};
  margin-bottom: 20px;
`

export default function ExpDetail() {
  const {isMobile, isTablet} = useContext(ResponsiveContext);

  return(
  <StyleExpDetail className='expDetail' $isMobile={isMobile} $isTablet={isTablet}>
    <Table />
  </StyleExpDetail>
  )
}
{/* <p className="Date">000</p> */}
{/* <article className="expTable">
  테이블이에요
  <div>
    <div>
      날짜
    </div>
  </div>
  <div>
    <div>
      <div>
        <p className='dayExp'>일 소비 합계</p>
        <p className='daySave'>일 저축 합계</p>
      </div>
      <article>
        <div className='expLog'>어디에 0000원</div>
        <button className='addExp'>+</button>
      </article>
    </div>
  </div>
</article> */}