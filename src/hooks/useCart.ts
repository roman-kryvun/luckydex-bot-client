import { useEffect, useMemo, useState } from 'react'

type CartOrder = { [id: string]: number }
const shopType: 'bear' | 'coffee' = 'bear'
const coffeeProducts = [
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/gym-leaders-e982a.appspot.com/o/MAWtKT5AQDs5GPAe59M1%2Fproducts%2FBLACKHONEY%20%5BPackage%5D%20Final_page-0001.jpg?alt=media&token=097e6cab-3a5a-4ebb-958f-f7989ff83dc9',
    title: 'Brasil Mogiana',
    subTitle: 'natural',
    prise: '287',
    priseXL: '1147',
    size: '250 г',
    currency: 'грн',
    useFor: 'shop only',
    crop: '2021',
    type: 'PR',
    stock: 'в наявності',
    composition: '',
    description: 'Какао, сухофрукти, карамель, лісовий горіх',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/gym-leaders-e982a.appspot.com/o/MAWtKT5AQDs5GPAe59M1%2Fproducts%2FBLACKHONEY%20%5BPackage%5D%20Final_page-0002.jpg?alt=media&token=ada54565-94ae-48e8-a995-e50da0bd73c7',
    title: 'Brasil Yellow Bourbon',
    subTitle: 'natural',
    prise: '384',
    priseXL: '1536',
    size: '250 г',
    currency: 'грн',
    useFor: 'shop only',
    crop: '2021',
    type: 'PR',
    stock: 'в наявності',
    composition: '',
    description: 'Шоколад, червоні фрукти, карамель, цитрус',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Columbia Huila',
    subTitle: 'washed',
    prise: '384',
    priseXL: '1536',
    size: '250 г',
    currency: 'грн',
    useFor: 'espresso/milk',
    crop: '2021',
    type: 'SP',
    stock: 'в наявності',
    composition: '',
    description: 'Темний виноград, кісточкові фрукти, цитрус, молочний шоколад',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Bolivia Caranavi',
    subTitle: 'washed',
    prise: '328',
    priseXL: '1314',
    size: '250 г',
    currency: 'грн',
    useFor: 'espresso/milk',
    crop: '2021',
    type: 'PR',
    stock: 'в наявності',
    composition: '',
    description: 'Ягоди, солодка слива, фіга',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Peru El Cedra',
    subTitle: 'washed',
    prise: '346',
    priseXL: '1386',
    size: '250 г',
    currency: 'грн',
    useFor: 'espresso/milk',
    crop: '2021',
    type: 'PR',
    stock: 'в наявності',
    composition: '',
    description: 'Темні ягоди, родзинки, червоне яблуко, слива',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Honduras Las Acacian',
    subTitle: 'washed',
    prise: '295',
    priseXL: '1180',
    size: '250 г',
    currency: 'грн',
    useFor: 'shop only',
    crop: '2021',
    type: 'PR',
    stock: 'в наявності',
    composition: '',
    description: 'Темний виноград, темні лісові ягоди, апельсин, сушене яблуко, кісточкові фрукти',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Honduras San Rafael',
    subTitle: 'natural',
    prise: '312',
    priseXL: '1249',
    size: '250 г',
    currency: 'грн',
    useFor: 'espresso/milk',
    crop: '2021',
    type: 'PR',
    stock: 'в наявності',
    composition: '',
    description: 'Кісточкові фрукти, полуниця, шоколад, комплексна кислотність',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Guatemala Aguilar',
    subTitle: 'washed',
    prise: '315',
    priseXL: '1260',
    size: '250 г',
    currency: 'грн',
    useFor: 'espresso/milk',
    crop: '2021',
    type: 'PR',
    stock: 'в наявності',
    composition: '',
    description: 'Тропічні фрукти, бергамот, червоне яблуко',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/gym-leaders-e982a.appspot.com/o/MAWtKT5AQDs5GPAe59M1%2Fproducts%2FBLACKHONEY%20%5BPackage%5D%20Final_page-0006.jpg?alt=media&token=c4bd4b8b-4178-4394-ae54-ecb9f70c7b5e',
    title: 'Salvador Las Brisas',
    subTitle: 'honey',
    prise: '301',
    priseXL: '1203',
    size: '250 г',
    currency: 'грн',
    useFor: 'espresso/milk',
    crop: '2021',
    type: 'PR',
    stock: 'в наявності',
    composition: '',
    description: 'Молочний шоколад, трави, зелене яблуко',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Salvador Ataco',
    subTitle: 'natural',
    prise: '328',
    priseXL: '1314',
    size: '250 г',
    currency: 'грн',
    useFor: 'espresso/milk',
    crop: '2021',
    type: 'SP',
    stock: 'в наявності',
    composition: '',
    description: 'Молочний шоколад, зелене яблуко, лимонад, апельсинові цукати',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Rwanda Cyato',
    subTitle: 'washed',
    prise: '384',
    priseXL: '1536',
    size: '250 г',
    currency: 'грн',
    useFor: 'brew',
    crop: '2021',
    type: 'SP',
    stock: 'закінчується',
    composition: '',
    description: 'Зелене яблуко, ягоди, кісточкові фрукти',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Kenya AB Rutuma Ruthagati',
    subTitle: 'washed',
    prise: '578',
    priseXL: '2313',
    size: '250 г',
    currency: 'грн',
    useFor: 'shop only',
    crop: '2022',
    type: 'SP',
    stock: 'в наявності',
    composition: '',
    description: 'Томат, чорна смородина, журавлина, лимон',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Kenya Kipkelion',
    subTitle: 'washed',
    prise: '459',
    priseXL: '1837',
    size: '250 г',
    currency: 'грн',
    useFor: 'brew',
    crop: '2022',
    type: 'SP',
    stock: 'в наявності',
    composition: '',
    description: 'Агрус, червоні ягоди, ананас, маракуя, овочева',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Ethiopia Shantawene',
    subTitle: 'natural',
    prise: '539',
    priseXL: '2157',
    size: '250 г',
    currency: 'грн',
    useFor: 'brew',
    crop: '2022',
    type: 'SP',
    stock: 'в наявності',
    composition: '',
    description: 'Маракуйя, гуава, ананас, манго, свіжа кислотність, вершкова',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Costa Rica Colibri Tarrazu',
    subTitle: 'natural',
    prise: '426',
    priseXL: '1702',
    size: '250 г',
    currency: 'грн',
    useFor: 'brew',
    crop: '2022',
    type: 'SP',
    stock: 'в наявності',
    composition: '',
    description: 'П‘яна вишня, шоколад, фундук, солодка',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Guatemala El Aguila Pacamara',
    subTitle: 'washed',
    prise: '426',
    priseXL: '1702',
    size: '250 г',
    currency: 'грн',
    useFor: 'brew',
    crop: '20/21',
    type: 'SP',
    stock: 'закінчується',
    composition: '',
    description: 'Лайм, лимон, манго, лісові ягоди, вершкова, нектарна',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Honduras Pietras Negras',
    subTitle: 'natural',
    prise: '439',
    priseXL: '1758',
    size: '250 г',
    currency: 'грн',
    useFor: 'brew',
    crop: '2021',
    type: 'SP',
    stock: 'закінчується',
    composition: '',
    description: 'Абрикос, чорна слива, темний виноград',
  },

  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Honduras San Isidro',
    subTitle: 'natural',
    prise: '439',
    priseXL: '1758',
    size: '250 г',
    currency: 'грн',
    useFor: 'brew',
    crop: '2021',
    type: 'SP',
    stock: 'закінчується',
    composition: '',
    description: 'Темні ягоди, слива, лісовий горіх, шоколад',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Mexico (без кофеїну)',
    subTitle: 'washed',
    prise: '398',
    priseXL: '1591',
    size: '250 г',
    currency: 'грн',
    useFor: 'espresso/milk',
    crop: '2021',
    type: 'SP',
    stock: 'в наявності',
    composition: '',
    description: 'Бородинський хліб, коріандр, горіхи, чорна смородина',
  },
  {
    image: 'https://blackhoney.ua/wp-content/uploads/2022/11/tst21-5x_1-450x619.jpg',
    title: 'Cascara Nicaragua',
    subTitle: 'natural',
    prise: '239',
    priseXL: '956',
    size: '250 г',
    currency: 'грн',
    useFor: '',
    crop: '20/21',
    type: 'SP',
    stock: 'в наявності',
    composition: '',
    description: 'Узвар з яблук та чорносливу',
  },
]

