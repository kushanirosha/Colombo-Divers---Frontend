import React from "react";
import { motion } from "framer-motion";

interface Award {
  title: string;
  description: string;
  year: number;
  iconUrl?: string;
}

const awards: Award[] = [
  {
    title: "Best Travel Agency",
    description:
      "Awarded for outstanding customer service and luxury travel experiences.",
    year: 2023,
    iconUrl: "https://img.icons8.com/ios-filled/100/ffffff/trophy.png",
  },
  {
    title: "Top Rated Tours",
    description:
      "Recognized for creating unforgettable journeys across the globe.",
    year: 2022,
    iconUrl: "https://img.icons8.com/ios-filled/100/ffffff/medal.png",
  },
  {
    title: "Excellence in Innovation",
    description: "Honored for introducing innovative travel solutions.",
    year: 2021,
    iconUrl: "https://img.icons8.com/ios-filled/100/ffffff/star.png",
  },
];

const AwardSection: React.FC = () => (
  <section className="py-20 bg-gradient-to-br from-[#f9fafb] to-[#e9eef3]">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-4xl md:text-5xl  text-center text-[#1e293b] mb-12">
        Our Awards & Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {awards.map((award, index) => (
          <motion.div
            key={award.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative bg-white shadow-xl p-8 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-tr from-blue-600 to-blue-400 p-5 rounded-full shadow-md">
                <img src={award.iconUrl} alt={award.title} className="w-10 h-10" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {award.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {award.description}
            </p>
            <div className="text-blue-600 font-bold text-lg">{award.year}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AwardSection;
