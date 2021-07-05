import { ReactElement } from 'react';
import styles from './show_password.module.scss';

const ShowPassword = (props: Props): ReactElement => {
  const {
  } = props;

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
      <input
      className={styles.checkbox}
      type="checkbox"
      onChange={showPassword}
      />
      <label
      className={styles.showPWLabel}>Show Password</label>
    </>
  );
};

export default ShowPassword;