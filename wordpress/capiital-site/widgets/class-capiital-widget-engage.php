<?php
/**
 * Capiital · Where we engage
 *
 * The four stages of an ownership, and the held row — the third sanctioned motion exception.
 * The heading, the four names and the four lines are fields; the hold, the arrival order and
 * the hover logic are not.
 *
 * The four names are a fixed fact of the firm, repeated in the footer's first column and in
 * the archive's Stage taxonomy. spec/03 says to change all three together or not at all, so
 * an editor who renames one here should be told to rename it in both the others.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Widget_Engage extends Capiital_Widget_Base {

	public function get_name() {
		return 'capiital-engage';
	}

	public function get_title() {
		return __( 'Capiital · Where we engage', 'capiital-site' );
	}

	/** The four, with Erik's own one-line summaries. */
	private static function defaults() {
		return array(
			array(
				'numeral' => 'I',
				'title'   => 'Before a transaction',
				'line'    => 'Whether reported performance reflects the true quality of the business, established before an investment decision is made.',
			),
			array(
				'numeral' => 'II',
				'title'   => 'After a transaction',
				'line'    => 'The insight a new owner needs to steer value creation: strategy aligned, governance strengthened, priorities made clear.',
			),
			array(
				'numeral' => 'III',
				'title'   => 'During ownership',
				'line'    => 'Strategic control kept as the company grows faster than any one owner can oversee.',
			),
			array(
				'numeral' => 'IV',
				'title'   => 'Before exit',
				'line'    => 'A credible equity story and a stronger negotiating position, prepared well before the process begins.',
			),
		);
	}

	protected function register_controls() {
		$this->start_controls_section( 'head', array( 'label' => __( 'Heading', 'capiital-site' ) ) );
		$this->add_control( 'heading_line', array(
			'label'       => __( 'Heading', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'Each part of the process',
			'label_block' => true,
		) );
		$this->add_control( 'accent_line', array(
			'label'       => __( 'Accent line', 'capiital-site' ),
			'description' => __( 'Italic, in the accent. One line only, and never more than one.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'held to one standard.',
			'label_block' => true,
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'stages', array( 'label' => __( 'The stages', 'capiital-site' ) ) );

		$repeater = new \Elementor\Repeater();
		$repeater->add_control( 'numeral', array(
			'label'   => __( 'Numeral', 'capiital-site' ),
			'type'    => \Elementor\Controls_Manager::TEXT,
			'default' => 'I',
		) );
		$repeater->add_control( 'title', array(
			'label'       => __( 'Stage', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'label_block' => true,
		) );
		$repeater->add_control( 'line', array(
			'label'       => __( 'What it involves', 'capiital-site' ),
			'description' => __( 'One sentence. It is shown when the stage is rested on, and at all times on a phone.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXTAREA,
			'rows'        => 3,
		) );
		$repeater->add_control( 'image', array(
			'label'       => __( 'Photograph', 'capiital-site' ),
			'description' => __( 'Shown at 3:2 below the title. A placeholder stands here until one is set.', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::MEDIA,
		) );

		$this->add_control( 'stages', array(
			'label'       => __( 'Stages', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::REPEATER,
			'fields'      => $repeater->get_controls(),
			'default'     => self::defaults(),
			'title_field' => '{{{ numeral }}} · {{{ title }}}',
		) );

		$this->add_control( 'stages_note', array(
			'type'            => \Elementor\Controls_Manager::RAW_HTML,
			'raw'             => __( 'These four names also appear in the footer\'s first column and as the archive\'s Stage terms. Rename one here and rename it in both of those, or the three stop agreeing.', 'capiital-site' ),
			'content_classes' => 'elementor-descriptor',
		) );

		$this->end_controls_section();
	}

	protected function render() {
		$s      = $this->get_settings_for_display();
		$stages = ! empty( $s['stages'] ) ? $s['stages'] : self::defaults();
		$label  = $this->t( 'Photograph to follow', 'Fotografi følger' );
		/* Held sections are unusable in the editor: the stage sticks and nothing can be
		   clicked. There, and on a phone, all four simply arrive together. */
		$held   = ! $this->in_editor();
		?>
		<section class="<?php echo esc_attr( $this->part_class( 'section section--engage on-sand' ) ); ?>" id="services">
			<div class="wrap svc-track"<?php echo $held ? ' data-svc-track' : ''; ?>>
				<div class="svc-stage"<?php echo $held ? ' data-svc-stage' : ''; ?>>
					<div class="svc-head"<?php echo $this->reveal( 'settle' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>>
						<?php echo $this->heading( array( $s['heading_line'] ), $s['accent_line'], 'md' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</div>
					<div class="svc-grid"<?php echo $held ? ' data-svc-grid' : ''; ?>>
						<?php foreach ( $stages as $stage ) : ?>
							<div class="svc-q<?php echo $held ? '' : ' is-here'; ?>" tabindex="<?php echo $held ? '-1' : '0'; ?>">
								<span class="svc-q__numeral"><?php echo esc_html( $stage['numeral'] ); ?></span>
								<div class="svc-in">
									<h3 class="svc-q__title"><?php echo esc_html( $stage['title'] ); ?></h3>
									<?php
									echo $this->placeholder( // phpcs:ignore WordPress.Security.EscapeOutput
										isset( $stage['image'] ) ? $stage['image'] : array(),
										'ph--3x2',
										$label,
										$stage['title']
									);
									?>
									<p class="svc-line"><?php echo esc_html( $stage['line'] ); ?></p>
								</div>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			</div>
		</section>
		<?php
	}
}
