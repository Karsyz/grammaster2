import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AnnouncementBar from '../components/AnnouncementBar'
import Breadcrumbs from '../components/Breadcrumbs'
import Button from "../components/Button";

export default function RootLayout() {
  const [recipes, setRecipes] = useState(initialRecipes)
  const [newRecipeInputShown, setNewRecipeInputShown] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState('');

  function addNewRecipe() {
    const newRecipe = new Recipe(newRecipeName)
    setRecipes([...recipes, newRecipe])
    setNewRecipeInputShown(ex => !ex)
  }

  return (
    <div className='bg-slate-600 text-slate-200 absolute w-full h-full flex flex-col justify-start items-center'>

      <h1 className='font-bold text-3xl ml-6 mt-4'>GramMaster</h1>

      <FaPlus 
        className='absolute top-5 right-5 font-semibold text-2xl'
        onClick={() => setNewRecipeInputShown(ex => !ex)}
      />

        <div 
          className='overflow-scroll no-scrollbar flex flex-col items-center gap-6 rounded-xl m-8'
        >
          {recipes.map(recipe => {
            return (
              <div 
                key={recipe.id} 
                className='flex flex-col'
              >
                <div className='relative w-full flex flex-row justify-center'>
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.imgAlt} 
                    className='rounded-xl z-10'
                  />
                  <h2 className='absolute bottom-2 font-bold text-xl text-slate-600 z-20'>{recipe.name}</h2>    

                </div>
              </div>
            )
            })
  
          }

        </div>


        {newRecipeInputShown &&

          <div className='flex flex-row gap-4 justify-center my-4'>
            <input 
            type="text" 
            name='newRecipeName'
            className='bg-slate-600 text-slate-200 border-2 border-slate-200 rounded-md w-9/12 h-10 p-3'
            onChange={(evt)=> setNewRecipeName(evt.target.value)}
            />

            <button
              type='button'
              className='bg-slate-200 text-slate-600 rounded-md py-2 px-4'
              onClick={addNewRecipe}
            >
              Create
            </button>
          </div>
        }

    </div>
  );
};