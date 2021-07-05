import { ReactElement } from 'react';
import styles from './title.module.scss';

interface Props {
  created: boolean;
}

const Title = (props: Props): ReactElement => {
  const {
    created
  } = props;

  return (
    <>
      {created ? (<h2 className={styles.title}>Account Successfully Created. Please Login Now</h2>) : (<h2 className={styles.title}>Create New Account</h2>)}
    </>
  );
};

export default Title;