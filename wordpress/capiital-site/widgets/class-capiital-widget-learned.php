<?php
/**
 * Capiital · What we learned
 *
 * The pinned stage — the second sanctioned motion exception, and the one Elementor's own
 * Sticky effect cannot imitate: the left column holds at the header while the observations
 * travel past it at exactly the reader's scroll speed, releases flush with the foot of the
 * column, waits a third of a screen, then re-forms in place as a 2×2 grid.
 *
 * The observations are a repeater, and the heights are measured rather than set, so adding or
 * removing one simply works and still releases flush. spec/04 lists that as a requirement, not
 * a nicety.
 *
 * @package capiital-site
 */

defined( 'ABSPATH' ) || exit;

class Capiital_Widget_Learned extends Capiital_Widget_Base {

	public function get_name() {
		return 'capiital-learned';
	}

	public function get_title() {
		return __( 'Capiital · What we learned', 'capiital-site' );
	}

	private static function defaults() {
		return array(
			array(
				'title' => 'The monthly pack says more than the forecast',
				'body'  => "A month's reporting describes the two years ahead more accurately than the forecast filed beside it, and at a fraction of the effort.",
			),
			array(
				'title' => 'The work before an acceleration does not vary',
				'body'  => 'Before any period of growth, the same work comes first: agreeing which figures matter, then reporting them the same way each month until they can be relied upon.',
			),
			array(
				'title' => 'The quiet quarters matter most',
				'body'  => 'Value accrues in the seasons when no one is watching. What held in the second quarter is what makes the fourth defensible.',
			),
			array(
				'title' => 'Complexity outgrows its instruments',
				'body'  => 'A company seldom loses control of its business. It loses sight of it, which arrives at the same place by a longer and more expensive road.',
			),
		);
	}

	protected function register_controls() {
		$this->start_controls_section( 'head', array( 'label' => __( 'The pinned column', 'capiital-site' ) ) );
		$this->add_control( 'heading_line', array(
			'label'       => __( 'Heading', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'Having sat on',
			'label_block' => true,
		) );
		$this->add_control( 'accent_line', array(
			'label'       => __( 'Accent line', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'default'     => 'both sides of the table.',
			'label_block' => true,
		) );
		$this->add_control( 'standfirst', array(
			'label'   => __( 'Standfirst', 'capiital-site' ),
			'type'    => \Elementor\Controls_Manager::TEXTAREA,
			'rows'    => 4,
			'default' => 'We have prepared companies for scrutiny, and we have been the party applying it. The same small number of things holds true on both occasions. None of them is complicated, and none is ever dealt with as early as it could have been.',
		) );
		$this->end_controls_section();

		$this->start_controls_section( 'rail', array( 'label' => __( 'The observations', 'capiital-site' ) ) );

		$repeater = new \Elementor\Repeater();
		$repeater->add_control( 'title', array(
			'label'       => __( 'Observation', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::TEXT,
			'label_block' => true,
		) );
		$repeater->add_control( 'body', array(
			'label' => __( 'What it means', 'capiital-site' ),
			'type'  => \Elementor\Controls_Manager::TEXTAREA,
			'rows'  => 4,
		) );

		$this->add_control( 'observations', array(
			'label'       => __( 'Observations', 'capiital-site' ),
			'type'        => \Elementor\Controls_Manager::REPEATER,
			'fields'      => $repeater->get_controls(),
			'default'     => self::defaults(),
			'title_field' => '{{{ title }}}',
		) );

		$this->add_control( 'rail_note', array(
			'type'            => \Elementor\Controls_Manager::RAW_HTML,
			'raw'             => __( 'Add, remove or drag to reorder freely. The section measures its own length, so it still releases level with the foot of the left column.', 'capiital-site' ),
			'content_classes' => 'elementor-descriptor',
		) );

		$this->end_controls_section();
	}

	protected function render() {
		$s     = $this->get_settings_for_display();
		$rows  = ! empty( $s['observations'] ) ? $s['observations'] : self::defaults();
		$held  = ! $this->in_editor();
		$hooks = $held ? ' data-learned' : '';
		?>
		<section class="<?php echo esc_attr( $this->part_class( 'section section--learned on-sand' ) ); ?>" id="learned"<?php echo $hooks; // phpcs:ignore WordPress.Security.EscapeOutput ?>>
			<div class="learned-track"<?php echo $held ? ' data-learned-track' : ''; ?>>
				<div class="learned-stage"<?php echo $held ? ' data-learned-stage' : ''; ?>>
					<div class="wrap learned-grid">
						<div class="learned-pin"<?php echo $held ? ' data-learned-pin' : ''; ?>>
							<?php echo $this->heading( array( $s['heading_line'] ), $s['accent_line'], 'md' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							<p class="learned-standfirst"><?php echo esc_html( $s['standfirst'] ); ?></p>
						</div>
						<div class="learned-window"<?php echo $held ? ' data-learned-window' : ''; ?>>
							<div class="learned-rail"<?php echo $held ? ' data-learned-rail' : ''; ?>>
								<?php foreach ( $rows as $row ) : ?>
									<div class="learned-row">
										<div class="learned-rule" data-reveal="draw" data-reveal-threshold="0" data-reveal-margin="0px 0px -10% 0px"></div>
										<div class="learned-body" data-reveal="settle" data-reveal-threshold="0" data-reveal-margin="0px 0px -10% 0px">
											<h3 class="learned-body__title"><?php echo esc_html( $row['title'] ); ?></h3>
											<p class="learned-body__text"><?php echo esc_html( $row['body'] ); ?></p>
										</div>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<?php
	}
}
