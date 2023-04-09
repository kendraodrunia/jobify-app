// import { DiffieHellmanGroup } from 'crypto';
import Wrapper from '../assets/wrappers/JobInfo.js';

type JobInfoProps = {
  icon: JSX.Element,
  text: string
}

const JobInfo = ({text, icon} : JobInfoProps) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  );
};


export default JobInfo
