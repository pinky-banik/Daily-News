const spinner = document.getElementById("spinner");

// All Catagories API

const loadAllCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayAllCategories(data.data.news_category))
        .catch((err)=>console.log(err));
};

const displayAllCategories = (categories) => {
    // console.log(categories);

    for (const categorie of categories) {
        const allCategories = document.getElementById("categories");
        const categoriesUl = document.createElement("div");
        categoriesUl.innerHTML = `
            <button onclick="AllCategories('${categorie.category_id}')" class="h-button">${categorie.category_name}</button>
        `;
        allCategories.appendChild(categoriesUl);
    }
};
// all Categories data by catch by id

const AllCategories = (idCategories) => {
    // console.log("show id", idCategories);
    
    spinner.classList.remove("d-none"); 
    const url = `https://openapi.programming-hero.com/api/news/category/${idCategories}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
          displayAllNews(data.data);
          displayLength(data.data.length);
          // console.log(data.data);
          spinner.classList.add("d-none");
        })
        .catch((err)=>console.log("error",err));
};

//display all news by default
const def=() =>{
  const defaultCatagory = '08';
  AllCategories(defaultCatagory);
}
const home=()=>{
  def();
}
def();
//Display number of news
const displayLength=(length)=>
{
  const newslength = document.getElementById("newsLength");
  newslength.innerHTML="";
  newslength.innerHTML = `${length===0? "No News found":length +" News Has been found"}`;
}
// breaking news data
const displayAllNews = (catagoryNews) => {

    const allNews = document.getElementById("breackingNews");
    allNews.innerHTML = "";
    for (const news of catagoryNews) {
      console.log(news);
        displayLength();
        const createNewsDiv = document.createElement("div");
        createNewsDiv.innerHTML = `
                <div  class="card mt-3 mb-3 shadow p-3 mb-5 bg-body rounded">
                <div class="row ">
                  <div class="col-lg-2 col-md-4 mx-auto  ">
                    <img src=${news.thumbnail_url
            } class="img-fluid rounded-start w-sm-100" alt="...">
                  </div>
                  <div class="col-lg-10 col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${news.title}</h5>
                      <p class="card-text">${news.details.slice(
                0,
                600
            )}...</p>

                      <div class="d-flex justify-content-between ">

                      <div class='d-flex align-items-center'>
                            <img src=${news.author.img
            } width="40" height="40" class="rounded-5" alt="">
                      <div class=" ps-2">
                        <strong>${news.author.name}</strong>
                        <br>
                        <small>${news.author.published_date}</small>
                        </div>
                      </div>

                      <div>
                      <i class="fa-regular fa-eye"> ${news.total_view ? news.total_view : "not found"
            }  </i>
                      </div>

                      <div>
                      <i class="fa-regular fa-star"></i>${news.rating.number}
                      </div>

                      <div >
                      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <i class="fa-solid fa-right-long"></i>
                      </button>

                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="text-danger" id="exampleModalLabel">${news.title ? news.title :"Title Not Found" }</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body d-flex flex-column">
                          <img src=${news.image_url
                          ? news.image_url : "Image not found"} class="img-fluid mx-auto rounded-start" alt="...">
                            
                          <div class="d-flex justify-content-between ">

                      <div class='d-flex align-items-center pt-2'>
                            <img src=${news.author.img ? news.author.img :"Author Image not found"
            } width="40" height="40" class="rounded-5" alt="">
                      <div class=" ps-2">
                        <strong>${news.author.name ? news.author.name :"Author name not found"}</strong>
                        <br>
                        <small>${news.author.published_date ? news.author.published_date : " Published Date not found"}</small>
                        </div>
                      </div>
                      <div class="d-flex justify-content-center align-items-center px-3">
                      <i class="fa-regular fa-star"></i>${news.rating.number ?  news.rating.number :"Rating Not Found"}(${news.rating.badge?news.rating.badge :"" })
                      </div>
                      <div class="d-flex justify-content-center align-items-center px-3">
                      <i class="fa-regular fa-eye"> ${news.total_view ? news.total_view : "views not found"
            }  </i>
                      </div>
                      </div>
                          <p class="py-2">${news.details ?  news.details:"Details Not Found"}</p>
                        </div>
                      </div>
                    </div>
                      </div>

                      </div>

                      </div>
                    </div>
                  </div>
                </div>
                </div>
       
       `;
        allNews.appendChild(createNewsDiv);
    }
};




loadAllCategories();


