export interface ChannelOption {
  no: number?;
  name: string?;
  grade: string?;
  contactTel: string?;
  address: string?;
  email: string?;
  saleCount: number?;
  birthDay: Date?;
  productCount: number?;
  representName: string?;
  representativeName: string?;
  businessType: string?;
  firstCategoriesStr: string?;
  firstCategoriesCreateDate: Date?;
  priorityRate: number;
}

export interface SalesResult {
  channelUrl: String;
  channelNo: Number;
  channelName: String;
  productId: String;
  productName: String;
  price: Number;
  saleCount6M: Number;
  saleAmount6M: Number;
  saleCount3D: Number;
  saleAmount3D: Number;
  salCount6MAvg1D: Number;
  salAmount6MAvg1D: Number;
  salCount3DAvg1D: Number;
  salAmount3DAvg1D: Number;
  url: String;
}

export const SortType = {
  POPULAR: "POPULAR", // 인기도순
  TOTALSALE: "TOTALSALE", // 누적판매순
  LOWPRICE: "LOWPRICE", // 낮은가격순
  RECENT: "RECENT", // 최신등록순
  REVIEW: "REVIEW", // 리뷰많은순
  SATISFACTION: "SATISFACTION", // 평점높은순
};
// export enum SortType {
//   POPULAR = "POPULAR", // 인기도순
//   TOTALSALE = "TOTALSALE", // 누적판매순
//   LOWPRICE = "LOWPRICE", // 낮은가격순
//   RECENT = "RECENT", // 최신등록순
//   REVIEW = "REVIEW", // 리뷰많은순
//   SATISFACTION = "SATISFACTION", // 평점높은순
// }
