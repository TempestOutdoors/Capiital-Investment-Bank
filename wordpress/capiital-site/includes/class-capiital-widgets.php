<?php
/**
 * Registering the six custom widgets, and the helpers they share.
 *
 * Which parts of the site are custom and which are native is settled in elementor.md §2, and
 * the line is drawn by one question: can the firm edit it in Elementor without the behaviour
 * coming apart? The quote, Cases, Who we are, What we think and the footer's text are native
 * widgets, so they are edited on the page. These six are not, because each carries behaviour
 * no native widget can hold — the Logo Border's cross-fade, the held row, the pinned stage,
 * the archive's panel — and the editor is given their text as fields instead.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Widgets {

	const CATEGORY = 'capiital';

	public static function init() {
		add_action( 'elementor/elements/categories_registered', array( __CLASS__, 'category' ) );
		add_action( 'elementor/widgets/register', array( __CLASS__, 'register' ) );
	}

	public static function category( $manager ) {
		$manager->add_category( self::CATEGORY, array(
			'title' => __( 'Capiital', 'capiital-site' ),
			'icon'  => 'eicon-font',
		) );
	}

	public static function register( $manager ) {
		require_once CAPIITAL_SITE_DIR . 'widgets/class-capiital-widget-base.php';
		$widgets = array(
			'class-capiital-widget-header.php'     => 'Capiital_Widget_Header',
			'class-capiital-widget-front-page.php' => 'Capiital_Widget_Front_Page',
			'class-capiital-widget-engage.php'     => 'Capiital_Widget_Engage',
			'class-capiital-widget-learned.php'    => 'Capiital_Widget_Learned',
			'class-capiital-widget-archive.php'    => 'Capiital_Widget_Archive',
			'class-capiital-widget-contact.php'    => 'Capiital_Widget_Contact',
		);
		foreach ( $widgets as $file => $class ) {
			require_once CAPIITAL_SITE_DIR . 'widgets/' . $file;
			$manager->register( new $class() );
		}
	}
}
