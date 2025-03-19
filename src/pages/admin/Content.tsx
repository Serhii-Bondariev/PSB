import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import { PlusIcon, SearchIcon, EditIcon, FolderIcon, FileTextIcon, TrashIcon } from 'lucide-react';
import PageForm, { PageFormData } from '../../components/admin/PageForm';
interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  lastUpdated: string;
  status: 'published' | 'draft';
}
const initialPages: Page[] = [{
  id: 1,
  title: 'Головна сторінка',
  slug: 'home',
  content: 'Контент головної сторінки',
  lastUpdated: '2023-06-15',
  status: 'published'
}, {
  id: 2,
  title: 'Про нас',
  slug: 'about',
  content: 'Інформація про наш центр',
  lastUpdated: '2023-05-20',
  status: 'published'
}];
const Content: React.FC = () => {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || page.status === filter;
    return matchesSearch && matchesFilter;
  });
  const handleCreatePage = (data: PageFormData) => {
    const newPage = {
      ...data,
      id: Math.max(...pages.map(p => p.id)) + 1,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPages([...pages, newPage]);
    setIsFormOpen(false);
  };
  const handleEditPage = (data: PageFormData) => {
    setPages(pages.map(page => page.id === editingPage?.id ? {
      ...page,
      ...data,
      lastUpdated: new Date().toISOString().split('T')[0]
    } : page));
    setEditingPage(null);
  };
  const handleDeletePage = (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю сторінку?')) {
      setPages(pages.filter(page => page.id !== id));
    }
  };
  return <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">
              Управління контентом
            </h2>
            <button onClick={() => setIsFormOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
              <PlusIcon size={18} className="mr-2" />
              Нова сторінка
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full md:w-auto md:flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
                <input type="text" placeholder="Пошук сторінок..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="flex space-x-2 w-full md:w-auto">
                {['all', 'published', 'draft'].map(filterOption => <button key={filterOption} onClick={() => setFilter(filterOption)} className={`px-4 py-2 rounded-lg ${filter === filterOption ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                    {filterOption === 'all' ? 'Всі' : filterOption === 'published' ? 'Опубліковані' : 'Чернетки'}
                  </button>)}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сторінка
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Останнє оновлення
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
                  {filteredPages.map(page => <tr key={page.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-primary mr-3">
                            {page.slug === 'home' ? <FolderIcon size={20} /> : <FileTextIcon size={20} />}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {page.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        /{page.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {page.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {page.status === 'published' ? 'Опубліковано' : 'Чернетка'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => setEditingPage(page)} className="text-secondary hover:text-primary mr-3" title="Редагувати">
                          <EditIcon size={18} />
                        </button>
                        <button onClick={() => handleDeletePage(page.id)} className="text-red-500 hover:text-red-700" title="Видалити">
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
      <PageForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleCreatePage} title="Створення нової сторінки" />
      {editingPage && <PageForm isOpen={true} onClose={() => setEditingPage(null)} onSubmit={handleEditPage} initialData={editingPage} title="Редагування сторінки" />}
    </div>;
};
export default Content;