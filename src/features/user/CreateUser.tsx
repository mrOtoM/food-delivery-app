import { useState, FormEvent } from 'react';

import Button from '@/ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { updateName } from '@/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username) {
      return;
    } else {
      dispatch(updateName(username));
      navigate('/menu');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">👋 Vitaj!</p>

      <input
        className="input mb-8 w-72"
        type="text"
        placeholder="Tvoje cele meno"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button>Zacat objednavku</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;

