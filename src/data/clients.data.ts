import *  as constants from "../types/constants";


export const CLIENTS = [
  {
    "id": "client_kiosk_1",
    "type": constants.ClientTypeEnum.KIOSK,
    "status": constants.StatusEnum.ACTIVE,
    "functions": [
      constants.FunctionsEnum.MENU,
      constants.FunctionsEnum.PAYMENTS,
      constants.FunctionsEnum.ONLINE_ORDERS
    ],
    "features": [
      constants.FeatureKeyEnum.PAY_BY_LINK
    ],
    "devices": [
      {
        "id": "device_kiosk_01",
        "model": "Android Kiosk",
        "ip": "122.185.69.226",
        "status": constants.StatusEnum.ACTIVE
      }
    ],
    "meta": {
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-08T10:00:00Z"
    }
  },
  {
    "id": "client_web_1",
    "type": constants.ClientTypeEnum.WEB,
    "status": constants.StatusEnum.ACTIVE,
    "functions": [
      constants.FunctionsEnum.STORE,
      constants.FunctionsEnum.ORDERS,
      constants.FunctionsEnum.DELIVERY,
      constants.FunctionsEnum.ONLINE_ORDERS,
      constants.FunctionsEnum.OFFLINE_ORDERS
    ],
    "features": [
      constants.FeatureKeyEnum.PAY_BY_LINK,
      constants.FeatureKeyEnum.DELIVERY_TRACKING
    ],
    "devices": [
      {
        "id": "device_web_01",
        "model": "Chrome Browser",
        "ip": "49.204.235.155",
        "status": "ACTIVE"
      }
    ],
    "meta": {
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-08T10:05:00Z"
    }
  },
  {
    "id": "client_pos_1",
    "type": constants.ClientTypeEnum.POS,
    "status": constants.StatusEnum.ACTIVE,
    "functions": [
      constants.FunctionsEnum.MENU,
      constants.FunctionsEnum.PAYMENTS,
      constants.FunctionsEnum.ONLINE_ORDERS,
      constants.FunctionsEnum.OFFLINE_ORDERS
    ],
    "features": [
      constants.FeatureKeyEnum.PAY_BY_LINK,
      constants.FeatureKeyEnum.PARTIAL_REFUND
    ],
    "devices": [
      {
        "id": "device_pos_01",
        "model": "Windows POS",
        "ip": "115.246.238.132",
        "status": "ACTIVE"
      }
    ],
    "meta": {
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-08T10:10:00Z"
    }
  },
  {
    "id": "client_delivery_1",
    "type": constants.ClientTypeEnum.DELIVERY,
    "status": constants.StatusEnum.ACTIVE,
    "functions": [
      constants.FunctionsEnum.DELIVERY,
      constants.FunctionsEnum.DELIVERY_ORDERS
    ],
    "features": [
      constants.FeatureKeyEnum.DELIVERY_TRACKING
    ],
    "devices": [
      {
        "id": "device_delivery_01",
        "model": "Android Driver App",
        "ip": "82.163.78.100",
        "status": constants.StatusEnum.ACTIVE
      }
    ],
    "meta": {
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-08T10:15:00Z"
    }
  }
]