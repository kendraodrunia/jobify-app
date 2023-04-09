type LoadingProps = {
  center: string
}

const Loading = ({ center }: LoadingProps) => {
  return <div className={center ? 'loading loading-center' : 'loading'}></div>
}

export default Loading
