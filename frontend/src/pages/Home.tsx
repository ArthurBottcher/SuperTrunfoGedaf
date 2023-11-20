// Home.tsx
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import { Select, Option } from '../components/Select';

export function Home() {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [rooms, setRooms] = useState<Option[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const updateRoomsHandler = (roomOptions: Option[]) => {
      setRooms(roomOptions);
    };

    socket.on('rooms', updateRoomsHandler);

    return () => {
      // Limpe os ouvintes de eventos ao desmontar o componente
      socket.off('rooms', updateRoomsHandler);
    };
  }, []);

  const handleRoomSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoom(event.target.value);
  };

  const handleEnterRoom = (event: FormEvent) => {
    event.preventDefault();

    // Emitir um evento para entrar na sala escolhida
    socket.emit('userJoin', { room, username });

    navigate(`/room/r/${room}/u/${username}`);
  };

  return (
    <main>
      <h1>Teste</h1>
      <form onSubmit={handleEnterRoom}>
        <div className="container">
          <div className="row">
            <Select
              id="selected_room"
              options={rooms}
              label="Escolha a sua sala"
              placeholder="Escolha a sala que deseja jogar"
              onChange={handleRoomSelect}
            />
          </div>

          <div className="row">
            <label className="form-label">Digite seu usuário:</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="row">
            <button type="submit" className="btn btn_primary mb-3">
              Entrar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
