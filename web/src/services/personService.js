export const personService = {
    create
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
