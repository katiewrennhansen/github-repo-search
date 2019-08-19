'use strict';


//function for fetch
function fetchData(username){
    const url = `https://api.github.com/users/${username}/repos`;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error (response.statusText);
        })
        .then(responseJson => {
            createHTML(responseJson);
            console.log(responseJson);
        })
        .catch(err => {
            console.log(err);
        })

}


//function for creating and appending HTML
function createHTML(responseJson){
    $('#js-results-list').empty();
    responseJson.forEach(repo => {
        $('#js-results-list').append(
            `<li>
            <p>${repo.name}
            <a href="${repo.html_url}" target="_blank">Visit Repo</a>
            </li>`)
    });
}



//function for listening on click event

function search(){
    $('form').on('submit', function(e){
        e.preventDefault();
        const name = $('input[type="text"]').val();
        $('#js-results-user').text(`Repositories for: ${name}`);
        console.log(fetchData(name));
    });
}


$(search);