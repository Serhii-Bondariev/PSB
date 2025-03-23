import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ImageIcon, VideoIcon } from 'lucide-react';
interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  thumbnail?: string;
}
const mediaItems: MediaItem[] = [{
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
}, {
  id: 3,
  type: 'image',
  url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed',
  title: 'Тренування молодих боксерів'
}, {
  id: 4,
  type: 'video',
  url: 'https://www.youtube.com/watch?v=DgRQM_ldCQk',
  title: 'Змагання з вільної боротьби',
  thumbnail: 'https://images.unsplash.com/photo-1622599511051-16f55a1234d0'
}];
const GalleryAdmin: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const filteredMedia = mediaItems.filter(item => filter === 'all' || item.type === filter).sort((a, b) => sortBy === 'newest' ? b.id - a.id : a.id - b.id);
  const renderMediaItem = (item: MediaItem) => {
    if (item.type === 'video') {
      return <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-video">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <VideoIcon className="text-white w-12 h-12" />
            <p className="text-white text-center font-semibold px-4 absolute bottom-4">
              {item.title}
            </p>
          </div>
        </div>;
    }
    return <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img src={item.url} alt={item.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-dark bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <ImageIcon className="text-white w-12 h-12" />
          <p className="text-white text-center font-semibold px-4 absolute bottom-4">
            {item.title}
          </p>
        </div>
      </div>;
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-dark mb-4">
                Галерея центру
              </h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Фотографії та відео з тренувань та спортивних заходів нашого
                центру
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex rounded-lg overflow-hidden">
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
              <select value={sortBy} onChange={e => setSortBy(e.target.value as 'newest' | 'oldest')} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="newest">Спочатку нові</option>
                <option value="oldest">Спочатку старі</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map(item => <div key={item.id}>{renderMediaItem(item)}</div>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default GalleryAdmin;