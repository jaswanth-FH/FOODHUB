import * as constants from "../types/constants";

export const CLIENTS = [
  {
    name: "client_kiosk_1",
    status: constants.StatusEnum.ACTIVE,
    type: constants.ClientTypeEnum.KIOSK,
    devices: [
      {
        ip: "122.185.69.226",
        model: "Android Kiosk",
        status: constants.StatusEnum.ACTIVE
      }
    ],
    capabilities: [
      { name: constants.FunctionsEnum.MENU, category: "FUNCTION" },
      { name: constants.FunctionsEnum.PAYMENTS, category: "FUNCTION" },
      { name: constants.FunctionsEnum.ONLINE_ORDERS, category: "FUNCTION" },
      { name: constants.FeatureKeyEnum.PAY_BY_LINK, category: "FEATURE" }
    ]
  },

  {
    name: "client_web_1",
    status: constants.StatusEnum.ACTIVE,
    type: constants.ClientTypeEnum.WEB,
    devices: [
      {
        ip: "49.204.235.155",
        model: "Chrome Browser",
        status: constants.StatusEnum.ACTIVE
      }
    ],
    capabilities: [
      { name: constants.FunctionsEnum.STORE, category: "FUNCTION" },
      { name: constants.FunctionsEnum.ORDERS, category: "FUNCTION" },
      { name: constants.FunctionsEnum.DELIVERY, category: "FUNCTION" },
      { name: constants.FunctionsEnum.ONLINE_ORDERS, category: "FUNCTION" },
      { name: constants.FunctionsEnum.OFFLINE_ORDERS, category: "FUNCTION" },
      { name: constants.FeatureKeyEnum.PAY_BY_LINK, category: "FEATURE" },
      { name: constants.FeatureKeyEnum.DELIVERY_TRACKING, category: "FEATURE" }
    ]
  },

  {
    name: "client_pos_1",
    status: constants.StatusEnum.ACTIVE,
    type: constants.ClientTypeEnum.POS,
    devices: [
      {
        ip: "115.246.238.132",
        model: "Windows POS",
        status: constants.StatusEnum.ACTIVE
      }
    ],
    capabilities: [
      { name: constants.FunctionsEnum.MENU, category: "FUNCTION" },
      { name: constants.FunctionsEnum.PAYMENTS, category: "FUNCTION" },
      { name: constants.FunctionsEnum.ONLINE_ORDERS, category: "FUNCTION" },
      { name: constants.FunctionsEnum.OFFLINE_ORDERS, category: "FUNCTION" },
      { name: constants.FeatureKeyEnum.PAY_BY_LINK, category: "FEATURE" },
      { name: constants.FeatureKeyEnum.PARTIAL_REFUND, category: "FEATURE" }
    ]
  },

  {
    name: "client_delivery_1",
    status: constants.StatusEnum.ACTIVE,
    type: constants.ClientTypeEnum.DELIVERY,
    devices: [
      {
        ip: "82.163.78.100",
        model: "Android Driver App",
        status: constants.StatusEnum.ACTIVE
      }
    ],
    capabilities: [
      { name: constants.FunctionsEnum.DELIVERY, category: "FUNCTION" },
      { name: constants.FunctionsEnum.DELIVERY_ORDERS, category: "FUNCTION" },
      { name: constants.FeatureKeyEnum.DELIVERY_TRACKING, category: "FEATURE" }
    ]
  }
];
