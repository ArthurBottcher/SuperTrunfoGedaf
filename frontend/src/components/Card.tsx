export interface CardProps {
  name: string
  type: 'trunfo' | 'hero' | 'common'
  img: string
  attributes: {
    win: number
    con: number
    dex: number
    cha: number
    int: number
    str: number
  }
  abilities?: {
    onReveal: { desc: string; fn: () => void } | null
    onWin: { desc: string; fn: () => void } | null
    onLose: { desc: string; fn: () => void } | null
    onDraw: { desc: string; fn: () => void } | null
    onInit: { desc: string; fn: () => void } | null
  }
  onSelectAbility: (att: string) => void
  isMyTurn: boolean
}
export function Card({attributes,img,name,type,abilities, onSelectAbility, isMyTurn}: CardProps){
  return (
    <div className=" w-full flex bg-red-400 rounded-lg overflow-hidden">
      <div className="w-1/2 flex flex-col relative">
        <img className="top-0 bottom-0 left-0 right-0 w-full h-full z-0" src={img}/>
        <span className="bg-gradient-to-t from-black via-neutral-800  to-95% to-transparent absolute bottom-0 left-0 right-0 w-full z-10 text-center font-bold text-green-500">{name}</span>
      </div>
      <div className="w-1/2 text-xs p-1">
        <div className="border-b h-1/2 ">
          <span>Meu turno? {isMyTurn ? 'true': 'false'}</span>
          <span>Atributos</span>
          <ul className="grid grid-cols-2">
          {Object.entries(attributes).map((att: any) => (
              <li key={att[0]}>
                <button disabled={!isMyTurn}
                 onClick={()=>{
                  onSelectAbility(att[0])
              
              }}>
                {att[0]} - {att[1]}
              </button>
              </li>
            ))}
          </ul>
        </div>
      <div className="h-1/2 pt-1">
        <span>Habilidade especial</span>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, distinctio. Veniam assumenda, nobis optio dolorum illo repellat architecto ipsa incidunt, minima velit necessitatibus unde natus quo quas asperiores magni magnam.</p>
      </div>
      </div>
    </div>
  )
}