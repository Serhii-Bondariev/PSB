import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import { SearchIcon, TrashIcon, MailIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}
const initialMessages: Message[] = [{
  id: 1,
  name: 'Іван Петренко',
  email: 'ivan@example.com',
  phone: '+380991234567',
  message: 'Хочу записати дитину на бокс. Які документи потрібні?',
  date: '2024-01-15',
  status: 'new'
}, {
  id: 2,
  name: 'Марія Коваленко',
  email: 'maria@example.com',
  phone: '+380971234567',
  message: 'Цікавить розклад занять з вільної боротьби.',
  date: '2024-01-14',
  status: 'read'
}];
const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'read'>('all');
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) || message.email.toLowerCase().includes(searchTerm.toLowerCase()) || message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || message.status === filter;
    return matchesSearch && matchesFilter;
  });
  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(message => message.id === id ? {
      ...message,
      status: 'read' as const
    } : message));
  };
  const handleDelete = (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити це повідомлення?')) {
      setMessages(messages.filter(message => message.id !== id));
    }
  };
  return <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">Повідомлення</h2>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
                <input type="text" placeholder="Пошук повідомлень..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                  Всі
                </button>
                <button onClick={() => setFilter('new')} className={`px-4 py-2 rounded-lg ${filter === 'new' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                  Нові
                </button>
                <button onClick={() => setFilter('read')} className={`px-4 py-2 rounded-lg ${filter === 'read' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                  Прочитані
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Відправник
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Повідомлення
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
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
                  {filteredMessages.map(message => <tr key={message.id} className={`hover:bg-gray-50 ${message.status === 'new' ? 'bg-blue-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                              <MailIcon size={20} />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {message.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {message.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {message.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {message.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.date).toLocaleDateString('uk-UA')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${message.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {message.status === 'new' ? <>
                              <CheckCircleIcon size={12} className="mr-1" />
                              Нове
                            </> : <>
                              <XCircleIcon size={12} className="mr-1" />
                              Прочитано
                            </>}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {message.status === 'new' && <button onClick={() => handleMarkAsRead(message.id)} className="text-primary hover:text-primary-dark mr-3">
                            Позначити як прочитане
                          </button>}
                        <button onClick={() => handleDelete(message.id)} className="text-red-500 hover:text-red-700">
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
export default Messages;