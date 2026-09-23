<?php
/**
 * The fallback: the blog index, and any archive without a more specific file.
 *
 * WordPress requires this file to exist for the theme to be valid at all.
 *
 * @package capiital-blank
 */

get_header();
?>

<main id="content">
	<?php if ( have_posts() ) : ?>
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article <?php post_class(); ?>>
				<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
				<?php the_excerpt(); ?>
			</article>
			<?php
		endwhile;

		the_posts_pagination();
		?>
	<?php else : ?>
		<p><?php esc_html_e( 'Nothing found.', 'capiital-blank' ); ?></p>
		<?php get_search_form(); ?>
	<?php endif; ?>
</main>

<?php
get_footer();
