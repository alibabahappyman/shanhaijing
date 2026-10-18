import { catalogProfiles } from './beastProfilesCatalog.js'
import { addedProfiles } from './beastProfilesAdditions.js'

// 深读条目：原典所载、相关传说和当代释读分开编写，避免把演绎当作经文。
export const beastProfiles = {
  ...catalogProfiles,
  ...addedProfiles,
  dijiang: {
    subtitle: { zh: '没有面目的神，却懂得歌舞。', en: 'A god without a face, who yet knows song and dance.' },
    introduction: { zh: '《西山经》写帝江，先写天山的金玉、青雄黄与流向汤谷的英水，再让这位无面之神出现。寥寥数语，把一种无法以人的五官辨认的生命，写得仿佛正要在山间起舞。', en: 'The Western Mountains introduces Dijiang by way of Mount Tian — its gold and jade, blue orpiment, and the Ying River flowing toward Tang Valley — before this faceless god appears. In a few words it writes a being no human feature can identify, as if it were about to dance among the mountains.' },
    traits: [{ zh: '形如黄囊', en: 'Shaped like a yellow sack' }, { zh: '赤如丹火', en: 'Red as cinnabar fire' }, { zh: '六足四翼', en: 'Six feet, four wings' }, { zh: '浑敦无面目', en: 'A shapeless whole, without face or features' }, { zh: '识歌舞', en: 'It knows song and dance' }],
    sections: [
      {
        title: { zh: '外形特征', en: 'Outward Form' },
        eyebrow: { zh: '原典所载', en: 'From the Classic' },
        paragraphs: [
          { zh: '它的整体轮廓像黄色的囊袋，颜色又被形容为“赤如丹火”；六只脚支撑身体，四片翅膀从躯干伸出。经文没有写出头、角或尾，最突出的特征是“浑敦无面目”。', en: 'Its whole outline is like a yellow sack, its color "red as cinnabar fire"; six feet bear the body, four wings spring from the trunk. The text gives no head, horns, or tail — the crowning trait is "a shapeless whole, without face or features."' },
          { zh: '这里的“无面目”是原文的说法。画面可以把它表现为没有可辨的脸，但眼、耳、鼻、口各自如何，并没有在《西山经》中逐一说明。', en: '"Without face or features" is the original\'s own wording. A picture may show it with no readable face, but how eye, ear, nose, and mouth each fare is never itemized in the Western Mountains.' }
        ]
      },
      {
        title: { zh: '歌舞之神', en: 'God of Song and Dance' },
        eyebrow: { zh: '原典所载 · 画面演绎', en: 'From the Classic · Pictorial Rendering' },
        paragraphs: [
          { zh: '形貌描写之后，原文突然落下“是识歌舞”四字：没有面目，却能通晓歌与舞。这也是帝江形象最有张力的地方——它的感知与表达不必遵循人的样子。', en: 'After the description of form, the original suddenly drops four words: "it knows song and dance." No face, yet versed in both — this is where the image of Dijiang holds its greatest tension: its perceiving and expressing need not follow human shape.' },
          { zh: '我们在画中让六足带出节拍、四翼带动气流，是依据这四个字做的视觉演绎。古书没有写它掌管空间、创造世界，或说明它究竟怎样听见音乐。', en: 'In the picture we let the six feet carry the beat and the four wings stir the air — a visual rendering built on those four words. The old books never say it governs space or created the world, nor how it actually hears music.' }
        ]
      },
      {
        title: { zh: '浑沌与七窍', en: 'Hundun and the Seven Apertures' },
        eyebrow: { zh: '相关传说 · 《庄子·应帝王》', en: 'Related Legend · Zhuangzi, "Responses for Kings and Emperors"' },
        paragraphs: [
          { zh: '《庄子》另有“浑沌”寓言：南海之帝儵、北海之帝忽受到中央之帝浑沌款待，想替它凿出供人视、听、食、息的七窍。两位每天凿一窍，到了第七天，浑沌死了。', en: 'The Zhuangzi tells another tale of Hundun: Shu, emperor of the South Sea, and Hu, emperor of the North Sea, well entertained by Hundun, emperor of the Center, wished to repay him by boring the seven apertures — for sight, hearing, eating, and breath. They bored one a day; on the seventh, Hundun died.' },
          { zh: '《西山经》的帝江与《庄子》的浑沌并非同一段故事。两者都具有“无面目／无七窍”的意象，后世注家便常把它们联系起来。七窍的结局属于《庄子》，不属于《西山经》对帝江的记述。', en: 'Dijiang of the Western Mountains and Hundun of the Zhuangzi are not one story. Both share the image of "no face / no seven apertures," and later commentators often joined them; but the fate of the apertures belongs to the Zhuangzi, not to the Classic\'s account of Dijiang.' }
        ]
      },
      {
        title: { zh: '文化意象', en: 'Cultural Imagery' },
        eyebrow: { zh: '本站释读', en: 'Our Reading' },
        paragraphs: [
          { zh: '帝江不靠一张脸建立身份，却因歌舞而鲜活；“浑沌”的寓言则提醒人们，按照自己的尺度去补全他者，可能恰恰破坏了它原有的生命方式。', en: 'Dijiang needs no face to be a self, yet lives through song and dance; the Hundun parable warns that completing another creature to one\'s own measure may be the very thing that destroys its way of being alive.' },
          { zh: '把两篇文本放在一起，帝江便可以成为“未被规整的生命仍有自己的节奏”的象征。这是本站的并读与创作理解，不是《山海经》为帝江规定的神职。', en: 'Set the two texts together and Dijiang becomes an emblem of "life unruly by our standards still keeps its own rhythm." That is this site\'s paired reading and creative understanding, not a divine office the Classic assigned it.' }
        ]
      }
    ],
    sources: [
      { label: { zh: '《山海经·西山经》天山条', en: 'Classic of Mountains and Seas, "Western Mountains," Mount Tian entry' }, url: 'https://zh.wikisource.org/zh-hans/%E5%B1%B1%E6%B5%B7%E7%B6%93/%E8%A5%BF%E5%B1%B1%E7%B6%93' },
      { label: { zh: '《庄子·应帝王》浑沌寓言', en: 'Zhuangzi, "Responses for Kings and Emperors," the Hundun parable' }, url: 'https://ctext.org/text.pl?if=gb&node=2769&show=parallel' }
    ]
  }
}
