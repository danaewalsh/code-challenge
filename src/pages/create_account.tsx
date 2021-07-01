import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {

  //
  const [username, setUN] = useState('');
  const [password, setPW] = useState('');
  const [created, setCreated] = useState(false);
  const [unErr, setUNErr] = useState('')
  const [pwErr, setPWErr] = useState('')
  const [showPW, setShowPW] = useState(false);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password}),
    });

    console.log('this is response from create new account', await response.json());
  }

  const showPassword = () => {
    var target = document.getElementById("pw");
    if (target.type === "password") {
      target.type = "text";
    } else {
      target.type = "password";
    }
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <img className={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Wealthfront_Logo.svg/1200px-Wealthfront_Logo.svg.png"/>
          <h2 className={styles.title}>Create New Account</h2>
          <label className={styles.inputLabel}>Username</label>
          <input
            className={styles.input}
            onChange={(e) => {setUN(e.target.value)}}
          />
          <label className={styles.inputLabel}>Password</label>
          <input
            className={styles.input}
            id="pw"
            type="password"
            onChange={(e) => {setPW(e.target.value)}}
          />
          <input
            className={styles.checkbox}
            type="checkbox"
            onChange={showPassword}
          />
          <label
            className={styles.showPWLabel}>Show Password</label>
          <button className={styles.submitButton}>Create Account</button>
        </form>
      </article>
    </>
  );
}
