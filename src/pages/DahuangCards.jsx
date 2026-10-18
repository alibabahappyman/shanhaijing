import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DAHUANG_CARDS, DAHUANG_JING } from '../data/dahuangCards.js'
import { DAHUANG_NARRATIVES } from '../data/dahuangNarratives.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import RuArrow from '../components/RuArrow.jsx'
import './DahuangCards.css'

const ART = {
  dahuangdong: '/assets/dahuang/east.webp',
  dahuangnan: '/assets/dahuang/south.webp',
  dahuangxi: '/assets/dahuang/west.webp',
  dahuangbei: '/assets/dahuang/north.webp',
}
const MOOD = {
  dahuangdong: { mark: '东', title: { zh: '日出扶桑', en: 'Sunrise at Fusang' }, detail: { zh: '晨海 · 扶桑 · 十日', en: 'Morning Sea · Fusang · Ten Suns' } },
  dahuangnan: { mark: '南', title: { zh: '甘渊之南', en: 'South of the Sweet Pool' }, detail: { zh: '赤土 · 甘木 · 羽民', en: 'Red Earth · Sweet Tree · Feathered Folk' } },
  dahuangxi: { mark: '西', title: { zh: '月出荒西', en: 'Moonrise in the Western Waste' }, detail: { zh: '月轮 · 山泽 · 长风', en: 'Moon Disk · Hills and Marshes · Long Wind' } },
  dahuangbei: { mark: '北', title: { zh: '九首镇极北', en: 'Nine Heads Guard the North' }, detail: { zh: '寒山 · 逐日 · 九凤', en: 'Cold Peaks · Sun-Chaser · Nine Phoenix' } },
}
const CLUES = {
  w_east1: { zh: '羲和在甘渊为十日沐浴，日轮逐一升起。', en: 'Xihe bathes the ten suns at Gan Valley; the solar disks rise one by one.' },
  w_east2: { zh: '应龙佐战，后来居于南方，故南方多雨。', en: 'Yinglong fought and later dwelt in the south — hence the southern rains.' },
  w_east3: { zh: '有易之地留下了王亥与牛的传说。', en: 'The land of Youyi keeps the legend of Wang Hai and his oxen.' },
  w_east4: { zh: '九日居扶桑下枝，一日居上枝。', en: 'Nine suns roost on Fusang\'s lower branches; one holds the top.' },
  w_south1: { zh: '巫臷之民，不织不耕而衣食自足。', en: 'The Wuzhi people, clothed and fed without weaving or plowing.' },
  w_south2: { zh: '不死之国，以甘木为食。', en: 'The deathless land, feeding on the sweet tree.' },
  w_south3: { zh: '三身之国，帝俊神裔，役使四鸟。', en: 'The Three-Body land, of Di Jun\'s line, commanding the four birds.' },
  w_south4: { zh: '夏商更替也被写进大荒。', en: 'Even the Xia–Shang dynastic change is written into the Waste.' },
  w_west1: { zh: '十二个月轮，在水中轮流沐浴。', en: 'Twelve moon disks, bathed in turn in the waters.' },
  w_west2: { zh: '十位神人化生于大荒之野。', en: 'Ten divine beings born of transformation in the wilds.' },
  w_west3: { zh: '西北之神掌日月长短。', en: 'The god of the northwest keeps the length of sun and moon.' },
  w_west4: { zh: '西周之国有耕作之祖。', en: 'The land of Western Zhou holds the first ancestor of farming.' },
  w_north1: { zh: '弃杖化邓林，追日之路留在荒北。', en: 'His staff became a peach forest; the sun-chaser\'s road stays in the north.' },
  w_north2: { zh: '北极天柜山上，九首人面鸟身的尊贵神鸟。', en: 'On Arctic Tiangui mountain, the exalted bird: nine heads, human faces.' },
  w_north3: { zh: '虎首人身，衔蛇操蛇，威镇极北。', en: 'Tiger\'s head, human body, serpents in mouth and hand — dread of the far north.' },
  w_north4: { zh: '应龙蓄水，风伯雨师纵风雨。', en: 'Yinglong stored his waters; the Wind and Rain Lords loosed the storm.' },
}