const bearItems = [
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto_2023-02-23%2001.12.10.jpeg?alt=media&token=f39919fd-7786-44bf-9bb5-8a230c30985c',
    title: '2085-HS  RASPBERRY',
    subTitle: 'abv 5',
    prise: '63',
    currency: 'грн.',
    composition: 'вода, цукор, солод, сік малини концентрований, свіже пюре малини, дріжджі.',
    description:
      'Саме так 2085 бачить напрямок HARD SELTZER! Ферментована Шампанськими дріжджами екстра суха база з легкою ароматикою просекко. На яку покладено велика кількість 100% фруктів. Без жодних ароматизаторів, барвників та підсолоджувачів!',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto_2023-02-23%2001.12.30.jpeg?alt=media&token=6100dcef-40a1-4cd0-a801-637a19af3c32',
    title: '2085 FRUITED SPARKLING WATER MILKY SECRET',
    subTitle: 'SUGAR - 0',
    prise: '45',
    currency: 'грн.',
    composition: 'вода, сік малини концентрований, свіже пюре малини та полуниці, лактоза.',
    description: 'Фруктова газована вода. Без цукру та штучних добавок.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto_2023-02-23%2001.12.43.jpeg?alt=media&token=488159e0-db40-41d2-906a-c49c7c208aac',
    title: '2085 FRUITED SPARKLING WATER MANGO PASSION FRUIT',
    subTitle: 'SUGAR-0 ',
    prise: '45',
    currency: 'грн.',
    composition: 'вода, сік апельсину, свіже пюре манго та маракуйї.',
    description: 'Фруктова газована вода. Без цукру та штучних добавок.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto_2023-02-23%2001.12.10.jpeg?alt=media&token=f39919fd-7786-44bf-9bb5-8a230c30985c',
    title: '2085-2 Wallonia Wit',
    prise: '60',
    currency: 'грн.',
    composition: 'Вода, ячмінний солод, пшеничний солод, хміль, вівсяні пластівці, хміль, цедра апельсина, цедра лимона, імбир, чорний перець, дріжджі.',
    description:
      'Інтерпретація традиційного Бельгійського вітбіру з регіону Валлонія. Легке та освіжне тіло. Пінна шапка білого кольору та пиво кольору соломи. Смак цитрусово-пряний. Спеції ідеально гармонують з насиченим ароматним букетом цитрусів та дріжджів.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto_2023-02-22%2013.07.54.jpeg?alt=media&token=b0c82154-f154-4cf8-a6cd-1b032af77377',
    title: '2085-3.1 LIME SOUR MEXICAN LAGER',
    prise: '65',
    subTitle: 'ABV 5.3, IBU 11',
    currency: 'грн.',
    composition: 'вода, ячмінний солод, хміль, цедра та сік свіжого лайма, кукурудзяні пластівці, дріжджі.',
    description: 'Літня варіація Мексиканського лагеру, в яку окрім цедри лайму ми додали свіжий сік лайму для більш яскравої та освіжаючої кислинки.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fmsg1259049803-548042.jpg?alt=media&token=745d7bfc-c29e-4cce-b8e3-aa0eca8aad83',
    title: '2085-17.1 SOLERO 2X NEIPA',
    prise: '94',
    subTitle: 'ABV 7 IBU 25',
    currency: 'грн.',
    composition: 'вода, ячмінний солод, пшеничний солод, вівсяні пластівці, хміль, дріжджі.',
    description:
      'Це нова лінійка сильно охмелених, мутних IPA в стилі Нової Англії. Ми з командою будемо експериментувати з різними соковитими хмелями, щоб задовольнити смаки любителів охмелених сортів пива. Дана версія є подвійним NEIPA, тому плотності, хмелю та алкоголю в ньому ще більше. Тіло доволі плотне, що по відчуттям та консистенції нагадує ананасовий сік. Гіркота дуже помірна. Колір світло-солом’яний з дрібнодисперсною білою піною. Ароматика тропічних фруктів, ананасу та цитрусових. Інтенсивний аромат та соковитість є основною характеристикою даного сорту.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fmsg1259049803-548042.jpg?alt=media&token=745d7bfc-c29e-4cce-b8e3-aa0eca8aad83',
    title: '2085-RESOLVE',
    subTitle: 'ABV 4.8 IBU 15',
    prise: '68',
    currency: 'грн.',
    composition: 'вода, ячмінний солод, хміль, дріжджі.',
    description:
      'Це гуманітарна ініціатива міжнародної відкритої колаборації для підтримки України у війні з окупаційними військами. Ідейними лідерами виступили Наз Дребот (2085 Brewery) та Джон Цимперман (42 North Brewing Company). Понад 40 пивоварень з усього світу долучились до даної ініціативи та зварили пиво RESOLVE в різних куточках земної кулі. Отож, дана інтерпретація рецепта RESOLVE являє собою «молодий» неосвітлений лагер KELLERBIER із сухим охмеленням благородними та новітніми ароматними хмелями. Світло солом’яний колір, біла дрібнодисперсна піна та сухе освіжне тіло, з відносно не високим вмістом алкоголю, створюють чудовий літній питкий баланс з присмаком Української волі.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fmsg1259049803-548039.jpg?alt=media&token=43df745f-5504-4397-94d9-188f3311851b',
    title: '2085-20 CZECH DARK LAGER',
    subTitle: 'ABV 5 IBU 21',
    prise: '65',
    currency: 'грн.',
    composition: 'вода, ячмінний солод, смажений ячмінь, хміль, дріжджі.',
    description:
      'Класична  версія темних Чешських лагерів. Сухий та м’який. Ненав’язливий  та дуже питкий. Кремова ніжна піна та багряно- чорний  колір. В ароматі та смаку карамель, какао та горіхи. В посмаку  легка кислинка, гірчинка ледь помітна, м’яка, кавова.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fmsg1259049803-548038.jpg?alt=media&token=839ee3bb-7286-441f-a23f-8b6ab053f879',
    title: '2085 FRUITED SPARKLING WATER HOP TONIC',
    subTitle: 'SUGAR 0 ',
    prise: '40',
    currency: 'грн.',
    composition:
      'вода, хміль, лаванда, корінь горечавки, кора хінінного дуба, лемонграс, рожевий перець, ялівець, зірочки анісу, кардамон, духмяний перець, сік лимону концентрований, свіжовичавлений сік та цедра лимону, грейпфруту, апельсину та лайму.',
    description: 'Фруктова газована вода. Без цукру та штучних добавок.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto1676767495.jpeg?alt=media&token=a21bd561-54ff-4095-85be-e3499818d0ac',
    title: '2085-22.1 RASPBERRY FRUITED SOUR',
    subTitle: 'ABV 5.5 IBU 7',
    prise: 'безцінно',
    currency: 'грн.',
    composition: 'вода, ячмінний солод, пшеничний солод, пшеничні пластівці, вівсяні пластівці,  пшениця, свіже пюре малини, хміль, дріжджі.',
    description:
      'Оновлена лінійка 2085 включає старт різноманітних кислих фруктових сортів пива в Американському стилі. В базі багато пшениці та пластівців для повноти тіла. А особливі дріжджі дозволяють пиву не тільки бути мутним та соковитим, а й залишатись відносно сухим. Додаткову кислотність забезпечують виключно натуральні фрукти та ягоди. Малинова версія має рожевий колір з яскравим малиновим ароматом. Піна блідо рожева. М’яке солодове тіло гарно балансує з ягідною кислинкою та глибокими палітрами малини у смаку.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto1676767495.jpeg?alt=media&token=a21bd561-54ff-4095-85be-e3499818d0ac',
    title: '2085 FRUITED SPARKLING WATER FANTASTIC FRUIT',
    subTitle: '0 SUGAR',
    prise: '45',
    currency: 'грн.',
    composition: 'вода, сік апельсина концентрований, свіже пюре маракуйї, свіжовичавлений сік апельсина, цедра апельсина.',
    description: 'Фруктова газована вода з апельсином. Без цукру та штучних добавок.',
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto1676767495%20(1).jpeg?alt=media&token=2acc87d3-2005-4785-8388-58e54db86526',
    title: '2085-HS DARK CHERRY',
    subTitle: 'ABV 5.0',
    prise: '60',
    currency: 'грн.',
    composition:
      'Ферментована Шампанськими дріжджами екстра суха база з легкою ароматикою просекко. На яку покладена велика кількість 100% фруктів. Без жодних ароматизаторів, барвників та підсолоджувачів!',
    description:
      'В ароматі вишнева кісточка та вишня. Насичений червоний колір ще раз натякає на його вишневе походження. Сухий, свіжий та з ягідною кислинкою. Надзвичайно питкий. В ньому використана виключно вишня, яка є досить самостійною.',
  },

  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto1676767495%20(1).jpeg?alt=media&token=2acc87d3-2005-4785-8388-58e54db86526',
    title: '2085-HS MANGO PASSION  FRUIT',
    subTitle: 'ABV 5',
    prise: '63',
    currency: 'грн.',
    composition:
      'Ферментована Шампанськими дріжджами екстра суха база з легкою ароматикою просекко. На яку покладена велика кількість 100% фруктів. Без жодних ароматизаторів, барвників та підсолоджувачів!',
    description:
      'Напевно найочікуваніша класика - поєднання тропічних фруктів. Аромат тропіків, насичений помаранчевий колір та тропічний смак переносить нас в тепло та безтурботність. Сухе та фруктове тіло з усіма відтінками манго та свіжою кислинкою маракуї. Для даного HARD SELTZER ми використали манго, маракую та трішки апельсину для балансу.',
  },

  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/tg-web-shop.appspot.com/o/shops%2FqZBkR5VYMLvLLWHCF0ca%2Fphoto1676767495%20(1).jpeg?alt=media&token=2acc87d3-2005-4785-8388-58e54db86526',
    title: '2085-HS MILKY SECRET',
    subTitle: 'ABV 5.0 WITH LACTOSE',
    prise: '65',
    currency: 'грн.',
    composition: 'вода, концентрований сік малини, свіже пюре малини та полуниці, лактоза, дріжджі.',
    description:
      'Саме так 2085 бачить напрямок HARD SELTZER! Ферментована Шампанськими дріжджами екстра суха база з легкою ароматикою просекко. На яку покладено велика кількість 100% фруктів. Без жодних ароматизаторів, барвників та підсолоджувачів!',
  },
]

const prodLists = shopType === 'bear' ? bearItems : coffeeProducts

let initOrder: CartOrder = {}

try {
  const storedOrder: string = window.localStorage.getItem('order') || '{}'
  const res = JSON.parse(storedOrder)

  const filterd = Object.entries(res).filter(([id, count]) => prodLists.some(item => item.title === id))
  const obj = Object.fromEntries(filterd)
  // @ts-ignore
  if (obj) initOrder = obj
} catch (e) {
  console.error(e)
}

export const useCart = () => {
  const [order, setOrder] = useState<CartOrder>(initOrder)

  const total = useMemo(() => Object.values(order).reduce((total, numb) => total + numb, 0), [order])

  const addItem = (id: string): void => {
    setOrder(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }
  const removeItem = (id: string): void => {
    if (!order[id]) return

    setOrder(prev => {
      const decr = order[id] - 1
      const next = decr < 1 ? 0 : decr
      return { ...prev, [id]: decr }
    })
  }

  useEffect(() => {
    setTimeout(() => window.localStorage.setItem('order', JSON.stringify(order)), 10)
  }, [order])

  return {
    total,
    order,
    products: prodLists,
    shopType,
    addItem,
    removeItem,
  }
}
