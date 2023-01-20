import axios, { AxiosRequestConfig } from "axios";
import { ProductResponse } from "../types/product";
import { SmartStoreResponse } from "../types/smartStore";
import { SortType } from "../types/types.js";
import { AllMall } from "../types/allmall";
import { URL } from "url";
import fetch, { Headers } from "node-fetch";

//* 스마트스토어 정보 획득 (url)
export async function getStoreInfo(url: string) {
  const fetchUrl = `https://m.smartstore.naver.com/i/v1/smart-stores?url=${url}`;
  const options: AxiosRequestConfig = {
    method: "GET",
    headers: {},
  };

  // const response = await fetch(fetchUrl, options);
  const response = await axios<SmartStoreResponse>(fetchUrl, options);

  if (200 === response.status) {
    return response.data;
  } else {
    throw new Error(
      `[에러] [getStoreInfo()] 스마트스토어 정보 획득 실패 - 채널URL:${url}, 응답코드:${response.status}`
    );
  }
}

//* 상품정보 획득
export async function getProducts(
  channelId: number,
  sortType: string,
  pageSize: number
) {
  const fetchUrl = `https://m.smartstore.naver.com/i/v1/stores/${channelId}/categories/ALL/products?categoryId=ALL&categorySearchType=DISPCATG&sortType=${sortType}&free=false&subscr=false&page=1&pageSize=${pageSize}`;
  const options: AxiosRequestConfig = {
    method: "GET",
    headers: {
      authority: "m.smartstore.naver.com",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "ko-KR,ko;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    },
  };

  // const response = await fetch(fetchUrl, options);
  const response = await axios<ProductResponse>(fetchUrl, options);

  if (200 === response.status) {
    return response.data;
  } else {
    throw new Error(
      `[에러] [getProducts()] 상품 정보 획득 실패 - 채널ID:${channelId}, 응답코드:${response.status}`
    );
  }
}

//! 스마트스토어 정보 획득 (채널명)
export async function getMallBasicInfo(channelName: string) {
  console.log(
    "============================================================= [getMallBasicInfo()]"
  );
  // var myH = new Headers()
  var myHeaders = new Headers();
  myHeaders.append("authority", "search.shopping.naver.com");
  myHeaders.append("referer", "https://search.shopping.naver.com/allmall");

  // //! 테스트 헤더 [시작]
  // myHeaders.append("accept", "application/json, text/plain, */*");
  // myHeaders.append("accept-language", "ko,en-US;q=0.9,en;q=0.8,ko-KR;q=0.7");
  // myHeaders.append("cache-control", "no-cache");
  // myHeaders.append("pragma", "no-cache");
  // myHeaders.append(
  //   "sec-ch-ua",
  //   `"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"`
  // );
  // myHeaders.append("sec-ch-ua-mobile", "?0");
  // myHeaders.append("sec-ch-ua-platform", `"Windows"`);
  // myHeaders.append("sec-fetch-dest", "empty");
  // myHeaders.append("sec-fetch-mode", "cors");
  // myHeaders.append("sec-fetch-site", "same-origin");
  // myHeaders.append(
  //   "user-agent",
  //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
  // );
  // myHeaders.append("Cookie", "sus_val=3C3icYNgMEGBZQcxlrrY2+Cn");
  // //! 테스트 헤더 [끝]

  const response = await fetch(
    `https://search.shopping.naver.com/allmall/api/allmall?isSmartStore=Y&keyword=${encodeURIComponent(
      channelName
    )}&page=1&sortingOrder=prodClk`,
    { method: "GET", headers: myHeaders }
  );

  try {
    // console.log(await response.text());
    const json = (await response.json()) as AllMall;

    const filter = json.mallList.filter(
      (ele) => ele.mallName.toLowerCase() === channelName.toLocaleLowerCase()
    );

    if (1 > filter.length) {
      return undefined;
    }

    return filter[0];
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

//* 스마트스토어 url 획득 (crUrl)
export async function getMallUrlByCrUrl(crUrl: string) {
  try {
    const response = await fetch(crUrl, { method: "GET", redirect: "manual" });

    // console.log("=========================");
    // console.log(response.status);
    // console.log(response.headers.get("location"));
    // console.log("=========================");

    const url = new URL(response.headers.get("location") || "");
    // console.log(url.pathname);
    return url.pathname.replace("/", "");
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

//* 채널정보 획득 (channelUrl)
export async function getMallInfo(channelUrl: string) {
  try {
    const response = await fetch(
      `https://m.smartstore.naver.com/i/v1/smart-stores?url=${channelUrl}`
    );
    const json = (await response.json()) as SmartStoreResponse;
    return json;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
