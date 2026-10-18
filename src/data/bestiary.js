import dongshan from './dongshan.json'
import xishan from './xishan.json'
import beishan from './beishan.json'

const volumes = [dongshan, xishan, beishan]

const artwork = {
  feiyi: '西兽/肥遗.png', luanniao: '西兽/鸾鸟.png', yingwu: '西兽/鹦鹉.png',
  fuxi: '西兽/凫徯.png', zhuyan: '西兽/朱厌.png', yingzhao: '西兽/英招.png',
  luwu: '西兽/陆吾.png', bifang: '西兽/毕方.png', dijiang: '西兽/帝江.png',
  wenyao: '西兽/文鳐鱼.png', qiongqi: '西兽/穷奇..png',
  xiwangmu: '西/玉山.png',
}

// 山海百灵 · 复古平涂风格专题插画（public/assets/bailing），优先于旧图使用
const bailingArt = {
  xiwangmu: 'g-xiwangmu.png', huaxu: 'g-huaxu.png', xihe: 'g-xihe.png', changxi: 'g-changxi.png',
  ernv: 'g-ernv.png', leizu: 'g-leizu.png', nuwa: 'g-nuwa.png', jiangyuan: 'g-jiangyuan.png',
  qingdu: 'g-qingdu.png',
  luwu: 'm-luwu.png', gaigai: 'm-gaigai.png', heluo: 'm-heluo.png', dijiang: 'm-dijiang.png',
  wenyao: 'w-wenyao.png', boyu: 'w-boyu.png', shanyu: 'w-shanyu.png',
  luanniao: 's-luanniao.png', bifang: 's-bifang.png', dangkang: 's-dangkang.png', qizhong: 's-qizhong.png',
  taotie: 'f-taotie.png', qiongqi: 'f-qiongqi.png', hundun: 'f-hundun.png', taowu: 'f-taowu.png',
  xuanwu: 'a-xuanwu.png', fenghuang: 'a-fenghuang.png', baize: 'a-baize.png', qilin: 'a-qilin.png',
}
// 山海百灵 · 异闻（说书人口吻的小故事，供手风琴卡片展开阅读）
const tales = {
  xiwangmu: { zh: '老辈人讲，这位玉山主人早先可不是善茬——豹尾虎齿，蓬着头，掌管天下的瘟疫与刑罚。谁知传到后世，竟成了开蟠桃宴、赐长生药的王母娘娘，一尊凶神，硬是修成了慈眉善目的老祖宗。', en: 'The elders tell it this way: the Lady of Jade Mountain was no kindly soul at first — leopard\'s tail, tiger\'s tusks, wild tangled hair, keeper of the world\'s plagues and punishments. Yet down the centuries she softened into the Queen Mother who hosts the peach banquet and grants the elixir of life; a fierce goddess who, against all odds, grew into a benevolent ancestress.' },
  huaxu: { zh: '相传华胥在雷泽岸边，瞧见一个其大无比的脚印，一时好奇踩了上去——这一踩不要紧，回来便怀了身孕，生下的正是人文初祖伏羲。一个大脚印，踩出了半个中华谱系。', en: 'They say Huaxu walked the shore of Thunder Marsh and saw a footprint of impossible size. Curious, she stepped upon it — and returned with child, bearing Fuxi, first ancestor of the human arts. One great footprint, and half a civilization\'s lineage began.' },
  xihe: { zh: '说起来稀奇：帝俊的妻子羲和，一胎生下十个太阳，天天在甘渊里给儿子们洗澡。后来十个日头一齐上了天，晒得江河见底，才有了后羿弯弓那一出——根子却在这位慈母身上。', en: 'A strange tale indeed: Xihe, wife of Di Jun, bore ten suns in a single birth, and bathed her sons each day in the Sweet Abyss. When all ten suns rose at once and boiled the rivers dry, Hou Yi had to bend his bow — yet the root of that calamity lay with this loving mother.' },
  changxi: { zh: '羲和生太阳，常羲便生月亮，一胎十二个，正对着一年的十二个月。她夜夜在玄渊里给月亮沐浴，把这十二个孩子轮着放上天——民间的历法，竟是从这位母亲的月子账里来的。后人又传她便是占月的常仪，一身而二名。', en: 'As Xihe bore the suns, Changxi bore the moons — twelve at a birth, one for each month of the year. Night after night she bathed them in the Dark Abyss and set them in the sky in turn; the folk calendar, one might say, was kept in this mother\'s moon-ledger. Later generations held that she was Changyi the moon-diviner under another name — one goddess, two names.' },
  ernv: { zh: '帝俊这两个女儿住在洞庭山，出门必携飘风暴雨，好不威风。相传舜帝南巡驾崩，二妃寻至湘水，泪洒竹上成斑，投水而亡——湘妃竹上那点点的泪痕，至今还在替她们哭。', en: 'The two daughters of Di Jun dwelt on Dongting Mountain, and whenever they went abroad, whirlwind and rainstorm attended them — a terrible splendor. When Emperor Shun died on his southern progress, his two consorts searched until they came to the Xiang River; their tears speckled the bamboo, and they cast themselves into the water. The tear-marks on Xiang bamboo weep for them still.' },
  leizu: { zh: '黄帝的正妃嫘祖，原本也不过是位爱看蚕吐丝的女子。她瞧着那银丝亮堂，灵机一动抽丝织衣，教万民养蚕治丝——从此天下人脱了树叶兽皮，穿上了衣裳。一缕丝，系住了五千年的体面。', en: 'Leizu, chief consort of the Yellow Emperor, began as simply a woman who loved to watch silkworms spin. Seeing how the silver thread gleamed, she took it into her head to draw the silk and weave it into cloth, and taught the multitude to raise silkworms and reel silk — and so the world put off leaves and hides and put on garments. One thread of silk has held five thousand years of decency together.' },
  nuwa: { zh: '天塌地陷那年，女娲炼五色石把天补上，斩巨鳌四足撑住四极，这才保住人间。又传说她照着水中自己的影子抟土造人，捏得手酸了，便拿藤条蘸泥一甩——泥点落地，个个成活，皆是生民。', en: 'In the year the sky fell and the earth split, Nüwa smelted five-colored stones and mended the heavens, cut the legs from a giant turtle to prop up the four corners, and so preserved the world of men. They also tell how she kneaded clay in the image of her own reflection in the water; when her hands grew weary she dipped a vine-cord in mud and flung it — and every droplet that fell came alive, and all were her children.' },
  jiangyuan: { zh: '姜嫄在郊野踩上一个巨人脚印，心口一震，归后有孕，生下一个肉卵似的儿子。她几番丢弃，那孩子偏偏牛马避之、鸟翼覆之——不敢扔了，抱回养大，便是教人种五谷的后稷。', en: 'Jiangyuan, walking in the open fields, stepped upon the footprint of a giant; her heart trembled, and in time she gave birth to a child like an egg of flesh. She tried again and again to abandon him, yet oxen and horses shunned him and birds spread their wings to shelter him — so she dared not, but carried him home and raised him: Houji, who taught the people to sow the five grains.' },
  qingdu: { zh: '相传庆都观测天象时，一条赤龙携图而来，图上写着一个人名，此后有孕生尧。尧后来成了上古最贤的君主——这桩「感龙而生」的来历，是史官给圣王镀的金，也是母亲们的神迹。', en: 'They say that as Qingdu observed the heavens, a crimson dragon came bearing a chart, and on the chart was written a name; afterward she conceived and bore Yao, who became the wisest of the ancient sovereigns. This "conception by dragon" is the gilding historians gave a sage-king\'s origin — and no less, a mother\'s wonder.' },
  changyi: { zh: '帝喾妃常仪，最擅占月，抬头观星象，低头推历法，把月亮的圆缺算得明明白白。一说她与生月的常羲本是同一人——算月令的先祖母，后世历法的老祖宗。', en: 'Changyi, consort of Emperor Ku, was supreme in moon-divination: eyes raised to read the stars, head bowed to work out the calendar, she reckoned the moon\'s waxing and waning to the very day. Some say she and Changxi, mother of the moons, were one and the same — the primal grandmother of the moon-reckoning, ancestress of all later calendars.' },
  luwu: { zh: '昆仑山上那位看门的，虎身九尾，人面虎爪，名叫陆吾，执掌天之九部与帝之囿时。别瞧凶相，人家是正经天帝委派的守园神——只是这园子太大，一草一木，皆是天上的禁脔。', en: 'The keeper of Kunlun — tiger-bodied, nine-tailed, with a man\'s face and tiger\'s claws — is called Luwu, steward of the nine heavens\' divisions and of the Emperor\'s park and seasons. Fierce as he looks, he is a warden properly commissioned by the Lord on High; only the garden is vast, and every blade and tree of it is reserved to heaven.' },
  gaigai: { zh: '跂踵山里出了个怪模样：四个脑袋，六只脚，三条尾巴，说是鸡不是鸡，说是鱼不是鱼，鸣声就像叫自己的名字。山里人见了并不惊慌——它随水域出没，是这方水土的老人家。', en: 'Out of Qizhong Mountain came a curious shape: four heads, six feet, three tails — chicken if you like, fish if you don\'t, crying what sounds like its own name. The mountain folk were not alarmed: it comes and goes with the waters, the elder spirit of this land and its streams.' },
  heluo: { zh: '一首而十身，一声吠叫如犬——这模样搁哪儿都扎眼。北山水族里它最是惹眼，渔人远远望见十个身子在水中摆动，只当是水底开了一树花。', en: 'One head, ten bodies, and a bark like a dog\'s — a sight to stop any eye. Most conspicuous of the northern waters\' creatures: fishermen, seeing ten bodies swaying in the current from afar, took it for a tree blossoming beneath the water.' },
  dijiang: { zh: '最奇是帝江：六足四翼，浑浑沌沌没有面目，偏偏通晓歌舞。有人笑它无脸无目，它不恼，甩开六足跳将起来，四翼和着节拍——没有眼睛的，未必看不见天地；没有耳朵的，未必听不懂曲子。', en: 'Strangest of all is Dijiang: six feet, four wings, a huddled whole with no face at all — yet it knows song and dance. Some laughed at it for lacking eyes and features; it took no offense, flung out its six feet and began to leap, its four wings keeping the beat. What has no eyes does not necessarily fail to see heaven and earth; what has no ears does not necessarily fail to understand the tune.' },
  wenyao: { zh: '文鳐鱼生着鸟翼，夜里从西海飞往东海，鱼群掠过夜空，闪闪如星子过境。老渔人见了便喜：此鱼现世，天下大熟——一条会飞的鱼，驮着丰年的消息。', en: 'The Wenyao fish is born with bird\'s wings, and by night flies from the Western Sea to the Eastern; a shoal of them crossing the dark sky glitters like stars in transit. Old fishermen rejoice at the sight: when this fish appears, the world has a bumper year — a flying fish, carrying the news of plenty.' },
  boyu: { zh: '薄鱼只有一只眼睛，说它半边身子藏在石膏水里。古籍上记它的出现都带着叹号——见则天下大旱。一条鱼露面，河水都要退三尺，您说奇也不奇。', en: 'The Boyu fish has but a single eye; some say half its body hides in the Shigao waters. The old records note its appearance with something like an exclamation mark — when it is seen, great drought follows in the world. One fish shows its face and the rivers fall back three feet: strange, is it not?' },
  shanyu: { zh: '食水出水，鳙鳙鱼入海。它随着水脉来去，东山的水涨水落里都有它的回声。水中行家讲究「见鳙知水」——它一露头，这一年的水信便有了准数。', en: 'The Shi River issues forth, and the Yongyong fish goes down to the sea. It comes and goes with the waterways, and its echo is in every rise and fall of the eastern waters. Those who know rivers say: see the fish and you know the water — the moment it surfaces, this year\'s water-tidings are settled.' },
  luanniao: { zh: '鸾鸟现世，五彩色羽，见则天下安宁。相传当年有凤有鸾栖于梧桐，舜帝弹起五弦琴，百鸟绕梁三日不去——太平年景，连鸟都挑着人家落脚。', en: 'When the Luanniao appears, in plumage of five colors, peace comes to the world. They tell how once phoenix and luan perched on the wutong trees, and as Emperor Shun played his five-stringed zither, a hundred birds circled the rafters three days without leaving — in years of true peace, even birds choose where they will roost.' },
  bifang: { zh: '毕方独足，青羽赤纹，落在谁家屋顶，谁家便要失火。相传它原是火种所化，行走的火签——古人夜里望见独脚鸟掠过，赶紧提水，比打更的还灵。', en: 'Bifang stands on a single leg, blue-feathered with crimson markings; whichever roof it alights on will soon know fire. They say it was born of the primal fire-seed, a fire-token on the wing — when the ancients saw the one-legged bird cross the night sky, they hurried for water, surer than any night watchman\'s call.' },
  dangkang: { zh: '当康这名字是它自己叫出来的。猪形有牙，秋收时节绕着场院跑，嘴里喊「当康、当康」——庄稼人一听便乐了：今年，又是个丰收年。', en: 'The name Dangkang is the one it calls itself. Pig-shaped and tusked, it runs rounds about the threshing floor in harvest season, crying "Dangkang! Dangkang!" — and the farmers, hearing it, are delighted: another year of plenty.' },
  qizhong: { zh: '跂踵现世，天下大疫。古人把它记在冬月的账上——疫气起于寒，止于春。遇上它，全家闭门熬过寒冬便是，倒也像一位催人猫冬的催债鬼。', en: 'When Qizhong appears, great pestilence follows in the world. The ancients entered it in winter\'s ledger — pestilent airs rise with the cold and cease with spring. Meet it, and the whole household shut the doors and see the winter through; rather like a dunning spirit hurrying everyone indoors for the season.' },
  taotie: { zh: '饕餮贪吃，吃遍天下，末了连自己的身子也吞了下去——只剩一颗大头。所以青铜器上的饕餮纹有首无身。后人说：贪到极处，连自己都是口中之食。', en: 'Taotie devoured everything under heaven until, in the end, it swallowed even its own body — leaving only the great head. And so the taotie on the bronzes has a head but no body. Later generations said: greed carried to its utmost makes a meal even of oneself.' },
  qiongqi: { zh: '穷奇专与好人作对：听说谁忠信，便咬掉人家鼻子；听说谁作恶，反倒衔着猎物去犒赏。也有说它凶起来连善言都听得懂，只是偏偏反着来——天底下头一个「杠精」。', en: 'Qiongqi made a specialty of opposing the good: hearing of a man loyal and true, it would bite off his nose; hearing of a wicked one, it would carry game to reward him. Some say it understands honest speech perfectly well when roused — it simply insists on the reverse. The world\'s first dedicated contrarian.' },
  hundun: { zh: '南海之帝倏、北海之帝忽，时常在中央混沌的地界做客，混沌待他们甚厚。二人商量报恩：人皆有七窍，以视听食息，咱们也给他凿上。日凿一窍，七日凿成——七窍开，混沌死。好心，有时也是杀人的刀。', en: 'Shu, emperor of the South Sea, and Hu, emperor of the North Sea, often visited the middle realm of Hundun, who received them generously. The two conferred on how to repay him: all men have seven apertures for seeing, hearing, eating, breathing — let us carve his. Each day they bored one aperture; on the seventh, the apertures were done — and Hundun died. Kindness, at times, is the knife that kills.' },
  taowu: { zh: '梼杌是上古四凶里最犟的一个：不可教训，不知话言，告之则顽，舍之则嚣。史官拿它给冥顽之人作传——楚国史书唤作《梼杌》，记的都是这类教不化、劝不动的狠角色。', en: 'Taowu was the most obstinate of the four ancient terrors: beyond teaching, deaf to counsel — admonish it and it grows sullen; leave it and it grows insolent. The historians took its name for the biographies of the unteachable: the annals of Chu were called the Taowu, a record of exactly these hard cases whom neither teaching nor pleading could move.' },
  xuanwu: { zh: '龟蛇合体的玄武，龟为甲，蛇为矛，一位顶两位的武神。北方属水，它便镇守北方，后来搬进道观做了真武大帝——披发仗剑，脚踩龟蛇，香火千年不断。', en: 'Xuanwu, tortoise and serpent in one body — the tortoise for armor, the serpent for spear, one deity doing the work of two. The north belongs to water, and so he garrisons the north; later he moved into the Daoist temples as the True Warrior Sovereign — hair unbound, sword in hand, treading tortoise and serpent beneath his feet, his incense unbroken for a thousand years.' },
  fenghuang: { zh: '凤凰身上文着五色德字：首文德，翼文义，背文仁，腹文信。它非梧桐不栖，非竹实不食，非醴泉不饮——挑剔至此，故而凤凰一现，便是圣王出世、天下德化的日子。', en: 'The phoenix bears characters of five colors on its body: virtue on its head, righteousness on its wings, benevolence on its back, faithfulness on its breast. It will perch on nothing but the wutong tree, eat nothing but bamboo seeds, drink nothing but the sweet springs — particular to that degree that when the phoenix appears, it means a sage-king has come into the world and virtue governs the land.' },
  baize: { zh: '相传黄帝东巡，海边遇一神兽，能言人语，通天下万物之情——便是白泽。黄帝问它天下鬼神之事，它一一说破，还开出一万一千五百二十种精怪的名册。后世门上贴的白泽图，便是照着这份户口簿画的。', en: 'They tell how the Yellow Emperor, journeying east, met by the sea a divine beast that spoke human speech and knew the nature of all things under heaven: Baize. The Emperor asked it of the ghosts and spirits of the world, and it named them one by one, drawing up a register of eleven thousand five hundred and twenty kinds of sprite and prodigy. The Baize charts pasted on doors in later ages were painted from that very census.' },
  qilin: { zh: '麒麟仁兽，不履生草，不食生灵，走路都怕踩着蚂蚁。相传孔子生时麟吐玉书，晚年见麟被捕，叹「吾道穷矣」绝笔——一只温软的兽，竟牵着一位圣人的生与死。', en: 'The Qilin is a beast of benevolence: it treads no living grass, eats no living thing, and walks as if afraid of crushing ants. They say that when Confucius was born, a qilin spat out a tablet of jade; and in his last years, seeing a qilin taken in the hunt, he sighed "My way is worn out" and wrote no more — a soft and gentle beast, holding in its fate the birth and death of a sage.' },
}
const bailingImage = (id) => bailingArt[id] ? `/assets/bailing/${bailingArt[id]}` : null

