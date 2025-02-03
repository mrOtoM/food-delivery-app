import { useAppSelector } from '@/store/hooks';

function Username() {
  const username = useAppSelector((state) => state.user.username);

  if (!username) {
    return '';
  }

  return <div className="hidden text-sm font-semibold md:block">{username}</div>;
}

export default Username;
