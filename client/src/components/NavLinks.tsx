import { NavLink } from 'react-router-dom';
import links from '../utils/links';

type NavLinksProps = {
  toggleSidebar?: () => void 
}


const NavLinks = ({ toggleSidebar }: NavLinksProps) => {

  return (
    <div className='nav-links'>
      {links.map((link: {text: string, path: string, id: string, icon: JSX.Element}) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;