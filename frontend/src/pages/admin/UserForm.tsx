//frontend/src/pages/admin/Users.tsx
import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

export interface UserFormData {
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  password?: string;
}

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  initialData?: UserFormData;
  title: string;
}

const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, onSubmit, initialData, title }) => {
  const [formData, setFormData] = useState<UserFormData>(
    initialData || {
      name: '',
      email: '',
      role: 'user',
      password: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', role: 'user', password: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ім'я</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Роль</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as 'admin' | 'moderator' | 'user' })
              }
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="admin">Адміністратор</option>
              <option value="moderator">Тренер</option>
              <option value="user">Користувач</option>
            </select>
          </div>
          {!initialData && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Пароль</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
              Скасувати
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
