import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import TrainerForm, { TrainerFormData } from '../../components/admin/TrainerForm';
const initialTrainers = [{
  id: 1,
  name: 'Олександр Петренко',
  position: 'Тренер з боксу',
  experience: '15 років досвіду',
  image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  achievements: ['Майстер спорту міжнародного класу', 'Чемпіон України']
}, {
  id: 2,
  name: 'Микола Іваненко',
  position: 'Тренер з вільної боротьби',
  experience: '12 років досвіду',
  image: 'https://images.unsplash.com/photo-1583468982228-19f19164aee3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  achievements: ['Заслужений тренер України', 'Майстер спорту']
}];
const TrainersManagement: React.FC = () => {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<TrainerFormData | null>(null);
  const handleCreateTrainer = (data: TrainerFormData) => {
    const newTrainer = {
      ...data,
      id: Math.max(...trainers.map(t => t.id)) + 1
    };
    setTrainers([...trainers, newTrainer]);
    setIsFormOpen(false);
  };
  const handleUpdateTrainer = (data: TrainerFormData) => {
    setTrainers(trainers.map(trainer => trainer.id === editingTrainer?.id ? {
      ...trainer,
      ...data
    } : trainer));
    setEditingTrainer(null);
  };
  const handleDeleteTrainer = (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього тренера?')) {
      setTrainers(trainers.filter(trainer => trainer.id !== id));
    }
  };
  return <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">
              Управління тренерами
            </h2>
            <button onClick={() => setIsFormOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
              <PlusIcon size={18} className="mr-2" />
              Додати тренера
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map(trainer => <div key={trainer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {trainer.name}
                  </h3>
                  <p className="text-secondary font-medium mb-2">
                    {trainer.position}
                  </p>
                  <p className="text-gray-600 mb-4">{trainer.experience}</p>
                  <div className="space-y-2 mb-4">
                    {trainer.achievements.map((achievement, index) => <p key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                        {achievement}
                      </p>)}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => setEditingTrainer(trainer)} className="text-secondary hover:text-primary transition-colors">
                      <EditIcon size={18} />
                    </button>
                    <button onClick={() => handleDeleteTrainer(trainer.id)} className="text-red-500 hover:text-red-700 transition-colors">
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      <TrainerForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleCreateTrainer} title="Додати нового тренера" />
      {editingTrainer && <TrainerForm isOpen={true} onClose={() => setEditingTrainer(null)} onSubmit={handleUpdateTrainer} initialData={editingTrainer} title="Редагувати тренера" />}
    </div>;
};
export default TrainersManagement;