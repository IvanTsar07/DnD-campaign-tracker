type HeroData = {
  imageUrl: string;
  name: string;
  description: string;
  realname: string;
  race: string;
};
const HERO_DATA: HeroData[] = [
  {
    imageUrl: "/images/DM.jpg",
    name: "Dangen Master",
    description: "Людина-чарівник всього світу і головний майстер гри",
    realname: "Володимир",
    race: "А над Богом хтось є?",
  },
  {
    imageUrl: "/images/Leina.jpg",
    name: "Лейна",
    description:
      "Найброньованіший маг від Лісової Гілки до Чорного Лісу, самий крутий детектив і любитель чирки-поприкашу разом із чорною ромашкою",
    realname: "Марина",
    race: "Ельфійка",
  },
  {
    imageUrl: "/images/Flint.jpg",
    name: "Флінт",
    description:
      "Найбільше пивне пузо в усьому королівстві і головний танк пачки",
    realname: "Іван",
    race: "Дварф",
  },
  {
    imageUrl: "/images/Baltazar.jpg",
    name: "Бальтазар",
    description:
      "Майстер магічних списів, котрий любить читати книги і жарити пукани фаєрболами",
    realname: "Владислав",
    race: "Тифлінг",
  },
  {
    imageUrl: "/images/Sam.jpg",
    name: "Сем",
    description:
      "Найкращий татусь двох драконів і достобіса крутий переговорник",
    realname: "Ренат",
    race: "Людина",
  },
  {
    imageUrl: "/images/Krak.jpg",
    name: "Кракбак",
    description:
      "Безстрашний лучник-богоборець, котрий завалив Мейліса.... А ще закадрив ельфійку ;) ",
    realname: "Іван",
    race: "Табаксі",
  },
  {
    imageUrl: "/images/Mark.jpg",
    name: "Марк",
    description:
      "Ваше світлосте Марк, служник Латандера і головний воскреситель пачки",
    realname: "Олександр",
    race: "Людина",
  },
];

export { HERO_DATA };
export type { HeroData };
