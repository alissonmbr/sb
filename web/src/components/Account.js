import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {personService} from '../services/personService';
import {accountService} from '../services/accountService';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';

import '../styles/Person.scss';

class Account extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            personId: undefined,
            parentId: undefined,
            parent: '',
            snackBarOpen: false,
            snackMessage: '',
            persons: [],
            accounts: []
        }
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    createAccount = () => {
        if (!this.state.parent || !this.state.personId || (this.state.parent === 'true' && !this.state.parentId)) {
            this.setState({
                snackBarOpen: true,
                snackMessage: "Todos os campos são obrigatórios!"
            });
            setTimeout(() => this.setState({snackBarOpen: false}), 10000);
        }

        let account = {
            parent: this.state.parent,
            personId: this.state.personId,
            parentId: this.state.parentId,
            name: this.state.name
        };


        accountService.create(account)
            .then((data) => {
                this.setState({
                    name: '',
                    personId: undefined,
                    parentId: undefined,
                    parent: '',
                    snackBarOpen: true,
                    snackMessage: 'Cadastro realizado com sucesso!'
                });
                console.log(data);
            })
            .catch((error) => {
                this.setState({
                    snackBarOpen: true,
                    snackMessage: error.message
                });
                console.log(error);
            }).then(() => {setTimeout(() => this.setState({snackBarOpen: false}), 10000)});
    }

    findPerson() {
        personService.findAll()
            .then((data) => {
                let persons = data.map((person) => {return {
                    id: person.id,
                    type: person.type,
                    name: person.name || person.fantasyName
                }});

                this.setState({persons});
            })
            .catch((error) => {
                this.setState({
                    snackBarOpen: true,
                    snackMessage: error.message
                });
                console.log(error);
            }).then(() => {setTimeout(() => this.setState({snackBarOpen: false}), 10000)});
    }

    findAccounts() {
        accountService.findAll()
            .then((data) => {
                this.setState({accounts: data});
            })
            .catch((error) => {
                this.setState({
                    snackBarOpen: true,
                    snackMessage: error.message
                });
                console.log(error);
            }).then(() => {setTimeout(() => this.setState({snackBarOpen: false}), 10000)});
    }

    componentDidMount() {
        this.findPerson();
        this.findAccounts();
    }

    render() {
        let persons = this.state.persons.map((person, index) => <option key={'person' + person.id} value={person.id}>{person.name}</option>);
        let accounts = this.state.accounts.map((account, index) => <option key={'account' + account.id} value={account.id}>{account.name}</option>);
        return (
            <Grid container spacing={24}>
                <Grid item md={2} sm={12}>
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="type" name="parent" value={this.state.parent} onChange={this.handleChange.bind(this)}>
                            <FormControlLabel value="true" control={<Radio />} label="Conta Matriz" />
                            <FormControlLabel value="false" control={<Radio />} label="Conta Filial" />
                        </RadioGroup>
                    </FormControl>
                </Grid>


                <Grid item md={10} sm={12} xs={12}>
                    <Grid container spacing={24}>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField autoFocus margin="dense" label="Nome" type="text" fullWidth name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="age-simple">Pessoa</InputLabel>
                                <Select native name="personId" value={this.state.personId} onChange={this.handleChange.bind(this)}>
                                    <option value="" />
                                    {persons}
                              </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12} style={this.state.parent === 'false' ? {} : { display: 'none' }}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="age-simple">Conta Pai</InputLabel>
                                <Select native name="parentId" value={this.state.parentId} onChange={this.handleChange.bind(this)}>
                                    <option value="" />
                                    {accounts}
                              </Select>
                          </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <br/>
                <Button raised onClick={this.createAccount}>Cadastrar</Button>
                <Snackbar
                  open={this.state.snackBarOpen}
                  transition={Slide}
                  SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">{this.state.snackMessage}</span>}
                />
            </Grid>
        );
    }
}

Account.propTypes = {

};

export default Account;
