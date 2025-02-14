import '../styles/suscribeForm.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { subscribe } from '../actions';

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const dispatch = useDispatch();

  function handleInput(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      dispatch(subscribe(email));
      setEmail("");
    }
  }

  return (
    <div className='suscribeContainer'>
      <h2>Subscribe to our newsletter!</h2>
      {!isEmailValid ? <p>Porfavor ingresa una direccion de mail valida</p> : null}
      <form onSubmit={handleSubmit} className='form-container'>
        <input
          type="email"
          placeholder="Ingresa tu email aqui"
          value={email}
          onChange={handleInput}
          className='email-input'
        />
        <button type="submit" className='submit-button' >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Newsletter;