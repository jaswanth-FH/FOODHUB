import *  as constants from "../types/constants";


export const CLIENTS = [
  {
    "id": "client_kiosk_1",
    "status": constants.StatusEnum.ACTIVE,
    "type": constants.ClientTypeEnum.KIOSK,
    "devices": [
      {
        "ip": "122.185.69.226",
        "model": "Android Kiosk",
        "status": constants.StatusEnum.ACTIVE
      }
    ],
    "capabilities": [
      {
        "name": constants.FunctionsEnum.MENU,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.PAYMENTS,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.ONLINE_ORDERS,
        "category": "function"
      },
      {
        "name": constants.FeatureKeyEnum.PAY_BY_LINK,
        "category": "feature"
      }
    ]
  },
  {
    "id": "client_web_1",
    "status": constants.StatusEnum.ACTIVE,
    "type": constants.ClientTypeEnum.WEB,
    "devices": [
      {
        "ip": "49.204.235.155",
        "model": "Chrome Browser",
        "status": constants.StatusEnum.ACTIVE
      }
    ],
    "capabilities": [
      {
        "name": constants.FunctionsEnum.STORE,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.ORDERS,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.DELIVERY,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.ONLINE_ORDERS,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.OFFLINE_ORDERS,
        "category": "function"
      },
      {
        "name": constants.FeatureKeyEnum.PAY_BY_LINK,
        "category": "feature"
      },
      {
        "name": constants.FeatureKeyEnum.DELIVERY_TRACKING,
        "category": "feature"
      }
    ]
  },
  {
    "id": "client_pos_1",
    "status": constants.StatusEnum.ACTIVE,
    "type": constants.ClientTypeEnum.POS,
    "devices": [
      {
        "ip": "115.246.238.132",
        "model": "Windows POS",
        "status": constants.StatusEnum.ACTIVE
      }
    ],
    "capabilities": [
      {
        "name": constants.FunctionsEnum.MENU,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.PAYMENTS,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.ONLINE_ORDERS,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.OFFLINE_ORDERS,
        "category": "function"
      },
      {
        "name": constants.FeatureKeyEnum.PAY_BY_LINK,
        "category": "feature"
      },
      {
        "name": constants.FeatureKeyEnum.PARTIAL_REFUND,
        "category": "feature"
      }
    ]
  },
  {
    "id": "client_delivery_1",
    "status": constants.StatusEnum.ACTIVE,
    "type": constants.ClientTypeEnum.DELIVERY,
    "devices": [
      {
        "ip": "82.163.78.100",
        "model": "Android Driver App",
        "status": constants.StatusEnum.ACTIVE
      }
    ],
    "capabilities": [
      {
        "name": constants.FunctionsEnum.DELIVERY,
        "category": "function"
      },
      {
        "name": constants.FunctionsEnum.DELIVERY_ORDERS,
        "category": "function"
      },
      {
        "name": constants.FeatureKeyEnum.DELIVERY_TRACKING,
        "category": "feature"
      }
    ]
  }
]