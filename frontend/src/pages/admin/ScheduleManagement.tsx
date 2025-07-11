//frontend/src/pages/admin/ScheduleManagement.tsx

// frontend/src/pages/admin/ScheduleManagement.tsx
import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import ScheduleForm, { ScheduleFormData } from '../../components/admin/ScheduleForm';
import {
  fetchSchedules,
  fetchTrainers,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../../utils/api';

const ScheduleManagement: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleFormData[]>([]);
  const [trainers, setTrainers] = useState<{ id: string; name: string }[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [schedulesData, trainersData] = await Promise.all([
          fetchSchedules(),
          fetchTrainers(),
        ]);
        setSchedules(schedulesData);
        setTrainers(trainersData);
      } catch (err) {
        console.error('Помилка завантаження даних:', err);
        setError('Помилка завантаження даних');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCreateSchedule = async (data: ScheduleFormData) => {
    try {
      console.log('Надіслані дані:', data); // Діагностика
      const newSchedule = await createSchedule(data);
      setSchedules([...schedules, newSchedule]);
      setIsFormOpen(false);
    } catch (err: any) {
      console.error('Помилка створення розкладу:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(`Помилка створення розкладу: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleUpdateSchedule = async (data: ScheduleFormData) => {
    try {
      const updatedSchedule = await updateSchedule(data.id!, data);
      setSchedules(
        schedules.map((schedule) => (schedule.id === data.id ? updatedSchedule : schedule))
      );
      setEditingSchedule(null);
    } catch (err: any) {
      console.error('Помилка оновлення розкладу:', err);
      setError(`Помилка оновлення розкладу: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей розклад?')) {
      try {
        await deleteSchedule(id);
        setSchedules(schedules.filter((schedule) => schedule.id !== id));
      } catch (err: any) {
        console.error('Помилка видалення розкладу:', err);
        setError(`Помилка видалення розкладу: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  if (loading) return <div className="p-6">Завантаження...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">Управління розкладом</h2>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
            >
              <PlusIcon size={18} className="mr-2" />
              Додати розклад
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-primary text-white p-6">
                  <h3 className="text-xl font-bold">{schedule.sport}</h3>
                  <p className="text-sm opacity-90">Тренер: {schedule.trainer}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">Місце проведення: {schedule.location}</p>
                  <div className="space-y-3">
                    {schedule.schedule.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">{item.day}</span>
                        <span className="text-gray-600">{item.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      onClick={() => setEditingSchedule(schedule)}
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      <EditIcon size={18} />
                    </button>
                    <button
                      onClick={() => schedule.id && handleDeleteSchedule(schedule.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ScheduleForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateSchedule}
        title="Додати новий розклад"
        trainers={trainers}
      />
      {editingSchedule && (
        <ScheduleForm
          isOpen={true}
          onClose={() => setEditingSchedule(null)}
          onSubmit={handleUpdateSchedule}
          initialData={editingSchedule}
          title="Редагувати розклад"
          trainers={trainers}
        />
      )}
    </div>
  );
};

export default ScheduleManagement;
// import React, { useState, useEffect } from 'react';
// import AdminHeader from '../../components/admin/AdminHeader';
// import Sidebar from '../../components/admin/Sidebar';
// import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
// import ScheduleForm, { ScheduleFormData } from '../../components/admin/ScheduleForm';
// import {
//   fetchSchedules,
//   fetchTrainers,
//   createSchedule,
//   updateSchedule,
//   deleteSchedule,
// } from '../../utils/api';

// const ScheduleManagement: React.FC = () => {
//   const [schedules, setSchedules] = useState<ScheduleFormData[]>([]);
//   const [trainers, setTrainers] = useState<{ id: string; name: string }[]>([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingSchedule, setEditingSchedule] = useState<ScheduleFormData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [schedulesData, trainersData] = await Promise.all([
//           fetchSchedules(),
//           fetchTrainers(),
//         ]);
//         setSchedules(schedulesData);
//         setTrainers(trainersData);
//       } catch (err) {
//         console.error('Помилка завантаження даних:', err); // Логування помилки
//         setError('Помилка завантаження даних');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []); // Порожній масив залежностей, щоб уникнути повторних запитів

//   const handleCreateSchedule = async (data: ScheduleFormData) => {
//     try {
//       const newSchedule = await createSchedule(data);
//       setSchedules([...schedules, newSchedule]);
//       setIsFormOpen(false);
//     } catch (err) {
//       console.error('Помилка створення розкладу:', err); // Логування помилки
//       setError('Помилка створення розкладу');
//     }
//   };

//   const handleUpdateSchedule = async (data: ScheduleFormData) => {
//     try {
//       const updatedSchedule = await updateSchedule(data.id!, data);
//       setSchedules(
//         schedules.map((schedule) => (schedule.id === data.id ? updatedSchedule : schedule))
//       );
//       setEditingSchedule(null);
//     } catch (err) {
//       console.error('Помилка створення розкладу:', err); // Логування помилки
//       setError('Помилка оновлення розкладу');
//     }
//   };

//   const handleDeleteSchedule = async (id: string) => {
//     if (window.confirm('Ви впевнені, що хочете видалити цей розклад?')) {
//       try {
//         await deleteSchedule(id);
//         setSchedules(schedules.filter((schedule) => schedule.id !== id));
//       } catch (err) {
//         console.error('Помилка видалення розкладу:', err); // Логування помилки
//         setError('Помилка видалення розкладу');
//       }
//     }
//   };

//   if (loading) return <div className="p-6">Завантаження...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;

//   return (
//     <div className="flex min-h-screen bg-light">
//       <Sidebar />
//       <div className="flex-1">
//         <AdminHeader />
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-dark">Управління розкладом</h2>
//             <button
//               onClick={() => setIsFormOpen(true)}
//               className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
//             >
//               <PlusIcon size={18} className="mr-2" />
//               Додати розклад
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {schedules.map((schedule) => (
//               <div key={schedule.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="bg-primary text-white p-6">
//                   <h3 className="text-xl font-bold">{schedule.sport}</h3>
//                   <p className="text-sm opacity-90">Тренер: {schedule.trainer}</p>
//                 </div>
//                 <div className="p-6">
//                   <p className="text-gray-600 mb-4">Місце проведення: {schedule.location}</p>
//                   <div className="space-y-3">
//                     {schedule.schedule.map((item, index) => (
//                       <div key={index} className="flex justify-between items-center border-b pb-2">
//                         <span className="font-medium">{item.day}</span>
//                         <span className="text-gray-600">{item.time}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex justify-end space-x-2 mt-4">
//                     <button
//                       onClick={() => setEditingSchedule(schedule)}
//                       className="text-secondary hover:text-primary transition-colors"
//                     >
//                       <EditIcon size={18} />
//                     </button>
//                     <button
//                       onClick={() => schedule.id && handleDeleteSchedule(schedule.id)}
//                       className="text-red-500 hover:text-red-700 transition-colors"
//                     >
//                       <TrashIcon size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <ScheduleForm
//         isOpen={isFormOpen}
//         onClose={() => setIsFormOpen(false)}
//         onSubmit={handleCreateSchedule}
//         title="Додати новий розклад"
//         trainers={trainers}
//       />
//       {editingSchedule && (
//         <ScheduleForm
//           isOpen={true}
//           onClose={() => setEditingSchedule(null)}
//           onSubmit={handleUpdateSchedule}
//           initialData={editingSchedule}
//           title="Редагувати розклад"
//           trainers={trainers}
//         />
//       )}
//     </div>
//   );
// };

// export default ScheduleManagement;
