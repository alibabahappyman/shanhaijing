// 整页山志的独有内容：山川考 / 方物志 / 行记。
// 只给有内容的站点写条目，其他站点山志沿用旧结构。
export const mountainJournalNotes = {
  qianwei: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经华山山系之首山，为这一条山脉的起点。', en: 'First mountain of the Huashan range in the Classic of the Western Hills, where the whole chain begins.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '自钱来山起，向西每三百里左右递进一山，共十九山、二千九百五十七里。', en: 'From Mount Qianlai westward, a mountain every three hundred li or so — nineteen mountains in all, 2,957 li.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川，山中多松荫覆岭，泉源潜行而不显。', en: 'The text names no outflow; pine shade covers the ridges, and springs run hidden beneath.' } },
    ],
    objects: [
      { name: { zh: '羬羊', en: 'Qianyang' }, note: { zh: '其状如羊而马尾，脂可已腊——山中人行山至此，常取其脂涂肤，御冬月皴裂。', en: 'A sheep with a horse’s tail; its fat cures chapped skin, so travelers anoint themselves against the cracks of winter.' } },
      { name: { zh: '洗石', en: 'Washing Stone' }, note: { zh: '山下多洗石，色赤而质轻，入水沐之可去垢腻，古时以为浴身之石。', en: 'A reddish, light stone found below; washed in water it strips away grime — the bath-stone of the ancients.' } },
      { name: { zh: '松', en: 'Pine' }, note: { zh: '其上多松，取松脂入药，亦取松木为薪；松荫所在，即樵客往来之路。', en: 'The slopes are thick with pine — resin for medicine, wood for fuel, and shade marking the woodcutter’s way.' } },
    ],
    omen: { zh: '羬羊脂疗肤之疾，是济人之兆；行山者遇之，以为寒途有备、前路可安。', en: 'Its fat heals the traveler’s skin — an omen of aid, a sign the cold road ahead may be faced prepared.' },
    note: { zh: '首程记于此，自西而行，山行方始。', en: 'The first leg is set down here; heading west, the mountain journey has only begun.' },
  },

  /* ———— 西山经 ———— */
  taihua: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '华山山系第二山，紧承钱来山。', en: 'Second mountain of the Huashan range, hard upon Mount Qianlai.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西六十里，削成而四方，高五千仞，其广十里，鸟兽莫居。', en: 'Sixty li west; hewn square on every side, five thousand ren high, ten li broad — no bird or beast dwells there.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川——绝壁千仞，水皆潜行崖底。', en: 'The text names no outflow — beneath sheer cliffs the waters creep along at the cliff-base.' } },
    ],
    objects: [
      { name: { zh: '肥遗', en: 'Feiyi' }, note: { zh: '六足四翼的异蛇，栖于太华绝顶。古籍每与它并记一笔：见则天下大旱。', en: 'A serpent of six legs and four wings, dwelling on Taihua’s utmost summit. The old books add one line with it: seen, and the world parches.' } },
    ],
    omen: { zh: '肥遗一出，旱象随行——行山者望见蛇影，便要盘算存水。', en: 'Where Feiyi appears, drought follows — seeing its shadow, travelers begin to count their water.' },
    note: { zh: '西行第一座险峰，山高而鸟兽不居。', en: 'The first perilous peak of the westward road, high and empty of bird and beast.' },
  },
  yuanci: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '华山山系之山，在太华山以西。', en: 'A mountain of the Huashan range, lying west of Mount Taihua.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西行百里而至，山中多白玉、多丹粟。', en: 'A hundred li west; the mountain holds much white jade and much cinnabar grain.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '山中之水北流注于渭，归入河渭一脉。', en: 'Its waters flow north into the Wei, joining the line of the Yellow River and the Wei.' } },
    ],
    objects: [
      { name: { zh: '鸾鸟', en: 'Luan Bird' }, note: { zh: '五彩羽纹，鸣声合于五音。它一现世，天下安宁。', en: 'Feathers in five colors, a cry in tune with the five notes. When it appears, the world is at peace.' } },
      { name: { zh: '白玉、丹粟', en: 'White Jade and Cinnabar Grain' }, note: { zh: '丹粟如细沙成粒，古时以为瑞谷之象。', en: 'Cinnabar grain like fine sand in kernels, held by the ancients as a sign of an auspicious harvest.' } },
    ],
    omen: { zh: '鸾鸟鸣而天下安——西行路上难得的吉兆。', en: 'The Luan cries and the world rests — a rare good omen on the westward road.' },
    note: { zh: '五彩的鸟落在这一程，山行暂得安稳。', en: 'A bird of five colors alights on this leg; the mountain road gains a stretch of quiet.' },
  },
  huangshan: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '华山山系之山，西行而来。', en: 'A mountain of the Huashan range, come to by the westward road.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西百八十里，山无草木而多竹箭。', en: 'One hundred eighty li west; bare of grass and tree, yet thick with arrow bamboo.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '盼水出焉，西流注于赤水，归入西陲水系。', en: 'The Pan River rises here and flows west into the Red Water, joining the rivers of the western marches.' } },
    ],
    objects: [
      { name: { zh: '鹦鹉', en: 'Parrot' }, note: { zh: '状如鸮而青羽赤喙，人舌能言——山中第一只会说话的鸟。', en: 'Shaped like an owl, green-plumed with a red beak, it speaks with a human tongue — the first talking bird of the hills.' } },
      { name: { zh: '竹箭', en: 'Arrow Bamboo' }, note: { zh: '山多竹箭，取材可为箭杆，是山中人制器的好料。', en: 'Arrow bamboo grows thick here; cut for shafts, it is the hill folk’s finest material.' } },
    ],
    omen: { zh: '能言的鹦鹉无凶兆加身，是山行里的一段闲笔。', en: 'The speaking parrot carries no ill omen — an idle, pleasant page in the mountain journey.' },
    note: { zh: '会说话的鸟守着满山翠竹，这一程走得轻快。', en: 'A talking bird keeps the green bamboo; this leg is walked lightly.' },
  },
  lutai: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '华山山系之山，西行第三程。', en: 'A mountain of the Huashan range, the third leg westward.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西三百里，其上多白玉，其下多银。', en: 'Three hundred li west; white jade above, silver below.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川，山泉多潜入玉脉之间。', en: 'The text names no outflow; the springs slip away among the veins of jade.' } },
    ],
    objects: [
      { name: { zh: '凫徯', en: 'Fuxi' }, note: { zh: '状如雄鸡而人面，鸣声自呼其名。它落在哪座山，哪里便要起刀兵。', en: 'Shaped like a cock with a human face, it cries its own name. The mountain it lands on will know war.' } },
      { name: { zh: '白玉、银', en: 'White Jade and Silver' }, note: { zh: '上玉下银，矿产分明，是这条山系里的富山。', en: 'Jade above and silver below, its riches plain — the wealthy mountain of this range.' } },
    ],
    omen: { zh: '凫徯见则有兵——听见它叫，山中的商旅便结伴而行。', en: 'Fuxi seen means arms to come — hearing its cry, merchants of the hills band together for the road.' },
    note: { zh: '人面的鸟立在银矿之上，这一程要屏息而行。', en: 'The human-faced bird stands above the silver; this leg is walked with held breath.' },
  },
  xiaoci: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '华山山系之山，紧随鹿台山。', en: 'A mountain of the Huashan range, close behind Mount Lutai.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西二百五十里，上多白玉，下多赤铜。', en: 'Two hundred fifty li west; white jade above, red copper below.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川。', en: 'The text names no outflow.' } },
    ],
    objects: [
      { name: { zh: '朱厌', en: 'Zhuyan' }, note: { zh: '状如猿而白首赤足。它一现身，天下便要大动干戈。', en: 'An ape, white-headed and red-footed. When it shows itself, the world takes up arms.' } },
      { name: { zh: '赤铜', en: 'Red Copper' }, note: { zh: '山下多赤铜，铸戈铸剑，兵气亦由此而生。', en: 'Red copper lies thick below; daggers and swords are cast of it, and the air of war rises from it.' } },
    ],
    omen: { zh: '朱厌见则大兵——白首赤足的猿影，是这条山系里最不祥的一笔。', en: 'Zhuyan seen means great war — the white-headed, red-footed ape-shadow is the darkest stroke in this range.' },
    note: { zh: '铜气与兵气一同压在山间，行路者不敢久留。', en: 'Copper fume and war fume press together on the mountain; travelers dare not linger.' },
  },
  huaijiang: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '华山山系之山，西临昆仑之丘。', en: 'A mountain of the Huashan range, looking west toward the Kunlun hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西南四百里，实惟帝之平圃，是天帝悬圃所在。', en: 'Four hundred li southwest; in truth the Emperor’s leveled garden, where the Hanging Garden of Heaven stands.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '河水出焉而南流东注于无达；赤水出焉而东南流注于氾天之水；洋水、黑水亦出于此——四水并发的枢纽之山。', en: 'The Yellow River rises here and flows south then east into Wuda; the Red Water rises here and flows southeast into the Waters of Fantian; the Yang and Black Waters likewise issue from it — the hinge from which four rivers spring.' } },
    ],
    objects: [
      { name: { zh: '英招', en: 'Yingzhao' }, note: { zh: '马身人面，虎文鸟翼，司此平圃，徇于四海，其音如榴。', en: 'Horse-bodied and human-faced, tiger-striped with bird’s wings, it keeps this garden and patrols the four seas, crying like a spinning wheel.' } },
      { name: { zh: '四水', en: 'The Four Rivers' }, note: { zh: '河、赤、洋、黑四水皆发源于此，天下大水的源头之一。', en: 'The Yellow, Red, Yang, and Black Rivers all rise here — one of the wellheads of the world’s great waters.' } },
    ],
    omen: { zh: '神英招巡游四海，是守圃之兆——山有主，行人不敢逾。', en: 'The god Yingzhao rides the four seas — the omen of a kept garden; the mountain has its lord, and travelers do not overstep.' },
    note: { zh: '天帝的后园在此，四水从此分流天下。', en: 'Heaven’s back garden lies here, and four rivers part from it to water the world.' },
  },
  kunlun: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经之丘，槐江之山所西临，为帝之下都。', en: 'A hill of the Western Hills, facing which Mount Huaijiang stands — the Emperor’s earthly capital.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西南四百里，方八百里，高万仞——百神之所在。', en: 'Four hundred li southwest; eight hundred li square and ten thousand ren high — the seat of a hundred gods.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '山中诸水潜行地底，与槐江山四水同出西陲一脉。', en: 'Its waters steal beneath the ground, kin to the four rivers of Mount Huaijiang from the western marches.' } },
    ],
    objects: [
      { name: { zh: '陆吾', en: 'Luwu' }, note: { zh: '虎身九尾，人面虎爪，司天之九部及帝之囿时——天帝的大总管。', en: 'Tiger-bodied with nine tails, a human face and tiger claws; it rules the nine divisions of heaven and the seasons of the Emperor’s parks — the great steward of the Sky God.' } },
      { name: { zh: '帝之下都', en: 'The Emperor’s Earthly Capital' }, note: { zh: '昆仑之丘为天帝在人间的都邑，百神于此上下。', en: 'The hill of Kunlun is the Sky God’s city in the mortal world; a hundred gods ascend and descend by it.' } },
    ],
    omen: { zh: '陆吾镇守，禁地无扰——见神而退，是山行的大礼。', en: 'Luwu keeps the ground and no one troubles it — to see the god and withdraw is the great courtesy of the mountain road.' },
    note: { zh: '万仞之丘，神的都邑，行人只可仰望。', en: 'A hill ten thousand ren high, a city of gods — travelers may only look up.' },
  },
  yushan: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经之山，紧承昆仑之丘。', en: 'A mountain of the Western Hills, next after the Kunlun hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西三百五十里，因多玉而得名。', en: 'Three hundred fifty li west, named for the jade it holds.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川，玉气氤氲而泉石清冽。', en: 'The text names no outflow; jade mist hangs about, and the springs run cold and clear.' } },
    ],
    objects: [
      { name: { zh: '西王母', en: 'Queen Mother of the West' }, note: { zh: '状如人，豹尾虎齿而善啸，蓬发戴胜，司天之厉及五残——掌瘟疫刑罚的神。', en: 'Human in shape, with a leopard’s tail and tiger’s teeth, skilled in whistling; tangled-haired, crowned with a sheng. She rules heaven’s plagues and the five punishments — goddess of pestilence and penalty.' } },
      { name: { zh: '狡', en: 'Jiao' }, note: { zh: '状如犬而豹文，其角如牛。它一出现，其国大穰。', en: 'Dog-shaped and leopard-spotted, with horns like an ox’s. Where it appears, that land has abundant harvest.' } },
    ],
    omen: { zh: '狡现而国熟，王母掌罚——凶神座下，倒有丰年的吉兆。', en: 'The Jiao comes and the land ripens, while the Queen Mother holds the rod — beneath a stern god’s seat, the good omen of a full year.' },
    note: { zh: '玉山之上主人威严，山行人皆绕道而行。', en: 'The lord of Jade Mountain is august; travelers all take the long way round.' },
  },
  "zhang'e": {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经之山，在玉山以西。', en: 'A mountain of the Western Hills, lying west of Jade Mountain.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西二百八十里，无草木而多瑶、碧。', en: 'Two hundred eighty li west; bare of grass and tree, rich in yao and bi jade.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川，怪石嶙峋间多瑶碧之光。', en: 'The text names no outflow; among craggy stones the glimmer of yao and bi jade shows everywhere.' } },
    ],
    objects: [
      { name: { zh: '毕方', en: 'Bifang' }, note: { zh: '状如鹤而一足，赤纹青质白喙，其鸣自叫。它落在谁家，谁家便起讹火。', en: 'Crane-like on a single leg, red-marked on blue plumage with a white beak, it cries its own name. Whichever house it settles on, strange fire breaks out there.' } },
      { name: { zh: '瑶碧', en: 'Yao and Bi Jade' }, note: { zh: '山中无草木而多美石，瑶碧之光昼夜可辨。', en: 'No grass grows here, but fine stones abound; the glow of yao and bi jade can be told by day and by night.' } },
    ],
    omen: { zh: '毕方见则有讹火——怪火无端而起，古人望影而惧。', en: 'Bifang seen means uncanny fire — flames rising from no cause; the ancients feared its very shadow.' },
    note: { zh: '独脚的鸟立于瑶石之间，山风过处似有火气。', en: 'The one-legged bird stands among the jade stones; where the mountain wind passes, something of fire seems to move.' },
  },
  tianshan: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经之山，在章莪山以西。', en: 'A mountain of the Western Hills, lying west of Mount Zhang’e.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西三百五十里，多金玉，有青雄黄。', en: 'Three hundred fifty li west; much gold and jade, and blue orpiment besides.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '英水出焉，西南流注于汤谷。', en: 'The Ying River rises here and flows southwest into the Valley of Hot Waters.' } },
    ],
    objects: [
      { name: { zh: '帝江', en: 'Dijiang' }, note: { zh: '状如黄囊，赤如丹火，六足四翼，浑敦无面目，是识歌舞——神也。', en: 'Like a yellow sack, red as cinnabar flame, six legs and four wings, a shapeless mass without face or eyes — yet it knows song and dance. It is a god.' } },
      { name: { zh: '青雄黄', en: 'Blue Orpiment' }, note: { zh: '山中所出的矿藏，古时入药，亦用于辟邪。', en: 'A mineral yielded by this mountain; in old times taken as medicine, and used too to ward off evil.' } },
    ],
    omen: { zh: '无面的神通晓歌舞——混沌里自有天地的节拍，无吉凶可言。', en: 'The faceless god knows song and dance — in the chaos beats a rhythm of heaven and earth; neither luck nor ill may be told of it.' },
    note: { zh: '一团丹火般的神在汤谷边起舞，山行至此如入梦境。', en: 'A god like a cinnabar flame dances by the Valley of Hot Waters; reaching here, the traveler moves as in a dream.' },
  },
  wenyao: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经之山，西行而来。', en: 'A mountain of the Western Hills, come to by the westward road.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西三百七十里。', en: 'Three hundred seventy li west.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '观水出焉，西流注于流沙——水入沙而不见，西北独有的归处。', en: 'The Guan River rises here and flows west into the Drifting Sands — water entering sand and vanishing, a resting place found nowhere but the northwest.' } },
    ],
    objects: [
      { name: { zh: '文鳐鱼', en: 'Wenyao Fish' }, note: { zh: '鱼身鸟翼，苍文白首赤喙，常行西海、游于东海，以夜飞。见则天下大穰。', en: 'A fish with bird’s wings, blue-patterned, white-headed, red-beaked; it passes the Western Sea and swims the Eastern, flying by night. Seen, and the world has abundant harvest.' } },
      { name: { zh: '流沙', en: 'The Drifting Sands' }, note: { zh: '水注流沙而不积，是这条山系最奇的一笔注脚。', en: 'Water pours into the sands and does not gather — the strangest note in the whole range.' } },
    ],
    omen: { zh: '文鳐鱼夜飞而天下大熟——会飞的鱼，驮着丰年的消息。', en: 'The Wenyao flies by night and the world ripens — a fish that flies, carrying news of a full year.' },
    note: { zh: '夜空有鱼群掠过如星子过境，山行人在水畔守了一夜。', en: 'Fish cross the night sky like stars on a journey; the traveler keeps watch by the water till dawn.' },
  },
  yanzi: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经之山，华山山系的西端。', en: 'A mountain of the Western Hills, the western end of the Huashan range.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西三百五十里，多丹木、多黄金白银。', en: 'Three hundred fifty li west; much cinnabar-wood, much gold, silver, and copper.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '苕水出焉，西南流注于海——西行至此，水归大海。', en: 'The Tiao River rises here and flows southwest into the sea — the westward road ends where water returns to the sea.' } },
    ],
    objects: [
      { name: { zh: '蓐收', en: 'Rushou' }, note: { zh: '西方之神，左耳有蛇，乘两龙，司秋金之气。', en: 'God of the West, a snake on his left ear, riding two dragons; he governs the metal breath of autumn.' } },
      { name: { zh: '丹木', en: 'Cinnabar Wood' }, note: { zh: '其叶如榖而赤理，其实大如瓜，食之御火。', en: 'Leaves like the paper-mulberry with red veins, fruit big as a melon; eat it and you may withstand fire.' } },
    ],
    omen: { zh: '金神蓐收镇守西极——秋气肃杀，山行至此当正衣冠。', en: 'The metal god Rushou guards the westernmost reach — the killing air of autumn; coming here, the traveler straightens his robes.' },
    note: { zh: '西极的神乘龙而立，山海一程的西线在此望尽。', en: 'The god of the far west stands on his dragons; the western line of mountain and sea is seen out from here.' },
  },
  guishan: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经之山，在崦嵫山以西。', en: 'A mountain of the Western Hills, lying west of Mount Yanzi.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西二百六十里。', en: 'Two hundred sixty li west.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '濛水出焉，南流注于洋水，其中多黄贝。', en: 'The Meng River rises here and flows south into the Yang Water, which holds many yellow shells.' } },
    ],
    objects: [
      { name: { zh: '穷奇', en: 'Qiongqi' }, note: { zh: '状如牛而猬毛，音如獆狗，是食人——后世尊为四凶之一。', en: 'Ox-shaped with hedgehog bristles, howling like a dog — a man-eater, honored in later ages as one of the Four Evils.' } },
      { name: { zh: '蠃鱼', en: 'Ying Fish' }, note: { zh: '鱼身鸟翼，鸣声如鸳鸯。它一现身，其邑大水。', en: 'A fish with bird’s wings, crying like mandarin ducks. When it shows itself, flood comes to the town.' } },
    ],
    omen: { zh: '穷奇食人，蠃鱼兆水——这一程山与水，都不好惹。', en: 'Qiongqi eats men and the Ying fish foretells flood — neither the mountain nor the waters of this leg are to be trifled with.' },
    note: { zh: '食人的兽与兆水的鱼同栖一山，山行者结队疾行。', en: 'The man-eating beast and the flood-omened fish share one mountain; travelers go in bands and quickly.' },
  },
  yanzi4: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '西山经西次二经之山，再名崦嵫，与前山同名异程。', en: 'A mountain of the second transcript of the Western Hills, again named Yanzi — the same name as before, a different leg.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西南三百六十里，为西次二经的收束之山。', en: 'Three hundred sixty li southwest — the mountain where the second transcript of the west is closed.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川，山临西海之滨。', en: 'The text names no outflow; the mountain stands on the shore of the Western Sea.' } },
    ],
    objects: [
      { name: { zh: '孰湖', en: 'Shuhu' }, note: { zh: '马身鸟翼，人面蛇尾，嗜好举人——喜欢把人举起来的怪马。', en: 'Horse-bodied with bird’s wings, a human face and a serpent’s tail, fond of lifting men — an odd horse that likes to pick people up.' } },
      { name: { zh: '祠礼', en: 'Rites of Sacrifice' }, note: { zh: '用一白狗祈，糈以稌米——西经之末，记下了祭山的规矩。', en: 'Prayer with a white dog, offering of glutinous rice — at the end of the Western Hills, the rules of sacrificing to the mountain are set down.' } },
    ],
    omen: { zh: '孰湖举人为戏，无凶而近人——山系之末，以一场怪谈收卷。', en: 'Shuhu lifts men for play, doing no harm and drawn to people — the range ends its scroll with a strange tale.' },
    note: { zh: '全经的祠礼记在此卷末尾，山行至此，当祭山而归。', en: 'The rites of the whole classic are written at this scroll’s end; the journey done, one sacrifices to the mountain and turns home.' },
  },

  /* ———— 南山经 ———— */
  zhaoyao: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '南山经鹊山山系之首山，临于西海之上。', en: 'First mountain of the Queshan range in the Classic of the Southern Hills, standing above the Western Sea.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '自招摇山起，凡十山、二千九百五十里，为南经之首。', en: 'From Mount Zhaoyao, ten mountains in all, 2,950 li — the head of the Southern classic.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '丽麂之水出焉，西流注于海，其中多育沛。', en: 'The Liji waters rise here and flow west into the sea, where much yupei is found.' } },
    ],
    objects: [
      { name: { zh: '狌狌', en: 'Xingxing' }, note: { zh: '状如禺而白耳，伏行人走，食之善走——吃了它脚力健旺。', en: 'Shaped like an ape with white ears, it crawls yet runs like a man; eat it and your legs grow swift.' } },
      { name: { zh: '育沛', en: 'Yupei' }, note: { zh: '丽麂水中所出，佩之无瘕疾，是水中的灵物。', en: 'Found in the Liji waters; worn on the body it keeps illness away — a numinous thing of the water.' } },
      { name: { zh: '桂、金玉', en: 'Cassia, Gold, and Jade' }, note: { zh: '山多桂树，多金玉——南方首山便是富山。', en: 'Cassia trees, gold, and jade abound — the first mountain of the south is already a rich one.' } },
    ],
    omen: { zh: '狌狌善走、育沛去疾，皆是济人之物——南山以好意开头。', en: 'The Xingxing lends speed and the yupei wards off sickness — things made to aid men; the Southern Hills open with kindness.' },
    note: { zh: '南山之行的起点，海风与桂香一同迎人。', en: 'The starting point of the southern journey; sea wind and cassia scent greet the traveler together.' },
  },
  zuyang: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '鹊山山系之山，在招摇山以东。', en: 'A mountain of the Queshan range, lying east of Mount Zhaoyao.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '东行三百里而至，山阳多赤金，山阴多白金。', en: 'Three hundred li east; its south face rich in red gold, its north face rich in white gold.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '怪水出焉，东流注于宪翼之水。', en: 'The Guai River rises here and flows east into the Xianyi waters.' } },
    ],
    objects: [
      { name: { zh: '鹿蜀', en: 'Lushu' }, note: { zh: '状如马而白首，虎纹赤尾，其音如谣。佩之宜子孙。', en: 'Horse-shaped, white-headed, tiger-striped with a red tail, its cry like a folk song. Worn, it blesses one’s children and grandchildren.' } },
      { name: { zh: '旋龟', en: 'Xuangui Turtle' }, note: { zh: '怪水中的玄龟，鸟首虺尾，佩之不聋。', en: 'The dark turtle of the Guai waters, bird-headed with a serpent’s tail; worn, it keeps the ears from deafness.' } },
    ],
    omen: { zh: '鹿蜀、旋龟皆是瑞兽——佩其皮毛者，子孙昌盛、耳聪不聋。', en: 'Lushu and the Xuangui are both auspicious beasts — those who wear their hide flourish in descendants and hear clearly all their days.' },
    note: { zh: '瑞兽成双的一站，山行人在水边听得兽鸣如歌。', en: 'A stop with auspicious beasts in pairs; by the water the traveler hears their cries like song.' },
  },
  dishan: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '鹊山山系之山，在杻阳山以东。', en: 'A mountain of the Queshan range, lying east of Mount Niuyang.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '东行三百七十里而至。', en: 'Three hundred seventy li east.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '山多水而无草木——水丰而草木不生，南方湿冷之地。', en: 'Rich in water yet bare of grass and tree — abundant streams where nothing grows, the wet cold of the south.' } },
    ],
    objects: [
      { name: { zh: '鯥', en: 'Lu Fish' }, note: { zh: '状如牛的鱼，陵居蛇尾有翼，冬死而夏生。食之无肿疾。', en: 'A fish shaped like an ox, dwelling on the high ground, serpent-tailed and winged; it dies in winter and lives again in summer. Eat it and no swelling comes.' } },
    ],
    omen: { zh: '鯥冬蛰夏苏，食之无肿疾——冬藏春生的道理，先写在鱼身上。', en: 'The Lu sleeps through winter and wakes with summer; eat it and be free of swelling — the way of winter’s store and spring’s return, first written on a fish.' },
    note: { zh: '一头牛形的鱼住在山上，山行人在湿雾里细看了半晌。', en: 'An ox-shaped fish lives on the mountain; the traveler peers at it long in the wet mist.' },
  },
  qingqiu: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '鹊山山系之山，即传说中九尾狐之乡。', en: 'A mountain of the Queshan range — the legendary home of the Nine-tailed Fox.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '东行三百里而至，其阳多玉，其阴多青雘。', en: 'Three hundred li east; its south face rich in jade, its north face rich in azurite.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '英水出焉，南流注于即翼之泽。', en: 'The Ying River rises here and flows south into the Marsh of Jiyi.' } },
    ],
    objects: [
      { name: { zh: '九尾狐', en: 'Nine-tailed Fox' }, note: { zh: '状如狐而九尾，其音如婴儿，能食人；食者不蛊。', en: 'Fox-shaped with nine tails, crying like an infant; it can eat men, yet one who eats it is free of gu poison.' } },
      { name: { zh: '灌灌', en: 'Guanguan Bird' }, note: { zh: '状如鸠的鸟，其音如詈。佩之不惑。', en: 'A bird like a dove, its cry like scolding. Worn, it keeps one from delusion.' } },
    ],
    omen: { zh: '九尾狐食人亦解毒——凶与吉一体两面，全看你如何相逢。', en: 'The Nine-tailed Fox devours men and cures poison — ill luck and good in one body; all depends on how you meet it.' },
    note: { zh: '婴儿啼声在林间回荡，山行人持杖快步而过。', en: 'An infant’s cry echoes through the woods; the traveler grips his staff and hurries past.' },
  },
  guishan: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '南山经第二山系之首山，西临流黄。', en: 'First mountain of the second range of the Southern Hills, looking west to Liuhuang.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '西南四百里而至，山上多丹粟。', en: 'Four hundred li southwest; the mountain is rich in cinnabar grain.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '英水出焉，西南流注于赤水，其中多白玉、多粟。', en: 'The Ying River rises here and flows southwest into the Red Water, which holds much white jade and much grain.' } },
    ],
    objects: [
      { name: { zh: '鴸鸟', en: 'Zhu Bird' }, note: { zh: '状如鸱而人手，其名自号。它出现的地方，县里多有贤士被放逐。', en: 'Shaped like an owl with human hands, it calls its own name. Where it appears, worthies of the county are often sent into exile.' } },
      { name: { zh: '丹粟', en: 'Cinnabar Grain' }, note: { zh: '细沙成粒的丹砂，满山皆是。', en: 'Cinnabar in kernels like fine sand, covering the whole mountain.' } },
    ],
    omen: { zh: '鴸鸟自呼其名，士人多谪——南行的凶兆，从这一站开始。', en: 'The Zhu bird calls its own name, and scholars are banished — the ill omen of the southward road begins at this stop.' },
    note: { zh: '人手的鸟影掠过丹砂山头，山行人未敢多言。', en: 'A bird with human hands sweeps over the cinnabar hilltop; the traveler dares not speak much.' },
  },
  yaoguang: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '南山经第二山系之山，在柜山以东。', en: 'A mountain of the second range of the Southern Hills, lying east of Mount Ju.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '东行三百五十里而至。', en: 'Three hundred fifty li east.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川，山多竹林密箐。', en: 'The text names no outflow; bamboo groves grow thick upon it.' } },
    ],
    objects: [
      { name: { zh: '猾褢', en: 'Huahuai' }, note: { zh: '状如人而彘鬣，穴居冬蛰。它一现身，县里便要大兴徭役。', en: 'Shaped like a man with a boar’s bristles, dwelling in burrows and dormant through winter. When it appears, the county levies great corvée labor.' } },
      { name: { zh: '竹箭', en: 'Arrow Bamboo' }, note: { zh: '山多竹，取之制器，亦是山居人的生计。', en: 'Bamboo grows thick here, cut for tools and wares — the hill folk’s livelihood as well.' } },
    ],
    omen: { zh: '猾褢见则大繇——人形的兽爬出洞穴，徭役的名单便要张开。', en: 'Huahuai seen means great levies — the man-shaped beast crawls from its burrow, and the roll of corvée labor unrolls with it.' },
    note: { zh: '猪鬣人形在洞口探了探头，山行人加快了脚步。', en: 'A man-shaped thing with boar’s bristles peers from its den; the traveler quickens his pace.' },
  },
  luwu: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '南山经第二山系之山，东行渐近海岸。', en: 'A mountain of the second range of the Southern Hills; eastward, the coast draws near.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '东行三百七十里而至。', en: 'Three hundred seventy li east.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '泽更之水出焉，南流注于滂水。', en: 'The Zegeng waters rise here and flow south into the Pang waters.' } },
    ],
    objects: [
      { name: { zh: '蛊雕', en: 'Gudiao' }, note: { zh: '状如雕而有角，其音如婴儿之啼，是食人的水兽。', en: 'Shaped like an eagle but horned, crying like an infant — a man-eating beast of the waters.' } },
    ],
    omen: { zh: '蛊雕食人——婴儿哭声越近，越要绕开水岸。', en: 'The Gudiao eats men — the nearer the infant’s cry, the wider one should skirt the water’s edge.' },
    note: { zh: '水畔传来婴儿啼，山行人辨清了才敢前行。', en: 'An infant’s cry comes from the water’s side; only when the traveler is sure of it does he dare go on.' },
  },
  daoguo: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '南山经第三山系之首山。', en: 'First mountain of the third range of the Southern Hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '此程凡十四山，南行入泽国。', en: 'Fourteen mountains on this leg, going south into the land of marshes.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '泿水出焉，南流注于海——一路向南，直入大海。', en: 'The Min River rises here and flows south into the sea — straight south, straight into the great water.' } },
    ],
    objects: [
      { name: { zh: '虎蛟', en: 'Hujiao' }, note: { zh: '鱼身蛇尾，其音如鸳鸯。食之不肿，可以已痔。', en: 'A fish’s body with a serpent’s tail, crying like mandarin ducks. Eaten, it prevents swelling and cures piles.' } },
      { name: { zh: '瞿如', en: 'Quru' }, note: { zh: '状如鵁而白首，三足人面，其鸣自号。', en: 'Shaped like a ji with a white head, three legs and a human face; it calls its own name.' } },
    ],
    omen: { zh: '既是凶兆也是药方——虎蛟入药可医疾，山行人的经验之谈。', en: 'Both an omen and a remedy — the Hujiao taken as medicine cures ills, so the mountain travelers say from experience.' },
    note: { zh: '南行的水路从这里开始，兽鸣与涛声混在一处。', en: 'The southward waterway begins here; beast cries and surf are mingled in one sound.' },
  },
  danxue: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '南山经第三山系之山，凤凰所栖。', en: 'A mountain of the third range of the Southern Hills, where the Phoenix roosts.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '东行五百里而至，山上多金玉。', en: 'Five hundred li east; the mountain holds much gold and jade.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川，山有丹穴而得名。', en: 'The text names no outflow; the mountain takes its name from the cinnabar cave within.' } },
    ],
    objects: [
      { name: { zh: '凤皇', en: 'Phoenix' }, note: { zh: '状如鸡，五采而文，饮食自然，自歌自舞。见则天下安宁。', en: 'Shaped like a fowl, five-colored and patterned; it eats and drinks at its ease, singing and dancing of itself. Seen, and the world is at peace.' } },
    ],
    omen: { zh: '凤凰一现，天下安宁——灾异走了一路，终于等来这一笔。', en: 'The Phoenix appears and the world is calm — after a whole road of portents, at last this stroke is written.' },
    note: { zh: '五彩的鸟影在丹穴之上盘旋，山行人驻足良久。', en: 'A five-colored bird circles above the cinnabar cave; the traveler stands still a long while.' },
  },
  nanyu: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '南山经最末之山，为全经收卷。', en: 'The last mountain of the Southern Hills, where the whole classic closes its scroll.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '凡十四山、六千五百三十里，南方山水至此走尽。', en: 'Fourteen mountains and 6,530 li in all; the mountains and waters of the south end here.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '佐水出焉，东南流注于海。', en: 'The Zuo River rises here and flows southeast into the sea.' } },
    ],
    objects: [
      { name: { zh: '凤皇、鹓雏', en: 'Phoenix and Yuanchu' }, note: { zh: '瑞鸟同栖此山——鹓雏亦是鸾凤之属，非梧不栖。', en: 'Auspicious birds roost together here — the Yuanchu is kin to the Luan and Phoenix, and will perch on nothing but the wutong tree.' } },
    ],
    omen: { zh: '瑞鸟栖卷末——南方之行以吉兆收束，是全经难得的圆满。', en: 'Auspicious birds roost at the scroll’s end — the southern journey closes on good omens, a rare completeness in this classic.' },
    note: { zh: '佐水入海，南卷合上；下一程，将向东而行。', en: 'The Zuo River meets the sea and the southern scroll is shut; the next road turns east.' },
  },

  /* ———— 北山经 ———— */
  danhu: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北山经首山系（谯明山系一脉）之山。', en: 'A mountain of the first range of the Northern Hills (the line of the Qiaoming range).' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北三百二十里而至。', en: 'Three hundred twenty li north.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '栎水出焉，南流注于杠水——北地的水多南注，与南经相反。', en: 'The Li River rises here and flows south into the Gang waters — northern rivers run south, against the way of the south.' } },
    ],
    objects: [
      { name: { zh: '诸犍', en: 'Zhujian' }, note: { zh: '状如豹而长尾，人首牛耳，只生一目。善吒，行则衔尾，居则蟠尾。', en: 'Leopard-shaped with a long tail, a man’s head and ox’s ears, but one eye alone. Loud of cry, it carries its tail in its mouth when walking and coils it when at rest.' } },
      { name: { zh: '白鵺', en: 'Baiye' }, note: { zh: '状如雉而文首白翼黄足，食之已嗌痛。', en: 'Shaped like a pheasant with a patterned head, white wings and yellow feet; eaten, it cures a sore throat.' } },
    ],
    omen: { zh: '诸犍长吒震谷——北行的开场便有吼声，山行人心头一凛。', en: 'The Zhujian’s long roar shakes the valley — the northward road opens with a bellow, and the traveler’s heart goes cold.' },
    note: { zh: '北方的山从一声兽吼里开始，寒意比水汽先到。', en: 'The northern mountains begin with a beast’s roar; the cold arrives before the mist does.' },
  },
  danxun: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北山经首山系之山。', en: 'A mountain of the first range of the Northern Hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北行百八十里而至，山多赤铜、多松柏。', en: 'One hundred eighty li north; much red copper on the mountain, many pines and cypresses.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '熏水出焉，西流注于棠水。', en: 'The Xun River rises here and flows west into the Tang waters.' } },
    ],
    objects: [
      { name: { zh: '耳鼠', en: 'Ershu' }, note: { zh: '状如鼠，兔头麋身，以其尾飞。食之不䐆，又可御百毒。', en: 'Shaped like a mouse with a hare’s head and an elk’s body, it flies on its tail. Eaten, it wards off bloating and keeps off a hundred poisons.' } },
      { name: { zh: '松柏', en: 'Pine and Cypress' }, note: { zh: '北地少见的常绿，山中人取松脂入药。', en: 'Evergreens rare in the north; the mountain folk gather pine resin for medicine.' } },
    ],
    omen: { zh: '耳鼠以尾飞行，是药非祸——北行的第二站便见了善意。', en: 'The Ershu flies on its tail — medicine, not harm; already at the second stop the north shows kindness.' },
    note: { zh: '尾巴当翅膀的小兽掠过松柏之间，山行人笑出了声。', en: 'The little beast sails tail-first between pine and cypress, and the traveler laughs aloud.' },
  },
  guanti: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北山经首山系之山。', en: 'A mountain of the first range of the Northern Hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北行三百五十里而至。', en: 'Three hundred fifty li north.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '匠韩之水出焉，西流注于泑泽，其中多磁石。', en: 'The waters of Jianghan rise here and flow west into the You Marsh, which holds much lodestone.' } },
    ],
    objects: [
      { name: { zh: '竦斯', en: 'Songsi' }, note: { zh: '状如雌雉而人面，见人则跃——北山里最亲人的鸟。', en: 'Shaped like a hen pheasant with a human face, it leaps up at the sight of people — the friendliest bird in the northern hills.' } },
      { name: { zh: '磁石', en: 'Lodestone' }, note: { zh: '水中所出，能引铁。两千年前沉在水底，两千年后指向北方。', en: 'Drawn from the water, it draws iron to it. Two thousand years sunk in the pool; two thousand years pointing north.' } },
    ],
    omen: { zh: '竦斯见人则跃，无凶兆——磁石静卧水中，倒像是山留给行人的指路物。', en: 'The Songsi leaps at the sight of men, no ill omen in it — the lodestone lying quiet in the water seems a gift of the mountain, a guide left for travelers.' },
    note: { zh: '人面的鸟跳起来打招呼，山行人也学着它蹦了一步。', en: 'The human-faced bird hops up in greeting; the traveler, in play, hops a step after it.' },
  },
  daxian: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北山经首山系之山。', en: 'A mountain of the first range of the Northern Hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北二百八十里，无草木，冬夏有雪。', en: 'Two hundred eighty li north; no grass, no trees, and snow in winter and summer alike.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川——雪线之上，水皆为冰。', en: 'The text names no outflow — above the snowline, all water is ice.' } },
    ],
    objects: [
      { name: { zh: '长蛇', en: 'Long Serpent' }, note: { zh: '其毛如彘毫，其音如鼓柝——叫声像敲梆子的蛇。', en: 'Its hair like boar’s bristles, its voice like a watchman’s rattle — a snake that sounds like a clapper.' } },
    ],
    omen: { zh: '长蛇鸣如击柝——听见梆子声，便知道该绕道了。', en: 'The serpent cries like a clapper — when you hear the rattle, you know it is time to take the long way round.' },
    note: { zh: '夏日积雪的山道上，只有梆子声在山谷里来回。', en: 'On the snow-covered road of summer, only the clapper sounds back and forth in the valley.' },
  },
  guancen: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北次二经之首山，在河之东，其首枕汾。', en: 'First mountain of the second transcript of the north, east of the Yellow River, its head pillowed on the Fen.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '此程起于管涔，北行数千里面海而止。', en: 'This leg sets out from Guancen and runs north several thousand li until it meets the sea.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '汾水出焉，西流注于河——汾河的源头在此。', en: 'The Fen River rises here and flows west into the Yellow River — the wellspring of the Fen is here.' } },
    ],
    objects: [
      { name: { zh: '何罗鱼', en: 'Heluo Fish' }, note: { zh: '一首而十身，其音如吠犬。食之已痈。', en: 'One head and ten bodies, its voice like a barking dog. Eaten, it cures abscesses.' } },
    ],
    omen: { zh: '何罗鱼食之已痈——怪模样倒是良药，北方的水先给了甜头。', en: 'The Heluo fish eaten cures abscesses — an odd shape for a fine remedy; the waters of the north offer sweetness first.' },
    note: { zh: '汾水源头的犬吠声里，十个鱼身摆成了一树花。', en: 'In the barking at the Fen’s wellspring, ten fish-bodies spread like blossom on a tree.' },
  },
  gouwu: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北次二经之山。', en: 'A mountain of the second transcript of the north.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北行三百里而至，山多金玉。', en: 'Three hundred li north; the mountain holds much gold and jade.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川。', en: 'The text names no outflow.' } },
    ],
    objects: [
      { name: { zh: '狍鸮', en: 'Paoxiao (Taotie)' }, note: { zh: '羊身人面，其目在腋下，虎齿人爪，音如婴儿——是食人的凶兽，后名饕餮。', en: 'A sheep’s body with a human face, eyes set under its arms, tiger’s teeth and man’s claws, crying like an infant — a man-eating fiend known to later ages as the Taotie.' } },
    ],
    omen: { zh: '狍鸮食人——婴儿啼声最诱人也最危险，北行至此要结伴。', en: 'The Paoxiao eats men — nothing is so alluring, or so dangerous, as an infant’s cry; north of here, walk in company.' },
    note: { zh: '腋下长眼的兽影一闪，山行人把火把拢得更紧。', en: 'A beast with eyes beneath its arms flits past; the traveler draws his torch closer.' },
  },
  shaoxian: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北次二经之山，在钩吾山以北。', en: 'A mountain of the second transcript of the north, lying north of Mount Gouwu.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北行三百五十里而至，山上无草木。', en: 'Three hundred fifty li north; the mountain is bare of grass and tree.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '敦水出焉，东流注于雁门之水——水名一直用到今天的边关。', en: 'The Dun River rises here and flows east into the waters of Yanmen — a river name that still marks the frontier pass today.' } },
    ],
    objects: [
      { name: { zh: '窫窳', en: 'Yayu' }, note: { zh: '状如牛而赤身人面马足，音如婴儿，是食人。', en: 'Ox-shaped with a red body, a human face and horse’s hooves, crying like an infant — a man-eater.' } },
      { name: { zh: '独犭谷', en: 'Duyu' }, note: { zh: '状如虎而白身犬首马尾彘鬣的猛兽。', en: 'A fierce beast shaped like a tiger, white-bodied, dog-headed, horse-tailed, with a boar’s bristles.' } },
    ],
    omen: { zh: '窫窳、独犭谷同山——北山经的凶兽浓度，在这里到了顶。', en: 'Yayu and Duyu share one mountain — the fierce beasts of the Northern Hills reach their thickest here.' },
    note: { zh: '刚别过饕餮又遇窫窳，山行人一路不曾卸甲。', en: 'Hardly past the Taotie before meeting the Yayu; the traveler never once bares his blade on the road.' },
  },
  dunti: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北次二经的最末一山。', en: 'The last mountain of the second transcript of the north.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北三百里，是錞于北海——山脚压着北海。', en: 'Three hundred li north, resting upon the Northern Sea — the mountain’s foot presses the water.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '北临大海，水皆归海。', en: 'The great sea lies to the north; every water here returns to it.' } },
    ],
    objects: [
      { name: { zh: '北海', en: 'The Northern Sea' }, note: { zh: '北行的终点是海——山系在此入水，行程在此收束。', en: 'The northward road ends at the sea — the range enters the water here, and the journey closes here.' } },
    ],
    omen: { zh: '海纳百川，兆不复起——第二程在涛声里平静收尾。', en: 'The sea takes in a hundred rivers and no more omens rise — the second leg ends quietly in the sound of waves.' },
    note: { zh: '独犭谷踏着海边沙石远去，像这一程山系的尾音。', en: 'The Duyu pads away over the beach stones, like the dying note of this whole range.' },
  },
  macheng: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北次三经（太行为首）之山。', en: 'A mountain of the third transcript of the north (which begins with Taihang).' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北行二百里而至，此程为北山经最长的一线。', en: 'Two hundred li north; this leg is the longest line in the Northern Hills.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川，山临虖沱水系。', en: 'The text names no outflow; the mountain borders on the Hutuo waters.' } },
    ],
    objects: [
      { name: { zh: '天马', en: 'Heavenly Horse' }, note: { zh: '状如白犬而黑头，见人则飞，其鸣自詨——北经的颜值担当。', en: 'Shaped like a white dog with a black head, it flies off at the sight of people, calling its own name — the beauty of the Northern classic.' } },
    ],
    omen: { zh: '天马见人则飞，无凶无吉——难得只管好看不管预言的兽。', en: 'The Heavenly Horse flies at the sight of men, neither ill nor good — a rare beast that only has to be beautiful, and keeps no prophecies.' },
    note: { zh: '黑头白犬腾空而起，山行人仰头看了半晌。', en: 'The black-headed white hound soars up, and the traveler watches with lifted head a long while.' },
  },
  fajiu: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北次三经之山，西临发鸠之泽。', en: 'A mountain of the third transcript of the north, looking west to the Marsh of Fajiu.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北行二百里而至。', en: 'Two hundred li north.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '漳水出焉，东流注于河——浊漳河的源头。', en: 'The Zhang River rises here and flows east into the Yellow River — the wellspring of the muddy Zhang.' } },
    ],
    objects: [
      { name: { zh: '精卫', en: 'Jingwei' }, note: { zh: '文首白喙赤足，本是炎帝少女女娃，溺于东海所化。常衔西山木石，以堙东海。', en: 'Patterned head, white beak, red feet — once Nüwa, youngest daughter of the Flame Emperor, drowned in the Eastern Sea and transformed. She carries twigs and stones from the western hills to fill the Eastern Sea in.' } },
      { name: { zh: '柘木', en: 'Cudrania' }, note: { zh: '山上多柘，叶可饲蚕，木可为弓。', en: 'Cudrania grows thick here; its leaves feed silkworms and its wood is made into bows.' } },
    ],
    omen: { zh: '精卫填海——不祥不吉，只是一念不息。北山经的情感高潮在此。', en: 'Jingwei fills the sea — neither ill nor good, only a single thought that will not rest. The heart of the Northern classic is here.' },
    note: { zh: '小鸟一趟一趟飞过漳河，山行人望着它，很久没有说话。', en: 'The little bird crosses the Zhang again and again; the traveler watches, and for a long while says nothing.' },
  },
  xuanyuan: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北次三经之山。', en: 'A mountain of the third transcript of the north.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北行四百里而至。', en: 'Four hundred li north.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川。', en: 'The text names no outflow.' } },
    ],
    objects: [
      { name: { zh: '黄鸟', en: 'Yellow Bird' }, note: { zh: '状如枭而白首，其鸣自詨。食之不妒——吃了它心平气和。', en: 'Shaped like an owl with a white head, it calls its own name. Eaten, it cures jealousy — eat it and the heart is at peace.' } },
      { name: { zh: '铜、竹', en: 'Copper and Bamboo' }, note: { zh: '上多铜，下多竹——矿物与草木各占一层山。', en: 'Copper above, bamboo below — mineral and plant, each keeping its own story of the mountain.' } },
    ],
    omen: { zh: '黄鸟食之不妒——北经里少有的温柔一页。', en: 'The Yellow Bird eaten cures jealousy — one of the few gentle pages in the Northern classic.' },
    note: { zh: '铜与竹的山，风过竹梢的声音也和平。', en: 'A mountain of copper and bamboo; even the wind through the tips sounds at peace.' },
  },
  wufeng: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '北次三经之山，全经北行的最后一站。', en: 'A mountain of the third transcript of the north, the last stop of the classic’s northward road.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '北望鸡号之山，西望幽都之山——三山相望的绝顶。', en: 'Looking north to Mount Jihao, west to Mount Youdu — a summit from which three mountains behold one another.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '浴水出焉——发源于幽都之山。', en: 'The Yu River rises here — springing from Mount Youdu.' } },
    ],
    objects: [
      { name: { zh: '大蛇', en: 'Great Serpent' }, note: { zh: '赤首白身，其音如牛。见则其邑大旱。', en: 'Red-headed and white-bodied, its voice like an ox. Seen, and great drought comes to the town.' } },
    ],
    omen: { zh: '大蛇兆旱——全经在凶兆里停住，只有精卫的翅膀还在往返。', en: 'The Great Serpent foretells drought — the classic halts on an ill omen, and only Jingwei’s wings still go back and forth.' },
    note: { zh: '北望鸡号，西望幽都，风里像有相劦之声。北卷在此合上。', en: 'Jihao to the north, Youdu to the west, and in the wind a sound of joined labor. The northern scroll is shut here.' },
  },

  /* ———— 东山经 ———— */
  shuzhu: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '东山经首山系之首山。', en: 'First mountain of the first range of the Eastern Hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '此程凡十二山、三千六百里，沿食水东行。', en: 'Twelve mountains and 3,600 li on this leg, going east along the Shi waters.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '北临食水——东山经以水为邻开场。', en: 'The Shi waters lie to the north — the Eastern Hills open with water for a neighbor.' } },
    ],
    objects: [
      { name: { zh: '食水', en: 'The Shi Waters' }, note: { zh: '山北所临之水，水中多鳢鱼——东山的水路从这里起步。', en: 'The water the mountain faces on the north, rich in mullet — the waterways of the east set out from here.' } },
    ],
    omen: { zh: '开场无兆，只有一湾食水——东行的从容从水边开始。', en: 'No omen at the opening, only a bend of the Shi waters — the ease of the eastward road begins at the water’s edge.' },
    note: { zh: '东山之行始于水畔，潮气比山林先来。', en: 'The eastern journey begins by the water; the sea damp arrives before the forest does.' },
  },
  congzhuang: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '东山经首山系之山。', en: 'A mountain of the first range of the Eastern Hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '南行三百里而至，山多桑柘、多泿石。', en: 'Three hundred li south; much mulberry and cudrania, much gen stone.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '食水南流而注于沙陵之泽。', en: 'The Shi waters flow south into the Marsh of Shaling.' } },
    ],
    objects: [
      { name: { zh: '从从', en: 'Congcong' }, note: { zh: '状如犬而六足，其鸣自詨。它出现的那一年，天下大熟。', en: 'Dog-shaped with six legs, it calls its own name. The year it appears, the world has abundant harvest.' } },
      { name: { zh: '桑柘', en: 'Mulberry and Cudrania' }, note: { zh: '山多桑柘，养蚕缫丝是东山人家的生计。', en: 'Mulberry and cudrania cover the mountain; raising silkworms and reeling silk is the living of the eastern households.' } },
    ],
    omen: { zh: '从从报丰年——路上第一个预兆竟是丰收，好兆头。', en: 'The Congcong brings word of a full year — the first omen of the road turns out to be harvest; a fine sign.' },
    note: { zh: '六足的犬形兽叫着自己的名字，山行人听了满心欢喜。', en: 'The six-legged, dog-shaped beast calls its own name, and the traveler listens with delight.' },
  },
  taishan: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '东山经首山系之山——即五岳之尊的泰山。', en: 'A mountain of the first range of the Eastern Hills — Mount Tai itself, first of the Five Peaks.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '南行三百里而至。', en: 'Three hundred li south.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '环水出焉，东流注于江，其中多水玉。', en: 'The Huan waters rise here and flow east into the Jiang, holding much water-crystal.' } },
    ],
    objects: [
      { name: { zh: '水玉', en: 'Water Crystal' }, note: { zh: '环水所出，晶莹如冰——古人以为水精之魂。', en: 'Yielded by the Huan waters, clear as ice — the ancients took it for the soul of the water made stone.' } },
      { name: { zh: '金玉', en: 'Gold and Jade' }, note: { zh: '上多玉，下多金，泰山是东山经的富山。', en: 'Jade above, gold below — Mount Tai is the rich mountain of the Eastern classic.' } },
    ],
    omen: { zh: '无凶兆——岳镇之山自有威仪，凶兽不近。', en: 'No ill omen — a mountain of the sacred peaks keeps its own majesty, and fierce beasts keep their distance.' },
    note: { zh: '东山第一程在泰山脚下收束，河神皆人身龙首。', en: 'The first leg of the east closes at the foot of Mount Tai, where the river gods wear human bodies and dragon heads.' },
  },
  kongsang: {
    survey: [
      { name: { zh: '山系归属', en: 'Range' }, note: { zh: '东山经第二山系之首山。', en: 'First mountain of the second range of the Eastern Hills.' } },
      { name: { zh: '里距方位', en: 'Distance & Bearing' }, note: { zh: '南三百里而至，无草木，冬夏有雪。', en: 'Three hundred li south; no grass, no trees, and snow in winter and summer alike.' } },
      { name: { zh: '水系流向', en: 'Waters' }, note: { zh: '经文未载出水之川——雪峰之上，水皆凝冰。', en: 'The text names no outflow — above the snow peak, all water is frozen ice.' } },
    ],
    objects: [
      { name: { zh: '积雪', en: 'Everlasting Snow' }, note: { zh: '冬夏不化的雪线——相传神农、颛顼皆兴于此地。', en: 'A snowline that neither winter nor summer melts — where Shennong and Zhuanxu, the legends say, first rose to power.' } },
    ],
    omen: { zh: '雪兆丰年，却也有人迹罕至的冷冽——古圣之地，气象自重。', en: 'Snow promises a full year, yet carries a cold few men have touched — the ground of ancient sages keeps its own gravity.' },
    note: { zh: '第二程的门在雪里开着，山行人裹紧了衣裳。', en: 'The gate of the second leg stands open in the snow; the traveler wraps his clothes about him.' },
  },
  yueyu: {
    survey: [
      { name: '山系归属', note: '东山经第二山系之山。' },
      { name: '里距方位', note: '南行三百里而至。' },
      { name: '水系流向', note: '经文未载出水之川，山多湿气。' },
    ],
    objects: [
      { name: '犰狳', note: '状如菟而鸟喙，鸱目蛇尾。见则螽蝗为败——它一出现，蝗灾便至。' },
    ],
    omen: '犰狳现而螽蝗成灾——东行的灾异序曲从这里响起。',
    note: '蛇尾兔形的兽一晃而过，山里人已经在备粮了。',
  },
  gengshan: {
    survey: [
      { name: '山系归属', note: '东山经第二山系之山。' },
      { name: '里距方位', note: '南行四百里而至，无草木，多水碧。' },
      { name: '水系流向', note: '经文未载出水之川，水碧生于冷山。' },
    ],
    objects: [
      { name: '朱獳', note: '状如狐而鱼翼，其鸣自詨。见则其国有恐。' },
      { name: '水碧', note: '水中美玉，生于无草木的冷山——石亦知水。' },
    ],
    omen: '朱獳见则国恐——鱼翼的狐一叫，人心便慌。',
    note: '美石与凶兆同出一山，山行人取石而不敢久留。',
  },
  beishan: {
    survey: [
      { name: '山系归属', note: '东山经第二山系之山，密林东段的界山。' },
      { name: '里距方位', note: '南行三百里而至，山多柢石。' },
      { name: '水系流向', note: '经文未载出水之川，再向东即是海岸。' },
    ],
    objects: [
      { name: '絜钩', note: '状如凫而鼠尾，善登木。见则其县多土功。' },
    ],
    omen: '絜钩兆土功——徭役的预兆追着山行人过了三程。',
    note: '蝗灾、国恐、土功——三兽三兆，密林的尽头是一个个预言。',
  },
  shihu: {
    survey: [
      { name: '山系归属', note: '东山经第三山系之首山，海路之始。' },
      { name: '里距方位', note: '南水行八百里而至——从此不再有陆路。' },
      { name: '水系流向', note: '南临滂水，海路为途。' },
    ],
    objects: [
      { name: '山神', note: '人身羊角——自此程起，山神换了面孔，是海的神。' },
      { name: '蒺藜', note: '山下多蒺藜，行路者最防的带刺之物。' },
    ],
    omen: '山神易容，兆无可解——海上行程，凭的是胆气。',
    note: '船离岸时回望，人身羊角的神立在山巅。',
  },
  zhizhong: {
    survey: [
      { name: '山系归属', note: '东山经第三山系之山，海途之中。' },
      { name: '里距方位', note: '南水行七百里而至。' },
      { name: '水系流向', note: '山有水泽，广圆二百步而不生草木。' },
    ],
    objects: [
      { name: '鮯鮯鱼', note: '状如鸡而赤毛，三尾六足四首，其音如鹊。见则其邑大旱。' },
    ],
    omen: '鮯鮯兆大旱——无草木的水泽里游着旱象本身。',
    note: '鹊声从水面传来，山行人抬头看见四个鱼头。',
  },
  mouyu: {
    survey: [
      { name: '山系归属', note: '东山经第三山系之山。' },
      { name: '里距方位', note: '南水行五百里而至。' },
      { name: '水系流向', note: '南临渤海之滨。' },
    ],
    objects: [
      { name: '精精', note: '状如牛而马尾，其鸣自詨。' },
    ],
    omen: '精精无兆——马尾的牛叫着自己的名字，是海路上的一支闲曲。',
    note: '海风止于无皋，第三程的水路走完了。',
  },
  beihao: {
    survey: [
      { name: '山系归属', note: '东山经第四山系之首山，临于北海。' },
      { name: '里距方位', note: '此程凡八山，起于海岛。' },
      { name: '水系流向', note: '北临北海——最后一程自海上开始。' },
    ],
    objects: [
      { name: '猲狙', note: '状如狼，赤首鼠目，其音如豚，是食人。' },
      { name: '鬿雀', note: '状如鸡而白首，鼠足虎爪，亦食人。' },
    ],
    omen: '猲狙、鬿雀同栖——凶兽的浓度在这里最高，登岛要结大帮。',
    note: '最后一程从海岛开始，狼声雀影皆不怀好意。',
  },
  nuzheng: {
    survey: [
      { name: '山系归属', note: '东山经第四山系之山，海岛之上。' },
      { name: '里距方位', note: '南水行三百里而至。' },
      { name: '水系流向', note: '石膏水出焉，西流注于鬲水。' },
    ],
    objects: [
      { name: '薄鱼', note: '状如鳣而一目，其音如欧。见则天下大旱。' },
    ],
    omen: '薄鱼一目而天下旱——岛上的预言越来越重。',
    note: '一只眼的鱼浮出石膏水，山行人记下了水位。',
  },
  shanshan: {
    survey: [
      { name: '山系归属', note: '东山经第四山系之山。' },
      { name: '里距方位', note: '南水行四百里而至。' },
      { name: '水系流向', note: '经文未载出水之川，山临海气。' },
    ],
    objects: [
      { name: '合窳', note: '状如彘而人面，黄身赤尾，音如婴啼。食人亦食虫蛇，见则天下大水。' },
    ],
    omen: '合窳兆大水——最后一只凶兽之后，山行人开始盼吉兆。',
    note: '婴儿啼声从林中传来，山行人辨了方向，绕道而行。',
  },
  qinshan: {
    survey: [
      { name: '山系归属', note: '东山经最末之山，全经收卷。' },
      { name: '里距方位', note: '南水行五百里而至，凡八山、一千七百里。' },
      { name: '水系流向', note: '南临海水——东山经以海收尾。' },
    ],
    objects: [
      { name: '当康', note: '状如豚而有牙，其鸣自詨。见则天下大穰。' },
    ],
    omen: '当康报大穰——凶过之后，吉来收尾，东山经圆满合卷。',
    note: '獠牙的小猪绕场报丰年，全经在此停住。',
  },

  /* ———— 中山经 ———— */
  xianshan: {
    survey: [
      { name: '山系归属', note: '中次一经（济山山系）之山。' },
      { name: '里距方位', note: '西行二百五十里而至，多金玉而无草木。' },
      { name: '水系流向', note: '鲜水出焉，北流注于伊水。' },
    ],
    objects: [
      { name: '鸣蛇', note: '状如蛇而四翼，其音如磬。见则其邑大旱。' },
    ],
    omen: '鸣蛇如磬，敲的是旱声——中山经的第一笔预兆。',
    note: '裸岩赭石间只有鲜水北流，水汽里开始有了旱声。',
  },
  yangshan: {
    survey: [
      { name: '山系归属', note: '济山山系之山，在鲜山以西。' },
      { name: '里距方位', note: '西三百里而至，多石而无草木。' },
      { name: '水系流向', note: '阳水出焉，北流注于伊水。' },
    ],
    objects: [
      { name: '化蛇', note: '人面豺身，鸟翼蛇行，其音如叱呼。见则其邑大水。' },
    ],
    omen: '鸣蛇报旱、化蛇报水——一程之内旱涝皆至，水汽越来越重。',
    note: '叱呼声顺着伊水传来，山行人两次抬头看天。',
  },
  aoanshan: {
    survey: [
      { name: '山系归属', note: '中次三经（萯山山系）之首山。' },
      { name: '里距方位', note: '此程凡五山，自敖岸始。' },
      { name: '水系流向', note: '北望河林，黄河在北——水脉皆归大河。' },
    ],
    objects: [
      { name: '夫诸', note: '状如白鹿而四角，见则其邑大水——周身水气的鹿。' },
      { name: '熏池', note: '居此山的神，掌敖岸一山。' },
    ],
    omen: '夫诸现而大水至——白鹿四角，是洪水最温柔的使者。',
    note: '北望河林如睥睨，四角白鹿立在水畔。',
  },
  qingyaoshan: {
    survey: [
      { name: '山系归属', note: '萯山山系之山，实惟帝之密都。' },
      { name: '里距方位', note: '东十里而至——萯山山系里相距最近的一程。' },
      { name: '水系流向', note: '畛水出焉，北流注于河。' },
    ],
    objects: [
      { name: '武罗', note: '人面豹纹，小要白齿，穿耳以鐻，其鸣如鸣玉——山神中最美的一位。' },
      { name: '䔄草', note: '方茎黄花，实如菟丝。服之媚于人。' },
    ],
    omen: '宜女子——对女子最温柔的一座山，兆亦柔顺。',
    note: '玉鸣声里进密都，这一程走得眉目舒展。',
  },
  kushan: {
    survey: [
      { name: '山系归属', note: '中次四经（厘山山系一脉）之山，苦山山系之名山。' },
      { name: '里距方位', note: '东行三百里而至。' },
      { name: '水系流向', note: '经文未载出水之川，山泉润泽黄棘。' },
    ],
    objects: [
      { name: '山膏', note: '状如豚而赤，善詈——最会骂人的兽。见则天下大风。' },
      { name: '黄棘', note: '黄华员叶，其实如兰。服之字子——可治不育。' },
    ],
    omen: '山膏善詈而天下风——骂声起处，大风将至。',
    note: '赤红的小豚在林间骂骂咧咧，山行人捂耳疾行。',
  },
  guyaoshan: {
    survey: [
      { name: '山系归属', note: '厘山山系之山。' },
      { name: '里距方位', note: '东二十里而至——又一程近路。' },
      { name: '水系流向', note: '经文未载出水之川，雾如轻纱。' },
    ],
    objects: [
      { name: '䔄草', note: '帝女所化，其叶胥成，黄花黑实。服之媚于人。' },
      { name: '朏朏', note: '状如狸而白尾白鬣的灵狸，性驯，能解忧。' },
    ],
    omen: '帝女化草、灵狸解忧——悲伤与温柔都在这一站。',
    note: '黄花重叶的草在雾里开着，山行人驻足静听。',
  },
  fengshan: {
    survey: [
      { name: '山系归属', note: '厘山山系之山。' },
      { name: '里距方位', note: '东行三百里而至。' },
      { name: '水系流向', note: '清泠之渊在山下——耕父常游之潭。' },
    ],
    objects: [
      { name: '九钟', note: '霜降则自鸣——知霜的钟，半掩于林莽。' },
      { name: '雍和', note: '状如猨，赤目赤喙黄身。见则国有大恐。' },
      { name: '耕父', note: '出入有光的神，游于清泠之渊。' },
    ],
    omen: '雍和兆国恐，九钟报霜——暗朱色的阴云正压过来。',
    note: '钟鸣霜降，潭底有光——山行人在此听了一夜的钟。',
  },
  minshan: {
    survey: [
      { name: '山系归属', note: '中次九经（岷山山系）之首山。' },
      { name: '里距方位', note: '东北三百里而至，黛青主峰之下。' },
      { name: '水系流向', note: '江水出焉，东北流注于海——长江之源在经文中的写法。' },
    ],
    objects: [
      { name: '夔', note: '状如牛，苍身无角，一足。出入水必风雨，其光如日月，其声如雷。' },
      { name: '犀、象', note: '其兽多犀象——古时蜀地气候温润的注脚。' },
    ],
    omen: '夔出则风雨随行，光如日月——大江源头的气象之神。',
    note: '一足的巨兽踞于江源，梅棠花林开在黛青山下。',
  },
  guangshan: {
    survey: [
      { name: '山系归属', note: '岷山山系之山。' },
      { name: '里距方位', note: '东北四百里而至。' },
      { name: '水系流向', note: '漳渊在山下——计蒙出入之潭。' },
    ],
    objects: [
      { name: '计蒙', note: '人身龙首，恒游于漳渊。出入必有飘风暴雨。' },
    ],
    omen: '计蒙出水则风雨至——龙首的神是天气预报本身。',
    note: '碧玉矿色满山，漳渊上空云脚低垂。',
  },
  dongtingshan: {
    survey: [
      { name: '山系归属', note: '中次十二经（洞庭山系）之首山，全中山经的收卷之地。' },
      { name: '里距方位', note: '东南一百二十里，在九江之间。' },
      { name: '水系流向', note: '澧沅之风，交潇湘之渊——众水在此交汇成大泽。' },
    ],
    objects: [
      { name: '帝之二女', note: '居于洞庭，常游于江渊。出入必以飘风暴雨。' },
      { name: '青蛇黄蛇', note: '二女所操之蛇，出入与共。' },
    ],
    omen: '二女出游则风雨大作——中山经在神女的暴风里合卷。',
    note: '九江之间浩渺大泽，山行至此，五经俱尽。',
  },
}

export function getMountainJournalNote(sceneId) {
  return mountainJournalNotes[sceneId] || null
}
