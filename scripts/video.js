
// Category Button color change


// Date formating (Hours, minutes, second) and Showing
function getTimeString(time){
  const hours = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt( remainingSecond / 60);
  remainingSecond = minute % 60;

  return `${hours}hr ${minute}min ${remainingSecond}sc ago`;s
}

// Fetch, Load and show categories on html

// Create LoadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.categories))
    .catch((error) => console.log(error));
};

// Create LoadVideos
const loadVideos = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((error) => console.log(error));
};

// Load Category videos 
const loadCategoryVideos = (id) =>{
  // fetch the data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

      // remove the active button class if there have any
      const activeBtnClass = document.getElementsByClassName("categoryBtn");
      for(let actBtn of activeBtnClass){
        actBtn.classList.remove("bg-[red]", "text-white");
      }
      
      // Select the button dynamically and add special style for active button.
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("bg-[red]", "text-white");


      // Call the displayVideo function to show the videos.
      displayVideo(data.category)
    })
    .catch((error) => console.log(error));
}

// Create DisplayCategories
const displayData = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    // create button
    console.log(item.category_id);
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = 
    `
      <button id="btn-${item.category_id}" onClick = "loadCategoryVideos(${item.category_id})" class="btn categoryBtn">${item.category} </button>
    `;
    
    
    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

// Object demo from API. it add here to see and write codes.
/* const demoCode = {
    "category_id": "1001",
    "video_id": "aaab",
    "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
    "title": "Midnight Serenade",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
            "profile_name": "Noah Walker",
            "verified": false
        }
    ],
    "others": {
        "views": "543K",
        "posted_date": ""
    },
    "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
}


*/

// Create DisplayVideos
const displayVideo = (videos) => {
 // console.log(videos);

  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  // check data is available or not 
  if(videos.length == 0){
    // remove the grid from classList to show the html in middle
    videoContainer.classList.remove("grid");

    // added the innerHTML if there have no content
    videoContainer.innerHTML = `
      <div class = "min-h-[300px] flex flex-col justify-center items-center gap-5">
        <img src = "assets/Icon.png" />
        <h2 class = "font-bold text-2xl">Oops!! Sorry, There is no content here</h2>
      </div>
    `
    return;
  }
  else{
    // added the grid again otherwise all categories videos showing column by column
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
         <figure class = "h-[200px] relative">
            <img
            src="${video.thumbnail}"
            class = "h-full w-full object-cover"
            alt="Shoes" />
            ${
              video.others.posted_date?.length == 0
                ? ""
                : `<span class = "absolute right-2 bottom-2 bg-black text-white p-2 rounded-lg text-xs"> ${getTimeString(video.others.posted_date)}</span>`
            }
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
              <img class = "h-10 w-10 rounded-full object-cover" src =${
                video.authors[0].profile_picture
              } />
            </div>

            <div>
              <h2 class = "font-bold">${video.title}</h2>
              <div class = "flex gap-2 items-center">
                <p class = "text-gray-500">${video.authors[0].profile_name}</p>
                ${
                  video.authors[0].verified === true
                    ? '<img class = "h-5 w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />'
                    : ""
                }
                
              </div>
              <p class = "text-gray-500">${video.others.views} Views</p>
            </div>
        </div>
        `;
    videoContainer.append(card);
  });
};

loadCategories();
loadVideos();
