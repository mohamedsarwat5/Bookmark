var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var link = document.getElementById('link')
var alertName = document.getElementById('alertName')
var alertUrl = document.getElementById('alertUrl')
var bookMarkList = [];


if (localStorage.bookmark != null) {

    bookMarkList = JSON.parse(localStorage.bookmark)

} else {
    bookMarkLis = []
}

function addBookmark() {

    if (validName() == true && validUrl() == true) {
        var bookmark = {
            name: siteName.value,
            url: siteUrl.value,
        };

        bookMarkList.push(bookmark);
        localStorage.setItem('bookmark', JSON.stringify(bookMarkList))
        clearInput()
        display();

    }


}

function clearInput() {

    siteName.value = ''
    siteUrl.value = ''
}



function display() {
    var template = "";

    for (var i = 0; i < bookMarkList.length; i++) {
        template += `
        
    <tr>
      <td>${i}</td>
      <td> ${bookMarkList[i].name} </td>
      <td> <a href="${bookMarkList[i].url} " target="_blank" class="btn btn-visited" id='link'><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
      <td> <button type="button" class="btn btn-danger" onclick="deleteBookmark(${i} )"><i class=" me-2 fa-solid fa-trash-can"></i>Delete</button></td>
    </tr>
        `;

    }

    document.getElementById('tbody').innerHTML = template
}


display()

function deleteBookmark(i) {

    bookMarkList.splice(i, 1)
    localStorage.bookmark = JSON.stringify(bookMarkList)
    display()
}





function validName() {

    var nameRegex = /^[A-Za-z]{2,}[0-9]{0,5}$/
    if (nameRegex.test(siteName.value) == true) {
        alertName.classList.add('d-none')
        // siteName.classList.add('is-valid')
        // siteName.classList.remove('is-invalid')
        return true

    } else {
        alertName.classList.remove('d-none')
        // siteName.classList.add('is-invalid')
        // siteName.classList.remove('is-valid')
        return false

    }
}

siteName.addEventListener('change', validName)


function validUrl() {

    var urlRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    if (urlRegex.test(siteUrl.value) == true) {
        alertUrl.classList.add('d-none')
        return true

    } else {

        alertUrl.classList.remove('d-none')
        return false

    }

}

siteUrl.addEventListener('change', validUrl)




