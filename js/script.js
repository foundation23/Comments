const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
}

let comments = [];
loadComments();

function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
}

document.getElementById('submit').onclick = function () {
    let commentName = document.getElementById('login');
    let commentText = document.getElementById('text');
    let commentDate = document.getElementById('date');

    let comment = {
        name: commentName.value,
        text: commentText.value,
    }

    if (commentDate.value) {
        comment.time = commentDate.value
    } else {
        comment.time = timeConverter()
    }

    commentName.value = '';
    commentText.value = '';
    commentDate.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments() {
    let commentField = document.getElementById('comments');
    let out = '';

    comments.forEach(function (item) {
        out += `
        <div id="comment">
            <div class="info">
                <p class="comment__date"><em>${item.time}</em></p>
                <a href="#"><img src="http://s1.iconbird.com/ico/2013/9/452/w448h5121380477116trash.png" width="30px" data-time=${item.time} class="delete"></a>
            </div>
            <p class="comment__name">${item.name}</p>
            <p class="comment__text">${item.text}</p>
        </div>`;
    });
    commentField.innerHTML = out;
}

function timeConverter() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();
    return mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + min;
}

document.getElementById('comments').addEventListener('click', function (e) {
    if (e.target.matches('.delete')) {
        e.preventDefault();
        deleteComments(e.target);
    }
})

function deleteComments(deleteButton) {
    comments.splice(comments.findIndex(i => i.time == deleteButton.getAttribute('data-time')), 1);
    deleteButton.closest('#comment').remove();
    saveComments();
}