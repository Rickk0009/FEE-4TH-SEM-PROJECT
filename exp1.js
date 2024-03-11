const API_KEY = "a7f9789df55f41e2b58adf99c7a776e9"
const url = "https://newsapi.org/v2/everything?q="


window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`); 
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('card-container');
    const newsCardTemplete = document.getElementById('template-news-card');

    cardsContainer.innerHTML= '';

    
    articles.forEach(article=> {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplete.contentEditable.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-Title');
    const newsSource = cardClone.querySelector('#news-Source');
    const newsDesc = cardClone.querySelector('#news-Desc');

    newsImg.src= article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toDateString("en - US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML= `${article.source.name} · ${date}`;


    cardClone.addEventListener('click',() => {
         window.open(article.url, "_blank");
         });

}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}