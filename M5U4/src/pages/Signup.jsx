import React, { Component } from "react";
import { signup } from "../endpoints";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      signupError: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  }
  signup = (event) => {
    event.preventDefault();
    let stateForm = { ...this.state };

    delete stateForm["signupError"];

    fetch(signup, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stateForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status.status === "unsuccessful") {
          this.setState({ signupError: data.status.message });
          return;
        }
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  setFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  };

  setLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  setUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  setConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  render() {
    return (
      <div className="form-container">
        <h1 className="form-title">Formulario de registro</h1>
        <p className="error">{this.state.signupError}</p>

        <form
          action=""
          method="post"
          name="signup"
          encType="application/x-www-form-urlencoded"
          onSubmit={this.signup}
        >
          <label htmlFor="firstName">
            <b>Nombre</b>
          </label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            required
            onChange={this.setFirstName}
            value={this.state.firstName}
          />
          <br />

          <label htmlFor="lastName">
            <b>Apellidos</b>
          </label>
          <input
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            required
            onChange={this.setLastName}
            value={this.state.lastName}
          />
          <br />

          <label htmlFor="email">
            <b>Correo electrónico</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            onChange={this.setEmail}
            value={this.state.email}
          />
          <br />

          <label htmlFor="username">
            <b>Usuario</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
            onChange={this.setUsername}
            value={this.state.username}
          />
          <br />

          <label htmlFor="password">
            <b>
              *al menos debe contener 1 mayúscula, 1 número, 1 símbolo especial y un total de 8 letras.
            </b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            onChange={this.setPassword}
            value={this.state.password}
          />
          <br />

          <label htmlFor="confirmPassword">
            <b>Confirmar Contraseña</b>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            onChange={this.setConfirmPassword}
            value={this.state.confirmPassword}
          />
          <br />
          <input type="submit" className="signupbtn" value="Sign Up" />
          <hr />
          <p>
            Si ya tienes una cuenta?
            <a href="/">Inicia sesión</a>.
          </p>
        </form>
      </div>
    );
  }
}
