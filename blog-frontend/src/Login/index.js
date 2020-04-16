import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import api from '../services/api';

export default function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const history = useHistory();

  // if(localStorage.getItem('writer_id')) {
  //   history.push('/home');
  // }

  async function handleLogin(e) {
    e.preventDefault();
    const data = {
      email: email,
      password: senha
    }
    try {
      const response = await api.post('login', data);
      localStorage.setItem('writer_id', response.data.id);
      console.log('redirecionar')
      history.push('/home')
    } catch(err) {
      console.log(err);
    }
  }


  return (

    <div className="login-container">
      <div className="call-container">
        <div className="words-container">
          <aside>
              Built for your personal posts
          </aside>
          <p>
            Blog is a plataform to express yourself, suited for new writers and experienced journalists alike. Come see the news!
          </p>
        </div>

      </div>

      <div className="form-container">
        <form onSubmit={handleLogin}>
          <div className="inputs">
            <div className="input-container">
              <h3>Email</h3>
              <input
              type="text"
              placeholder="email"
              onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <h3>Senha</h3>
              <input
              type="password"
              placeholder="senha"
              onChange={e => setSenha(e.target.value)}
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Sign in</button>
          </div>

        </form>
      </div>




    </div>
  )
}