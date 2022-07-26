import { FooterProps } from './Footer.props';
import styles from './Footer.module.sass';
import cn from 'classnames';

export default function Footer({ ...props }: FooterProps): JSX.Element {
	return (
		<footer {...props} className={cn(styles.footer, styles.container)}>
			<span className={styles.footer__copy}>&#169; Dennis Pavlyuk. All rights reserved</span>
		</footer>
	);
}
