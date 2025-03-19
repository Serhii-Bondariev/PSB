import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Activities from '../components/landing/Activities';
const Sections: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-dark mb-4">
                Спортивні секції
              </h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            </div>
          </div>
        </section>
        <Activities />
      </main>
      <Footer />
    </div>;
};
export default Sections;