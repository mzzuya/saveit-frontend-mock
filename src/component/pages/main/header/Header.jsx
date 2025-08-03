import { ResponsiveContext } from "@context/ResponsiveContext"
import { useContext } from "react"
import styled from "styled-components"
import mobileLogo from '@assets/mobile_logo.svg'
import logo from '@assets/logo.svg'
import profile from '@assets/profile.svg'
import useTokenStore from '@stores/useTokenStore';
import { useNavigate } from "react-router-dom";


const StyleHeader = styled.section`
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "24px 16px" : $isTablet ? "22px 24px" : "22px 48px"};
`
const StyleLeft = styled.section`
  flex: ${({ $isMobile }) => ($isMobile ? 0 : 1)};
`
const StyleCenter = styled.section`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: ${({ $isMobile }) => ($isMobile ? "8vw" : "0")};
`
const StyleLogo = styled.img`
  display: block;
  width: auto;
  max-height: clamp(40px, 5vw, 56px);
  height: auto;
`
const StyleRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  cursor: pointer;
`
const StyleProfile = styled.img`
  display: block;
  height: clamp(18px, 4vw, 28px);
  `
const StyleUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  p{
    font-size: ${({ $isMobile, $isTablet }) => $isMobile ? "13px" : $isTablet ? "13px" : "15px"};
  }
`

export default function Header() {
  const { isMobile, isTablet } = useContext(ResponsiveContext);
  const name = localStorage.getItem("name") || "사용자";
  const { clearToken } = useTokenStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    localStorage.removeItem("name");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <StyleHeader $isMobile={isMobile} $isTablet={isTablet}>
      <StyleLeft $isMobile={isMobile}>
        {isMobile && (
          <StyleLogo className="logo" src={mobileLogo} alt="로고" />
        )}
      </StyleLeft>
      <StyleCenter $isMobile={isMobile}>
        {!isMobile && (
          <StyleLogo className="logo" src={logo} alt="로고" />
        )}
      </StyleCenter>
      <StyleRight $isMobile={isMobile} className='login'>
        <StyleUserInfo $isMobile={isMobile} $isTablet={isTablet}>
          <StyleProfile className="profile" src={profile} onClick={handleLogout}/>

          <p>{name}님, 환영합니다!</p>
        </StyleUserInfo>
        {/* {isLogin === 'false' ? <button>구글 로그인</button>:<div><img className='profile'></img><p>{userName}</p></div>} */}
      </StyleRight>
    </StyleHeader>
  )
}