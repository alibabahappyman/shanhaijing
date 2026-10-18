// Editorial copy is written from each scene's quoted passage. Keep guide text
// separate from source quotations so creative framing cannot be mistaken for scripture.
export const EXHIBITION = {
  dongshan: {
    label: { zh: '卷一 · 东行', en: 'Scroll I · Eastward' },
    intro: {
      zh: '循水识山，穿林渡海。\n沿着《东山经》的记述，读山川、水脉与异兽征兆。',
      en: 'Follow the waters to know the mountains; pass through forests and cross the seas.\nAlong the account of the Eastern Mountains Classic, read of mountains, waterways, and the omens of strange beasts.',
    },
    closing: { zh: '从西海到北海，山川行程有尽，古书里的想象仍在延伸。', en: 'From the Western Sea to the Northern Sea, the journey through mountains and rivers has its end, yet the imagination of the ancient books still extends onward.' },
    closingNote: { zh: '这一卷以连续的山名、里程、水流与物产，写出一条由陆地通向海岸的山行路线。', en: 'This scroll, through an unbroken sequence of mountain names, distances, waterways, and produce, traces a mountain route leading from the inland to the coast.' },
    sections: [
      { zh: '从临于西海的樕䘄山开卷。经文沿途记录山名、水流与物产，建立东行的路线。', en: 'The scroll opens at Mount Shuzhu, which overlooks the Western Sea. The classic records mountain names, waterways, and produce along the way, establishing the eastward route.' },
      { zh: '进入次二经，山水记述与异兽征兆并置，犰狳、朱獳、絜钩依次出现。', en: 'Entering the second series, accounts of mountains and waters stand alongside omens of strange beasts, as Qiuyu, Zhuru, and Xiegou appear in turn.' },
      { zh: '路线转入水行，经过流沙与水泽；跂踵山的记述将视线带到鮯鮯鱼。', en: 'The route turns to travel by water, passing drifting sands and marshes; the account of Mount Zhizhong brings the eye to the Kuaikuai Fish.' },
      { zh: '由北号山进入次四经。薄鱼、合窳与当康接连出现，征兆从旱涝写到丰年。', en: 'The fourth series begins from Mount Beihao. Boyu, Heyu, and Dangkang appear one after another, the omens moving from drought and flood to years of plenty.' },
    ],
    scenes: {
      shuzhu: {
        point: [66, 67], lead: { zh: '从临于西海的樕䘄山开始，东行路线由此展开。', en: 'The eastward route unfolds from Mount Shuzhu, which overlooks the Western Sea.' }, caption: { zh: '方位 · 临于西海', en: 'Position · Overlooking the Western Sea' },
        guide: { zh: '开篇先写山的位置：樕䘄山临近西海。经文以山名和方位带出旅程起点。', en: 'The opening passage first records the mountain\'s position: Mount Shuzhu lies near the Western Sea. With a mountain name and a bearing, the classic sets out the starting point of the journey.' },
        story: { zh: '《东山经》以樕䘄山开卷。它临近西海，山上的桑柘与北流入海的食水，让这座山不仅是地图上的起点，也是一处有草木、有水脉的所在。循着这些线索，东行的长卷从这里展开。', en: 'The Eastern Mountains Classic opens with Mount Shuzhu. Near the Western Sea, its mulberry and cudrania trees and the Shishui flowing north into the sea make this mountain not merely a starting point on the map, but a place of plants and running waters. Following these threads, the long scroll of the eastward journey unfolds from here.' },
      },
      congzhuang: {
        lead: { zh: '六足异兽从从出现，带来的征兆却是丰收。', en: 'The six-legged beast Congcong appears, bearing an omen of abundant harvest.' }, caption: { zh: '异兽 · 从从', en: 'Beast · Congcong' },
        guide: { zh: '经文说从从形似犬，有六足，鸣声像是在呼唤自己的名字；它出现，被视为天下丰收的征兆。', en: 'The classic says Congcong resembles a dog and has six legs, its cry as if calling its own name; its appearance is read as a sign of plenty throughout the land.' },
      },
      taishan: {
        point: [53, 68], lead: { zh: '环水向东流入江，水中多水玉。', en: 'The Huanshui flows east into the river, its waters rich in crystal.' }, caption: { zh: '水系 · 环水东流', en: 'Water System · The Huanshui Flows East' },
        guide: { zh: '这段记述把山、水与物产连在一起：环水从山中发源，向东流入江，水里有水玉。', en: 'This passage binds mountain, water, and produce together: the Huanshui rises in the mountain, flows east into the river, and its waters hold crystal.' },
      },
      kongsang: {
        lead: { zh: '空桑山没有草木，冬夏都覆盖着雪。', en: 'Mount Kongsang has no grass or trees, covered in snow both winter and summer.' }, caption: { zh: '山貌 · 冬夏有雪', en: 'Mountain Aspect · Snow in Winter and Summer' },
        guide: { zh: '经文用两处鲜明特征描写空桑山：山上无草木，而且冬天、夏天都有雪。', en: 'The classic depicts Mount Kongsang with two striking traits: the mountain bears no vegetation, and it holds snow in winter and in summer alike.' },
      },
      yueyu: {
        lead: { zh: '犰狳形貌奇异，它出现的征兆指向蝗灾。', en: 'The Qiuyu is strange in form, and its appearance portends a plague of locusts.' }, caption: { zh: '异兽 · 犰狳', en: 'Beast · Qiuyu' },
        guide: { zh: '原文把它描述为兔身、鸟喙、鸱目、蛇尾，并说它出现会带来螽蝗之害。这里呈现的是古书中的灾异观念。', en: 'The original text describes it with a hare\'s body, a bird\'s beak, an owl\'s eyes, and a serpent\'s tail, and says its appearance brings the harm of locusts. What is presented here is the ancient book\'s notion of calamitous omens.' },
      },
      gengshan: {
        lead: { zh: '狐形鱼翼的朱獳，以鸣声和恐惧相连。', en: 'The Zhuru, fox-like with fish fins, is linked by its cry to fear.' }, caption: { zh: '异兽 · 朱獳', en: 'Beast · Zhuru' },
        guide: { zh: '经文写朱獳形似狐狸而生鱼翼，叫声如“獳”；它出现，被视为国中有恐惧的征兆。', en: 'The classic writes that the Zhuru resembles a fox yet grows fish fins, its cry sounding "ru"; its appearance is taken as a sign that fear has come upon the state.' },
      },
      beishan: {
        lead: { zh: '絜钩善于登树，它出现时，地方会兴起土木工程。', en: 'The Xiegou climbs trees with ease; when it appears, the locality will see much building work.' }, caption: { zh: '异兽 · 絜钩', en: 'Beast · Xiegou' },
        guide: { zh: '原文写它像野鸭而有鼠尾，善于爬树；“县多土功”指地方会有较多土木营建。经文将异兽与人间征兆并列记录。', en: 'The original text writes that it resembles a wild duck with a rat\'s tail and is adept at climbing trees; "much earthwork in the county" means the locality will see considerable construction. The classic sets the strange beast and human affairs side by side.' },
      },
      shihu: {
        side: 'right', point: [38, 70], lead: { zh: '水行八百里后抵达尸胡山，山上多金玉，山下多蒺藜。', en: 'After eight hundred li by water one reaches Mount Shihu, rich in gold and jade above and thorns below.' }, caption: { zh: '路线 · 水行八百里', en: 'Route · Eight Hundred Li by Water' },
        guide: { zh: '这段先用“水行八百里”交代行程，再分别记录尸胡山上下的物产：山上多金玉，山下多蒺藜。', en: 'The passage first states the distance with "eight hundred li by water," then records the produce above and below Mount Shihu: gold and jade on the heights, thorny plants at the foot.' },
      },
      zhizhong: {
        lead: { zh: '水泽中有鮯鮯鱼，三尾六足四首，出现预示旱情。', en: 'In the marsh lives the Kuaikuai fish, with three tails, six legs, and four heads; its appearance heralds drought.' }, caption: { zh: '水泽 · 鮯鮯鱼', en: 'Marsh · Kuaikuai Fish' },
        guide: { zh: '经文描写鮯鮯鱼像鸡、长红毛，有三尾六足四首，叫声像喜鹊；它出现，被视为当地大旱的征兆。', en: 'The classic describes the Kuaikuai fish as hen-like with red plumage, three tails, six legs, and four heads, crying like a magpie; its appearance is read as a sign of great drought in the region.' },
      },
      mouyu: {
        side: 'right', lead: { zh: '牛形马尾的精精，在踇隅山以自己的名字为名。', en: 'The Jingjing, ox-bodied with a horse\'s tail, on Mount Mouyu bears its own name as its name.' }, caption: { zh: '异兽 · 精精', en: 'Beast · Jingjing' },
        guide: { zh: '经文记载一种兽形似牛、长着马尾，名叫精精；它的鸣声像是在呼唤自己的名字。', en: 'The classic records a beast shaped like an ox with a horse\'s tail, named Jingjing; its cry sounds as if it were calling its own name.' },
      },
      beihao: {
        side: 'right', lead: { zh: '北号山临近北海，路线继续沿海展开。', en: 'Mount Beihao lies near the Northern Sea, and the route continues along the coast.' }, caption: { zh: '方位 · 临于北海', en: 'Position · Near the Northern Sea' },
        guide: { zh: '这一句以“临于北海”标出北号山的位置。地理方位仍是《山海经》组织山川路线的重要线索。', en: 'This line marks Mount Beihao\'s position with "near the Northern Sea." Geographic bearings remain a key thread by which the Classic of Mountains and Seas organizes its routes.' },
      },
      nuzheng: {
        side: 'right', lead: { zh: '石膏水中多薄鱼，古书将它与大旱相联系。', en: 'The Shigaoshui teems with the Boyu, which the ancient book ties to great drought.' }, caption: { zh: '水产 · 薄鱼', en: 'Water Creature · Boyu' },
        guide: { zh: '经文记下石膏水的名字和其中的薄鱼，并称薄鱼出现会带来大旱。这是原文所记的灾异征兆。', en: 'The classic records the name of the Shigaoshui and the Boyu within it, and says the fish\'s appearance brings great drought. This is the calamitous omen as the original text records it.' },
      },
      shanshan: {
        lead: { zh: '人面、黄身、赤尾，合窳的啼声像婴儿。', en: 'With a human face, a yellow body, and a red tail, the Heyu cries like an infant.' }, caption: { zh: '异兽 · 合窳', en: 'Beast · Heyu' },
        guide: { zh: '经文描写一种像猪的异兽，有人面、黄色身体和红色尾巴，叫声如婴儿；它出现，被视为洪水将至的征兆。', en: 'The classic describes a swine-like beast with a human face, a yellow body, and a red tail, crying like an infant; its appearance is read as a sign that flood waters are coming.' },
      },
      qinshan: {
        side: 'right', lead: { zh: '当康形似有牙的小猪，它出现意味着丰收。', en: 'The Dangkang resembles a small tusked pig, and its appearance means a bountiful harvest.' }, caption: { zh: '异兽 · 当康', en: 'Beast · Dangkang' },
        guide: { zh: '原文写当康像长着獠牙的小猪，鸣声像在呼唤自己的名字；它出现，被视为天下丰收的征兆。', en: 'The original text writes that the Dangkang is like a piglet with tusks, its cry as if calling its own name; its appearance is read as a sign of plenty throughout the land.' },
      },
    },
  },
  beishan: {
    label: { zh: '卷三 · 北行', en: 'Scroll III · Northward' },
    intro: {
      zh: '循着水脉向北，走过雪山、河源与幽都。\n在山川物产和异兽记述之间，读一卷北方行旅。',
      en: 'Follow the waterways northward, past snow mountains, river sources, and Youdu.\nBetween accounts of mountain produce and strange beasts, read a scroll of northern travel.',
    },
    closing: { zh: '山川行至北海，精卫仍衔着木石往返。', en: 'The journey of mountains and rivers reaches the Northern Sea, where Jingwei still flies back and forth, beak laden with twigs and stones.' },
    closingNote: { zh: '北山经以路线串起水源、物产、异兽与神话；山行抵达北海，故事仍留在读者心里。', en: 'The Northern Mountains Classic strings together springs, produce, strange beasts, and myth along its route; the mountain journey reaches the Northern Sea, yet the story lingers in the reader\'s mind.' },
    sections: [
      { zh: '从单张山向北行进，沿途记下水流、山产与异兽。', en: 'Advancing north from Mount Danzhang, the text records along the way the streams, mountain produce, and strange beasts.' },
      { zh: '次二经从管涔山和汾水写起，路线继续向北，抵达北海之滨。', en: 'The second series begins with Mount Guancen and the Fenshui; the route presses north to arrive at the shore of the Northern Sea.' },
      { zh: '北次三经起于太行。精卫衔石填海的故事在这一列山中展开，末段又望向幽都。', en: 'The third northern series begins at Taihang. The tale of Jingwei carrying stones to fill the sea unfolds among these mountains, and its final stretch looks toward Youdu.' },
    ],
    scenes: {
      danhu: {
        file: 'danzhang', lead: { zh: '诸犍守在单张山：豹身、人首、牛耳，只有一只眼睛。', en: 'Zhujian keeps watch on Mount Danzhang: a leopard\'s body, a human head, an ox\'s ears, and but a single eye.' }, caption: { zh: '异兽 · 诸犍', en: 'Beast · Zhujian' },
        guide: { zh: '经文细写诸犍的形貌和动作：行走时衔着尾巴，休息时盘起尾巴。山川记述也由此进入异兽图景。', en: 'The classic details the Zhujian\'s form and habits: it carries its tail in its mouth as it walks and coils it when at rest. Here the account of mountains and waters passes into the realm of strange beasts.' },
      },
      danxun: {
        lead: { zh: '耳鼠能以尾飞行，古书还记下食用它的说法。', en: 'The Ershu can fly by its tail, and the ancient book also records claims of eating it.' }, caption: { zh: '异兽 · 耳鼠', en: 'Beast · Ershu' },
        guide: { zh: '原文描述耳鼠像老鼠，兔首、麋身，以尾飞行，并记载食用后不胀、可以御百毒。这些是古籍中的记述，不作为现实功效说明。', en: 'The original text describes the Ershu as mouse-like, with a hare\'s head and a deer\'s body, flying by its tail, and records that eating it prevents bloating and wards off a hundred poisons. These are accounts from an ancient text, not claims of real-world effect.' },
      },
      guanti: {
        lead: { zh: '人面鸟竦斯见人便跃；匠韩之水中多磁石。', en: 'The human-faced bird Songsi leaps at the sight of people; the waters of Jianghan abound in lodestone.' }, caption: { zh: '山水 · 磁石', en: 'Mountain & Water · Lodestone' },
        guide: { zh: '这一段把异鸟与水中物产并列：竦斯像雌雉而有人面，见人会跳跃；匠韩之水里多磁石。', en: 'This passage sets a strange bird beside a water-borne mineral: the Songsi resembles a hen pheasant but has a human face and leaps when it sees people; the waters of Jianghan are rich in lodestone.' },
      },
      daxian: {
        lead: { zh: '大咸山无草木，冬夏有雪，长蛇的声音像敲梆子。', en: 'Mount Daxian has no vegetation, snow in winter and summer, and the Longsnake\'s cry is like a clapper striking wood.' }, caption: { zh: '山貌 · 冬夏有雪', en: 'Mountain Aspect · Snow in Winter and Summer' },
        guide: { zh: '经文先写大咸山的环境，再写长蛇：它身上的毛像猪鬃，声音如鼓柝。两种描写让山与异兽共同构成这一站的景象。', en: 'The classic first describes the setting of Mount Daxian, then the Longsnake: its hairs like pig bristles, its sound like a watchman\'s rattle. The two depictions let mountain and beast together compose the scene of this stop.' },
      },
      guancen: {
        beast: null, lead: { zh: '汾水发源于管涔山，向西流入河。', en: 'The Fenshui rises on Mount Guancen and flows west into the River.' }, caption: { zh: '水系 · 汾水之源', en: 'Water System · Source of the Fenshui' },
        guide: { zh: '管涔山是北次二经的起点之一。原文明确记录汾水发源于此，并向西流入河。', en: 'Mount Guancen is one of the starting points of the second northern series. The original text states plainly that the Fenshui rises here and flows west into the River.' },
      },
      gouwu: {
        lead: { zh: '羊身人面的狍鸮，眼睛长在腋下，原文称它食人。', en: 'The Paoxiao, sheep-bodied with a human face, has eyes beneath its arms; the original text calls it a maneater.' }, caption: { zh: '异兽 · 狍鸮', en: 'Beast · Paoxiao' },
        guide: { zh: '经文把狍鸮描写为羊身人面、腋下生眼，长着虎齿和人爪，声音像婴儿，并记为食人之兽。这里不把它与其他神话形象混为一谈。', en: 'The classic depicts the Paoxiao as sheep-bodied with a human face, eyes under its arms, tiger\'s teeth and human claws, its voice like an infant\'s, and records it as a beast that eats people. Here it is not conflated with other mythic figures.' },
      },
      shaoxian: {
        lead: { zh: '窫窳形似牛，有赤身、人面和马足；敦水从山中流出。', en: 'The Yayu resembles an ox, with a red body, a human face, and horse\'s hooves; the Dunshui flows out of the mountain.' }, caption: { zh: '异兽 · 窫窳', en: 'Beast · Yayu' },
        guide: { zh: '这一段先描述窫窳的形貌和食人特征，随后记录敦水东流、注入雁门之水。异兽与水系信息出现在同一处山川记述中。', en: 'The passage first describes the Yayu\'s form and its maneating nature, then records the Dunshui flowing east into the Yanmen waters. Beast and waterway appear together in a single account of mountains and rivers.' },
      },
      dunti: {
        lead: { zh: '北行至敦题山，路线记述抵达北海。', en: 'Traveling north to Mount Dunti, the account of the route arrives at the Northern Sea.' }, caption: { zh: '路线 · 至于北海', en: 'Route · Reaching the Northern Sea' },
        guide: { zh: '原文用“又北三百里”继续标记行程，并以“錞于北海”写出敦题山与北海的关系。', en: 'The original text marks the journey with "three hundred li further north," and with "lodged against the Northern Sea" describes Mount Dunti\'s relation to that sea.' },
      },
      macheng: {
        lead: { zh: '白犬黑头的天马见人便飞，是马成山的奇遇。', en: 'The Tianma, a white dog with a black head, flies at the sight of people — the marvel of Mount Macheng.' }, caption: { zh: '异兽 · 天马', en: 'Beast · Tianma' },
        guide: { zh: '经文记载一种白犬黑头的异兽，见到人就飞起，名为天马。短短几句同时交代形貌、动作与名称。', en: 'The classic records a strange beast, a white dog with a black head, that takes flight upon seeing people, named Tianma. In a few short lines it conveys form, behavior, and name at once.' },
      },
      fajiu: {
        lead: { zh: '女娃溺于东海后化为精卫，仍衔着西山木石填海。', en: 'Nüwa, drowned in the Eastern Sea, became Jingwei, who still carries twigs and stones from the Western Mountains to fill the sea.' }, caption: { zh: '神话 · 精卫填海', en: 'Myth · Jingwei Fills the Sea' },
        guide: { zh: '原文讲述炎帝之女女娃溺于东海，后来化作精卫，反复衔来西山的木石填海。这段把山海路线和神话叙事连在一起。', en: 'The original text tells of Nüwa, daughter of the Yan Emperor, drowned in the Eastern Sea, who then became the Jingwei bird and ceaselessly carried twigs and stones from the Western Mountains to fill the sea. This passage binds the route of mountains and seas to mythic narrative.' },
      },
      xuanyuan: {
        lead: { zh: '轩辕山多铜与竹，也记有白首枭形的黄鸟。', en: 'Mount Xuanyuan abounds in copper and bamboo, and also records a yellow bird, white-headed and owl-like.' }, caption: { zh: '山产 · 铜与竹', en: 'Mountain Produce · Copper and Bamboo' },
        guide: { zh: '经文先写山上的铜、山下的竹，再描写黄鸟像白首的枭，并记下关于食用它的说法。功效属于原文记述。', en: 'The classic first writes of copper on the mountain and bamboo below, then depicts the yellow bird like a white-headed owl, and records claims about eating it. The claimed benefits belong to the original account.' },
      },
      wufeng: {
        lead: { zh: '由錞于毋逢山远望鸡号与幽都，并记下一条赤首白身的大蛇。', en: 'From Mount Wufeng one gazes afar at Jihao and Youdu, and the text records a great serpent, red-headed and white-bodied.' }, caption: { zh: '远望 · 幽都之山', en: 'Distant View · Mount of Youdu' },
        guide: { zh: '原文从山上远望鸡号山和幽都山，随后写到赤首白身、声音如牛的大蛇，并将它出现与旱灾相联系。', en: 'The original text looks from the mountain toward Mount Jihao and Mount Youdu, then describes a great serpent, red-headed and white-bodied, its voice like an ox, and links its appearance to drought.' },
      },
    },
  },
  nanshan: {
    label: { zh: '卷四 · 南行', en: 'Scroll IV · Southward' },
    intro: {
      zh: '桂香与药草，泽国与征兆。\n沿着《南山经》的记述，从临海的招摇山走进南方群山。',
      en: 'The scent of cassia and healing herbs, a land of marshes and omens.\nAlong the account of the Southern Mountains Classic, enter the southern ranges from sea-bordering Mount Zhaoyao.',
    },
    closing: { zh: '佐水流入南海，凤凰自歌自舞——南方的山行在祥瑞里收束。', en: 'The Zuoshui flows into the Southern Sea, and the phoenix sings and dances of its own accord — the southern mountain journey closes amid auspice.' },
    closingNote: { zh: '这一卷以三条山系写南方：药草与异兽并存，凶兆与祥瑞交错，最终以凤凰现世作结。', en: 'This scroll writes the south through three mountain systems: healing herbs alongside strange beasts, ill omens crossing with auspicious ones, and at last the phoenix\'s appearance as its close.' },
    sections: [
      { zh: '从临于西海的招摇山开卷。经文沿途记下药草与瑞兽：祝馀、狌狌、鹿蜀、九尾狐依次出现。', en: 'The scroll opens at Mount Zhaoyao, which overlooks the Western Sea. Along the way the classic records healing herbs and auspicious beasts: Zhuyu, Xingxing, Lushu, and the nine-tailed fox appear in turn.' },
      { zh: '进入次二经，泽国水乡的征兆变得密集：鴸鸟、长右、猾褢、蛊雕，一只比一只凶。', en: 'Entering the second series, the omens of the watery marshland grow dense: the Zhu Bird, Changyou, Huaihuai, and Gu Diao, each fiercer than the last.' },
      { zh: '末程水泽遍布，虎蛟可医、瞿如自鸣，直到丹穴山的凤凰现世——见则天下安宁。', en: 'On the final stretch marshes spread everywhere — the Hu Jiao that heals, the Quru crying its own name — until the phoenix of Danxue Mountain appears: when it is seen, all under heaven is at peace.' },
    ],
    scenes: {
      zhaoyao: {
        point: [48, 72], lead: { zh: '招摇山临于西海之上，山上多桂，多金玉。', en: 'Mount Zhaoyao stands above the Western Sea, rich in cassia trees and in gold and jade.' }, caption: { zh: '方位 · 临于西海', en: 'Position · Overlooking the Western Sea' },
        guide: { zh: '开篇先写山的位置：南山经之首为鹊山，其首曰招摇之山，临近西海。南行长卷由此展开。', en: 'The opening first records the mountain\'s position: the first range of the Southern Mountains Classic is Que Mountain, whose first peak is Mount Zhaoyao, near the Western Sea. The long scroll of the southern journey unfolds from here.' },
        story: { zh: '《南山经》以招摇山开卷。它临于西海之上，山中多桂，有草名祝馀，食之不饥；有木名迷穀，佩之不迷。药草与瑞兽从第一站就并肩出现，构成了南方山系的基本底色。', en: 'The Southern Mountains Classic opens with Mount Zhaoyao. Standing above the Western Sea, the mountain abounds in cassia; there is a herb named Zhuyu, which when eaten wards off hunger, and a tree named Migu, which when worn prevents one from losing one\'s way. Herbs and auspicious beasts stand side by side from the very first stop, forming the base tone of the southern mountain system.' },
      },
      zuyang: {
        lead: { zh: '鹿蜀白首虎纹赤尾，鸣声像人在唱歌。', en: 'The Lushu, white-headed with tiger\'s stripes and a red tail, sings like a person.' }, caption: { zh: '异兽 · 鹿蜀', en: 'Beast · Lushu' },
        guide: { zh: '经文写鹿蜀形似马而白首，虎纹赤尾，声音如歌谣；佩其皮毛，宜子孙。', en: 'The classic writes that the Lushu resembles a horse but is white-headed, striped like a tiger with a red tail, its voice like a ballad; wearing its pelt brings blessing to one\'s descendants.' },
      },
      dishan: {
        lead: { zh: '鯥鱼住在山陵上，冬死夏生，食之无肿疾。', en: 'The Lu fish dwells on the hills, dying in winter and living again in summer; eating it prevents swellings.' }, caption: { zh: '异兽 · 鯥', en: 'Beast · Lu' },
        guide: { zh: '经文记柢山多水无草木，有鱼形如牛、蛇尾有翼，居于陵上，冬天蛰伏如死、夏天复生。', en: 'The classic records that Mount Di is full of water and bare of plants, and has a fish shaped like an ox with a serpent\'s tail and wings, dwelling on the mounds, dormant as if dead in winter and reviving in summer.' },
      },
      qingqiu: {
        point: [58, 62], lead: { zh: '九尾狐音如婴儿，能食人；食者不蛊。', en: 'The nine-tailed fox cries like an infant and can devour people; those who eat it are beyond harm.' }, caption: { zh: '异兽 · 九尾狐', en: 'Beast · Nine-Tailed Fox' },
        guide: { zh: '青丘山有兽状如狐而九尾，声音像婴儿。原文并记它食人、食者不蛊——凶与祥在同一只兽身上并存。', en: 'On Mount Qingqiu there is a beast like a fox with nine tails, its voice like an infant\'s. The original text also records that it eats people, and that those who eat it are untroubled by malign influences — menace and auspice coexist in the same creature.' },
      },
      guishan: {
        point: [44, 66], lead: { zh: '鴸鸟自号其名，见则其县多放士。', en: 'The Zhubird calls its own name; where it appears, the county sees many scholars sent into exile.' }, caption: { zh: '异兽 · 鴸', en: 'Beast · Zhu' },
        guide: { zh: '柜山有鸟状如鸱而人手，名字是自己叫出来的。它出现的地方，贤士被放逐——山川记述与人间际遇在此相连。', en: 'On Mount Gui there is a bird like an owl with human hands, its name cried out by itself. Where it appears, worthy scholars are banished — here the account of mountains and rivers meets the fortunes of humankind.' },
      },
      changyou: {
        lead: { zh: '长右四耳，见则郡县大水。', en: 'The Changyou has four ears; when it is seen, the commanderies and counties suffer great floods.' }, caption: { zh: '异兽 · 长右', en: 'Beast · Changyou' },
        guide: { zh: '经文记长右山无草木多水，有兽状如禺而四耳；它一现身，郡县便有水患。', en: 'The classic records that Mount Changyou is bare of plants and rich in water, and has a beast like an ape with four ears; the moment it appears, floods come upon the commanderies and counties.' },
      },
      yaoguang: {
        lead: { zh: '猾褢状如人而彘鬣，穴居冬蛰，见则县有大繇。', en: 'The Huaihuai is like a human with a pig\'s bristles, dwelling in burrows and dormant through winter; when it appears, the county is levied for great corvée labor.' }, caption: { zh: '异兽 · 猾褢', en: 'Beast · Huaihuai' },
        guide: { zh: '尧光山的异兽长着猪鬣，冬眠在洞穴里。它出现，县里便大兴徭役——征兆指向人间的劳役。', en: 'The beast of Mount Yaoguang bears a pig\'s bristles and winters asleep in burrows. When it appears, the county raises great levies of labor — the omen points to human toil.' },
      },
      luwu: {
        lead: { zh: '蛊雕状如雕而有角，音如婴儿，是食人。', en: 'The Gu Diao resembles an eagle yet bears horns, its voice like an infant\'s — and it eats people.' }, caption: { zh: '异兽 · 蛊雕', en: 'Beast · Gu Diao' },
        guide: { zh: '鹿吴山泽更之水一带有兽名蛊雕，叫声像婴儿啼哭。经文提醒：循声而去的人，会成为它的食物。', en: 'By the Zegeng waters of Mount Luwu lives a beast named Gu Diao, crying like a wailing infant. The classic gives warning: those who follow the sound will become its food.' },
      },
      tianyu: {
        point: [46, 70], lead: { zh: '天虞之山下多水，不可以上。', en: 'Below Mount Tianyu the waters are many, and one cannot ascend.' }, caption: { zh: '路线 · 入泽', en: 'Route · Entering the Marshes' },
        guide: { zh: '南次三经之首天虞山，山下全是水，路无法向上走。这一程以水行为主，凡十四山。', en: 'Mount Tianyu heads the third southern series; below it all is water, and the road cannot climb upward. This stretch is traveled mainly by water, comprising fourteen mountains in all.' },
      },
      daoguo: {
        lead: { zh: '瞿如三足人面，其鸣自号；泿水中有虎蛟。', en: 'The Quru, three-legged with a human face, cries its own name; in the Minshui lives the Hu Jiao.' }, caption: { zh: '异兽 · 瞿如', en: 'Beast · Quru' },
        guide: { zh: '祷过山有鸟三足人面、白首，自鸣其名；泿水中的虎蛟鱼身蛇尾，食之可以已痔。凶兆与药方并录。', en: 'On Mount Daoguo there is a bird, three-legged with a human face and a white head, crying its own name; the Hu Jiao of the Minshui has a fish\'s body and a serpent\'s tail, and eating it cures hemorrhoids. Ill omen and remedy are recorded together.' },
      },
      danxue: {
        point: [50, 58], lead: { zh: '凤凰五采而文，自歌自舞，见则天下安宁。', en: 'The phoenix is patterned in five colors, singing and dancing of its own accord; when it is seen, all under heaven is at peace.' }, caption: { zh: '祥瑞 · 凤凰', en: 'Auspice · Phoenix' },
        guide: { zh: '丹穴山有鸟状如鸡、五采而文，首文曰德、翼文曰义、背文曰礼、膺文曰仁、腹文曰信。它出现，天下安宁。', en: 'On Danxue Mountain there is a bird like a cock, patterned in five colors: the markings on its head spell Virtue, on its wings Duty, on its back Propriety, on its chest Benevolence, on its belly Trust. When it appears, all under heaven is at peace.' },
      },
      nanyu: {
        lead: { zh: '南禺之山佐水东南流注于海，有凤凰、鹓雏。', en: 'On Mount Nanyu the Zuoshui flows southeast into the sea, where the phoenix and the Yuanchu are found.' }, caption: { zh: '路线 · 注于海', en: 'Route · Flowing into the Sea' },
        guide: { zh: '末站南禺山，佐水向东南流入海，山间有凤凰与鹓雏。南方山行至此走到水尾。', en: 'The final stop is Mount Nanyu, where the Zuoshui flows southeast into the sea, and the phoenix and the Yuanchu dwell among the mountains. The southern mountain journey here reaches its watery end.' },
      },
    },
  },
}

export function paintingUrl(jing, sceneId) {
  const directory = jing === 'dongshan' ? 'dong' : jing === 'nanshan' ? 'nan' : jing === 'zhongshan' ? '中' : 'bei'
  const file = EXHIBITION[jing].scenes[sceneId]?.file || sceneId
  return `${import.meta.env.BASE_URL}assets/motion/${directory}/${file}.webp`
}
