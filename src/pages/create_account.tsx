import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [username, setUN] = useState('');
  const [password, setPW] = useState('');
  const [created, setCreated] = useState(false);
  const [unErr, setUNErr] = useState('')
  const [pwErr, setPWErr] = useState('');
  const [showPW, setShowPW] = useState(false);
  const [exposedPW, setExposedPW] = useState('');

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password}),
    });

    // if result is true change created to true
    const apiResponse = await response.json()
    if (apiResponse.result) {
      setUNErr('');
      setPWErr('');
      setExposedPW('');
      setCreated(true);
      // disable inputs ? (nice to have)
    } else {
      handleErrors(apiResponse.errors);
    }
  }

  const handleErrors = (error: object) => {
    if (error.exposedPW === true) {
      setExposedPW('Alert! This password has been exposed in a data breach. Please reset password now.')
    } if (error.validUN === false) {
      setUNErr('Uh-Oh! This username does not fufill all the necessary requirements. All usernames must be between 10 and 50 characters long. Please try a a new username!')
    } if (error.validPW === false) {
      setPWErr('Whoops! This password does not fufill all the necessary requirements. All paswords must be between 20 and 50 characters long with at least 1 symbol (!,@,#,$,%), 1 letter (a-zA-Z), 1 number (0-9)')
    }
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
        {created ? (<h2 className={styles.title}>Account Successfully Created. Please Login Now</h2>) : (<h2 className={styles.title}>Create New Account</h2>)}

        {/* Error Handling */}
          {unErr ? <div className={styles.error}>{unErr}</div> : null}
          {pwErr ? (<div className={styles.error}>{pwErr}</div>) : null}
          {exposedPW ? (<div>{exposedPW}</div>) : null}

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


// danadanawalsh
// 9!Hellohellohellohello