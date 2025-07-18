const apikey = "51318413-a9f7812cbc978ad9e7de05306";
// selecting Element
const GalleryEl = document.getElementById("Gallery");
const searchEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");

//  searched by querries
async function searchByQuerry() {
   GalleryEl.innerHTML = "" // yaha ham galleryelement ko khali kr rhe hai
  const  querry = searchEl.value
  const url = `https://pixabay.com/api/?key=${apikey}&q=${querry}&image_type=photo&pretty=true`;
  const SearchedImages = await getImages(url)
  SearchedImages.hits.length === 0 ? GalleryEl.innerHTML = `
  <div class = "flex items-center justify-center flex-col">
  <h2 class = "text-3xl font-bold italic">${querry}</h2>
  <p>Sorry, we couldn't find any matches</p>
  </div>
  ` : SearchedImages.hits.forEach((image)=>{

    GalleryEl.innerHTML += `<img
            class="w-full rounded-lg"
            src=${image.largeImageURL}
            alt="Gallery Image"
          />
    `
  })
  searchEl.value = ""
}

// when dom is loaded
async function AllImages() {
  let url = `https://pixabay.com/api/?key=${apikey}&image_type=photo&pretty=true`;
  const images = await getImages(url);
  images.hits.forEach(
    (element) =>
      (GalleryEl.innerHTML += `<img
            class="w-full rounded-lg"
            src=${element.largeImageURL}
            alt="Gallery Image"
          />
    `)
  );
}

const getImages = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// when dom is load then call Allimage method
window.addEventListener("DOMContentLoaded", () => {
  AllImages();
});

// calling when button clicked
searchBtnEl.addEventListener('click',searchByQuerry)

