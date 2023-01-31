require("@babel/polyfill");
import Search from "./Model/search";
import { elements } from "./view/base";
import * as searchView from "./view/viewSearch";
import Recipe from "./Model/recipe";
import {renderRecipe, clearRecipe, highlightSelectedRecipe} from "./view/recipeView";

/* 
Web app төлөв 
Хайлтын query, үр дүн 
Тухайн үзүүлж байгаа жор 
Лайкласан жорууд
Захиалж байгаа жорын найрлаганууд
*/

const state = {};

const controlSearch = async () => {
    // Хайлтнаас түлхүүр үгийг авна
    const query = searchView.getInput();
    if (query){
        // Шинээр хайлтын обьектийг үүсгэж өгнө
        state.search = new Search(query);
        // Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
        searchView.searchClear();
        searchView.clearSearchResult();
        // Хайлтыг гүйцэтгэнэ
         await state.search.doSearch();
        // Хайлтын үр дүнг дэлгэцэнд харуулна
        if (state.search.recipes === undefined){
            alert("хайлтаар илэрцгүй"); 
        } 
        else searchView.renderRecipes(state.search.recipes);
    }
};
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");

    if(btn) {
        const gotoPageNum = parseInt(btn.dataset.goto);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.recipes, gotoPageNum);
    }
});

// Жорын контроллер 

const controlRecipe = async () => {
//     // URL -аас ID -ийг салгах
    const id = window.location.hash.replace("#", "");
//     // Жорын моделийг үүсгэж өгнө
    state.Recipe = new Recipe(id);
//     // UI дэлгэцийг бэлтгэнэ    
    clearRecipe(); 
    highlightSelectedRecipe(id); 
//     // Жороо татаж авчирна
    await state.Recipe.getRecipe();

//     // Жороо дэлгэцэнд гаргана
    renderRecipe(state.Recipe);
    
};

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);