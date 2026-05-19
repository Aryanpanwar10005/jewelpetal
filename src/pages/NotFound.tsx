import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-jp-pearl text-jp-deep font-sans flex flex-col selection:bg-jp-rosegold selection:text-jp-pearl">
      <Helmet>
        <title>404 — Page Not Found — JewelPetal</title>
        <meta name="description" content="The page you are looking for does not exist in the world of JewelPetal." />
      </Helmet>

      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-20 px-6">
        <div className="max-w-lg w-full py-20 text-center">
          <span className="text-xs uppercase tracking-widest text-jp-rosegold block mb-8 font-sans font-medium">
            Error 404
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-jp-plum leading-tight mb-8">
            Lost in the Bouquet
          </h1>
          <div className="w-16 h-[2px] bg-jp-rosegold mx-auto mb-10" />
          <p className="font-serif italic text-lg text-jp-deep/70 mb-12 leading-relaxed">
            The page you are looking for has blossomed elsewhere or does not exist.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center font-sans font-semibold text-xs tracking-widest">
            <Link 
              to="/" 
              className="w-full md:w-auto bg-jp-plum text-jp-pearl py-4 px-12 uppercase hover:bg-jp-rosegold hover:text-jp-pearl transition-all rounded-sm shadow-sm"
            >
              Return Home
            </Link>
            <Link 
              to="/#the-edit" 
              className="w-full md:w-auto border border-jp-blush py-4 px-12 uppercase hover:border-jp-rosegold transition-all rounded-sm"
            >
              Explore the Edit
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
