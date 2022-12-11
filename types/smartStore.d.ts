export interface SmartStoreResponse {
  channelNo: number;
  displayConfig: DisplayConfig;
  categoryConfig: CategoryConfig;
  channel: Channel;
  firstCategories: FirstCategory[];
  productCount: number;
  exhibitions: any[];
  specialProducts: SpecialProducts;
  isWebtoonStudio: boolean;
  isLineLuxury: boolean;
}

export interface DisplayConfig {
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  revision: number;
  channelNo: number;
  commonConfig: CommonConfig;
  widgets: Widgets;
}

export interface CommonConfig {
  navigationType: string;
  colorType: string;
  colorCode: string;
  recentlySelectedColors: any[];
}

export interface Widgets {
  storeNameWidget: StoreNameWidget;
  categoryMenuWidget: CategoryMenuWidget;
  promotionBannerWidget: PromotionBannerWidget;
  sellerInfoWidget: SellerInfoWidget;
  benefitBannerWidget: BenefitBannerWidget;
  bestProductWidget: BestProductWidget;
  newProductWidget: NewProductWidget;
  bestReviewWidget: BestReviewWidget;
  customProductWidget: CustomProductWidget;
  customProductWidget1: CustomProductWidget1;
  customProductWidget2: CustomProductWidget2;
  shoppingStoryWidget: ShoppingStoryWidget;
  exhibitionBannerWidget: ExhibitionBannerWidget;
  customBannerWidget: CustomBannerWidget;
  storyProductWidget: StoryProductWidget;
  wholeProductWidget: WholeProductWidget;
  footerWidget: FooterWidget;
}

export interface StoreNameWidget {
  visible: boolean;
  order: number;
  type: string;
  nameType: string;
  textColor: string;
  displayName: string;
  logo: Logo;
  mobileLogo: MobileLogo;
  isMobileGNBColorWhite: boolean;
}

export interface Logo {
  property: string;
  width: number;
  height: number;
}

export interface MobileLogo {
  property: string;
  width: number;
  height: number;
}

export interface CategoryMenuWidget {
  visible: boolean;
  order: number;
  type: string;
  categoryMenus: CategoryMenus;
  menus: Menus;
}

export interface CategoryMenus {
  BEST: Best;
}

export interface Best {
  type: string;
  title: string;
  visible: boolean;
}

export interface Menus {
  SHOPPING_STORY: ShoppingStory;
  EXHIBITION: Exhibition;
  REVIEW_EVENT: ReviewEvent;
  PROFILE: Profile;
  NOTICE: Notice;
  QNA: Qna;
}

export interface ShoppingStory {
  type: string;
  title: string;
  visible: boolean;
}

export interface Exhibition {
  type: string;
  title: string;
  visible: boolean;
}

export interface ReviewEvent {
  type: string;
  title: string;
  visible: boolean;
}

export interface Profile {
  type: string;
  title: string;
  visible: boolean;
}

export interface Notice {
  type: string;
  title: string;
  visible: boolean;
}

export interface Qna {
  type: string;
  title: string;
  visible: boolean;
}

export interface PromotionBannerWidget {
  visible: boolean;
  order: number;
  type: string;
  items: Item[];
}

export interface Item {
  id: number;
  visible: boolean;
  mobileImage: MobileImage;
  pcImage: PcImage;
  textColor: string;
  title: string;
  linkType: string;
}

export interface MobileImage {
  property: string;
  width: number;
  height: number;
}

export interface PcImage {
  property: string;
  width: number;
  height: number;
}

export interface SellerInfoWidget {
  visible: boolean;
  order: number;
  type: string;
  storeGradeVisible: boolean;
  dataLabVisible: boolean;
  todayVisitCountVisible: boolean;
  totalVisitCountVisible: boolean;
}

export interface BenefitBannerWidget {
  visible: boolean;
  order: number;
  type: string;
}

export interface BestProductWidget {
  visible: boolean;
  order: number;
  type: string;
  title: string;
  thumbnailShapeType: string;
  aggregationType: string;
  displayCount: number;
}

export interface NewProductWidget {
  visible: boolean;
  order: number;
  type: string;
  title: string;
  thumbnailShapeType: string;
  displayCount: number;
}

export interface BestReviewWidget {
  visible: boolean;
  order: number;
  type: string;
  title: string;
  productNos: number[];
  selectType: string;
}

export interface CustomProductWidget {
  visible: boolean;
  order: number;
  type: string;
  title: string;
  productDisplayType: string;
  listProduct: ListProduct;
  mosaicProduct: MosaicProduct;
  fullImageProduct: FullImageProduct;
}

