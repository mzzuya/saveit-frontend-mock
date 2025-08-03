import styled from "styled-components";
import RecordSumm from "./RecordSumm";
import RecordLog from "./recordLog/RecordLog";

const StyleTableRecord = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;
  max-width: 140px;
  flex-shrink: 0;

  h3{
    font-size: 16px;
    font-weight: 600;
    color: #666;
  }
`;

export default function TableRecord({ date, expense, save, offset }) {
  return (
    <StyleTableRecord className="tableRecord">
      <h3>{date}</h3>
      <RecordSumm expense={expense} save={save}/>
      <RecordLog expense={expense} save={save} date={date} offset={offset}/>
    </StyleTableRecord>
  );
}
