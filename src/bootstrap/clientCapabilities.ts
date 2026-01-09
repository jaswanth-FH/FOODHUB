import { ClientTypeEnum } from "../constants";

export const CLIENT_CAPABILITIES: Record<
  ClientTypeEnum,
  Record<string, boolean>
> = {
  WEB: {
    canPlaceOrder: true,
    canAcceptOrder: false,
    canCancelOrder: false
  },
  POS: {
    canPlaceOrder: true,
    canAcceptOrder: true,
    canCancelOrder: true
  },
  KIOSK: {
    canPlaceOrder: true,
    canAcceptOrder: false,
    canCancelOrder: false
  },
  DELIVERY: {
    canPlaceOrder: false,
    canAcceptOrder: false,
    canCancelOrder: false
  }
};
