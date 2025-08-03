// import { translateText } from '../utils/translateText'; 번역기능 import

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useTokenStore from '@stores/useTokenStore';
import logo from "@assets/login_logo.svg";
import { ResponsiveContext } from "@context/ResponsiveContext";
import Quote from "./Quote";

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginLogo = styled.div`
  width: 100%;
  margin-bottom: 6rem;
`;
const StyleLogo = styled.img`
  display: block;
  width: ${({ $isMobile }) => ($isMobile ? '70%' : 'auto')};
  height: auto;
  margin: 0 auto;
`;
const LoginBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const LoginFooter = styled.footer`
  max-width: 1024px;
  width: 100%;
  margin: 50px auto 20px;
  padding: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "16px" : $isTablet ? "24px" : "20px 48px"};
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: ${({ isMobile, isTablet }) =>
    isMobile || isTablet ? "center" : "space-between"};
  flex-wrap: wrap;
  font-size: 13px;
  line-height: 1.5;
  text-align: ${({ $isMobile, $isTablet }) =>
    $isMobile || $isTablet ? "center" : "left"};

  p {
    padding-top: 20px;
  }
`;
const FootLeft = styled.div`
  display: ${({ $isMobile, $isTablet }) => ($isMobile || $isTablet ? "none" : "block")};
  flex: 3;
`;
const FootRight = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isMobile, $isTablet }) =>
    $isMobile || $isTablet ? "center" : "flex-end"};
  text-align: ${({ $isMobile, $isTablet }) =>
    $isMobile || $isTablet ? "center" : "right"};
  font-size: ${({ $isMobile }) => ($isMobile ? "9px" : "13px")};
  margin-top: auto;

  p{
    display: ${({ $isMobile, $isTablet }) =>
    $isMobile || $isTablet ? "none" : "block"};
  }

  span {
    display: block;
    text-align: center;
    padding-top: 12px;
  }
`;
function Login() {
  const { isMobile, isTablet } = useContext(ResponsiveContext);
  const navigate = useNavigate();
  const { setToken} = useTokenStore();
  // const [quote, setQuote] = useState(null);

  // useEffect(() => {
  //   CallQuote(['business', 'success', 'famous-quotes']).then(setQuote);

  //   // 번역 버전인데 cors 오류 있어서 백단이랑 같이 처리해야됨
  //   // (async () => {
  //   //   const raw = await CallQuote(['business', 'success', 'famous-qutes']); // 명언 api 호출
  //   //   const translated = await translateText(raw.content); // 번역 api 호출
  //   //   setQuote({
  //   //     original: raw.content,
  //   //     translated,
  //   //     author: raw.author,
  //   //   });
  //   // })(); // 즉시 시행;
  // }, []);

  // // //명언 비동기 대기
  // // if (!quote) return <p>불러오는 중...</p>;

  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      const res = await axios.post(
        'http://localhost:8080/auth/google',
        { token: idToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const jwt = res.data.jwt;
      // localStorage.setItem("jwt", jwt);
      setToken(jwt);
      alert('로그인 성공!');

      const userRes = await axios.get('http://localhost:8080/user/info', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log('로그인한 유저:', userRes.data);
      const name = userRes.data.name;
      localStorage.setItem('name', name);


      navigate('/main'); // 페이지 이동
    } catch (error) {
      console.error('로그인 처리 중 에러:', error);
    }
  };

  return (
    <LoginWrapper className="LoginWrapper">
      <LoginLogo className="LoginLogo">
        <StyleLogo $isMobile={isMobile} className="logo" src={logo} alt="로고" />
      </LoginLogo>
      <LoginBtn>
        <GoogleLogin ux_mode="popup" onSuccess={handleLoginSuccess} onError={() => console.log('구글 로그인 실패')} />
      </LoginBtn>
      <Quote />
      <LoginFooter $isMobile={isMobile} $isTablet={isTablet}>
        <FootLeft $isMobile={isMobile} $isTablet={isTablet}>
          <p>
            (주)세이빗 | 대표 Thein 2Team
            <br />
            사업자등록번호 123-45-67890 | 통신판매업 신고 2025-서울강남-1234
            <br />
            서울특별시 강남구 테헤란로 123, 4층 (06123)
          </p>
          <p>고객센터 1588-1234 (평일 09:00~18:00) | E-mail support@saveit.co.kr</p>
        </FootLeft>
        <FootRight $isMobile={isMobile} $isTablet={isTablet}>
          <p>이용약관 | 개인정보처리방침 | 전자금융거래약관 | 청소년보호정책</p>
          <span>© 2025 SaveIT, Inc. All rights reserved.</span>
        </FootRight>
      </LoginFooter>
    </LoginWrapper>
  );
}

export default Login;
