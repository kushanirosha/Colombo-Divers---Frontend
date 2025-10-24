import React from "react";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import Offer1 from "../public/images/Home/learnmore.webp"

const offers = [
  {
    title: "Weekend Dive Adventure",
    description:
      "Enjoy a 2-day diving experience at Colombo’s vibrant coral reefs. Includes gear, instructor, and underwater photography.",
    image: {Offer1},
    price: "$299",
    discount: "20% OFF",
    btnText: "Book Now",
  },
  {
    title: "Couples Sunset Dive",
    description:
      "Dive together into a romantic underwater sunset. Perfect for honeymooners — includes champagne dinner by the beach.",
    image: "/img/Home/Offers/offer2.webp",
    price: "$399",
    discount: "Save $100",
    btnText: "Book Now",
  },
  {
    title: "Discover Scuba Trial",
    description:
      "First-time diver? Experience the thrill of scuba with full guidance and safety — no certification required!",
    image: "/img/Home/Offers/offer3.webp",
    price: "$149",
    discount: "Limited Offer",
    btnText: "Book Now",
  },
];

const SpecialOffers: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#1B1C52] to-[#0e0f2e] text-white overflow-hidden">
      {/* Decorative Element */}
      {/* <div className="absolute inset-0 bg-[url('/img/patterns/waves.svg')] opacity-5"></div> */}

      <div className="relative max-w-7xl mx-auto text-center px-6">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
         Special <span className="text-cyan-400">Offers & Packages</span>
        </motion.h2>
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Dive into adventure and save more! Check out our limited-time scuba
          experiences and packages designed for thrill-seekers and ocean lovers.
        </motion.p>

        {/* Offer Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden group bg-[#23234c] shadow-lg hover:shadow-cyan-500/20 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              {/* Offer Image */}
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-cyan-500 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <FaTag /> {offer.discount}
                </div>
              </div>

              {/* Offer Content */}
              <div className="p-6 text-left flex flex-col justify-between h-[280px]">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-cyan-400">
                    {offer.price}
                  </span>
                  <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 text-white font-medium transition-all">
                    {offer.btnText}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
