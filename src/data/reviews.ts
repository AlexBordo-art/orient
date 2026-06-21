// Real review platforms — single source for the home trust strip and /reviews.
export interface ReviewPlatform {
    platform: string;
    rating: number;
    count: string;
    link: string;
    desc: string;
}

export const REVIEWS: ReviewPlatform[] = [
    {
        platform: '2ГИС',
        rating: 4.8,
        count: '150+',
        link: 'https://2gis.ru/khabarovsk/firm/4926340373575901/tab/reviews',
        desc: 'Проверенные отзывы реальных клиентов — оценка качества услуг и сервиса.',
    },
    {
        platform: 'Яндекс Карты',
        rating: 4.9,
        count: '120+',
        link: 'https://yandex.ru/maps/org/oriyent_ekspress/1032200453/reviews/?ll=135.084206%2C48.484451&z=15',
        desc: 'Ежедневные оценки работы бюро — мы ценим каждый отзыв.',
    },
];
