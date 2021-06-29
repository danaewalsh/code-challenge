import Head from 'next/head';
import { FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    });

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
          <input className={styles.input}/>
          <label className={styles.inputLabel}>Password</label>
          <input className={styles.input}/>
          <button className={styles.submitButton}>Create Account</button>
        </form>
      </article>
    </>
  );
}