// 山海百灵 · 实绘图像（public/assets/motion/山海百灵），一个条目可有多张，供「看图」灯箱浏览
const motionArt = {
  huaxu: ['华胥 · 伏羲之母.jpg', '华胥 · 伏羲之母（2）.jpg'],
  nuwa: ['女娲.png', '女娲（2）.png', '女娲（3）.jpg', '女娲（4）.jpg', '女娲（5).jpg'],
  jiangyuan: ['姜嫄.jpg', '姜嫄（2）.png'],
  leizu: ['嫘祖.png', '嫘祖（2）.jpg', '嫘祖（3）.png'],
  changxi: ['常羲.jpg', '常羲（2）.jpg', '常羲（3）.png'],
  qingdu: ['庆都.png', '庆都（2）.jpg'],
  xihe: ['羲和.jpg', '羲和（2）.jpg', '羲和（3）.jpg', '羲和（4）.jpg', '羲和（5）.jpg'],
  qizhong: ['跂踵.jpg', '跂踵（2）.jpg', '跂踵（3）.jpg'],
  taowu: ['梼杌.png', '梼杌（2）.jpg', '梼杌（4）.jpg', '梼杌（5）.jpg'],
  xuanwu: ['玄武.jpg', '玄武（2）.jpg', '玄武（3）.jpg', '玄武（4）.jpg'],
  baize: ['白泽.jpg', '白泽（2）.jpg', '白泽（3）.jpg', '白泽（4）.jpg'],
  qilin: ['麒麟.jpg', '麒麟（2）.jpg', '麒麟（3）.jpg', '麒麟（4）.jpg'],
}
export const motionImages = (id) => (motionArt[id] || []).map(
  (name) => `/assets/motion/${encodeURIComponent('山海百灵')}/${encodeURIComponent(name)}`
)

