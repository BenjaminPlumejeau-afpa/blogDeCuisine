// Stockage ds données des recettes
const recipes = [
    {
        id: 1,
        title: "Tarte aux pommes",
        image: "images/photoTartePommes.jpg",
        imageAlt: "Photo de notre délicieuse tarte aux pommes",
        category: "Desserts",
        difficulty: "Facile",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat natus dignissimos est itaque ratione inventore harum id tenetur asperiores laborum, eaque atque ea unde molestias. Maiores minus facere numquam!"
    },
    {
        id: 2,
        title: "Lasagne",
        image: "https://placehold.co/600x400",
        imageAlt: "Image placeholder",
        category: "Plats principaux",
        difficulty: "Moyen",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat natus dignissimos est itaque ratione inventore harum id tenetur asperiores laborum, eaque atque ea unde molestias. Maiores minus facere numquam!"
    },
    {
        id: 3,
        title: "Salade César",
        image: "https://placehold.co/600x400",
        imageAlt: "Image placeholder",
        category: "Entrées",
        difficulty: "Facile",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat natus dignissimos est itaque ratione inventore harum id tenetur asperiores laborum, eaque atque ea unde molestias. Maiores minus facere numquam!"
    },
    {
        id: 4,
        title: "Forêt noire",
        image: "https://placehold.co/600x400",
        imageAlt: "Image placeholder",
        category: "Desserts",
        difficulty: "Difficile",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat natus dignissimos est itaque ratione inventore harum id tenetur asperiores laborum, eaque atque ea unde molestias. Maiores minus facere numquam!"
    },
    {
        id: 5,
        title: "Gratin Dauphinois",
        image: "https://placehold.co/600x400",
        imageAlt: "Image placeholder",
        category: "Plats principaux",
        difficulty: "Moyen",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quaerat natus dignissimos est itaque ratione inventore harum id tenetur asperiores laborum, eaque atque ea unde molestias. Maiores minus facere numquam!"
    }
];


//  --- CONSTANTES ---

const recipesCollection = document.getElementById("recipes");
const categoriesCollection = document.getElementById("categories");
const searchField = document.getElementById("search");
const dropDownMenu = document.getElementById("filterMenu");
const menuButton = document.getElementById("mobileMenu");


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
    // recherche des difficultés
    recipes.forEach(element => {
        if (!categoriesArray.includes(element.difficulty)) {
            categoriesArray.push(element.difficulty);
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
        // au clique sur "tout voir" on affiche toutes les recettes sans filtre
        if (event.target.textContent === "Tout voir") {
            // modification de l'affichage des filtres
            categoryList.forEach(element => {
                element.classList.remove("activeCategory");
                event.target.classList.add("activeCategory");
            });
            searchField.value = "";
            // Affichage de toutes les recettes
            recipeList.forEach(element => {
                element.classList.remove("masque");
            });
            // au clique sur un autre filtre on applique ce dernier
        } else {
            // modification de l'affichage des filtres
            categoryList.forEach(element => {
                element.classList.remove("activeCategory");
                event.target.classList.add("activeCategory");
            });
            // Affichage de toutes les recettes correspondant au filtre
            recipeList.forEach(element => {
                if ((element.childNodes[5].textContent.includes(event.target.textContent)) || (element.childNodes[7].textContent.includes(event.target.textContent))) {
                    element.classList.remove("masque");
                } else {
                    element.classList.add("masque");
                }
            });
            searchRecipe();
        }
    }
}

// fonction permettant de rechercher une recette par son nom
function searchRecipe() {
    if (searchField.value !== ""); {
        let searched = searchField.value.toUpperCase();
        recipesCollection.childNodes.forEach(element => {
            if (element.nodeName === "ARTICLE") {
                let recipeTitle = element.childNodes[1].textContent.toUpperCase();
                if (recipeTitle.includes(searched) && !(element.classList.contains("masque"))) {
                    element.classList.remove("masque");
                } else {
                    element.classList.add("masque");
                }
            }
        });
    }
}

//fonction toogle du menu déroulant des catégories en mode mobile
function toogleMenu() {
    if (window.matchMedia("screen and (max-width: 767px)").matches) {
        if (dropDownMenu.style.display === "block") {
            menuButton.style.borderRadius = ("8px");
            dropDownMenu.style.opacity = "0";
            setTimeout(function () { dropDownMenu.style.display = "none"; }, 401);
        } else {
            menuButton.style.borderRadius = ("8px 8px 0 0");
            dropDownMenu.style.display = "block";
            setTimeout(function () { dropDownMenu.style.opacity = "100"; }, 1);
        }
    }
}


//  --- PROGRAMME PRINCIPAL ---

// affichage des recettes et catégories
displayRecipes();
displayCategories();

// Ecouteurs
categoriesCollection.addEventListener("click", filterByCategory);
searchField.addEventListener("keypress", searchRecipe);
menuButton.addEventListener("click", toogleMenu);