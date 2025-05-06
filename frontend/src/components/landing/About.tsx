import React from 'react';
import { Award, Users, Target, Heart } from 'lucide-react';
import heroImage from '../../assets/heroImageLarge.jpg';
const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-2">Про наш центр</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Наш дитячий спортивний центр – це місце, де діти розвивають не тільки фізичні навички,
            але й характер, дисципліну та командний дух.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={heroImage}
              alt="Діти займаються спортом"
              className="w-full h-full object-fit-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Наша місія</h3>
            <p className="text-gray-600 mb-6">
              Ми прагнемо створити середовище, де кожна дитина може розкрити свій потенціал,
              розвинути впевненість у собі та полюбити активний спосіб життя на все життя.
            </p>
            <p className="text-gray-600 mb-6">
              Наші професійні тренери працюють з дітьми різного віку та рівня підготовки, адаптуючи
              програми під індивідуальні потреби кожної дитини.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Award className="text-accent" />
                <span>10+ років досвіду</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-accent" />
                <span>професійні тренери</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="text-accent" />
                <span>декілька видів спорту</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="text-accent" />
                <span>1000+ щасливих дітей</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
