import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import RecipeCard from "../recipe/RecipeCard";
import { getRecipes, clearRecipes } from "../../redux/actions/recipes";

export default function Landing() {

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { recipes, is_loading } = useSelector((state) => state.recipes);

  useEffect(() => {
    if(!token) {
      dispatch(clearRecipes())
    } else {
      dispatch(getRecipes())
    }
  }, [dispatch, token]);

  if (!recipes)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          Can not find any recipes, sorry (:
        </p>
      </div>
    );

  return (
    <>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >

              </svg>
              <span className="relative">Welcome</span>
            </span>{" "}
            to Recipe Reduxx.
          </h2>
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Saved Recipes
              </h2>
              <RecipeCard recipes={recipes} quickview={false} />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
