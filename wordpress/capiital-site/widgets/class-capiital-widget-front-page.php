<?php
/**
 * Capiital · Front page
 *
 * The three headline lines and the standfirst are fields; the skyline band, the wash arriving
 * and the entry timing are not. The lines are three separate fields on purpose — spec/02 asks
 * for it — so that an editor cannot merge them into one and lose the break the headline is
 * written around.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Widget_Front_Page extends Capiital_Widget_Base {

	public function get_name() {
		return 'capiital-front-page';
	}

	public function get_title() {
		return __( 'Capiital · Front page', 'capiital-site' );
	}

	protected function register_controls() {
		$this->start_controls_section( 'content', array(
			'label' => __( 'Headline', 'capiital-site' ),
		) );

		$this->add_control( 'line_1', array(
			'label'       => __( 'Line 1', 'capiital-site' ),
			'description' => __( 'Ink. The first line has never carried the accent, and should not.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'Nordic M&A advisory',
			'label_block' => true,
		) );
		$this->add_control( 'line_2', array(
			'label'       => __( 'Line 2', 'capiital-site' ),
			'description' => __( 'Italic, in the accent.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'for companies',
			'label_block' => true,
		) );
		$this->add_control( 'line_3', array(
			'label'       => __( 'Line 3', 'capiital-site' ),
			'description' => __( 'Italic, in the accent.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'meant to endure.',
			'label_block' => true,
		) );
		$this->add_control( 'standfirst', array(
			'label'   => __( 'Standfirst', 'capiital-site' ),
			'type'    => \Elementor\Controls_Manager::TEXTAREA,
			'rows'    => 3,
			'default' => 'We advise Nordic companies and their investors, at home or abroad, on one principle: whoever accepts the mandate sees it to its end.',
		) );

		$this->end_controls_section();

		$this->start_controls_section( 'band', array(
			'label' => __( 'The skyline band', 'capiital-site' ),
		) );
		$this->add_control( 'skyline', array(
			'label'       => __( 'Photograph', 'capiital-site' ),
			'description' => __( 'Leave empty to use the theme\'s own. It is blurred past recognition and dissolves along a straight horizontal edge; do not replace it with a sharper skyline without the firm\'s say.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::MEDIA,
		) );
		$this->end_controls_section();
	}

	protected function render() {
		$s   = $this->get_settings_for_display();
		$sky = ! empty( $s['skyline']['url'] )
			? ' style="background-image:url(' . esc_url( $s['skyline']['url'] ) . ')"'
			: '';
		?>
		<section class="<?php echo esc_attr( $this->part_class( 'front on-sand' ) ); ?>" id="top">
			<div class="front-sky" aria-hidden="true">
				<div class="front-sky-img"<?php echo $sky; // phpcs:ignore WordPress.Security.EscapeOutput ?>></div>
				<div class="front-veil"></div>
			</div>
			<div class="front__text">
				<div class="wrap">
					<h1 class="front__title animate-rise">
						<?php echo esc_html( $s['line_1'] ); ?><br>
						<span class="front__accent"><?php
							echo esc_html( $s['line_2'] );
						?><br><?php
							echo esc_html( $s['line_3'] );
						?></span>
					</h1>
					<p class="front__standfirst animate-rise"><?php echo esc_html( $s['standfirst'] ); ?></p>
				</div>
			</div>
		</section>
		<?php
	}
}
