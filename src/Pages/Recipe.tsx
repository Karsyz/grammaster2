import '../App.css'
import { useEffect, useState, useRef, MutableRefObject } from 'react'
import {  useParams, useNavigate } from 'react-router-dom';
import { RecipeInter, Ingredient, IngredientInter } from './Recipes'
import { FaArrowLeft, FaTrashAlt, FaPlus, FaSave } from 'react-icons/fa';
import axios from 'axios';

import QtyControlAndDisp from '../Components/QtyControlAndDisp/QtyControlAndDisp';
import RecipeInstructionListItem from '../Components/RecipeInstructionListItem/RecipeInstructionListItem';
import IngredientCard from '../Components/IngredientCard/IngredientCard';

export default function Recipe() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<RecipeInter>({
      _id: '', 
      name: '', 
      totalMass: 0, 
      totalRecipeMass: 0,
      recipeQuantity: 0, 
      totalQuantity: 0, 
      previousVersions: [{}],
      imageUrl: '', 
      imgAlt: '', 
      cloudinaryId: '',
      ingredients: [], 
      instructions: [],
    })
  const [saveIconColor, setSaveIconColor] = useState('text-slate-800')
  // const [recipeStateChanged, setRecipeStateChanged] = useState(false)
  const [recipeNameTextareaHeight, setRecipeNameTextareaHeight] = useState(0)
  const [ingredientDeleteButtonVisibility, setIngredientDeleteButtonVisibility] = useState(false)
  const [instructionDeleteButtonVisibility, setInstructionDeleteButtonVisibility] = useState(false)
  const [file, setFile] = useState<File | null>(null);
  const [opacity, setOpacity] = useState('opacity-0');

  const recipeNameRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  async function getRecipe() {
    try {
      const response = await axios.get(`http://localhost:3115/grammaster/recipe/${id}`);
      setRecipe(response.data.data)
      setTimeout(() => setSaveIconColor('text-slate-800'), 1)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRecipe()
  }, [])

  async function saveRecipeToDb() {
    try {
        const formData = new FormData();

        formData.append("file", file);
        
        formData.append("id", recipe._id )
        formData.append("name", recipe.name )
        formData.append("totalMass", recipe.totalMass.toString() )
        formData.append("totalRecipeMass", recipe.totalRecipeMass.toString() )
        formData.append("recipeQuantity", recipe.recipeQuantity.toString() )
        formData.append("totalQuantity", recipe.totalQuantity.toString() )
        formData.append("imageUrl", recipe.imageUrl )
        formData.append("imgAlt", recipe.imgAlt )
        formData.append("ingredients", JSON.stringify(recipe.ingredients) )
        formData.append("instructions", JSON.stringify(recipe.instructions) )
        formData.append("imageData", file ? 'true' : '' )

        // console.log(formData.entries())

        for (var pair of formData.entries()) {
          console.log(pair); 
      }

        await axios.put(`http://localhost:3115/grammaster/recipe/update/${recipe._id}`, formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })

        setSaveIconColor('text-slate-800')
  
    } catch (error) {
      console.error(error);
    }

  }

  const updateRecipeValues = () => {
      setRecipe((prev: any) => ({
      ...prev,
      ingredients: prev.ingredients.map((e:IngredientInter) => {
        let ex = e
        ex.massTotal = Math.floor((ex.massRecipe / prev.recipeQuantity) * prev.totalQuantity)
        return ex
      }),
      totalMass: prev.ingredients.reduce((a:number, c:IngredientInter) => a + c.massTotal, 0),
      totalRecipeMass: prev.ingredients.reduce((a:number, c:IngredientInter) => a + c.massRecipe, 0),
      
    } ) );
  }

  useEffect(() => {
    updateRecipeValues()
  }, [
    recipe.totalMass,
    // recipe.ingredients,
    recipe.recipeQuantity,
    recipe.totalQuantity
  ])

  const handleRecipeName = (event: string) => {
    setRecipe(prev => ({
      ...prev,
      name: event,
    }));
  }

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, new Ingredient(prev.ingredients.length)],
    }));
  }

  const addInstruction = () => {
    setRecipe(prev => ({
      ...prev,
      instructions: [...prev.instructions, "Add Instruction Here"],
    }));
  }

  const handleDeleteInstruction = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, ind) => ind !== index)
    }));
  }

  // sets height of recipe title textarea
  useEffect(() => {
    const length = recipe.name.length
    setRecipeNameTextareaHeight( (Math.ceil(length / 16) * 40) + 8 )
  }, [recipe.name])

  // set color of the save icon if recipe state changes
  useEffect(() => {
    setSaveIconColor('text-blue-400')
  }, [recipe])

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
  };

  // set opacity 100 onload
  useEffect(() => {
    setTimeout(() => setOpacity('opacity-100'), 10)
  }, [])

  return (
    
    <div className='bg-white text-slate-800 absolute w-screen h-screen flex flex-col justify-start items-center'>

      <h1 className='font-bold text-3xl mt-4'>GramMaster</h1>
      
      <FaArrowLeft 
        className='absolute top-5 left-5 font-semibold text-2xl'
        onClick={() => navigate(-1)}
      />

      <div 
        className={`transition duration-300 ease-in-out ${opacity}`}
      >
      <div className='p-2 mt-2 w-full h-full overflow-scroll no-scrollbar max-w-[500px]'>
        <div className='flex flex-col gap-8 w-full bg-zinc-100 border-2 border-slate-300 drop-shadow-lg p-4 rounded-xl'>
          <div>
            <div className='flex flex-row justify-between'>

              <textarea
                value={recipe.name || 'stuff here'}
                className={`font-bold text-4xl text-slate-800 bg-transparent w-[16ch] p-0 resize-none rounded-xl no-scrollbar overflow-hidden border-none focus:ring-0`}
                style={{height:`${recipeNameTextareaHeight}px`}}
                onChange={(evt) => handleRecipeName(evt.target.value)}
                ref={recipeNameRef}
                onFocus={() => recipeNameRef.current.select()}
              />

              <FaSave 
                className={`font-semibold text-3xl ${saveIconColor}`}
                onClick={() => saveRecipeToDb()}
              />
            </div>

            <span 
              className='block font-semibold text-slate-800 text-2xl'
            >
              Total Batch Mass: {recipe.totalMass}g
            </span>

            <span 
              className='block font-semibold text-slate-800 text-2xl'
            >
              Recipe Mass: {Math.floor(recipe.totalRecipeMass)}g
            </span>

            <span 
              className='block font-semibold text-slate-800 text-2xl'
            >
              Each Mass: {Math.floor(recipe.totalRecipeMass / recipe.recipeQuantity)}g
            </span>

          </div>

          <div className='flex flex-row justify-between items-center gap-5'>

            <QtyControlAndDisp
              name={'Recipe Qty'}
              storageObject={recipe}
              setFunction={setRecipe}
              keyName='recipeQuantity'
            />

            <QtyControlAndDisp
              name={'Total Qty'}
              storageObject={recipe}
              setFunction={setRecipe}
              keyName='totalQuantity'
            />

          </div>

          <div>
            <div className='flex flex-row gap-4 items-center mb-2 text-slate-800 mb-5'>
              <h3 className='font-bold text-3xl'>Ingredients </h3>
                <FaTrashAlt 
                  className={`
                    inline font-semibold text-2xl 
                    ${ingredientDeleteButtonVisibility && 'text-blue-400'} 
                  `}
                  onClick={() => {
                    setIngredientDeleteButtonVisibility(true)
                    setTimeout( () => setIngredientDeleteButtonVisibility(false), 5000 )
                  }}
                />
            </div>
            
            <ul className='flex flex-col gap-4'>
              {recipe.ingredients.map((ingred, index) => {
                return (

                  <IngredientCard
                    key={index}
                    index={index}
                    ingred={ingred}
                    ingredientDeleteButtonVisibility={ingredientDeleteButtonVisibility}
                    recipe={recipe}
                    setRecipe={setRecipe}
                  />

                )
              })}
              
              <div 
                className='bg-gray-300 text-slate-800 rounded-xl p-3 flex flex-row justify-center items-center'
                onClick={addIngredient}
              >
                <FaPlus className='inline  font-semibold text-2xl' />
              </div>
            </ul>
          </div>

          <div>
            <div className='flex flex-row gap-4 items-center mb-2 text-slate-800 mb-5'>
              <h3 className='font-bold text-3xl'>Instructions</h3>
              <FaTrashAlt 
                className={`
                  inline font-semibold text-2xl 
                  ${instructionDeleteButtonVisibility && 'text-blue-400'} 
                `}
                onClick={() => {
                  setInstructionDeleteButtonVisibility(true)
                  setTimeout( () => setInstructionDeleteButtonVisibility(false), 5000 )
                }}
              />
            </div>
            <ol className='flex flex-col gap-4 text-slate-800'>
              {recipe.instructions.map((inst, index) => {
                return (
                  <RecipeInstructionListItem
                    key={index}
                    index={index}
                    inst={inst}
                    recipe={recipe}
                    setRecipe={setRecipe}
                    instructionDeleteButtonVisibility={instructionDeleteButtonVisibility}
                    handleDeleteInstruction={handleDeleteInstruction}
                  />
                )
              })}
            </ol>

            <div 
                className='bg-gray-300 text-slate-800 rounded-xl p-3 flex flex-row justify-center items-center mt-4'
                onClick={addInstruction}
              >
                <FaPlus 
                    className='inline  font-semibold text-2xl'
                />
            </div>

          </div>

          <div>
            <div className='flex flex-col gap-4 items-start mb-2 text-slate-800 mb-5'>
              <h3 className='block font-bold text-3xl '>Display Image</h3>

              <div>
              <label htmlFor="file" className="sr-only">
                Choose a file
              </label>

              <input id="file" type="file" onChange={handleFileChange} />
            </div>

            </div>
              <img 
                  src={ file ? URL.createObjectURL(file) : recipe.imageUrl} 
                  alt={recipe.imgAlt}
                  className='w-full rounded-xl' 
                />
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};


