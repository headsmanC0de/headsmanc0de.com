import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type MainProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface ProjectDataType {
	id: number;
	img: string;
	imgAlt: string;
	title: string;
	subtitle: string;
	projectLink: string;
}

interface SkillsDataType {
	id: number;
	skill: string;
	icon: string;
}

export const projectData: ProjectDataType[] = [
	{
		id: 0,
		img: '/images/projects/galacticescape.webp',
		imgAlt: 'Galactic Escape',
		title: 'Galactic Escape',
		subtitle: 'NFT Wax game',
		projectLink: '#',
	},
	{
		id: 1,
		img: '/images/projects/ybt.webp',
		imgAlt: 'Ybt',
		title: 'Your bunny trades',
		subtitle: 'Crypto ecosystem',
		projectLink: 'https://yourbunnytrades.com/',
	},
];

export const skillsDataFrontEnd: SkillsDataType[] = [
	{
		id: 0,
		skill: 'HTML5',
		icon: 'ri-html5-line',
	},
	{
		id: 1,
		skill: 'CSS3',
		icon: 'ri-css3-line',
	},
	{
		id: 2,
		skill: 'JavaScript',
		icon: 'ri-braces-line',
	},
	{
		id: 3,
		skill: 'TypeScript',
		icon: 'ri-medal-line',
	},
	{
		id: 4,
		skill: 'React/NextJs',
		icon: 'ri-reactjs-line',
	},
	{
		id: 5,
		skill: 'Git',
		icon: 'ri-git-branch-line',
	},
];

export const skillsDataBackEnd: SkillsDataType[] = [
	{
		id: 0,
		skill: 'NodeJs/NestJs',
		icon: 'ri-server-line',
	},
	{
		id: 1,
		skill: 'Firebase',
		icon: 'ri-fire-line',
	},
];
