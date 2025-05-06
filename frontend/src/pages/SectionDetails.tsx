import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Clock, Users, Trophy } from 'lucide-react';
import boxingImage from '../assets/boxingImg.webp';

const sections = {
  '1': {
    name: 'Бокс',
    description:
      'Розвиток сили, швидкості та координації через тренування з професійними тренерами.',
    image: boxingImage,
    age: '10-16 років',
    schedule: 'Пн, Ср, Пт: 16:00-19:00',
    trainer: 'Олександр Петренко',
    achievements: ['Чемпіони міста 2022', 'Призери національних змагань'],
    requirements: ['Медична довідка', 'Спортивна форма', 'Бажання тренуватися'],
  },
  '2': {
    name: 'Вільна боротьба',
    description:
      'Навчання техніці боротьби, розвиток сили та спритності під керівництвом досвідчених тренерів.',
    image:
      'https://www.nure.info/uploads/posts/2017-06/1498289918_sportivnyy-klub-sportivnye-sekcii-v-hnure-sekciya-borba.jpg',
    age: '8-16 років',
    schedule: 'Вт, Чт, Сб: 16:00-19:00',
    trainer: 'Микола Іваненко',
    achievements: ['Чемпіони області 2023', 'Призери міжнародних турнірів'],
    requirements: ['Медична довідка', 'Спортивна форма', 'Бажання тренуватися'],
  },
};
const SectionDetails: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const section = sections[id as keyof typeof sections];
  if (!section) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-dark">Секцію не знайдено</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative h-[400px]">
          <img src={section.image} alt={section.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-white mb-4">{section.name}</h1>
              <p className="text-xl text-white max-w-2xl">{section.description}</p>
            </div>
          </div>
        </div>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-light p-6 rounded-lg">
                <Clock className="text-primary w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Розклад</h3>
                <p className="text-gray-600">{section.schedule}</p>
              </div>
              <div className="bg-light p-6 rounded-lg">
                <Users className="text-primary w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Вікова категорія</h3>
                <p className="text-gray-600">{section.age}</p>
              </div>
              <div className="bg-light p-6 rounded-lg">
                <Trophy className="text-primary w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Тренер</h3>
                <p className="text-gray-600">{section.trainer}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-dark mb-4">Досягнення</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {section.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-dark mb-4">Що потрібно для занять</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {section.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default SectionDetails;
