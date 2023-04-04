import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type HeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

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

export const socialData: socialData[] = [
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
	{
		id: 3,
		social: 'Linkedin',
		href: 'https://www.linkedin.com/in/headsmanc0de/',
		icon: 'ri-linkedin-line',
	},
];

export const profileInfo: profileInfo[] = [
	{
		id: 0,
		title: '2+',
		desctiption: 'Years of commercial development',
	},
	{
		id: 1,
		title: 3,
		desctiption: 'Completed projects',
	},
	{
		id: 2,
		title: 'Extrawest',
		desctiption: 'My current company',
	},
];
