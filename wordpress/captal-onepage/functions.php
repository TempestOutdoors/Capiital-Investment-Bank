<?php
/**
 * CAP=TAL One-Page — theme setup.
 *
 * @package captal-onepage
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

/**
 * Fonts and stylesheets.
 *
 * tokens.css is registered as a dependency of styles.css rather than being
 * pulled in with an @import, so the two always load in the right order and
 * WordPress can still concatenate/cache them normally.
 */
function captal_enqueue_assets() {
	$version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style(
		'captal-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap',
		array(),
		null // Google serves its own cache headers; a ?ver= string only breaks them.
	);

	wp_enqueue_style(
		'captal-tokens',
		get_theme_file_uri( 'assets/css/tokens.css' ),
		array(),
		$version
	);

	wp_enqueue_style(
		'captal-styles',
		get_theme_file_uri( 'assets/css/styles.css' ),
		array( 'captal-tokens' ),
		$version
	);

	wp_enqueue_script(
		'captal-nav',
		get_theme_file_uri( 'assets/js/main.js' ),
		array(),
		$version,
		true // In the footer: the script only needs the header markup to exist.
	);
}
add_action( 'wp_enqueue_scripts', 'captal_enqueue_assets' );

/**
 * Preconnect to the font CDN so the two faces start downloading a round trip
 * earlier than the stylesheet alone would allow.
 */
function captal_resource_hints( $hints, $relation ) {
	if ( 'preconnect' === $relation ) {
		$hints[] = array( 'href' => 'https://fonts.googleapis.com' );
		$hints[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}
	return $hints;
}
add_filter( 'wp_resource_hints', 'captal_resource_hints', 10, 2 );

/**
 * Theme supports.
 */
function captal_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'style', 'script' ) );
	add_theme_support( 'custom-logo' );
}
add_action( 'after_setup_theme', 'captal_setup' );

/**
 * The "=" mark as the browser-tab icon.
 *
 * Skipped when a Site Icon is set in the Customizer, so an explicit choice
 * there always wins over the bundled default.
 */
function captal_favicon() {
	if ( has_site_icon() ) {
		return;
	}
	printf(
		'<link rel="icon" href="%s" type="image/svg+xml">' . "\n",
		esc_url( get_theme_file_uri( 'assets/favicon.svg' ) )
	);
}
add_action( 'wp_head', 'captal_favicon', 5 );

/**
 * The admin bar is fixed at the top of the viewport and would sit on top of
 * the sticky header. Push the header down by its height when it is showing.
 */
function captal_admin_bar_offset() {
	if ( ! is_admin_bar_showing() ) {
		return;
	}
	echo '<style>.site-header{top:32px}@media screen and (max-width:782px){.site-header{top:46px}}</style>';
}
add_action( 'wp_head', 'captal_admin_bar_offset', 20 );
