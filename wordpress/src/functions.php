<?php
/**
 * Capiital One-Page — theme setup.
 *
 * @package captal-onepage
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

if ( ! isset( $content_width ) ) {
	// Elementor reads this as the default content width for its containers.
	$content_width = 1400;
}

/**
 * Theme supports.
 *
 * post-thumbnails, title-tag and html5 are the set Elementor checks for when
 * it decides whether a theme is one it can render into.
 */
function captal_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'align-wide' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary', 'captal-onepage' ),
		)
	);
}
add_action( 'after_setup_theme', 'captal_setup' );

/**
 * Elementor Pro's Theme Builder can only override a header, footer, single or
 * archive if the theme registers those locations. Without this the builder
 * silently falls back to the theme's own templates.
 */
function captal_register_elementor_locations( $elementor_theme_manager ) {
	$elementor_theme_manager->register_all_core_location();
}
add_action( 'elementor/theme/register_locations', 'captal_register_elementor_locations' );

/**
 * Fonts and stylesheets.
 *
 * tokens.css is a declared dependency of styles.css rather than an @import, so
 * the order is guaranteed and WordPress can cache both normally.
 */
function captal_enqueue_assets() {
	$version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style(
		'captal-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,300;1,8..60,400&display=swap',
		array(),
		null // Google serves its own cache headers; a ?ver= string only breaks them.
	);

	wp_enqueue_style( 'captal-tokens', get_theme_file_uri( 'assets/css/tokens.css' ), array(), $version );
	wp_enqueue_style( 'captal-styles', get_theme_file_uri( 'assets/css/styles.css' ), array( 'captal-tokens' ), $version );

	// The WordPress/Elementor integration layer: entry typography, menu markup
	// and the rules that get out of Elementor's way on a builder page.
	wp_enqueue_style( 'captal-wordpress', get_theme_file_uri( 'assets/css/wordpress.css' ), array( 'captal-styles' ), $version );

	wp_enqueue_script( 'captal-nav', get_theme_file_uri( 'assets/js/main.js' ), array(), $version, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'captal_enqueue_assets' );

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
 * The admin bar is fixed to the top of the viewport and would sit on top of the
 * sticky header. Offset the header by its height while it is showing.
 */
function captal_admin_bar_offset() {
	if ( ! is_admin_bar_showing() ) {
		return;
	}
	echo '<style>.site-header{top:32px}@media screen and (max-width:782px){.site-header{top:46px}}</style>' . "\n";
}
add_action( 'wp_head', 'captal_admin_bar_offset', 20 );

/**
 * Is this post built with Elementor?
 *
 * Used to suppress the theme's own page title and padding on builder pages:
 * Elementor lays out its own heading and spacing, so printing ours too gives a
 * duplicated title above the design.
 *
 * @param int|null $post_id Defaults to the current post.
 * @return bool
 */
function captal_is_builder_page( $post_id = null ) {
	if ( ! did_action( 'elementor/loaded' ) || ! class_exists( '\\Elementor\\Plugin' ) ) {
		return false;
	}

	$post_id = $post_id ? $post_id : get_the_ID();
	if ( ! $post_id ) {
		return false;
	}

	$documents = \Elementor\Plugin::$instance->documents;
	if ( ! $documents ) {
		return false;
	}

	$document = $documents->get( $post_id );

	return $document && $document->is_built_with_elementor();
}

/**
 * Does the current page have content of its own worth rendering?
 *
 * The front page falls back to the one-page design only when the assigned page
 * is genuinely empty; otherwise the editor's content wins.
 *
 * @return bool
 */
function captal_has_editor_content() {
	$post = get_post();

	return $post && '' !== trim( $post->post_content );
}

/**
 * Mark builder pages on the body element so the stylesheet can stand down.
 *
 * @param string[] $classes Body classes.
 * @return string[]
 */
function captal_body_classes( $classes ) {
	if ( is_singular() && captal_is_builder_page() ) {
		$classes[] = 'captal-builder-page';
	}

	return $classes;
}
add_filter( 'body_class', 'captal_body_classes' );