export interface ListProduct {
  thumbnailShapeType: string;
  productNos: any[];
  displayCount: number;
}

export interface MosaicProduct {
  mainTitle: string;
  subTitle: string;
  products: Product[];
}

export interface Product {
  id: number;
  displayImage: DisplayImage;
}

export interface DisplayImage {
  url: string;
  width: number;
  height: number;
  originalUrl: string;
  top: number;
  left: number;
}

export interface FullImageProduct {
  products: Product2[];
}

export interface Product2 {
  id: number;
  displayImage: DisplayImage2;
}

export interface DisplayImage2 {
  url: string;
  width: number;
  height: number;
  originalUrl: string;
  top: number;
  left: number;
}

export interface CustomProductWidget1 {
  visible: boolean;
  order: number;
  type: string;
  title: string;
  productDisplayType: string;
  listProduct: ListProduct2;
  mosaicProduct: MosaicProduct2;
  fullImageProduct: FullImageProduct2;
}

export interface ListProduct2 {
  thumbnailShapeType: string;
  productNos: any[];
  displayCount: number;
}

export interface MosaicProduct2 {
  mainTitle: string;
  subTitle: string;
  products: Product3[];
}

export interface Product3 {
  id: number;
  displayImage: DisplayImage3;
}

export interface DisplayImage3 {
  url: string;
  width: number;
  height: number;
  originalUrl: string;
  top: number;
  left: number;
}

export interface FullImageProduct2 {
  products: Product4[];
}

export interface Product4 {
  id: number;
  displayImage: DisplayImage4;
}

export interface DisplayImage4 {
  url: string;
  width: number;
  height: number;
  originalUrl: string;
  top: number;
  left: number;
}

export interface CustomProductWidget2 {
  visible: boolean;
  order: number;
  type: string;
  title: string;
  productDisplayType: string;
  listProduct: ListProduct3;
  mosaicProduct: MosaicProduct3;
  fullImageProduct: FullImageProduct3;
}

export interface ListProduct3 {
  thumbnailShapeType: string;
  productNos: any[];
  displayCount: number;
}

export interface MosaicProduct3 {
  mainTitle: string;
  subTitle: string;
  products: Product5[];
}

export interface Product5 {
  id: number;
  displayImage: DisplayImage5;
}

export interface DisplayImage5 {
  url: string;
  width: number;
  height: number;
  originalUrl: string;
  top: number;
  left: number;
}

export interface FullImageProduct3 {
  products: Product6[];
}

export interface Product6 {
  id: number;
  displayImage: DisplayImage6;
}

export interface DisplayImage6 {
  url: string;
  width: number;
  height: number;
  originalUrl: string;
  top: number;
  left: number;
}

export interface ShoppingStoryWidget {
  visible: boolean;
  order: number;
  type: string;
  title: string;
  selectType: string;
  shoppingStoryIds: any[];
}

export interface ExhibitionBannerWidget {
  visible: boolean;
  order: number;
  type: string;
}

export interface CustomBannerWidget {
  visible: boolean;
  order: number;
  type: string;
  banners: Banner[];
}

export interface Banner {
  id: number;
  visible: boolean;
  mobileImage: MobileImage2;
  pcImage: PcImage2;
  linkType: string;
}

export interface MobileImage2 {
  url: string;
  width: number;
  height: number;
}

export interface PcImage2 {
  url: string;
  width: number;
  height: number;
}

export interface StoryProductWidget {
  visible: boolean;
  order: number;
  type: string;
  thumbnailShapeType: string;
  sortType: string;
  productNos: any[];
  productDescriptionMap: ProductDescriptionMap;
  rankingVisible: boolean;
  rankingAggregationType: string;
  bestReviewVisible: boolean;
  shoppingStoryVisible: boolean;
}

export interface ProductDescriptionMap {}

export interface WholeProductWidget {
  visible: boolean;
  order: number;
  type: string;
  title: string;
  thumbnailShapeType: string;
  selectType: string;
  productNos: any[];
  sortType: string;
}

export interface FooterWidget {
  visible: boolean;
  order: number;
  type: string;
  storeLogo: StoreLogo;
}

export interface StoreLogo {
  logoImage: LogoImage;
  visible: boolean;
}

export interface LogoImage {
  property: string;
  width: number;
  height: number;
}

export interface CategoryConfig {
  channelNo: number;
  categoryDisplayType: string;
  categoryProductListProp: CategoryProductListProp;
}

