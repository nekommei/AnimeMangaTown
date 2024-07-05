// Add functions to open and close the navigation bar
function openNav() {
    document.getElementById("mySidenav").style.width = "180px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

window.onload = function () {
    closeNav();
    displayData();
}

//Searching 
function buttonClicked1() {
    var searchData = document.getElementById("searchInput").value
    var searchType = document.getElementById("searchType").value
    window.location.href = `info.html?q=${searchData}&t=${searchType}`
}

//for anime top 5
fetch(`https://api.jikan.moe/v4/top/anime?limit=5`).then((response) => response.json()).then((info) => {
    var topAnime = []
    var animeLink = []
    var animeImage = []

    for (let j = 0; j < 5; j++) {
        var title = info.data[j].titles[0].title
        var link = info.data[j].url
        var image = info.data[j].images.jpg.image_url
        animeLink.push(link)
        topAnime.push(title)
        animeImage.push(image)
    }

    var myList = document.getElementById('myList')

    for (let i = 0; i < topAnime.length; i++) {
        var flexItem = document.createElement('div')
        flexItem.className = 'flex-item'

        var anchor = document.createElement('a')
        anchor.href = ""
        anchor.style.textDecoration = 'none';

        var img = document.createElement('img')
        img.src = animeImage[i]

        var titleElement = document.createElement('p')
        titleElement.textContent = topAnime[i]

        anchor.addEventListener('click', function (event) {
            event.preventDefault()
            var searchData = topAnime[i]
            var type = 'anime'

            window.location.href = `info.html?q=${searchData}&t=${type}`
        });

        anchor.appendChild(img)
        anchor.appendChild(titleElement)

        flexItem.appendChild(anchor)

        myList.appendChild(flexItem)
    }
})

//for manga top 5
fetch(`https://api.jikan.moe/v4/top/manga?limit=5`).then((response) => response.json()).then((info) => {

    var topmanga = []
    var mangaLink = []
    var mangaImage = []

    for (let j = 0; j < 5; j++) {
        var title = info.data[j].titles[0].title
        var link = info.data[j].url
        var image = info.data[j].images.jpg.image_url
        mangaLink.push(link)
        topmanga.push(title)
        mangaImage.push(image)
    }

    var myList2 = document.getElementById('myList2')

    for (let i = 0; i < topmanga.length; i++) {
        var flexItem = document.createElement('div')
        flexItem.className = 'flex-item'

        var anchor = document.createElement('a')
        anchor.href = ""
        anchor.style.textDecoration = 'none';

        var img = document.createElement('img')
        img.src = mangaImage[i]

        var titleElement = document.createElement('p')
        titleElement.textContent = topmanga[i]

        anchor.addEventListener('click', function (event) {
            event.preventDefault()
            var searchData = topmanga[i]
            var type = 'manga'

            window.location.href = `info.html?q=${searchData}&t=${type}`
        });

        anchor.appendChild(img)
        anchor.appendChild(titleElement)

        flexItem.appendChild(anchor)

        myList2.appendChild(flexItem)
    }
})

//info.html
var searchData = new URLSearchParams(window.location.search).get("q")
var searchType = new URLSearchParams(window.location.search).get("t")
fetch(`https://api.jikan.moe/v4/${searchType}?q=${searchData}`).then((response) => response.json()).then((info) => {

    if (searchType == "anime") {

        var textInfo = `<p style="margin-top: 0%;">Alternative titles : <span id="altaTitle" style="margin-top: 0%;">null</span></p>
                                    <p>Rating : <span id="rating">null</span></p>
                                    <p>Genres : <span id="genres">null</span></p>
                                    <p>Schedule : <span id="schedule">null</span></p>
                                    <p>Source : <span id="source">null</span></p>
                                    <p>Producer : <span id="producer">null</span></p>`

        document.getElementById('textInfo').innerHTML = textInfo

        //title
        var title = info.data[0].titles[0].title;
        document.getElementById("title").textContent = title;

        //image
        var imageurl = info.data[0].images.jpg.image_url;
        document.getElementById("image").setAttribute("src", imageurl);

        //link to my anime
        var linkhref = info.data[0].url;
        document.getElementById("sitelink").setAttribute("href", linkhref);
        document.getElementById("sitelink").setAttribute("id", "animeLink");



        //alternative title
        var altaTitle = [];
        for (var j = 0; j < info.data[0].titles.length; j++) {
            var title = info.data[0].titles[j].title;
            altaTitle.push(title);
        }

        var altaTitleStr = altaTitle.join(" , ");
        document.getElementById("altaTitle").textContent = altaTitleStr;

        //score
        var score = info.data[0].score;
        document.getElementById("score").textContent = score;

        //rank
        var rank = info.data[0].rank;
        document.getElementById("rank").textContent = rank;


        //popularity
        var popularity = info.data[0].popularity;
        document.getElementById("popularity").textContent = popularity;

        //rating
        var rating = info.data[0].rating
        document.getElementById("rating").textContent = rating

        //genres
        var genresList = [];
        for (var i = 0; i < info.data[0].genres.length; i++) {
            var eachGenre = info.data[0].genres[i].name;
            genresList.push(eachGenre);
        }

        var genresStr = genresList.join(" , ");
        document.getElementById("genres").textContent = genresStr;

        //schedules
        var schedule = info.data[0].broadcast.string;
        document.getElementById("schedule").textContent = schedule;


        //synopsis
        var synopsis = info.data[0].synopsis;
        document.getElementById("synopsis").textContent = synopsis;

        //source
        var source = info.data[0].source;
        document.getElementById("source").textContent = source;


        //producers
        var producerList = [];
        for (var k = 0; k < info.data[0].producers.length; k++) {
            var eachProducer = info.data[0].producers[k].name;
            producerList.push(eachProducer);
        }

        var producerStr = producerList.join(" , ");
        document.getElementById("producer").textContent = producerStr;

        //Releases
        var release = [];
        var rImage = [];

        for (var p = 1; p < 11; p++) {
            var title = info.data[p].titles[0].title;
            var image = info.data[p].images.jpg.image_url;
            release.push(title);
            rImage.push(image);
        }

        var releaseList = document.getElementById('releases');

        for (var q = 0; q < release.length; q++) {
            var flexItem = document.createElement('div');
            flexItem.className = 'flex-item';

            var anchor = document.createElement('a');
            anchor.href = "";
            anchor.style.textDecoration = 'none';

            var img = document.createElement('img');
            img.src = rImage[q];
            img.alt = release[q];
            img.style.height = "250px";
            img.style.width = "150px";


            var titleElement = document.createElement('p');
            titleElement.textContent = release[q];

            anchor.addEventListener('click', (function (q) {
                return function (event) {
                    event.preventDefault();
                    var searchData = release[q];
                    var type = 'anime';
                    window.location.href = `info.html?q=${searchData}&t=${type}`;
                };
            })(q));

            anchor.appendChild(img);
            anchor.appendChild(titleElement);

            flexItem.appendChild(anchor);

            releaseList.appendChild(flexItem);
        }

        //ListForm
        var titleInput = info.data[0].titles[0].title
        document.getElementById('titleInput').setAttribute("value", titleInput)

        var typeList = 'anime'
        document.getElementById('typeList').setAttribute('value', typeList)

        var listImage = info.data[0].images.jpg.image_url
        document.getElementById('imageList').setAttribute('value', listImage)

    }

    else {

        var textInfo = `<p style="margin-top: 0%;">Alternative titles : <span id="altaTitle" style="margin-top: 0%;">null</span></p>
                                    <p>Genres : <span id="genres">null</span></p>
                                    <p>Status : <span id="status">null</span></p>
                                    <p>Published : <span id="published">null</span></p>
                                    <p>Author : <span id="author">null</span></p>`

        document.getElementById('textInfo').innerHTML = textInfo

        //title
        var title = info.data[0].titles[0].title;
        document.getElementById("title").textContent = title;

        //image
        var imageurl = info.data[0].images.jpg.image_url;
        document.getElementById("image").setAttribute("src", imageurl);

        //link to my anime
        var linkhref = info.data[0].url;
        document.getElementById("sitelink").setAttribute("href", linkhref);
        document.getElementById("sitelink").setAttribute("id", "animeLink");


        //alternative title
        var altaTitle = [];
        for (var j = 0; j < info.data[0].titles.length; j++) {
            var title = info.data[0].titles[j].title;
            altaTitle.push(title);
        }

        var altaTitleStr = altaTitle.join(" , ");
        document.getElementById("altaTitle").textContent = altaTitleStr;

        //score
        var score = info.data[0].score;
        document.getElementById("score").textContent = score;

        //rank
        var rank = info.data[0].rank;
        document.getElementById("rank").textContent = rank;


        //popularity
        var popularity = info.data[0].popularity;
        document.getElementById("popularity").textContent = popularity;


        //genres
        var genresList = [];
        for (var i = 0; i < info.data[0].genres.length; i++) {
            var eachGenre = info.data[0].genres[i].name;
            genresList.push(eachGenre);
        }

        var genresStr = genresList.join(" , ");
        document.getElementById("genres").textContent = genresStr;


        //status
        var status = info.data[0].status;
        document.getElementById("status").textContent = status;


        //synopsis
        var synopsis = info.data[0].synopsis;
        document.getElementById("synopsis").textContent = synopsis;

        //source
        var published = info.data[0].published.string;
        document.getElementById("published").textContent = published;


        //author
        var authorList = [];
        for (var k = 0; k < info.data[0].authors.length; k++) {
            var eachAuthor = info.data[0].authors[k].name;
            authorList.push(eachAuthor);
        }

        var authorStr = authorList.join(" , ");
        document.getElementById("author").textContent = authorStr;

        //Releases
        var release = [];
        var rImage = [];

        for (var p = 1; p < 11; p++) {
            var title = info.data[p].titles[0].title;
            var image = info.data[p].images.jpg.image_url;
            release.push(title);
            rImage.push(image);
        }

        var releaseList = document.getElementById('releases');

        for (var q = 0; q < release.length; q++) {
            var flexItem = document.createElement('div');
            flexItem.className = 'flex-item';

            var anchor = document.createElement('a');
            anchor.href = "";
            anchor.style.textDecoration = 'none';

            var img = document.createElement('img');
            img.src = rImage[q];
            img.alt = release[q];
            img.style.height = "250px";
            img.style.width = "150px";

            var titleElement = document.createElement('p');
            titleElement.textContent = release[q];

            anchor.addEventListener('click', (function (q) {
                return function (event) {
                    event.preventDefault();
                    var searchData = release[q];
                    var type = 'manga';
                    window.location.href = `info.html?q=${searchData}&t=${type}`;
                };
            })(q));

            anchor.appendChild(img);
            anchor.appendChild(titleElement);

            flexItem.appendChild(anchor);

            releaseList.appendChild(flexItem);
        }

        //ListForm
        var titleInput = info.data[0].titles[0].title
        document.getElementById('titleInput').setAttribute("value", titleInput)

        var typeList = 'manga'
        document.getElementById('typeList').setAttribute('value', typeList)

        var listImage = info.data[0].images.jpg.image_url
        document.getElementById('imageList').setAttribute('value', listImage)


    }
})

//adding a list
function addtoListBtn() {
    var title = document.getElementById("titleInput").value;
    var typeList = document.getElementById('typeList').value;
    var chapInput = parseInt(document.getElementById('chapInput').value);
    var readStat = document.getElementById('readStat').value;
    var myRate = parseFloat(document.getElementById('myRate').value);
    var comment = document.getElementById('comment').value;
    var imgURL = document.getElementById('imageList').value;

    if (!title || !typeList || !chapInput || !readStat || !myRate || !comment) {
        window.alert("Please fill in all the fields!");
        return;
    }

    var jsonData = localStorage.getItem('myData');
    if (jsonData) {
        jsonData = JSON.parse(jsonData); // Parse the existing data as a JSON array
    } else {
        jsonData = []; // If there is no existing data, create a new array
    }

    // Find the next available listID
    var nextListID = 0;
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].listID >= nextListID) {
            nextListID = jsonData[i].listID + 1;
        }
    }

    var addedData = {
        listID: nextListID,
        img: imgURL,
        title: title,
        type: typeList,
        chap: chapInput,
        read: readStat,
        myRate: myRate,
        comment: comment
    };

    jsonData.push(addedData); // Append the new data to the existing array
    localStorage.setItem('myData', JSON.stringify(jsonData)); // Write the updated data back to local storage

    window.alert(`Successfully added ${title} (${typeList}) into your list!`);
}

