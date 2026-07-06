export const ERP_BESI_APP_NAME = "ERP Besi";

export const productUnits = ["PCS", "KG", "TON", "BATANG"] as const;
export type ProductUnit = (typeof productUnits)[number];
