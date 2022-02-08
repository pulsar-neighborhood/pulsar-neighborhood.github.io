var filterOptions = {
    levelFilters: [],
    categoryFilters: []
};

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
  
    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

function clearFilters(arr){
    arr.splice(0);
    search();
}
function addFilter(arr, id){
    arr.push(id);
    search();
}
function removeFilter(arr, index){
    if (index > -1) {
        arr.splice(index, 1);
        search();
    }
}
function toggleFilter(arr, id){
    if(arr.includes(id)){
        removeFilter(arr, arr.indexOf(id));
        return;
    }

    addFilter(arr, id);
    return;
}
function search(){
    document.location = `/search/?l=${filterOptions.levelFilters.join()}&c=${filterOptions.categoryFilters.join()}`;
}
function initFilters(){
    filterOptions.levelFilters = urlParams["l"]?.split(',') ?? [];
    filterOptions.categoryFilters = urlParams["c"]?.split(',') ?? [];

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        if(filterOptions.levelFilters.includes(checkbox.id) || filterOptions.categoryFilters.includes(checkbox.id)){
            checkbox.checked = true;
        }
    });
}

initFilters();
