<?php
/**
 * A page.
 *
 * the_content() inside the loop and nothing else — no title, no wrapper
 * furniture. A page in this theme is whatever the page itself contains, which
 * is what makes an Elementor layout or pasted markup render as the whole
 * document rather than as something dropped inside a theme's frame.
 *
 * the_content() is also what Elementor requires: it replaces the post content
 * filter, so a template printing its own markup instead would give the builder
 * nothing to render into.
 *
 * @package capiital-blank
 */

get_header();
?>

<main id="content">
	<?php
	while ( have_posts() ) :
		the_post();
		the_content();
		wp_link_pages();
	endwhile;
	?>
</main>

<?php
get_footer();
