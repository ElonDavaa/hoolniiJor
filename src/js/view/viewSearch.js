import { elements } from "./base";

const renderRecipe = recipe => {
    const markup = `
    <li>
                    <a class="results__link results__link--active" href="#23456">
                        <figure class="results__fig">
                            <img src="img/test-1.jpg" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}/h4>
                            <p class="results__author">${recipe.title}</p>
                        </div>
                    </a>
                </li>
                `;
};

export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
    recipes.forEach(renderRecipe);
};