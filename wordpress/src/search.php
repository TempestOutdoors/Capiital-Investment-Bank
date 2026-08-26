<?php
/**
 * Search results.
 *
 * @package captal-onepage
 */

get_header();
?>

<main id="content" class="site-main">
	<div class="container container--reading">
		<header class="entry-header">
			<div class="eyebrow"><?php esc_html_e( 'Search', 'captal-onepage' ); ?></div>
			<h1 class="entry-title"><?php echo esc_html( get_search_query() ); ?></h1>
		</header>

		<?php if ( have_posts() ) : ?>
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
			<?php the_posts_pagination( array( 'mid_size' => 1 ) ); ?>
		<?php else : ?>
			<div class="entry-content">
				<p><?php esc_html_e( 'No results.', 'captal-onepage' ); ?></p>
				<?php get_search_form(); ?>
			</div>
		<?php endif; ?>
	</div>
</main>

<?php
get_footer();
