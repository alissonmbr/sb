import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {personService} from '../services/personService';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

import '../styles/Person.scss';

class Account extends Component {

    constructor() {
        super();
        this.state = {
            personType: '',
            name: '',
            cpf: '',
            birthDate: '',
            companyName: '',
            fantasyName: '',
            cnpj: '',
            snackBarOpen: false,
            snackMessage: 'sdf'
        }
    }

    handleChange(e) {
        var change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    createPerson = () => {
        let person = {
            personType: this.state.personType
        };

        if (this.state.personType === 'I' ) {
            person.name = this.state.name;
            person.cpf = this.state.cpf
            person.birthDate = this.state.birthDate;
        } else {
            person.companyName = this.state.companyName;
            person.cnpj = this.state.cnpj;
            person.fantasyName = this.state.fantasyName;
        }

        personService.create(person)
            .then((data) => {
                this.setState({
                    name: '',
                    cpf: '',
                    birthDate: '',
                    companyName: '',
                    fantasyName: '',
                    cnpj: '',
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

    render() {

        return (
            <Grid container spacing={24}>
                <Grid item md={2} sm={12}>
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="type" name="personType" value={this.state.personType} onChange={this.handleChange.bind(this)}>
                            <FormControlLabel value="I" control={<Radio />} label="Pessoa Física" />
                            <FormControlLabel value="C" control={<Radio />} label="Pessoa Jurídica" />
                        </RadioGroup>
                    </FormControl>
                </Grid>


                <Grid item md={10} sm={12} xs={12}>
                    <Grid container spacing={24} style={this.state.personType === 'I' ? {} : { display: 'none' }}>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField autoFocus margin="dense" label="Nome" type="text" fullWidth name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField autoFocus margin="dense" label="CPF" type="text" fullWidth name="cpf" value={this.state.cpf} onChange={this.handleChange.bind(this)}/>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField id="date" label="Birthday" type="date" InputLabelProps={{shrink: true,}} fullWidth name="birthDate" value={this.state.birthDate} onChange={this.handleChange.bind(this)}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={24} style={this.state.personType === 'C' ? {} : { display: 'none' }}>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField autoFocus margin="dense" label="Razão Social" type="text" fullWidth name="companyName" value={this.state.companyName} onChange={this.handleChange.bind(this)}/>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField autoFocus margin="dense" label="Nome Fantasia" type="text" fullWidth name="fantasyName" value={this.state.fantasyName} onChange={this.handleChange.bind(this)}/>
                        </Grid>
                        <Grid item md={4} sm={12} xs={12}>
                            <TextField autoFocus margin="dense" label="CNPJ" type="text" fullWidth name="cnpj" value={this.state.cnpj} onChange={this.handleChange.bind(this)}/>
                        </Grid>
                    </Grid>
                </Grid>

                <br/>
                <Button raised style={this.state.personType !== '' ? {} : { display: 'none' }} onClick={this.createPerson}>Cadastrar</Button>
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
