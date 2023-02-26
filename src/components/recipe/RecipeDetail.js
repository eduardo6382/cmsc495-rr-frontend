import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Disclosure } from "@headlessui/react";
import {
  MinusSmIcon,
  PlusSmIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
} from "@heroicons/react/outline";

import {
  getDetailRecipe,
} from "../../redux/actions/recipes";
import RecipeDelete from "./RecipeDelete";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RecipeDetail() {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const { detailRecipe } = useSelector((state) => state.recipes);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailRecipe(id));
  }, [dispatch, id]);

  if (!detailRecipe || detailRecipe.length === 0)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          Can not find any recipes, sorry (:
        </p>
      </div>
    );

    console.log(detailRecipe);
  const procedures = detailRecipe.response.directions;
  const ingredients = detailRecipe.response.ingredients;

  const recipe = {
    details: [
      {
        name: "Ingredients",
        items: ingredients,
      },
      {
        name: "Directions",
        items: procedures,
      },
    ],
  };

  return (
    <>
      <div className="bg-white">
        <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              
              {/* Recipe info */}
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <div className="flex sm:flex-col1">
                  <h1 className="flex text-3xl font-extrabold tracking-tight text-gray-900">
                    {detailRecipe.response.name}
                  </h1>

                  <Link to={`/recipe/${id}/edit/`}>
                    <button
                      type="button"
                      className="group ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <PencilIcon
                        className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="hidden ml-1 group-hover:block">
                        Edit Recipe
                      </p>
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="group ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    onClick={() => setModal(true)}
                  >
                    <TrashIcon
                      className="h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <p className="hidden ml-1 group-hover:block">
                      Delete Recipe
                    </p>
                  </button>
                </div>

                <div className="mt-6">
                  <div
                    className="text-base text-gray-700 space-y-6">
                      {detailRecipe.response.description}
                    </div>
                </div>

                <section aria-labelledby="details-heading" className="mt-12">
                  <div className="border-t divide-y divide-gray-200">
                    {console.log(recipe.details)}
                    {recipe.details.map((detail) => (
                      <Disclosure as="div" key={detail.name}>
                        {({ open }) => (
                          <>
                            <h3>
                              <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                <span
                                  className={classNames(
                                    open ? "text-teal-600" : "text-gray-900",
                                    "text-base font-medium"
                                  )}
                                >
                                  {detail.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusSmIcon
                                      className="block h-6 w-6 text-teal-400 group-hover:text-teal-500"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusSmIcon
                                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel
                              as="div"
                              className="pb-6 prose prose-sm"
                            >
                              {detail.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="border-t border-gray-200"
                                >
                                  <dl>
                                    <div className="bg-gray-50 px-4 py-5  sm:px-6">
                                      {(detail.name === 'Ingredients') && 
                                        <dt className="text-sm font-normal text-gray-500">
                                        {idx + 1}) {item.ingredient}
                                      </dt>
                                      }
                                      {(detail.name === 'Directions') && 
                                        <dt className="text-sm font-normal text-gray-500">
                                        {idx + 1}) {item}
                                      </dt>
                                      }
                                    </div>
                                  </dl>
                                </div>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <section
              aria-labelledby="related-heading"
              className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
            >
              {/* <h2
                id="related-heading"
                className="text-xl font-bold text-gray-900"
              >
                Other popular recipes
              </h2> */}
            </section>
          </div>
        </main>
      </div>
      {modal && <RecipeDelete modal={modal} setModal={setModal} id={id} />}
    </>
  );
}
