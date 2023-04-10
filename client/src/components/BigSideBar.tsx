import { useAppContext } from '../context/appContext.js';

// Components
import Wrapper from "../assets/wrappers/BigSidebar.js";
import NavLinks from './NavLinks'
import Logo from './logo';


const BigSidebar = () =>{
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}
export default BigSidebar