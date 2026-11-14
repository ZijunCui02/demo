window.DEMO = {
 "sections": [
  {
   "key": "simulation",
   "title": "Simulation"
  },
  {
   "key": "real",
   "title": "Real Videos"
  }
 ],
 "cases": [
  {
   "sec": "simulation",
   "id": "00005004",
   "path": "Dominoes / Fewer Fall / Descender",
   "dir": "media/dominoes/descender/00005004",
   "caption": "Remove the second-largest metallic domino to create a gap in the row. Now, when the wooden rod falls, the first block tips over and lands flat on the grey surface without initiating a cascade. The remaining dominoes must remain standing. Delete all the subsequent metallic clinking sounds, leaving only the initial rod tap and the single block landing sound.",
   "span": 5.0,
   "left": {
    "input": [
     "Input (with the object)",
     "ref"
    ],
    "gt": [
     "Ground truth (simulated without it)",
     "tar"
    ],
    "vid_mask": [
     "Video mask",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stage3"
    ],
    [
     "Gemini Omni Flash",
     "gemini"
    ],
    [
     "MiniMax H3 Ref2VA",
     "h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "iav2av_ft"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_ft"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_rel"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx"
    ]
   ]
  },
  {
   "sec": "simulation",
   "id": "00005001",
   "path": "Dominoes / Fewer Fall / Corner",
   "dir": "media/dominoes/corner/00005001",
   "caption": "Remove the corner translucent domino. This breaks the chain of falling blocks, leaving the three brown wooden dominoes standing upright and silent. The final translucent block now only leans forward instead of falling completely, and all subsequent wooden tumbling and clattering sounds are eliminated.",
   "span": 5.0,
   "left": {
    "input": [
     "Input (with the object)",
     "ref"
    ],
    "gt": [
     "Ground truth (simulated without it)",
     "tar"
    ],
    "vid_mask": [
     "Video mask",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stage3"
    ],
    [
     "Gemini Omni Flash",
     "gemini"
    ],
    [
     "MiniMax H3 Ref2VA",
     "h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "iav2av_ft"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_ft"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_rel"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx"
    ]
   ]
  },
  {
   "sec": "simulation",
   "id": "00400529",
   "path": "Collision / Reroute",
   "dir": "media/collision/reroute/v10_00400529",
   "caption": "Remove the dark-grey bowl with a light interior from the scene, which eliminates its clattering collision sound with the sliding white plastic pail. Consequently, the white plastic pail slides uninterrupted across the polished wood floor until it strikes the hollow brown metal geosphere, producing a solid dull impact sound before both objects settle to rest.",
   "span": 5.0,
   "left": {
    "input": [
     "Input (with the object)",
     "ref"
    ],
    "gt": [
     "Ground truth (simulated without it)",
     "tar"
    ],
    "vid_mask": [
     "Video mask",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stage3"
    ],
    [
     "Gemini Omni Flash",
     "gemini"
    ],
    [
     "MiniMax H3 Ref2VA",
     "h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "iav2av_ft"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_ft"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_rel"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx"
    ]
   ]
  },
  {
   "sec": "simulation",
   "id": "00052927",
   "path": "Falling / Preserve",
   "dir": "media/falling/preserve/v10_00052927",
   "caption": "Remove the rounded golden brass bowl and its motion from the video. Its metallic falling action and the resonant ringing sound it makes when hitting the light beige speckled stone floor are completely gone, leaving only the white ceramic serving tray to fall, impact with a sharp clink, and settle onto the floor.",
   "span": 5.0,
   "left": {
    "input": [
     "Input (with the object)",
     "ref"
    ],
    "gt": [
     "Ground truth (simulated without it)",
     "tar"
    ],
    "vid_mask": [
     "Video mask",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stage3"
    ],
    [
     "Gemini Omni Flash",
     "gemini"
    ],
    [
     "MiniMax H3 Ref2VA",
     "h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "iav2av_ft"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_ft"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_rel"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx"
    ]
   ]
  },
  {
   "sec": "simulation",
   "id": "00010003",
   "path": "Bridge / Kicker",
   "dir": "media/bridge/kicker__ball_then_cans__bottle_row/00010003",
   "caption": "Remove the dark orange curved plastic channel beneath the wood ramp. In the modified scene, the rolling glass ball will no longer be guided along a curve to strike the resting glass ball and plastic cylinders on the left. Instead, the ball will drop directly from the ramp onto the floor and roll straight into the three bronze bottles in the center, causing them to bump together and slide against the rear wooden block. The audio will change from glass clinks and plastic rattling sounds on the left to floor drops and muffled bottle knocks in the center.",
   "span": 5.0,
   "left": {
    "input": [
     "Input (with the object)",
     "ref"
    ],
    "gt": [
     "Ground truth (simulated without it)",
     "tar"
    ],
    "vid_mask": [
     "Video mask",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stage3"
    ],
    [
     "Gemini Omni Flash",
     "gemini"
    ],
    [
     "MiniMax H3 Ref2VA",
     "h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "iav2av_ft"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_ft"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_rel"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx"
    ]
   ]
  },
  {
   "sec": "simulation",
   "id": "00010001",
   "path": "Bridge / Catch",
   "dir": "media/bridge/catch__bottle_on_can__can_cluster/00010001",
   "caption": "Remove the aqua-colored satin-painted sliding shelf. This prevents the rusted steel sphere from crossing to the glass platform, causing it to fall directly onto the concrete floor and roll under the platform to strike the black ceramic cylinders in the wooden ring. The plastic and glass clatter of the tumbling bottles on the table is completely replaced by a heavy concrete drop and the bright, resonant clatter of the scattered ceramic cylinders.",
   "span": 5.0,
   "left": {
    "input": [
     "Input (with the object)",
     "ref"
    ],
    "gt": [
     "Ground truth (simulated without it)",
     "tar"
    ],
    "vid_mask": [
     "Video mask",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stage3"
    ],
    [
     "Gemini Omni Flash",
     "gemini"
    ],
    [
     "MiniMax H3 Ref2VA",
     "h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "iav2av_ft"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_ft"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_rel"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx"
    ]
   ]
  },
  {
   "sec": "real",
   "id": "IMG_2610",
   "path": "Real Recording / Steel Lid Bucket",
   "dir": "media/real/IMG_2610_steel_lid_bucket",
   "caption": "Remove the silver stainless-steel dome cover with a knob on top. The yellow tennis ball rolls off the end of the board, straight across the counter, and hits the orange plastic bucket with a hollow plastic thud, shoving it a little to the right. The ball then rebounds to the left and comes to rest beside the bottom corner of the board.",
   "span": 3.2,
   "left": {
    "input": [
     "Input (with the object)",
     "before"
    ],
    "gt": [
     "Ground truth (recorded without it)",
     "after"
    ],
    "vid_mask": [
     "Video mask (agentic)",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask (agentic)",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stages123_e25"
    ],
    [
     "Gemini Omni Flash",
     "gemini_omni"
    ],
    [
     "MiniMax H3 Ref2VA",
     "minimax_h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "instructav2av_e19"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_stages12_am"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_mmaudio_am"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper_mmaudio"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx_am"
    ]
   ]
  },
  {
   "sec": "real",
   "id": "IMG_2630",
   "path": "Real Recording / Plate Jar",
   "dir": "media/real/IMG_2630_plate_jar",
   "caption": "Remove the flat grey metal sheet lying across the tops of the two cardboard boxes. The wooden ball flies off the end of the ramp and strikes the side of the right cardboard box with a dull thud. It then falls into the white ceramic bowl with a ringing clatter, rattles around, and comes to rest at the bottom.",
   "span": 5.0,
   "left": {
    "input": [
     "Input (with the object)",
     "before"
    ],
    "gt": [
     "Ground truth (recorded without it)",
     "after"
    ],
    "vid_mask": [
     "Video mask (agentic)",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask (agentic)",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stages123_e25"
    ],
    [
     "Gemini Omni Flash",
     "gemini_omni"
    ],
    [
     "MiniMax H3 Ref2VA",
     "minimax_h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "instructav2av_e19"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_stages12_am"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_mmaudio_am"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper_mmaudio"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx_am"
    ]
   ]
  },
  {
   "sec": "real",
   "id": "IMG_2789",
   "path": "Real Recording / Plate Dominoes",
   "dir": "media/real/IMG_2789_plate_dominoes",
   "caption": "Remove the middle one of the three upright grey aluminium slabs. The first slab tips into the gap and lands flat on the counter with a heavy metallic clank, its right edge at the foot of the last slab. The last slab stays standing. The wooden ball rolls back toward the fallen slab, bumps its edge with a dull wooden knock, and stops a little away from it.",
   "span": 3.0,
   "left": {
    "input": [
     "Input (with the object)",
     "before"
    ],
    "gt": [
     "Ground truth (recorded without it)",
     "after"
    ],
    "vid_mask": [
     "Video mask (agentic)",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask (agentic)",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stages123_e25"
    ],
    [
     "Gemini Omni Flash",
     "gemini_omni"
    ],
    [
     "MiniMax H3 Ref2VA",
     "minimax_h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "instructav2av_e19"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_stages12_am"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_mmaudio_am"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper_mmaudio"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx_am"
    ]
   ]
  },
  {
   "sec": "real",
   "id": "IMG_3007",
   "path": "Real Recording / Jar Bowls",
   "dir": "media/real/IMG_3007_jar_bowls",
   "caption": "Remove the clear glass bowl, together with the light wooden block. The ball rolls off the ramp onto the board with a solid wooden knock. The ball rolls to the right and hits the left side of the lower white ceramic bowl with a ringing ceramic tone. The ball rolls into the gap between the bowls and back a little to the left. The ball rolls toward the lower bowl again and is still rolling at the end.",
   "span": 3.0,
   "left": {
    "input": [
     "Input (with the object)",
     "before"
    ],
    "gt": [
     "Ground truth (recorded without it)",
     "after"
    ],
    "vid_mask": [
     "Video mask (agentic)",
     "vid_mask"
    ],
    "aud_mask": [
     "Audio mask (agentic)",
     "aud_mask"
    ]
   },
   "methods": [
    [
     "GRAVITY (ours)",
     "stages123_e25"
    ],
    [
     "Gemini Omni Flash",
     "gemini_omni"
    ],
    [
     "MiniMax H3 Ref2VA",
     "minimax_h3"
    ],
    [
     "InstructAV2AV fine-tuned",
     "instructav2av_e19"
    ],
    [
     "VOID fine-tuned + MMAudio",
     "void_stages12_am"
    ],
    [
     "AVED",
     "aved"
    ],
    [
     "VOID w/o fine-tune + MMAudio",
     "void_mmaudio_am"
    ],
    [
     "Object-WIPER + MMAudio",
     "objwiper_mmaudio"
    ],
    [
     "LTX-2.5 IC-LoRA",
     "ltx_am"
    ]
   ]
  }
 ]
};
