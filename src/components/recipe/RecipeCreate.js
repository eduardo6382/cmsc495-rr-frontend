import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { createRecipe } from "../../redux/actions/recipes";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";

export default function RecipeCreate() {
      const { token } = useSelector((state) => state.auth);
      const dispatch = useDispatch();
      const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [directionInput, setDirectionInput] = useState('');
      const [directions, setDirections] = useState([]);
      const [ingredientList, setIngredientList] = useState([]);
      const [ingredientName, setIngredientName] = useState('');
      const [ingredientAmount, setIngredientAmount] = useState('');
      const [ingredientDropDown, setIngredientDropDown] = useState([]);
      const [measurements, setMeasurements] = useState(['teaspoon', 'tablespoon', 'cups']);
      const [measurement, setMeasurement] = useState('teaspoon');
      const [notes, setNotes] = useState('');
      const [servings, setServings] = useState('');
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      };
      const [user, setUser] = useState('');

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
  };

  const onChangeDirections = e => {
    setDirectionInput(e.target.value);
  }

  const onChangeIngredientName = e => {
    setIngredientName(e.target.value);
  }

  const onChangeAmount = e => {
    setIngredientAmount(e.target.value);
  }

  const onChangeMeasurements = e => {
    setMeasurement(e.target.value);
  }

  const handleDirectionClick = e => {
    if(!directions.includes(e)){
      setDirections([...directions, e]);
    }
    else{
      alert("This step is already created.");
    }
  }

  const handleDirectionXClick = e => {
    setDirections(directions.filter((x) => x !== e));
  }

  const handleIngredientClick = e => {
    e.preventDefault();
    const value = ingredientName + " " + ingredientAmount + " " + measurement;
    const valueObject = {
      measurement: ingredientAmount,
      measurementType: measurement,
      ingredient: ingredientName
    };
    if (!ingredientDropDown.includes(value)) {
      setIngredientDropDown([...ingredientDropDown, value]);
      ingredientList.push(valueObject);
    }
    else{
      alert("Item already exists");
    }
    setIngredientName('');
    setIngredientAmount('');
  }

  const handleIngredientXClick = e => {
    setIngredientDropDown(ingredientDropDown.filter((x) => x !== e));
    setIngredientList(ingredientList.filter((x) => x.ingredient != e.split(" ")[0]));
  }

  const onChangeServings = e => {
    setServings(e.target.value);
  }

  const onChangeNotes = e => {
    setNotes(e.target.value);
  }

  const getUser = () => {
      axiosInstance.get("https://recipe-express-api.herokuapp.com/api/user", config)
        .then((res) =>
          setUser(res.data.userId
        ))
        .catch((err) => {
          console.log(err)
        });
  }

  const OnSubmit = e => {
    e.preventDefault();
    getUser();
    const recipe = {
      name: name,
      description: description,
      directions: directions,
      ingredients: ingredientList,
      notes: notes,
      Servings: servings,
      user_id: user
    }

    dispatch(createRecipe(recipe));
    alert("Recipe has been created!");

    window.location = "/";
  }

    return (
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="p-5 text-lg font-medium leading-6 text-gray-900">
                  Create your recipe and share it to the world!
                </h3>
                <p className="px-5 text-sm text-gray-600">
                  "Cooking is like painting or writing a song. Just as there are
                  only so many notes or colors, there are only so many
                  flavors—it’s how you combine them that sets you apart." -Wolfgang Puck
                </p>
              </div>
            </div>
            <form className="mt-5 md:mt-0 md:col-span-2" onSubmit={OnSubmit}>
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Food Name
                  </h1>
                  <input
                      type="text"
                      required
                      id="title"
                      className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                      placeholder="Write a name for your recipe. Something catchy ..."
                      value={name}
                      onChange={onChangeName}
                    />
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Description
                  </h1>
                  <div>
                    <textarea
                      type="text"
                      required
                      id="description"
                      rows={3}
                      className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Write a short description..."
                      value={description}
                      onChange={onChangeDescription}
                    />
                  </div>
                </div>

                <div className="space-y-6">
		              <div>
                    <h1 className="text-lg leading-6 font-medium text-gray-900">
                      Directions
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                      Fill in the directions to create your new recipe.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex">
                        <div className="flex-grow">
                          <textarea
                            id="description"
                            name="description"
                            rows={1}
                            className="block w-full shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Add egg and meat until egg mixture is combined..."
                            value={directionInput}
                            onChange={onChangeDirections}
                          />
                        </div>

                        <div className="ml-3">
                          <button
                            type="button"
                            className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            onClick={() => handleDirectionClick(directionInput)}
                          >
                            <PlusIcon
                              className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-200">
                      <ul className="divide-y divide-gray-200">
                        {directions.map((direction, idx) => (
                          <li key={direction} className="py-4 flex">
                            <div className="ml-3 flex flex-grow justify-between">
                              <div>
                                <span className="text-base font-medium text-gray-900">
                                  {idx + 1}){" "}
                                </span>
                                <span className="text-base font-medium text-gray-900">
                                  {direction}
                                </span>
                              </div>
                              <div className="">
                                <button
                                  type="button"
                                  className="bg-white inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                  onClick={() => handleDirectionXClick(direction)}
                                >
                                  <MinusIcon
                                  className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                  />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Ingredients
                  </h1>
                  <div className="flex">
                    <input
                      type="text"
                      id="ingredientName"
                      className="block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Ingredient(ex: flour)"
                      value={ingredientName}
                      onChange={onChangeIngredientName}
                    />
                    <input
                      type="text"
                      id="ingredientAmount"
                      className="block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Amount(ex: 1)"
                      value={ingredientAmount}
                      onChange={onChangeAmount}
                    />
                    <select
                      className="block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                      value={measurement}
                      onChange={onChangeMeasurements}>
                      {
                        measurements.map((measure) => {
                        return <option
                        key={measure}
                        value={measure}>{measure}
                        </option>
                        })
                      }
                    </select>

                    <button type="button" className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" onClick={handleIngredientClick}>
                      <PlusIcon
                        className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Add</span>
                    </button>
                  </div>
                  <div className="border-b border-gray-200">
                    {ingredientDropDown.map((ingredient, idx) => (
                      <li key={ingredient} className="py-4 flex">
                        <div className="ml-3 flex flex-grow justify-between">
                          <div>
                            <span className="text-base font-medium text-gray-900">
                              {idx + 1}){" "}
                            </span>
                            <span className="text-base font-medium text-gray-900">
                              {ingredient}
                            </span>  
                          </div>

                          <div>
                            <button type="button"
                              className="bg-white inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                              onClick={() => handleIngredientXClick(ingredient)}
                            >
                              <MinusIcon
                                className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                                <span>Remove</span>
                            </button>
                          </div>

                        </div>
                      </li>
                    ))}
                  </div>
                </div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Servings
                  </h1>
                  <div className="flex">
                    <input
                      type="text"
                      id="servings"
                      required
                      className="block shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Servings(ex: 4)"
                      value={servings}
                      onChange={onChangeServings}
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Notes
                  </h1>
                  <div>
                    <textarea
                      type="text"
                      id="notes"
                      rows={2}
                      className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Any extra notes..."
                      value={notes}
                      onChange={onChangeNotes}
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
}
