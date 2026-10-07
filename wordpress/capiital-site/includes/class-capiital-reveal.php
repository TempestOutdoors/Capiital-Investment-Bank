<?php
/**
 * A Reveal control on every widget's Advanced tab.
 *
 * The point of it is stated in spec/50: the firm should be able to keep the house motion on
 * content it adds, without reaching for Elementor's own entrance animations — which are ruled
 * out, perform rather than arrive, and would look nothing like the rest of the site.
 *
 * Three gestures and nothing else. settle (14px and a fade, for headings and rows), veil
 * (opacity only, for prose) and draw (a hairline growing from its left edge). Each fires once
 * and never reverses. The staggering stops at six beats by decision, so the step runs 0 to 5.
 *
 * The control writes two data attributes; assets/js/main.js does the rest, exactly as it does
 * for the attributes authored by hand in the markup. Nothing here knows about Elementor.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Reveal {

	public static function init() {
		/* The Advanced tab belongs to the "common" element, which every widget inherits, so one
		   registration covers widgets the firm adds as well as the six custom ones. */
		add_action( 'elementor/element/common/_section_style/after_section_end', array( __CLASS__, 'controls' ), 10, 2 );
		add_action( 'elementor/element/container/_section_style/after_section_end', array( __CLASS__, 'controls' ), 10, 2 );
		add_action( 'elementor/element/section/section_advanced/after_section_end', array( __CLASS__, 'controls' ), 10, 2 );

		add_action( 'elementor/frontend/before_render', array( __CLASS__, 'apply' ) );
	}

	/**
	 * @param \Elementor\Controls_Stack $element The element being built.
	 * @param array                     $args    Unused; part of the hook's signature.
	 */
	public static function controls( $element, $args ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter
		if ( ! class_exists( '\Elementor\Controls_Manager' ) ) {
			return;
		}

		$element->start_controls_section(
			'capiital_reveal_section',
			array(
				'label' => __( 'Reveal · Capiital', 'capiital-site' ),
				'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
			)
		);

		$element->add_control(
			'capiital_reveal_note',
			array(
				'type'            => \Elementor\Controls_Manager::RAW_HTML,
				'raw'             => __( 'The site\'s own motion. Use this rather than Elementor\'s Entrance Animation, which is not part of the design. Each gesture arrives once and never reverses.', 'capiital-site' ),
				'content_classes' => 'elementor-descriptor',
			)
		);

		$element->add_control(
			'capiital_reveal',
			array(
				'label'   => __( 'Reveal', 'capiital-site' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => '',
				'options' => array(
					''       => __( 'None', 'capiital-site' ),
					'settle' => __( 'Settle — rises 14px and fades in (headings, rows, cells)', 'capiital-site' ),
					'veil'   => __( 'Veil — fades in only (prose)', 'capiital-site' ),
					'draw'   => __( 'Draw — a hairline grows from its left edge (rules)', 'capiital-site' ),
				),
			)
		);

		$element->add_control(
			'capiital_reveal_step',
			array(
				'label'       => __( 'Step', 'capiital-site' ),
				'description' => __( 'Staggers a row: each step waits a further 90ms. Keep a run to six at most.', 'capiital-site' ),
				'type'        => \Elementor\Controls_Manager::NUMBER,
				'min'         => 0,
				'max'         => 5,
				'step'        => 1,
				'default'     => 0,
				'condition'   => array( 'capiital_reveal!' => '' ),
			)
		);

		$element->end_controls_section();
	}

	/**
	 * @param \Elementor\Element_Base $element The element about to render.
	 */
	public static function apply( $element ) {
		$settings = $element->get_settings_for_display();
		$variant  = isset( $settings['capiital_reveal'] ) ? $settings['capiital_reveal'] : '';
		if ( ! in_array( $variant, array( 'settle', 'veil', 'draw' ), true ) ) {
			return;
		}

		$attributes = array( 'data-reveal' => $variant );

		$step = isset( $settings['capiital_reveal_step'] ) ? (int) $settings['capiital_reveal_step'] : 0;
		if ( $step > 0 ) {
			$attributes['data-reveal-step'] = (string) min( 5, $step );
		}

		$element->add_render_attribute( '_wrapper', $attributes );
	}
}