// 英文长篇叙事（与 dahuangNarratives.js 中文段落一一对应；未完成时回退中文）
const DAHUANG_NARRATIVES_EN = {
  w_east1: [
    'In the myth, Xihe wears many faces. She is first the Mother of Ten Suns — wife of Di Jun, mother of ten suns. The ten solar disks take their turns on duty, one rising as another sets, keeping the order of day and night across heaven and earth.',
    'She is also the charioteer of the sun. Each morning Xihe harnesses six dragons to the solar chariot and escorts one sun-child from the Tang Valley in the east, across the sky, until evening brings it to the Valley of Meng in the west.',
    'She is the goddess of the calendar besides: observing the motions of sun, moon and stars, setting the calendar, teaching people to tell the seasons and the hours — later generations honored her as the founding ancestor of Chinese timekeeping. Mother, charioteer, lawgiver: one goddess, keeping watch over the whole life of the sun.',
    'The ten suns were meant to take turns, but they grew playful and rose into the sky all at once. The earth scorched, the crops withered, and the people despaired. Yi the archer drew his bow and shot down nine of the suns, leaving one to run its proper course — the tenderness of the sun-bathing story thus connects to the terror of the sun-shooting one.',
    'The echoes reach us still. The idiom "mending heaven and bathing the suns" pairs Nüwa\'s patching of the sky with Xihe\'s bathing of the suns, a figure for the power to remake nature and rescue a desperate situation; and in 2021, when China launched its first solar observatory satellite, it was named Xihe — in tribute to the goddess of the sun.',
  ],
  w_east2: [
    'The Battle of Zhuolu is the most famous war in ancient Chinese myth. The Yellow Emperor faced Chiyou, chieftain of the Nine Li tribes — the first to forge metal weapons, whose eighty-one brothers all had bronze heads and iron brows.',
    'Yinglong, the Winged Dragon, was the Yellow Emperor\'s champion: a dragon with wings who could summon cloud and rain. Chiyou called up the Lords of Wind and Rain and whipped up a storm; the Yellow Emperor ordered Yinglong to dam his waters and strike back. The duel deadlocked until the drought goddess Ba descended, stopped the rain, and Yinglong finally cut Chiyou down on the field.',
    'Yet the hero\'s victory was not a happy one. His slaughter had been too great, his divine power spent: Yinglong could never fly back to heaven. He settled in the south — which is why the south has so much rain. The Central Plains lost their rain god and often dried; the ancients drew his image and sacrificed to it, praying for rain.',
    'History answers this war too. Chiyou was honored by later ages as the "Lord of Arms": both Qin Shi Huang and Liu Bang, founder of the Han, sacrificed to him when they raised armies or toured the realm. The Shan Hai Jing says Yinglong killed Chiyou and Kua Fu both — a different ending from "Kua Fu died of thirst chasing the sun," hinting that Kua Fu\'s clan, allied with Chiyou, fell in the same war.',
    'Yinglong\'s story did not end there. When Yu the Great tamed the floods, the dragon came out of retirement again, dragging his tail to carve the river channels and lead the waters away — the war god retrained as chief engineer of water control.',
  ],
  w_east3: [
    'Wang Hai was an ancestor of paramount importance to the Shang people: surname Zi, name Hai — also written Zhen, Gai, He, or Gai in other records — called "High Ancestor Wang Hai" in the oracle bones. Descendant of Qi, son of Ming, elder brother of Wang Heng, he was the seventh chieftain of the Shang tribe.',
    'Every step of this family is carved into early China\'s memory: his ancestor Qi, for aiding Yu the Great in taming the floods, was appointed Situ by Shun and enfeoffed at Shang; his ancestor Xiangtu invented the method of riding horses; his father Ming served the Xia as Minister of Works and died taming the Yellow River, honored in sacrifice for ages after.',
    'On his succession Wang Hai developed herding and pioneered the art of "subduing oxen" — taming wild cattle to human use. From then on the ox became the force binding land, tribe and distant places together.',
    'He and his brother Wang Heng drove their cattle and flocks to the land of Youyi to trade. Its lord, Mianchen, feasted them — then suspicion stirred: Wang Hai was murdered in a strange land, his cattle and goods seized, and Wang Heng driven out.',
    'After Wang Hai\'s death his son Shang Jia inherited his will, gathered allies, attacked Youyi and had his revenge. And the very name "Shang," through this journey of trade, became bound forever with exchange and travel — hence "merchant" and "commerce" both trace back to the Shang people.',
  ],
  w_east4: [
    'Of the three great divine trees of the Shan Hai Jing, Fusang is the most famous and the most widely told — the sunrise tree of the east. Two passages of the classic record the same tree from two angles.',
    'The Classic of the Eastern Wilds beyond the Seas says: "Below is the Tang Valley; above the valley stands Fusang, where the ten suns bathe... nine rest on the lower branches, one on the topmost bough." The Classic of the Great Waste: East says: "Above the Tang Valley stands the Fu timber, a pillar three hundred li tall, its leaves like mustard. As one sun arrives, another departs; all are borne by the crows."',
    'Read together: it stands in the water, rooted in the scalding depths of the Tang Valley; three hundred li tall, straight as a pillar; its leaves tiny as mustard greens — like Jianmu, whose "leaves are like awns," a tree of immense height and minute foliage. Nine suns on the lower branches, one on top — and the topmost bough is today\'s sun on duty. Fusang is not a leafy tree standing on earth, but a divine pillar rising out of a boiling abyss into the sky.',
    'The three divine trees form the complete coordinate system of the sun\'s journey: in the east, Fusang, where the ten suns roost — the sun\'s departure point each day; in the center, Jianmu, standing at the exact middle of heaven and earth, the ladder by which the emperors ascended and descended, casting no shadow at noon; in the west, Ruomu, where the sun sets, its red leaves lighting the ground. Departure in the east, orientation in the middle, descent in the west.',
    'The scholar Yuan Ke proposed a curious conjecture: that the Fusang of the far east and the Ruomu of the far west are one and the same divine tree, named differently at sunrise and sunset — intriguing, though scholarship has not settled it.',
    'The tree\'s name traveled farther still. The Book of Liang records a "country of Fusang" more than twenty thousand li east of the "Great Han," its land rich in fusang timber, whence the name. From the Shan Hai Jing it entered the Songs of Chu — "I water my horses at the Xian Pool and knot my reins to Fusang" — and after the Han it came to mean the farthest east; from the Tang onward, poetry used it for Japan, and today it is fixed as a literary name for that country. A mythical tree, from the sunrise land of the east, traveled ever eastward until it became a name on the real map.',
  ],
  w_south1: [
    'In the Great Waste there is a most singular people: the Wuzhi. The text says they are of the Ban clan and eat grain — followed by the description everyone envies: "They spin no thread and weave no cloth, yet they are clothed; they sow no seed and reap no harvest, yet they are fed."',
    'No spinning, yet garments; no plowing, yet food. In a prehistoric world of scarce productivity this is a picture of near-miraculous ease — the most romantic image the ancients left us of their ideal of a society of plenty.',
    'This wealth did not come from nowhere. The land of Wuzhi is placed in the Wu-Ba cultural region centered on the Three Gorges of the Yangtze, around the modern border of Chongqing and Hubei — a country rich in salt and cinnabar. The Wuzhi traded salt and mineral for clothing and food: behind the "unearned plenty" lay heaven-given resources and far-reaching trade routes.',
    'The name "Wuzhi" itself announces its bond with shamanic culture. The Classic of the Great Waste: West records the Ten Shamans of Mount Ling — Wu Xian, Wu Ji, Wu Pan, Wu Peng and the rest — "ascending and descending upon it," passing between heaven and earth, masters of the hundred medicines. The Wuzhi were the shamans\' own tribe: the shaman mediated between humans, gods, nature and spirits, kept the rites and divination, held the medical knowledge — the tribe\'s wisest and most authoritative figure.',
    'The People of Wuzhi, then, can be read as an ancient tribe led by shamans and made rich by natural resources. Their legend, interwoven with the southern divine lands like the shaman Wu Xian\'s kingdom, reflects the ancients\' yearning for a society where heaven and humanity are one and material and spiritual life are perfectly joined.',
  ],
  w_south2: [
    'The Classic of the Great Waste: South records a deathless land, its people of the surname A, who feed on the sweet tree. The text never describes the tree\'s shape, nor explains why they cannot die — and that silence is what makes the story so affecting.',
    'The Classic of the Southern Wilds beyond the Seas adds a neighboring record, the "deathless people": "Their kind is black-skinned; they live long and do not die." Read side by side, the deathless land comes into sharper outline.',
    'The deathless are not lone oddities but a whole category of mythical folk. The Shan Hai Jing places them in the world beyond the seas — meaning their "deathlessness" is not individual success at self-cultivation but a fact of geography: in that place, the rules of life are simply different.',
    '"Their kind is black" — black need not be read as a plain skin-color label; it is closer to the ancients\' blended image of distant peoples, sun-scorched coasts, the direction of the dark waters, and the unknown body. In the language of the pre-Qin texts black is akin to xuan — dark, deep, hidden — so the deathless carry the sense of "life prolonged out of the darkness."',
    '"They live long, and do not die" — the text says longevity first, deathlessness second, and the order matters. Long life is the extreme of length; deathlessness is crossing past the end. This is not a prettified tale of eternal youth but something more like the silence, loneliness and pressure of time that set in after life could no longer end. And the word "people" implies a community, customs, an order — perhaps the deathless never craved immortality at all; they are simply trapped in it, generation after generation witnessing the sea wind, the black earth, and the rise and fall of dynasties.',
    'So to paint the deathless one must paint neither ordinary immortals nor horrific corpses: they are an ancient folk on the black shores beyond the seas, skin lapping light like dark stone, eyes calm, standing in a sea fog without sun. What is truly dreadful is not that they cannot die — it is that they have watched "others die" too many times. If life has no end, will anyone still long for tomorrow? In the Classic of the South, "deathless" turns from a blessing into a question.',
  ],
  w_south3: [
    'In the Great Waste there is the Three-Body land. The text says "there are people with three bodies" — one head joined to three bodies side by side, among the strangest figures in the Shan Hai Jing\'s bestiary of forms.',
    'But what deserves attention is not the shape — it is the bloodline. The text is explicit: E Huang, wife of Di Jun, bore this Three-Body land. Di Jun is the core of the Great Waste\'s pantheon — sun and moon are his children. The Three-Body folk are blue-blooded divinity in the direct line: of the Yao clan, eaters of millet.',
    'They also command beasts: tiger, leopard, bear and grizzly all obey their call — and in the world of the Waste, to command birds and beasts is the very mark of divine descent. Guo Pu\'s commentary adds a startling detail: the three bodies share one mind — breathing in sync, seeing together, filled at once, as if a single soul were operating three shells.',
    'As to location, the Classic of the Western Wilds beyond the Seas places the Three-Body land north of Xiahou Qi — using the Xia dynasty\'s founding king as a geographic reference point, proof of its standing in mythical geography. Some scholars guess the "three bodies" prototype lies in tribal totems or in painters\' conventions: artists drew many clanspeople sharing one head, and the image, retold, became the marvel of "one head, three bodies." Others read it as a symbol of many descendants and good fortune, or of strength, wisdom and spirit united.',
    'A wondrous people of "three bodies," thus installed in the noblest of divine genealogies. What the truth was, awaits more clues — which is exactly the charm of the tales of the Waste.',
  ],
  w_south4: [
    'Even in the Classic of the Great Waste: South, a land crowded with spirits and strange nations, one can read the memory of Tang\'s overthrow of Jie: the text links Zhang Mountain to this change of dynasty and mentions the aid of Yi Yin.',
    'The Shan Hai Jing\'s account of the war is thick with myth, and two details are unique to it. The first is the fire god Zhurong joining the battle — legend says that when Tang attacked Jie, Zhurong sent down divine fire and burned the Xia palaces, making heaven\'s mandate plain for all to see. The second is the "death of Xia Geng": in the battle at Zhang Mountain the Xia general Xia Geng was slain, yet his headless corpse went on clutching halberd and shield, fleeing all the way to Mount Wu — a figure like Xingtian, showing the pathos and fantasy of ancient war.',
    'Set beside the Records of the Grand Historian and the Book of Odes, the campaign of Cheng Tang was a long, carefully planned operation. Jie\'s tyranny at the end of Xia boiled over into popular rage; Tang of Shang was famed for benevolence, and the legend of "opening the net on three sides" won him wide support.',
    'Tang did not rush to attack. Under his wise minister Yi Yin he first clipped the wings of the Xia — destroying Ge, Wei, Gu, Kunwu and the other vassal states, one by one, until the Xia royal house stood alone. Around 1600 BC the decisive battle was joined at Mingtiao: the Xia army\'s morale collapsed at the first touch; Jie fled south and died at Nanchao — and the Xia, four hundred years old, was no more.',
    'After the conquest Tang made Bo his capital, founded the Shang dynasty, assembled the nobles, and established a new order. This event, later called the "Revolution of Tang and Wu," inaugurated the pattern of dynastic change by virtue, in accord with heaven and the people — and the mythical margins of the Classic of the South thus recorded a great turning point of Chinese political civilization.',
  ],
  w_west1: [
    'The Classic of the Great Waste: West records: "A woman stands bathing the moons. Changxi, wife of Di Jun, bore twelve moons — and began by bathing them." Changxi is the wife of the heavenly emperor Di Jun; she bore twelve moons, and for this is called the Mother of Moons.',
    'Her sister — another wife of Di Jun — is Xihe, mother of the ten suns. In the world of the Shan Hai Jing, sun and moon are one family: the cosmic order of the changing of day and night issues from a single household.',
    'Behind "bathing the moons" lies the ancients\' tender explanation of the moon\'s phases: the moon waxes and wanes because Changxi is bathing her moon-children — when she washes them clean and long, the moon is round and bright; when she makes it quick, the moon curves into a crescent.',
    'Twelve moons answer exactly the twelve months of the year. Changxi\'s bathing of the moons figures the turning of time and the making of the lunar calendar. She is also called the "harmonizing moon mother": her duty goes beyond bearing the moons to reconciling yin and yang, fitting the lunar months to the solar seasons — she is the maintainer of cosmic order.',
    'And the Chang\'e we all know, flying to the moon, may well have begun as this Mother of Moons. Scholars note that "Changxi," "Changyi" and "Chang\'e" were near-homophones in antiquity — likely the same mythical figure in evolution: from the great mother who bore twelve moon-disks, her divinity gradually faded, until she became the somewhat lonely Chang\'e of the Palace of Vast Cold. One bright moon has watched the whole transformation of a myth.',
  ],
  w_west2: [
    'The original text of the Classic of the West is spare to the point of riddle: "There were ten spirits, called the Bowels of Nüwa, transformed into gods, dwelling in the wilds of Liguang, standing across the road." Ten divine beings born of Nüwa\'s "bowels," living in the wilds of Liguang, right in the middle of the road. Guo Pu\'s commentary notes that one version writes "belly" for "bowels," and that Nüwa — "human-faced, serpent-bodied, with seventy transformations in a single day" — her belly transformed and bore these ten.',
    'Why the bowels? To the ancients the bowels governed digestion and absorption — the core of life\'s transformation, the rawest, strongest force of vitality and generation. "The Bowels of Nüwa" can be read as the creative power of Nüwa the creator made visible — these ten are not simple offspring but the continuation and division of Nüwa\'s life-force itself.',
    'Some scholars hold that "bowels" was an oblique term for the womb in antiquity: the ten gods born of Nüwa\'s bowels are a memory of matriarchal clan society and fertility cult, a symbol of the primal mother-goddess gestating all things. Historically it may also be a metaphor of migration: ten spirits standing for ten branches of Nüwa\'s tribe, split off as the population grew, each moving to new land to flourish.',
    'The Nüwa we know is the creator goddess with a human face and a serpent\'s body; "the Bowels of Nüwa" shows her other aspect — the system of creation itself. She is no longer merely a character but the source-power from which all things are transformed: her body coiling like mountains and rivers through the deep earth, part of the world itself.',
    'A modern reading adds one more layer: these ten gods "standing across the road" are like what we inherit from our parents and cannot walk around — traits of character, love and hurt handed down in the family. They lie athwart the road of life; they must be understood, crossed, and finally integrated before we can reach our own far places.',
  ],
  w_west3: [
    'In the northwest corner dwells a god named Shiyi, whose core office is "keeping the length of sun and moon" — governing how long the sun and moon run, tuning the alternation of day and night and the turn of the seasons: the "regulator of time" of the ancient world.',
    'He is also the wind god of the west. The text says "the wind that comes from him is called Wei" — the west wind is therefore also the Wei wind. He garrisons the northwest corner of the world, the border regarded as the place where all things gather in and the cold wind arises — a symbol of order and stability.',
    'His name carries meaning too: "shi," stone, stands for what is fixed and for measure; "yi" means to level, to pacify, and also the borderlands — together they frame his character as keeper of order. Later imagination gave him a massive frame and a face square as if carved by a stone axe, with the composure of a great mountain: awe-inspiring without anger.',
    'The record has very ancient roots: Shang-dynasty oracle bones already name the wind gods of the four quarters, and the god of the west is called "Yi," his wind "Yi" — matching Shiyi of the Classic of the West almost exactly, a trace of the ancients\' earliest knowledge of natural order. The later collection In Search of the Supernatural elaborated him into one of the "Ten Gods of the Great Waste," the Metal God, nicknamed "the Stone Man," taciturn and devoted to the martial arts.',
    'A god keeping watch in the northwest corner — thus was the untouchable rhythm of time handed over to a figure the imagination could hold.',
  ],
  w_west4: [
    'The Classic of the Great Waste: West records: "There is the land of Western Zhou, of the Ji clan, eaters of grain. One was plowing there, called Shu Jun." The country lies beyond the western sea, east of the Red River — not quite the historical Zhou dynasty we know, but a mythical land, part of the Zhou people\'s story of origins.',
    'The core of the record is the genealogy of the Zhou ancestors and the gods of agriculture. Houji is the grain god and first ancestor of the Zhou; myth makes him a son of the emperor Di Jun, who brought the seeds of the hundred grains from heaven down to earth. Shu Jun was the son of Taixi, Houji\'s brother — he carried on his uncle\'s work, taught the people to sow the hundred grains, and was honored as the "Ancestor of Fields," the god of agriculture.',
    'On how this "land of Western Zhou" relates to the historical Zhou that overthrew the Shang, there are two main views. The first, the mythic-origin view: it does not mean the Western Zhou dynasty but reaches back to the Zhou people\'s earliest origins, the mythical age of their ancestors as a farming tribe. The second, the early-capital view: it may refer to the Zhou\'s early seat in the west (near modern Baoji, Shaanxi) before they won the realm — farther west than the later capital Haojing, hence "the land of Western Zhou."',
    'On either reading, this is a classic case of a historical figure mythologized and a tribal origin made legend: beside the myths of sun and moon stands the memory of grain and fields — the Zhou people\'s reverence for their ancestors and for farming civilization, written on the field-ridges west of the Great Waste.',
  ],
  w_north1: [
    'The original text in the Classic of the Northern Wilds is only forty characters long: "Kua Fu raced with the sun and caught it. Thirsty, he drank from the Yellow River and the Wei, but they were not enough. He turned north toward the Great Marsh, and died of thirst on the road before arriving. His abandoned staff became the Denglin peach forest." Yet every line hides a detail that is easy to overlook.',
    'The first detail: the text says "raced with the sun" — he ran against it, not foolishly after it. He knew the sun was moving; what he wanted was to keep up with it, to match it. This was a contest of speed, not a delusion. The second detail: he drank the Yellow River and the Wei dry, and it was not enough. These two rivers have nourished Chinese civilization for millennia — to say he drank them dry is to say his scale and his longing had already outgrown the category of "human."',
    '"Before he arrived, he died of thirst on the road." He never reached the Great Marsh; he died along the way. But the original does not use a single word for failure — no lament, no irony, only statement: he died, and his staff became a peach forest. A man for whom two great rivers were not enough — what was he chasing? If he had merely wanted to "seize the sun," one drained river would have taught him it was impossible. Yet he kept going. That tells us what he chased was not the sun itself.',
    'The scholar Wen Yiduo first proposed that the myth of Kua Fu encodes the migration of an ancient tribe following the sun: in remote antiquity, peoples moved where there was light and warmth. Kua Fu is the one who walked at the very front, scouting the way for those behind. His thirst is no ordinary thirst — it is the exhaustion of a man who burns himself out to open a road for others. He knew he would die, and still he ran. What he chased was not the outcome; it was that the pursuit itself was worth pursuing.',
    'Then comes the line easiest to skip: "He abandoned his staff, and it became the Denglin forest." This is not a decorative ending — it is the true answer of the whole story. The staff was his only support on the road; having spent everything, he left behind the very thing that held him up. And that staff became an entire forest of peach trees. Travelers who came after, when thirsty, could pick the peaches. The water he never got to drink was given, in another form, to everyone walking behind him.',
    'Greek myth has a counterpart: Icarus, who flew too high until the sun melted his waxen wings — a tale usually told as a warning against pride and recklessness, a punishment for overstepping bounds. But when Kua Fu died, he left behind a peach forest. The difference reveals two civilizations\' attitudes toward "futility": in ancient China, to burn oneself out was rightful, so long as something remained — it was a gift. Kua Fu was not a failure; he was the first to reach that place, only he never came back to tell us. We keep asking: is it worth chasing something you are fated never to catch? Kua Fu never answered. He dropped his staff, and died. The peach forest answered for him.',
  ],
  w_north2: [
    'The earliest record of Jiufeng is in the Classic of the Great Waste: North: "In the Great Waste is a mountain called Arctic Tiangui, into which the sea pours northward. There is a spirit with nine heads, a human face and a bird\'s body, named Jiufeng." Its body is that of a great and splendid divine bird, yet it bears nine heads — and every one of them a dignified human face, not a monstrous beast\'s.',
    'The name itself glosses the rank: "feng," the phoenix, is king of birds, an omen of blessing; "nine" is the utmost yang number, standing for supremacy and the limit. Nine heads, human faces, a bird\'s body — from birth Jiufeng was a deity of the highest station, never a demon.',
    'It dwells on Arctic Tiangui at the far north. In the mythical geography of the Shan Hai Jing "north" is bound to darkness and hardship — Yu Valley, the Dark Capital, the Great Marsh all lie north. Yet Jiufeng keeps precisely this perilous edge of the world where the sea pours away north: even in the frozen waste, a divine bird has its roost.',
    'Jiufeng was the totem revered by the ancestors of the state of Chu in the Warring States period. The Chu people traced their lineage to the emperor Zhuanxu; the Jiufeng\'s home "in the Great Waste" includes the Chu lands, and Zhuanxu himself was buried there — so Jiufeng was honored as Chu\'s guardian and the embodiment of its ancestor. Chu culture had a deep cult of "nine": Qu Yuan wrote the Nine Songs and the Nine Laments, and Jiufeng\'s nine heads answer that trait exactly; on Chu bronzes and lacquerware the nine-headed bird appears again and again — a sign of faith and of the peace of the realm.',
    'Yet Jiufeng later fell from divine bird to "demon bird." After Qin destroyed Chu, to break the Chu people\'s spirit it deliberately suppressed their faith and smeared their guardian into an omen of calamity; later legend graft-joined it to the "ghost cart" bird — ten heads at first, one bitten off by a heavenly dog, the severed neck dripping blood and bringing disaster, even stealing souls. The folk saying "Nine-headed birds in the sky, Hubei men on the earth" comes from the same story: once perhaps a slur, now mostly praise for the shrewdness of the Hubei people.',
    'Brush away the slanders of later ages and return to the Shan Hai Jing\'s own words, and Jiufeng remains what it always was: the stately spirit bird of Arctic Tiangui, nine heads, human faces, a bird\'s body. A god of the mythical north who became the totem of southern Chu — a marvelous migration in the history of how myths travel.',
  ],
  w_north3: [
    'On Arctic Tiangui mountain, besides Jiufeng, stands another spirit: "Another holds a serpent in his mouth and grips one in his hand, tiger-headed and human-bodied, four-hoofed and long-elbowed, named Qiangliang." (Qiangliang is also written Qiang Liang.) A tiger\'s head, a human body, four hooves and long elbows, a snake between his teeth and snakes in his grip — among all the gods of the Shan Hai Jing, one of the most instantly recognizable figures.',
    'To hold serpents is the classic posture of the gods of the Great Waste: the snake is the emblem of divine power and spirit, and gods who can handle snakes are of no common rank. The image comes vividly alive in ancient art: in the Ascension mural of the Jiuyuangang Northern Dynasties tomb at Xinzhou, Shanxi, Qiangliang is a crouching monster with a tiger\'s head, jaws agape swallowing a spotted snake that coils around his arm — a picture of power and motion.',
    'In myth Qiangliang plays several parts. First, war god and thunder god: legend makes him a great general of the Yellow Emperor, who at the Battle of Zhuolu held a golden snake in his jaws and swung the thunder hammer, turning the tide with the force of the storm — the tiger\'s head for the terror of thunder, the serpents for the power to summon wind and rain. The tiger-headed generals of the thunder department in Daoist iconography are his distant echo.',
    'Second, an apotropaic beast: Qiangliang is one of the "twelve plague-expelling beasts" of ancient exorcism, a devourer of ghosts and unclean things, standing guard in the exorcism rites of the Han and after.',
    'Folklore tells more: some say he is the divine beast of Penglai, named with the Azure Dragon, Vermilion Bird and Black Tortoise among the "Four Guardians of the Middle Land," chief of beasts, hailed as the "war god among animals"; other tales describe a giant tiger who could carry a mountain on his back — fierce in look, gentle in nature.',
    'Where Jiufeng is auspice and rank, Qiangliang is the deterrent might of the northern wilds. One noble as a king, one fierce as a general — this pair, civil and martial on the same peak, makes the sharpest pairing in the pantheon of the Classic of the North.',
  ],
  w_north4: [
    'The battle the Shan Hai Jing records between the Yellow Emperor and Chiyou — the Battle of Zhuolu — is a war of myth through and through, and is also read as the founding battle of Chinese civilization.',
    'The course of the war is wonderfully twisted; both sides drew on mighty allies and treasures. Stage one, divine beasts: Chiyou strikes first, and the Yellow Emperor sends the winged dragon Yinglong against him; Yinglong excels at storing water, but Chiyou summons the Lords of Wind and Rain, who whip up storms and trap the imperial army. Stage two, the drought goddess: the Yellow Emperor calls down Ba, the heavenly drought spirit, who stops the rain and restores the advantage.',
    'Stage three, the fog and the south-pointing chariot: Chiyou conjures a fog that swallows the sky and blinds the imperial army; the Yellow Emperor relies on the south-pointing chariot invented by his minister Fenghou to find his bearings in the murk and break out. Stage four, the drum of the Kui ox: the Mystical Maiden of the Nine Heavens has the hide of the thunder-beast Kui made into eighty war drums, their sticks of thunder-beast bone, and gives them to the Emperor — the sound carries five hundred li, shaking heaven and earth, striking the soul out of Chiyou\'s army so that Chiyou himself can no longer fly away.',
    'Stage five, the death of Chiyou: the Yellow Emperor pursues, captures and kills him in the wilds of Jizhou. To keep him from rising again he buries body and head apart; the cangue Chiyou discarded became whole hills of maple trees.',
    'Many of the mythical episodes are in fact "encrypted" history. "Bronze heads and iron brows" likely hints that Chiyou\'s tribe mastered bronze early, gaining a technological edge in a stone-age world; "summoning wind and rain" reflects geography — Chiyou\'s people lived in rainy wetlands and knew how to fight with weather and terrain, while the Yellow Emperor\'s tribe came from the dry interior, and "the drought goddess stops the rain" may encode their counter-strategy to water warfare; the south-pointing chariot, though legend, reflects real astronomical knowledge of finding direction by the stars. The war was, in essence, a great tribal-confederacy war of the late Neolithic: the Huaxia tribes of the Wei River valley (the Yellow Emperor\'s bloc) against the Dongyi tribes of Shandong and Hebei (Chiyou\'s bloc), contesting the Central Plains.',
    'Though defeated, Chiyou\'s image in later culture is very complex. The Yellow Emperor, having slain him, honored his valor by proclaiming him "Lord of Arms" — god of war — and painting him on the army banners to awe the realm; Qin Shi Huang and Liu Bang both sacrificed to him when raising armies or touring the realm, borrowing the prestige of the "Lord of Arms" to hearten their troops; and among some southern minorities such as the Miao, Chiyou is an ancestral hero unbowed in defeat — his valor so beloved that he became a totem of unyielding spirit.',
  ],
}
const storyArt = (id) => `/assets/dahuang/stories/${id}${id?.startsWith('w_east') ? '-mural' : ''}.webp`

