require("@babel/polyfill");
import Search from "./Model/search";
import { elements } from "./view/base";
import * as searchView from "./view/viewSearch";

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
        // Хайлтыг гүйцэтгэнэ
         await state.search.doSearch();
        // Хайлтын үр дүнг дэлгэцэнд харуулна
        searchView.renderRecipes(state.search.result);
    }
};
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});