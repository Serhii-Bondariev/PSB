import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ImageIcon, VideoIcon } from 'lucide-react';
import boxingImage from '../assets/boxingImg.webp';
interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  thumbnail?: string;
}
const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    url: boxingImage,
    title: 'Тренування з боксу',
  },
  {
    id: 2,
    type: 'video',
    url: 'https://www.youtube.com/embed/example1',
    title: 'Показовий виступ з боксу',
    thumbnail:
      'data:image/jpeg;base64,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',
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed',
    title: 'Тренування молодих боксерів',
  },
  {
    id: 4,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=DgRQM_ldCQk',
    title: 'Змагання з вільної боротьби',
    thumbnail: 'https://images.unsplash.com/photo-1622599511051-16f55a1234d0',
  },
];
const GalleryAdmin: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const filteredMedia = mediaItems
    .filter((item) => filter === 'all' || item.type === filter)
    .sort((a, b) => (sortBy === 'newest' ? b.id - a.id : a.id - b.id));
  const renderMediaItem = (item: MediaItem) => {
    if (item.type === 'video') {
      return (
        <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-video">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <VideoIcon className="text-white w-12 h-12" />
            <p className="text-white text-center font-semibold px-4 absolute bottom-4">
              {item.title}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-dark bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <ImageIcon className="text-white w-12 h-12" />
          <p className="text-white text-center font-semibold px-4 absolute bottom-4">
            {item.title}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-dark mb-4">Галерея центру</h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Фотографії та відео з тренувань та спортивних заходів нашого центру
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex rounded-lg overflow-hidden">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 ${
                    filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Все
                </button>
                <button
                  onClick={() => setFilter('image')}
                  className={`px-4 py-2 ${
                    filter === 'image' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Фото
                </button>
                <button
                  onClick={() => setFilter('video')}
                  className={`px-4 py-2 ${
                    filter === 'video' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Відео
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Спочатку нові</option>
                <option value="oldest">Спочатку старі</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item) => (
                <div key={item.id}>{renderMediaItem(item)}</div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default GalleryAdmin;
