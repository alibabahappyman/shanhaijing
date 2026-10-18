const node = (name, nameEn, kind, mark, x, y, description, detail, motion) => ({ name, nameEn, kind, mark, x, y, description, detail, motion })

export const HAI_CHAPTERS = [
  {
    id: 'haiwainan', realm: 'outer', name: '海外南经', nameEn: 'Classic of Regions Beyond the Seas: South',
    direction: '南', directionEn: 'South', subtitle: { zh: '羽影与炎国', en: 'Feathered Shadows and the Land of Flame' }, hue: '#a45d42',
    intro: { zh: '从羽民之地向海上行去，异国的身体、火光与双翼，依经文次第浮现。', en: 'Sailing out from the land of the Feathered People, the bodies, firelight and paired wings of strange kingdoms surface one by one, in the order of the classic.' },
    source: 'https://zh.wikisource.org/wiki/山海經/海外南經',
    scrollLink: { jing: 'nanshan', scene: 'danxue' },
    nodes: [
      node('羽民国', 'Feathered Folk Kingdom', '异国', '羽', 18, 48, { zh: '身生羽的海上之民。', en: 'Sea dwellers whose bodies grow feathers.' }, { zh: '轻触羽纹，风会把这一段海路带向下一个传说。经文以羽为最醒目的识别线索，画面因此以舒展的羽影标出此国。', en: 'Touch the feather motif, and the wind will carry this stretch of sea toward the next legend. The classic uses feathers as its most striking identifying clue, so the scene marks this kingdom with an unfurled feather shadow.' }, 'feather'),
      node('厌火国', 'Fire-Eating Kingdom', '异国', '火', 39, 59, { zh: '口中吐火的南方国度。', en: 'A southern kingdom whose people breathe fire from their mouths.' }, { zh: '火并非战场的烈焰，而是这群人的异相。沿航线靠近时，岸上的微光会逐渐聚集。', en: 'The fire here is no battle blaze, but the strange aspect of this people. As you follow the sea lane closer, the faint lights along the shore slowly gather.' }, 'flame'),
      node('长臂国', 'Long-Arm Kingdom', '异国', '臂', 61, 43, { zh: '长臂可及水中的人。', en: 'People whose long arms can reach into the water.' }, { zh: '《海外南经》把他们放在海边：手臂越过寻常距离，触及潮间的鱼。交互中的长线由岸边伸向水面。', en: 'The Classic of Regions Beyond the Seas: South places them by the shore: arms crossing ordinary distance to touch the fish of the tidelands. In the interaction, a long line stretches from the bank toward the water.' }, 'reach'),
      node('比翼鸟', 'Pair-Wing Birds', '异物', '翼', 82, 53, { zh: '两鸟并翼而飞。', en: 'Two birds that fly with wings joined.' }, { zh: '一翼难以独往，另一翼来到身侧，飞行才开始。两道羽影在这一站合拢。', en: 'One wing alone cannot make the journey; only when the other wing arrives alongside does flight begin. Two feathered shadows close together at this stop.' }, 'wing'),
    ],
  },
  {
    id: 'haiwaixi', realm: 'outer', name: '海外西经', nameEn: 'Classic of Regions Beyond the Seas: West',
    direction: '西', directionEn: 'West', subtitle: { zh: '机巧与战歌', en: 'Clockwork and Battle Songs' }, hue: '#8b6552',
    intro: { zh: '西海之外，奇肱的工巧、巫咸的群巫与刑天的舞戚，相继留在图上。', en: 'Beyond the western sea, the craftsmanship of Qigong, the assembled shamans of Wuxian, and Xingtian dancing with shield and axe are each left upon the map.' },
    source: 'https://zh.wikisource.org/wiki/山海經/海外西經',
    scrollLink: { jing: 'xishan', scene: 'yushan' },
    nodes: [
      node('奇肱国', 'Singular-Arm Kingdom', '异国', '巧', 18, 54, { zh: '以机巧著称的奇肱之民。', en: 'The Qigong people, famed for their ingenious devices.' }, { zh: '经文中的奇肱国与飞车传说相连。铜轮的纹路缓缓旋转，像在试探海风的方向。', en: 'In the classic, the Qigong Kingdom is tied to the legend of the flying chariot. The engraved patterns of a bronze wheel turn slowly, as if testing the direction of the sea wind.' }, 'wheel'),
      node('巫咸国', 'Kingdom of Shaman Wu', '异国', '巫', 39, 42, { zh: '群巫所居之地。', en: 'The land where the shamans dwell.' }, { zh: '十巫的名字在此聚合成一处祭祀的地标。雾中的细线循着鼓点向外扩散。', en: 'The names of the ten shamans converge here into a landmark of ritual. Fine lines in the mist spread outward to the beat of drums.' }, 'ritual'),
      node('并封', 'Bingfeng', '异兽', '封', 61, 60, { zh: '前后皆有首的异兽。', en: 'A strange beast with a head at both ends.' }, { zh: '它的形貌不依寻常前后；图上以对称兽面显示两端相顾的奇异姿态。', en: 'Its form defies ordinary front and back; the map shows its twin faces gazing at each other in a symmetrical, uncanny pose.' }, 'twin'),
      node('刑天', 'Xingtian', '神话人物', '戚', 82, 48, { zh: '以乳为目，以脐为口，操干戚而舞。', en: 'Using his nipples as eyes and his navel as a mouth, he dances with shield and axe.' }, { zh: '失首之后仍起舞的刑天，是西海外最有力量的一幕。铜色战纹随呼吸亮起。', en: 'Xingtian, still dancing after losing his head, is the most powerful scene beyond the western sea. Bronze battle markings brighten with each breath.' }, 'battle'),
    ],
  },
  {
    id: 'haiwaibei', realm: 'outer', name: '海外北经', nameEn: 'Classic of Regions Beyond the Seas: North',
    direction: '北', directionEn: 'North', subtitle: { zh: '寒海与昼夜', en: 'Cold Seas and the Turning of Day and Night' }, hue: '#5a7072',
    intro: { zh: '北海的雾更深。奇特的耳目、九首的相柳与掌昼夜的烛阴，层层显影。', en: 'The fog over the northern sea runs deeper. Strange ears and eyes, the nine-headed Xiangliu, and Zhuyin who holds sway over day and night develop upon the image, layer by layer.' },
    source: 'https://zh.wikisource.org/wiki/山海經/海外北經',
    nodes: [
      node('一目国', 'One-Eye Kingdom', '异国', '目', 18, 47, { zh: '一目居于面中的国度。', en: 'A kingdom whose people have a single eye set mid-face.' }, { zh: '只保留一枚凝视海面的瞳纹，让视线成为辨认这一国的线索。', en: 'Only a single pupil gazing at the sea is kept, letting that gaze become the clue by which this kingdom is known.' }, 'eye'),
      node('聂耳国', 'Hanging-Ear Kingdom', '异国', '耳', 39, 59, { zh: '两耳下垂，可为其异相。', en: 'Their two enormous hanging ears are their strange aspect.' }, { zh: '海风掠过耳畔时，长长的耳纹随风轻摆。', en: 'As the sea wind brushes past their ears, the long ear motifs sway gently with the breeze.' }, 'feather'),
      node('相柳', 'Xiangliu', '异兽', '九', 61, 40, { zh: '九首蛇身，所到之处多为泽。', en: 'Nine heads on a serpent body; wherever it passes becomes marshland.' }, { zh: '九股细流汇进一片湿地，暗示相柳与水泽之间的牵连。', en: 'Nine thin streams converge into a wetland, hinting at the bond between Xiangliu and the marshes.' }, 'serpent'),
      node('烛阴', 'Zhuyin, the Torch Dragon', '神灵', '烛', 82, 53, { zh: '视为昼，瞑为夜的神灵。', en: 'The deity whose open eyes are day and whose closed eyes are night.' }, { zh: '停留在这一站，图面在昼色与夜色之间缓慢更替。', en: 'Linger at this stop, and the scene slowly alternates between daylight and nightfall.' }, 'daynight'),
    ],
  },
  {
    id: 'haiwaidong', realm: 'outer', name: '海外东经', nameEn: 'Classic of Regions Beyond the Seas: East',
    direction: '东', directionEn: 'East', subtitle: { zh: '日出与海神', en: 'Sunrise and Gods of the Sea' }, hue: '#6b7c70',
    intro: { zh: '向日出之方巡游，从大人、君子之国，到海神天吴与奢比之尸。', en: 'Touring toward the sunrise, from the lands of the Giants and the Gentlemen to the sea gods Tianwu and Shebishi.' },
    source: 'https://zh.wikisource.org/wiki/山海經/海外東經',
    nodes: [
      node('大/小人国', 'Kingdoms of Giants and Pygmies', '异国', '人', 18, 53, { zh: '身量的两极：巨人与冠带小人。', en: 'The two extremes of stature: giants and capped, belted pygmies.' }, { zh: '大小比例在这一站轻轻改变，远处的山与人影显出不寻常的尺度。', en: 'Scale quietly shifts at this stop; the distant hills and human silhouettes reveal an unusual measure.' }, 'scale'),
      node('君子国', 'Kingdom of Gentlemen', '异国', '君', 39, 43, { zh: '衣冠佩剑的海上之国。', en: 'A sea kingdom whose people dress in caps and girdles and wear swords.' }, { zh: '以衣冠和佩剑的纹样，标出经文中此国的仪容。', en: 'Motifs of robes and swords mark the dignified bearing this kingdom holds in the classic.' }, 'ritual'),
      node('天吴', 'Tianwu, God of Waters', '海神', '吴', 61, 60, { zh: '八首八足八尾的海神。', en: 'The sea god with eight heads, eight feet and eight tails.' }, { zh: '潮线向八方分开，再合回神灵的印记。', en: 'The tide line parts in eight directions, then folds back into the god\'s emblem.' }, 'tide'),
      node('奢比尸', 'Shebishi', '神灵', '奢', 82, 47, { zh: '兽身人面，珥两青蛇的东方之神。', en: 'The eastern god with a beast\'s body and a human face, green snakes hanging from his ears.' }, { zh: '大耳垂着两缕青蛇纹，神面在潮光中若隐若现。', en: 'Two green serpent motifs hang from his great ears, the divine face flickering in and out of the tidal light.' }, 'serpent'),
    ],
  },
  {
    id: 'haineinan', realm: 'inner', name: '海内南经', nameEn: 'Classic of Regions Within the Seas: South',
    direction: '南', directionEn: 'South', subtitle: { zh: '神木与南土', en: 'The Divine Tree and the Southern Lands' }, hue: '#607969',
    intro: { zh: '由建木牵出南方的山川与异物：读者沿枝干和水脉，翻开一页方志。', en: 'From the Jianmu tree unfold the mountains, rivers and strange beings of the south: following its boughs and waterways, the reader turns a page of the gazetteer.' },
    source: 'https://zh.wikisource.org/wiki/山海經/海內南經',
    nodes: [
      node('建木', 'Jianmu, the Sky Ladder Tree', '神木', '木', 22, 40, { zh: '立于天地之间的神木。', en: 'The divine tree standing between heaven and earth.' }, { zh: '枝干是这一卷的起点。点亮它，图中的细线向周围山川伸展。', en: 'Its boughs are where this volume begins. Light it, and the fine lines of the map stretch out toward the surrounding mountains and rivers.' }, 'tree'),
      node('氐人国', 'Fish-People Kingdom', '异国', '氐', 44, 56, { zh: '人面鱼身的水居之民。', en: 'Water-dwelling people with human faces and fish bodies.' }, { zh: '让水纹从居所向外流动，提示人物与水域的联系。', en: 'Water patterns flow outward from their home, suggesting the bond between the people and the waters.' }, 'water'),
      node('巴蛇', 'Bashe, the Elephant-Swallowing Serpent', '异兽', '蛇', 66, 42, { zh: '巨大而奇诡的蛇。', en: 'A serpent vast and uncanny.' }, { zh: '蜿蜒的蛇纹藏在山脚，需顺着路径靠近才逐渐显形。', en: 'The winding serpent motif hides at the foot of the hills, taking shape only as you approach along the path.' }, 'serpent'),
      node('枭阳国', 'Xiaoyang Kingdom', '异国', '枭', 82, 61, { zh: '南方经文中的异人之国。', en: 'A kingdom of strange folk in the southern classic.' }, { zh: '以简练的面纹作标识，不替经文未说尽的形貌添设细节。', en: 'A spare face motif serves as its mark, adding no detail to features the classic leaves unsaid.' }, 'mask'),
    ],
  },
  {
    id: 'haineixi', realm: 'inner', name: '海内西经', nameEn: 'Classic of Regions Within the Seas: West',
    direction: '西', directionEn: 'West', subtitle: { zh: '昆仑诸门', en: 'The Gates of Kunlun' }, hue: '#7c7564',
    intro: { zh: '昆仑是此卷的视觉轴心。山门、开明兽，与大幽国、贰负与危，围绕山势展开。', en: 'Kunlun is the visual axis of this volume. Its gates, the Kaiming beast, the Kingdom of Deep Dark, and Erfu with his minister Wei all unfold around the mountain.' },
    source: 'https://zh.wikisource.org/wiki/山海經/海內西經',
    scrollLink: { jing: 'xishan', scene: 'kunlun' },
    nodes: [
      node('昆仑之虚', 'Kunlun, the Emperor\'s Earthly Capital', '神山', '昆', 20, 55, { zh: '巍然居中的神山。', en: 'The sacred mountain towering at the center.' }, { zh: '山体缓缓浮出底图，作为此卷所有支线的起点。', en: 'The mountain slowly rises out of the base map, the starting point of every branch in this volume.' }, 'mountain'),
      node('开明兽', 'Kaiming, Guardian of the Gates', '守护者', '明', 43, 37, { zh: '守视昆仑的神兽。', en: 'The guardian beast that watches over Kunlun.' }, { zh: '九道细目纹沿山门依次点亮，表示昆仑入口的守望。', en: 'Nine fine eye motifs light up one by one along the mountain gate, marking the watch kept at Kunlun\'s entrance.' }, 'eye'),
      node('大幽国', 'Kingdom of Deep Dark', '异国', '幽', 65, 59, { zh: '北海之内，幽暗之地。', en: 'Within the North Sea, a land of gloom and darkness.' }, { zh: '幽暗自地底缓缓漫起，国境在晦明之间显出轮廓。', en: 'Darkness seeps slowly up from beneath the ground; the kingdom\'s borders take shape between dusk and dawn.' }, 'daynight'),
      node('贰负之臣', 'Wei, Minister of Erfu', '神话人物', '危', 83, 43, { zh: '贰负之臣危，杀窫窳而被帝梏于疏属之山。', en: 'Wei, minister of Erfu, slew Yayu and was shackled by the Emperor on Mount Shushu.' }, { zh: '锁链与缚发的纹样在山岩上浮现，右足桎、两手反缚，囚禁之影缓缓凝固。', en: 'Motifs of chains and bound hair surface on the rock face — right foot in stocks, both hands tied behind — as the shadow of captivity slowly hardens into place.' }, 'twin'),
    ],
  },
  {
    id: 'haineibei', realm: 'inner', name: '海内北经', nameEn: 'Classic of Regions Within the Seas: North',
    direction: '北', directionEn: 'North', subtitle: { zh: '北境异闻', en: 'Strange Tales of the Northern Reach' }, hue: '#607b7c',
    intro: { zh: '北境的奇人异国与海神并列于卷中：无肠之乡的邻居们，与乘龙的河伯。', en: 'The strange folk and odd kingdoms of the north stand in the volume beside its sea gods: the neighbors of the Gutless Land, and the River Lord who rides dragons.' },
    source: 'https://zh.wikisource.org/wiki/山海經/海內北經',
    nodes: [
      node('犬封国', 'Dog-Headed Kingdom', '异国', '犬', 20, 51, { zh: '北境经文中的异国。', en: 'A strange kingdom of the northern classic.' }, { zh: '犬形面纹在山间显现，留住经文的奇异感。', en: 'A dog-shaped face motif appears among the hills, preserving the strangeness of the text.' }, 'mask'),
      node('陵鱼', 'Ling Fish', '异兽', '鱼', 43, 39, { zh: '人面手足鱼身的海中之鱼。', en: 'A sea fish with a human face, hands and feet on a fish\'s body.' }, { zh: '人面的鱼影自浪中浮起，鳞光与手足的纹样一同显形。', en: 'The fish shadow with a human face rises from the waves, scale-light and the motifs of hands and feet taking shape together.' }, 'water'),
      node('驺吾', 'Zouwu, the Benevolent Beast', '异兽', '驺', 65, 60, { zh: '虎身五彩、乘日而行的仁兽。', en: 'A benevolent beast, tiger-bodied and five-colored, that rides the sun for a thousand li a day.' }, { zh: '彩纹如日晕流转，长尾随行迹缓缓摆动。', en: 'Its colored patterns turn like a solar halo, its long tail swaying gently along its path.' }, 'beast'),
      node('冰夷', 'Bingyi, Lord of the River', '神灵', '冰', 83, 42, { zh: '乘两龙、司掌河水的河伯。', en: 'The River Lord who rides two dragons and governs the waters.' }, { zh: '两道龙影分列左右，水纹自河伯身边向下游延展。', en: 'Two dragon shadows flank him, water patterns extending from the River Lord downstream.' }, 'tide'),
    ],
  },
  {
    id: 'haineidong', realm: 'inner', name: '海内东经', nameEn: 'Classic of Regions Within the Seas: East',
    direction: '东', directionEn: 'East', subtitle: { zh: '东土水系', en: 'Waterways of the Eastern Lands' }, hue: '#668176',
    intro: { zh: '东土以水系与远国为引。岷三江、月支国依次照面，雷神之泽仍在其中。', en: 'The eastern lands open with waterways and distant kingdoms: the Three Min Rivers and Yuezhi appear in turn, and the Thunder God\'s marsh remains among them.' },
    source: 'https://zh.wikisource.org/wiki/山海經/海內東經',
    scrollLink: { jing: 'zhongshan', scene: 'minshan' },
    nodes: [
      node('月支国', 'Kingdom of the Yuezhi', '异国', '月', 20, 52, { zh: '西取昆仑之马、北得文王的千里的远国。', en: 'The distant kingdom that took horses from Kunlun in the west and a thousand-li steed from King Wen in the north.' }, { zh: '远国的旗影随西风浮现，马蹄纹自东方一路延伸。', en: 'The banner shadows of the distant kingdom surface on the west wind, hoofprint motifs stretching westward from the east.' }, 'wheel'),
      node('雷神', 'Thunder God', '神灵', '神', 43, 37, { zh: '人与雷泽传说相连的神灵。', en: 'The deity bound to the legend of the Thunder Marsh.' }, { zh: '鼓形的印记一明一暗，回应雷泽的水纹。', en: 'A drum-shaped emblem brightens and dims, echoing the water patterns of the Thunder Marsh.' }, 'ritual'),
      node('岷三江', 'The Three Min Rivers', '水系', '岷', 65, 61, { zh: '大江出岷山，北注海的江源。', en: 'The great river rises from Mount Min and flows north into the sea.' }, { zh: '三道水纹自岷山分流而下，江源在图上缓缓显形。', en: 'Three water patterns part and flow down from Mount Min as the river source slowly takes shape on the map.' }, 'water'),
      node('琅邪台', 'Langye Terrace', '古迹', '琅', 83, 44, { zh: '渤海之间，琅邪之东的台地。', en: 'The terrace between the seas, east of Langye.' }, { zh: '台影立于潮线上，海光沿台基往复涨落。', en: 'The terrace\'s shadow stands on the tide line, sea light rising and falling along its base.' }, 'tide'),
    ],
  },
]

export const chaptersFor = (realm) => HAI_CHAPTERS.filter((chapter) => chapter.realm === realm)
