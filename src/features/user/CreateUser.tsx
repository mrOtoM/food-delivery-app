import { useState } from 'react';

import Button from '@/ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
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
          <Button style="primary">Zacat objednavku</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;

