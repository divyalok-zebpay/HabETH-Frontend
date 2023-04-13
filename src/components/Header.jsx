import React from "react";
import { Button, Typography } from "web3uikit";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg"
import "../styles/Header.css"

export default function Header({ onConnect, account }) {
  return (
    <div id="home_header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography variant="H2">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/logo.png" style={{ height: "50px", width: "50px" }} />
            HabETH - Ready to finally stick to your Goals?
          </div>
        </Typography>
      </Link>
      <div id="home_header_right">
        <Button onClick={onConnect} disabled={!!account} text={!account ? "Connect Wallet" : `Connected ${account}`} />
        <Link to="/profile" id="header_profile_link">
          <CgProfile id="header_profile_img" />
        </Link>
      </div>
    </div>
  );
}