// Function to retrieve and display data from local storage
function displayData() {
    var jsonData = localStorage.getItem('myData');

    if (jsonData) {
        jsonData = JSON.parse(jsonData);
        var tableBody = document.getElementById('listBody');
        tableBody.innerHTML = ''; // Clear the table body

        // Loop through the data and create table rows
        jsonData.forEach(function (data) {

            if (data.type == 'anime') {
                var row = document.createElement('tr');
                row.innerHTML = `
                <td><img src="${data.img}" height="200px" width="150px"></td>
                <td>
                    <p class="listLabel" style="display: inline;">Title : </p><a href="info.html?q=${data.title}&t=anime"><span class="listContent">${data.title}</span></a><br>
                    <p class="listLabel" style="display: inline;">Type : </p><span class="listContent">Anime</span><br>
                    <p class="listLabel" style="display: inline;">Episode : </p><span class="listContent">${data.chap}</span><br>
                    <p class="listLabel" style="display: inline;">Status (watched?) : </p><span class="listContent">${data.read}</span><br>
                    <p class="listLabel" style="display: inline;">My Rating : </p><span class="listContent">${data.myRate}</span><span style="font-size: large;"> /10</span><br>
                    <p class="listLabel" style="display: inline;">Comment : </p><span class="listContent">${data.comment}</span>
                    
                </td>
                <td><a href="#listForm" onclick="updateData(${data.listID})">Update</a></td>
                <td><a href="#" onclick="deleteData(${data.listID})">Delete</a></td>
                
                `;

                tableBody.appendChild(row);
            }
            else {
                var row = document.createElement('tr');
                row.innerHTML = `
                <td><img src="${data.img}" height="200px" width="150px"></td>
                <td>
                    <p class="listLabel" style="display: inline;">Title : </p><a href="info.html?q=${data.title}&t=manga"><span class="listContent">${data.title}</span></a><br>
                    <p class="listLabel" style="display: inline;">Type : </p><span class="listContent">Manga</span><br>
                    <p class="listLabel" style="display: inline;">Episode : </p><span class="listContent">${data.chap}</span><br>
                    <p class="listLabel" style="display: inline;">Status (watched?) : </p><span class="listContent">${data.read}</span><br>
                    <p class="listLabel" style="display: inline;">My Rating : </p><span class="listContent">${data.myRate}</span><span style="font-size: large;"> /10</span><br>
                    <p class="listLabel" style="display: inline;">Comment : </p><span class="listContent">${data.comment}</span>
                    
                </td>
                <td><a href="#listForm" onclick="updateData(${data.listID})">Update</a></td>
                <td><a href="#" onclick="deleteData(${data.listID})">Delete</a></td>
                `;

                tableBody.appendChild(row);

            }

        });
    }
    else {
        var tableBody = document.getElementById('listBody');
        var row = document.createElement('tr');
        var row = document.createElement('tr');
        row.innerHTML = `<td colspan="4"><center>Empty</center></td>`;
        tableBody.appendChild(row);
    }
}

