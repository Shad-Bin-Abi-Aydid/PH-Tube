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

// Create DisplayCategories
const displayData = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    // create button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    // add button to category container
    categoryContainer.append(button);
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
    console.log(videos);
  const videoContainer = document.getElementById("videos");

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
         <figure class = "h-[200px]">
            <img
            src="${video.thumbnail}"
            class = "h-full w-full object-cover"
            alt="Shoes" />
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
              <img class = "h-10 w-10 rounded-full object-cover" src =${video.authors[0].profile_picture} />
            </div>

            <div>
              <h2 class = "font-bold">${video.title}</h2>
              <div class = "flex gap-2 items-center">
                <p class = "text-gray-500">${video.authors[0].profile_name}</p>
                <img class = "h-5 w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />
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
