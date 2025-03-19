import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
interface TrainerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TrainerFormData) => void;
  initialData?: TrainerFormData;
  title: string;
}
export interface TrainerFormData {
  id?: number;
  name: string;
  position: string;
  experience: string;
  image: string;
  achievements: string[];
}
const TrainerForm: React.FC<TrainerFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title
}) => {
  const [formData, setFormData] = useState<TrainerFormData>(initialData || {
    name: '',
    position: '',
    experience: '',
    image: '',
    achievements: ['']
  });
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({
      ...formData,
      achievements: newAchievements
    });
  };
  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, '']
    });
  };
  const removeAchievement = (index: number) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      achievements: newAchievements
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
              ПІБ тренера
            </label>
            <input type="text" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Посада
            </label>
            <input type="text" value={formData.position} onChange={e => setFormData({
            ...formData,
            position: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Досвід
            </label>
            <input type="text" value={formData.experience} onChange={e => setFormData({
            ...formData,
            experience: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL фото
            </label>
            <input type="text" value={formData.image} onChange={e => setFormData({
            ...formData,
            image: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Досягнення
            </label>
            {formData.achievements.map((achievement, index) => <div key={index} className="flex gap-2 mb-2">
                <input type="text" value={achievement} onChange={e => handleAchievementChange(index, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                {formData.achievements.length > 1 && <button type="button" onClick={() => removeAchievement(index)} className="px-3 py-2 text-red-500 hover:text-red-700">
                    Видалити
                  </button>}
              </div>)}
            <button type="button" onClick={addAchievement} className="text-primary hover:text-dark text-sm">
              + Додати досягнення
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
export default TrainerForm;