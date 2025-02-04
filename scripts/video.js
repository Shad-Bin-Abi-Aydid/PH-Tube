// Fetch, Load and show categories on html

// Create LoadCategories
const LoadCategories = () =>{
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.categories))
    .catch((error) => console.log(error))
};


// Create DisplayCategories
const displayData = (data) =>{
    console.log(data);
}

LoadCategories();