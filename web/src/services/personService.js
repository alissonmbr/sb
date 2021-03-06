export const personService = {
    create,
    findAll
};

function create(person) {
    return fetch('/api/person/create', {
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

function findAll() {
    return fetch('/api/person/all', {
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
