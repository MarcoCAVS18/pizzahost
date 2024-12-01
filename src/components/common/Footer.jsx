import exampleLogo from '../../assets/images/pizzas/prueba2.webp';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green text-beige font-oldstyle py-24 px-4 sm:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start">
        <div className="mb-8 sm:mb-0">
          <img src={exampleLogo} alt="Example Logo" className="h-10 sm:h-12" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-8">
          <div>
            <h3 className="font-oldstyle text-lg sm:text-xl font-bold mb-2">Explore</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/" className="hover:text-lightRed transition-colors duration-300">Home</Link></li>
              <li><Link to="/menu" className="hover:text-lightRed transition-colors duration-300">Menu</Link></li>
              <li><Link to="/user" className="hover:text-lightRed transition-colors duration-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-lightRed transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-oldstyle text-lg sm:text-xl font-bold mb-2">Connect</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-lightRed transition-colors duration-300">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-lightRed transition-colors duration-300">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-lightRed transition-colors duration-300">Twitter</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-lightRed transition-colors duration-300">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-oldstyle text-lg sm:text-xl font-bold mb-2">Company</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/user" className="hover:text-lightRed transition-colors duration-300">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-lightRed transition-colors duration-300">Careers</Link></li>
              <li><Link to="/press" className="hover:text-lightRed transition-colors duration-300">Press</Link></li>
              <li><Link to="/faqs" className="hover:text-lightRed transition-colors duration-300">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-oldstyle text-sm sm:text-base mb-2">© 2024 PizzaPro, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
