export enum ClientTypeEnum {
  WEB = "WEB",
  POS = "POS",
  KIOSK = "KIOSK",
  DELIVERY = "DELIVERY"
}

export enum Status{
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED"
}

export enum ApiNameEnum {
  MENU = "MENU",
  PAYMENTS = "PAYMENTS",
  STORE = "STORE",
  ORDERS = "ORDERS",
  DELIVERY = "DELIVERY",
  ONLINE_ORDERS = "ONLINE_ORDERS",
  OFFLINE_ORDERS = "OFFLINE_ORDERS",
  DELIVERY_ORDERS = "DELIVERY_ORDERS"
}

export enum FeatureKeyEnum {
  PAY_BY_LINK = "pay_by_link",
  PARTIAL_REFUND = "partial_refund",
  DELIVERY_TRACKING = "delivery_tracking"
}
export const HEADERS = {
  CLIENT_TYPE: "X-Client-Type"
} as const;

export const ROUTES = {
  BOOTSTRAP: "/bootstrap"
} as const;

export const META = {
  VERSION: "v1"
} as const;
