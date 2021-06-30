import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {

  //
  const [username, setUN] = useState('');
  const [password, setPW] = useState('');
  const [created, setCreated] = useState(false);
  const [unErr, setUNError] = useState('')
  const [pwErr, setPWError] = useState('')

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password}),
    });
    console.log('submit is working')
    console.log(await response.json());
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
            onChange={(e) => {setPW(e.target.value)}}
          />
          <button className={styles.submitButton}>Create Account</button>
        </form>
      </article>
    </>
  );
}