// 主题条目在其他山经页面也有记载的，给出循迹入卷的落点（直达对应山站场景）
const scrollLink = {
  xiwangmu: { jing: 'xishan', scene: 'yushan' },
  ernv: { jing: 'zhongshan', scene: 'dongtingshan' },
  fenghuang: { jing: 'nanshan', scene: 'danxue' },
  // 四凶里有两凶在已开放的山经中有原形记载：饕餮即狍鸮（钩吾山），混沌即帝江（天山）
  taotie: { jing: 'beishan', scene: 'gouwu' },
  hundun: { jing: 'xishan', scene: 'tianshan' },
}

// 山海百灵 · 同物异名：四凶中有两凶在已开放的山经里能找到原形记载
const aliasNotes = {
  taotie: { zh: '饕餮即《北山经》钩吾之山的狍鸮——羊身人面，虎齿人爪，其目在腋下。循迹入卷可直达钩吾山一页。', en: 'Taotie is one and the same as Paoxiao of Gouwu Mountain in the Classic of the Northern Mountains — sheep-bodied and human-faced, with tiger\'s tusks, human claws, and eyes beneath the arms. Follow the trail into the scroll to reach the Gouwu page directly.' },
  hundun: { zh: '混沌即《西山经》天山的帝江——六足四翼，浑敦无面目，是识歌舞的神鸟。循迹入卷可直达天山一页。', en: 'Hundun is one and the same as Dijiang of Tianshan in the Classic of the Western Mountains — six feet, four wings, a shapeless whole without face or features, the divine bird that knows song and dance. Follow the trail into the scroll to reach the Tianshan page directly.' },
}

