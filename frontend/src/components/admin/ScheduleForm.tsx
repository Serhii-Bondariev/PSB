import React, { useState } from 'react';
import { XIcon, PlusIcon, TrashIcon } from 'lucide-react';
interface ScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleFormData) => void;
  initialData?: ScheduleFormData;
  title: string;
  trainers: {
    id: number;
    name: string;
  }[];
}
export interface ScheduleFormData {
  id?: number;
  sport: string;
  trainer: string;
  location: string;
  schedule: {
    day: string;
    time: string;
  }[];
}
const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'];
const ScheduleForm: React.FC<ScheduleFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  trainers
}) => {
  const [formData, setFormData] = useState<ScheduleFormData>(initialData || {
    sport: '',
    trainer: '',
    location: '',
    schedule: [{
      day: '',
      time: ''
    }]
  });
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const addScheduleItem = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, {
        day: '',
        time: ''
      }]
    });
  };
  const removeScheduleItem = (index: number) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index)
    });
  };
  const updateScheduleItem = (index: number, field: 'day' | 'time', value: string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = {
      ...newSchedule[index],
      [field]: value
    };
    setFormData({
      ...formData,
      schedule: newSchedule
    });
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-dark">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-dark transition-colors">
            <XIcon size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Вид спорту
            </label>
            <select value={formData.sport} onChange={e => setFormData({
            ...formData,
            sport: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
              <option value="">Оберіть вид спорту</option>
              <option value="Бокс">Бокс</option>
              <option value="Вільна боротьба">Вільна боротьба</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Тренер
            </label>
            <select value={formData.trainer} onChange={e => setFormData({
            ...formData,
            trainer: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
              <option value="">Оберіть тренера</option>
              {trainers.map(trainer => <option key={trainer.id} value={trainer.name}>
                  {trainer.name}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Місце проведення
            </label>
            <input type="text" value={formData.location} onChange={e => setFormData({
            ...formData,
            location: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Наприклад: Зал №1" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Розклад занять
            </label>
            {formData.schedule.map((item, index) => <div key={index} className="flex gap-4 mb-2">
                <select value={item.day} onChange={e => updateScheduleItem(index, 'day', e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>
                  <option value="">Оберіть день</option>
                  {days.map(day => <option key={day} value={day}>
                      {day}
                    </option>)}
                </select>
                <input type="text" value={item.time} onChange={e => updateScheduleItem(index, 'time', e.target.value)} placeholder="Наприклад: 16:00 - 19:00" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                {formData.schedule.length > 1 && <button type="button" onClick={() => removeScheduleItem(index)} className="text-red-500 hover:text-red-700">
                    <TrashIcon size={20} />
                  </button>}
              </div>)}
            <button type="button" onClick={addScheduleItem} className="mt-2 text-primary hover:text-dark flex items-center gap-1 text-sm">
              <PlusIcon size={16} />
              Додати час заняття
            </button>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-dark transition-colors">
              Скасувати
            </button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
              {initialData ? 'Зберегти' : 'Створити'}
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default ScheduleForm;