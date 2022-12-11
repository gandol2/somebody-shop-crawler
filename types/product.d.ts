export interface ProductResponse {
  sortType: string;
  page: string;
  simpleProducts: SimpleProduct[];
  filterFreeDelivery: boolean;
  filterRegularSubscription: boolean;
  totalCount: number;
}

export interface SimpleProduct {
  id: string;
  category: Category;
  name: string;
  channel: Channel;
  storeKeepExclusiveProduct: boolean;
  productNo: number;
  salePrice: number;
  saleType: string;
  productStatusType: string;
  authenticationType: string;
  seoInfo: SeoInfo;
  optionUsable: boolean;
  optionStandards: any[];
  supplementProductUsable: boolean;
  naverShoppingSearchInfo: NaverShoppingSearchInfo;
  purchaseReviewInfo: PurchaseReviewInfo;
  minorPurchasable: boolean;
  isRestrictCart: boolean;
  benefitsView: BenefitsView;
  saleAmount: SaleAmount;
  reviewAmount: ReviewAmount;
  displayable: boolean;
  usableDelivery: boolean;
  representativeImageUrl: string;
  optionalImageUrls: string[];
  productDeliveryInfo: ProductDeliveryInfo;
  detailContents: DetailContents;
  enableCart: boolean;
  freeDelivery: boolean;
  todayDelivery: boolean;
  regularSubscription: boolean;
  arrivalGuarantee: boolean;
  subscriptionBenefitContent: any[];
  rmids: any[];
  rentalOneTimeFee: boolean;
  authorizationDisplay: string;
  categoryNavigations: CategoryNavigation[];
}

export interface Category {
  wholeCategoryId: string;
  wholeCategoryName: string;
  categoryId: string;
  categoryName: string;
}

export interface Channel {
  channelNo: number;
  accountNo: number;
  accountId: string;
  channelName: string;
}

export interface SeoInfo {
  sellerTags: SellerTag[];
}

export interface SellerTag {
  code: number;
  text: string;
}

export interface NaverShoppingSearchInfo {
  brandId: number;
  manufacturerName: string;
  brandName: string;
  modelName: string;
}

export interface PurchaseReviewInfo {
  purchaseReviewExposure: boolean;
}

export interface BenefitsView {
  discountedSalePrice: number;
  mobileDiscountedSalePrice: number;
  sellerImmediateDiscountAmount: number;
  mobileSellerImmediateDiscountAmount: number;
  managerImmediateDiscountAmount: number;
  mobileManagerImmediateDiscountAmount: number;
  discountedRatio: number;
  mobileDiscountedRatio: number;
  sellerPurchasePoint: number;
  mobileSellerPurchasePoint: number;
  sellerCustomerManagementPoint: number;
  mobileSellerCustomerManagementPoint: number;
  managerPurchasePoint: number;
  mobileManagerPurchasePoint: number;
  managerPurchaseExtraPoint: number;
  mobileManagerPurchaseExtraPoint: number;
  generalPurchaseReviewPoint: number;
  premiumPurchaseReviewPoint: number;
  storeMemberReviewPoint: number;
  managerGeneralPurchaseReviewPoint: number;
  managerPremiumPurchaseReviewPoint: number;
  presentContent: string;
  givePresent: boolean;
  textReviewPoint: number;
  photoVideoReviewPoint: number;
  afterUseTextReviewPoint: number;
  afterUsePhotoVideoReviewPoint: number;
  managerTextReviewPoint: number;
  managerPhotoVideoReviewPoint: number;
  managerAfterUseTextReviewPoint: number;
  managerAfterUsePhotoVideoReviewPoint: number;
}

export interface SaleAmount {
  cumulationSaleCount: number;
  recentSaleCount: number;
}

export interface ReviewAmount {
  totalReviewCount: number;
  premiumReviewCount: number;
  averageReviewScore: number;
  productSatisfactionPercent: number;
}

export interface ProductDeliveryInfo {
  deliveryFeeType: string;
  baseFee: number;
  freeConditionalAmount: number;
  differentialFeeByArea: string;
  deliveryAttributeType: string;
  deliveryBundleGroup: DeliveryBundleGroup;
}

export interface DeliveryBundleGroup {
  id: number;
}

export interface DetailContents {
  detailContentText: string;
  editorType: string;
}

export interface CategoryNavigation {
  categoryId: string;
  categoryName: string;
}
