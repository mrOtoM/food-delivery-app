import CreateUser from '@/features/user/CreateUser';
import { useAppSelector } from '@/store/hooks';
import Button from './Button';

function Home() {
  const username = useAppSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        Stradivarius rozvoz.
        <br />
        <span className="text-yellow-500">Najrychlejsia donaska jedla v okoli</span>
      </h1>

      {username === '' ? <CreateUser /> : <Button to="/menu">Pokracuj na menu, {username}</Button>}
    </div>
  );
}

export default Home;

