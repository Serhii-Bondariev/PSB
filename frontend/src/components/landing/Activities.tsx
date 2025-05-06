import React from 'react';
import { Link } from 'react-router-dom';
import boxingImage from '../../assets/boxingImg.webp';
const activities = [
  {
    id: 1,
    name: 'Бокс',
    description:
      'Розвиток сили, швидкості та координації через тренування з професійними тренерами.',
    image: boxingImage,
    age: '10-16 років',
    schedule: 'Пн, Ср, Пт: 16:00-19:00',
  },
  {
    id: 2,
    name: 'Вільна боротьба',
    description:
      'Навчання техніці боротьби, розвиток сили та спритності під керівництвом досвідчених тренерів.',
    image:
      'https://www.nure.info/uploads/posts/2017-06/1498289918_sportivnyy-klub-sportivnye-sekcii-v-hnure-sekciya-borba.jpg',
    age: '8-16 років',
    schedule: 'Вт, Чт, Сб: 16:00-19:00',
  },
];
const Activities: React.FC = () => {
  return (
    <section id="activities" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-2">Наші секції</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Безкоштовні спортивні секції для дітей. Приєднуйтесь до нас та розвивайте свої спортивні
            навички під керівництвом професійних тренерів.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{activity.name}</h3>
                <div className="mb-4">
                  <p className="text-sm text-accent font-semibold">Вік: {activity.age}</p>
                  <p className="text-sm text-secondary font-semibold">
                    Розклад: {activity.schedule}
                  </p>
                </div>
                <p className="text-gray-600 mb-6">{activity.description}</p>
                <Link
                  to={`/section/${activity.id}`}
                  className="bg-secondary text-white px-6 py-3 rounded-full hover:bg-primary transition-colors inline-block"
                >
                  Детальніше про секцію
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-dark mb-4">Запис у секції</h3>
          <p className="text-gray-600 mb-6">
            Всі заняття є безкоштовними. Для запису необхідно лише медична довідка про відсутність
            протипоказань до занять спортом.
          </p>
          <Link
            to="/contacts"
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-dark transition-colors inline-flex items-center"
          >
            Записатись на тренування
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Activities;
