import { ReactElement } from 'react';
import styles from './create_account_button.module.scss';

const Button = (props: Props): ReactElement => {
  const {
  } = props;

  const { button } = styles;

  return (
    <button className={styles.submitButton}>Create Account</button>
  );
};

export default Button;