import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import { Grid, Card, Button, GridRow, GridColumn } from "semantic-ui-react";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address); //here address is a wild card that we have mentioned in route.
    const summary = await campaign.methods.getSummary().call(); // this will call the summary function.

    return {
      address: props.query.address, //getInitialProps is not a part of actual component instance. we have to specifically mentioned because all other components dont know about the address.
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "minimum Contribution (wei) ",
        description:
          "You must contribute atleast this much of minimum amount to become approver of the Campaign.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Request must be approves by approvers of the Campaign. ",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who already have donated the minimum contribution and become Approvers of the campaign.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (Ether)",
        description:
          "The balance is the amount of money in the Campaign to be used for the particular offerings.",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <Link route={`/`}>
          <a>
            Back
          </a>
        </Link>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <GridColumn>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </GridColumn>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
