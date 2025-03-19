import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
interface PageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PageFormData) => void;
  initialData?: PageFormData;
  title: string;
}
export interface PageFormData {
  id?: number;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
}
const PageForm: React.FC<PageFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title
}) => {
  const [formData, setFormData] = useState<PageFormData>(initialData || {
    title: '',
    slug: '',
    content: '',
    status: 'draft'
  });
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
              Заголовок
            </label>
            <input type="text" value={formData.title} onChange={e => setFormData({
            ...formData,
            title: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL (slug)
            </label>
            <input type="text" value={formData.slug} onChange={e => setFormData({
            ...formData,
            slug: e.target.value
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Контент
            </label>
            <textarea value={formData.content} onChange={e => setFormData({
            ...formData,
            content: e.target.value
          })} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Статус
            </label>
            <select value={formData.status} onChange={e => setFormData({
            ...formData,
            status: e.target.value as 'published' | 'draft'
          })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="draft">Чернетка</option>
              <option value="published">Опубліковано</option>
            </select>
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
export default PageForm;