import { HeaderProps, socialData, profileInfo } from './Header.props';
import styles from './Header.module.sass';
import cn from 'classnames';

export default function Header({ ...props }: HeaderProps): JSX.Element {
	return (
		<header {...props} className={cn(styles.profile, styles.container)}>
			<div className={cn(styles.profile__container, styles.grid)}>
				<div className={styles.profile__data}>
					<div className={styles.profile__border}>
						<div className={styles.profile__perfil}>
							<img src='./images/avatar.webp' alt='' />
						</div>
					</div>
					<h2 className={styles.profile__name}>Dennis Pavlyuk</h2>
					<h3 className={styles.profession}>ReactJS Developer</h3>

					<ul className={styles.profile__social}>
						{socialData.map((social) => (
							<a
								key={social.id}
								href={social.href}
								className={styles.profile__socialLink}
								rel='noreferrer'
								target='_blank'
							>
								<i className={social.icon}></i>
							</a>
						))}
					</ul>
				</div>

				<div className={cn(styles.profile__info, styles.grid)}>
					{profileInfo.map((info) => (
						<div className={styles.profile__infoGroup} key={info.id}>
							<h3 className={styles.profile__infoNumber}>{info.title}</h3>
							<p className={styles.profile__infoDesctiption}>{info.desctiption}</p>
						</div>
					))}
				</div>

				<div className={styles.profile__buttons}>
					<a
						href='/files/DennisPavlyukResume (3).pdf'
						className={styles.button}
						target='_blank'
						rel='noopener noreferrer'
					>
						Download CV <i className='ri-download-line'></i>
					</a>

					<div className={styles.profile__buttonsSmall}>
						<a
							href='mailto:me@dennispavlyuk.com'
							className={cn(styles.button, styles.button__small, styles.button__gray)}
							target='_blank'
							rel='noreferrer'
						>
							<i className='ri-mail-line'></i>
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}
