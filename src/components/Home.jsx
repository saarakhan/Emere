import CategorySection from "./CategorySection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="bg-[#fefefe] min-h-screen">
      <Helmet>
        <title>Emere | Home</title>
        <meta name="description" content="Best deals on electronics, fashion, and more!" />
        <meta property="og:title" content="My E-Commerce Store" />
        <meta property="og:description" content="Shop with amazing discounts!" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-pink-50 to-gray-100 text-center py-14 px-6 sm:px-10 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Discover Elegance with Emere</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto">Curated collections of French-inspired fashion & accessories for every season.</p>
      </section>

      {/* CATEGORY SECTIONS */}
      <div className="mt-10 space-y-12 px-4 sm:px-6 md:px-10">
        {/* Jewelry Section */}
        <section className="bg-white  p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Aesthetic Jewelry</h2>
          <CategorySection category="jewelery" limit={3} />
        </section>

        {/* Men's Clothing Section */}
        <section className="bg-white  p-6 sm:p-8 ">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Men's Clothing</h2>
          <CategorySection category="men's clothing" limit={3} />
        </section>

        {/* Women's Clothing Section */}
        <section className="bg-white  p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Women's Clothing</h2>
          <CategorySection category="women's clothing" limit={3} />
        </section>
      </div>
    </div>
  );
};

export default Home;
