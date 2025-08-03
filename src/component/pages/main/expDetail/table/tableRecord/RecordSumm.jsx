import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const StyleSumm = styled.article`
    border-top: 1px solid #d9d9d9;
    margin: 8px 0;
    padding: 4px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        display: flex;
        width: 100%;
        margin: 4px 0;
        font-size: 14.5px;
        font-weight: 700;
    }

    .label {
        flex: 0 0 auto;
    }

    .value {
        color: #212529;
        flex: 1 1 auto;
        text-align: right;
    }

    .exspand {
        color: #e74c3c; /* 빨강 */
        gap: 7px;
    }

    .saving {
        color: #27ae60; /* 초록 */
        gap: 7px;
    }
`
export default function RecordSumm({ expense, save }) {
  const totalExpense = useMemo(() => {
    return expense.reduce((sum, e) => sum + e.amount, 0);
  }, [expense]);


  const totalSave = useMemo(() => {
    return save.reduce((sum, e) => sum + e.amount, 0);
  }, [save]);

    return (
        <StyleSumm className="summary">
            <p className="exspand"><span className="label">소비</span> <span className="value">₩ {totalExpense.toLocaleString()}</span></p>
            <p className="saving"><span className="label">저축</span> <span className="value">₩ {totalSave.toLocaleString()}</span></p>

        </StyleSumm>
    )
}