import GetDate from "../utils/GetDate";

const dates = GetDate(3);

const weeklyRecords = [
        {
            date: dates[0],
            entries: [
                { kind: '소비', category: '식비', amount: 12000 },
                { kind: '소비', category: '교통', amount: 3500 },
            ]
        },
        {
            date: dates[1],
            entries: [
                { kind: '소비', category: '커피', amount: 4500 },
                { kind: '저축', category: '정기적금', amount: 20000 },
            ]
        },
        {
            date: dates[2],
            entries: [
                { kind: '소비', category: '문화', amount: 15000 },
                { kind: '소비', category: '식비', amount: 10000 },
            ]
        },
        {
            date: dates[3],
            entries: [
                { kind: '소비', category: '쇼핑', amount: 30000 },
            ]
        },
        {
            date: dates[4],
            entries: [
                { kind: '소비', category: '교통', amount: 3500 },
                { kind: '소비', category: '간식', amount: 2500 },
            ]
        },
        {
            date: dates[5],
            entries: [
                { kind: '소비', category: '운동', amount: 10000 },
                { kind: '소비', category: '식비', amount: 8000 },
                { kind: '저축', category: '비상금', amount: 5000 },
            ]
        },
        {
            date: dates[6],
            entries: []
        }
    ];

export default weeklyRecords;