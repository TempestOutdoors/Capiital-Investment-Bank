<?php
/**
 * Front page.
 *
 * Renders the CAP=TAL one-page layout — unless a static front page has been
 * assigned in Settings > Reading and built with Elementor or the block editor,
 * in which case that page's own content wins and this template gets out of the
 * way by handing off to page.php.
 *
 * @package captal-onepage
 */

if ( captal_is_builder_page() || ( is_page() && captal_has_editor_content() ) ) {
	get_template_part( 'page' );
	return;
}

get_header();
get_template_part( 'template-parts/onepage' );
get_footer();
