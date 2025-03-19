import React from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import { UserPlusIcon, CalendarIcon, MessageSquareIcon, BarChart3Icon, UsersIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const DashboardCard = ({
  title,
  value,
  icon,
  color
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) => <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center space-x-4">
      <div className={`${color} rounded-full p-3`}>{icon}</div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>;
const Dashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  return <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-dark mb-1">
              Вітаємо, {user?.name}!
            </h2>
            <p className="text-gray-500">
              Ось огляд активності спортивного центру
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard title="Активних учасників" value="156" icon={<UsersIcon size={24} className="text-primary" />} color="bg-primary bg-opacity-10" />
            <DashboardCard title="Нові реєстрації" value="8" icon={<UserPlusIcon size={24} className="text-secondary" />} color="bg-secondary bg-opacity-10" />
            <DashboardCard title="Заняття сьогодні" value="4" icon={<CalendarIcon size={24} className="text-accent" />} color="bg-accent bg-opacity-10" />
            <DashboardCard title="Нові повідомлення" value="3" icon={<MessageSquareIcon size={24} className="text-dark" />} color="bg-dark bg-opacity-10" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-dark">
                  Відвідуваність за секціями
                </h3>
                <select className="border rounded-lg px-3 py-1 text-sm">
                  <option>За тиждень</option>
                  <option>За місяць</option>
                  <option>За рік</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center">
                <BarChart3Icon size={120} className="text-gray-300" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-dark mb-6">
                Статистика секцій
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Бокс</span>
                    <span className="font-medium">82</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{
                    width: '75%'
                  }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Вільна боротьба</span>
                    <span className="font-medium">74</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{
                    width: '65%'
                  }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;