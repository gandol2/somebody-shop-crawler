export interface ProductResponse {
  sortType: string;
  page: string;
  simpleProducts: SimpleProduct[];
  totalCount: number;
}

export interface SimpleProduct {
  id: number;
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
  supplementProductUsable: boolean;
  naverShoppingSearchInfo: NaverShoppingSearchInfo?;
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
  saleStartDate?: string;
  saleEndDate?: string;
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
  text: string;
}

export interface NaverShoppingSearchInfo {
  brandId?: number | undefined;
  manufacturerName?: string | undefined;
  brandName?: string | undefined;
  modelName?: string | undefined;
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
  deliveryAttributeType: string;
  deliveryBundleGroup?: DeliveryBundleGroup;
}

export interface DeliveryBundleGroup {
  id: number;
}

export interface DetailContents {
  editorType: string;
}

export interface CategoryNavigation {
  categoryId: string;
  categoryName: string;
}