export interface CategoryProductListProp {
  imageShapeType: string;
  imageDisplayType: string;
  productUnitAddInfo: ProductUnitAddInfo;
}

export interface ProductUnitAddInfo {
  cartVisible: boolean;
  colorChipVisible: boolean;
  starRatingVisible: boolean;
}

export interface Channel {
  id: number;
  channelServiceType: string;
  channelExternalStatusType: string;
  channelName: string;
  url: string;
  representImageInfoList: RepresentImageInfoList[];
  talkExposureYn: boolean;
  description: string;
  contactInfo: ContactInfo;
  representType: string;
  identity: string;
  representName: string;
  representativeName: string;
  businessType: string;
  declaredToOnlineMarkettingNumber: string;
  businessAddressInfo: BusinessAddressInfo;
  accountNo: number;
  accountId: string;
  mallSeq: number;
  naverAccountId: string;
  chrgrEmail: string;
  naverPayNo: number;
  payReferenceKey: string;
  actionGrade: string;
  serviceSatisfactionGrade: boolean;
  saleCount: number;
  csResponseRatio: number;
  in2DaysDeliveryCompleteRatio: number;
  averageSaleSatificationScore: number;
  naSiteId: string;
  naverAnalytics: string;
  representativeImageUrl: string;
  isBusiness: boolean;
  representTelephoneNumber: string;
  isDomesticPhoneNumber: boolean;
  domesticTelephoneNumberReported: boolean;
  isDomesticTelephoneNumberReportable: boolean;
  domesticTelephoneNumberCertified: boolean;
  productAuthCategoryTypes: string[];
  representativeBirthDay: string;
  brandStoreExhibitionYn: boolean;
  brandStoreName: string;
  brandUrl: string;
  brandCatalogUseYn: boolean;
  brandDisplayReinforceYn: boolean;
  blogExposureYn: boolean;
  clovaMDCompareYn: boolean;
  clovaMDPurchaseYn: boolean;
  clovaMDUserFriendlyYn: boolean;
  arrivalGuaranteeUseYn: boolean;
}

export interface RepresentImageInfoList {
  imageUrl: string;
  imageClass: string;
  width: number;
  height: number;
  fileSize: number;
  sortOrder: number;
  representative: boolean;
}

export interface ContactInfo {
  displayTelNo: boolean;
  disabledDomesticTelNo: boolean;
  telNo: TelNo;
  overseaTelNo: OverseaTelNo;
  onlineSales: boolean;
  offlineSales: boolean;
}

export interface TelNo {
  countryCode: string;
  phoneNo: string;
  formattedNumber: string;
}

export interface OverseaTelNo {
  countryCode: string;
  phoneNo: string;
  formattedNumber: string;
}

export interface BusinessAddressInfo {
  address: string;
  apiType: string;
  basicAddress: string;
  detailAddress: string;
  fullAddressInfo: string;
  hasJibunAddress: boolean;
  hasRoadNameAddress: boolean;
  latitude: string;
  longitude: string;
  massiveAddress: string;
  naverMapCode: string;
  newZipCode: string;
  overseas: boolean;
  placeId: string;
  representAddressType: string;
  zipCode: string;
}

export interface FirstCategory {
  createdDate: string;
  lastModifiedDate: string;
  revision: number;
  id: string;
  channelNo: number;
  type: string;
  name: string;
  categoryId: string;
  parentCategoryId: string;
  superiorCategoryId: string;
  wholeCategoryId: string;
  wholeCategoryName: string;
  parentStoreCategoryId: string;
  superiorStoreCategoryId: string;
  wholeStoreCategoryId: string;
  level: number;
  sortOrder: number;
  allProductCategory: boolean;
  exposure: boolean;
  selfExposure: boolean;
  productSortType: string;
  productDisplayType: string;
  recommendProductConfig?: RecommendProductConfig;
  mappingConfig?: MappingConfig;
  imageUse?: boolean;
  listImage?: ListImage;
  additionalListImage?: AdditionalListImage;
  pageImage?: PageImage;
  mergeUpdatedDate?: string;
}

export interface RecommendProductConfig {
  exposure: boolean;
  titleContentType: string;
  sortType: string;
}

export interface MappingConfig {
  mappingType: string;
  mappingCount: number;
}

export interface ListImage {
  property: string;
  width: number;
  height: number;
}

export interface AdditionalListImage {
  property: string;
  width: number;
  height: number;
}

export interface PageImage {
  property: string;
  width: number;
  height: number;
}

export interface SpecialProducts {
  bestProductNos: number[];
  newProductNos: number[];
}