// Function to update data
function updateData(listID) {
    var jsonData = localStorage.getItem('myData');
    if (jsonData) {
        jsonData = JSON.parse(jsonData);
        const dataToUpdate = jsonData.find(item => item.listID === listID);

        // Display the data in the form
        document.getElementById('titleUpdate').value = dataToUpdate.title;
        document.getElementById('chapUpdate').value = dataToUpdate.chap;
        document.getElementById('readUpdate').value = dataToUpdate.read;
        document.getElementById('myRateUpdate').value = dataToUpdate.myRate;
        document.getElementById('commentUpdate').value = dataToUpdate.comment;
        document.getElementById('listID').value = listID; // Store the listID in a hidden input field

        // Show the update form
        document.getElementById('listForm').style.display = 'block';
    }
}

// Function to save updates
function saveUpdate() {
    const listID = document.getElementById('listID').value;
    const title = document.getElementById('titleUpdate').value;
    const chap = parseInt(document.getElementById('chapUpdate').value);
    const read = document.getElementById('readUpdate').value;
    const myRate = parseFloat(document.getElementById('myRateUpdate').value);
    const comment = document.getElementById('commentUpdate').value;

    // Retrieve the data from local storage
    var jsonData = localStorage.getItem('myData');
    if (jsonData) {
        jsonData = JSON.parse(jsonData);
        const indexToUpdate = jsonData.findIndex(item => item.listID === parseInt(listID));
        if (indexToUpdate !== -1) {
            jsonData[indexToUpdate].title = title;
            jsonData[indexToUpdate].chap = chap;
            jsonData[indexToUpdate].read = read;
            jsonData[indexToUpdate].myRate = myRate;
            jsonData[indexToUpdate].comment = comment;
            localStorage.setItem('myData', JSON.stringify(jsonData));
            window.alert(`Successfully updated !`);

            // Hide the update form
            document.getElementById('listForm').style.display = 'none';

            // Redisplay the data
            displayData();
        } else {
            window.alert(`Error: List item with ID ${listID} not found!`);
        }
    }
}

// Function to delete data from local storage
function deleteData(listID) {
    var jsonData = localStorage.getItem('myData');
    if (jsonData) {
        jsonData = JSON.parse(jsonData);
        const indexToDelete = jsonData.findIndex(item => item.listID === listID);
        if (indexToDelete !== -1) {
            jsonData.splice(indexToDelete, 1);
            localStorage.setItem('myData', JSON.stringify(jsonData));
            window.alert(`Successfully deleted!`);

            // Update the page by re-displaying the data
            displayData();
        } else {
            window.alert(`Error: List item with ID ${listID} not found!`);
        }
    }
}
