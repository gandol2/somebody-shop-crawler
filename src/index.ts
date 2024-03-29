import axios from "axios";
import fetch from "node-fetch";
function rand(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}
const 키워드목록 = [
  "잠옷",
  "남자팬티",
  "여성팬티",
  "커플잠옷",
  "트위드자켓",
  "남자니트",
  "원피스",
  "여성잠옷",
  "맨투맨",
  "후드티",
  "심리스팬티",
  "수면잠옷",
  "남성팬티",
  "여성코트",
  "남자조거팬츠",
  "남자슬랙스",
  "브라",
  "파자마",
  "조거팬츠",
  "티셔츠",
  "여자잠옷",
  "코트",
  "수반팔티",
  "내셔널지오그래픽패딩",
  "남자코트",
  "남자맨투맨",
  "남자트레이닝복세트",
  "남자청바지",
  "숏패딩",
  "심리스브라",
  "겨울하객원피스결혼식",
  "남자셔츠",
  "나이키맨투맨",
  "레깅스",
  "스포츠브라",
  "우비",
  "남자가디건",
  "남자레깅스",
  "커플잠옷세트",
  "몽클레어여성패딩",
  "폴로가디건",
  "남자보정속옷",
  "홈웨어",
  "트위드원피스",
  "카디건",
  "심리스레깅스팬티",
  "남자후드티",
  "남성트레이닝바지",
  "니트",
  "원피스잠옷",
  "실크잠옷",
  "땀복",
  "써스데이아일랜드원피스",
  "예작셔츠",
  "반팔티",
  "블라우스",
  "노와이어브라",
  "모달팬티",
  "핸드메이드코트",
  "가디건",
  "남자조거팬츠카고바지기모",
  "트레이닝복",
  "남자오버핏맨투맨",
  "패딩조끼",
  "밍크코트",
  "남성자켓",
  "여성자켓",
  "모조에스핀",
  "트레이닝바지",
  "여자코트",
  "점퍼",
  "청바지",
  "여성맨투맨",
  "여성바지",
  "폴로니트",
  "니트원피스",
  "바시티자켓",
  "여름원피스",
  "여성패딩",
  "기모바지",
  "모조에스핀원피스",
  "롱패딩",
  "후드집업",
  "잇미샤원피스",
  "여성가디건",
  "내셔널지오그래픽맨투맨",
  "속바지",
  "지고트원피스",
  "남자면바지",
  "여성보정속옷",
  "롱원피스",
  "남자반바지",
  "바람막이",
  "이벤트속옷",
  "밍크베스트",
  "써스데이아일랜드",
  "남자드로즈",
  "여성롱패딩",
  "남자팬티속옷드로즈",
  "올리비아로렌",
  "트렌치코트",
  "메이드복",
  "재킷",
  "아미맨투맨",
  "디즈니잠옷",
  "듀엘",
  "니트조끼",
  "패딩",
  "오버핏후드티",
  "여자맨투맨",
  "케네스레이디원피스",
  "심리스티팬티",
  "남자반팔티",
  "스커트",
  "밍크자켓",
  "제시뉴욕",
  "카고바지",
  "쉬즈미스코트",
  "남자반집업니트",
  "베네통",
  "자라",
  "여성숏패딩",
  "기모후드티",
  "여성정장",
  "남성트레이닝세트",
  "남자정장",
  "바지",
  "하객원피스",
  "트레이닝세트",
  "머슬핏반팔",
  "팬티",
  "밴딩바지",
  "브라렛",
  "잇미샤",
  "캐시미어코트",
  "여성경량패딩",
  "쥬시쥬디",
  "에고이스트",
  "항공점퍼",
  "부츠컷슬랙스",
  "메종키츠네가디건",
  "남성드로즈",
  "여자속옷",
  "나이키바람막이",
  "티팬티",
  "메종키츠네맨투맨",
  "오버핏맨투맨",
  "여성티셔츠",
  "오즈세컨",
  "여성기모바지",
  "남자목티",
  "기모나시",
  "발렌시아",
  "남자긴팔티셔츠",
  "롱스커트",
  "d팬티",
  "휴양지원피스",
  "지오다노경량패딩",
  "남자숏패딩",
  "나이키기모조거팬츠스우시클럽카",
  "나이키기모스우시후드자켓후드집업",
  "라이프워크",
  "뷔스티에원피스",
  "브라탑",
  "내셔널지오그래픽바람막이",
  "겨울남성트레이닝세트",
  "크로커다일레이디",
  "기모조거팬츠",
  "셀프웨딩드레스",
  "로카후리스",
  "기모맨투맨",
  "남자캐시미어니트",
  "스튜디오톰보이",
  "심리스드로즈팬티",
  "여성니트",
  "라코스테맨투맨",
  "무스탕",
  "경량패딩여성",
  "쉬즈미스",
  "에잇세컨즈",
];

function sleep(ms: number) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + ms);
}

async function main() {
  while (true) {
    const 선택키워드 = 키워드목록[rand(0, 키워드목록.length)];

    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://www.market-analysis.kr/api/naver/keyword?keyword=${encodeURIComponent(
        선택키워드
      )}`,
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "ko",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Pragma: "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
    };

    try {
      const response = await axios.get(
        `http://www.market-analysis.kr/api/naver/keyword?keyword=${encodeURIComponent(
          선택키워드
        )}`,
        config
      );
      console.log(response.data);
      // sleep(10);
    } catch (e) {
      console.log(e);
    }
    // console.log((await response).data);
    // await axios(config)
    //   .then(function (response) {
    //     // console.log(JSON.stringify(response.data));
    //     console.log(`[공격완료] ${선택키워드}`);
    //     sleep(10);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
  // console.log(keyowrds);
}

//* ================================ run()
main()
  .then(async () => {})
  .catch((e) => {
    console.log("[에러발생-1]");
    console.log(e);
  })
  .finally(async () => {
    // console.log(
    //   `[완료] 실행시간 : ${dayjs()
    //     .diff(start, "millisecond")
    //     .toLocaleString()}ms`
    // );
    process.exit(1);
  });
