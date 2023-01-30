require("@babel/polyfill");
import axios from "axios";
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async doSearch(search) {
        try {
        let result = await axios("https://forkify-api.herokuapp.com/api/v2/recipes?search=" + this.query);
        this.recipes = result.data.data.recipes;
        // console.log(this.recipes);
        return this.recipes;

        } catch (error){
            console.log("алдаа гарлаа: " + error);
        }
        
    
    };
}