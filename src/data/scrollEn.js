// 英文版长卷文案（scrollEn）
// 与 src/data/*.json 一一对应：SCROLL_EN[id].scenes[sceneId] 提供题名/引题/释文英文；
// 缺省时组件回退到中文原文，故可分卷补齐。
export const SCROLL_EN = {
  nanshan: {
    title: 'Classic of the Southern Mountains',
    tagline: 'South of the mountains, along the waters',
    finale: {
      note: 'The hills are rich with cassia, the waters with herbs, and the beasts speak in omens — the southern mountains are at once a garden of remedies and a book of prophecies.',
      quote: 'From Zhaoyao to Jiwei, the first chapter of the Southern Mountains runs through ten mountains, two thousand nine hundred and fifty li. — The Classic of Mountains and Seas',
    },
    scenes: {
      zhaoyao: {
        title: 'Mount Zhaoyao · Setting Out',
        kicker: 'Southern Mountains · First Range',
        translation: 'There is a beast here shaped like an ape with white ears, called the Xingxing. Whoever eats it becomes a swift runner.',
      },
      zuyang: {
        title: 'Mount Zuyang · the Lushu',
        kicker: 'First Range · First Auspicious Beast',
        translation: 'There is a beast shaped like a horse with a white head, tiger stripes and a red tail; it sings like a human voice — the Lushu. Wearing its pelt makes descendants flourish.',
      },
      dishan: {
        title: 'Mount Di · Dying in Winter, Living in Summer',
        kicker: 'First Range · Marvel Beast',
        translation: 'There is a fish shaped like an ox that dwells on the hills, with a serpent tail and wings beneath its ribs, lowing like an ox — the Lu. It lies dead through winter and revives in summer; eating it cures swelling.',
      },
      qingqiu: {
        title: 'Mount Qingqiu · the Nine-Tailed Fox',
        kicker: 'First Range · Famous Beast',
        translation: 'There is a beast shaped like a fox with nine tails; its cry is like a laughing infant, and it devours people. Whoever eats it is beyond the reach of evil charms.',
      },
      guishan: {
        title: 'Mount Gui · the Zhu Bird',
        kicker: 'Southern Mountains · Second Range',
        translation: 'There is a bird shaped like a hawk with human hands, crying like a hen quail — the Zhu, a name it calls itself. Wherever it appears, worthy men are sent into exile.',
      },
      yaoguang: {
        title: 'Mount Yaoguang · the Huaihuai',
        kicker: 'Second Range · First Omen',
        translation: 'There is a beast shaped like a human with pig bristles that burrows and sleeps through winter — the Huaihuai. Wherever it appears, the county will be burdened with great corvée labor.',
      },
      luwu: {
        title: 'Mount Luwu · the Gudiao',
        kicker: 'Second Range · Fierce Beast',
        translation: 'There is a beast in the waters called the Gudiao, shaped like an eagle with horns, crying like an infant — a man-eater.',
      },
      daoguo: {
        title: 'Mount Daoguo · the Juru and the Hujiao',
        kicker: 'Southern Mountains · Third Range',
        translation: 'The Gen River rises on Mount Daoguo and flows south to the sea. In it lives the Hujiao, fish-bodied and serpent-tailed, crying like mandarin ducks; eating it cures swelling. There is also the Juru bird, white-headed with three feet and a human face, calling its own name.',
      },
      danxue: {
        title: 'Mount Danxue · the Phoenix',
        kicker: 'Third Range · Auspicious Omen',
        translation: 'On Mount Danxue there is a bird shaped like a rooster, its five-colored feathers richly patterned — the Phoenix. It eats and drinks with ease, sings and dances of itself, and where it appears all under heaven is at peace.',
      },
      nanyu: {
        title: 'Mount Nanyu · Journey\'s End',
        kicker: 'Third Range · Final Stop',
        translation: 'On Mount Nanyu perch the phoenix and the Yuanchu, birds of good omen that appear only when the world is at peace.',
      },
    },
  },
  xishan: {
    title: 'Classic of the Western Mountains',
    tagline: 'The hills of Kunlun, where myth lives in the west',
    finale: {
      note: 'The farther west, the older the gods; at the road\'s end stand Kunlun and the setting sun.',
      quote: 'From Qianlai to Gui, the first chapter of the Western Mountains runs through nineteen mountains, two thousand nine hundred and fifty-seven li. — The Classic of Mountains and Seas',
    },
    scenes: {
      qianwei: {
        title: 'Mount Qianlai · The Westward Start',
        kicker: 'Western Mountains · First Range',
        translation: 'There is a beast shaped like a sheep with a horse\'s tail, called the Qianyang; its fat is a salve for chapped skin.',
      }, taihua: {
        title: 'Mount Taihua · the Feiyi',
        kicker: 'First Range · First Dire Omen',
        translation: 'There is a serpent here called the Feiyi, with six legs and four wings; wherever it appears, the world will suffer drought.',
      },
      yuanci: {
        title: 'Mount Yuci · the Luan Bird',
        kicker: 'First Range · Auspicious Omen',
        translation: 'There is a bird shaped like an owl, its plumage five-colored and patterned — the Luan. Wherever it appears, all under heaven is at peace.',
      },
      huangshan: {
        title: 'Mount Huang · the Parrot',
        kicker: 'First Range · The Bird That Speaks',
        translation: 'There is a bird shaped like an owl with green feathers and a red beak; it has a human tongue and can speak — the Parrot.',
      },
      lutai: {
        title: 'Mount Lutai · the Fuxi',
        kicker: 'Second Range · Human-Faced Bird',
        translation: 'There is a bird shaped like a cock with a human face, called the Fuxi; it calls its own name, and where it appears, war is coming.',
      },
      xiaoci: {
        title: 'Mount Xiaoci · the Zhuyan',
        kicker: 'Second Range · Omen of War',
        translation: 'There is a beast shaped like an ape with a white head and red feet, called the Zhuyan. Wherever it appears, great war will rise.',
      },
      huaijiang: {
        title: 'Mount Huaijiang · the God Yingzhao',
        kicker: 'Third Range · The Emperor\'s Garden',
        translation: 'The god Yingzhao governs here: horse-bodied and human-faced, patterned in tiger stripes, winged like a bird, he tours the four seas bearing the Emperor\'s mandate.',
      },
      kunlun: {
        title: 'The Hills of Kunlun · the God Luwu',
        kicker: 'Third Range · The Emperor\'s Earthly Capital',
        translation: 'The god Luwu governs here: tiger-bodied with nine tails, human-faced with tiger claws, he keeps the nine regions of heaven and the seasons of the Emperor\'s garden.',
      },
      yushan: {
        title: 'Mount Yu · the Queen Mother of the West',
        kicker: 'Third Range · Mountain of the Queen Mother',
        translation: 'The Queen Mother of the West has a human form with a leopard\'s tail and tiger\'s fangs; she is skilled in long whistles, her disheveled hair bound with a jade sheng, and she governs the plagues of heaven and the five punishments. A beast called the Jiao, dog-like with leopard markings, lives here; where it appears the state reaps a great harvest.',
      },
      'zhang\'e': {
        title: 'Mount Zhang\'e · the Bifang',
        kicker: 'Third Range · Omen of Fire',
        translation: 'There is a bird shaped like a crane with a single leg, red patterns on green plumage and a white beak — the Bifang. It calls its own name, and where it appears, strange fires break out in the city.',
      },
      tianshan: {
        title: 'Mount Tian · the God Dijiang',
        kicker: 'Third Range · Song of the Unformed',
        translation: 'Here dwells a god shaped like a yellow sack, red as cinnabar fire, with six legs and four wings — formless and faceless, yet understanding song and dance: the Dijiang.',
      },
      wenyao: {
        title: 'Mount Taiqi · the Flying Fish Wenyao',
        kicker: 'Third Range · Fish on the Wing',
        translation: 'The waters teem with the Wenyao, carp-shaped with bird wings, green-patterned with a white head and red beak. It makes its rounds from the Western Sea to the Eastern Sea, flying by night; in the year it appears, the world reaps plenty.',
      },
      yanzi: {
        title: 'Mount Yanzi · the God Rushou',
        kicker: 'Third Range · Mountain of the Setting Sun',
        translation: 'The Classic Beyond the Western Seas records the western god Rushou, with a serpent coiled about his left ear, riding two dragons through the sky.',
      },
      guishan: {
        title: 'Mount Gui · the Qiongqi',
        kicker: 'Fourth Range · One of the Four Fiends',
        translation: 'There is a beast called the Qiongqi, ox-shaped with hedgehog bristles, howling like a dog — a man-eater among the four fiends. The waters also hold the Ying fish, fish-bodied with bird wings; where it appears, the city will be flooded.',
      },
      yanzi4: {
        title: 'Mount Yanzi · the Shuhu',
        kicker: 'Fourth Range · Final Stop',
        translation: 'There is a beast called the Shuhu, horse-bodied with bird wings, human-faced and serpent-tailed, fond of lifting people up. The rites for the gods of these hills: one white dog offered in prayer, fine grain as the feast.',
      },
    },
  },
  beishan: {
    title: 'Classic of the Northern Mountains',
    tagline: 'Northward, ever northward, to the cold marshes',
    finale: {
      note: 'The farther north, the deeper the snow; at the road\'s end lie the cold marshes and the sea that Jingwei fills.',
      quote: 'From Shanhu to Di, the first chapter of the Northern Mountains runs through twenty-five mountains, five thousand four hundred and ninety li. — The Classic of Mountains and Seas',
    },
    scenes: {
      danhu: {
        title: 'Mount Danzhang · the Zhujian',
        kicker: 'Northern Mountains · First Range · The Shouting Beast',
        translation: 'There is a beast shaped like a leopard with a long tail, a human face, ox ears and a single eye, called the Zhujian. Loud of voice, it walks with its tail in its mouth and sleeps with it coiled.',
      },
      danxun: {
        title: 'Mount Danxun · the Ershu',
        kicker: 'First Range · First Beast',
        translation: 'There is a beast shaped like a mouse with a rabbit\'s head and a deer\'s body, barking like a dog, that flies by its tail — the Ershu. Eating it cures belly-bloat and wards off a hundred poisons.',
      },
      guanti: {
        title: 'Mount Guanti · the Sisi',
        kicker: 'First Range · Lodestone',
        translation: 'On Mount Guanti the Jianghan waters flow west into the You marshes, which yield lodestone. There is a bird, the Sisi, like a hen pheasant with a human face, that hops up to greet people.',
      },
      daxian: {
        title: 'Mount Daxian · the Long Serpent',
        kicker: 'First Range · The Snow Mountain',
        translation: 'Mount Daxian bears no plants; snow lies on it summer and winter. The long serpent here wears bristles like a pig\'s mane and clatters like a woodblock when it calls.',
      },
      guancen: {
        title: 'Mount Guancen · the Heluo Fish',
        kicker: 'Northern Mountains · Second Range · One Head, Ten Bodies',
        translation: 'Mount Guancen rests its head on the Fen River, which rises here and flows west to the Yellow River. In the water swims the Heluo, one head on ten bodies, barking like a dog; eating it cures abscesses.',
      },
      gouwu: {
        title: 'Mount Gouwu · the Paoxiao',
        kicker: 'Second Range · Face of Taotie',
        translation: 'There is a beast with a sheep\'s body and a human face, eyes under its armpits, tiger fangs and human nails, crying like an infant — the Paoxiao, a man-eater.',
      },
      shaoxian: {
        title: 'Mount Shaoxian · the Yayu',
        kicker: 'Second Range · Fierce Beast',
        translation: 'On Mount Shaoxian lives the Yayu, ox-shaped with a red body, human face and horse hooves, crying like an infant — it eats people. The Dun River rises here and flows east into the Yanmen waters.',
      },
      dunti: {
        title: 'Mount Dunti · the Dugu',
        kicker: 'Second Range · Final Stop · Tiger Body, Dog Head',
        translation: 'Three hundred li farther north stands Mount Dunti, pressed close against the North Sea like a bell-knob set on the shore.',
      },
      macheng: {
        title: 'Mount Macheng · the Heavenly Horse',
        kicker: 'Northern Mountains · Third Range',
        translation: 'There is a beast shaped like a white dog with a black head that leaps into the sky at the sight of a person — the Tianma, the Heavenly Horse, crying its own name.',
      },
      fajiu: {
        title: 'Mount Fajiu · Jingwei',
        kicker: 'Third Range · Carrying Stones to Fill the Sea',
        translation: 'Mount Fajiu is covered with mulberry. There is a bird with patterned head, white beak and red feet, called the Jingwei. She was once Nüwa, youngest daughter of the Flame Emperor, drowned in the Eastern Sea; now she carries twigs and stones from the western hills, unceasing, to fill the sea.',
      },
      xuanyuan: {
        title: 'Mount Xuanyuan · the Yellow Bird',
        kicker: 'Third Range · Eating It Cures Envy',
        translation: 'Mount Xuanyuan is rich in copper above and bamboo below. A small owl-like bird with a white head calls its own name — the Yellow Bird; whoever eats it is never seized by envy.',
      },
      wufeng: {
        title: 'Chunyu Wufeng Mountain · the Great Serpent',
        kicker: 'Third Range · Final Stop',
        translation: 'Chunyu Wufeng looks north to Jihao, west to Youdu. A great serpent lives here, red-headed and white-bodied, lowing like an ox; where it appears, the city suffers drought.',
      },
    },
  },
  dongshan: {
    title: 'Classic of the Eastern Mountains',
    tagline: 'Eastward, ever eastward, until the sea',
    finale: {
      note: 'The farther east, the less the gods look like humans; at the road\'s end are the sea and the harvest.',
      quote: 'From Shuzhu to Zhu, the first chapter of the Eastern Mountains runs through twelve mountains, three thousand six hundred li. — The Classic of Mountains and Seas',
    },
    scenes: {
      shuzhu: {
        title: 'Mount Shuzhu · Setting Out',
        kicker: 'Eastern Mountains · First Range',
        translation: 'The first mountain of the Eastern Mountains is Shuzhu, its northern face hard against the Shi waters.',
      },
      congzhuang: {
        title: 'Mount Xunzhuang · the Congcong',
        kicker: 'First Range · First Beast',
        translation: 'There is a beast shaped like a dog with six legs, called the Congcong, crying its own name. In the year it appears, the world reaps a great harvest.',
      },
      taishan: {
        title: 'Mount Tai · Journey\'s End',
        kicker: 'First Range · Final Stop',
        translation: 'Mount Tai is rich in jade above and gold below. The Huan waters rise here and flow east into the river, yielding water-jade.',
      },
      kongsang: {
        title: 'Mount Kongsang · Into the Forest',
        kicker: 'Eastern Mountains · Second Range',
        translation: 'Three hundred li farther south stands Mount Kongsang, bare of plants, snow lying on it winter and summer alike.',
      },
      yueyu: {
        title: 'Mount Yu\'e · the Qiuyu',
        kicker: 'Second Range · First Omen',
        translation: 'There is a beast shaped like a rabbit with a bird\'s beak, hawk eyes and a serpent tail, called the Qiuyu. Wherever it appears, locusts swarm and the five grains suffer.',
      },
      gengshan: {
        title: 'Mount Geng · the Zhuru',
        kicker: 'Second Range · Second Omen',
        translation: 'There is a beast shaped like a fox with fish fins, called the Zhuru, crying its own name. Wherever it appears, fear will grip the state.',
      },
      beishan: {
        title: 'Mount Min · the Xiegou',
        kicker: 'Second Range · Third Omen',
        translation: 'There is a beast shaped like a wild duck with a rat\'s tail, skilled at climbing trees, called the Xiegou. Wherever it appears, the county will be burdened with corvée labor.',
      },
      shihu: {
        title: 'Mount Shihu · Leaving the Shore',
        kicker: 'Eastern Mountains · Third Range',
        translation: 'Eight hundred li farther south by water stands Mount Shihu, rich in gold and jade above, thick with brambles below.',
      },
      zhizhong: {
        title: 'Mount Qizhong · the Gugug',
        kicker: 'Third Range · Six-Legged Marvel Fish',
        translation: 'In the marsh swims the Gugu fish, shaped like a rooster with red fur, three tails, six legs and four heads, crying like a magpie. Wherever it appears, the city will suffer drought.',
      },
      mouyu: {
        title: 'Mount Mouyu · Ending in the Wind',
        kicker: 'Third Range · Final Stop',
        translation: 'There is a beast shaped like an ox with a horse\'s tail, called the Jingjing, crying its own name.',
      },
      beihao: {
        title: 'Mount Beihao · By the Sea',
        kicker: 'Eastern Mountains · Fourth Range',
        translation: 'Mount Beihao stands on the North Sea. The Geju, wolf-like with a red head and rat eyes, cries like a pig — a man-eater; the Qique, chicken-like with a white head, rat feet and tiger claws, eats people too.',
      },
      nuzheng: {
        title: 'Mount Nüzheng · the Bo Fish',
        kicker: 'Fourth Range · Dire Omen',
        translation: 'The Shigao waters teem with the Bo fish, shaped like an eel with a single eye, crying like a person retching. Wherever it appears, the world suffers drought.',
      },
      shanshan: {
        title: 'Mount Shan · the Heyu',
        kicker: 'Fourth Range · Dire Omen',
        translation: 'There is a beast shaped like a pig with a human face, yellow body and red tail, crying like a wailing infant — the Heyu, eating people and snakes alike. Wherever it appears, great floods rise.',
      },
      qinshan: {
        title: 'Mount Qin · the Dangkang',
        kicker: 'Fourth Range · Great Harvest',
        translation: 'There is a beast shaped like a pig with tusks, called the Dangkang, crying its own name. Wherever it appears, the world reaps a great harvest.',
      },
    },
  },
  zhongshan: {
    title: 'Classic of the Central Mountains',
    tagline: 'The heart of all under heaven',
    finale: {
      note: 'The waters are thick with omens and the hills with hidden palaces — at the center of the world dwell the gods, the wind and the rain.',
      quote: 'From Yiwang to Ji, the Jing mountain ranges run through forty-eight mountains, three thousand seven hundred and thirty-two li. — The Classic of Mountains and Seas',
    },
    scenes: {
      xianshan: {
        title: 'Mount Xian · the Ming Serpent',
        kicker: 'Central Mountains · First of the Ji Ranges',
        translation: 'Mount Xian is rich in gold and jade with no plants; the Xian waters flow north into the Yi. In them lives the Ming serpent, four-winged, ringing like a chime stone — where it appears, the city suffers drought.',
      },
      yangshan: {
        title: 'Mount Yang · the Hua Serpent',
        kicker: 'Ji Ranges · Omen of Water',
        translation: 'Mount Yang is stony and bare; the Yang waters flow north into the Yi. The Hua serpent in them has a human face, a jackal\'s body, bird wings, and moves like a snake, shouting like a scolding person — where it appears, the city will be flooded.',
      },
      aoanshan: {
        title: 'Mount Ao\'an · the Fuzhu',
        kicker: 'First of the Fu Ranges',
        translation: 'Mount Ao\'an heads the Fu ranges, rich in Yu jade to the south and ochre and gold to the north; the god Xunchi dwells here. The Fuzhu beast is like a white deer with four horns — where it appears, the city will be flooded.',
      },
      qingyaoshan: {
        title: 'Mount Qingyao · the God Wuluo',
        kicker: 'Fu Ranges · The Emperor\'s Hidden Capital',
        translation: 'Mount Qingyao is in truth the Emperor\'s hidden capital, a mountain kind to women. Its god Wuluo has a human face patterned in leopard spots, a slender waist and white teeth, wears golden earrings, and his voice rings like struck jade.',
      },
      kushan: {
        title: 'Mount Ku · the Shangao',
        kicker: 'Central Mountains · The Bo Ranges',
        translation: 'Mount Ku bears the huangji, yellow-flowered and round-leafed, good for healing; its grass is mostly the wutiao. The Shangao beast is like a small pig, wholly crimson, and curses better than anything alive — where it appears, great winds sweep the world.',
      },
      guyaoshan: {
        title: 'Mount Guyao · the Herb of the Emperor\'s Daughter',
        kicker: 'Bo Ranges · The Transformed Herb',
        translation: 'The Emperor\'s daughter died on Mount Guyao and became the yao grass — leaves doubled, yellow flowers, fruit like dodder. Whoever eats it will be deeply loved.',
      },
      fengshan: {
        title: 'Mount Feng · the Yonghe',
        kicker: 'Bo Ranges · The Frost Bells',
        translation: 'On Mount Feng stand nine bells that ring of themselves when the frost descends; the god Gengfu haunts the Qingling deeps, shining as he comes and goes. The Yonghe beast is ape-like with red eyes, red beak and yellow body — where it appears, great terror seizes the state.',
      },
      minshan: {
        title: 'Mount Min · the Kui Ox',
        kicker: 'Mount Min · Where the Great River Rises',
        translation: 'Mount Min is the source of the Jiang, flowing northeast to the sea. The Kui is ox-shaped, dark and hornless, with a single leg; it brings wind and rain whenever it enters or leaves the water, shining like sun and moon, sounding like thunder.',
      },
      guangshan: {
        title: 'Mount Guang · the God Jimeng',
        kicker: 'Jing Ranges · God of Wind and Rain',
        translation: 'Mount Guang is rich in green jade above and wooded below. The god Jimeng has a human body and a dragon\'s head and haunts the Zhang deeps — whenever he emerges, whirlwinds and driving rains follow.',
      },
      dongtingshan: {
        title: 'Mount Dongting · The Two Daughters of the Emperor',
        kicker: 'Jing Ranges · The Closing Scroll',
        translation: 'Mount Dongting is the dwelling of the Emperor\'s two daughters, who roam the deeps of the river. The winds of Li and Yuan meet in the Xiaoxiang deeps between the nine rivers; wherever they go, whirlwind and storm arise.',
      },
    },
  },
}
