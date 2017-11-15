export const accountService = {
    create,
    findAll,
    charge
};

function create(person) {
    return fetch('/api/account/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    }).then((response) => {
        if (response.status === 400) {
            throw Error(response.message);
        } else if (!response.ok) {
            throw Error('Ocorreu um erro interno! Favor tentar novamente!');
        }
        return response.json()
    });
}

function charge(accountId, charge) {
    return fetch(`/api/account/charge/${accountId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(charge)
    }).then((response) => {
        if (response.status === 400) {
            throw Error(response.message);
        } else if (!response.ok) {
            throw Error('Ocorreu um erro interno! Favor tentar novamente!');
        }
        return response.json()
    });
}

function findAll() {
    return fetch('/api/account/all', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            throw Error('Ocorreu um erro interno! Favor tentar novamente!');
        }
        return response.json()
    });
}
