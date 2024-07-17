
 async function fetchPosts() {
        try {
            const response = await fetch('/posts');
            const posts = await response.json();

            if (!Array.isArray(posts)) {
                throw new Error('Resposta do servidor não é um array');
            }

            const postList = document.getElementById('postList');
            postList.innerHTML = ''; 

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('topic');
                postElement.innerHTML = `
                    <h3>${post.titulo}</h3>
                    <p>${post.conteudo}</p>
                    <small>${new Date(post.dataHora).toLocaleString()}</small>
                    <button class="viewDetailButton btn" data-post-id="${post.id}">Ver Detalhes</button>
                    <button class="likeButton btn like-icon" data-post-id="${post.id}"><i class="far fa-heart"></i> Like</button>
                `;
                postList.appendChild(postElement);
            });

            // Evento de clique para abrir o modal de detalhes do post
            postList.addEventListener('click', async (event) => {
                if (event.target.classList.contains('viewDetailButton')) {
                    const postId = event.target.getAttribute('data-post-id');
                    await fetchAndDisplayPostDetails(postId);
                }
            });

        } catch (error) {
            console.error('Erro ao carregar postagens:', error);
        }
    }


    document.addEventListener('DOMContentLoaded', fetchPosts);

    document.getElementById('abrirmodal').onclick = function () {
        document.getElementById('myModal').style.display = "block";
    }

    document.getElementsByClassName('close')[0].onclick = function () {
        document.getElementById('myModal').style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == document.getElementById('myModal')) {
            document.getElementById('myModal').style.display = "none";
        }
    }

    document.getElementById('postForm').onsubmit = async function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, dataHora: new Date() })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Postagem criada com sucesso!');
            document.getElementById('myModal').style.display = "none";
            location.reload();
        } else {
            alert('Erro ao criar postagem: ' + result.error);
        }
    }
    

    