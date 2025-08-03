// 날짜 형식에 맞춰주는 함수
export function getDateString(date){
    return date.toISOString().split('T')[0];
}

// 스크롤에 따라 변하는 날짜 설정 함수
export function addDate(date, days){
    const d = new Date(date); // 원본 날짜 무결성 확보
    d.setDate(d.getDate() + days);
    return d;
}