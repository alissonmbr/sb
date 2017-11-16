import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {FormControl} from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {accountService} from '../services/accountService';
import {accountTransactionService} from '../services/accountTransactionService';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';

import '../styles/Person.scss';

class TransactionHistory extends Component {

    constructor() {
        super();
        this.state = {
            transactionId: undefined,
            snackBarOpen: false,
            snackMessage: '',
            accounts: [],
            transactionHistory: []
        }
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    reverseTransfer = () => {
        if (!this.state.transactionId) {
            this.setState({
                snackBarOpen: true,
                snackMessage: "Escolha uma transação!"
            });
            setTimeout(() => this.setState({snackBarOpen: false}), 10000);
            return;
        }

        accountService.reverseTransfer(this.state.transactionId)
            .then((data) => {
                this.setState({
                    transactionId: undefined,
                    snackBarOpen: true,
                    snackMessage: 'Estorno realizado com sucesso!'
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

    findHistory() {
        accountTransactionService.findAll()
            .then((data) => {
                this.setState({transactionHistory: data});
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
        this.findHistory();
    }

    render() {
        let formatTransactionName = (transaction) => {
            if (transaction.accountTransactionType === "CHARGE"){
                return `Carga de "\$${transaction.amount}" para "${transaction.toAccount.name}"`
            } else if (transaction.accountTransactionType === "TRANSFER") {
                return `Transferência de "\$${transaction.amount}" de "${transaction.fromAccount.name}" para "${transaction.toAccount.name}"`
            } else if (transaction.accountTransactionType === "CHARGE_REVERSE") {
                return `Estorno da carga de "\$${transaction.amount}" para "${transaction.toAccount.name}"`
            } else if (transaction.accountTransactionType === "TRANSFER_REVERSE") {
                return `Estorno da transferência de "\$${transaction.amount}" de "${transaction.fromAccount.name}" para "${transaction.toAccount.name}"`
            }
        };

        let transactionHistory = this.state.transactionHistory.map((transaction, index) => <option key={'transaction' + transaction.id} value={transaction.id}>{formatTransactionName(transaction)}</option>);
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item md={12} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="age-simple">Histórico</InputLabel>
                            <Select native name="transactionId" value={this.state.transactionId} onChange={this.handleChange.bind(this)}>
                                <option value="1" />
                                {transactionHistory}
                          </Select>
                      </FormControl>
                    </Grid>
                </Grid>
                <br/>
                <Button raised onClick={this.reverseTransfer}>Estornar</Button>
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

TransactionHistory.propTypes = {

};

export default TransactionHistory;
