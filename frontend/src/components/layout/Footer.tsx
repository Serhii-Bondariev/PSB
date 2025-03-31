import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
const Footer: React.FC = () => {
  return <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Пісківська дитячо-юнацька спортивна школа</h3>
            <p className="mb-4">
              Розвиваємо дітей через спорт та активний відпочинок вже більше 10
              років!
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/groups/998110193670838/" className="hover:text-accent transition-colors">
                <FacebookIcon size={24} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <InstagramIcon size={24} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <YoutubeIcon size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Контакти</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPinIcon size={20} className="min-w-[20px] mt-1" />
                <p>07820, Київська область, Бородянський район, смт Пісківка, вул. Шевченка, 2а</p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon size={20} />
                <p>+380 44 123 45 67</p>
              </div>
              <div className="flex items-center space-x-3">
                <MailIcon size={20} />
                <p>info@sport-center.ua</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Графік роботи</h3>
            <div className="space-y-2">
              <p>Понеділок - П'ятниця: 8:00 - 20:00</p>
              <p>Субота: 9:00 - 18:00</p>
              <p>Неділя: Вихідний день</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Пісківська дитячо-юнацька спортивна школа. Всі
            права захищені.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;