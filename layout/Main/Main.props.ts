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
		img: '/images/projects/miccheck.webp',
		imgAlt: 'MicCheck App',
		title: 'MicCheck App',
		subtitle: 'Social Media & Ticketing for Music Venues',
		projectLink: 'https://www.themiccheck.com/',
	},
	{
		id: 1,
		img: '/images/projects/kalyna.webp',
		imgAlt: 'Registration Form',
		title: 'Kalyna-UAFGR',
		subtitle: 'Registration Application for Dancers',
		projectLink: 'https://www.uafgr.org/registration-form/',
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
		skill: 'React/NextJS',
		icon: 'ri-reactjs-line',
	},
	{
		id: 5,
		skill: 'Git',
		icon: 'ri-git-branch-line',
	},
	{
		id: 6,
		skill: 'Web Components',
		icon: 'ri-focus-line',
	},
];

export const skillsDataBackEnd: SkillsDataType[] = [
	{
		id: 0,
		skill: 'NodeJS/NestJS',
		icon: 'ri-server-line',
	},
	{
		id: 1,
		skill: 'Firebase',
		icon: 'ri-fire-line',
	},
	{
		id: 2,
		skill: 'NoSQL',
		icon: 'ri-database-line',
	},
];

export const skillsDataML: SkillsDataType[] = [
	{
		id: 0,
		skill: 'Python',
		icon: 'ri-code-line',
	},
	{
		id: 1,
		skill: 'Yolov5',
		icon: 'ri-eye-line',
	},
	{
		id: 2,
		skill: 'NVIDIA cuDDN',
		icon: 'ri-lightbulb-line',
	},
	{
		id: 3,
		skill: 'Google Colab',
		icon: 'ri-google-line',
	},
];