// data/company.ts

// Безопасное глобальное объявление для TypeScript в любой среде
declare const process: {
  env: Record<string, string | undefined>;
};

export const companyConfig = {
  name: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_COMPANY_NAME) || "ИП Манасарьян Ж.В.",
  phone: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_PHONE) || "+7 (988) 515-55-15",
  phoneClean: ((typeof process !== "undefined" && process.env?.NEXT_PUBLIC_PHONE) || "+7 (988) 515-55-15").replace(/[^0-9+]/g, ""),
  ogrnip: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_OGRNIP) || "321619600000000",
  inn: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_INN) || "616100000000",
  city: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CITY) || "Ростов-на-Дону",
  tgBotName: ((typeof process !== "undefined" && process.env?.NEXT_PUBLIC_TG_BOT_NAME) || "mebel_custom_bot").replace(/^@+/, ""),
  tgManagerUrl: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_TG_MANAGER) || "https://t.me/Udobna_Chat",
  waManagerUrl: (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_WA_MANAGER) || "https://wa.me/79885155515",
};