<?php
/**
 * Capiital Blank — theme setup.
 *
 * The whole point of this theme is to do as little as possible. Everything
 * declared here is either required by WordPress, required by Elementor, or
 * prevents WordPress from rendering something the page did not ask for.
 *
 * @package capiital-blank
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

if ( ! isset( $content_width ) ) {
	// Elementor reads this as its default content width.
	$content_width = 1400;
}

/**
 * Theme supports.
 *
 * post-thumbnails, title-tag and html5 are the set Elementor checks when it
 * decides whether a theme is one it can render into. A menu location is
 * registered but never printed: the theme displays nothing, and this only means
 * a menu assigned in the admin is available to a builder or a child theme.
 */
function capiital_blank_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary', 'capiital-blank' ),
		)
	);
}
add_action( 'after_setup_theme', 'capiital_blank_setup' );

/**
 * Elementor Pro's Theme Builder can only place a header, footer, single or
 * archive if the theme registers those locations. Registering them does not
 * make this theme render anything — it means that when you DO build a header in
 * Theme Builder, it has somewhere to go.
 */
function capiital_blank_register_elementor_locations( $elementor_theme_manager ) {
	$elementor_theme_manager->register_all_core_location();
}
add_action( 'elementor/theme/register_locations', 'capiital_blank_register_elementor_locations' );

/**
 * The stylesheet — browser-default corrections only. See style.css.
 */
function capiital_blank_enqueue() {
	wp_enqueue_style(
		'capiital-blank',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'capiital_blank_enqueue' );
