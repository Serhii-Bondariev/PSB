import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
const trainers = [{
  id: 1,
  name: 'Олександр Петренко',
  position: 'Тренер з боксу',
  experience: '15 років досвіду',
  image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  achievements: ['Майстер спорту міжнародного класу', 'Чемпіон України']
}, {
  id: 2,
  name: 'Микола Іваненко',
  position: 'Тренер з вільної боротьби',
  experience: '12 років досвіду',
  image: 'https://images.unsplash.com/photo-1583468982228-19f19164aee3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  achievements: ['Заслужений тренер України', 'Майстер спорту']
}, {
  id: 3,
  name: 'Ірина Ковальчук',
  position: 'Тренер з боксу',
  experience: '8 років досвіду',
  image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  achievements: ['Майстер спорту', 'Чемпіонка області']
}, {
  id: 4,
  name: 'Андрій Мельник',
  position: 'Тренер з вільної боротьби',
  experience: '10 років досвіду',
  image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  achievements: ['Майстер спорту', 'Призер міжнародних турнірів']
}];
const Trainers: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-dark mb-4">
                Наші тренери
              </h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Професійні тренери з багаторічним досвідом, які допоможуть вашій
                дитині досягти успіху в спорті
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trainers.map(trainer => <div key={trainer.id} className="bg-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-64 overflow-hidden">
                    <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {trainer.name}
                    </h3>
                    <p className="text-secondary font-medium mb-2">
                      {trainer.position}
                    </p>
                    <p className="text-gray-600 mb-4">{trainer.experience}</p>
                    <div className="space-y-2">
                      {trainer.achievements.map((achievement, index) => <p key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                          {achievement}
                        </p>)}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Trainers;