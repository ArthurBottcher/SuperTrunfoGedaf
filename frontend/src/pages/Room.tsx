import { useParams } from 'react-router-dom';
import { socket } from '../socket';
import { useEffect, useState } from 'react';
import { Card, CardProps } from '../components/Card';

interface User {
  userName: string | undefined; 
}

export function Room() {
  const { room, user } = useParams();
  const [opponent, setOpponent] = useState<User | null>(null);
  const [inGame, setInGame] = useState(false);
  const [currentCard, setCurrentCard] = useState<CardProps | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<User | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<string>('')


  const startGame = () => {
    // Emitir um evento para solicitar o início do jogo
    socket.emit('startGame', room);
  };

  const endTurn = () => {
    // Emitir um evento para informar a escolha de atributo
    socket.emit('endTurn', { room, player: user, attribute: selectedAbility });
  };

  // opponentInfo
  useEffect(() => {
    // Listener para o evento opponentInfo
    const opponentInfoHandler = (opponentData: User) => {
      console.log('opponentInfo', opponentData)
      setOpponent(opponentData);
    };

    socket.on('opponentInfo', opponentInfoHandler);

    return () => {
      // Remover o listener quando o componente é desmontado
      socket.off('opponentInfo', opponentInfoHandler);
    }
  }, []);

  // updateOpponents
  useEffect(() => {
    // Listener para o evento updateOpponents
    const updateOpponentsHandler = (opponents: User[]) => {
      const opponentUser = opponents.find((opponentUser) => opponentUser.userName !== user);
      console.log(opponents)
      setOpponent({ userName: opponentUser?.userName });
    };

    socket.on('updateOpponents', updateOpponentsHandler);

    // Emitir um evento para entrar na sala quando o componente é montado
    socket.emit('joinRoom', room);

    return () => {
      // Remover o listener quando o componente é desmontado
      socket.off('updateOpponents', updateOpponentsHandler);
    }
  }, [room, user]);

  //currentCard
  useEffect(() => {
    // Listener para o evento currentCard
    const currentCardHandler = (card: CardProps) => {
      console.log('currentCard',card)
      setCurrentCard(card);
    };

    socket.on('currentCard', currentCardHandler);

    return () => {
      // Remover o listener quando o componente é desmontado
      socket.off('currentCard', currentCardHandler);
    }
  }, []);

  // Listener para o evento turnBy
  useEffect(() => {
    const turnByHandler = (player: User) => {
      console.log('turnBy', player)
      setCurrentPlayer(player);
      if(!inGame){
        setInGame(true)      }
    };

    socket.on('turnBy', turnByHandler);

    return () => {
      // Remover o listener quando o componente é desmontado
      socket.off('turnBy', turnByHandler);
    }
  }, []);

  return (
    <main className='w-full h-screen'>
      {/* topo */}
      <div className='w-full h-1/6 bg-cyan-400 flex items-center justify-between px-3'>
        <div className=' flex flex-col'>
          <span>Sala: {room}</span>
          <span>Turno: 10</span>
          <span>Habilidade selecionada: {selectedAbility}</span>
        </div>

        <h1 className='font-bold text-2xl'>Gedaf Trunfo</h1>

        <div>
          <button>Sair</button>
        </div>
      </div>

      <div className='min-w-full h-5/6 bg-purple-300 flex'>
        {/* Player 1 */}
        <div className='w-1/2 h-full flex flex-col p-4'>
          <span className='w-full text-center'>{user}</span>
          {currentCard && <Card attributes={currentCard.attributes} img={currentCard.img} name={currentCard.name} type={currentCard.type} abilities={currentCard.abilities} onSelectAbility={(att)=>setSelectedAbility(att)} isMyTurn={currentPlayer?.userName == user}/>}
        </div>

        {/* Player 2 */}
        <div className='w-1/2 h-full flex flex-col p-4'>
         {opponent && <span className='w-full text-center'>{opponent.userName}</span>}
        </div>
      </div>


      <div className='fixed bottom-10 left-1/2 -translate-x-1/2'>
        
        {inGame ? <button onClick={endTurn}>Fim de turno</button> : <button onClick={startGame}>Jogar</button>}
      </div>
      
    </main>
  );
}
