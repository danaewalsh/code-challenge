import { ReactElement } from 'react';
import styles from './error_messages.module.scss';

interface Props {
  unErr: string;
  pwErr: string;
  exposedPW: string;
}

const ErrorMessages = (props: Props): ReactElement => {
  const {
    unErr,
    pwErr,
    exposedPW
  } = props;

  return (
    <>
      {unErr ? <div className={styles.error}>{unErr}</div> : null}
      {pwErr ? (<div className={styles.error}>{pwErr}</div>) : null}
      {exposedPW ? (<div>{exposedPW}</div>) : null}
    </>
  );
};

export default ErrorMessages;