const notes = {
  shanyu: { zh: '随食水而现的山中游鱼，名字在东山的水脉里留下回声。', en: 'A fish of the mountain waters that appears with the Shi River, its name echoing through the waterways of the eastern mountains.' },
  boyu: { zh: '薄鱼与石膏水相连；古籍将它的出现写作旱象。', en: 'The Boyu fish is bound to the Shigao waters; the old records write its appearance as an omen of drought.' },
  gaigai: { zh: '四首、六足、三尾，像鸡又似鱼，是跂踵山水域的奇形。', en: 'Four heads, six feet, three tails — like a chicken, yet like a fish: the strange form of the Qizhong waters.' },
  heluo: { zh: '一首十身，叫声如犬，是北山水族中极醒目的一笔。', en: 'One head and ten bodies, crying like a dog — the most striking entry in the northern waters\' bestiary.' },
  wenyao: { zh: '鱼身鸟翼，夜间飞行于西海、东海之间。', en: 'A fish\'s body with bird\'s wings, flying by night between the Western and Eastern Seas.' },
  luanniao: { zh: '五彩羽纹的鸾鸟，在经文中与天下安宁相连。', en: 'The Luanniao, feathered in five colors, whom the classic ties to peace throughout the world.' },
  dangkang: { zh: '猪形而有牙，鸣声自呼；古籍以它预示丰年。', en: 'Pig-shaped and tusked, calling its own name; the old records read it as a promise of harvest.' },
  congcong: { zh: '六足如犬的从从，出现时被写作丰收之兆。', en: 'Congcong, dog-like but for six feet, whose appearance the text writes as an omen of harvest.' },
  bifang: { zh: '独足的毕方，有青色羽身与赤色纹理，牵出火的征兆。', en: 'The one-legged Bifang, blue of feather and red of marking, drawing with it the omen of fire.' },
  feiyi: { zh: '六足四翼的异蛇，古籍把它与大旱并记。', en: 'A serpent of six feet and four wings, entered in the old records alongside great drought.' },
  zhuyan: { zh: '白首赤足的猿形异兽，其出现伴随兵事的想象。', en: 'An ape-like creature, white-headed and red-footed, whose appearance carried imaginations of war.' },
  qiuyu: { zh: '兔形、鸟喙、鸱目、蛇尾，诸形在一身交汇。', en: 'Rabbit\'s form, bird\'s beak, owl\'s eyes, serpent\'s tail — many shapes meeting in one body.' },
  lingling: { zh: '牛身虎纹，鸣声自叫；经文以它写大风将至。', en: 'Ox-bodied and tiger-striped, calling its own name; the classic uses it to tell of a great wind coming.' },
  jingwei: { zh: '炎帝少女化为精卫，衔木石填东海，成为不息的传说。', en: 'The Yan Emperor\'s youngest daughter became Jingwei, carrying twigs and stones to fill the Eastern Sea — a legend that never rests.' },
  yingzhao: { zh: '人面马身、虎纹鸟翼，巡行四海的神异之兽。', en: 'A human face on a horse\'s body, tiger-striped and bird-winged, patrolling the four seas.' },
  dijiang: { zh: '六足四翼而无面目，知歌舞的帝江有独特形象。', en: 'Six feet, four wings and no face at all: Dijiang, who knows song and dance, is singular in form.' },
  songsi: { zh: '人面的雉形鸟，见人便跃，是北山的灵动一瞬。', en: 'A pheasant-shaped bird with a human face, leaping at the sight of people — one quickening moment of the northern mountains.' },
  fuxi: { zh: '人面鸡身，见则有兵，凫徯带着不安的预兆。', en: 'A human face on a cock\'s body; when it appears, war follows. Fuxi the bird carries an uneasy omen.' },
  ershu: { zh: '兔首麋身的耳鼠，以尾飞行，是北山的奇兽。', en: 'The Ershu, rabbit-headed and elk-bodied, flying on its tail — a marvel of the northern mountains.' },
  paoxiao: { zh: '羊身人面，目在腋下，极具视觉冲击的狍鸮。', en: 'Sheep-bodied and human-faced, with eyes beneath the arms — Paoxiao, startling to the very sight.' },
  xiegou: { zh: '像凫而有鼠尾，善于攀木的絜钩栖于山林。', en: 'Like a wild duck but for a rat\'s tail, the tree-climbing Xiegou dwells in the mountain forests.' },
  zhuru: { zh: '狐形鱼翼，以水与陆的形态组合成奇兽。', en: 'Fox-shaped with fish\'s fins, a marvel composed of water and land in one form.' },
  yuhu: { zh: '麋形鱼目，妴胡隐在尸胡山的林水之间。', en: 'Elk-shaped with fish\'s eyes, Yuhu hides between wood and water on Shihu Mountain.' },
  luwu: { zh: '虎身九尾、人面虎爪，镇守昆仑的神陆吾。', en: 'Tiger-bodied and nine-tailed, human-faced with tiger\'s claws: Luwu, divine warden of Kunlun.' },
  xiwangmu: { zh: '玉山为西王母所居。人物图像与叙事留待后续资料专题展开。', en: 'Jade Mountain is where the Queen Mother of the West dwells. Her portraiture and story await a dedicated expansion.' },
}

