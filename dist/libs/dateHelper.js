import dayjs from "dayjs";
// 오늘날짜 가져오기
export function getDayDate(add) {
    if (add) {
        return dayjs()
            .add(add, "day")
            .set("hours", 0)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0)
            .toDate();
    }
    else {
        return dayjs()
            .set("hours", 0)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0)
            .toDate();
    }
}
export function getDate() {
    return dayjs().toDate();
}
