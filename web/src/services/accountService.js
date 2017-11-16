export const accountService = {
    create,
    findAll,
    charge,
    transfer,
    reverseTransfer
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

function transfer(transaction) {
    return fetch('/api/account/transfer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
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

function findAll() {
    return fetch('/api/account/all', {
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

function reverseTransfer(transactionId) {
    return fetch(`/api/account/reverse-transfer/${transactionId}`, {
        method: 'POST',
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
