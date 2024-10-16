//  --- FONCTIONS ---

// fonction affichant les recettes dans la page
function displayRecipes() {
    recipes.forEach(element => {
        recipesCollection.innerHTML += `
                <article class="recipe">
                    <h3>${element.title}</h3>
                    <img class="imgRecipe" src="${element.image}" alt="${element.imageAlt}">
                    <p>Catégorie : <strong>${element.category}</strong></p>
                    <p>Difficulté : <strong>${element.difficulty}</strong></p>
                </article>
        `;
    });
}

// fonction recherchant les différentes catégories parmi les recettes puis les affiche dans la page
function displayCategories() {
    // recherche des catégories
    const categoriesArray = [];
    recipes.forEach(element => {
        if (!categoriesArray.includes(element.category)) {
            categoriesArray.push(element.category);
        }
    });

    // affichage
    categoriesArray.forEach(element => {
        const newCategory = document.createElement("li")
        categoriesCollection.appendChild(newCategory);
        newCategory.classList.add("category");
        newCategory.textContent = element;
    });
}

// fonction filtrant les recettes selon la catégorie cliquée
function filterByCategory(event) {
    if (event.target.nodeName === "LI") {
        let categoryList = document.querySelectorAll("#categories li");
        let recipeList = document.querySelectorAll("#recipes article");
        if (event.target.textContent === "Tout voir") {
            // modification de l'affichage des filtres
            categoryList.forEach(element => {
                element.classList.remove("activeCategory");
                event.target.classList.add("activeCategory");
            });
            // Affichage de toutes les recettes
            recipeList.forEach(element => {
                element.classList.remove("masque");
            });
        } else {
            // modification de l'affichage des filtres
            categoryList.forEach(element => {
                element.classList.remove("activeCategory");
                event.target.classList.add("activeCategory");
            });
            // Affichage de toutes les recettes
            recipeList.forEach(element => {
                if (element.textContent === event.target.textContent) {
                    element.classList.remove("masque");
                } else {
                    element.classList.add("masque");
                }
            });
        }
    }
}


//  --- PROGRAMME PRINCIPAL ---
const recipes = [
    {
        id: 1,
        title: "Tarte aux pommes",
        image: "images/photoTartePommes.jpg",
        imageAlt: "Photo de notre délicieuse tarte aux pommes",
        category: "Desserts",
        difficulty: "Facile"
    },
    {
        id: 2,
        title: "Lasagne",
        image: "https://placehold.co/600x400",
        imageAlt: "Image placeholder",
        category: "Plats principaux",
        difficulty: "Moyen"
    },
    {
        id: 3,
        title: "Salade César",
        image: "https://placehold.co/600x400",
        imageAlt: "Image placeholder",
        category: "Entrées",
        difficulty: "Facile"
    }
];

const recipesCollection = document.getElementById("recipes");
const categoriesCollection = document.getElementById("categories");

// affichage des recettes
displayRecipes();
displayCategories();

categoriesCollection.addEventListener("click", filterByCategory);