<?php
/**
 * What the six widgets have in common.
 *
 * Mostly small pieces of markup that recur across them and must stay identical wherever they
 * appear: the camera placeholder, a section heading with its italic accent line, and the
 * reveal attributes. Written once so a change to any of them cannot reach one section and
 * miss another.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

abstract class Capiital_Widget_Base extends \Elementor\Widget_Base {

	public function get_categories() {
		return array( Capiital_Widgets::CATEGORY );
	}

	public function get_icon() {
		return 'eicon-font';
	}

	/**
	 * Every one of these sections is a band of the design rather than a widget sitting inside
	 * the page's grid, so each carries .capiital-part. The theme's stylesheet uses that class
	 * to strip the padding and the width constraint off Elementor's own wrappers; without it
	 * the full-bleed grounds stop at the content width.
	 */
	protected function part_class( $extra = '' ) {
		return trim( 'capiital-part ' . $extra );
	}

	/**
	 * A section heading: plain lines, then one italic line in the accent.
	 *
	 * The accent line is the only part of a heading that ever carries colour, and there is
	 * never more than one. spec/00 §4 fixes the markup — an h2 with a <br> after each plain
	 * line and the accent as a span — because the line breaks are authored, not wrapped.
	 */
	protected function heading( $lines, $accent, $size = 'md' ) {
		$class = 's-head' . ( 'md' === $size ? ' s-head--md' : '' );
		$html  = '<h2 class="' . esc_attr( $class ) . '">';
		foreach ( (array) $lines as $line ) {
			if ( '' === trim( (string) $line ) ) {
				continue;
			}
			$html .= esc_html( $line ) . '<br>';
		}
		if ( $accent ) {
			$html .= '<span class="s-head__accent">' . esc_html( $accent ) . '</span>';
		}
		return $html . '</h2>';
	}

	/**
	 * The placeholder that stands where a photograph will go.
	 *
	 * No border: space separates it from the page, which has been the house rule since
	 * 7 October. When the firm sets an image it replaces the box at the same ratio with
	 * object-fit: cover, and the alt text is what the placeholder was describing.
	 */
	protected function placeholder( $image, $ratio_class, $label, $alt = '' ) {
		if ( ! empty( $image['url'] ) ) {
			return sprintf(
				'<img class="%s" src="%s" alt="%s">',
				esc_attr( 'ph-img ' . $ratio_class ),
				esc_url( $image['url'] ),
				esc_attr( $alt ? $alt : $label )
			);
		}
		return sprintf(
			'<div class="ph %s" role="img" aria-label="%s">%s</div>',
			esc_attr( $ratio_class ),
			esc_attr( $label ),
			self::camera()
		);
	}

	/** Lucide's camera, at the stroke weight spec/03 gives placeholders. */
	protected static function camera() {
		return '<svg class="ph__icon" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" '
			. 'stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">'
			. '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>'
			. '<circle cx="12" cy="13" r="3"></circle></svg>';
	}

	/** data-reveal, and a step where a row is staggered. */
	protected function reveal( $variant = 'settle', $step = 0 ) {
		$out = ' data-reveal="' . esc_attr( $variant ) . '"';
		if ( $step ) {
			$out .= ' data-reveal-step="' . esc_attr( (string) $step ) . '"';
		}
		return $out;
	}

	/**
	 * Is the page being drawn inside Elementor's editor?
	 *
	 * Two of these sections hold the page while their contents arrive, and a held section is
	 * unusable in the editor — the panel scrolls, the stage sticks, and the thing cannot be
	 * clicked. In the editor they render unheld, exactly as they do on a phone.
	 */
	protected function in_editor() {
		return \Elementor\Plugin::$instance->editor->is_edit_mode()
			|| \Elementor\Plugin::$instance->preview->is_preview_mode();
	}

	/**
	 * The language the page is being served in, from WPML where it is present.
	 *
	 * Only the handful of strings this plugin writes itself need it; everything the firm types
	 * is translated by WPML through wpml-config.xml, field by field.
	 */
	protected function lang() {
		if ( defined( 'ICL_LANGUAGE_CODE' ) ) {
			return 'da' === ICL_LANGUAGE_CODE ? 'da' : 'en';
		}
		return 0 === strpos( get_locale(), 'da' ) ? 'da' : 'en';
	}

	protected function t( $en, $da ) {
		return 'da' === $this->lang() ? $da : $en;
	}
}
