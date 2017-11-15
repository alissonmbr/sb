import React, {Component} from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import AccountBalanceIcon from 'material-ui-icons/AccountBalance';
import HelpIcon from 'material-ui-icons/Help';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Person from '../components/Person';
import Account from '../components/Account';

import '../styles/App.scss';

function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class App extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="off">
            <Tab icon={<PersonAddIcon />} label="Adicionar Pessoa" />
            <Tab icon={<AccountBalanceIcon />} label="Adicionar Conta" />
            <Tab icon={<AccountBalanceIcon />} label="Realizar Carga" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Person /></TabContainer>}
        {value === 1 && <TabContainer><Account /></TabContainer>}
        {value === 1 && <TabContainer><Account /></TabContainer>}

      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
