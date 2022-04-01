import cn from 'classnames';
import styles from './Main.module.sass';
import { MainProps, projectData } from './Main.props';

export default function Main({ ...props }: MainProps): JSX.Element {
	return (
		<main {...props} className={styles.main}>
			<section className={cn(styles.filters, styles.container)}>
				{/* Filters tabs */}
				<ul className={styles.filters__content}>
					<button className={styles.filters__button}>Projects</button>
					<button className={styles.filters__button}>Skills</button>
				</ul>

				<div className={styles.filters__sections}>
					{/*	Projects */}
					<div className={cn(styles.projects__content, styles.grid)}>
						{projectData.map((item) => (
							<article className={styles.projects__card} key={item.id}>
								<img src={item.img} alt={item.imgAlt} />

								<div className={styles.projects__modal}>
									<div>
										<span className={styles.projects__subtitle}>
											{item.subtitle}
										</span>
										<h3 className={styles.projects__title}>{item.title}</h3>
										<a
											href={item.projectLink}
											className={cn(
												styles.projects__button,
												styles.button,
												styles.projects__small
											)}
										>
											<i className='ri-link'></i>
										</a>
									</div>
								</div>
							</article>
						))}
					</div>
					{/*	Skills */}
					<div className={(styles.skills__content, styles.grid)}></div>
				</div>
			</section>
		</main>
	);
}
