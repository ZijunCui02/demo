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
"shortlist": true,
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
"final": "Blue bank bar sends the steel ball into a blue glass tower that topples; without it the ball hits ringing red ceramic mugs. Moment: tower falls versus mugs slide.",
"amask": true
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
"shortlist": true,
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
"final": "Blue wedge steers the steel ball into white ceramic pins; removed, it rolls straight into red glass pins. Show 0.83 s: white pins falling versus red glass toppling.",
"amask": true
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
"shortlist": true,
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
"final": "Yellow curve sends the steel ball into blue glass pins; removed, it topples pale ceramic bottles instead. Show 1.07 s: blue pins down versus a bottle tipping.",
"amask": true
},
{
"rank": 12,
"tier": "top",
"cat": "bowling",
"sub": "other_target",
"label": "Bowling / Other Target / Can Redirector",
"id": "00005001",
"ends": {
"ref": [
"brass",
"plastic"
],
"tar": [
"brass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_bowling_can_redirector_00005001_v0",
"caption": "Remove the heavy brass cylinder. Instead of the ball striking the cylinder and deflecting to knock over three blue plastic pins with a loud plastic clatter, the ball rolls straight to hit a single gold brass pin with a ringing metallic sound, sending it sliding into the wooden tray boundary.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 4,
"learnable": 5
},
"flags": [],
"why": "Brass can redirects the ball into three blue plastic pins; removed, the ball rolls straight into a lone brass pin. Different materials make picture and sound change distinctly.",
"moment": "The blue pins stay standing while the gold pin tips over with a ringing metallic clang.",
"final": "Brass can deflects the ball into three blue plastic pins that topple; removed, the ball topples the lone gold pin. Plastic clatter versus brass ring, vivid colours.",
"amask": true
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
"shortlist": true,
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
"final": "Vivid blue glass bank removed: the steel ball skips the cyan glass pins at the back and topples the front yellow plastic row; glass ringing becomes plastic clatter.",
"amask": true
},
{
"rank": 14,
"tier": "top",
"cat": "collision",
"sub": "reroute",
"label": "Collision / Reroute \u00b7 brass look (teaser version)",
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
"shortlist": true,
"dir": "media/cherrypick/collision_reroute_00400529_v0",
"caption": "Remove the polished brass bowl from the scene, which eliminates its clattering collision sound with the sliding white plastic pail. Consequently, the white plastic pail slides uninterrupted across the polished wood floor until it strikes the hollow brown metal geosphere, producing a solid dull impact sound before both objects settle to rest.",
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
"final": "The owner's model: the brass bowl's rich multi-impact ringing becomes the pail sliding on into the hollow geosphere's distinct ring. Large objects, one clear reroute.",
"amask": true
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
"shortlist": true,
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
"final": "Pale kicker wedge sends the iron ball into a red ceramic domino cascade; without it the ball collapses a white translucent gate with long ringing. Moment: cascade versus gate collapse.",
"amask": true
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
"shortlist": true,
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
"final": "Green curve sends the teal ball into white pins; removed, it starts a wooden pin and domino relay. Show 1.07 s: left relay collapsing, white pins standing.",
"amask": true
},
{
"rank": 17,
"tier": "top",
"cat": "dominoes",
"sub": "more_fall",
"label": "Dominoes / More Fall / Wall Pillar",
"id": "00005004",
"ends": {
"ref": [
"wood"
],
"tar": [
"polycarbonate"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_chain_wall_pillar_00005004_v0",
"caption": "Remove the laminated wooden block. This allows the falling tan wooden cylinder to fall completely instead of leaning, knocking down the transparent polycarbonate blocks behind it and creating new clinking and tapping sounds as they fall flat.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 4,
"learnable": 5
},
"flags": [],
"why": "Laminated wooden blocker removed: the wooden cylinder topples on into clear polycarbonate blocks. Chain continues into a new material with new ringing clinks; ref is silent after 0.5 s.",
"moment": "Wooden cylinder now falls into the clear blocks, which topple with bright ringing clinks.",
"final": "Wooden chain stops at the laminated block, or the cylinder topples into clear polycarbonate blocks with ringing clinks after silence. Show 0.8-1.3 s, clear blocks flipping flat.",
"amask": true
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
"shortlist": true,
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
"final": "Brass plug carries the ball onto the deck to scatter golden pins; without it the ball drops through the chute and topples the green cylinder tower. Moment: pins versus tower.",
"amask": true
},
{
"rank": 19,
"tier": "top",
"cat": "guide",
"sub": "other_target",
"label": "Guide / Other Target / Prism Column Triangle",
"id": "00005014",
"ends": {
"ref": [
"glass"
],
"tar": [
"brass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_guide_prism_column_triangle_00005014_v0",
"caption": "Remove the lilac triangular prism block. The rusted steel ball now rolls straight down the ramp instead of deflecting, completely avoiding the transparent glass pins. It instead collides with the brushed gold brass pins, scattering them with bright metallic clinking sounds, and one pin hits the wooden stop.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 5,
"visual": 4,
"learnable": 5
},
"flags": [
"occluded_or_small"
],
"why": "Lilac prism removed: ball skips the glass pins and scatters the gold brass pins. Distinct materials (glass versus brass), both sides eventful, bright metallic ringing.",
"moment": "Gold brass pins fly apart instead of the glass pins being clinked.",
"final": "Lilac prism steers the ball into clear glass pins; removed, it scatters brass pins with bright ringing. Show 0.97-1.2 s: gold pins flying, glass pins untouched.",
"amask": true
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
"shortlist": true,
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
"final": "Blue gutter channels the brass ball into a red glass domino arc; without it the ball rolls left into brass pins. Top view; moment: arc topples versus pins ring.",
"amask": true
},
{
"rank": 21,
"tier": "top",
"cat": "guide",
"sub": "other_target",
"label": "Guide / Other Target / Bevel Cans Relay Bottle",
"id": "00005000",
"ends": {
"ref": [
"wood"
],
"tar": [
"plastic"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_guide_bevel_cans_relay_bottle_00005000_v0",
"caption": "Remove the beveled wooden guide block. This causes the rolling ceramic ball to travel straight ahead rather than deflecting to the left. The wooden cylinders on the left remain completely still and silent. Instead, the ball knocks over the black plastic bowling pin, which topples the black dominoes and the black bottle onto the cork stop block on the right. Replace the wooden clattering sounds with a series of plastic clicks and a final soft thud.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [],
"why": "Bevel removal flips the target: instead of wooden cylinders toppling, the ball fells a black pin, domino and bottle onto the cork block; wood clacks become ringing clatter.",
"moment": "Ball rolls straight past the missing bevel and topples the black pin, domino and bottle instead of the cylinders.",
"final": "Wooden bevel turns the ball into oak cylinders; without it, the ball fells a black pin, dominoes and bottle. Show 1.07-1.3 s: black row collapsing, cylinders still.",
"amask": true
},
{
"rank": 24,
"tier": "top",
"cat": "falling",
"sub": "solo_reroute",
"label": "Falling / Solo Reroute",
"id": "00002020",
"ends": {
"ref": [
"brass"
],
"tar": [
"plastic"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/falling_solo_reroute_00002020",
"caption": "Remove the brass bowl, causing the falling case to land directly on the tote. Replace the metallic bowl and floor impacts with a single hollow tote impact.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 5,
"learnable": 4
},
"flags": [],
"why": "Falling case hits a brass bowl on the tote and tumbles to the floor; without the bowl it lands stacked on the tote. Rich bowl ringing versus one hollow impact.",
"moment": "The case lands neatly stacked on the tote instead of tumbling off beside it.",
"final": "Case strikes the ringing brass bowl and tumbles onto the sand; without the bowl it lands stacked on the tote with one hollow knock. Large, clear objects.",
"amask": true
},
{
"rank": 27,
"tier": "top",
"cat": "dominoes",
"sub": "more_fall",
"label": "Dominoes / More Fall / Bottle Backstop",
"id": "00005005",
"ends": {
"ref": [
"iron"
],
"tar": [
"glass",
"iron"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_chain_bottle_backstop_00005005_v0",
"caption": "Remove the rough grey rectangular block from the table. This removal allows the fourth white rectangular slab to fall completely flat onto the surface instead of leaning upright. As it falls, it strikes the green transparent glass bottle, knocking it over so that it rolls to the right. The audio changes as the leaning impact sound is replaced by the thuds of the slabs hitting the table and the sharp clinking sound of the bottle being knocked over and rolling.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 3,
"learnable": 4
},
"flags": [],
"why": "Removing the grey backstop lets the white slabs fall flat and knock the green glass bottle over; it rolls away. New target, new material, many added impacts.",
"moment": "Slabs topple through the gap and the green bottle tips over and rolls right.",
"final": "Grey block removed: white slabs fall flat and knock the green glass bottle over; it rolls away instead of standing. Very readable. Show 0.5-1.1 s, bottle tipping and rolling.",
"amask": true
},
{
"rank": 29,
"tier": "top",
"cat": "guide",
"sub": "more_fall",
"label": "Guide / More Fall / Curve Shield Triangle",
"id": "00005013",
"ends": {
"ref": [
"painted"
],
"tar": [
"glass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_guide_curve_shield_triangle_00005013_v0",
"caption": "Remove the lilac curved block. The red ball now rolls straight to strike the blue glass pins, which fall and clatter, instead of deflecting to hit a wooden block. The sound changes from a quiet clink and thud to sharp glass collisions and floor clattering.",
"scores": {
"overall": 7,
"causal": 4,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 5,
"learnable": 5
},
"flags": [],
"why": "Lilac curve removed: red ball strikes blue glass pins instead of nudging a block; vivid colours, ringing glass clatter replaces a rolling hum and one thud.",
"moment": "Blue glass pins scatter under the red ball where before they stayed untouched.",
"final": "Lilac curve diverts the red ball to a quiet nudge; removed, it hits the blue glass pins head-on. Show 0.7 s: pins scattering versus pins standing.",
"amask": true
},
{
"rank": 31,
"tier": "top",
"cat": "bowling_dominoes",
"sub": "more_fall",
"label": "Bowling + Dominoes / More Fall / Guard Hook Bottle",
"id": "00008002",
"ends": {
"ref": [
"ceramic"
],
"tar": [
"ceramic",
"glass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_hybrid_guard_hook_bottle_00008002_v0",
"caption": "Remove the beige ceramic guard block from the path of the steel ball. This allows the ball to continue rolling and strike the pale green ceramic bowling pin, initiating a cascading chain reaction where the red glass dominoes and the red glass bottle are knocked over. The single, isolated clinking sound of the ball hitting the block is replaced by a long, rich sequence of glass clatters, ceramic impacts, and wooden taps.",
"scores": {
"overall": 8,
"causal": 4,
"sound_contrast": 5,
"sound_quality": 5,
"visual": 4,
"learnable": 4
},
"flags": [],
"why": "Ceramic guard block stops the steel ball; removing it lets the ball hit the ceramic pin, toppling red glass dominoes and bottle. Designed guard; near silence becomes rich glass ringing.",
"moment": "Ball stops dead at the guard in reference; red glass dominoes cascade around the hook in target.",
"final": "Ceramic guard removed: the steel ball fells the pale pin and the red glass hook of dominoes and bottle topples. Silence versus rich glass ringing.",
"amask": true
},
{
"rank": 33,
"tier": "top",
"cat": "bridge",
"sub": "kicker",
"label": "Bridge / Kicker / Kicker \u00b7 Domino Growth \u00b7 Block Tower3",
"id": "00010010",
"ends": {
"ref": [
"plastic"
],
"tar": [
"glass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_bridge2_kicker__domino_growth__block_tower3_00010010_v1",
"caption": "Remove the blue plastic kicker situated near the exit of the wooden spiral ramp. Now, instead of deflecting off the kicker to knock down the black dominoes, the brass ball flies directly onto the floor and rolls forward to crash into the stack of red glass cubes. The plastic clacking of the tumbling dominoes is replaced by the bright clinking sounds of red glass cubes scattering on the floor and hitting the wooden barrier.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [
"occluded_or_small"
],
"why": "Large blue kicker removed: brass ball no longer topples the black dominoes but crashes into a stack of red glass cubes; distinct colours and materials, both outcomes eventful.",
"moment": "Black dominoes fall with the kicker; without it red glass cubes scatter in the tray.",
"final": "Blue kicker block deflects the brass ball into black dominoes; without it the ball crashes into the red glass cube stack. Top view; moment: dominoes fall versus cubes scatter.",
"amask": true
},
{
"rank": 34,
"tier": "top",
"cat": "guide",
"sub": "more_fall",
"label": "Guide / More Fall / Curve Shield Relay Bottle",
"id": "00005009",
"ends": {
"ref": [
"brass"
],
"tar": [
"brass",
"glass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_guide_curve_shield_relay_bottle_00005009_v0",
"caption": "Remove the curved brass wedge. The ball will now roll straight instead of deflecting left, hitting the brass bowling pin and toppling the red glass dominos and red glass bottle into the wooden stop block, replacing a single deflection scrap with multiple glassy clinks.",
"scores": {
"overall": 8,
"causal": 4,
"sound_contrast": 5,
"sound_quality": 5,
"visual": 4,
"learnable": 4
},
"flags": [],
"why": "Without the wedge the ball strikes a brass pin that topples red glass dominoes and a red bottle; the reference is one scrape. Huge contrast, rich glassy ringing.",
"moment": "Red glass dominoes and bottle crash down in a glassy cascade where nothing happened before.",
"final": "Brass curve parks the steel ball; removed, it fells a brass pin, red glass dominoes and bottle in a ringing crash. Show 1.3 s: red glass collapsing versus stillness.",
"amask": true
},
{
"rank": 40,
"tier": "top",
"cat": "bridge",
"sub": "plank",
"label": "Bridge / Plank / Plank Bottles Triangle",
"id": "00010003",
"ends": {
"ref": [
"ceramic"
],
"tar": [
"glass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_bridge2_plank_bottles_triangle_00010003_v0",
"caption": "Remove the beige ceramic plank that bridges the wooden ramp to the glass table. In the modified scene, the rolling steel ball must no longer cross over to the glass table; instead, it falls through the gap to hit the wooden floor below and rolls into a set of blue glass bowling pins. Remove all the clinking and scraping sound effects of the ceramic bottles and the glass table, replacing them with a dull thud as the ball lands on the floor and high-pitched glass clinks as it scatters the bowling pins.",
"scores": {
"overall": 7,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [],
"why": "Ceramic plank removal: steel ball skips the navy ceramic bottles on the glass table and scatters teal glass pins in the floor tray; distinct colours, ringing glass clinks.",
"moment": "Navy bottles wobble on the table versus teal glass pins scattering in the tray.",
"final": "Plank carries the steel ball onto the glass table into navy ceramic bottles; without it the ball drops and scatters teal glass pins in the tray. Moment: bottles versus pins.",
"amask": true
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
"shortlist": true,
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
"final": "Yellow curve sends the glass ball into purple glass pins; removed, it topples silver steel pins instead. Show 1.03-1.37 s; the clear ball is faint.",
"amask": true
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
"shortlist": true,
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
"final": "Large lilac channel sends the silver ball into a blue glass domino fork; without it the ball bowls into the patterned ceramic vases. Moment: dominoes versus vases topple.",
"amask": true
},
{
"rank": 45,
"tier": "top",
"cat": "guide",
"sub": "more_fall",
"label": "Guide / More Fall / Plug Block Chain",
"id": "00005014",
"ends": {
"ref": [
"painted"
],
"tar": [
"ceramic",
"polycarbonate"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_guide_plug_block_chain_00005014_v0",
"caption": "Remove the yellow curved block. The red ceramic ball now rolls forward to strike the off-white ball, knocking over the polycarbonate pins into the cork block, replacing the single thud with ceramic clinks and plastic clattering.",
"scores": {
"overall": 7,
"causal": 4,
"sound_contrast": 4,
"sound_quality": 5,
"visual": 5,
"learnable": 5
},
"flags": [],
"why": "Lime plug removed: red ball no longer stops dead; it relays through the white ball into clear pins with long ringing tails. Clean, colourful, short chain.",
"moment": "Red ball pushes the white ball, which knocks the clear pins into the cork block.",
"final": "Lime plug stops the red ball; removed, it relays through the white ball into clear pins with long ringing tails. Show 0.8-1.03 s: pins toppling onto the cork block.",
"amask": true
},
{
"rank": 47,
"tier": "top",
"cat": "bowling_dominoes",
"sub": "other_target",
"label": "Bowling + Dominoes / Other Target / Bank Switch Rows",
"id": "00007002",
"ends": {
"ref": [
"plastic",
"wood"
],
"tar": [
"plastic"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_hybrid_bank_switch_rows_00007002_v0",
"caption": "Remove the rectangular wooden block. Now, the red glass ball rolls straight across the dark surface without deflecting, bypassing the wooden pin on the left entirely. Instead of the wooden chain reaction, the ball strikes a black plastic pin in the back, which topples a black plastic domino and knocks over a tall black bottle against the wooden tray, producing plastic clacks and thuds instead of wooden impacts.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 3,
"learnable": 4
},
"flags": [
"camera_awkward"
],
"why": "Without the wooden bank block the red glass ball hits the black bottles instead of the wooden pins: designed rerouting, distinct targets and timbres; dark objects read less well.",
"moment": "Ball veers left into wooden pins in reference, rolls straight into black bottles in target.",
"final": "Bank switch: without the wooden block the red glass ball reaches the black bottles at the back instead of the wooden pins. Strong reroute, dark objects read less well.",
"amask": true
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
"shortlist": true,
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
"final": "Yellow kicker diverts the iron ball into the ball cradle (quiet ending); without it the ball smashes the ceramic pin rack. Huge sound contrast, but the reference ending is mild.",
"amask": true
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
"shortlist": true,
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
"final": "Overhead: the large aqua cup turns the ball back; removed, it rolls on and scatters clear glass pins. Show 0.87-1.07 s; pins faint on dark stone.",
"amask": true
},
{
"rank": 58,
"tier": "spare",
"cat": "bridge",
"sub": "catch",
"label": "Bridge / Catch / Catch Triangle Bottles",
"id": "00010002",
"ends": {
"ref": [
"ceramic"
],
"tar": [
"glass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_bridge2_catch_triangle_bottles_00010002_v0",
"caption": "Remove the red ceramic shelf. Now, the black steel ball rolls down the wooden slope but falls past the empty space to land on the stone floor with a metallic clink. It rolls under the glass table instead of onto it, colliding with the red glass bottles rather than the white ceramic bowling pins, replacing all the glass tabletop pin collisions with glass bottle rolling and clinking sounds on the floor.",
"scores": {
"overall": 7,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [
"occluded_or_small"
],
"why": "Clear catch flip: ball crosses the red shelf to scatter white pins on the glass table, or falls and knocks red bottles below; distinct colours and timing.",
"moment": "White pins on the table stay up; red bottles on the floor topple instead.",
"final": "Red shelf carries the black ball onto the glass table to scatter white pins; without it the ball knocks red glass bottles, partly behind the table legs.",
"amask": true
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
"shortlist": true,
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
"final": "Removing a moving ball: without the T-bone hit the ball runs into the gold pins instead of the white ceramic pin. Dark floor; the ceramic pin is half hidden.",
"amask": true
},
{
"rank": 62,
"tier": "spare",
"cat": "bridge",
"sub": "plug",
"label": "Bridge / Plug / Plug \u00b7 Tray Pins \u00b7 Block Tower4",
"id": "00010002",
"ends": {
"ref": [
"brass",
"wood"
],
"tar": [
"ceramic"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_bridge2_plug__tray_pins__block_tower4_00010002_v0",
"caption": "Remove the polished brass triangular bridge block that fills the gap in the wooden runway. As a result, the dark blued steel ball, instead of rolling across to strike the elevated wooden base and tipping the two brass pins, drops into the open chasm, rolls out through the side chute, and knocks over the tower of four white ceramic blocks with a sharp, multi-piece ceramic clatter.",
"scores": {
"overall": 7,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 5,
"learnable": 5
},
"flags": [
"occluded_or_small"
],
"why": "Very readable: the brass plug carries the ball to tip brass pins; without it the ball exits the chute and topples a white ceramic tower; different materials.",
"moment": "White ceramic block tower collapses beside the chute while the brass pins stay up.",
"final": "Brass plug lets the ball tip brass pins on the deck; without it the ball exits the chute and topples a white ceramic tower. All-tan scene, plug hard to see.",
"amask": true
},
{
"rank": 63,
"tier": "spare",
"cat": "guide",
"sub": "more_fall",
"label": "Guide / More Fall / Plug Block Relay",
"id": "00005008",
"ends": {
"ref": [
"ceramic"
],
"tar": [
"ceramic",
"glass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_guide_plug_block_relay_00005008_v0",
"caption": "Remove the curved gray ceramic block. This allows the rolling brass ball to pass through, causing it to strike the first black ceramic pin, which then knocks over the glass blocks and the second pin, creating a sequence of toppling and sliding sounds instead of the single early metallic clink.",
"scores": {
"overall": 7,
"causal": 4,
"sound_contrast": 5,
"sound_quality": 5,
"visual": 4,
"learnable": 4
},
"flags": [
"occluded_or_small"
],
"why": "Gray block stops the brass ball; removing it releases a pin, red glass dominoes and a second pin, a ringing cascade versus one clink. Vivid, though the chain is busy.",
"moment": "Black pin falls into the red glass dominoes, which topple the second pin.",
"final": "Gray block stops the brass ball; removed, a black pin, red glass dominoes and a second pin fall. Show 0.6-1.03 s; objects small, chain busy.",
"amask": true
},
{
"rank": 64,
"tier": "spare",
"cat": "bridge",
"sub": "kicker",
"label": "Bridge / Kicker / Kicker \u00b7 Bank Shot \u00b7 Cube To Pins",
"id": "00010308",
"ends": {
"ref": [
"steel"
],
"tar": [
"wood"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_bridge2_kicker__bank_shot__cube_to_pins_00010308_v0",
"caption": "Remove the white curved channel situated beneath the wooden spiral ramp. Instead of sliding through the channel and rolling to strike the metallic pins on the right, the green glass ball now drops directly onto the granite floor and rolls leftward to strike a wooden block and tip over the wooden bowling pins. Replace the bright clinking sounds of the metallic pins with the soft click of the ball hitting the floor and the subsequent hollow wooden clattering sounds of the wooden pins tipping over.",
"scores": {
"overall": 7,
"causal": 5,
"sound_contrast": 4,
"sound_quality": 4,
"visual": 4,
"learnable": 4
},
"flags": [
"occluded_or_small"
],
"why": "White channel sends green glass ball right into metallic pins with ringing; without it the ball drops and rolls left into wooden pins. Clean left/right flip, metal versus wood timbre.",
"moment": "Ball exits right into steel pins versus rolling left to topple wooden pins.",
"final": "White channel sends the green glass ball right into ringing steel pins; without it the ball rolls left into wooden pins. Clean flip, but small objects.",
"amask": true
},
{
"rank": 65,
"tier": "spare",
"cat": "guide",
"sub": "other_target",
"label": "Guide / Other Target / Prism Pair Column",
"id": "00005012",
"ends": {
"ref": [
"brass"
],
"tar": [
"glass"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_guide_prism_pair_column_00005012_v0",
"caption": "Remove the triangular brass guide block from the center. This causes the steel ball to roll straight ahead instead of deflecting, colliding with the glass bowling pins and knocking them over instead of the brass bowling pins, replacing the metallic clacking sounds with glass clinks.",
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
"why": "True material swap: brass pins tumble in the reference, clear glass pins in the target. Distinct timbres, but the transparent glass pins are small and faint.",
"moment": "Steel ball goes straight into the glass pins while the brass pins stay standing.",
"final": "Brass prism sends the ball into copper pins that scatter widely; removed, clear glass pins tip instead. Show 0.73-1.0 s; glass pins faint.",
"amask": true
},
{
"rank": 66,
"tier": "spare",
"cat": "bowling",
"sub": "more_fall",
"label": "Bowling / More Fall / Guard",
"id": "00005003",
"ends": {
"ref": [
"painted"
],
"tar": [
"wood"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/interactions_bowling_guard_00005003_v0",
"caption": "Remove the emerald green block from the path of the bowling ball. Instead of hitting the block and stopping, the violet purple bowling ball rolls onward and crashes into the golden yellow bowling pins, scattering them in a series of clattering impacts. The audio shifts from a single, isolated clack of the block to a cascading sequence of multiple wooden pin-on-pin and pin-on-tray clattering sounds.",
"scores": {
"overall": 7,
"causal": 4,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 5,
"learnable": 4
},
"flags": [
"subtractive_only",
"too_chaotic"
],
"why": "Guard removal turns a dead stop at the green block into a full strike on the yellow pin rack; huge sound and visual contrast, though only additive.",
"moment": "Purple ball smashes the yellow pin rack instead of stopping at the green block.",
"final": "Most readable edit: green guard stops the ball dead; removed, a full strike on the yellow pins. But one side is uneventful and the strike is a pile-up.",
"amask": true
},
{
"rank": 69,
"tier": "spare",
"cat": "collision",
"sub": "reroute",
"label": "Collision / Reroute",
"id": "00400044",
"ends": {
"ref": [
"steel"
],
"tar": [
"plastic"
]
},
"split": "val",
"shortlist": false,
"dir": "media/cherrypick/collision_reroute_00400044_v0",
"caption": "Remove the bronze steel geosphere from the scene. The pumpkin, instead of colliding with the geosphere and causing a metallic clink and a subsequent floor tap, now rolls directly down-left into the orange-and-black plastic power drill, creating a new dull organic-on-plastic bump sound upon impact.",
"scores": {
"overall": 8,
"causal": 5,
"sound_contrast": 5,
"sound_quality": 4,
"visual": 4,
"learnable": 5
},
"flags": [
"occluded_or_small"
],
"why": "Pumpkin hits the hollow bronze geosphere with rich ringing vs rolls on into the power drill with a different tonal knock; clean reroute like the owner's example.",
"moment": "Pumpkin rings the metal geosphere vs rolls on and knocks the drill.",
"final": "Pumpkin's bouncing bright geosphere ring becomes a tonal knock on the power drill. Clean reroute and two good sounds, but the pumpkin is small.",
"amask": true
}
];
