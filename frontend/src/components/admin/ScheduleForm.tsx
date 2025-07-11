// // frontend/src/components/admin/ScheduleForm.tsx

import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';

interface ScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleFormData) => void;
  initialData?: ScheduleFormData;
  title: string;
  trainers: { id: string; name: string }[];
}

export interface ScheduleFormData {
  id?: string;
  sport: string;
  name: string;
  phone: string;
  email: string;
  trainer: string;
  location: string;
  schedule: { day: string; time: string }[];
  photo?: string;
  description?: string;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  trainers,
}) => {
  const [formData, setFormData] = useState<ScheduleFormData>(
    initialData || {
      sport: '',
      name: '',
      phone: '',
      email: '',
      trainer: '',
      location: '',
      schedule: [{ day: '', time: '' }],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addScheduleItem = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: '', time: '' }],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Вид спорту</label>
            <input
              type="text"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Назва</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Телефон</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Електронна пошта</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Тренер</label>
            <select
              name="trainer"
              value={formData.trainer}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Оберіть тренера</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Місце проведення</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Розклад</label>
            {formData.schedule.map((item, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  name="day"
                  value={item.day}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: formData.schedule.map((s, i) =>
                        i === index ? { ...s, day: e.target.value } : s
                      ),
                    })
                  }
                  placeholder="День"
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="time"
                  value={item.time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schedule: formData.schedule.map((s, i) =>
                        i === index ? { ...s, time: e.target.value } : s
                      ),
                    })
                  }
                  placeholder="Час"
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addScheduleItem}
              className="text-primary hover:text-secondary flex items-center"
            >
              <PlusIcon size={18} className="mr-2" />
              Додати час
            </button>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700"
            >
              Скасувати
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleForm;
// import React, { useState } from 'react';
// import { XIcon, PlusIcon, TrashIcon } from 'lucide-react';

// interface ScheduleFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: ScheduleFormData) => void;
//   initialData?: ScheduleFormData;
//   title: string;
//   trainers: {
//     id: string;
//     name: string;
//   }[];
// }

// export interface ScheduleFormData {
//   id?: string;
//   sport: string;
//   name: string; // Додано
//   phone: string; // Додано
//   email: string; // Додано
//   trainer: string;
//   location: string;
//   schedule: { day: string; time: string }[];
//   photo?: string; // Необов’язкове
//   description?: string; // Необов’язкове
// }

// const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'];

// const ScheduleForm: React.FC<ScheduleFormProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialData,
//   title,
//   trainers,
// }) => {
//   const [formData, setFormData] = useState<ScheduleFormData>(
//     initialData || {
//       sport: '',
//       trainer: '',
//       location: '',
//       schedule: [{ day: '', time: '' }],
//     }
//   );

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const addScheduleItem = () => {
//     setFormData({
//       ...formData,
//       schedule: [...formData.schedule, { day: '', time: '' }],
//     });
//   };

//   const removeScheduleItem = (index: number) => {
//     setFormData({
//       ...formData,
//       schedule: formData.schedule.filter((_, i) => i !== index),
//     });
//   };

//   const updateScheduleItem = (index: number, field: 'day' | 'time', value: string) => {
//     const newSchedule = [...formData.schedule];
//     newSchedule[index] = {
//       ...newSchedule[index],
//       [field]: value,
//     };
//     setFormData({
//       ...formData,
//       schedule: newSchedule,
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-dark">{title}</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-dark transition-colors">
//             <XIcon size={24} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Вид спорту</label>
//             <select
//               value={formData.sport}
//               onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             >
//               <option value="">Оберіть вид спорту</option>
//               <option value="Бокс">Бокс</option>
//               <option value="Вільна боротьба">Вільна боротьба</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Тренер</label>
//             <select
//               value={formData.trainer}
//               onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             >
//               <option value="">Оберіть тренера</option>
//               {trainers.map((trainer) => (
//                 <option key={trainer.id} value={trainer.name}>
//                   {trainer.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Місце проведення</label>
//             <input
//               type="text"
//               value={formData.location}
//               onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               placeholder="Наприклад: Зал №1"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Розклад занять</label>
//             {formData.schedule.map((item, index) => (
//               <div key={index} className="flex gap-4 mb-2">
//                 <select
//                   value={item.day}
//                   onChange={(e) => updateScheduleItem(index, 'day', e.target.value)}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                   required
//                 >
//                   <option value="">Оберіть день</option>
//                   {days.map((day) => (
//                     <option key={day} value={day}>
//                       {day}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="text"
//                   value={item.time}
//                   onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
//                   placeholder="Наприклад: 16:00 - 19:00"
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//                   required
//                 />
//                 {formData.schedule.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeScheduleItem(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <TrashIcon size={20} />
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addScheduleItem}
//               className="mt-2 text-primary hover:text-dark flex items-center gap-1 text-sm"
//             >
//               <PlusIcon size={16} />
//               Додати час заняття
//             </button>
//           </div>
//           <div className="flex justify-end space-x-4 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 hover:text-dark transition-colors"
//             >
//               Скасувати
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
//             >
//               {initialData ? 'Зберегти' : 'Створити'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ScheduleForm;
