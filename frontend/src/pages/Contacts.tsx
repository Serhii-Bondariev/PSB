import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from 'lucide-react';
const Contacts: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setTimeout(() => setSubmitSuccess(false), 3000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-dark mb-4">
                Контактна інформація
              </h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Зв'яжіться з нами для запису на безкоштовні тренування
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Наші контакти
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <MapPinIcon className="text-primary w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Адреса</h3>
                        <p className="text-gray-600">
                          07820, Київська область, Бородянський район, смт Пісківка, вул. Шевченка, 2а
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <PhoneIcon className="text-primary w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Телефон</h3>
                        <p className="text-gray-600">+380 44 123 45 67</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <MailIcon className="text-primary w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-gray-600">info@sport-center.ua</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <ClockIcon className="text-primary w-6 h-6 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Графік роботи</h3>
                        <p className="text-gray-600">
                          Пн-Пт: 8:00 - 20:00
                          <br />
                          Сб: 9:00 - 18:00
                          <br />
                          Нд: <span className="text-red-600">Вихідний день</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Запис на тренування
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Для запису на тренування необхідно:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Медична довідка про відсутність протипоказань</li>
                    <li>Заява від батьків (для дітей до 18 років)</li>
                    <li>Копія свідоцтва про народження</li>
                  </ul>
                </div>
              </div>
              <div className="bg-light p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Зворотній зв'язок
                </h2>
                {submitSuccess && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    Повідомлення успішно надіслано! Ми зв'яжемося з вами
                    найближчим часом.
                  </div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Ім'я
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Повідомлення
                    </label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className={`w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-dark transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {isSubmitting ? 'Надсилання...' : 'Надіслати'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Contacts;