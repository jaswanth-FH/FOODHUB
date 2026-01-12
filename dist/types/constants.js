"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.META = exports.ROUTES = exports.HEADERS = exports.FeatureKeyEnum = exports.FunctionsEnum = exports.StatusEnum = exports.ClientTypeEnum = void 0;
var ClientTypeEnum;
(function (ClientTypeEnum) {
    ClientTypeEnum["WEB"] = "WEB";
    ClientTypeEnum["POS"] = "POS";
    ClientTypeEnum["KIOSK"] = "KIOSK";
    ClientTypeEnum["DELIVERY"] = "DELIVERY";
})(ClientTypeEnum || (exports.ClientTypeEnum = ClientTypeEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["ACTIVE"] = "ACTIVE";
    StatusEnum["DISABLED"] = "DISABLED";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
var FunctionsEnum;
(function (FunctionsEnum) {
    FunctionsEnum["MENU"] = "MENU";
    FunctionsEnum["PAYMENTS"] = "PAYMENTS";
    FunctionsEnum["STORE"] = "STORE";
    FunctionsEnum["ORDERS"] = "ORDERS";
    FunctionsEnum["DELIVERY"] = "DELIVERY";
    FunctionsEnum["ONLINE_ORDERS"] = "ONLINE_ORDERS";
    FunctionsEnum["OFFLINE_ORDERS"] = "OFFLINE_ORDERS";
    FunctionsEnum["DELIVERY_ORDERS"] = "DELIVERY_ORDERS";
})(FunctionsEnum || (exports.FunctionsEnum = FunctionsEnum = {}));
var FeatureKeyEnum;
(function (FeatureKeyEnum) {
    FeatureKeyEnum["PAY_BY_LINK"] = "pay_by_link";
    FeatureKeyEnum["PARTIAL_REFUND"] = "partial_refund";
    FeatureKeyEnum["DELIVERY_TRACKING"] = "delivery_tracking";
})(FeatureKeyEnum || (exports.FeatureKeyEnum = FeatureKeyEnum = {}));
exports.HEADERS = {
    CLIENT_TYPE: "X-Client-Type"
};
exports.ROUTES = {
    BOOTSTRAP: "/bootstrap",
    CLIENTS: "/clients"
};
exports.META = {
    VERSION: "v1"
};
