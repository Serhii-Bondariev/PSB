import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Activities from '../components/landing/Activities';
const Home: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Activities />
        {/* Additional sections would be added here */}
      </main>
      <Footer />
    </div>;
};
export default Home;