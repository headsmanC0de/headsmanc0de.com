import Head from 'next/head';
import { PageProps } from './Page.props';

export const Page = ({ children, title = '', description = '' }: PageProps): JSX.Element => (
	<>
		<Head>
			<title>{title}</title>
			<meta name='description' content={description} />
		</Head>
		{children}
	</>
);
