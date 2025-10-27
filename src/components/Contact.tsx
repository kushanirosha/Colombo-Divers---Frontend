import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phonenumber: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("access_key", "YOUR_DUMMY_WEB3FORMS_ACCESS_KEY");
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phonenumber);
    formData.append("message", values.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Your message has been sent successfully!");
        setValues({ name: "", email: "", phonenumber: "", message: "" });
        setCaptchaToken(null);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-56">
        {/* Left Info Section */}
        <div className="flex-1 min-w-[340px] max-w-lg">
          <h2 className="text-3xl text-[#00137e] mb-4 font-semibold">
            Get in Touch with Colombo Divers
          </h2>
          <p className="text-gray-600 mb-6">
            Whether you're planning your first dive or your next big adventure,
            our team is here to help you every step of the way.
          </p>

          {/* Locations */}
          <div className="flex flex-wrap gap-10">
            <div>
              <div className="flex items-center gap-2 text-[#00137e]">
                <FaMapMarkerAlt />
                <span>Trincomalee</span>
              </div>
              <p className="text-gray-700 ml-6 text-sm">
                Nilaveli Beach Road, Trincomalee, Sri Lanka
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#00137e]">
                <FaMapMarkerAlt />
                <span>Negombo</span>
              </div>
              <p className="text-gray-700 ml-6 text-sm">
                Lewis Place, Negombo, Sri Lanka
              </p>
            </div>
          </div>

          {/* Hotline, Email, Hours */}
          <div className="mt-8 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-[#00137e]">
                <FaPhoneAlt />
                <span>Hotline</span>
              </div>
              <p className="ml-6 text-gray-700 text-sm">+94 11 234 3456</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[#00137e]">
                <FaEnvelope />
                <span>Email</span>
              </div>
              <p className="ml-6 text-gray-700 text-sm">info@colombodivers.lk</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[#00137e]">
                <FaClock />
                <span>Working Hours</span>
              </div>
              <p className="ml-6 text-gray-700 text-sm">
                Open Every Day — 8:00 AM to 5:00 PM
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-[#00137e] font-medium">Follow Us:</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00137e] hover:text-blue-700 transition text-lg"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00137e] hover:text-pink-600 transition text-lg"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 min-w-[340px] max-w-md bg-white shadow-md border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-[#00137e] mb-4">
            Contact Form
          </h3>

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-gray-700"
          >
            <input
              type="text"
              placeholder="Name"
              required
              value={values.name}
              className="border border-gray-300 p-2 text-sm w-full focus:border-[#00137e] focus:outline-none"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={values.phonenumber}
              className="border border-gray-300 p-2 text-sm w-full focus:border-[#00137e] focus:outline-none"
              onChange={(e) =>
                setValues({ ...values, phonenumber: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={values.email}
              className="border border-gray-300 p-2 text-sm w-full focus:border-[#00137e] focus:outline-none"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <textarea
              placeholder="Message"
              rows={4}
              required
              value={values.message}
              className="border border-gray-300 p-2 text-sm resize-y w-full focus:border-[#00137e] focus:outline-none"
              onChange={(e) => setValues({ ...values, message: e.target.value })}
            />

            <div className="flex justify-center my-3">
              <ReCAPTCHA
                sitekey="6LdOddgrAAAAABkF1ofe5TSUTK5RkMM-t7dH5Dhn"
                onChange={handleCaptcha}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-[#00137e] hover:bg-blue-900"
              } text-white py-2 text-sm uppercase tracking-wide transition-all duration-300`}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
