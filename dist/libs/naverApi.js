import axios from "axios";
export async function getStoreInfo(url) {
    const fetchUrl = `https://m.smartstore.naver.com/i/v1/smart-stores?url=${url}`;
    const options = {
        method: "GET",
        headers: {},
    };
    // const response = await fetch(fetchUrl, options);
    const response = await axios(fetchUrl, options);
    if (200 === response.status) {
        return response.data;
    }
    else {
        throw new Error(`[에러] [getStoreInfo()] 스마트스토어 정보 획득 실패 - 채널URL:${url}, 응답코드:${response.status}`);
    }
}
export async function getProducts(channelId, sortType, pageSize) {
    const fetchUrl = `https://m.smartstore.naver.com/i/v1/stores/${channelId}/categories/ALL/products?categoryId=ALL&categorySearchType=DISPCATG&sortType=${sortType}&free=false&subscr=false&page=1&pageSize=${pageSize}`;
    const options = {
        method: "GET",
        headers: {
            authority: "m.smartstore.naver.com",
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "ko-KR,ko;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        },
    };
    // const response = await fetch(fetchUrl, options);
    const response = await axios(fetchUrl, options);
    if (200 === response.status) {
        return response.data;
    }
    else {
        throw new Error(`[에러] [getProducts()] 상품 정보 획득 실패 - 채널ID:${channelId}, 응답코드:${response.status}`);
    }
}
