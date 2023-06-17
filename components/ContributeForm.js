import { React, Component } from "react";
import { Button, Form, Input ,Message} from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "", // this value property is going to enter by user in Ether.
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true , errorMessage:'' });
    try {
      const accounts = await web3.eth.getAccounts(); //we can get list of accounts from web3 module.
      //Now we can call contribute function 
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether") // onvertion to Wei using web3.
      });
      //{this.props.address} is the address of the current campaign that we are looking at.
      Router.replaceRoute(`/campaigns/${this.props.address}`)//this will reroute us to the same page so that the source data ia updated as user contribute.

    } catch (err) {
      this.setState({errorMessage : err.message});
    };
    this.setState({ loading: false , value:''});

  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          ></Input>
        </Form.Field>
        <Message error header="OOPS!!" content={this.state.errorMessage}></Message>
        <Button primary loading={this.state.loading}>Contribute!</Button>
      </Form>
    );
  }
}

export default ContributeForm;
