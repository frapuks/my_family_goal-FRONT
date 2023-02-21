import React from "react";


function Login() {
  return (
    <form>

      <div>
        <label htmlFor="email">Entrez votre email</label>
        <input type="email" name="email" id="email" required></input>
      </div>

      <div>
        <label htmlFor="password">Password (6 characters minimum) </label>
        <input type="password" name="password" id="password" minLength="6" required></input>
      </div>

      <div className="">
        <button type="submit" >Se connecter</button>
      </div>
      
    </form>

  );
}

export default Login;


