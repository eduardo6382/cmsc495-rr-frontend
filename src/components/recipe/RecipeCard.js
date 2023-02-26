import { useState } from "react";
import { Link } from "react-router-dom";

import QuickView from "./QuickView";

export default function RecipeCard({ recipes, quickview }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

console.log(recipes)
  return (
    <>
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
                      <dt className="text-xs font-light border border-gray-200 p-1 rounded-lg text-gray-500 truncate">
                        by {recipe.username}
                      </dt>
                    </div>
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
            <div className="flex justify-between bg-gray-50 px-5 py-3">
              <div className="text-sm">
                {quickview ? (
                  <button
                    className="font-medium text-teal-700 hover:text-teal-900"
                    onClick={() => {
                      setOpen(true);
                      setId(recipe._id);
                    }}
                  >
                    Quick View
                  </button>
                ) : (
                  <Link
                    to={`/recipe/${recipe._id}`}
                    className="font-medium text-teal-700 hover:text-teal-900"
                  >
                    View detail
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {open && <QuickView open={open} setOpen={setOpen} id={id} />}
    </>
  );
}
