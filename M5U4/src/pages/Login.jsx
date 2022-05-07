import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div className="form-container">
        <h1 className="form-title">Formulario de registro</h1>
        <p className="error">{this.props.error}</p>
        <form
          action=""
          method=""
          name="login"
          encType="application/x-www-form-urlencoded"
          onSubmit={this.props.login}
        >
          <label htmlFor="username">Usuario </label>
          <input
            type="text"
            name="username"
            onChange={this.props.setUsername}
            value={this.props.username}
          />
          <br />
          <label htmlFor="password">Contraseña </label>
          <input
            type="password"
            name="password"
            onChange={this.props.setPassword}
            value={this.props.password}
          />
          <br />
          <input type="submit" className="loginbtn" value="Login" />
          <hr />
          <p>
           ¿Aún no disponde de una cuenta?
            <a href="/signup"> Regístrese aquí</a>.
          </p>
        </form>
      </div>
    );
  }
}
