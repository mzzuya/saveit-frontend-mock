export default function GetDate(range) {
    //날짜 보정 용
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    return (
        Array.from({ length: range * 2 + 1 }, (_, idx) => {
            const day = new Date(today);
            day.setDate(today.getDate() + (idx - range));
            return {
                year: day.getFullYear(),
                month: day.getMonth() + 1,
                date: day.getDate(),
            };
        })
    )
}