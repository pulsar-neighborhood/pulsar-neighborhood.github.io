// Helpers
show = elem => elem.style.display = 'block';
hide = elem => elem.style.display = 'none';

function search(searchQuery) {

    show(document.querySelector('.search-loading'));

    fetch('/index.json').then(function (response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }
        // Examine the text in the response
        response.json().then(function (pages) {
            var fuse = new Fuse(pages, fuseOptions);
            var result = fuse.search(searchQuery);

            populateResults(result);
            
            hide(document.querySelector('.search-loading'));
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    });
}
function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}
function populateResults(results) {
    var searchQuery = document.getElementById("search-query")?.value;
    var searchResults = document.getElementById("search-results");

    // pull template from hugo template definition
    var searchResultTemplate = document.getElementById("search-result-template");

    results.forEach(function (result, key) {
        console.log(result);
        var searchResultRoot = searchResultTemplate.content.cloneNode(true);
        var typeNode = searchResultRoot.getElementById("search-result-type") ?? null;
        var dateNode = searchResultRoot.getElementById("search-result-date") ?? null;
        var levelNode = searchResultRoot.getElementById("search-result-level") ?? null;
        var titleNode = searchResultRoot.getElementById("search-result-title") ?? null;
        var summaryNode = searchResultRoot.getElementById("search-result-summary") ?? null;
        var linkNode = searchResultRoot.getElementById("search-result-link") ?? null;
        var tagsNode = searchResultRoot.getElementById("search-result-tags") ?? null;
        var categoriesNode = searchResultRoot.getElementById("search-result-categories") ?? null;

        var resultDate = new Date(result.item.date);

        if(typeNode !== null) typeNode.innerHTML = result.item.type;
        if(titleNode !== null) titleNode.innerHTML = result.item.title;
        if(dateNode !== null) dateNode.innerHTML = "{0} {1}".format(new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric'}).format(resultDate),
        (resultDate.getFullYear() < new Date().getFullYear() ? ', {0}'.format(resultDate.getFullYear()) : ''));
        if(levelNode !== null) (shouldClearNode(result.item.level) ? levelNode.parentNode.classList.add('d-none') : levelNode.innerHTML = result.item.level);
        if(summaryNode !== null) summaryNode.innerHTML = result.item.summary;
        if(linkNode !== null) linkNode.href = result.item.relpermalink;
        
        result.item.tags?.forEach((tag) => {
            var li = document.createElement('li');
            li.textContent = tag;
            tagsNode?.appendChild(li);
        });

        result.item.categories?.forEach((category) => {
            var li = document.createElement('li');
            li.textContent = category;
            categoriesNode?.appendChild(li);
        });
        
        searchResults?.appendChild(searchResultRoot);
    });
}
function shouldClearNode(val){
    return (val === undefined || val === null || val.length < 1);
}
function buildSearchQuery(){
	var textSearchVal = param("s").trim() ?? null;
	var levelFilters = param("l")?.trim().split(',').filter(Number) ?? [];
	var categoryFilters = param("c")?.trim().split(',').filter(String) ?? [];
	var tagFilters = param("t")?.trim().split(',').filter(String) ?? [];

	if(textSearchVal === null && levelFilterStr === null && categoryFilterStr === null){
		return null;
	}

	var searchFilters = [];

	if(textSearchVal !== null && textSearchVal.length > 0){
		var inputBox = document.getElementById('search-query');
		
        if(inputBox !== null){
            inputBox.value = textSearchVal; // Fill the search box with search term
        }

		searchFilters.push({title: `${textSearchVal}`});
		searchFilters.push({description: `${textSearchVal}`});
		searchFilters.push({summary: `${textSearchVal}`});
	}

    if(levelFilters.length > 0)
        searchFilters.push(convertArrayToOrSearch("level", levelFilters));
    
    if(categoryFilters.length > 0)
        searchFilters.push(convertArrayToOrSearch("categories", categoryFilters));
    
    if(tagFilters.length > 0)
        searchFilters.push(convertArrayToOrSearch("tags", tagFilters));

	return {$and: searchFilters.filter(n => n)};
}
function convertArrayToOrSearch(label, arr){
    if(arr === null || arr.length < 1){
        return null;
    }

    var retArr = [];

    arr.forEach((val) => {
        if(val === null || val.length < 1){
            return;
        }
        retArr.push({[label]: `${val}`});
    });

    return {$or: retArr};
}

var summaryInclude = 60;
var fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.0,
    tokenize: false,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    isCaseSensitive: true,
    keys: [
        {name: "title", weight: 0.3},
        {name: "tags", weight: 0.3},
        {name: "categories", weight: 0.3},
        {name: "level", weight: 0.3},
        {name: "description", weight: 0.3},
        {name: "summary", weight: 0.3},
    ]
};

var searchQuery = buildSearchQuery();
if(searchQuery === null){
	document.getElementById('search-results').innerHTML = '<p class="search-results-empty">Please enter a word or phrase above, or see <a href="/tags/">all tags</a>.</p>';
}else{
	search(searchQuery);
}
