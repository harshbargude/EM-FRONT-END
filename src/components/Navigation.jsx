
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear,faUser,faBell } from '@fortawesome/free-solid-svg-icons'
const Navigation = () => {
    return (
        <div>
            <nav>
                <div className="brand-logo">
                    <img src="./images/brand-logo.png" alt="brand-logo" />
                </div>
                <ul>
                    <li href="#">Menu</li>
                    <li href="#">Location</li>
                    <li href="#">About</li>
                    <li href="#">Contact</li>
                </ul>
                <div className='navbar-right'>
                    <div className="notification nav-right-style"><FontAwesomeIcon icon={faBell} style={{ color: '#ff4400' }}  /></div>
                    <div className="settings nav-right-style"><FontAwesomeIcon icon={faGear} style={{ color: '#ff4400' }}/></div>
                    <div className="profile nav-right-style">
                        <div><FontAwesomeIcon icon={faUser} style={{ color: '#ff4400' }}/></div>
                        <div style={{ color: '#a74417' }}>Profile</div>
                    </div>
                </div>
            </nav>
            
        </div>
    );
};
export default Navigation;
