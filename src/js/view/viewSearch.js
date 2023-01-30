import { elements } from "./base";

const renderRecipe = recipe => {
    // console.log(recipe);
    const markup = `
    <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}/h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                `;
                elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const searchClear = () => {
    elements.searchInput.value = "";
};
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = "";
    elements.pageButtons.innerHTML = "";
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
    // Хайлтын үр дүнг хуудаслаж үзүүлэх
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    // Хуудаслалтын товчнуудыг гаргаж ирэх
    const totalPages = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages);
};

const creatButton = (page, type, direction) => ` <button class="btn-inline results__btn--${type}" data-goto=${page}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
<span>Хуудас ${page}</span>
</button>`;
const renderButtons = (currentPage, totalPages) => {
    let buttonHTML;
    if(currentPage === 1 && totalPages > 1){
        // 1-р хуудсан дээр байна. 2-р хуудас гэдэг товчийг гарга
        buttonHTML = creatButton(2, "next", "right");
    } else if(currentPage < totalPages){
        // голын хуудаснууд дээр байна
        buttonHTML = creatButton(currentPage - 1, "prev", "left");
        buttonHTML  += creatButton(currentPage + 1, "next", "right");
    } else if (currentPage === totalPages){
        // хамгийн сүүлийн хуудас дээр байна өмнөх хуудасруу шилж
        buttonHTML = creatButton(currentPage - 1, "prev", "left");
    } 

    elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHTML);
};