const volumeNames = {
  dongshan: { zh: '东山经', en: 'Classic of the Eastern Mountains' },
  xishan: { zh: '西山经', en: 'Classic of the Western Mountains' },
  beishan: { zh: '北山经', en: 'Classic of the Northern Mountains' },
}

const mountains = {
  shanyu: { zh: '樕䘄山', en: 'Mount Shuzhu' }, congcong: { zh: '栒状山', en: 'Mount Xunzhuang' },
  dongdong: { zh: '泰山', en: 'Mount Tai' }, lingling: { zh: '空桑山', en: 'Mount Kongsang' },
  qiuyu: { zh: '余峨山', en: 'Mount Yu\'e' }, zhuru: { zh: '耿山', en: 'Mount Geng' },
  xiegou: { zh: '碷山', en: 'Mount Xiegou' }, yuhu: { zh: '尸胡山', en: 'Mount Shihu' },
  gaigai: { zh: '跂踵山', en: 'Mount Qizhong' }, jingjing: { zh: '踇隅山', en: 'Mount Mouyu' },
  juzu: { zh: '北号山', en: 'Mount Beihao' }, boyu: { zh: '女烝山', en: 'Mount Nüzheng' },
  heyu: { zh: '剡山', en: 'Mount Shan' }, dangkang: { zh: '钦山', en: 'Mount Qin' },
  juanyang: { zh: '钱来山', en: 'Mount Qianlai' }, feiyi: { zh: '太华山', en: 'Mount Taihua' },
  luanniao: { zh: '羭次山', en: 'Mount Yunci' }, yingwu: { zh: '黄山', en: 'Mount Huang' },
  fuxi: { zh: '鹿台山', en: 'Mount Lutai' }, zhuyan: { zh: '小次山', en: 'Mount Xiaoci' },
  yingzhao: { zh: '槐江山', en: 'Mount Huaijiang' }, luwu: { zh: '昆仑丘', en: 'Kunlun Heights' },
  xiwangmu: { zh: '玉山', en: 'Jade Mountain' }, bifang: { zh: '章莪山', en: 'Mount Zhang\'e' },
  dijiang: { zh: '天山', en: 'Mount Tian' }, wenyao: { zh: '泰器山', en: 'Mount Taiqi' },
  rushou: { zh: '崦嵫山', en: 'Mount Yanzi' }, qiongqi: { zh: '邽山', en: 'Mount Gui' },
  shuhu: { zh: '崦嵫山', en: 'Mount Yanzi' },
  zhujian: { zh: '单张山', en: 'Mount Danzhang' }, ershu: { zh: '丹熏山', en: 'Mount Danxun' },
  songsi: { zh: '灌题山', en: 'Mount Guanti' }, changshe: { zh: '大咸山', en: 'Mount Daxian' },
  heluo: { zh: '管涔山', en: 'Mount Guancen' }, paoxiao: { zh: '钩吾山', en: 'Mount Gouwu' },
  yayu: { zh: '少咸山', en: 'Mount Shaoxian' }, duyu: { zh: '敦题山', en: 'Mount Dunti' },
  tianma: { zh: '马成山', en: 'Mount Macheng' }, jingwei: { zh: '发鸠山', en: 'Mount Fajiu' },
  huangniao: { zh: '轩辕山', en: 'Mount Xuanyuan' }, dashe: { zh: '錞于毋逢山', en: 'Mount Chunyu Wufeng' },
}