export default function DahuangCards() {
  const { t, lang } = useLang()
  const [searchParams, setSearchParams] = useSearchParams()
  const jing = searchParams.get('jing')
  const active = DAHUANG_JING.find((item) => item.id === jing)
  const cards = useMemo(() => DAHUANG_CARDS.filter((item) => item.jing === jing), [jing])
  const [featured, setFeatured] = useState('dahuangdong')
  const [index, setIndex] = useState(0)
  const [reading, setReading] = useState(false)
  const [clue, setClue] = useState(false)
  const story = cards[index] || cards[0]

  useEffect(() => {
    const previousTitle = document.title
    document.title = active
      ? (lang === 'en'
        ? `${t(active.name)} · Wilds of Shan Hai Jing | Shan Hai Jing`
        : `${active.name} · 大荒拾遗 | 山海经`)
      : (lang === 'en' ? 'Wilds of Shan Hai Jing | Shan Hai Jing' : '大荒拾遗 | 山海经')
    return () => { document.title = previousTitle }
  }, [active, lang, t])

  useEffect(() => {
    setIndex(0)
    setReading(false)
    setClue(false)
    setFeatured('dahuangdong')
    window.scrollTo(0, 0)
  }, [jing])

  useEffect(() => {
    if (!active) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        if (reading) setReading(false)
        else setSearchParams({})
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        setIndex((current) => (current + (event.key === 'ArrowRight' ? 1 : -1) + cards.length) % cards.length)
        setReading(false)
        setClue(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, cards.length, reading, setSearchParams])

  const chooseStory = (next) => {
    setIndex((next + cards.length) % cards.length)
    setReading(false)
    setClue(false)
  }
  const moveMuralLight = (event) => {
    const light = event.currentTarget.querySelector('.dah-stage-light')
    if (!light) return
    const bounds = event.currentTarget.getBoundingClientRect()
    light.style.left = `${event.clientX - bounds.left}px`
    light.style.top = `${event.clientY - bounds.top}px`
  }
  const resetMuralLight = (event) => {
    const light = event.currentTarget.querySelector('.dah-stage-light')
    if (!light) return
    light.style.left = '62%'
    light.style.top = '43%'
  }
  const isLongEnTitle = lang === 'en' && t(story?.name).length > 18
  return <main className={`dah-page dah-page--${active?.id || 'index'}`}>
    <header className="dah-header">
      <Link className="dah-back ru-link-back" to="/"><RuArrow dir="left" /> <span>{lang === 'en' ? 'Back to the Atlas' : '返回山海总图'}</span></Link>
      <span className="dah-brand">{active ? `${t(active.name)} · ${t(story?.name)}` : (lang === 'en' ? 'Shan Hai Jing · Wilds of Shan Hai Jing' : '山海经 · 大荒拾遗')}</span>
      {active ? <button className="dah-header-action ru-link-fwd" onClick={() => setSearchParams({})}>{lang === 'en' ? <>Four Directions <RuArrow dir="up-right" /></> : <>四方目录 <RuArrow dir="up-right" /></>}</button> : <span className="dah-header-mark">{lang === 'en' ? 'Mythic Scroll · IV' : '神话残卷 · 肆'}</span>}
    </header>

    {!active ? <section className="dah-index">
      <div className="dah-intro">
        <span className="dah-kicker">THE WILDS OF SHAN HAI JING · {lang === 'en' ? 'The Four Classics' : '大荒四经'}</span>
        <h1>{lang === 'en' ? <>The <span>Wilds</span></> : <>大荒<span>拾遗</span></>}</h1>
        <p>{t({ zh: '山经之外，神话在四方生长。循日月之光，拾起散落在大荒的十六则故事。', en: 'Beyond the Mountain Classic, myth grows in the four directions. Follow the light of sun and moon and gather the sixteen tales scattered through the Waste.' })}</p>
        <span className="dah-hint">{t({ zh: '择一方 · 入一卷', en: 'Choose a direction · Enter a classic' })} <RuArrow dir="down" /></span>
        <Link className="dah-bestiary-link ru-link-fwd" to="/bestiary">{lang === 'en' ? <>Bestiary of Shan Hai Jing <RuArrow dir="up-right" /></> : <>山海百灵 <RuArrow dir="up-right" /></>}</Link>
      </div>
      <div className="dah-atlas" aria-label="大荒四方画卷">
        <div className="dah-atlas-image" style={{ backgroundImage: `url(${ART[featured]})` }} />
        <span className="dah-atlas-vertical">四 方 之 外</span>
        <div className="dah-atlas-caption"><small>{t(MOOD[featured].detail)}</small><strong>{t(DAHUANG_JING.find((item) => item.id === featured)?.name)}</strong></div>
      </div>
      <nav className="dah-directions" aria-label="选择大荒经">
        {DAHUANG_JING.map((item, number) => <button key={item.id} type="button"
          className={`dah-direction${featured === item.id ? ' is-featured' : ''}`}
          onMouseEnter={() => setFeatured(item.id)} onFocus={() => setFeatured(item.id)}
          onClick={() => setSearchParams({ jing: item.id })}>
          <span className="dah-direction-no">0{number + 1} / 04</span>
          <span className="dah-direction-mark">{MOOD[item.id].mark}</span>
          <span className="dah-direction-title"><strong>{t(item.name)}</strong><small>{t(MOOD[item.id].title)}</small></span>
          <span className="dah-direction-arrow"><RuArrow dir="up-right" /></span>
        </button>)}
      </nav>
    </section> : <section className="dah-volume">
      <div className="dah-volume-heading">
        <span>{t(MOOD[active.id].title)} <i>·</i> {t(active.name)}</span>
        <span>{lang === 'en' ? 'Mythic Scroll' : '神话残卷'} {String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span>
      </div>
      <div className={`dah-stage dah-stage--${story?.id}${reading ? ' is-reading' : ''}`} onPointerMove={moveMuralLight} onPointerLeave={resetMuralLight}>
        <div className="dah-stage-image" key={story?.id} style={{ backgroundImage: `url(${storyArt(story?.id)})` }} />
        <div className="dah-mural-effect" aria-hidden="true" />
        <div className="dah-stage-light" aria-hidden="true" />
        <div className="dah-spine">
          <span className="dah-spine-index">{t(active.name)} · 0{index + 1}</span>
          <h1 className={isLongEnTitle ? 'is-long-en' : undefined}>{t(story?.name)}</h1>
          <span className="dah-spine-seal">{t(story?.seal)}</span>
          <button type="button" className="ru-link-fwd" onClick={() => setReading(true)}>{t({ zh: '展开简牍', en: 'Open the Scroll' })} <RuArrow dir="up-right" /></button>
        </div>
        <p className="dah-stage-quote">{t(story?.quote)}</p>
        <button className={`dah-clue${clue ? ' is-open' : ''}`} onClick={() => setClue((value) => !value)} aria-expanded={clue} aria-label={t({ zh: '查看画中线索', en: 'View the clue in the painting' })}>
          <span className="dah-clue-pin">✧</span>
          {clue && <span className="dah-clue-copy"><strong>{t(story?.seal)}</strong><small>{t(CLUES[story?.id])}</small></span>}
        </button>
        <span className="dah-stage-mark">{MOOD[active.id].mark}</span>
        {!reading && <nav className="dah-story-list" aria-label={t({ zh: '本经故事', en: 'Stories of this classic' })}>
          {cards.map((card, number) => <button key={card.id} className={index === number ? 'is-active' : ''} onClick={() => chooseStory(number)} aria-current={index === number ? 'step' : undefined} style={{ '--card-art': `url(${storyArt(card.id)})` }}>
            <span>0{number + 1}</span><em aria-hidden="true">{t(card.seal).slice(0, 1)}</em><strong>{t(card.name)}</strong><small>{t(card.seal)}</small><b><RuArrow dir="up-right" /></b>
          </button>)}
        </nav>}
        {reading && <aside className="dah-reading-sheet" aria-label={`${t(story?.name)}${lang === 'en' ? ' full story' : '完整故事'}`}>
          <div className="dah-reading-frame" aria-hidden="true" />
          <img className="dah-reading-emblem" src="/assets/dahuang/bronze-mask.svg" alt="" aria-hidden="true" />
          <img className="dah-reading-watermark" src="/assets/dahuang/bronze-mask.svg" alt="" aria-hidden="true" />
          <div className="dah-reading-top"><span>{lang === 'en' ? 'Wilds of Shan Hai Jing / Mythic Scroll' : '大荒拾遗 / 神话残卷'} 0{index + 1}</span><button type="button" onClick={() => setReading(false)} aria-label={lang === 'en' ? 'Close the story' : '合上故事'}>×</button></div>
          <h2>{t(story?.name)}</h2>
          <span className="dah-reading-subtitle">{t(story?.seal)}</span>
          <div className="dah-reading-scroll" tabIndex={0} aria-label={t({ zh: '上下滚动阅读完整故事', en: 'Scroll up and down to read the full story' })}>
            {(lang === 'en' && DAHUANG_NARRATIVES_EN[story?.id] ? DAHUANG_NARRATIVES_EN[story.id] : (DAHUANG_NARRATIVES[story?.id] || [t(story?.story)])).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            <blockquote>{t(story?.quote)}</blockquote>
            <small>——《{t(story?.jingName)}》</small>
          </div>
          <span className="dah-reading-hint">{t({ zh: '在纸页内上下滑动阅读 ↕', en: 'Scroll within the page to read ↕' })}</span>
        </aside>}
      </div>
      <div className="dah-controls">
        <span>{t({ zh: '移入画卷择卡 · 点击光点见线索', en: 'Hover the scroll to choose a card · Click the pin for clues' })}</span>
        <div><button onClick={() => chooseStory(index - 1)} aria-label={t({ zh: '上一则故事', en: 'Previous story' })}>←</button><span>{String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span><button onClick={() => chooseStory(index + 1)} aria-label={t({ zh: '下一则故事', en: 'Next story' })}>→</button></div>
      </div>
      <footer className="dah-volume-footer"><button className="ru-link-back" onClick={() => setSearchParams({})}>{lang === 'en' ? <><RuArrow dir="left" /> Back to the Four Classics</> : <><RuArrow dir="left" /> 返回四方</>}</button><span>{lang === 'en' ? 'Wilds of Shan Hai Jing · Mythic Scroll' : '大荒拾遗 · 四方神话'}</span></footer>
    </section>}
  </main>
}
