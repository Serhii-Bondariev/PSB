import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import { PlusIcon, SearchIcon, EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
// Mock data for users
const initialUsers = [{
  id: 1,
  name: 'Адміністратор',
  email: 'admin@sport.com',
  role: 'admin',
  status: 'active'
}, {
  id: 2,
  name: 'Модератор 1',
  email: 'mod1@sport.com',
  role: 'moderator',
  status: 'active'
}, {
  id: 3,
  name: 'Модератор 2',
  email: 'mod2@sport.com',
  role: 'moderator',
  status: 'active'
}, {
  id: 4,
  name: 'Іван Петренко',
  email: 'ivan@example.com',
  role: 'coach',
  status: 'active'
}, {
  id: 5,
  name: 'Марія Коваленко',
  email: 'maria@example.com',
  role: 'coach',
  status: 'inactive'
}];
const Users: React.FC = () => {
  const [users] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">Користувачі</h2>
            <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
              <PlusIcon size={18} className="mr-2" />
              Додати користувача
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
                <input type="text" placeholder="Пошук користувачів..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Користувач
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Роль
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(user => <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-primary bg-opacity-10 text-primary' : user.role === 'moderator' ? 'bg-secondary bg-opacity-10 text-secondary' : 'bg-accent bg-opacity-10 text-dark'}`}>
                          {user.role === 'admin' ? 'Адміністратор' : user.role === 'moderator' ? 'Модератор' : 'Тренер'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`flex items-center ${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                          {user.status === 'active' ? <>
                              <CheckCircleIcon size={16} className="mr-1" />
                              Активний
                            </> : <>
                              <XCircleIcon size={16} className="mr-1" />
                              Неактивний
                            </>}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-secondary hover:text-primary mr-3">
                          <EditIcon size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <TrashIcon size={18} />
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Users;