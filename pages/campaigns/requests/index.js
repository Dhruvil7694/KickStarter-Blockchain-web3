import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table, Segment, Label } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    //getting addres using getInitialProps().
    const { address } = props.query;
    const campaign = Campaign(address); //Fetching our campaign.
    const requestCount = await campaign.methods.getRequestsCount().call(); //calling out getRequestCount() function.
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}`}>
          <a>Back</a>
        </Link>
        <h1>requests</h1>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginbottom: 10 }}>
              Add requests
            </Button>
          </a>
        </Link>
        <Segment padded>
          <Label attached="bottom">Found {this.props.requestCount} requests!</Label>
          <Table>
            <Header>
              <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>recipient</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
              </Row>
            </Header>
            <Body>{this.renderRows()}</Body>
          </Table>
        </Segment>
      </Layout>
    );
  }
}

export default RequestIndex;
