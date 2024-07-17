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
}.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #a7286e;
    width: 80%;
}

.close {
    color: #a7286e;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

main {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.topicos {
    width: 700px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

#topics {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0.45, 0.45, 0.45, 0.45);
    margin-bottom: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

#topics h2 {
    margin-bottom: 20px;
    color: #a7286e;
}

.topic {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}

.topic:last-child {
    border-bottom: none;
}

.topic h3 {
    margin-bottom: 5px;
    color: #a7286e;
}

.topic p {
    margin-bottom: 10px;
}

/* Botões */
.btn {
    display: inline-block;
    padding: 10px 20px;
    color: white;
    background-color: #a7286e;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #a7286e;
}

.like-icon {
    color: black;
    cursor: pointer;
}

.liked {
    color: red !important;
}
