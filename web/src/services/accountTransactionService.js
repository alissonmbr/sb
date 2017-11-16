export const accountTransactionService = {
    findAll
};

function findAll() {
    return fetch('/api/account-transaction/all', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 400) {
            return response.json();
        } else if (!response.ok) {
            throw Error('Ocorreu um erro interno! Favor tentar novamente!');
        }
        return response.json()
    }).then(data => {
        if (!!data.status && data.status === "error") {
            throw Error(data.message);
        }
        return data;
    });
}
