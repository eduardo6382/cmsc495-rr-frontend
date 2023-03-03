import { Link } from "react-router-dom";


export default function RecipeCard({ recipes }) {
  return (
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-0 flex-1">
                  <dl>
                    <dt>
                      <div className="text-lg font-medium text-gray-500 truncate">
                      {recipe.name}
                      </div>
                    </dt>
                    <div className="mt-4 flex justify-between md:mt-2">
                      {recipe.description}
                    </div>
                    <dd>
                      <div className="text-sm text-gray-900">{recipe.desc}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="text-xs text-left pb-2 pl-2">Servings: {recipe.serves}</div>
            <div className="flex justify-between bg-gray-50 px-5 py-3">
              <div className="text-sm">
                  <Link
                    to={`/recipe/${recipe._id}`}
                    className="font-medium text-teal-700 hover:text-teal-900"
                  >
                    View detail
                  </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}
