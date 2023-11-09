import { useRef } from 'react'
import { FaPlus, FaMinus} from 'react-icons/fa';

{/* <QtyControlAndDisp
storageObject={recipe}
setFunction={setRecipe}
keyName='recipeQuantity'
/> */}

export default function QtyControlAndDisp(props:any) {
  const { keyName, setFunction, storageObject } = props

  const handleQuantity = (event: React.ChangeEvent<HTMLFormElement>) => {
    setFunction(prev => ({
      ...prev,
      [keyName]: Number( event.target.value ),
    }));
  }
  
  const handleQuantityUp = () => {
    setFunction(prev => ({
      ...prev,
      [keyName]: prev[keyName] + 1,
    }));
  }
  
  const handleQuantityDown = () => {
    setFunction(prev => ({
      ...prev,
      [keyName]: (prev[keyName] - 1) >= 1 ? prev[keyName] - 1 : 1,
    }));
  }

  const quantityRef = useRef()


  return (
    <div className='flex flex-col'>
    <span className='whitespace-nowrap text-slate-800 text-xl font-semibold mb-2'>{props.name}:</span>

      <div className='relative flex flex-row items-center'>
        <FaMinus 
        className='absolute left-6 font-semibold text-xl text-slate-800 z-20'
        onClick={handleQuantityDown}
      />
        <input
          type="number"
          min={0}
          value={storageObject[keyName]}
          className='bg-blue-200 text-slate-800 font-semibold text-3xl border-none focus:ring-0 rounded-xl py-4 px-8 w-full text-center drop-shadow-md z-10'
          onChange={handleQuantity}
          ref={quantityRef}
          onFocus={() => quantityRef.current.select()}
        />

        <FaPlus 
          className='absolute right-6 font-semibold text-xl text-slate-800 z-20'
          onClick={handleQuantityUp}
        />

      </div>
    </div>
  )
}