document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(response => {
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers.get('content-type'));
                return response.text(); // Ler a resposta como texto
            })
            .then(text => {
                console.log('Response text:', text);
                try {
                    const data = JSON.parse(text); // Tentar analisar o texto como JSON
                    if (data.success) {
                        window.location.href = 'dashboard.html';
                    } else {
                        alert('Credenciais inválidas');
                    }
                } catch (e) {
                    console.error('Erro ao analisar JSON:', e);
                    alert('Erro ao processar a resposta do servidor.');
                }
            })
            .catch(error => {
                console.error('Erro na solicitação:', error);
                alert('Erro ao fazer a solicitação.');
            });
        });
    }

    // Função para carregar o inventário
    function loadInventory() {
        fetch('http://localhost:3000/api/inventory')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na solicitação: ' + response.statusText);
                }
            })
            .then(items => {
                console.log('Dados recebidos do inventário:', items);
                const tableBody = document.getElementById('inventoryTable');
                tableBody.innerHTML = '';
                items.forEach(item => {
                    const row = `<tr>
                                    <td>${item.tipo}</td>
                                    <td>${item.nome}</td>
                                    <td>${item.quantidade}</td>
                                    <td>${item.fabricante}</td>
                                    <td>${item.validade || 'N/A'}</td>
                                    <td>
                                        <button class="btn btn-warning btn-sm">Editar</button>
                                        <button class="btn btn-danger btn-sm">Remover</button>
                                    </td>
                                 </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch(error => {
                console.error('Erro ao carregar o inventário:', error);
                alert('Erro ao carregar o inventário.');
            });
    }

    // Verifique se a página atual é a de dashboard e, se for, carregue o inventário
    if (window.location.pathname.endsWith('dashboard.html')) {
        loadInventory();
    }
});
