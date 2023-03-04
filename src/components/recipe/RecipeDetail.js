import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

import { getDetailRecipe } from '../../redux/actions/recipes';
import RecipeDelete from './RecipeDelete';

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
                    No recipe found by this ID. Please go back to the dashboard
                    and select a recipe there.
                </p>
            </div>
        );

    const directions = detailRecipe.response.directions;
    const ingredients = detailRecipe.response.ingredients;
    const servings = detailRecipe.response.serves;

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
                                <div>Serves {servings}</div>
                                <div className="mt-6">
                                    <div className="text-base text-gray-700 space-y-6">
                                        {detailRecipe.response.description}
                                    </div>
                                </div>
                                {/*ingredients*/}
                                {/* https://tailwindcss.com/docs/display#table */}
                                <div className="group relative w-full py-6 flex justify-between items-center text-left">
                                    <span className="text-teal-600 text-base font-medium">
                                        Ingredients
                                    </span>
                                </div>
                                <div>
                                    <div className="table w-full">
                                        <div class="table-header-group">
                                            <div class="table-row">
                                                <div class="table-cell text-left">
                                                    Ingredient
                                                </div>
                                                <div class="table-cell text-left">
                                                    Amount
                                                </div>
                                                <div class="table-cell text-left">
                                                    Measurement
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-row-group">
                                            {ingredients.map((item, index) => {
                                                console.log(item);
                                                return (
                                                    <>
                                                        <div class="table-row">
                                                            <div class="table-cell">
                                                                {
                                                                    item.ingredient
                                                                }
                                                            </div>
                                                            <div class="table-cell">
                                                                {
                                                                    item.measurement
                                                                }
                                                            </div>
                                                            <div class="table-cell">
                                                                {
                                                                    item.measurementType
                                                                }
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Directions */}
                                <div className="group relative w-full py-6 flex justify-between items-center text-left">
                                    <span className="text-teal-600 text-base font-medium">
                                        Directions
                                    </span>
                                </div>
                                {directions.map((item, index) => {
                                    return (
                                        <dt className="text-md font-normal">
                                            {index + 1}) {item}
                                        </dt>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {modal && (
                <RecipeDelete modal={modal} setModal={setModal} id={id} />
            )}
        </>
    );
}
