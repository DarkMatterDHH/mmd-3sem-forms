"use server";

const postRecipe = async (formData) => {
  //Håndter request til Api'en
  const recipeName = formData.get("recipename");
  await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: recipeName,
    }),
  });
  console.log("Opskrift oprettet:", recipeName);
};

export default postRecipe;
