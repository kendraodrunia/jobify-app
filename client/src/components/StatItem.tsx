import Wrapper from '../assets/wrappers/StatItem';

type StatItemProps = {
  count: string, 
  title: string, 
  icon: JSX.Element,
  color: string,
  bcg: string
}

function StatItem({ count, title, icon, color, bcg }: StatItemProps) {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <div className='icon'>{icon}</div>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
}

export default StatItem;