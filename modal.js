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
