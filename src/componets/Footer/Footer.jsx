import './Footer.css';
import footer_logo from '../../Assets/Smart.png';
import instagram_icon from '../../Assets/instagram_icon.png';
import whatsapp_icon from '../../Assets/whatsapp_icon.png';
import pintest_icon from '../../Assets/pintester_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-logo'>
        <img src={footer_logo} alt="footer img logo" />
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className='footer-icons-container'>
          <img src={instagram_icon} alt="instagram icon" />
        </div>
        <div className='footer-icons-container'>
          <img src={pintest_icon} alt="pintest icon" />
        </div>
        <div className='footer-icons-container'>
          <img src={whatsapp_icon} alt="whatsapp icon" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2025 - All Right Reseved.</p>
      </div>
    </div>
  )
}

export default Footer;