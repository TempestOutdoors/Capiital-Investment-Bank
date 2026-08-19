<?php
/**
 * Single post.
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
						<div class="eyebrow"><?php echo esc_html( get_the_date() ); ?></div>
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
