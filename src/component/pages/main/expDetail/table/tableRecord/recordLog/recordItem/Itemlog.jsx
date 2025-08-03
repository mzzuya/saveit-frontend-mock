// 정상 작동 시키려고 memo는 빼놓음
// back 연결하고 이거 주석 풀어야 됨
import { useState } from "react"
import ButtonGroup from "@component/styleComponent/ButtonGroup";
import styled from "styled-components";
import close from "@assets/close.svg";
import edit from "@assets/edit.svg";
import deleteIco from "@assets/delete.svg";
import useWeeklyStore from "@stores/useWeeklyStore";
import { deleteExpense } from "@api/expense";
import { deleteSave } from "@api/save";

const StyleItemDetail = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    transition: max-height 0.3s ease-out;

    article {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 15px 0;
        font-size: 13px;
    }
    
    article input{
        padding: 2px 5px;
        border: 1px solid #888;
        border-radius: 4px;
        outline: none;
    }
    
    article input::placeholder{
        color: #777777;
    }
    
    article input:focus{
        background-color: #efefef;
        border: 1.5px solid #2F80ED;
    }
    `

const StyleToggleBtn = styled.label`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 0.3rem;
    color: #777;
    cursor: pointer;

    input[type=checkbox]{
        appearance: none;
        display: flex;
        align-items: center;
        position: relative;
        border: 1.2px solid #2F80ED;
        border-radius: 20px;
        width: 1.7rem;
        height: 0.9rem;
    }

    input[type=checkbox]::before{
        top: 50%;
        transform: translateY(-50%);
        content:'';
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        margin-left: 1.8px;
        border-radius: 100%;
        background-color: #2F80ED;
    }

    input[type=checkbox]:checked::before{
        left:0.75rem;
    }
`

export default function ItemLog({ setOnDetailMod, item }) {
    const [isModify, setIsModify] = useState(false);
    const [category, setCategory] = useState(item.category);
    const [amount, setAmount] = useState(item.amount);

    const updateExpense = useWeeklyStore((state) => state.updateExpense);
    const updateSave = useWeeklyStore((state) => state.updateSave);

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handleMoney = (e) => {
        setAmount(e.target.value);
    }

    const handleSave = async () => {
        const payload = {
            category,
            amount: Number(amount),
            [item.kind === "EXPENSE" ? "expenseDate" : "saveDate"]: item.date,
            kind: item.kind,
        };

        try {
            if (item.kind === "EXPENSE") {
                await updateExpense(item.id, payload);
            } else {
                await updateSave(item.id, payload);
            }
            setIsModify(false);
            setOnDetailMod("closing");
        } catch (err) {
            alert("수정 실패:", err);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            if (item.kind === "EXPENSE") {
                await deleteExpense(item.id);
            } else {
                await deleteSave(item.id);
            }
            setOnDetailMod("closing");
        } catch (err) {
            alert("삭제 실패: " + err.message);
        }
    }

    const hadleClose = () => {
        setCategory(item.category);
        setAmount(item.amount);
        setIsModify(false);
        setOnDetailMod("closing");
    }
    return (
        <StyleItemDetail>
            <StyleToggleBtn className="toggleBtn">
                <span>수정</span>
                <input role="switch" type="checkbox" checked={isModify} onChange={() => setIsModify(!isModify)} />
            </StyleToggleBtn>
            {!isModify ?
                (
                    <article>
                        <p>{category}</p>
                        <p>{amount}</p>
                        {/* <span>{memo}</span> */}
                    </article>
                ) : (
                    <article>
                        <select id="category" value={category} onChange={handleCategory}>
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
                        <input
                            type="number"
                            value={amount}
                            onChange={handleMoney}
                            placeholder={String(item.amount)} />
                        {/* <textarea placeholder={memo}/> */}
                    </article>
                )
            }
            <ButtonGroup>
                {isModify
                    &&
                    <>
                        <button onClick={handleSave} className="edit"><img src={edit} /></button>
                        <button onClick={handleDelete} className="delete"><img src={deleteIco} /></button>
                    </>
                }
                <button onClick={hadleClose} className="close">
                    <img src={close} />
                </button>
            </ButtonGroup>
        </StyleItemDetail>
    )
}