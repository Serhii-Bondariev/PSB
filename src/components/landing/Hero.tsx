import React from 'react';
import { Trophy, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/HeroImg.png';// Оновлений імпорт

const Hero: React.FC = () => {
  return (
    <section className="relative bg-primary text-white">
      <div className="absolute inset-0 bg-dark opacity-30"></div>

      <div
  className="relative min-h-[400px] md:min-h-[600px] flex items-center bg-cover bg-center"
  style={{ backgroundImage: `url(${new URL(heroImg, import.meta.url)})` }}
>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Пісківка - спортивний центр
            </h1>
            <p className="text-xl mb-8">
              Розвиваємо майбутніх чемпіонів. Приєднуйтесь до нашої спортивної родини!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/sections"
                className="bg-accent text-dark font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                <Dumbbell size={20} />
                Наші секції
              </Link>
              <Link
                to="/about"
                className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                <Trophy size={20} fill="gold" />
                Про центр
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
