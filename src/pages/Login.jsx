import styled from 'styled-components';
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useTokenStore from '../store/useTokenStore';
import { useEffect } from 'react';
// import logo from '../assets/login_logo.svg';

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
`
const StyleLogo = styled.img`
  display: block;
  width: auto;
  height: auto;
  margin: 0 auto;
`
const LoginBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`
const Quote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;

  h1 {
    font-size: 20px;
    font-weight: 500;
    color: #555;
    margin-bottom: 12px;
  }
  p {
    font-size: 14px;
    color: #999;
  }
`
const LoginFooter = styled.footer`
  max-width: 1024px;
  width: 100%;
  margin: 50px auto 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 13px;

  p{
    margin: 4px 0;
    line-height: 1.4;
  }
  span {
    margin-top: 6px;
    display: block;
  }
`
const FootLeft = styled.div`
  display: block  ;
  flex: 3;
`;
const FootRight = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;

  span{
    display: block;
    text-align: center;
    margin-top: 8px;
  }
`
;

function Login() {
  const navigate = useNavigate();
  const { setToken } = useTokenStore();

  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;


    console.log("idToken:", idToken);
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/google",
        { token: idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const jwt = res.data.jwt;
      // localStorage.setItem("jwt", jwt);
      setToken(jwt);
      alert("로그인 성공!");

      const userRes = await axios.get("http://localhost:8080/user/info", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("로그인한 유저:", userRes.data);

      navigate("/main"); // 페이지 이동
    } catch (error) {
      console.error("로그인 처리 중 에러:", error);
    }
  };

  return (
    <LoginWrapper>
      <LoginLogo>
          {/* <StyleLogo className="logo" src={logo} alt="로고" /> */}
      </LoginLogo>
      <LoginBtn>
        <GoogleLogin
        ux_mode="popup"
        onSuccess={handleLoginSuccess}
        onError={() => console.log("구글 로그인 실패")}
        />
      </LoginBtn>
      <Quote>
        <h1>❝ 절약은 가장 확실한 수입이다. ❞</h1>
        <p>─ 벤자민 프랭클린</p>
      </Quote>
      <LoginFooter>
          <FootLeft>
            <p>(주)세이빗 | 대표 Thein 2Team<br />
                사업자등록번호 123-45-67890 | 통신판매업 신고 2025-서울강남-1234<br />
                서울특별시 강남구 테헤란로 123, 4층 (06123)</p>
            <p>고객센터 1588-1234 (평일 09:00~18:00) | E-mail support@saveit.co.kr</p>
          </FootLeft>
          <FootRight>
            <p>이용약관 | 개인정보처리방침 | 전자금융거래약관 | 청소년보호정책</p>
            <span>© 2025 SaveIT, Inc. All rights reserved.</span>
          </FootRight>
      </LoginFooter>
    </LoginWrapper>
  );
}

export default Login;