<?php
/**
 * A single post.
 *
 * Unlike a page, a post is written rather than designed, so its title is
 * printed — otherwise the entry would appear untitled. Nothing else is added.
 *
 * @package capiital-blank
 */

get_header();
?>

<main id="content">
	<?php
	while ( have_posts() ) :
		the_post();
		?>
		<article <?php post_class(); ?>>
			<?php the_title( '<h1>', '</h1>' ); ?>
			<?php
			the_content();
			wp_link_pages();
			?>
		</article>
		<?php
		if ( comments_open() || get_comments_number() ) {
			comments_template();
		}
	endwhile;
	?>
</main>

<?php
get_footer();
