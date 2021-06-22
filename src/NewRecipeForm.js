import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, CssBaseline } from '@material-ui/core';


function NewRecipeForm() {
  /* defining our state variables */

  const [recipeName, setRecipeName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ingredients, setIngredients] = React.useState(
    [
      {
        name: "",
        amount: ""
      }
    ]
  );
  const [instructions, setInstructions] = React.useState(
    [
      {
        text: ""
      }
    ]
  );


  // event handlers
  function handleRecipeNameChange(event) {
    let newName = event.target.value;
    setRecipeName(newName);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  /*
  * For the ingredients and instructions, we want the event handlers to generate new arrays,
  * NOT modify the existing ones
  */
  function handleIngredientChange(event) {
    //grab the index and the input type
    let idx = parseInt(event.target.id.split("-")[2]);
    let inputType = event.target.id.split("-")[1];


    if (inputType === "name") {
      // we only want to modify one element, easiest way to do this is to use map to generate a new array
      // the new array will be the same with the one element modified as needed
      const newIngredients = ingredients.map((ingredient, index) => {
        // check if we are at the index that we want
        if (idx !== index) {
          // if it's not the element we want to change we just return the element
          return ingredient;
        }
        // if we have the element that needs to be modified, we return the modified element
        // using object destructuring we just return the original object, with the name field modified
        return { ...ingredient, name: event.target.value}
      });
      
      // be sure to actually update the React state variable so it re-renders
      setIngredients(newIngredients);

    } else if (inputType === "amt") {
      const newIngredients = ingredients.map((ingredient, index) => {
        if (idx !== index) {
          return ingredient;
        }
        return {...ingredient, amount: event.target.value}
      });
      setIngredients(newIngredients);
    }
  }

  function handleIngredientRemove(event) {
    /*
    * To remove an element, we just use the array.filter function to genereate a new array without the 
    * element being deleted
    */
    console.log(event.target.id);
    let idx = parseInt(event.target.id.split("-")[2]);
    console.log("Removing ingredient " + idx);
    let newIngredients = ingredients.filter((ingredient, index) => idx !== index);
    setIngredients(newIngredients);
    
  }

  function handleIngredientAdd(event) {
    /*
    * Same concept as the above methods, concat returns a new array. In this case we get a new array with an
    * element containing an empty string in both fields at the end of it
    */
    let newIngredients = ingredients.concat({name: "", amount: ""});
    setIngredients(newIngredients);
  }

  /*
  * Instruction functions are mostly the same as the ingredient functions
  * Only changes here are the object property names
  */
  function handleInstructionChange(event) {
    let idx = parseInt(event.target.id.split("-")[1]);

    const newInstructions = instructions.map((instruction, index) => {
      if (idx !== index) {
        return instruction;
      }
      return { ...instruction, text: event.target.value}
    });
    
    setInstructions(newInstructions);

  }

  function handleInstructionRemove(event) {
    console.log(event.target.id);
    let idx = parseInt(event.target.id.split("-")[2]);
    console.log("Removing instruction " + idx);
    let newinstructions = instructions.filter((instruction, index) => idx !== index);
    setInstructions(newinstructions);
    
  }

  function handleInstructionAdd(event) {
    let newInstructions = instructions.concat({text: ""});
    setInstructions(newInstructions);
  }
  /*
  * End of Instruction Functions
  */

  /*
  * When the form is submitted, we want to make a POST call to our API to add the recipe
  * to our Database
  */
  function handleSubmit(event) {
    // prevent the default form submit action
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <form onSubmit={handleSubmit}>
        <TextField
          id="recipe-name"
          name="recipe-name"
          label="Recipe Name"
          placeholder="A brief name for your dish"
          required
          variant="outlined"
          value={recipeName}
          onChange={handleRecipeNameChange}
        />
        <TextField
          id="recipe-desc"
          name="recipe-desc"
          label="Description"
          placeholder="A description of your dish"
          multiline
          variant="outlined"
          value={description}
          onChange={handleDescriptionChange}
        />

        {ingredients.map((ing, idx) => {
          return (
            <div key={idx}>
              <TextField
                id={"ing-name-" + idx}
                name={"ing-name-" + idx}
                variant="outlined"
                label="Ingrediant Name"
                value={ing.name}
                required
                onChange={handleIngredientChange}
              />
              <TextField
                id={"ing-amt-" + idx}
                name={"ing-amt-" + idx}
                variant="outlined"
                label="Ingredient Amount"
                value={ing.amount}
                required
                onChange={handleIngredientChange}
              />
              <Button
                id={"ing-remove-" + idx}
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleIngredientRemove}
              >-</Button>
            </div>
          )
        })}

        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleIngredientAdd}
        >+</Button>

        {instructions.map((instr, idx) => {
          return (
            <div key={idx}>
              <TextField
                id={"instr-" + idx}
                name={"instr-" + idx}
                variant="outlined"
                multiline
                value={instr.text}
                required
                onChange={handleInstructionChange}
              />

              <Button
                id={"instr-remove-" + idx}
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleInstructionRemove}
              >
                -
              </Button>
            </div>
          )
        })}

        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleInstructionAdd}
        >
          +
        </Button>

        <Button
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}

export default NewRecipeForm;