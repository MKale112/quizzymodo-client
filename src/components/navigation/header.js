import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  componentDidMount = () => {
    this.getInfo();
  };

  getInfo = () => {
    let token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get("/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        })
        .then((response) => {
          let { data } = response.data;
          const rez = data.email.split("@");
          const iconName = rez[0].substring().toUpperCase();
          this.setState({ name: iconName });
        })
        .catch((err) => console.log(err));
    }
  };

  SignOff = () => {
    localStorage.removeItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get("/v1/auth/logout", headers)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err.response.data.error));
  };

  render() {
    let token = localStorage.getItem("token");

    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="bg-black"
        fixed="top"
      >
        <Navbar.Brand href="/">QUIZZYMODO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="white-80">
          <Nav className="mr-auto">
            <Nav.Link className="text-light" href="/listquizes">
              Quizzes
            </Nav.Link>
            {/* {token ? (
              <></>
            ) : (
              <Nav.Link className="text-light" href="/login">
                Login
              </Nav.Link>
            )} */}
            {token ? (
              <Nav.Link className="text-light" href="/izmjena">
                Create quiz
              </Nav.Link>
            ) : (
              <></>
            )}
          </Nav>
          <Nav>
            {token ? (
              <DropdownButton
                alignRight
                id="dropdown-basic-button"
                title={this.state.name}
                variant="danger"
                size="sm"
              >
                <Dropdown.Item href="/profile">Profile settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.SignOff} href="/">
                  Log off
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Nav.Link className="text-light" href="/login">
                Login/Sign up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
