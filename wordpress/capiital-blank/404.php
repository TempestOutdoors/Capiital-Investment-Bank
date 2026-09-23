<?php
/**
 * 404.
 *
 * @package capiital-blank
 */

get_header();
?>

<main id="content">
	<h1><?php esc_html_e( 'Page not found', 'capiital-blank' ); ?></h1>
	<p><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Return home', 'capiital-blank' ); ?></a></p>
</main>

<?php
get_footer();
