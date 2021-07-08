import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

// components
import Button from './components/createAccountButton/create_account_button';
import ShowPassword from './components/showPassword/show_password';
import ErrorMessages from './components/errorMessages/error_messages';
import Title from './components/title/title';

export default function CreateAccount() {
  const [username, setUN] = useState('');
  const [password, setPW] = useState('');
  const [created, setCreated] = useState(false);
  const [unErr, setUNErr] = useState('')
  const [pwErr, setPWErr] = useState('');
  const [exposedPW, setExposedPW] = useState('');
  const [displayUNReqs, setdisplayUNReqs] = useState(false);
  const [displayPWReqs, setdisplayPWReqs] = useState(false);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();

    // clear any current error messages
    setUNErr('');
    setPWErr('');
    setExposedPW('');

    // submit request to api
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({ username, password}),
    });

    // if result is true change created to true, if false display proper error messaging
    const apiResponse = await response.json()
    if (apiResponse.result) {
      setUNErr('');
      setPWErr('');
      setExposedPW('');
      setCreated(true);
    } else {
      handleErrors(apiResponse.errors);
    }
  }

  // error handler for api response
  const handleErrors = (error: object) => {
    if (error.exposedPW === true) {
      setExposedPW('Alert! This password has been exposed in a data breach. Please reset password now.')
    } if (error.validUN === false) {
      setUNErr('All usernames must be between 10 and 50 characters long. Please try a new username!')
    } if (error.validPW === false) {
      setPWErr('All passwords must be between 20 and 50 characters long with at least 1 symbol (!,@,#,$,%), 1 letter (a-zA-Z), 1 number (0-9). Please try a new password!')
    }
  }

  const modal = () => {
    const element = document.getElementById("pwModal");
    element.open = !element.open;
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
        <img className={styles.logo} src="wealthfront_logo.svg"/>
        <Title created={created}/>
        <ErrorMessages
          unErr={unErr}
          pwErr={pwErr}
          exposedPW={exposedPW}
        />
        <label
          className={styles.inputLabel}
        > Username</label>
        <i className={styles.questionMark}>{'  '}?</i>
        <input
          className={styles.input}
          onChange={(e) => {setUN(e.target.value)}}
        />
        <label className={styles.inputLabel}>Password
        </label>
        <i
          className={styles.questionMark}
          onMouseEnter={modal}
          onMouseLeave={modal}
        >{' '}?</i>

        <dialog id="pwModal">
          All passwords must be between 20 and 50 characters long with at least 1 symbol (!,@,#,$,%), 1 letter (a-zA-Z), 1 number (0-9).
        </dialog>
        <input
          className={styles.input}
          id="pw"
          type="password"
          onChange={(e) => {setPW(e.target.value)}}
        />
        <ShowPassword />
        <Button />
        </form>
      </article>
    </>
  );
}
