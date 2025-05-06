import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import klichkoVitaly from '../assets/klichkoVitaly.webp';
const trainers = [
  {
    id: 1,
    name: 'Василий Ломаченко',
    position: 'Тренер з боксу',
    experience: '15 років досвіду',
    image:
      'https://debaty.sumy.ua/wp-content/uploads/2018/12/Bolshoj-boks_Lomachenko-Pedrasa-4.jpg',
    achievements: ['Майстер спорту міжнародного класу', 'Чемпіон України'],
  },
  {
    id: 2,
    name: 'Усик Олександр',
    position: 'Тренер з боксу',
    experience: '12 років досвіду',
    image: 'https://interesnyefakty.org/wp-content/uploads/aleksandr-usik.jpg',
    achievements: ['Заслужений тренер України', 'Майстер спорту'],
  },
  {
    id: 3,
    name: 'Віталій Кличко',
    position: 'Тренер з боксу',
    experience: '18 років досвіду',
    image: klichkoVitaly,
    achievements: ['Майстер спорту', 'Чемпіон області'],
  },
  {
    id: 4,
    name: 'Володимир Кличко',
    position: 'Тренер з боксу',
    experience: '15 років досвіду',
    image: 'https://24boxing.com.ua/uploads/boxers/volodimir-klichko.jpg',
    achievements: ['Майстер спорту', 'Призер міжнародних турнірів'],
  },
];
const Trainers: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-dark mb-4">Наші тренери</h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Професійні тренери з багаторічним досвідом, які допоможуть вашій дитині досягти
                успіху в спорті
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-100 overflow-hidden">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{trainer.name}</h3>
                    <p className="text-secondary font-medium mb-2">{trainer.position}</p>
                    <p className="text-gray-600 mb-4">{trainer.experience}</p>
                    <div className="space-y-2">
                      {trainer.achievements.map((achievement, index) => (
                        <p key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                          {achievement}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Trainers;
