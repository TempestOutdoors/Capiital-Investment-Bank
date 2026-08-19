<?php
/**
 * 404.
 *
 * @package captal-onepage
 */

get_header();
?>

<main id="content" class="site-main">
	<div class="container container--reading">
		<header class="entry-header">
			<div class="eyebrow"><?php esc_html_e( 'Error 404', 'captal-onepage' ); ?></div>
			<h1 class="entry-title"><?php esc_html_e( 'Page not found.', 'captal-onepage' ); ?></h1>
		</header>
		<div class="entry-content">
			<p><?php esc_html_e( 'The page you requested is no longer here, or never was.', 'captal-onepage' ); ?></p>
			<p><a class="link-rule" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Return home', 'captal-onepage' ); ?> &rarr;</a></p>
		</div>
	</div>
</main>

<?php
get_footer();
