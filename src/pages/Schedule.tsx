import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Clock, MapPin} from 'lucide-react';
const scheduleData = [{
  sport: 'Бокс',
  schedule: [{
    day: 'Понеділок',
    time: '16:00 - 19:00'
  }, {
    day: 'Середа',
    time: '16:00 - 19:00'
  }, {
    day: "П'ятниця",
    time: '16:00 - 19:00'
  }],
  location: 'Зал №1',
  trainer: 'Олександр Петренко'
}, {
  sport: 'Вільна боротьба',
  schedule: [{
    day: 'Вівторок',
    time: '16:00 - 19:00'
  }, {
    day: 'Четвер',
    time: '16:00 - 19:00'
  }, {
    day: 'Субота',
    time: '16:00 - 19:00'
  }],
  location: 'Зал №2',
  trainer: 'Микола Іваненко'
}];
const Schedule: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-light">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-dark mb-8 text-center">
            Розклад занять
          </h1>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {scheduleData.map(sport => <div key={sport.sport} className="bg-white rounded-lg shadow-lg overflow-hidden">

              <div className="bg-primary text-white p-6">

                  <h2 className="text-2xl font-bold">{sport.sport}</h2>
                  <p className="text-sm opacity-90">Тренер: {sport.trainer}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="text-secondary mt-1" />
                    <span>{sport.location}</span>
                  </div>
                  <div className="space-y-4">
                    {sport.schedule.map(item => <div key={item.day} className="flex items-center justify-between border-b pb-2">
                        <span className="font-medium">{item.day}</span>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-accent" />
                          <span>{item.time}</span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>)}
          </div>
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-primary mb-4">
              Важлива інформація
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Всі заняття є безкоштовними</li>
              <li>• Необхідно мати медичну довідку</li>
              <li>• Спортивна форма обов'язкова</li>
              {/*<li>• Вхід на тренування за попереднім записом</li>*/}
              {/*<li>*/}
              {/*  • При пропуску трьох занять поспіль без попередження місце в*/}
              {/*  групі може бути передано іншій дитині*/}
              {/*</li>*/}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Schedule;