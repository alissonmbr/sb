import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {FormControl} from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {accountService} from '../services/accountService';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';

import '../styles/Person.scss';

class Charge extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            accountId: undefined,
            snackBarOpen: false,
            snackMessage: '',
            accounts: []
        }
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    charge = () => {
        if (!this.state.value || !this.state.accountId) {
            this.setState({
                snackBarOpen: true,
                snackMessage: "Todos os campos são obrigatórios!"
            });
            setTimeout(() => this.setState({snackBarOpen: false}), 10000);
        }

        let charge = {
            value: this.state.value
        };

        accountService.charge(this.state.accountId, charge)
            .then((data) => {
                this.setState({
                    value: '',
                    accountId: undefined,
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
        this.findAccounts();
    }

    render() {
        let accounts = this.state.accounts.map((account, index) => <option key={'account' + account.id} value={account.id}>{account.name}</option>);
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item md={10} sm={12} xs={12}>
                        <Grid container spacing={24}>
                            <Grid item md={4} sm={12} xs={12}>
                                <TextField autoFocus margin="dense" label="Valor" type="number" fullWidth name="value" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                            </Grid>
                            <Grid item md={4} sm={12} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="age-simple">Conta</InputLabel>
                                    <Select native name="accountId" value={this.state.accountId} onChange={this.handleChange.bind(this)}>
                                        <option value="" />
                                        {accounts}
                                  </Select>
                              </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <br/>
                <Button raised onClick={this.charge}>Cadastrar</Button>
                <Snackbar
                  open={this.state.snackBarOpen}
                  transition={Slide}
                  SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">{this.state.snackMessage}</span>}
                />
            </div>
        );
    }
}

Charge.propTypes = {

};

export default Charge;
