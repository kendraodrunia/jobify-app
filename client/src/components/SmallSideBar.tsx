import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext.js';

// Components
import NavLinks from './NavLinks'
import Logo from './logo';

const SmallSidebar = () =>{
  const { showSidebar, toggleSidebar } = useAppContext();
  
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar