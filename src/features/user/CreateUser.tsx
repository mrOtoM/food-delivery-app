import { useState } from 'react';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">👋 Vitaj!</p>

      <input
        type="text"
        placeholder="Tvoje cele meno"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72"
      />

      {username !== '' && (
        <div>
          <button>Zacat objednavat</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;

