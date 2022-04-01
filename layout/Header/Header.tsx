import { group } from 'console';
import styles from './Header.module.sass';
import { HeaderProps } from './Header.props';

interface socialData {
	id: number;
    social: string;
    href: string;
    icon: string;
}

interface profileInfo {
	id: number;
	title: number | string;
	desctiption: string;
}

export default function Header({ ...props }: HeaderProps): JSX.Element {
	const socialData: socialData[] = [
		{
			id: 0,
			social: 'Telegram',
			href: 'https://t.me/headsmanc0de',
			icon: 'ri-telegram-line',
		},
		{
			id: 1,
			social: 'Instagram',
			href: 'https://www.instagram.com/_headsmanc0de/',
			icon: 'ri-instagram-line',
		},
		{
			id: 2,
			social: 'GitHub',
			href: 'https://github.com/headsmanC0de',
			icon: 'ri-github-line',
		},
	];

	const profileInfo: profileInfo[] = [
		{
			id: 0,
			title: 1,
			desctiption: 'Year of commercial development',
		},
		{
			id: 1,
			title: 3,
			desctiption: 'Completed projects',
		},
		{
			id: 2,
			title: 'SoftVision',
			desctiption: 'My current place of employment',
		},
	];

	return (
		<header {...props} className={(styles.profile, styles.container)}>
			<div className={(styles.profile__container, styles.grid)}>
				<div className={styles.profile__data}>
					<div className={styles.profile__border}>
						<div className={styles.profile__perfil}>
							<img src='./images/avatar.webp' alt='' />
						</div>
					</div>
					<h2 className={styles.profile__name}>Nazariy Petryk</h2>
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

				<div className={(styles.profile__info, styles.grid)}>
					{profileInfo.map((info) => (
						<div className={styles.profile__infoGroup} key={info.id}>
							<h3 className={styles.profile__infoNumber}>{info.title}</h3>
							<p className={styles.profile__infoDesctiption}>{info.desctiption}</p>
						</div>
					))}
				</div>
			</div>
		</header>
	);
}
