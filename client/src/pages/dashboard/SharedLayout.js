import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to='all-jobs'>all jobs</Link>
        <Link to='add-job'>Add jobs</Link>
      </nav>
      <Outlet /> {/** outlet is where our nested pages will lie */}
    </Wrapper>
  );
};
export default SharedLayout