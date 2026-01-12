"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENTS = void 0;
const constants = __importStar(require("../types/constants"));
exports.CLIENTS = [
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
];
