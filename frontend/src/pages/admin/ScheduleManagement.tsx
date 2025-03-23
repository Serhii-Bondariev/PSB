import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import ScheduleForm, { ScheduleFormData } from '../../components/admin/ScheduleForm';
const initialSchedules = [{
  id: 1,
  sport: 'Бокс',
  trainer: 'Олександр Петренко',
  location: 'Зал №1',
  schedule: [{
    day: 'Понеділок',
    time: '16:00 - 19:00'
  }, {
    day: 'Середа',
    time: '16:00 - 19:00'
  }, {
    day: "П'ятниця",
    time: '16:00 - 19:00'
  }]
}, {
  id: 2,
  sport: 'Вільна боротьба',
  trainer: 'Микола Іваненко',
  location: 'Зал №2',
  schedule: [{
    day: 'Вівторок',
    time: '16:00 - 19:00'
  }, {
    day: 'Четвер',
    time: '16:00 - 19:00'
  }, {
    day: 'Субота',
    time: '16:00 - 19:00'
  }]
}];
const trainers = [{
  id: 1,
  name: 'Олександр Петренко'
}, {
  id: 2,
  name: 'Микола Іваненко'
}, {
  id: 3,
  name: 'Ірина Ковальчук'
}, {
  id: 4,
  name: 'Андрій Мельник'
}];
const ScheduleManagement: React.FC = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleFormData | null>(null);
  const handleCreateSchedule = (data: ScheduleFormData) => {
    const newSchedule = {
      ...data,
      id: Math.max(...schedules.map(s => s.id)) + 1
    };
    setSchedules([...schedules, newSchedule]);
    setIsFormOpen(false);
  };
  const handleUpdateSchedule = (data: ScheduleFormData) => {
    setSchedules(schedules.map(schedule => schedule.id === editingSchedule?.id ? {
      ...schedule,
      ...data
    } : schedule));
    setEditingSchedule(null);
  };
  const handleDeleteSchedule = (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей розклад?')) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    }
  };
  return <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">
              Управління розкладом
            </h2>
            <button onClick={() => setIsFormOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
              <PlusIcon size={18} className="mr-2" />
              Додати розклад
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedules.map(schedule => <div key={schedule.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary text-white p-6">
                  <h3 className="text-xl font-bold">{schedule.sport}</h3>
                  <p className="text-sm opacity-90">
                    Тренер: {schedule.trainer}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Місце проведення: {schedule.location}
                  </p>
                  <div className="space-y-3">
                    {schedule.schedule.map((item, index) => <div key={index} className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">{item.day}</span>
                        <span className="text-gray-600">{item.time}</span>
                      </div>)}
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={() => setEditingSchedule(schedule)} className="text-secondary hover:text-primary transition-colors">
                      <EditIcon size={18} />
                    </button>
                    <button onClick={() => handleDeleteSchedule(schedule.id)} className="text-red-500 hover:text-red-700 transition-colors">
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      <ScheduleForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleCreateSchedule} title="Додати новий розклад" trainers={trainers} />
      {editingSchedule && <ScheduleForm isOpen={true} onClose={() => setEditingSchedule(null)} onSubmit={handleUpdateSchedule} initialData={editingSchedule} title="Редагувати розклад" trainers={trainers} />}
    </div>;
};
export default ScheduleManagement;