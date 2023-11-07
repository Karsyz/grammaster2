import { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import ContentEditable from 'react-contenteditable'

{/* <RecipeInstructionListItem
  index={index}
  inst={inst}
  setRecipe={setRecipe}
  instructionDeleteButtonVisibility={instructionDeleteButtonVisibility}
  handleDeleteInstruction={handleDeleteInstruction}
/> */}

export default function RecipeInstructionListItem(props:any) {
  const recipeTextRef = useRef()

  const {
    index, 
    inst, 
    recipe,
    setRecipe, 
    instructionDeleteButtonVisibility, 
    handleDeleteInstruction,
    
  } = props

  const handleRecipeInstructionText = (value: string, index: number) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.map((e: string, ind: number) => ind === index ? value.trim() : e)
    }));
  }

  return(
    <li 
      className='flex flex-row gap-2' 
      key={index}
    >
      <span className='text-xl font-bold'>{index + 1}.</span>

      <div className='relative w-full'>

        <ContentEditable
          className='font-semibold text-base text-slate-800 bg-blue-200/80 w-full p-2 border-0 rounded-lg no-scrollbar overflow-hidden outline-none'
          html={inst} // innerHTML of the editable div
          disabled={false}       // use true to disable editing
          onChange={(evt) => {
            handleRecipeInstructionText(evt.target.value, index)
          }}
        /> 
        
        {instructionDeleteButtonVisibility &&
          <span className='absolute top-0 left-0 w-full h-full flex flex-row justify-center items-center pointer-event-none'>
              <FaTrashAlt
              className='font-semibold text-4xl text-red-500/50 hover:text-red-500'
              onClick={() => handleDeleteInstruction(index)}
              />
          </span>
        }

      </div>

    </li>
  )
}

