<?php
/**
 * Single page.
 *
 * the_content() inside the loop is what Elementor requires: the builder
 * replaces the post content filter, so a template that prints hardcoded markup
 * instead of calling the_content() gives Elementor nothing to render into.
 *
 * @package captal-onepage
 */

get_header();
?>

<main id="content" class="site-main">
	<div class="container container--reading">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article <?php post_class( 'entry' ); ?>>
				<?php if ( ! captal_is_builder_page() ) : ?>
					<header class="entry-header">
						<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
					</header>
				<?php endif; ?>

				<div class="entry-content">
					<?php
					the_content();

					wp_link_pages(
						array(
							'before' => '<nav class="entry-pages">',
							'after'  => '</nav>',
						)
					);
					?>
				</div>
			</article>
			<?php
			if ( comments_open() || get_comments_number() ) {
				comments_template();
			}
		endwhile;
		?>
	</div>
</main>

<?php
get_footer();
