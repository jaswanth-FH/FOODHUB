import { ClientTypeEnum } from "../types/constants"

export const FEATURES = {
  "pay_by_link": {
    "enabledFor": [ClientTypeEnum.WEB, ClientTypeEnum.POS],
    "disabledFor": [ClientTypeEnum.KIOSK]
  }
}
