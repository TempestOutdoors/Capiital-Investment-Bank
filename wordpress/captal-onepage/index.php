<?php
/**
 * Fallback template: blog index and any archive without a more specific file.
 *
 * @package captal-onepage
 */

get_header();
?>

<main id="content" class="site-main">
	<div class="container container--reading">
		<?php if ( have_posts() ) : ?>

			<?php if ( ! is_front_page() ) : ?>
				<header class="entry-header">
					<?php if ( is_home() ) : ?>
						<h1 class="entry-title"><?php single_post_title(); ?></h1>
					<?php else : ?>
						<?php the_archive_title( '<h1 class="entry-title">', '</h1>' ); ?>
						<?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
					<?php endif; ?>
				</header>
			<?php endif; ?>

			<div class="post-list">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article <?php post_class( 'post-list__item' ); ?>>
						<div class="eyebrow"><?php echo esc_html( get_the_date() ); ?></div>
						<h2 class="post-list__title">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</h2>
						<div class="entry-content"><?php the_excerpt(); ?></div>
					</article>
					<?php
				endwhile;
				?>
			</div>

			<?php
			the_posts_pagination(
				array(
					'mid_size'  => 1,
					'prev_text' => '&larr;',
					'next_text' => '&rarr;',
				)
			);
			?>

		<?php else : ?>
			<div class="entry-content">
				<p><?php esc_html_e( 'Nothing found.', 'captal-onepage' ); ?></p>
				<?php get_search_form(); ?>
			</div>
		<?php endif; ?>
	</div>
</main>

<?php
get_footer();