const defaultNote = { zh: '循着山川与经文，读这只异兽留下的线索。', en: 'Follow the mountains, rivers and classic text to read what traces this creature left behind.' }
export const beasts = volumes.flatMap((volume) => {
  const scenes = new Map(volume.scenes.map((scene) => [scene.beast, scene]))
  return volume.segments.flatMap((segment) => (segment.beasts || []).flatMap((beast) => {
    const scene = scenes.get(beast.id)
    if (!scene || !beast.img && !artwork[beast.id] && !bailingImage(beast.id)) return []
    return [{ ...beast, image: bailingImage(beast.id) || (artwork[beast.id]
      ? `/assets/motion/${artwork[beast.id]}`
      : `/img/${beast.img}`), volumeId: volume.id, volumeName: volumeNames[volume.id] || { zh: volume.title, en: volume.title }, tale: tales[beast.id] || null,
      mountain: mountains[beast.id] || { zh: (scene.title || '').split(' · ')[0], en: (scene.title || '').split(' · ')[0] }, sceneId: scene.id, note: notes[beast.id] || defaultNote }]
  }))
})


// 先以题签补齐专题结构；未核对原文或尚无插画的条目不借用其他异兽的图文。
const figureNotes = {
  huaxu: { zh: '雷泽履大迹而孕，生伏羲。传说之首，人文之始。', en: 'She stepped upon the great print at Thunder Marsh and conceived, bearing Fuxi. First of the legends, beginning of the human arts.' },
  xihe: { zh: '羲和者，帝俊之妻，生十日，浴日于甘渊。', en: 'Xihe, wife of Di Jun, bore the ten suns and bathed them in the Sweet Abyss.' },
  changxi: { zh: '常羲者，帝俊之妻，生月十有二，浴月于玄渊。一说占月之常仪即为其化身。', en: 'Changxi, wife of Di Jun, bore twelve moons and bathed them in the Dark Abyss. Some hold that Changyi the moon-diviner was her incarnation.' },
  ernv: { zh: '娥皇女英，帝俊之二女，居洞庭之山，出入必以飘风暴雨。', en: 'Ehuang and Nüying, the two daughters of Di Jun, dwelt on Dongting Mountain; whirlwind and rainstorm attended their going and coming.' },
  leizu: { zh: '嫘祖为黄帝正妃，始教民育蚕治丝，衣被天下。', en: 'Leizu, chief consort of the Yellow Emperor, first taught the people to raise silkworms and reel silk, clothing the world.' },
  nuwa: { zh: '人首蛇身，炼五色石补天，抟土造人，立四极。', en: 'Human-headed and serpent-bodied, she smelted the five-colored stones to mend heaven, kneaded clay to make mankind, and set up the four extremities.' },
  jiangyuan: { zh: '姜嫄履巨人迹而孕，生后稷，播百谷以为农祖。', en: 'Jiangyuan stepped upon a giant\'s footprint and conceived, bearing Houji, sower of the hundred grains and ancestor of agriculture.' },
  qingdu: { zh: '庆都与赤龙合而有孕，生尧，帝尧之母。', en: 'Qingdu conceived by the crimson dragon and bore Yao; she was mother of Emperor Yao.' },
  xiwangmu: { zh: '玉山，是西王母所居也。豹尾虎齿而善啸，蓬发戴胜。', en: 'Jade Mountain is where the Queen Mother of the West dwells: leopard\'s tail and tiger\'s tusks, skilled in whistling cries, wild-haired and crowned with the sheng ornament.' },
}
const quotes = {
  ernv: '洞庭之山……帝之二女居之，是常游于江渊。澧沅之风，交潇湘之渊。',
  xihe: '有女子曰羲和，方日浴于甘渊。羲和者，帝俊之妻，生十日。',
  changxi: '有女子方浴月。帝俊妻常羲，生月十有二，此始浴之。',
  nuwa: '女娲之肠，化为神，处栗广之野。',
  xiwangmu: '玉山，是西王母所居也。',
  leizu: '黄帝妻雷祖，生昌意。——《海内经》（雷祖，即嫘祖）',
  huaxu: '华胥氏之国……其国无师长，自然而已；其民无嗜欲，自然而已。——《列子·黄帝》',
  jiangyuan: '厥初生民，时维姜嫄。生民如何？克禋克祀，以弗无子。——《诗经·大雅·生民》',
  qingdu: '帝喾娶陈锋氏女，生放勋。——《史记·五帝本纪》（放勋，即帝尧；庆都为其母）',
  qizhong: '复州之山……有鸟焉，其状如鸮而一足，彘尾，其名曰跂踵，见则其国大疫。——《中山经》',
  taotie: '周鼎著饕餮，有首无身，食人未咽，害及其身。——《吕氏春秋·先识览》',
  hundun: '有神焉，其状如黄囊，赤如丹火，六足四翼，浑敦无面目，是识歌舞，实惟帝江也。——《西山经》',
  taowu: '西方荒中有兽焉，其状如虎而犬毛……人面虎足猪牙，尾长一丈八尺，名曰梼杌。——《神异经》',
  xuanwu: '北方水……其兽玄武。——《史记·天官书》',
  fenghuang: '有鸟焉，其状如鸡，五采而文，名曰凤皇……是鸟也，饮食自然，自歌自舞，见则天下安宁。——《南山经》',
  baize: '白泽神兽，能言，达于万物之情。——《云笈七签·轩辕本纪》',
  qilin: '麟之趾，振振公子。——《诗经·周南·麟之趾》',
  heluo: '谯明之山，谯水出焉……其中多何罗之鱼，一首而十身，其音如吠犬，食之已痈。——《北山经》',
  luanniao: '羭次之山……有鸟焉，其状如翟而五采文，名曰鸾鸟，见则天下安宁。——《西山经》',
  luwu: '昆仑之丘，是实惟帝之下都，神陆吾司之。其神状虎身而九尾，人面而虎爪；是神也，司天之九部及帝之囿时。——《西山经》',
  qiongqi: '邽山，其上有兽焉，其状如牛，猬毛，名曰穷奇，音如獆狗，是食人。——《西山经》',
}
const emptyNote = { zh: '', en: '' }
const themeVolumeName = { zh: '神话传说 · 专题', en: 'Myth & Legend · Special Topics' }
const mountainName = { zh: '山海百灵', en: 'The Bestiary of Shan Hai Jing' }
const forthcomingNote = { zh: '图像与原文待补，暂以题签展示。', en: 'Image and source text to come; shown as a title-card for now.' }

