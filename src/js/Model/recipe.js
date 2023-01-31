require("@babel/polyfill");
import axios from "axios";
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
        let result = await axios("https://forkify-api.herokuapp.com/api/v2/recipes/" + this.id);
        // console.log(result);
        this.publisher = result.data.data.recipe.publisher;
        this.image_url = result.data.data.recipe.image_url;
        this.ingredients = result.data.data.recipe.ingredients;
        this.title = result.data.data.recipe.title;
        this.source_url = result.data.data.recipe.source_url;
        this.cooking_time = result.data.data.recipe.cooking_time;
        this.servings = result.data.data.recipe.servings;

        } catch (error){
            console.log("алдаа гарлаа: " + error);
        };
       
    };

}