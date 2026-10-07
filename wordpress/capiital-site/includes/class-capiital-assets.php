<?php
/**
 * The shared behaviour.
 *
 * main.js moves here from the child theme, because elementor.md §2 puts the shared JS in the
 * plugin: a page's behaviour should survive a change of design, as its content does. The theme
 * still carries a copy and enqueues it only when this plugin is absent, so neither half is
 * broken on its own and the script is never loaded twice.
 *
 * archive.js is loaded only on a page that actually holds the archive — it is dead weight
 * everywhere else, and the house rule is that nothing is loaded for the sake of being there.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Assets {

	/** Set by the archive widget when it renders, so the script is enqueued only where it is used. */
	private static $archive_on_page = false;

	public static function init() {
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'register' ), 5 );
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue' ), 30 );
		add_action( 'wp_footer', array( __CLASS__, 'late_archive_enqueue' ), 5 );
	}

	private static function version( $relative ) {
		$path = CAPIITAL_SITE_DIR . $relative;
		return file_exists( $path ) ? (string) filemtime( $path ) : CAPIITAL_SITE_VERSION;
	}

	public static function register() {
		wp_register_script(
			'capiital',
			CAPIITAL_SITE_URL . 'assets/js/main.js',
			array(),
			self::version( 'assets/js/main.js' ),
			true
		);
		wp_register_script(
			'capiital-archive',
			CAPIITAL_SITE_URL . 'assets/js/archive.js',
			array( 'capiital' ),
			self::version( 'assets/js/archive.js' ),
			true
		);
	}

	/**
	 * The theme registers the same handle. Whichever enqueues first wins, and because this runs
	 * at priority 30 against the theme's 20, the theme's copy is already registered under the
	 * handle 'capiital' — so the file actually served is the theme's.
	 *
	 * That is the wrong way round: the plugin's copy should win, since the plugin is where the
	 * behaviour belongs and where it is updated. Deregistering first makes it so.
	 */
	public static function enqueue() {
		if ( wp_script_is( 'capiital', 'registered' ) ) {
			$src = wp_scripts()->registered['capiital']->src ?? '';
			if ( false === strpos( (string) $src, 'capiital-site' ) ) {
				wp_deregister_script( 'capiital' );
				self::register();
			}
		}
		wp_enqueue_script( 'capiital' );
	}

	/**
	 * Called by the archive widget as it renders.
	 *
	 * A widget renders after wp_enqueue_scripts has run, so the script cannot be enqueued from
	 * there in the ordinary way. Enqueueing in wp_footer is the documented way round it, and
	 * WordPress prints it correctly because the footer scripts have not been output yet.
	 */
	public static function archive_is_on_page() {
		self::$archive_on_page = true;
		if ( did_action( 'wp_enqueue_scripts' ) && ! did_action( 'wp_print_footer_scripts' ) ) {
			wp_enqueue_script( 'capiital-archive' );
		}
	}

	public static function late_archive_enqueue() {
		if ( self::$archive_on_page ) {
			wp_enqueue_script( 'capiital-archive' );
		}
	}
}
