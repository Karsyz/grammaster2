import '../App.css'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';


export interface IngredientInter {
  name: string;
  massTotal: number;
  massRecipe: number;
  bakersPercentage: number;
  bgColorCard: string;
  _id: string;
}

export interface RecipeInter {
  _id: string;
  name: string;
  totalMass: number;
  totalQuantity: number;
  totalRecipeMass: number;
  recipeQuantity: number;
  imageUrl: string;
  imgAlt: string;
  cloudinaryId: string;
  ingredients: IngredientInter[];
  instructions: string[];
  previousVersions: [{}];
}

export class Recipe {
    _id: string | null;
    name: string;
    totalMass: number;
    totalQuantity: number;
    totalRecipeMass: number;
    recipeQuantity: number;
    imageUrl: string;
    imgAlt: string;
    cloudinaryId: string;
    ingredients: IngredientInter[];
    instructions: string[];
    previousVersions: [{}] | null;

    constructor(name: string) {
      this._id = null
      this.name = name;
      this.totalMass = 0;
      this.totalRecipeMass = 0
      this.ingredients = [];
      this.instructions = [];
      this.recipeQuantity = 1;
      this.totalQuantity = 1;
      this.imageUrl = 'https://placehold.co/500x300';
      this.imgAlt = 'placeholder';
      this.cloudinaryId = '';
      this.previousVersions = null;
    }
}

export class Ingredient {
  name: string;
  massTotal: number;
  massRecipe: number;
  bakersPercentage: number;
  bgColorCard: string;
  _id: string;

  constructor(ind:number) {
    if(ind === 0) {
      this.name = 'Flour';
      this.massTotal = 1000;
      this.massRecipe = 1000;
      this.bakersPercentage = 100;
      this.bgColorCard = '#FDE153'
      this._id = this.mongoObjectId();
    }else {
      this.name = 'Untitled';
      this.massTotal = 0;
      this.massRecipe = 0;
      this.bakersPercentage = 0;
      this.bgColorCard = '#60A5FA'
      this._id = this.mongoObjectId();
    }
  }

  mongoObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<RecipeInter[]>([])
  const [newRecipeInputShown, setNewRecipeInputShown] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [opacity, setOpacity] = useState('opacity-0');

  async function getRecipes() {
    try {
      const recipes = await axios.get('http://localhost:3115/grammaster/recipes');
      setRecipes(recipes.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getRecipes()
  }, [])


  async function handleDeleteRecipe(id:string) {
    try {
      await axios.delete(`http://localhost:3115/grammaster/recipe/delete/${id}`);
      getRecipes()
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewRecipe() {
    try {
      const params = new URLSearchParams({name: newRecipeName});
      const newRecipe = await axios.post(`http://localhost:3115/grammaster/recipe/createRecipe`, params);
      setRecipes([newRecipe.data.data])
      getRecipes()
      setNewRecipeName('')
      setNewRecipeInputShown(false)
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();

  // set opacity 100 onload
  useEffect(() => {
    setTimeout( setOpacity('opacity-100'), 500)
  }, [])

  
  return (
    <div className='bg-white text-slate-800 absolute w-full h-full flex flex-col justify-start items-center px-8'>

      <h1 className='font-bold text-3xl mt-4'>GramMaster</h1>
      
      <FaArrowLeft 
        className='absolute top-5 left-5 font-semibold text-2xl'
        onClick={() => navigate(-1)}
      />

        <div 
          className={`overflow-scroll no-scrollbar flex flex-col items-center transition duration-500 delay-200 ease-in-out transition duration-300 ease-in-out ${opacity}`}
        >

        <div 
          className='overflow-scroll no-scrollbar flex flex-col items-center gap-6 rounded-xl mt-4'
        >
          {recipes.map(recipe => {
            return (
              <div 
                key={recipe._id} 
                className='relative flex flex-col'
              >

                <FaTrashAlt 
                  className='absolute top-2 right-0 font-semibold text-xl z-20 text-red-400/20 hover:text-red-500 cursor-pointer'
                  onClick={() => handleDeleteRecipe(recipe._id)}
                />

                <Link to={`/recipe/${recipe._id}`}>
                  <h2 className='font-bold text-xl text-slate-800 z-20 mb-2'>{recipe.name}</h2> 
                  <div className='relative w-full flex flex-row justify-center drop-shadow-md border-2 rounded-xl border-orange-400'>
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.imgAlt} 
                      className='rounded-xl z-10'
                    />
                      

                  </div>
                </Link>
              </div>
            )
            })
  
          }

        </div>


        <div 
          className='relative flex flex-row justify-center items-center w-full my-8 p-8 rounded-xl bg-slate-200 gap-4 max-w-[500px]'
          onClick={() => setNewRecipeInputShown(true)}
        
        >
        
        {newRecipeInputShown ?
          <>
            <input 
            type="text" 
            name='newRecipeName'
            className='text-lg text-slate-800 border-2 border-slate-800 rounded-md w-9/12 h-10'
            onChange={(evt)=> setNewRecipeName(evt.target.value)}
            />

            <button
              type='button'
              className='bg-slate-600 border-2 text-slate-200 rounded-md py-2 px-4'
              onClick={addNewRecipe}
            >
              Create
            </button>
          </>
            :
          <FaPlus 
            className='absolute font-semibold text-2xl text-slate-600'
            onClick={() => setNewRecipeInputShown(true)}
          />

        }
        </div>
      </div>
    </div>
  );
};