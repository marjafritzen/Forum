document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("myModal");
    var detailModal = document.getElementById("postDetailModal");
    var btn = document.getElementById("abrirmodal");
    var span = document.getElementsByClassName("close")[0];
    var detailSpan = document.getElementsByClassName("close-detail")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    detailSpan.onclick = function () {
        detailModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == detailModal) {
            detailModal.style.display = "none";
        }
    }

    document.getElementById("postForm").onsubmit = function (event) {
        event.preventDefault();

        var title = document.getElementById("title").value;
        var content = document.getElementById("content").value;


        addPostToList(title, content);

        modal.style.display = "none";
        document.getElementById("postForm").reset();
    }
});

function likePost(postId) {
    const likeIcon = document.getElementById(`likeIcon${postId}`);
    const likeCount = document.getElementById(`likeCount${postId}`);

    let currentLikes = parseInt(likeCount.textContent) || 0;

    if (likeIcon.classList.contains('liked')) {
        likeIcon.classList.remove('liked');
        currentLikes--;
    } else {
        likeIcon.classList.add('liked');
        currentLikes++;
    }

    likeCount.textContent = currentLikes;
}

function addPostToList(title, content) {
    const postList = document.getElementById('postList');
    const postId = new Date().getTime();
    const postElement = document.createElement('article');
    postElement.classList.add('topic');

    postElement.innerHTML = `
        <h3>${title}</h3>
        <a href="#" class="btn" onclick="openPostModal(${postId}, '${title}', '${content}')">Ler mais</a>
        <i id="likeIcon${postId}" class="far fa-heart like-icon" onclick="likePost(${postId})"></i>
        <span id="likeCount${postId}">0</span>
    `;

    postList.appendChild(postElement);
}

function openPostModal(postId, title, content) {
    var detailModal = document.getElementById("postDetailModal");
    detailModal.style.display = "block";

    // Configurar o conteúdo da modal de detalhes do post
    document.getElementById("detailTitle").textContent = title;
    document.getElementById("postAuthor").textContent = "Autor: Desconhecido"; // Ajuste conforme necessário
    document.getElementById("postTime").textContent = "Horário: " + new Date().toLocaleString();
    document.getElementById("postDescription").textContent = content;
    document.getElementById("detailLikeCount").textContent = document.getElementById(`likeCount${postId}`).textContent;
}
