import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-800 dark:to-gray-900 dark:text-gray-200">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 border-b-2 border-current inline-block pb-2">Contact Us</h2>
            <p className="flex items-center"><FaEnvelope className="mr-2" /> support@projectcloud.com</p>
            <p className="flex items-center"><FaPhone className="mr-2" /> 125-233-648</p>
            <p className="flex items-center"><FaMapMarkerAlt className="mr-2" />IILM UNIVERSITY , GR. NOIDA</p>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 border-b-2 border-current inline-block pb-2">Important Links</h2>
            <ul className="space-y-2">
              {[
                { name: "Government of India", url: "https://www.india.gov.in/" },
                { name: "Department of Science and Technology", url: "https://dst.gov.in/" },
                { name: "AICTE", url: "https://www.aicte-india.org/" },
                { name: "UGC", url: "https://www.ugc.gov.in/" },
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.url} target='_blank' rel="noreferrer" className="hover:underline transition-all duration-300 ease-in-out">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 border-b-2 border-current inline-block pb-2">Follow Us</h2>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF />, url: "#" },
                { icon: <FaTwitter />, url: "#" },
                { icon: <FaInstagram />, url: "#" },
              ].map((social, index) => (
                <a key={index} href={social.url} className="text-xl hover:opacity-70 transition-opacity duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center md:flex-row border-t border-gray-300 dark:border-gray-700 mt-8  justify-between py-4 px-10">
        <p>&copy; {new Date().getFullYear()} Project Cloud. All rights reserved.</p>
        <p className="text-sm opacity-75">
          Made with <span className="text-red-500 animate-pulse">&hearts;</span> by <a
            className="text-blue-500"
            target="_blank"
            rel="noopener"
            href="https://github.com/">CreateCode</a
          >
        </p>
      </div>
    </footer>
  );
};

export default Footer;