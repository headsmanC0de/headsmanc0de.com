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
];

export const profileInfo: profileInfo[] = [
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
		desctiption: 'My current job',
	},
];