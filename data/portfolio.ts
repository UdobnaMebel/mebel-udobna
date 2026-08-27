// data/portfolio.ts

export interface SpecItem {
  label: string;
  value: string;
}

export type FurnitureCategory = "Все" | "Кухни" | "Шкафы и гардеробные" | "Мебель под ключ" | "Шкафы-кровати";

export interface ProjectCase {
  id: number;
  title: string;
  furnitureType: FurnitureCategory;
  category: string; // ЖК / Район
  complex: string;
  address: string;
  image: string;
  fallbackImage: string;
  specs: SpecItem[];
  days: number;
  price: number;
}

export const portfolioCategories = [
  "Все проекты",
  "ЖК Вересаево",
  "ЖК Левобережье",
  "ЖК Левенцовский",
  "ЖК Суворовский",
  "Батайск / Аксай",
] as const;

export const portfolioProjects: ProjectCase[] = [
  {
    id: 1,
    title: "Кухня Soft-touch с антресолями под потолок",
    furnitureType: "Кухни",
    category: "ЖК Вересаево",
    complex: "ЖК «Вересаево»",
    address: "ул. Берберовская, 24",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Размеры", value: "3.4 × 1.8 м (высота 2.65 м)" },
      { label: "Фасады", value: "МДФ Soft-touch AGT Supramat (Турция)" },
      { label: "Столешница", value: "Влагостойкий HPL-пластик 38 мм" },
      { label: "Фурнитура", value: "Выдвижные ящики DTC с доводчиками" },
    ],
    days: 19,
    price: 264000,
  },
  {
    id: 2,
    title: "Встроенный 3-створчатый шкаф с PUR-кромкой",
    furnitureType: "Шкафы и гардеробные",
    category: "ЖК Левобережье",
    complex: "ЖК «Левобережье»",
    address: "ул. Левобережная, 3",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Габариты", value: "2.7 × 2.6 × 0.6 м" },
      { label: "Корпус и полки", value: "Эко-плиты Egger (Австрия)" },
      { label: "Профиль и двери", value: "Скрытый алюминиевый профиль Modus" },
      { label: "Наполнение", value: "Брючницы, ящики с доводчиками, LED-подсветка" },
    ],
    days: 14,
    price: 148000,
  },
  {
    id: 3,
    title: "Шкаф-кровать трансформер с диваном",
    furnitureType: "Шкафы-кровати",
    category: "ЖК Левенцовский",
    complex: "ЖК «Левенцовский»",
    address: "просп. Маршала Жукова, 21",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Спальное место", value: "160 × 200 см с ортопедическим основанием" },
      { label: "Механизм", value: "Усиленный итальянский газлифт (10 000 циклов)" },
      { label: "Фасады", value: "Матовая эмаль Soft-touch" },
      { label: "Нагрузка", value: "До 350 кг распределенного веса" },
    ],
    days: 20,
    price: 185000,
  },
  {
    id: 4,
    title: "Мебель во всю 2-к квартиру под ключ",
    furnitureType: "Мебель под ключ",
    category: "ЖК Суворовский",
    complex: "ЖК «Суворовский»",
    address: "ул. Андреева, 14",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Состав комплекта", value: "Кухня 3.2м + 2 шкафа + ТВ-зона + Прихожая" },
      { label: "Материалы", value: "МДФ AGT + Egger Дуб Гамильтон" },
      { label: "Фурнитура", value: "Единый комплект петель DTC и скрытых ручек" },
      { label: "Экономия за объем", value: "Скидка 15% за комплексный заказ" },
    ],
    days: 28,
    price: 495000,
  },
  {
    id: 5,
    title: "Кухня с островом и барной зоной в частный дом",
    furnitureType: "Кухни",
    category: "Батайск / Аксай",
    complex: "г. Батайск",
    address: "ул. Почтовая, 42",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Размеры", value: "4.2 × 2.6 м + Остров 1.8 × 0.9 м" },
      { label: "Фасады", value: "Натуральный шпон дуба + эмаль матовая" },
      { label: "Столешница", value: "Искусственный акриловый камень Grandex" },
      { label: "Фурнитура", value: "Премиум-серия Blum Tandembox Antaro" },
    ],
    days: 26,
    price: 435000,
  },
  {
    id: 6,
    title: "П-образная функциональная кухня",
    furnitureType: "Кухни",
    category: "ЖК Вересаево",
    complex: "ЖК «Вересаево»",
    address: "ул. Берберовская, 18",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Размеры", value: "2.4 × 2.9 × 1.8 м (с зоной у окна)" },
      { label: "Фасады", value: "МДФ Эмаль матовая Soft" },
      { label: "Столешница", value: "HPL компакт-ламинат 12 мм" },
      { label: "Фурнитура", value: "Hettich Sensys (Германия)" },
    ],
    days: 22,
    price: 286000,
  },
  {
    id: 7,
    title: "Гардеробная комната с подсветкой полок",
    furnitureType: "Шкафы и гардеробные",
    category: "ЖК Левобережье",
    complex: "ЖК «Левобережье»",
    address: "ул. Левобережная, 7",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252def8?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1558997519-83ea9252def8?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Площадь", value: "5.4 кв.м (П-образная планировка)" },
      { label: "Материал", value: "ЛДСП Egger Кашемир Серый" },
      { label: "Оснащение", value: "Стеклянные витрины с LED, пантографы" },
      { label: "Сборка", value: "Скрытый крепеж без видимых уголков" },
    ],
    days: 18,
    price: 215000,
  },
  {
    id: 8,
    title: "Компактная прямая кухня для студии",
    furnitureType: "Кухни",
    category: "ЖК Левенцовский",
    complex: "ЖК «Левенцовский»",
    address: "ул. Еременко, 110",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop",
    specs: [
      { label: "Длина", value: "2.4 м с пеналом под холодильник" },
      { label: "Фасады", value: "МДФ пленка Soft touch" },
      { label: "Столешница", value: "Кедр влагостойкий 38 мм" },
      { label: "Фурнитура", value: "Boyard с доводчиками" },
    ],
    days: 15,
    price: 154000,
  }
];