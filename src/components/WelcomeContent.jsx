import Wrapper from './Wrapper';
import AuthBox from './AuthBox';

import styles from './WelcomeContent.module.css';

const WelcomeContent = () => {
	

	return (
		<div className={styles.bg}>
			<Wrapper>
				<div className={styles.container}>
					<div className={styles.header}>
						<h2 className={styles.welcome}>Welcome to </h2>
						<h1 className={styles.title}>React Todo App</h1>
					</div>
					<AuthBox />
				</div>
			</Wrapper>
		</div>
	);
};

export default WelcomeContent;
