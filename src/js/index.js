require("@babel/polyfill");
import Search from "./Model/search";
import { elements } from "./view/base";
import * as searchView from "./view/viewSearch";
import Recipe from "./Model/recipe";
import {renderRecipe, clearRecipe, highlightSelectedRecipe, renderNairlaga, renderOrts} from "./view/recipeView";
import List from "./Model/list";
import Likes from "./Model/like";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";

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
    renderRecipe(state.Recipe, state.likes.isLiked(id));  
    
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach(event => window.addEventListener(event, controlRecipe));

// Программ шинээр эхлэхэд бэлдэх
window.addEventListener("load", e => {
    // Шинээр лайк моделийг апп дөнгөж ачааллагдахад үүсгэнэ
    if(!state.likes) state.likes = new Likes();
    // Лайк цэсийг гаргах эсэхийг шийдэх
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
    // Лайкууд байвал тэдгээрийг цэсэнд нэмж харуулна
    state.likes.like.forEach(like => likesView.renderLike(like));
});

// Найрлагын контролер

const controlList = () => {
    // Найрлаганы моделийг үүсгэнэ
    state.List = new List();
    // window.tt = state.List;
    // Өмнө харагдаж байсан найрлагануудыг дэлгэцээс устгана
    listView.clearItems();
    // Уг модел рүү одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ
    
    state.Recipe.ingredients.forEach( n => { 
    // Тухайн найрлагыг модел руу хийнэ
    const item = state.List.addItems(n);
    // Тухайн найрлагыг дэлгэцэнд гаргана
    listView.renderItem(item);
    });
};

// Like Контроллер

const controlLike = () => {
//    Лайкын моделийг үүсгэнэ
if(!state.likes) state.likes = new Likes();
// Одоо харагдаж байгаа жорын ID -г олж авах
const currentRecipeId = state.Recipe.id;
// Энэ жорыг лайкалсан эсэхийг шалгах
if (state.likes.isLiked(currentRecipeId)){
    // Лайкласан бол лайкийг нь болиулна
    state.likes.deleteLike(currentRecipeId);
    // Лайкийн цэснээс устгах функц дуудав
    likesView.deleteNewLike(currentRecipeId);
    // лайк товчны лайкалсан байдлыг болиулах функц дуудав
    likesView.toggleLikeBtn(false);
} else {
    // Лайклаагүй бол лайклана
   const newLike = state.likes.addLike(currentRecipeId, state.Recipe.title, state.Recipe.publisher, state.Recipe.image_url);
    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
}
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener("click", e => {
    if(e.target.matches(".recipe__btn, .recipe__btn *")) {
        controlList();
    }else if (e.target.matches(".recipe__love, .recipe__love *")){
        controlLike();
    }
});

elements.shoppingList.addEventListener("click", e => {
    // Клик хийсэн li элементийн data- itemid  аттрибутыг шүүж гаргаж авах 
   const id = e.target.closest(".shopping__item").dataset.itemid; 
//    олдсон ID -тэй орцыг моделоос устгана
    state.List.deleteItem(id);
    // Дэлгэцээс ийм ID -тэй орцыг олж бас устгана
    listView.deleteItem(id);
});