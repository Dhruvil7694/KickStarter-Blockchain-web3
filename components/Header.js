import React from 'react';
import { Menu , Button } from 'semantic-ui-react';
import { Link } from "../routes";

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">krowdkoin</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">
            <Button primary icon="add"></Button>
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
