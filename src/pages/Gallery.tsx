import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import ApiService from "../services/ApiService";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await ApiService.getGallery();
        if (data && data.data) setGalleryItems(data.data);
      } catch (err) {
        console.error("Failed to load gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  // Filter by active tab
  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "all") return true;
    return (
      (activeTab === "sri-lanka" &&
        item.country?.toLowerCase() === "sri lanka") ||
      (activeTab === "maldives" &&
        item.country?.toLowerCase() === "maldives")
    );
  });

  // Keyboard navigation for fullscreen
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight")
        setSelectedIndex((prev) => (prev! + 1) % filteredItems.length);
      else if (e.key === "ArrowLeft")
        setSelectedIndex(
          (prev) => (prev! - 1 + filteredItems.length) % filteredItems.length
        );
      else if (e.key === "Escape") setSelectedIndex(null);
    },
    [selectedIndex, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const journeyPanels = useMemo(
    () => [
      {
        title: "Meaningful Moments Come From Real Connections.",
        img: "https://images.unsplash.com/photo-1615039666131-964929ad0f1e?q=80&w=1974&auto=format&fit=crop",
      },
      {
        title: "We Believe True Indulgence Is Personal.",
        img: "https://images.unsplash.com/photo-1557750505-e7b4d1c40410?q=80&w=1974&auto=format&fit=crop",
      },
      {
        title: "Rebalance In Unforgettable Settings.",
        img: "https://images.unsplash.com/photo-1618288197176-1641dce9b108?q=80&w=1974&auto=format&fit=crop",
      },
      {
        title: "We Don’t Just Serve - We Share Stories.",
        img: "https://images.unsplash.com/photo-1667537506981-4c67c8b82f85?q=80&w=1964&auto=format&fit=crop",
      },
    ],
    []
  );

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl font-bold text-[#01004b] mb-10">
          Explore Paradise in Pictures
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {["all", "sri-lanka", "maldives"].map((tab) => (
            <button
              key={tab}
              className={`px-8 py-2 font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#01004b] text-white"
                  : "bg-[#d9e2ff] text-[#01004b]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all"
                ? "All"
                : tab === "sri-lanka"
                ? "Sri Lanka"
                : "Maldives"}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const imgSrc = item.image?.startsWith("http")
              ? item.image
              : `http://localhost:5005${item.image}`;
            return (
              <div
                key={idx}
                className="relative group overflow-hidden border border-gray-200 cursor-pointer"
                onClick={() => setSelectedIndex(idx)}
              >
                <img
                  src={imgSrc}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="absolute bottom-4 left-4 text-left text-white opacity-0 group-hover:opacity-100 transition duration-500">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.location && (
                    <p className="text-sm">{item.location}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <img
            src={
              filteredItems[selectedIndex].image?.startsWith("http")
                ? filteredItems[selectedIndex].image
                : `http://localhost:5005${filteredItems[selectedIndex].image}`
            }
            alt="fullscreen"
            className="max-h-[80vh] max-w-[90vw] object-contain mb-4 border-4 border-white"
          />
          {/* Thumbnails */}
          <div
            className="flex overflow-x-auto gap-2 px-4 pb-4 w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems.map((item, i) => (
              <img
                key={i}
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : `http://localhost:5005${item.image}`
                }
                alt={item.title}
                className={`w-24 h-16 object-cover cursor-pointer border-2 ${
                  selectedIndex === i
                    ? "border-[#01004b]"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
          <p className="text-white text-sm mt-2">(Use ← / → keys to navigate)</p>
        </div>
      )}

      {/* Journey Section */}
      <section className="pb-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#01004b] mb-6">
          Our Journey Through Time
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4">
          {journeyPanels.map((p, i) => (
            <div
              key={i}
              className="relative h-[260px] md:h-[420px] group overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="bg-white/20 backdrop-blur-sm px-3 py-2 text-sm font-medium">
                  {p.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;
