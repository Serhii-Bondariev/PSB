import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Award, Heart, Clock, Users } from 'lucide-react';
const About: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-dark mb-4">
                Про наш центр
              </h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Некомерційний спортивний центр, де кожна дитина може безкоштовно
                займатися спортом та розвивати свої навички.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">Наша місія</h2>
                <p className="text-gray-600">
                  Наша місія - зробити спорт доступним для кожної дитини,
                  незалежно від фінансових можливостей родини. Ми віримо, що
                  кожна дитина заслуговує на можливість розвивати свої таланти
                  та досягати успіху у спорті.
                </p>
                <p className="text-gray-600">
                  Ми забезпечуємо професійне тренування з боксу та вільної
                  боротьби, створюючи сприятливе середовище для фізичного та
                  особистісного розвитку дітей.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-light p-6 rounded-lg">
                  <Award className="text-primary mb-4 w-12 h-12" />
                  <h3 className="text-xl font-bold text-dark mb-2">
                    10+ років досвіду
                  </h3>
                  <p className="text-gray-600">
                    Багаторічний досвід у підготовці юних спортсменів
                  </p>
                </div>
                <div className="bg-light p-6 rounded-lg">
                  <Heart className="text-primary mb-4 w-12 h-12" />
                  <h3 className="text-xl font-bold text-dark mb-2">
                    Безкоштовно
                  </h3>
                  <p className="text-gray-600">
                    Всі заняття проводяться безкоштовно
                  </p>
                </div>
                <div className="bg-light p-6 rounded-lg">
                  <Clock className="text-primary mb-4 w-12 h-12" />
                  <h3 className="text-xl font-bold text-dark mb-2">
                    Гнучкий графік
                  </h3>
                  <p className="text-gray-600">
                    Зручний розклад тренувань для дітей
                  </p>
                </div>
                <div className="bg-light p-6 rounded-lg">
                  <Users className="text-primary mb-4 w-12 h-12" />
                  <h3 className="text-xl font-bold text-dark mb-2">
                    Професійні тренери
                  </h3>
                  <p className="text-gray-600">
                    Досвідчені тренери з професійною освітою
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-light p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-dark mb-6 text-center">
                Наші цінності
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Доступність
                  </h3>
                  <p className="text-gray-600">
                    Безкоштовні заняття для всіх дітей, незалежно від їх
                    фінансових можливостей
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Професіоналізм
                  </h3>
                  <p className="text-gray-600">
                    Висококваліфіковані тренери та індивідуальний підхід до
                    кожної дитини
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    Розвиток
                  </h3>
                  <p className="text-gray-600">
                    Постійне вдосконалення навичок та досягнення нових
                    спортивних висот
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;