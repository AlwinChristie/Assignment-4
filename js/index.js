
// API Reference : https://developer.nytimes.com/docs/top-stories-product/1/overview


// API Key
const key = '2OsAyIgErh5URAtXMIBMTZAre2bxbMc7';

const selectedSection = document.querySelector('#section-choose');
const topStories = document.querySelector('.top-stories');
const section = document.querySelector('section');


var sectionValue = selectedSection.value;
selectedSection.addEventListener('change', function(){
    sectionValue = selectedSection.value;
    console.log(sectionValue);
})


topStories.addEventListener('click',fetchResults);

function fetchResults(event) {
    event.preventDefault();
    
    url = `https://api.nytimes.com/svc/topstories/v2/${sectionValue}.json?api-key=${key}`;

    fetch(url).then(function (results){
        return results.json();
    })
    .then(function(json){
        displayResults(json);
    });

};

function displayResults(json) {

    while (section.firstChild) {
            section.removeChild(section.firstChild);
    };
    
    let articles = json.results;	

    if(articles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results returned.'
        section.appendChild(para);
    } else {
        for(let i = 0; i < articles.length; i++) {
            const article = document.createElement('article');
            const heading = document.createElement('h3');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const content = document.createElement('p');

            const current = articles[i];
            console.log(current);

            link.href = current.url;
            link.textContent = current.title;
            content.textContent = current.abstract;

            if(current.multimedia.length > 0) {
                img.src = current.multimedia[0].url;
                img.alt = current.multimedia[0].caption;
            };

            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(content);
            section.append(article);
        };
    };
};
