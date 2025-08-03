import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import close from "@assets/close.svg";
import add from "@assets/add.svg";
import ButtonGroup from "@component/styleComponent/ButtonGroup";
import { postExpense } from "@api/expense";
import useWeeklyStore from "@stores/useWeeklyStore";
import { postSave } from "@api/save";

const SlideFadein = keyframes`
    from{
      opacity:0;
      transform: translateY(-20px);
    }
    
    to{
      opacity:1;
      transform: translate(0);
    }
`

const SlideFadeout = keyframes`
  from{
    opacity: 1;
    transform: translate(0);
  }

  to{
    opacity: 0;
    transform: translateY(-20px);
  }
`

const StyledInputForm = styled.form`
  animation: ${(props) => (props.$isClosing ? SlideFadeout : SlideFadein)} 0.5s ease-out;
  animation-fill-mode: forwards;

  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  gap: 10px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 15px;
    font-weight: bold;
    margin: 0;
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  fieldset {
    padding: 0px;
    display: flex;
    justify-content: space-between;
    border: none;
    padding: 0;

    input[type="radio"] {
      display: none;
    }

    label {
      width: 48%;
      padding: 5px;
      text-align: center;
      border: 1px solid;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
    }

    label:first-of-type {
      border-color: #e74c3c;
    }

    label:last-of-type {
      border-color: #27ae60;
    }

    input[type="radio"]:first-of-type:checked + label {
      background-color: #EF8479;
      color: white;
    }

    input[type="radio"]:last-of-type:checked + label {
      background-color: #A2E1BD;
      color: white;
    }
  }

  select,
  input[type="number"],
  textarea {
    border: 1px solid #2F80ED;
    border-radius: 6px;
    padding: 5px;
    font-size: 12px;
    resize: none;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 5px;

    .toolkit {
      padding: 0;
      border-radius: 100%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-content: center;
      
      img{
        margin: auto;      
      }
    }

  }
`;

const InputItem = forwardRef(function InputItem({ onReqClose, exposeDomRef, date, offset }, ref) {
  const [isClosing, setIsClosing] = useState(false);
  const localRef = useRef(null);
  const [kind, setKind] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [day, setDay] = useState('');
  const { fetchExpense, fetchSave } = useWeeklyStore();

  useEffect(()=> {
    setDay(date)
  },[])

  const handleRadioKind = (e) => {
    setKind(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleMoney = (e) => {
    setAmount(e.target.value);
  }

  useImperativeHandle(ref, () => ({
    reqClose(){
      setIsClosing(true);
    }
  }));

  const handleAnimationEnd = () => {
    if (isClosing) {
      onReqClose();
    }
  };

  useEffect(() => {
    if (exposeDomRef && localRef.current) {
      exposeDomRef(localRef.current);

  console.log(localRef)

    }
  }, [exposeDomRef]);

  const handleCloseClick = () => {
    setIsClosing(true);
  }

  const handleAddClick =  async() => {
    setIsClosing(true);

    if(kind === "" || category ==="") {
      alert("다 채워주세요")
    } else if (kind === "소비") {
      try {
        const kind = 1;
        // const result = 
        await postExpense(day, kind, category, amount);
        // console.log("서버 응답: ", result);
        fetchExpense(offset);
      } catch (err) {
        console.error("에러 발생: ", err.message);
      }

    } else if(kind === "저축") {
      try {
        const kind = 0;
        // const result = 
        await postSave(day, kind, category, amount);
        // console.log("서버 응답: ", result);
        fetchSave(offset);
      } catch (err) {
        console.error("에러 발생: ", err.message);
      }

    }

  }

  return (
    <StyledInputForm ref={localRef} $isClosing={isClosing} onAnimationEnd={handleAnimationEnd}>
      <h3>입력창</h3>
      <article>
        <fieldset>
          <input type="radio" id="spend" name="kind" value="소비" onChange={handleRadioKind} />
          <label htmlFor="spend">소비</label>

          <input type="radio" id="save" name="kind" value="저축"  onChange={handleRadioKind} />
          <label htmlFor="save">저축</label>
        </fieldset>
        <select id="category" defaultValue="" onChange={handleCategory}>
          <option value="" disabled>카테고리</option>
          <option value="식비">식비</option>
          <option value="주거비">주거비</option>
          <option value="교통비">교통비</option>
          <option value="생활용품">생활용품</option>
          <option value="문화생활">문화생활</option>
          <option value="경조사비">경조사비</option>
          <option value="통신비">통신비</option>
          <option value="건강/의료비">건강/의료비</option>
        </select>
        <input id="money" type="number" placeholder="금액 입력란" onChange={handleMoney}/>
        {/* <textarea
          id="memo"
          rows={3}
          maxLength={30}
          placeholder="메모를 작성해주세요"
        /> */}
      </article>
      <ButtonGroup>
        <button type="button" onClick={handleCloseClick}>
          <img src={close}></img>
        </button>
        <button type="button" className="toolkit" onClick={handleAddClick}>
          <img src={add}></img>
        </button>
      </ButtonGroup>
    </StyledInputForm>
  )
});

export default InputItem;