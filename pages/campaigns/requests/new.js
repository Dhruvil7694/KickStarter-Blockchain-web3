import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class newRequest extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };
  static async getInitialProps(props) {
    //getInitialPropd() function for fetching the address ot the current user.
    const { address } = props.query;

    return { address }; //returning the current address object as per the ES6 format;
  }

  onSubmit = async (event) => {
    // this is an onSubmit() function for actions after click
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" }); //setting the loading button and error message.

    const campaign = Campaign(this.props.address); //fetching out campaign.
    const { description, value, recipient } = this.state; //fetching our value for create request AS PER THE ORDER IN CONTRACT.

    try {
      const accounts = await web3.eth.getAccounts(); //here we have fetch all the accounts.
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] }); // fetching the campaign for creating request.

      Router.pushRoute(`/campaigns/${this.props.address}/requests`); // after request created this statement will route us to request list page.
    } catch (err) {
      this.setState({ errorMessage: err.message }); //showing the error message accordingly.
    }

    this.setState({ loading: false }); //setting the loading button as false after creating of request so that user can know.
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
            Back
          </a>
        </Link>
        <h2>Create a Request</h2>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            ></Input>
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            ></Input>
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            ></Input>
          </Form.Field>
          <Message
            error
            header="OOPS!"
            content={this.state.errorMessage}
          ></Message>
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default newRequest;