// 山海百灵 · 女神专题（image 由 bailingArt 提供）
const figures = [
  ['xiwangmu', '西王母', 'Queen Mother of the West'],
  ['huaxu', '华胥 · 伏羲之母', 'Huaxu, Mother of Fuxi'],
  ['xihe', '羲和', 'Xihe'],
  ['changxi', '常羲', 'Changxi'],
  ['ernv', '帝之二女', 'The Two Daughters of Di'],
  ['leizu', '嫘祖', 'Leizu'],
  ['nuwa', '女娲', 'Nüwa'],
  ['jiangyuan', '姜嫄', 'Jiangyuan'],
  ['qingdu', '庆都', 'Qingdu'],
].map(([id, zh, en]) => ({
  id, name: { zh, en }, image: bailingImage(id), quote: quotes[id] || null, tale: tales[id] || null,
  note: figureNotes[id] || emptyNote, goddess: true, volumeName: themeVolumeName, mountain: mountainName,
  ...scrollLink[id] && { volumeId: scrollLink[id].jing, sceneId: scrollLink[id].scene },
}))

const forthcoming = [
  ['qizhong', '跂踵', 'Qizhong'],
  ['taotie', '饕餮', 'Taotie'],
  ['hundun', '混沌', 'Hundun'],
  ['taowu', '梼杌', 'Taowu'],
  ['xuanwu', '玄武', 'Xuanwu'],
  ['fenghuang', '凤凰', 'Fenghuang'],
  ['baize', '白泽', 'Baize'],
  ['qilin', '麒麟', 'Qilin'],
].map(([id, zh, en]) => ({ id, name: { zh, en }, image: bailingImage(id), quote: quotes[id] || null, tale: tales[id] || null, note: aliasNotes[id] || forthcomingNote, forthcoming: true, ...scrollLink[id] && { volumeId: scrollLink[id].jing, sceneId: scrollLink[id].scene } }))

// 英文山名与卷名（供条目眉注使用；均为音译/意译的专有名词）

