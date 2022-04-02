import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface PageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	title: string;
	description: string;
}