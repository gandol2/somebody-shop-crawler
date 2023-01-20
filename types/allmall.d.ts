export interface AllMall {
  totalCount: number;
  mallList: MallList[];
}

export interface MallList {
  mallSeq: string;
  mallName: string;
  prodCnt: string;
  mallDesc: string;
  isSmartStore: string;
  chnlSeq: string;
  mallLogo: string;
  mallGrade: string;
  defaultPayType: string;
  naverPaySaveRatio: number;
  keepCnt: number;
  repCatNm: string;
  crUrl: string;
}
