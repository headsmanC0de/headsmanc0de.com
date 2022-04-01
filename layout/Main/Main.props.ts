import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type MainProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface ProjectData {
	id: number;
	img: string;
	imgAlt: string;
	title: string;
	subtitle: string;
	projectLink: string;
}

export const projectData: ProjectData[] = [
	{
		id: 0,
		img: '/images/projects/galacticescape.webp',
		imgAlt: 'Galactic Escape',
		title: 'Galactic Escape',
		subtitle: 'NFT Wax game',
		projectLink: '#',
	},
];