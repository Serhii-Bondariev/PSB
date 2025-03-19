import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import Sidebar from '../../components/admin/Sidebar';
import { PlusIcon, TrashIcon, VideoIcon, EditIcon, XIcon } from 'lucide-react';
interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  thumbnail?: string;
}
const initialMedia: MediaItem[] = [{
  id: 1,
  type: 'image',
  url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
  title: 'Тренування з боксу'
}, {
  id: 2,
  type: 'video',
  url: 'https://www.youtube.com/embed/example1',
  title: 'Показовий виступ з боксу',
  thumbnail: 'https://images.unsplash.com/photo-1555597673-b21d5c935865'
}];
const GalleryAdmin: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [newMedia, setNewMedia] = useState({
    type: 'image' as 'image' | 'video',
    url: '',
    title: '',
    thumbnail: ''
  });
  const filteredMedia = media.filter(item => filter === 'all' || item.type === filter);
  const handleAddMedia = () => {
    if (newMedia.url && newMedia.title) {
      const newId = Math.max(...media.map(m => m.id), 0) + 1;
      setMedia([...media, {
        ...newMedia,
        id: newId
      }]);
      setNewMedia({
        type: 'image',
        url: '',
        title: '',
        thumbnail: ''
      });
      setIsModalOpen(false);
    }
  };
  const handleUpdateMedia = () => {
    if (editingMedia) {
      setMedia(media.map(item => item.id === editingMedia.id ? editingMedia : item));
      setEditingMedia(null);
    }
  };
  const handleDeleteMedia = (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей медіа контент?')) {
      setMedia(media.filter(item => item.id !== id));
    }
  };
  const extractYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };
  const validateYouTubeUrl = (url: string): boolean => {
    return !!extractYouTubeId(url);
  };
  return <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">
              Управління галереєю
            </h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
              <PlusIcon size={18} className="mr-2" />
              Додати медіа
            </button>
          </div>
          <div className="flex rounded-lg overflow-hidden mb-6 w-fit">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
              Все
            </button>
            <button onClick={() => setFilter('image')} className={`px-4 py-2 ${filter === 'image' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
              Фото
            </button>
            <button onClick={() => setFilter('video')} className={`px-4 py-2 ${filter === 'video' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
              Відео
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map(item => <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  {item.type === 'video' ? <>
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-dark bg-opacity-40 flex items-center justify-center">
                        <VideoIcon className="text-white w-12 h-12" />
                      </div>
                    </> : <img src={item.url} alt={item.title} className="w-full h-full object-cover" />}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => setEditingMedia(item)} className="text-secondary hover:text-primary transition-colors">
                      <EditIcon size={18} />
                    </button>
                    <button onClick={() => handleDeleteMedia(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Add/Edit Modal */}
      {(isModalOpen || editingMedia) && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-dark">
                {editingMedia ? 'Редагувати медіа' : 'Додати нове медіа'}
              </h3>
              <button onClick={() => {
            setIsModalOpen(false);
            setEditingMedia(null);
          }} className="text-gray-500 hover:text-dark">
                <XIcon size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тип медіа
                </label>
                <select value={editingMedia ? editingMedia.type : newMedia.type} onChange={e => editingMedia ? setEditingMedia({
              ...editingMedia,
              type: e.target.value as 'image' | 'video'
            }) : setNewMedia({
              ...newMedia,
              type: e.target.value as 'image' | 'video'
            })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="image">Фото</option>
                  <option value="video">Відео</option>
                </select>
              </div>
              {(editingMedia?.type === 'video' || newMedia.type === 'video') && <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube URL
                  </label>
                  <input type="text" value={editingMedia ? editingMedia.url : newMedia.url} onChange={e => {
              const url = e.target.value;
              if (validateYouTubeUrl(url)) {
                const videoId = extractYouTubeId(url);
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                editingMedia ? setEditingMedia({
                  ...editingMedia,
                  url: embedUrl,
                  thumbnail: thumbnailUrl
                }) : setNewMedia({
                  ...newMedia,
                  url: embedUrl,
                  thumbnail: thumbnailUrl
                });
              }
            }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://www.youtube.com/watch?v=..." />
                </div>}
              {(editingMedia?.type === 'image' || newMedia.type === 'image') && <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL зображення
                  </label>
                  <input type="text" value={editingMedia ? editingMedia.url : newMedia.url} onChange={e => editingMedia ? setEditingMedia({
              ...editingMedia,
              url: e.target.value
            }) : setNewMedia({
              ...newMedia,
              url: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://example.com/image.jpg" />
                </div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Назва
                </label>
                <input type="text" value={editingMedia ? editingMedia.title : newMedia.title} onChange={e => editingMedia ? setEditingMedia({
              ...editingMedia,
              title: e.target.value
            }) : setNewMedia({
              ...newMedia,
              title: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Назва медіа" />
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => {
              setIsModalOpen(false);
              setEditingMedia(null);
            }} className="px-4 py-2 text-gray-600 hover:text-dark">
                  Скасувати
                </button>
                <button onClick={editingMedia ? handleUpdateMedia : handleAddMedia} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90">
                  {editingMedia ? 'Зберегти' : 'Додати'}
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default GalleryAdmin;