window.CHERRYPICK = [
{
"rank": 1,
"tier": "top",
"cat": "bridge",
"sub": "bank",
"label": "Bridge / Bank / Bank \u00b7 Leaning Tower \u00b7 Mugs",
"id": "00010403",
"ends": {
"ref": [
"glass"
],
"tar": [
"ceramic"
]
},
"split": "test",
"dir": "media/cherrypick/interactions_bridge2_bank__leaning_tower__mugs_00010403_v0",
"caption": "Remove the light blue guide bar from the tabletop. The rolling steel ball now continues straight instead of deflecting, leaving the tower of blue glass blocks standing in silence. Instead, it crashes into the red ceramic mugs, producing ceramic clinks as they slide into the wooden barrier.",
"scores": {
"overall": 9,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 5,
"visual": 5,
"learnable": 5
},
"flags": [],
"why": "Blue guide bar sends ball into a cyan glass block tower that collapses; without it the ball rolls straight into red ceramic mugs. Distinct colours, materials and ringing.",
"moment": "Glass tower collapses versus ball sliding red mugs into the barrier.",
"final": "Blue bank bar sends the steel ball into a blue glass tower that topples; without it the ball hits ringing red ceramic mugs. Moment: tower falls versus mugs slide."
},
{
"rank": 2,
"tier": "top",
"cat": "guide",
"sub": "other_target",
"label": "Guide / Other Target / Splitter Pair Column",
"id": "00005014",
"ends": {
"ref": [
"ceramic"
],
"tar": [
"glass"
]
},
"split": "test",
"dir": "media/cherrypick/interactions_guide_splitter_pair_column_00005014_v0",
"caption": "Remove the blue triangular wedge from the center of the wooden platform. This causes the rolling steel ball to travel straight ahead, striking the red glass bowling pins on the left rather than deflecting into the white ceramic pins on the right, silencing the white pin impacts and introducing new glass clinking sounds.",
"scores": {
"overall": 9,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 5,
"learnable": 5
},
"flags": [],
"why": "Blue wedge sends the steel ball into white ceramic pins; without it red glass pins fall instead. Distinct colours and materials, one clear chain on each side.",
"moment": "Red glass pins topple on the left while the white pins stay standing.",
"final": "Blue wedge steers the steel ball into white ceramic pins; removed, it rolls straight into red glass pins. Show 0.83 s: white pins falling versus red glass toppling."
},
{
"rank": 9,
"tier": "top",
"cat": "guide",
"sub": "other_target",
"label": "Guide / Other Target / Curve Column Bottles",
"id": "00005008",
"ends": {
"ref": [
"glass"
],
"tar": [
"ceramic"
]
},
"split": "test",
"dir": "media/cherrypick/interactions_guide_curve_column_bottles_00005008_v0",
"caption": "Remove the lemon-yellow curved guide block. This causes the steel ball to roll straight instead of deflecting to the left. As a result, the blue glass pins remain untouched and silent, and the ball instead strikes the pale green ceramic bottles, causing them to clatter and knock against the wooden stop block.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 5,
"visual": 5,
"learnable": 5
},
"flags": [],
"why": "Yellow curve removed: steel ball topples pale ceramic bottles instead of dark blue glass pins. Both outcomes eventful, distinct colours and materials, clean ringing.",
"moment": "The blue glass pins stay standing; a pale green bottle tips over instead.",
"final": "Yellow curve sends the steel ball into blue glass pins; removed, it topples pale ceramic bottles instead. Show 1.07 s: blue pins down versus a bottle tipping."
},
{
"rank": 13,
"tier": "top",
"cat": "bowling_dominoes",
"sub": "other_target",
"label": "Bowling + Dominoes / Other Target / Bank Switch Rows",
"id": "00007003",
"ends": {
"ref": [
"glass",
"plastic"
],
"tar": [
"plastic"
]
},
"split": "test",
"dir": "media/cherrypick/interactions_hybrid_bank_switch_rows_00007003_v0",
"caption": "Remove the dark blue translucent glass block. This prevents the silver steel ball from deflecting off it. The ball now rolls straight across the wooden tray, missing the cyan glass pins and yellow dominoes on the left entirely. Instead, the ball rolls directly into the yellow plastic pin on the right, triggering a chain reaction that knocks over a yellow plastic domino and a yellow plastic bottle. The sharp glass impact sounds are completely replaced by duller plastic-on-plastic and plastic-on-wood impacts.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 3,
"learnable": 4
},
"flags": [
"cluttered"
],
"why": "Without the blue glass bank block the steel ball hits the yellow plastic pin group instead of the cyan glass pins at the back: designed rerouting, glass-to-plastic timbre change.",
"moment": "Ball deflects to the back glass pins in reference; rolls straight into yellow plastic pins in target.",
"final": "Vivid blue glass bank removed: the steel ball skips the cyan glass pins at the back and topples the front yellow plastic row; glass ringing becomes plastic clatter."
},
{
"rank": 14,
"tier": "top",
"cat": "collision",
"sub": "reroute",
"label": "Collision / Reroute",
"id": "00400529",
"ends": {
"ref": [
"brass"
],
"tar": [
"steel"
]
},
"split": "val",
"dir": "media/cherrypick/collision_reroute_00400529_v0",
"caption": "Remove the dark-grey bowl with a light interior from the scene, which eliminates its clattering collision sound with the sliding white plastic pail. Consequently, the white plastic pail slides uninterrupted across the polished wood floor until it strikes the hollow brown metal geosphere, producing a solid dull impact sound before both objects settle to rest.",
"scores": {
"overall": 9,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 5,
"visual": 5,
"learnable": 5
},
"flags": [],
"why": "Owner's example: bowl's rich ringing clatter replaced by the pail travelling on to strike the hollow geosphere; large, clear objects, one chain.",
"moment": "White pail glides past the missing bowl and knocks the bronze lattice sphere.",
"final": "The owner's model: the brass bowl's rich multi-impact ringing becomes the pail sliding on into the hollow geosphere's distinct ring. Large objects, one clear reroute."
},
{
"rank": 15,
"tier": "top",
"cat": "bridge",
"sub": "kicker",
"label": "Bridge / Kicker / Kicker \u00b7 Dominoes To Tower \u00b7 Domino Gate",
"id": "00010101",
"ends": {
"ref": [
"ceramic"
],
"tar": [
"polycarbonate"
]
},
"split": "val",
"dir": "media/cherrypick/interactions_bridge2_kicker__dominoes_to_tower__domino_gate_00010101_v0",
"caption": "Remove the pale green ceramic kicker wedge. The iron ball will no longer strike the wedge or deflect to the side to knock down the red ceramic dominoes and cubes. Instead, the ball falls straight down onto the concrete floor, rolling forward to collide with and collapse the semi-transparent polycarbonate gate, ending against the wooden fence.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [],
"why": "Kicker removal flips the outcome: red ceramic domino cascade vs. collapsing translucent gate with long ringing tones. Both eventful, distinct colours, clearly different soundtracks.",
"moment": "Red dominoes cascade in the reference; without the wedge the ball knocks down the white gate.",
"final": "Pale kicker wedge sends the iron ball into a red ceramic domino cascade; without it the ball collapses a white translucent gate with long ringing. Moment: cascade versus gate collapse."
},
{
"rank": 16,
"tier": "top",
"cat": "guide",
"sub": "other_target",
"label": "Guide / Other Target / Curve Pair Relay",
"id": "00005000",
"ends": {
"ref": [
"plastic"
],
"tar": [
"wood"
]
},
"split": "val",
"dir": "media/cherrypick/interactions_guide_curve_pair_relay_00005000_v0",
"caption": "Remove the light green curved plastic wedge. The teal ball now rolls straight instead of deflecting, leaving the white pins silent and stationary while initiating a cascade of falling wooden pins and blocks with dry, clattering wooden sounds.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [],
"why": "Clean target swap: the curve sends the ball into pale pins; without it, the ball triggers a wooden domino-and-pin relay. Different materials, many crisp new impacts, large objects.",
"moment": "Teal ball goes straight and knocks the wooden blocks and pins down in a row; white pins stay standing.",
"final": "Green curve sends the teal ball into white pins; removed, it starts a wooden pin and domino relay. Show 1.07 s: left relay collapsing, white pins standing."
},
{
"rank": 18,
"tier": "top",
"cat": "bridge",
"sub": "plug",
"label": "Bridge / Plug / Plug \u00b7 Pin Star \u00b7 Can Tower",
"id": "00010002",
"ends": {
"ref": [
"brass"
],
"tar": [
"plastic"
]
},
"split": "val",
"dir": "media/cherrypick/interactions_bridge2_plug__pin_star__can_tower_00010002_v0",
"caption": "Remove the rectangular brass block that bridges the gap in the wooden track. As a result, the steel ball falls into the open gap instead of reaching the golden bowling pins on the far platform. The ball rolls down a side chute and knocks down a tower of lime-green plastic cylinders, producing hollow plastic clitters and wooden thuds, while the golden bowling pins remain completely untouched and silent.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [],
"why": "Brass plug lets ball scatter golden metal pins with ringing; without it the ball falls down the chute and topples the tall green cylinder tower. Distinct materials and outcomes.",
"moment": "Gold pins scatter versus the lime-green tower collapsing below.",
"final": "Brass plug carries the ball onto the deck to scatter golden pins; without it the ball drops through the chute and topples the green cylinder tower. Moment: pins versus tower."
},
{
"rank": 20,
"tier": "top",
"cat": "bridge",
"sub": "roof",
"label": "Bridge / Roof / Roof \u00b7 Domino Arc \u00b7 Pin Row",
"id": "00010016",
"ends": {
"ref": [
"glass"
],
"tar": [
"brass"
]
},
"split": "test",
"dir": "media/cherrypick/interactions_bridge2_roof__domino_arc__pin_row_00010016_v0",
"caption": "Remove the light blue curved gutter from the scene. Without this ramp, the rolling brass ball falls directly onto the concrete floor instead of being channeled toward the red glass dominoes. This eliminates the sound of the ball sliding through the gutter and all subsequent glass clinking noises from the tumbling dominoes. Instead, the ball rolls forward to strike the brass bowling pins, introducing a sharp metallic collision sound followed by a wooden clack as a pin strikes the nearby block.",
"scores": {
"overall": 9,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 5,
"visual": 5,
"learnable": 4
},
"flags": [
"occluded_or_small"
],
"why": "Blue gutter guides brass ball into a red glass domino arc; without it the ball rolls into brass pins. Top view, distinct colours, glass cascade versus metallic ring.",
"moment": "Red domino arc falls versus brass pins struck.",
"final": "Blue gutter channels the brass ball into a red glass domino arc; without it the ball rolls left into brass pins. Top view; moment: arc topples versus pins ring."
},
{
"rank": 43,
"tier": "top",
"cat": "guide",
"sub": "other_target",
"label": "Guide / Other Target / Curve Pair Column",
"id": "00005006",
"ends": {
"ref": [
"glass"
],
"tar": [
"steel"
]
},
"split": "test",
"dir": "media/cherrypick/interactions_guide_curve_pair_column_00005006_v0",
"caption": "Remove the warm-yellow painted curved block. The glass ball now rolls straight forward off the wooden ramp rather than deflecting to the left. It misses the purple glass pins entirely and collides with the silver metallic pins on the right, knocking them over. The sounds of the deflection, the glass pins clinking, and the subsequent wooden thuds on the left are replaced by sharp metallic rings and a metallic-wooden thud on the right.",
"scores": {
"overall": 7,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 4,
"learnable": 5
},
"flags": [
"occluded_or_small"
],
"why": "Yellow curve removed: glass ball topples silver metal pins instead of purple glass pins; true flip with distinct materials, metallic rings versus glass clatter; ball is faint.",
"moment": "Purple glass pins stay up; a silver pin falls with a metallic ring.",
"final": "Yellow curve sends the glass ball into purple glass pins; removed, it topples silver steel pins instead. Show 1.03-1.37 s; the clear ball is faint."
},
{
"rank": 44,
"tier": "top",
"cat": "bridge",
"sub": "roof",
"label": "Bridge / Roof / Roof \u00b7 Domino Fork \u00b7 Vases",
"id": "00010005",
"ends": {
"ref": [
"glass"
],
"tar": [
"ceramic"
]
},
"split": "val",
"dir": "media/cherrypick/interactions_bridge2_roof__domino_fork__vases_00010005_v0",
"caption": "Remove the curved lilac channel bridge from the center of the scene. In its absence, the rolling silver sphere will no longer transition onto it or trigger the blue glass domino rally. Instead, the sphere will drop straight from the wooden spiral onto the floor, rolling forward to collide with and knock over the group of ceramic vases on the left, pushing them into the wooden block with a series of ceramic clattering and sliding sounds.",
"scores": {
"overall": 7,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [
"cluttered"
],
"why": "Lilac channel guides silver ball into blue glass dominoes; without it the ball drops and bowls into ceramic vases with strong ringing. Clear flip, vases slightly cluttered.",
"moment": "Blue dominoes fall versus ceramic vases knocked into the wooden block.",
"final": "Large lilac channel sends the silver ball into a blue glass domino fork; without it the ball bowls into the patterned ceramic vases. Moment: dominoes versus vases topple."
},
{
"rank": 51,
"tier": "spare",
"cat": "bridge",
"sub": "kicker",
"label": "Bridge / Kicker / Kicker \u00b7 Ball Cradle \u00b7 Pin Six",
"id": "00010013",
"ends": {
"ref": [
"iron"
],
"tar": [
"ceramic"
]
},
"split": "test",
"dir": "media/cherrypick/interactions_bridge2_kicker__ball_cradle__pin_six_00010013_v0",
"caption": "Remove the yellow plastic kicker from the scene. This prevents the iron ball from being deflected toward the wooden rails and the other metal spheres. Instead, the ball falls directly onto the stone floor and rolls straight ahead, crashing into the rack of ceramic pins and creating a noisy cascade of ceramic clatters and wooden thudding sounds as the pins scatter.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 5,
"visual": 4,
"learnable": 4
},
"flags": [],
"why": "Yellow kicker diverts iron ball into a ball cradle; without it the ball drops and smashes the ceramic pin rack. Largest sound distance in batch (7.4 dB), clean top view.",
"moment": "Ball cradle nudged versus the whole pin rack scattering.",
"final": "Yellow kicker diverts the iron ball into the ball cradle (quiet ending); without it the ball smashes the ceramic pin rack. Huge sound contrast, but the reference ending is mild."
},
{
"rank": 56,
"tier": "spare",
"cat": "guide",
"sub": "more_fall",
"label": "Guide / More Fall / Cup Shield Triangle",
"id": "00005010",
"ends": {
"ref": [
"painted"
],
"tar": [
"glass"
]
},
"split": "test",
"dir": "media/cherrypick/interactions_guide_cup_shield_triangle_00005010_v0",
"caption": "Remove the aqua-painted matte C-shaped guide from the center of the scene. The white glazed ceramic ball, instead of being redirected in a U-turn to hit the leftmost wooden block, now rolls straight across the stone floor to collide with the clear glass bowling pins. This replaces the dull plastic redirection sound and the subsequent soft wooden tap on the left with a series of sharp, bright glass clinks as the pins tumble, followed by hollow wooden knocks as the glass pins hit the rightmost wooden stop block.",
"scores": {
"overall": 7,
"causal": 4,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [
"occluded_or_small"
],
"why": "Large aqua cup turns the ball back with a rolling hum; without it the ball scatters clear glass pins with bright clinks. Readable overhead view, pins slightly faint.",
"moment": "Ball rolls straight across and the glass pins burst apart.",
"final": "Overhead: the large aqua cup turns the ball back; removed, it rolls on and scatters clear glass pins. Show 0.87-1.07 s; pins faint on dark stone."
},
{
"rank": 60,
"tier": "spare",
"cat": "bowling",
"sub": "other_target",
"label": "Bowling / Other Target / T Bone",
"id": "00008001",
"ends": {
"ref": [
"brass",
"ceramic"
],
"tar": [
"brass"
]
},
"split": "val",
"dir": "media/cherrypick/interactions_bowling_t_bone_00008001_v0",
"caption": "Remove the lower-left gold metallic sphere and its motion from the video. This prevents the initial sphere collision, allowing the remaining gold sphere to continue rolling straight and strike the gold metallic pins instead of being redirected toward the white ceramic pin. Remove the sound of the ball-to-ball impact and the subsequent ceramic pin clinks, replacing them with metallic pin-on-pin clinks and wood thuds.",
"scores": {
"overall": 7,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 3,
"learnable": 4
},
"flags": [
"occluded_or_small"
],
"why": "Removing the T-bone sphere sends the other ball straight into the gold metal pins instead of the white ceramic pin; distinct target materials, but the white pin is partly hidden.",
"moment": "Gold pins topple while the white ceramic pin stays standing: which pin falls reverses.",
"final": "Removing a moving ball: without the T-bone hit the ball runs into the gold pins instead of the white ceramic pin. Dark floor; the ceramic pin is half hidden."
}
];