// 英文异兽名：保留拼音，酌情附一语识记
const beastEnNames = {
  shanyu: 'Yongyong Fish', congcong: 'Congcong', dongdong: 'Dongdong', lingling: 'Lingling',
  qiuyu: 'Qiuyu', zhuru: 'Zhuru', xiegou: 'Xiegou', yuhu: 'Yuhu', gaigai: 'Gaigai Fish',
  jingjing: 'Jingjing', juzu: 'Juzu', heyu: 'Heyu', dangkang: 'Dangkang', boyu: 'Boyu Fish',
  juanyang: 'Juanyang', feiyi: 'Feiyi', luanniao: 'Luanniao, the Luan Bird', yingwu: 'Yingwu the Parrot',
  fuxi: 'Fuxi the Bird', zhuyan: 'Zhuyan', yingzhao: 'Yingzhao', luwu: 'Luwu',
  bifang: 'Bifang', dijiang: 'Dijiang', wenyao: 'Wenyao the Flying Fish', rushou: 'Rushou',
  qiongqi: 'Qiongqi', shuhu: 'Shuhu', zhujian: 'Zhujian', ershu: 'Ershu the Ear Mouse',
  songsi: 'Songsi', changshe: 'Changshe the Long Serpent', heluo: 'Heluo Fish',
  paoxiao: 'Paoxiao', yayu: 'Yayu', duyu: 'Duyu', tianma: 'Tianma', jingwei: 'Jingwei',
  huangniao: 'Huangniao the Yellow Bird', dashe: 'Dashe the Great Serpent',
}

// 反查某异兽在山海百灵中所属的主题（同兽可入多主题，取第一个）
export const beastCategoryId = (id) => categories.find((item) => item.ids.includes(id))?.id || null

export const beastById = Object.fromEntries([...beasts, ...figures, ...forthcoming].map((beast) => [beast.id, {
  ...beast,
  name: beast.name && beast.name.zh ? beast.name : { zh: beast.name, en: beastEnNames[beast.id] || beast.name },
}]))

export const categories = [
  { id: 'goddesses', index: '壹', name: { zh: '神界大女主', en: 'Divine Women' }, english: 'DIVINE WOMEN',
    subtitle: { zh: '从玉山的西王母出发，追索山海神女的身影。', en: 'Beginning with the Queen Mother of the West on Jade Mountain, tracing the goddesses of the mountains and seas.' },
    cover: '/assets/bailing/goddesses.png', emblem: '神', tone: 'gold',
    ids: ['xiwangmu', 'huaxu', 'xihe', 'changxi', 'ernv', 'leizu', 'nuwa', 'jiangyuan', 'qingdu'],
    forthcoming: { zh: '人物专题持续收录', en: 'More figures added in due course' },
    planned: { zh: '伏羲之母 · 羲和 · 常羲 · 帝之二女 · 嫘祖 · 女娲 · 姜嫄 · 庆都', en: 'Mother of Fuxi · Xihe · Changxi · Daughters of Di · Leizu · Nüwa · Jiangyuan · Qingdu' } },
  { id: 'manyforms', index: '贰', name: { zh: '九首九尾', en: 'Many Forms' }, english: 'MANY FORMS',
    subtitle: { zh: '九尾、四首、十身：奇异形貌背后的古人想象。', en: 'Nine tails, four heads, ten bodies: the ancient imagination behind marvelous shapes.' },
    cover: '/assets/bailing/manyforms.png', emblem: '异', tone: 'violet', ids: ['luwu', 'gaigai', 'heluo', 'dijiang'] },
  { id: 'water', index: '叁', name: { zh: '山海灵鱼', en: 'Waters' }, english: 'WATERS',
    subtitle: { zh: '沿江河入海，遇见水中的奇形与传说。', en: 'Follow the rivers to the sea and meet the marvels and legends of the waters.' },
    cover: '/assets/bailing/water.png', emblem: '水', tone: 'blue', ids: ['heluo', 'wenyao', 'gaigai', 'boyu', 'shanyu'] },
  { id: 'seasons', index: '肆', name: { zh: '季节征兆之兽', en: 'Four Seasons' }, english: 'FOUR SEASONS',
    subtitle: { zh: '春鸾、夏火、秋丰、冬疫，循四时翻阅异兽征兆。', en: 'Spring\'s luan, summer\'s fire, autumn\'s plenty, winter\'s pestilence: reading the omens beast by season.' },
    cover: '/assets/bailing/seasons.png', emblem: '时', tone: 'cinnabar', ids: ['luanniao', 'bifang', 'dangkang', 'qizhong'],
    labels: { luanniao: { zh: '春 · 鸾鸟', en: 'Spring · Luanniao' }, bifang: { zh: '夏 · 毕方', en: 'Summer · Bifang' }, dangkang: { zh: '秋 · 当康', en: 'Autumn · Dangkang' }, qizhong: { zh: '冬 · 跂踵', en: 'Winter · Qizhong' } } },
  { id: 'fierce', index: '伍', name: { zh: '四大凶兽', en: 'Four Fierce Beasts' }, english: 'FOUR FIERCE BEASTS',
    subtitle: { zh: '饕餮、穷奇、混沌、梼杌，四枚凶兽题签。', en: 'Taotie, Qiongqi, Hundun, Taowu: four fierce title-cards.' },
    cover: '/assets/bailing/fierce.png', emblem: '凶', tone: 'moss', ids: ['taotie', 'qiongqi', 'hundun', 'taowu'] },
  { id: 'auspicious', index: '陆', name: { zh: '四大祥瑞神兽', en: 'Auspicious Beings' }, english: 'AUSPICIOUS BEINGS',
    subtitle: { zh: '玄武、凤凰、白泽、麒麟，静候图像入卷。', en: 'Xuanwu, Fenghuang, Baize, Qilin — awaiting their portraits in the scroll.' },
    cover: '/assets/bailing/auspicious.png', emblem: '瑞', tone: 'teal', ids: ['xuanwu', 'fenghuang', 'baize', 'qilin'] },
]
