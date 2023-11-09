import { MutableRefObject, useRef, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { BiColor, BiSolidColor, BiSolidColorFill } from 'react-icons/bi';
import { Ingredient, IngredientInter, RecipeInter } from '../../Pages/Recipes';


{/* <IngredientCard
index={index}
inst={ingred}      
/> */}

export default function IngredientCard(props:any) {
  const ingredientNameRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const ingredientBakersPercentageRef = useRef() as MutableRefObject<HTMLInputElement>;
  const ingredientMassRecipeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const ingredientColorRef = useRef() as MutableRefObject<HTMLInputElement>;

  const { 
    index, 
    ingred, 
    ingredientDeleteButtonVisibility,
    // recipe,
    setRecipe
  } = props

  // const [cardBgColor, setCardBgColor] = useState(index === 0 ? '#fde047' : '#60a5fa')

  const handleRecipeIngredientName = (value: string, index: number) => {
    setRecipe((prev: { ingredients: Ingredient[]; }) => ({
      ...prev,
      ingredients: prev.ingredients.map((e:Ingredient, ind: number) => {
        if(ind === index) {
          let ex = e
          ex.name = value
          return ex
        }
        else return e
      })
    }));
  }

  const handleRecipeIngredientCardBgColor = (value: string, index: number) => {
    setRecipe((prev: RecipeInter) => ({
      ...prev,
      ingredients: prev.ingredients.map((e:IngredientInter, ind: number) => {
        if(ind === index) {
          e.bgColorCard = value
          return e
        }
        else return e
      }),

    }));
  }

  const handleRecipeIngredientBakersPercentage = (value: string, index: number) => {
    // change bakersPercentage in recipe state
    setRecipe((prev: RecipeInter) => ({
      ...prev,
      ingredients: prev.ingredients.map((e:IngredientInter, ind: number) => {
        if(ind === index) {
          let ex = e
          ex.bakersPercentage = parseFloat(value)
          ex.massRecipe = Math.floor(prev.ingredients[0].massRecipe * (ex.bakersPercentage / 100))
          ex.massTotal = Math.floor((ex.massRecipe / prev.recipeQuantity) * prev.totalQuantity)
          return ex
        }
        else return e
      }),
      totalMass: prev.ingredients.reduce((a:number, c:IngredientInter) => a + c.massTotal, 0),
    }));
  }

  const handleRecipeIngredientMassRecipe = (value: string, index: number) => {
    setRecipe((prev: RecipeInter) => ({
      ...prev,
      ingredients: prev.ingredients.map((e:IngredientInter, ind: number) => {
        if(ind === index) {
          let ex = e
          ex.massRecipe = parseFloat(value) || 0
          ex.bakersPercentage = +((ex.massRecipe / prev.ingredients[0].massRecipe) * 100).toFixed(1)
          ex.massTotal = Math.floor((ex.massRecipe / prev.recipeQuantity) * prev.totalQuantity)
          return ex
        }
        else return e
      }),
      totalMass: prev.ingredients.reduce((a:number, c:IngredientInter) => a + c.massTotal, 0),
    }));

  }

  const handleRecipeIngredientMassRecipeIndexZero = (value: string) => {
    setRecipe((prev: RecipeInter) => ({
      ...prev,
      ingredients: prev.ingredients.map((e:IngredientInter, ind: number) => {
        if(ind === 0) {
          // only update the mass value as percentage doesn't change for main ingredient
          let ex = e
          ex.massRecipe = parseFloat(value) || 0
          ex.massTotal = Math.floor((ex.massRecipe / prev.recipeQuantity) * prev.totalQuantity)
          return ex
        }else {
          // update all ingredient mass values based on existing ingredient percentages
          let ex = e
          ex.massRecipe = Math.floor(prev.ingredients[0].massRecipe * (ex.bakersPercentage / 100))
          ex.massTotal = Math.floor((ex.massRecipe / prev.recipeQuantity) * prev.totalQuantity)
          return ex
      }}),
      totalMass: prev.ingredients.reduce((a:number, c:IngredientInter) => a + c.massTotal, 0),
    }));

  }

  const handleDeleteIngredient = (id: string) => {
    setRecipe((prev: RecipeInter) => ({
      ...prev,
      ingredients: prev.ingredients.filter((e:IngredientInter) => e._id !== id)
    }));
  }

  return(

    <li 
      className={`relative text-slate-800 rounded-2xl p-3 grid grid-cols-2 grid-rows-3 z-10 drop-shadow-md border-2 border-zinc-300`} 
      key={index}
      style={{background: ingred.bgColorCard || 'lightGreen'}}
    >

      <input 
        type="color" 
        id={`color${index}`} 
        name="color" 
        value={ingred.bgColorCard} 
        className='row-start-1 col-start-2 col-span-1 font-bold text-3xl p-0 rounded-lg bg-transparent focus:transparent z-30 place-self-end w-4'
        ref={ingredientColorRef}
        onChange={(evt) => {
          handleRecipeIngredientCardBgColor(evt.target.value, index)
        }}
      />

      <BiSolidColorFill
        className='absolute right-1 top-1 font-semibold text-3xl text-slate-800 z-40'
        onClick={() => ingredientColorRef.current.click()}
      />

      <textarea
        name='ingredName'
        value={ingred.name}
        // maxLength={15}
        className='row-start-1 col-start-1 col-span-2 font-bold text-3xl p-0 border-none focus:ring-0 rounded-lg bg-transparent focus:transparent z-20 h-[40px] no-scrollbar resize-none height-auto'
        onChange={(evt) => {
          handleRecipeIngredientName(evt.target.value, index)
        }}
        ref={ingredientNameRef}
        onFocus={() => ingredientNameRef.current.select()}
      />

      <span className='font-bold text-3xl col-start-2 row-start-3 place-self-end'>{ingred.massTotal}g</span>

      <div className='col-start-1 row-start-2 self-center z-20'>
        <input
            name='massRecipe'
            type='number'
            value={ingred.massRecipe}
            min={0}
            className={`font-semibold text-xl z-30 p-0 border-none focus:ring-0 rounded-lg bg-transparent focus:transparent z-30 h-[30px] w-[${ingred.massRecipe.toString().length}ch] cursor-pointer`}
            onChange={(evt) => {
              index !== 0 ?
                handleRecipeIngredientMassRecipe(evt.target.value, index)
                :
                handleRecipeIngredientMassRecipeIndexZero(evt.target.value)
            }}    
            ref={ingredientMassRecipeRef}
            onFocus={() => ingredientMassRecipeRef.current.select()}
            style={{width: ingred.massRecipe.toString().length + 'ch'}}
          />
          <span className='font-semibold text-xl'>g</span>
      </div>
      
      <div className='col-start-1 row-start-3 self-center place-self-start z-20'>
        {index !== 0 ?
          <input
          name='bakersPercentage'
          type='number'
          value={ingred.bakersPercentage}
          maxLength={3}
          min={0}
          max={100}
          className='font-semibold text-xl p-0 border-none focus:ring-0 rounded-lg bg-transparent focus:transparent z-30 h-[30px] w-[3ch] cursor-pointer'
          onChange={(evt) => {
            handleRecipeIngredientBakersPercentage(evt.target.value, index)
          }}    
          ref={ingredientBakersPercentageRef}
          onFocus={() => ingredientBakersPercentageRef.current.select()}
          style={{width: ingred.bakersPercentage.toString().length + 'ch'}}
        />
        :
        <span className='font-semibold text-xl p-0 border-none focus:ring-0 rounded-lg bg-transparent focus:transparent z-30 h-[30px]'>100</span>
        }
        
          <span className='font-semibold text-xl'>%</span>
      </div>

      <span className='absolute flex flex-row justify-center items-center w-full h-full'>
      
      {ingredientDeleteButtonVisibility &&
        <FaTrashAlt
        className='absolute font-semibold text-5xl text-red-500/50 hover:text-red-500 z-30'
        onClick={() => handleDeleteIngredient(ingred._id)}
        />
      }
      </span>
    </li>
  )
}