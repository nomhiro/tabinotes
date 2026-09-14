import { useState } from "react";
import DayMap from "../../components/DayMap";
import PlacePreview from "../../components/PlacePreview";

const PRAGUE_OLD_TOWN_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Prague_Old_Town.JPG?width=1200",
  alt: "赤い屋根が連なるプラハ旧市街の街並み",
  credit: "Kallerna / Wikimedia Commons / Public domain",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_Old_Town.JPG",
};

const CHAIN_BRIDGE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg?width=1200",
  alt: "夜間にライトアップされたセーチェニ鎖橋",
  credit: "Wilfredor / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
};

const VARKERT_BAZAR_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/VarkertBazarFotoThalerTamas2.JPG?width=1200",
  alt: "ヴァールケルト・バザールのネオルネサンス庭園と回廊",
  credit: "Thaler Tamas / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:VarkertBazarFotoThalerTamas2.JPG",
};

const BUDA_CASTLE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Buda_Castle_from_the_Danube_River.jpg?width=1200",
  alt: "ドナウ川から望むブダ王宮のパノラマ",
  credit: "Mgimelfarb / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Buda_Castle_from_the_Danube_River.jpg",
};

const MATTHIAS_CHURCH_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Matthias_Church,_Budapest,_2017.jpg?width=1200",
  alt: "ジョルナイ瓦が鮮やかなマーチャーシュ教会",
  credit: "Stefan Schäfer / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Matthias_Church,_Budapest,_2017.jpg",
};

const FISHERMANS_BASTION_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Fishermans_bastion_Budapest_IMG_1429.JPG?width=1200",
  alt: "白亜の尖塔と回廊が美しい漁夫の砦",
  credit: "Bjoertvedt / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Fishermans_bastion_Budapest_IMG_1429.JPG",
};

const PARLIAMENT_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Parliament_Building_(Budapest,_Hungary).jpg?width=1200",
  alt: "ドナウ河畔に佇むハンガリー国会議事堂",
  credit: "Andrew Shiva / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Parliament_Building_(Budapest,_Hungary).jpg",
};

const POSTAL_SAVINGS_BANK_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Budapest_-_Postatakar%C3%A9kp%C3%A9nzt%C3%A1r.jpg?width=1200",
  alt: "レフネル・エデン設計の旧郵便貯金局（ハンガリー・アールヌーヴォー建築）",
  credit: "Wikimedia Commons / CC BY-SA",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Budapest_-_Postatakar%C3%A9kp%C3%A9nzt%C3%A1r.jpg",
};

const ST_STEPHEN_BASILICA_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Stephen%27s_Basilica_Budapest.jpg?width=1200",
  alt: "ブダペスト最大のカトリック教会 聖イシュトヴァーン大聖堂",
  credit: "Jorge Láscar / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Saint_Stephen%27s_Basilica_Budapest.jpg",
};

const OPERA_HOUSE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hungarian_State_Opera_House_in_Budapest.jpg?width=1200",
  alt: "ネオルネサンス様式の豪奢なハンガリー国立歌劇場",
  credit: "Jeremy Oakley / Wikimedia Commons / CC BY 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Hungarian_State_Opera_House_in_Budapest.jpg",
};

const HEROES_SQUARE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Heroes_Square_Budapest,_Hungary.jpg?width=1200",
  alt: "建国千年記念碑がそびえる英雄広場",
  credit: "Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Heroes_Square_Budapest,_Hungary.jpg",
};

const VAJDAHUNYAD_CASTLE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Budapest,_Vajdahunyad_Castle.jpg?width=1200",
  alt: "市民公園内のヴァイダフニャディ城",
  credit: "Batomi / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Budapest,_Vajdahunyad_Castle.jpg",
};

const ST_STEPHANS_VIENNA_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Stephansdom_(1).JPG?width=1200",
  alt: "ウィーンのシンボル シュテファン大聖堂",
  credit: "C.Stadler/Bwag / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien_-_Stephansdom_(1).JPG",
};

const SCHONBRUNN_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sch%C3%B6nbrunn_palace.jpg?width=1200",
  alt: "ハプスブルク家の離宮 シェーンブルン宮殿",
  credit: "Simon Matzinger / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Sch%C3%B6nbrunn_palace.jpg",
};

const PRUNKSAAL_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%2C_%C3%96sterreichische_Nationalbibliothek%2C_Prunksaal_(1726)_(27870057169).jpg?width=1200",
  alt: "オーストリア国立図書館 プルンクザール（豪華絢爛なバロック建築）",
  credit: "Herbert Frank / Wikimedia Commons / CC BY 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien,_%C3%96sterreichische_Nationalbibliothek,_Prunksaal_(1726)_(27870057169).jpg",
};

const BELVEDERE_PALACE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Schloss_Belvedere%2C_oberes_(1).JPG?width=1200",
  alt: "バロック建築の傑作 ベルヴェデーレ上宮",
  credit: "C.Stadler/Bwag / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien_-_Schloss_Belvedere,_oberes_(1).JPG",
};

const RATHAUS_MARKET_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Christkindlmarkt%2C_Rathausplatz.JPG?width=1200",
  alt: "市庁舎前広場のクリスマスマーケット（ウィーン・クリスマス・ドリーム）",
  credit: "C.Stadler/Bwag / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien_-_Christkindlmarkt,_Rathausplatz.JPG",
};

const PETERSKIRCHE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Peterskirche%2C_Innenansicht.JPG?width=1200",
  alt: "ペーター教会の壮麗なバロック様式の祭壇とドーム天井",
  credit: "C.Stadler/Bwag / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien_-_Peterskirche,_Innenansicht.JPG",
};

const KHM_CAFE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Cafe_Kunsthistorisches_Museum_Wien.jpg?width=1200",
  alt: "美術史美術館の八角形大ドーム下に広がる豪奢なカフェ・レストラン",
  credit: "Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Cafe_Kunsthistorisches_Museum_Wien.jpg",
};

const CHARLES_BRIDGE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Charles_Bridge,_Prague_pic1.JPG?width=1200",
  alt: "ヴルタヴァ川にかかるカレル橋とプラハ城の遠景",
  credit: "Alf van Beem / Wikimedia Commons / Public domain",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Charles_Bridge,_Prague_pic1.JPG",
};

const ST_VITUS_CATHEDRAL_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Vitus_Cathedral_in_Prague,_Czech_Republic.jpg?width=1200",
  alt: "プラハ城内にそびえる聖ヴィート大聖堂のゴシック様式ファサード",
  credit: "Eric Ward / Wikimedia Commons / CC BY-SA 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Saint_Vitus_Cathedral_in_Prague,_Czech_Republic.jpg",
};

const STRAHOV_LIBRARY_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Strahov_Theological_Hall,_Prague_-_7565.jpg?width=1200",
  alt: "ストラホフ修道院図書館の壮麗なバロック様式「神学の間」",
  credit: "Jorge Láscar / Wikimedia Commons / CC BY 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Strahov_Theological_Hall,_Prague_-_7565.jpg",
};

const ASTRONOMICAL_CLOCK_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Prague_Astronomical_Clock_in_Old_Town_-_8559.jpg?width=1200",
  alt: "旧市庁舎の壁面に佇むプラハの天文時計（プラハのオルロイ）",
  credit: "Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Prague_Astronomical_Clock_in_Old_Town_-_8559.jpg",
};

const GOLDEN_LANE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Prague_-_Zlata_ulicka.jpg?width=1200",
  alt: "プラハ城内の色鮮やかで可愛らしい黄金の小路",
  credit: "Wikimedia Commons / CC BY-SA",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_-_Zlata_ulicka.jpg",
};

const TYN_CHURCH_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Church_of_Our_Lady_before_T%C3%BDn,_Prague.jpg?width=1200",
  alt: "旧市街広場にそびえるティーン聖母教会のゴシック様式双塔",
  credit: "LibertinaGrim / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Church_of_Our_Lady_before_T%C3%BDn,_Prague.jpg",
};

const MUNICIPAL_HOUSE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Prague_Municipal_House_01.jpg?width=1200",
  alt: "アールヌーヴォー建築の最高傑作 プラハ市民会館（Obecní dům）",
  credit: "Uoaei1 / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_Municipal_House_01.jpg",
};

const HUNGARIAN_PAPRIKA_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Paprika%2C_Hungary.jpg?width=1000",
  alt: "ハンガリーの赤いパプリカ",
  credit: "Civertan / Wikimedia Commons / CC BY-SA 2.5",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Paprika%2C_Hungary.jpg",
};

const VIENNA_SCHNITZEL_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wiener-Schnitzel02.jpg?width=1000",
  alt: "皿に盛られたウィーナー・シュニッツェル",
  credit: "Kobako / Wikimedia Commons / CC BY-SA 2.5",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wiener-Schnitzel02.jpg",
};

const SACHERTORTE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sachertorte_in_Vienna.jpg?width=1000",
  alt: "ウィーンのザッハトルテ",
  credit: "Rizka / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Sachertorte_in_Vienna.jpg",
};

const SVICKOVA_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sv%C3%AD%C4%8Dkov%C3%A1_na_smetan%C4%9B.JPG?width=1000",
  alt: "クネドリーキとクランベリーを添えたスヴィーチコヴァー",
  credit: "Matyáš Havel / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Sv%C3%AD%C4%8Dkov%C3%A1_na_smetan%C4%9B.JPG",
};

const CZECH_BEER_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Beer_is_served_at_Czech_Beer_Festival.jpg?width=1000",
  alt: "チェコのビール祭りで注がれるビール",
  credit: "Jiří Suchomel / Wikimedia Commons / CC BY-SA 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Beer_is_served_at_Czech_Beer_Festival.jpg",
};

const HUNGARIAN_GOULASH_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/020230805_125640_goulash_with_spaetzle.jpg?width=1000",
  alt: "グヤーシュとシュペッツレの料理",
  credit: "Silar / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:020230805_125640_goulash_with_spaetzle.jpg",
};

const HUNGARIAN_KREMES_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Kremes.jpg?width=1000",
  alt: "ハンガリーのクリーム菓子クレーメシュ",
  credit: "Illustratedjc / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Kremes.jpg",
};

const HUNGARIAN_CAFE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Caf%C3%A9_Frei.jpg?width=1000",
  alt: "ハンガリーのカフェ店内",
  credit: "Explicatory / Wikimedia Commons / CC0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Caf%C3%A9_Frei.jpg",
};

const VIENNA_TAFELSPITZ_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Heuriger_Zum_Renner_Tafelspitz_Apfelkren.jpg?width=1000",
  alt: "りんごホースラディッシュを添えたターフェルシュピッツ",
  credit: "Geolina163 / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Heuriger_Zum_Renner_Tafelspitz_Apfelkren.jpg",
};

const CZECH_GOULASH_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Gul%C3%A1%C5%A1%2C_bramborov%C3%BD_knedl%C3%ADk.jpg?width=1000",
  alt: "チェコ風グラーシュとじゃがいもクネドリーキ",
  credit: "Dezidor / Wikimedia Commons / CC BY 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Gul%C3%A1%C5%A1%2C_bramborov%C3%BD_knedl%C3%ADk.jpg",
};

const TRDELNIK_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Trdeln%C3%ADk_%28Svat%C3%A1_Anna%29_01.jpg?width=1000",
  alt: "焼き上がったチェコのトルデルニーク",
  credit: "Pohled 111 / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Trdeln%C3%ADk_%28Svat%C3%A1_Anna%29_01.jpg",
};

const COUNTRY_HISTORY = {
  hungary: {
    name: "ハンガリー",
    flag: "🇭🇺",
    summary: "カルパチア盆地に定住したマジャール人の王国を基礎に、オスマン帝国とハプスブルク家の時代を経て、ドナウ河畔の近代都市へ変化した国です。",
    focus: "ブダペストでは、王国の記憶・19世紀の近代化・20世紀の再建が、ドナウ川の両岸に重なって見えます。",
    diagram: {
      type: "timeline",
      title: "ハンガリーの景観をつくった5つの節目",
      items: [
        { marker: "9世紀末", label: "マジャール人の定住", text: "カルパチア盆地に定住し、現在の国の文化的基層となる。" },
        { marker: "1000年前後", label: "聖イシュトヴァーン", text: "キリスト教王国としてヨーロッパの政治秩序に入る。" },
        { marker: "15世紀", label: "マーチャーシュ王", text: "ブダ王宮がルネサンス文化の中心として栄える。" },
        { marker: "1867年", label: "二重帝国", text: "オーストリア＝ハンガリーとして大規模な都市整備が進む。" },
        { marker: "1989年", label: "民主化", text: "社会主義体制から現在の共和国へ移行する。" },
      ],
      caption: "ブダ城・国会議事堂・アンドラーシ通りを同じ日に見ると、王国から近代国家への変化をたどれます。",
    },
    sources: [
      { label: "UNESCO：ブダペストの世界遺産", href: "https://whc.unesco.org/en/list/400/" },
      { label: "ハンガリー政府観光局", href: "https://visithungary.com/" },
    ],
  },
  austria: {
    name: "オーストリア",
    flag: "🇦🇹",
    summary: "ドナウ流域の辺境領からバーベンベルク家、ハプスブルク家の中心地へ成長し、帝国の首都ウィーンに宮殿・教会・美術館が集まりました。",
    focus: "ウィーンでは、皇帝家の権力、音楽と芸術の後援、市民都市への変化が、建物の大きさと装飾に表れています。",
    diagram: {
      type: "timeline",
      title: "ウィーンが帝都になるまで",
      items: [
        { marker: "996年", label: "Ostarrichiの名", text: "現在のオーストリアにつながる地名が史料に現れる。" },
        { marker: "1270年代", label: "ハプスブルク家", text: "ウィーンを含むオーストリアの支配を固める。" },
        { marker: "18世紀", label: "宮廷文化の最盛期", text: "マリア・テレジアらが宮殿・庭園・音楽文化を発展させる。" },
        { marker: "1867年", label: "二重帝国", text: "リング通り沿いに市民都市の大建築が整備される。" },
        { marker: "1918年以降", label: "共和国の首都", text: "帝国の遺産を公共の美術館・図書館として引き継ぐ。" },
      ],
      caption: "宮殿だけでなく、図書館・美術館・市庁舎を続けて見ると、皇室の都市から市民の都市への変化が分かります。",
    },
    sources: [
      { label: "UNESCO：ウィーン歴史地区", href: "https://whc.unesco.org/en/list/1033/" },
      { label: "オーストリア政府観光局：歴史", href: "https://www.austria.info/ja/inspiration/austrias-history/" },
    ],
  },
  czechia: {
    name: "チェコ",
    flag: "🇨🇿",
    summary: "ボヘミア王国、神聖ローマ帝国、ハプスブルク帝国、チェコスロバキアを経て、1993年に現在のチェコ共和国となった中欧文化の交差点です。",
    focus: "プラハでは、カレル4世の中世都市計画、宗教改革、近代の市民文化が、橋・城・広場・音楽ホールに連続して残ります。",
    diagram: {
      type: "timeline",
      title: "プラハを読む3つの時代",
      items: [
        { marker: "9〜10世紀", label: "プラハ城の形成", text: "城と町がヴルタヴァ川沿いの政治中心になる。" },
        { marker: "14世紀", label: "カレル4世", text: "大学・新市街・橋を整備し、帝都として飛躍する。" },
        { marker: "15世紀", label: "宗教改革", text: "ヤン・フスの思想が広がり、旧市街の宗教史に刻まれる。" },
        { marker: "1918年", label: "チェコスロバキア", text: "市民会館などに新国家の文化的自信が表れる。" },
        { marker: "1989〜93年", label: "民主化と共和国", text: "ビロード革命を経て、現在のチェコ共和国へ。" },
      ],
      caption: "城から橋を渡って旧市街へ歩くルートそのものが、プラハの政治・宗教・市民文化の地図です。",
    },
    sources: [
      { label: "UNESCO：プラハ歴史地区", href: "https://whc.unesco.org/en/list/616/" },
      { label: "チェコ政府観光局", href: "https://www.visitczechia.com/ja-JP" },
    ],
  },
};

const DAY_HISTORY = {
  0: null,
  1: {
    country: COUNTRY_HISTORY.hungary,
    spots: [
      {
        name: "セーチェーニ鎖橋",
        era: "1849年開通・近代化の象徴",
        summary: "ブダとペストを初めて恒久的に結んだドナウ橋。橋ができる前は渡し船や冬の氷に頼っていたため、都市を一つにするインフラであると同時に、近代国家を目指す象徴でした。",
        people: "セーチェーニ伯爵が建設を推進し、英国人技師ウィリアム・ティアニー・クラークが設計しました。",
        see: "ライオン像、鎖を支える石塔、橋の中央から見るブダ城と国会議事堂。『橋が都市を一つにした』ことを意識して渡ります。",
        image: CHAIN_BRIDGE_IMAGE,
        diagram: {
          type: "relationship",
          title: "橋を中心に見るブダペスト",
          items: [
            { marker: "人物", label: "セーチェーニ", text: "近代化を構想" },
            { marker: "技術", label: "クラーク", text: "吊り橋を設計" },
            { marker: "建物", label: "鎖橋", text: "1849年に恒久橋" },
            { marker: "都市", label: "ブダ＋ペスト", text: "両岸の一体化" },
          ],
          caption: "橋そのものだけでなく、人物の構想と都市の変化までつながって見える場所です。",
        },
        sources: [
          { label: "UNESCO：ブダペスト", href: "https://whc.unesco.org/en/list/400/" },
        ],
      },
      {
        name: "ヴァールケルト・バザール",
        era: "19世紀後半・ネオルネサンス",
        summary: "王宮の丘のふもとに造られた庭園と回廊の複合建築。王宮へ向かう都市の玄関として設計され、戦後の荒廃を経て現代に修復されました。",
        people: "ハンガリーの代表的建築家ミクローシュ・イブルの設計です。",
        see: "庭園の軸線、ネオルネサンスのアーチ、ドナウ側のテラス。無料のエスカレーターで王宮の丘へ上る動線も建築の一部です。",
        image: VARKERT_BAZAR_IMAGE,
        sources: [
          { label: "ヴァールケルト・バザール公式", href: "https://varkertbazar.hu/" },
        ],
      },
      {
        name: "ブダ王宮",
        era: "13世紀の城塞から王宮へ",
        summary: "モンゴル襲来後に築かれた高台の城塞が、マーチャーシュ王のルネサンス宮廷、オスマン時代、ハプスブルク時代、第二次大戦後の再建を重ねた場所です。",
        people: "ベーラ4世が城塞都市を整備し、15世紀のマーチャーシュ1世が宮廷文化を大きく花開かせました。",
        see: "王宮の巨大なスケールと、対岸の国会議事堂・鎖橋を同じ視界に入れる展望テラス。建物の修復の違いも観察できます。",
        image: BUDA_CASTLE_IMAGE,
        sources: [
          { label: "UNESCO：ブダペスト", href: "https://whc.unesco.org/en/list/400/" },
          { label: "ブダ城地区公式", href: "https://budacastlebudapest.com/" },
        ],
      },
      {
        name: "マーチャーシュ教会",
        era: "中世創建・歴史的改修",
        summary: "王の戴冠式が行われた王宮地区の教会。オスマン時代にはモスクとして使われ、19世紀の修復で現在の鮮やかな屋根とゴシック・リバイバルの姿になりました。",
        people: "マーチャーシュ1世の時代に大きく拡張され、19世紀には建築家フリジェシュ・シュレクが修復を主導しました。",
        see: "ジョルナイ製の菱形屋根、内部の彩色文様、王宮地区で宗教施設の用途が変わった痕跡。",
        image: MATTHIAS_CHURCH_IMAGE,
        sources: [
          { label: "マーチャーシュ教会公式", href: "https://matyas-templom.hu/" },
        ],
      },
      {
        name: "漁夫の砦",
        era: "1895〜1902年・記念建築",
        summary: "中世の城壁を守った漁師組合の伝承にちなむ名称ですが、現在の白い回廊は建国千年祭の時代に造られた展望用のネオロマネスク建築です。",
        people: "マーチャーシュ教会も修復したフリジェシュ・シュレクの設計です。七つの塔はマジャール人七部族を象徴します。",
        see: "七つの尖塔、アーチ越しの国会議事堂、昼とライトアップ後の石の色の違い。砦というより『歴史を演出する展望台』として見ると分かりやすいです。",
        image: FISHERMANS_BASTION_IMAGE,
        sources: [
          { label: "漁夫の砦公式", href: "https://www.fishermansbastion.com/" },
        ],
      },
    ],
  },
  2: {
    country: COUNTRY_HISTORY.hungary,
    spots: [
      {
        name: "ハンガリー国会議事堂",
        era: "1885〜1904年・ネオゴシック",
        summary: "ハンガリー王国の議会政治と国家意識を示す、ドナウ河畔の巨大建築です。1896年の建国千年祭に合わせて一部が使われ始めました。",
        people: "設計者イムレ・シュテインドルは、ゴシックの外観にバロックやルネサンスの内部装飾を組み合わせました。",
        see: "高さ96mのドーム、尖塔の反復、対岸から見た左右対称の水面への反射。内部では聖イシュトヴァーンの王冠が国家の連続性を語ります。",
        image: PARLIAMENT_IMAGE,
        diagram: {
          type: "observation",
          title: "国会議事堂を外観から読む順番",
          items: [
            { marker: "1", label: "ドナウ河畔", text: "都市の正面として配置" },
            { marker: "2", label: "尖塔の群れ", text: "ゴシックの垂直性" },
            { marker: "3", label: "中央ドーム", text: "国家の中心を示す" },
            { marker: "4", label: "王冠の記憶", text: "王国と議会の継承" },
          ],
          caption: "まず遠景で全体の対称性を見てから、近づいて装飾と人像を探します。",
        },
        sources: [
          { label: "ハンガリー国会公式", href: "https://www.parlament.hu/en/web/house-of-the-national-assembly/" },
          { label: "UNESCO：ブダペスト", href: "https://whc.unesco.org/en/list/400/" },
        ],
      },
      {
        name: "旧郵便貯金局",
        era: "1900年・ハンガリーのアール・ヌーヴォー",
        summary: "国家の近代化を、銀行・郵便という新しい公共サービスの建物で表現した傑作です。自然や民俗文様を建築に取り込むハンガリー独自の装飾が見られます。",
        people: "建築家レフネル・エデンが設計し、ジョルナイ陶器を屋根や装飾に用いました。",
        see: "屋根のカラフルな陶板、蜂や植物のモチーフ、左右対称から少し外れる有機的な装飾。",
        image: POSTAL_SAVINGS_BANK_IMAGE,
        sources: [
          { label: "ハンガリー国立銀行（建物案内）", href: "https://www.mnb.hu/en" },
        ],
      },
      {
        name: "聖イシュトヴァーン大聖堂",
        era: "1851〜1905年・ネオルネサンス",
        summary: "ハンガリー初代国王イシュトヴァーン1世を記念するブダペスト最大級のカトリック教会。国家の守護聖人とされる王の右手の聖遺物を祀ります。",
        people: "ヨージェフ・ヒルド、ミクローシュ・イブル、ヨージェフ・カウザーが世代をまたいで完成させました。",
        see: "高さ96mのドーム、黄金色の天井、聖遺物礼拝堂。展望テラスから、王宮の丘とは違うペスト側の都市の広がりを見ます。",
        image: ST_STEPHEN_BASILICA_IMAGE,
        sources: [
          { label: "聖イシュトヴァーン大聖堂公式", href: "https://www.bazilika.biz/" },
        ],
      },
      {
        name: "アンドラーシ通り",
        era: "19世紀後半・都市計画",
        summary: "王宮都市から近代的な首都へ変わる時代に整備された大通り。貴族邸宅、歌劇場、地下鉄が一つの都市軸に並びます。",
        people: "首相アンドラーシ・ジュラの近代化政策にちなむ名前で、1896年には大陸ヨーロッパ初の地下鉄M1線も開通しました。",
        see: "建物の高さとファサードを見上げ、道路の地下に世界遺産の古い地下鉄が走る二層構造を意識します。",
        sources: [
          { label: "UNESCO：ブダペスト", href: "https://whc.unesco.org/en/list/400/" },
        ],
      },
      {
        name: "ハンガリー国立歌劇場",
        era: "1884年開場・ネオルネサンス",
        summary: "国民的な音楽文化を育てるために建てられた、王国時代の豪華な歌劇場です。外観だけでなく、客席の馬蹄形と金箔装飾に宮廷文化が表れます。",
        people: "ミクローシュ・イブルの設計。フランツ・ヨーゼフ皇帝とエリーザベト皇妃の後援も受けました。",
        see: "正面の音楽家像、大階段、天井画、客席の視線が舞台へ集まる構成。",
        image: OPERA_HOUSE_IMAGE,
        sources: [
          { label: "ハンガリー国立歌劇場公式", href: "https://www.opera.hu/" },
        ],
      },
      {
        name: "リスト・フェレンツ記念館",
        era: "19世紀末・作曲家の住居",
        summary: "フランツ・リストが晩年に暮らし、教えた旧音楽院の部屋。楽器・楽譜・家具から、超絶技巧の作曲家ではなく、教育者としての姿も想像できます。",
        people: "フランツ・リストはハンガリー出身の作曲家・ピアニストで、ブダペストの音楽教育の象徴的存在です。",
        see: "愛用したピアノ、直筆譜、書斎。建物の豪華さより、個人の生活空間に音楽史が残る点に注目します。",
        sources: [
          { label: "リスト・フェレンツ記念館公式", href: "https://lisztmuseum.hu/" },
        ],
      },
      {
        name: "英雄広場",
        era: "1896年・建国千年記念",
        summary: "マジャール人の定住から1000年を記念して造られた国家的な記念空間。中央の大天使ガブリエルと歴代の英雄像が、歴史を一枚の風景に編集しています。",
        people: "中央には七部族を率いたアールパード、列柱には王や独立運動の指導者が並びます。",
        see: "中央柱から左右へ広がる列柱、像の順序、背後の美術館との軸線。歴史が『選ばれた人物の一覧』として示される場所です。",
        image: HEROES_SQUARE_IMAGE,
        sources: [
          { label: "UNESCO：ブダペスト", href: "https://whc.unesco.org/en/list/400/" },
        ],
      },
      {
        name: "市民公園・ヴァイダフニャディ城",
        era: "1896〜1908年・歴史様式の展示",
        summary: "建国千年祭の仮設展示から発展した公園と城。ロマネスク、ゴシック、ルネサンス、バロックの建築要素を一つの散策路に集めています。",
        people: "設計者イグナーツ・アルパールは、ハンガリー各地の歴史建築を参照して『建築の歴史絵巻』を作りました。",
        see: "一つの城に異なる時代の塔や門が混在すること。実在の一城ではなく、国家の記憶を組み立てた建物です。",
        image: VAJDAHUNYAD_CASTLE_IMAGE,
        sources: [
          { label: "リゲット・ブダペスト公式", href: "https://ligetbudapest.hu/" },
        ],
      },
      {
        name: "国立民族博物館",
        era: "2022年開館・現代建築",
        summary: "歴史的建築ではありませんが、ハンガリーの民俗資料を現代の公共建築で見せる場所です。屋根の緑地と大きな曲線は、市民公園と展示をつなぎます。",
        people: "リゲット・ブダペスト再整備計画の一部として、収蔵品を新しい展示空間に移しました。",
        see: "屋上へ続く緩やかな線、公園側から見た建物の沈み込み、伝統資料と現代建築の対比。",
        sources: [
          { label: "国立民族博物館公式", href: "https://www.neprajz.hu/" },
        ],
      },
    ],
  },
  3: {
    country: COUNTRY_HISTORY.austria,
    spots: [
      {
        name: "シュテファン大聖堂",
        era: "12世紀創建・1359年以降のゴシック",
        summary: "ウィーン旧市街の中心に立つ大聖堂。都市の守護聖人を祀る教会が、ハプスブルク家の都の象徴へ成長しました。",
        people: "ハプスブルク家のルドルフ4世が大規模なゴシック化を進めました。",
        see: "モザイク屋根、南塔と北塔の高さの違い、内部の身廊。外から見た屋根の幾何学模様は都市のシンボルです。",
        image: ST_STEPHANS_VIENNA_IMAGE,
        sources: [
          { label: "シュテファン大聖堂公式", href: "https://www.stephanskirche.at/" },
          { label: "UNESCO：ウィーン歴史地区", href: "https://whc.unesco.org/en/list/1033/" },
        ],
      },
      {
        name: "グラーベンとペーター教会",
        era: "17〜18世紀・バロック都市",
        summary: "グラーベンは古い城壁跡の通りを市民の大通りへ変えた場所。中央のペスト記念柱と、近くのペーター教会が、疫病後の信仰と都市再生を伝えます。",
        people: "ペーター教会はルーカス・フォン・ヒルデブラントらのバロック建築家の仕事と結びつきます。",
        see: "通りの中央に立つ三位一体柱、教会内部の楕円ドーム、商業通りと宗教建築が隣り合う構成。",
        image: PETERSKIRCHE_IMAGE,
        sources: [
          { label: "ペーター教会公式", href: "https://www.peterskirche.at/" },
        ],
      },
      {
        name: "国立図書館プルンクザール",
        era: "1723〜1726年・バロック宮廷図書館",
        summary: "皇帝の私的な蔵書を見せるための宮廷図書館。長い楕円形のホールに古書、天井フレスコ、皇帝の権威を示す彫像がまとめられています。",
        people: "カール6世の命で建てられ、ヨハン・ベルンハルト・フィッシャー・フォン・エルラッハ一族の設計とダニエル・グランの天井画が空間を作りました。",
        see: "中央の楕円ドーム、天井画から壁面の書架へ視線を下ろすこと。『本を置く部屋』ではなく、知識を宮廷が所有する舞台です。",
        image: PRUNKSAAL_IMAGE,
        diagram: {
          type: "observation",
          title: "プルンクザールの視線の流れ",
          items: [
            { marker: "1", label: "天井画", text: "皇帝と知識の物語" },
            { marker: "2", label: "彫像", text: "知の守護者を配置" },
            { marker: "3", label: "書架", text: "約20万冊の蔵書" },
            { marker: "4", label: "中央像", text: "宮廷の中心軸" },
          ],
          caption: "入口から奥へ歩きながら、天井・彫像・本棚が一つの演出になっていることを見ます。",
        },
        sources: [
          { label: "オーストリア国立図書館公式", href: "https://www.onb.ac.at/en/museums/state-hall" },
        ],
      },
      {
        name: "市庁舎とクリスマスマーケット",
        era: "1872〜1883年・ネオゴシック",
        summary: "帝都の拡張にともなうリング通り沿いの市民建築。皇宮ではなく、市議会と市民のための巨大な公共建築です。広場の冬市はその前に人が集まる現代の都市文化です。",
        people: "建築家フリードリヒ・フォン・シュミットが設計しました。",
        see: "市庁舎塔、尖塔の反復、広場から見た建物の正面性。マーケットの光の向こうに、19世紀の市民自治の建物を重ねます。",
        image: RATHAUS_MARKET_IMAGE,
        sources: [
          { label: "ウィーン市庁舎公式", href: "https://www.wien.gv.at/english/cityhall.html" },
          { label: "ウィーン市庁舎前マーケット公式", href: "https://www.christkindlmarkt.at/en/" },
        ],
      },
    ],
  },
  4: {
    country: COUNTRY_HISTORY.austria,
    spots: [
      {
        name: "シェーンブルン宮殿・庭園・グロリエッテ",
        era: "17世紀の狩猟館から18世紀の夏宮へ",
        summary: "ハプスブルク家の夏の離宮。マリア・テレジアの治世に大宮殿と庭園が整えられ、皇室の暮らし・外交・祝祭を見せる舞台になりました。",
        people: "マリア・テレジア、建築家フィッシャー・フォン・エルラッハ、庭園設計者らが現在の景観を形作りました。",
        see: "宮殿から庭園の軸線を通してグロリエッテを見ること。内部の部屋は私生活、庭園は権力を遠くまで見せる舞台として対比します。",
        image: SCHONBRUNN_IMAGE,
        diagram: {
          type: "relationship",
          title: "宮殿の内側と外側",
          items: [
            { marker: "人物", label: "マリア・テレジア", text: "皇室の居住と統治" },
            { marker: "建築", label: "宮殿", text: "家族・外交の空間" },
            { marker: "景観", label: "庭園軸", text: "視線を丘へ導く" },
            { marker: "記念", label: "グロリエッテ", text: "権力を遠望させる" },
          ],
          caption: "部屋の豪華さだけでなく、窓から庭園と丘へ伸びる視線が宮殿の設計思想です。",
        },
        sources: [
          { label: "シェーンブルン宮殿公式", href: "https://www.schoenbrunn.at/en/" },
          { label: "UNESCO：シェーンブルン宮殿と庭園", href: "https://whc.unesco.org/en/list/786/" },
        ],
      },
      {
        name: "美術史美術館",
        era: "1891年開館・帝国コレクション",
        summary: "ハプスブルク家が何世代も集めた絵画・工芸・古代美術を、帝国の美術館として公開するために建てられました。",
        people: "建築家ゴットフリート・ゼンパーとカール・ハーゼナウアーが、向かいの自然史博物館と対になる壮大な建物を設計しました。",
        see: "大階段、八角形ドーム、壁画とコレクションの関係。ブリューゲルなどの絵画だけでなく、『帝国が世界を収集した建物』として鑑賞します。",
        image: KHM_CAFE_IMAGE,
        sources: [
          { label: "美術史美術館公式", href: "https://www.khm.at/en/" },
        ],
      },
      {
        name: "ベルヴェデーレ宮殿",
        era: "1714〜1723年・バロック宮殿",
        summary: "オスマン軍との戦いで名を上げたオイゲン公の夏の宮殿。下宮・庭園・上宮を一直線に配置し、軍人の邸宅を王宮に匹敵する景観へ仕立てました。",
        people: "オイゲン公、建築家ヨハン・ルーカス・フォン・ヒルデブラントが中心人物です。現在はクリムトの『接吻』でも知られます。",
        see: "上宮から下宮へ下がる庭園の段差、池に映るファサード、豪華な室内と近代絵画の対比。",
        image: BELVEDERE_PALACE_IMAGE,
        sources: [
          { label: "ベルヴェデーレ公式", href: "https://www.belvedere.at/en" },
        ],
      },
      {
        name: "シュピッテルベルク",
        era: "旧郊外の町並み・現代の市民文化",
        summary: "かつて城壁外の職人・居住地区だった一帯が、19世紀の小さな家並みを残しながら再生された地区です。宮殿とは違う、生活のスケールのウィーンを歩けます。",
        people: "特定の一人ではなく、職人や商人の町として形成された地区の歴史が主役です。",
        see: "石畳の細い路地、低いファサード、中庭、冬市の屋台。大通りの帝都建築と比べて、生活の密度を感じます。",
        sources: [
          { label: "シュピッテルベルク地区公式", href: "https://spittelberg.at/" },
        ],
      },
    ],
  },
  5: {
    country: COUNTRY_HISTORY.czechia,
    spots: [
      {
        name: "旧市街広場とティーン聖母教会",
        era: "12世紀の市場・14〜16世紀の教会",
        summary: "商人の市場として発展した広場に、ゴシック、バロック、ロココの建築が重なります。ティーン教会は旧市街の宗教的・商業的な中心を示す双塔です。",
        people: "ヤン・フスの宗教改革に共鳴したティーン教会は、プラハの宗教対立と市民の歴史を語ります。",
        see: "双塔のシルエット、広場を囲む異なる時代の建物、教会の正面が建物の間に少し隠れる中世的な都市構成。",
        image: TYN_CHURCH_IMAGE,
        sources: [
          { label: "プラハ市観光局：旧市街広場", href: "https://prague.eu/en/objevujte/old-town-square-staromestske-namesti/" },
          { label: "UNESCO：プラハ歴史地区", href: "https://whc.unesco.org/en/list/616/" },
        ],
      },
      {
        name: "旧市庁舎の天文時計",
        era: "1410年設置・中世の宇宙観",
        summary: "旧市庁舎に追加された天文時計は、時刻だけでなく太陽・月・星の動き、暦、宗教的な時間を一つの機械にまとめています。",
        people: "時計職人ミクラーシュ・カダーニュと天文学者ヤン・シンデルの名が伝わります。",
        see: "天文盤、暦盤、毎正時に動く使徒像、塔から見下ろす広場。人形の仕掛けだけでなく、当時の世界観を読む装置です。",
        image: ASTRONOMICAL_CLOCK_IMAGE,
        diagram: {
          type: "observation",
          title: "オルロイの4つの読み方",
          items: [
            { marker: "1", label: "時刻", text: "現在の時間を示す" },
            { marker: "2", label: "天文", text: "太陽・月の位置" },
            { marker: "3", label: "暦", text: "季節と祝祭日" },
            { marker: "4", label: "人形", text: "毎正時の寓意" },
          ],
          caption: "時計を『動く人形』だけで終わらせず、中世の宇宙模型として見ると面白さが増します。",
        },
        sources: [
          { label: "プラハ市観光局：旧市庁舎", href: "https://prague.eu/en/objevujte/old-town-hall-with-astronomical-clock-staromestska-radnice-s-orlojem/" },
        ],
      },
      {
        name: "カレル橋",
        era: "1357年着工・1402年頃完成",
        summary: "洪水で失われたユディト橋に代わり、帝都プラハの両岸を結ぶ橋として築かれました。橋上の彫像は17〜18世紀に加えられたバロックの屋外ギャラリーです。",
        people: "カレル4世が建設を命じ、ペトル・パルレーシュが設計に関わりました。聖ヤン・ネポムツキー像も重要な記憶の焦点です。",
        see: "橋塔、30体の聖人像、川上から見たプラハ城。像を順番に見ると、橋が単なる通路ではなく信仰の道だったことが分かります。",
        image: CHARLES_BRIDGE_IMAGE,
        sources: [
          { label: "プラハ市観光局：カレル橋", href: "https://prague.eu/en/objevujte/charles-bridge-karluv-most/" },
          { label: "UNESCO：プラハ歴史地区", href: "https://whc.unesco.org/en/list/616/" },
        ],
      },
      {
        name: "マラー・ストラナ、カンパ島、ジョン・レノンの壁",
        era: "中世の小地区と20世紀の記憶",
        summary: "カレル橋の西側に広がるマラー・ストラナは、王宮と橋を支えた町。カンパ島の水車や運河の景観に、1980年代から平和と自由の象徴となったレノンの壁が加わります。",
        people: "中世の職人・商人に加え、ジョン・レノンの言葉を借りた若者たちの表現が場所の記憶を更新しました。",
        see: "バロックの家並み、水路と水車、壁の上書きされるメッセージ。古い町並みと現代の市民表現が同居しています。",
        sources: [
          { label: "プラハ市観光局：マラー・ストラナ", href: "https://prague.eu/en/objevujte/mala-strana/" },
        ],
      },
    ],
  },
  6: {
    country: COUNTRY_HISTORY.czechia,
    spots: [
      {
        name: "ストラホフ修道院と図書館",
        era: "1143年創立・17〜18世紀の図書館",
        summary: "プレモントレ修道会の修道院。哲学の間と神学の間は、宗教施設が祈りだけでなく学問・写本・知識保存の場でもあったことを示します。",
        people: "修道士たちが蔵書を守り、18世紀の改修で現在のバロック図書館空間が整えられました。",
        see: "天井フレスコ、木製書架、地球儀と天球儀。写真を急いで撮るより、知識を分類するための空間として眺めます。",
        image: STRAHOV_LIBRARY_IMAGE,
        sources: [
          { label: "ストラホフ修道院公式", href: "https://www.strahovskyklaster.cz/en/" },
        ],
      },
      {
        name: "フラッチャニ広場とロレッタ教会",
        era: "17〜18世紀・巡礼と宮廷の丘",
        summary: "プラハ城の西側に広がる高台。ロレッタは聖母マリア信仰の巡礼地として整えられ、広場は貴族の宮殿と教会が並ぶ城下町になりました。",
        people: "チェコ・バロックの建築家クリストフ・ディーンツェンホーファーらの仕事と結びつきます。",
        see: "広場から旧市街を見下ろす眺望、宮殿の門、ロレッタの時計塔。城の正門だけでなく、城下の宗教都市を見ます。",
        sources: [
          { label: "プラハ・ロレッタ公式", href: "https://www.loreta.cz/en/" },
        ],
      },
      {
        name: "プラハ城と聖ヴィート大聖堂",
        era: "9世紀後半の城・1344年着工の大聖堂",
        summary: "王・皇帝・大統領の拠点が千年以上にわたって更新された城郭。聖ヴィート大聖堂は中世に着工し、1929年にようやく完成しました。",
        people: "カレル4世が大聖堂の建設を本格化し、マティアス・フォン・アラス、ペトル・パルレーシュらが設計を進めました。",
        see: "大聖堂のゴシックの垂直線、王の墓、ミュシャのステンドグラス、城門から旧市街へ下る地形。",
        image: ST_VITUS_CATHEDRAL_IMAGE,
        diagram: {
          type: "timeline",
          title: "プラハ城に重なる時間",
          items: [
            { marker: "9世紀", label: "城の始まり", text: "丘の上の政治・宗教中心" },
            { marker: "1344年", label: "大聖堂着工", text: "帝都にふさわしい教会へ" },
            { marker: "16世紀", label: "王宮の拡張", text: "ハプスブルクの宮廷" },
            { marker: "1929年", label: "大聖堂完成", text: "中世から近代へ継承" },
          ],
          caption: "一つの建物を一人の王の作品とせず、世代をまたいだ政治と信仰の積み重ねとして見ます。",
        },
        sources: [
          { label: "プラハ城公式", href: "https://www.hrad.cz/en" },
          { label: "UNESCO：プラハ歴史地区", href: "https://whc.unesco.org/en/list/616/" },
        ],
      },
      {
        name: "黄金の小路",
        era: "16世紀末の城壁沿い住居",
        summary: "城壁沿いの小さな家々は、城の職人や衛兵の住居として整えられました。錬金術師の伝説で有名ですが、現地では小さな生活空間と工房の歴史を見る場所です。",
        people: "22番の家はフランツ・カフカが一時期仕事場にしたことで知られます。",
        see: "家の小ささ、城壁との位置関係、職業ごとの展示。伝説だけでなく、城で働く人々の暮らしに目を向けます。",
        image: GOLDEN_LANE_IMAGE,
        sources: [
          { label: "プラハ城公式", href: "https://www.hrad.cz/en/prague-castle-for-visitors" },
        ],
      },
      {
        name: "市民会館と火薬塔",
        era: "15世紀の門と1905〜1912年の市民建築",
        summary: "王都の入口だったゴシックの火薬塔の隣に、チェコ市民文化の象徴であるアール・ヌーヴォーの市民会館が建ちます。中世の王権と近代国家の文化が隣り合う場所です。",
        people: "市民会館はアントニーン・バルシャーネクらが設計し、アルフォンス・ミュシャが市長の間を装飾しました。",
        see: "市民会館の曲線とモザイク、スメタナ・ホール、火薬塔の尖塔。装飾の新しさと門の古さを一枚の画面で比べます。",
        image: MUNICIPAL_HOUSE_IMAGE,
        sources: [
          { label: "プラハ市民会館公式", href: "https://www.obecnidum.cz/en/" },
        ],
      },
      {
        name: "ヴァーツラフ広場",
        era: "1348年の新市街・近現代の広場",
        summary: "カレル4世が造った新市街の馬市場を起源とし、現在はチェコの政治・市民運動の舞台です。1918年の独立、1968年の改革、1989年のビロード革命を想起させます。",
        people: "ボヘミア公ヴァーツラフの騎馬像が広場の名前と記憶の中心です。",
        see: "国立博物館へ伸びる長い軸、騎馬像、商業建築。王の名前を持つ場所が現代の市民広場になった変化を見ます。",
        sources: [
          { label: "プラハ市観光局：ヴァーツラフ広場", href: "https://prague.eu/en/objevujte/wenceslas-square-vaclavske-namesti/" },
        ],
      },
    ],
  },
  7: {
    country: COUNTRY_HISTORY.czechia,
    spots: [
      {
        name: "朝のカレル橋",
        era: "1357年着工・静けさの中で再訪",
        summary: "前日に見た橋を、朝の光と人の少ない時間にもう一度見ます。夜の観光名所ではなく、王都の東西を毎日つなぐ生活の道として感じられる時間帯です。",
        people: "カレル4世とペトル・パルレーシュの都市計画が、朝の散歩にも残っています。",
        see: "朝霧、橋塔の輪郭、聖人像の逆光、橋の先に見えるプラハ城。前日との光・人・音の違いを比べます。",
        image: CHARLES_BRIDGE_IMAGE,
        sources: [
          { label: "プラハ市観光局：カレル橋", href: "https://prague.eu/en/objevujte/charles-bridge-karluv-most/" },
        ],
      },
    ],
  },
  8: null,
};

const COUNTRY_LONG_HISTORY = {
  "ハンガリー": [
    "ハンガリーの歴史を理解する鍵は、カルパチア盆地という地理と、マジャール人の移動です。9世紀末に定住したマジャール人は、周囲のスラヴ人・ゲルマン人・ローマ系住民と接触しながら王国を形成しました。1000年前後にイシュトヴァーン1世がキリスト教の王として戴冠すると、部族連合は西ヨーロッパの政治秩序に組み込まれ、王国の行政・教会・法の基礎が整います。",
    "1241年のモンゴル襲来は、石造城塞と都市の整備を促しました。ブダの高台に王宮が築かれ、15世紀のマーチャーシュ1世の時代にはイタリアから人文主義とルネサンス文化が流入します。しかし1526年のモハーチの戦いで王国は大きく揺らぎ、1541年からブダはオスマン帝国の支配下に入りました。17世紀末の再征服後はハプスブルク家の影響が強まり、ブダ城地区には中世・オスマン・バロック・近代の層が重なります。",
    "19世紀後半には民族運動と近代化が同時に進み、1867年のアウスグライヒでオーストリア＝ハンガリー二重帝国が成立しました。1873年にはブダ、オーブダ、ペストが統合され、鎖橋、国会議事堂、アンドラーシ通り、地下鉄など、帝国の首都にふさわしい都市景観が計画されます。今日のブダペストは、王国の記憶を保存する街であると同時に、19世紀の国家建設を目に見える形で展示する都市でもあります。",
  ],
  "オーストリア": [
    "オーストリアの出発点は、ドナウ川沿いの辺境領です。996年の史料に現れるOstarrichiという地名は、現在の国名につながる古い呼称です。バーベンベルク家の時代にウィーンは東方交易と宮廷の拠点となり、13世紀後半からはハプスブルク家の支配が始まります。小さな辺境領が、婚姻・相続・戦争を通じて広大な王朝国家の中心へ変わっていく過程が、ウィーンの歴史の大きな軸です。",
    "ハプスブルク家のウィーンは、神聖ローマ帝国の皇帝宮廷として発展しました。オスマン帝国による1529年と1683年の包囲を乗り越えた後、18世紀には宮殿、修道院、教会、庭園がバロック様式で整備されます。マリア・テレジアとヨーゼフ2世の時代には行政・教育改革も行われ、シェーンブルンや国立図書館は、王朝の権威だけでなく国家を運営する知識と制度の舞台になりました。",
    "19世紀半ばに城壁が取り払われ、リング通り沿いに市庁舎、美術館、劇場、大学が並ぶ近代都市がつくられました。1867年の二重帝国成立後、ウィーンは多民族帝国の首都として音楽・美術・科学の人材を集めます。1918年の帝国崩壊後も、宮殿やコレクションは共和国の公共文化施設として受け継がれました。観光では、皇室の私的空間と市民の公共建築を見比べると、帝国から共和国への変化が読みやすくなります。",
  ],
  "チェコ": [
    "プラハの基層には、ヴルタヴァ川の渡河点と丘の上の城があります。9世紀後半からプラハ城が政治と宗教の中心となり、プシェミスル家のボヘミア公国・王国が成長しました。市場と職人町が川の両岸に広がり、城・橋・旧市街という現在の歩行ルートの原型が中世に形成されます。",
    "14世紀のカレル4世は、プラハを神聖ローマ帝国の首都として整備しました。1348年に大学と新市街を創設し、聖ヴィート大聖堂と新しい石橋の建設を進めます。橋、大学、王宮、教会を一つの都市計画で結びつけたため、プラハの景観にはカレル4世の政治的・宗教的な構想が今も残っています。",
    "15世紀にはヤン・フスの説教と宗教改革が都市を揺さぶり、ティーン教会や旧市街広場にもその記憶が刻まれました。1620年の白山の戦い以後、ボヘミアはハプスブルク君主国の一部となり、戦争と再カトリック化の後にバロック都市へ変化します。19世紀のチェコ民族復興、1918年のチェコスロバキア成立、1989年のビロード革命を経て、プラハは王都・帝都・市民国家の記憶を重ねる都市になりました。",
  ],
};

const SPOT_LONG_HISTORY = {
  "セーチェーニ鎖橋": [
    "19世紀前半、ドナウ川には季節によって通行できない渡し船や仮橋しかなく、ブダとペストは制度上も生活上も別の都市でした。改革派貴族セーチェーニ・イシュトヴァーンは、安定した橋が商業・行政・文化を結び、近代国家をつくると考えました。1839年に本格的な建設が始まり、1849年に開通します。",
    "設計者ウィリアム・ティアニー・クラークは英国の吊り橋技術をドナウ川の大規模な流れに適用しました。橋は単なる交通施設ではなく、封建的な身分差を越えて通行料を負担するという近代的な公共空間でもありました。第二次世界大戦末期にドイツ軍の撤退で破壊され、戦後に再建されたことも、ハンガリーの近代史を象徴しています。",
  ],
  "ヴァールケルト・バザール": [
    "王宮の丘は軍事・政治の高台でしたが、19世紀の都市計画ではドナウ河畔から王宮へ向かう美しい入口が必要になりました。ミクローシュ・イブルは、商業施設、回廊、庭園、階段を組み合わせ、斜面を都市の舞台へ変えました。名前の通り、当初は店舗や展示の機能を持つバザールでした。",
    "20世紀の戦争と社会主義時代の用途変更で建物は荒廃しましたが、21世紀の修復で庭園と回廊が再びつながりました。ここからエスカレーターで王宮へ上ると、都市計画が『美しい景観』と『高低差の解決』を同時に扱っていることが分かります。",
  ],
  "ブダ王宮": [
    "1241年のモンゴル襲来後、ベーラ4世は石造の城塞都市を各地に築きました。ブダの高台はドナウ川を見下ろし、守りやすく、交易路も押さえられる場所でした。14世紀以降に王宮が拡張され、マーチャーシュ1世の時代にはイタリアの芸術家や人文主義者が集まるルネサンス宮廷になります。",
    "1541年にオスマン軍がブダを占領すると、王宮は軍事施設とイスラム文化の空間へ変わりました。1686年の奪還戦で大きく破壊され、ハプスブルク家の時代にバロック王宮として再建されます。現在見える建物は一つの時代の完全な遺構ではなく、発掘・再建・博物館化を通じて過去を読み直してきた場所です。",
  ],
  "マーチャーシュ教会": [
    "王宮地区の教会は中世の王都における宗教と政治の接点でした。マーチャーシュ1世の結婚式や王の戴冠と結びつき、単なる教区教会を越えた王室礼拝堂の性格を持ちます。オスマン支配期には内部がモスクとして使われ、奪還後には再びカトリック教会へ戻りました。",
    "19世紀の修復では、中世の姿をそのまま保存するのではなく、建築家フリジェシュ・シュレクがゴシック・リバイバルとして統一的な外観を構成しました。ジョルナイ陶器の屋根は近代の技術でつくられた中世風の意匠です。屋根の鮮やかさと内部の彩色は、歴史が発掘されるだけでなく、時代ごとに再解釈されることを示します。",
  ],
  "漁夫の砦": [
    "現在の漁夫の砦は、軍事要塞というより、建国千年祭の時代に王宮地区の歴史を演出するためにつくられた展望建築です。名称はこの一帯の城壁を守った漁師組合の伝承に由来しますが、七つの塔や白い回廊は19世紀末の記念建築です。",
    "フリジェシュ・シュレクは、隣接するマーチャーシュ教会の修復と調和するように、ロマネスク風のアーチと塔を配置しました。ここから国会議事堂を眺めると、王宮の丘、鎖橋、近代国家の議会が一つの視線に入ります。歴史的事実と後世のロマン化が重なった、観光のための歴史景観です。",
  ],
  "ハンガリー国会議事堂": [
    "1867年のアウスグライヒ後、ハンガリーは帝国内でより大きな自治権を得ました。独自の議会を持つ近代国家であることを示すため、ドナウ河畔に大規模な国会議事堂を建てる計画が進みます。1885年に着工し、1896年の建国千年祭に一部が使われ、1904年に全体が完成しました。",
    "イムレ・シュテインドルは、英国国会議事堂にも通じるネオゴシックの外観に、バロック的な大階段やルネサンス的なドームを組み合わせました。高さ96mは、マジャール人の定住と千年祭を象徴する数字として意識されています。対岸から左右対称の姿を見ると、議会が王宮と向き合う新しい国家の中心として設計されたことが分かります。",
  ],
  "旧郵便貯金局": [
    "19世紀末のハンガリーでは、郵便・銀行・鉄道などの制度が急速に拡大し、近代国家の公共建築が必要になりました。旧郵便貯金局は、金融機関を単なる事務所ではなく、国民が新しい制度を信頼するための象徴としてつくられた建物です。",
    "レフネル・エデンは、フランス風のアール・ヌーヴォーをそのまま輸入せず、ハンガリーの民俗文様とジョルナイ陶器を組み合わせました。蜂、植物、鳥のような装飾は、自然と勤勉さを連想させます。外観を見上げると、国家の近代化と『ハンガリーらしさ』を同時に表現しようとした意図が読み取れます。",
  ],
  "聖イシュトヴァーン大聖堂": [
    "この大聖堂は、ハンガリー王国の守護聖人であるイシュトヴァーン1世を、近代国家の首都で記念するための建物でした。1851年に着工しましたが、設計者ヨージェフ・ヒルドの死やドームの構造上の問題で工事は難航し、1868年にはドームの一部が崩壊します。",
    "ミクローシュ・イブルが計画を立て直し、最終的にヨージェフ・カウザーが1905年に完成させました。三人の建築家の仕事が一つの建物に重なっている点は、歴史的な大聖堂が一代で完成するというイメージを修正してくれます。聖イシュトヴァーンの右手の聖遺物は、王権とカトリック信仰の連続性を示す中心的な記憶です。",
  ],
  "アンドラーシ通り": [
    "アンドラーシ通りは、旧市街と市民公園を結ぶ都市の大動脈として、1870年代に計画されました。貴族邸宅、文化施設、商店を並べることで、ペスト側に近代的な首都の軸線をつくり、地下には交通のための地下鉄を通しました。",
    "1896年に開業したM1線は、ロンドンに次ぐ初期の地下鉄で、建国千年祭に訪れる人々を市民公園へ運びました。地上の大通りが国家の威信を見せ、地下の鉄道が都市を実際に動かすという二重構造です。建物のファサードだけでなく、通りの幅と地下鉄の存在まで含めて観察します。",
  ],
  "ハンガリー国立歌劇場": [
    "19世紀後半、ブダペストはウィーンに対抗できる独自の音楽都市を目指していました。国立歌劇場は、王宮や議会とは別のかたちで、ハンガリー語のオペラと国民的な文化を育てるための舞台として1884年に開場します。",
    "ミクローシュ・イブルは、ネオルネサンスの外観、馬蹄形の客席、豪華な階段と天井画をまとめました。フランツ・ヨーゼフ皇帝の後援を受けながらも、内部にはハンガリーの音楽家や寓意像が配置されています。客席の構造を見ると、王侯の劇場であると同時に、多くの観客が同じ物語を共有する近代の公共空間だったことが分かります。",
  ],
  "リスト・フェレンツ記念館": [
    "フランツ・リストは、ハンガリーに生まれ、ウィーンやパリで名声を得て、ワイマール・ローマ・ブダペストを往復した国際的な音楽家でした。晩年は一つの都市に定住せず、ブダペストでは音楽院で教えながら、若いピアニストと作曲家を育てました。",
    "記念館の価値は、巨匠の演奏を想像することだけではありません。複数のピアノ、譜面、家具、書斎は、作曲・教育・社交が一つの住空間で行われていたことを伝えます。英雄広場や歌劇場で国家の音楽文化を見た後に訪れると、制度を支えた一人の人間の生活へ視点を移せます。",
  ],
  "英雄広場": [
    "英雄広場は、1896年の建国千年祭に合わせて、マジャール人の定住からの歴史を国家的な物語にまとめるために整備されました。中央の柱、七部族の指導者、歴代の王や政治家の像は、複雑な過去を『この国を導いた人物の列』として可視化しています。",
    "ただし、記念碑に選ばれた人物は、その時代の政治が選んだ歴史でもあります。像の配置や入れ替えには、王国、社会主義、共和国それぞれの価値観が反映されてきました。広場を歩くときは、誰が称えられているかだけでなく、誰が語られていないかにも目を向けると、記念碑の性格が分かります。",
  ],
  "市民公園・ヴァイダフニャディ城": [
    "ヴァイダフニャディ城は、建国千年祭の展示として木材や仮設素材でつくられた建物が出発点でした。好評だったため恒久建築として石造化され、トランシルヴァニアのフニャディ城を思わせる名前が残ります。建物全体は一つの時代の城ではなく、ハンガリー各地の建築史を抜き出したコラージュです。",
    "イグナーツ・アルパールは、ロマネスク、ゴシック、ルネサンス、バロックの要素を一つの散策路に配置しました。これは本物の遺跡を保存する方法とは異なり、国民が自国の歴史を見て学ぶための『建築の教科書』でした。異なる塔や門を見つけながら歩くと、建物が歴史を展示する媒体になっていることを実感できます。",
  ],
  "国立民族博物館": [
    "国立民族博物館の収集活動は19世紀に始まり、ハンガリー国内だけでなく、当時の帝国や世界各地の生活文化を記録してきました。展示品は王侯の美術品ではなく、衣服、道具、住居、祭礼など、名もない人々の生活を歴史として保存するものです。",
    "現在の建物は2022年に開館した現代建築で、リゲット・ブダペスト再整備の一部です。歴史地区の古建築を眺めた後にここへ来ると、過去を保存するだけでなく、過去をどのように展示し直すかという現代の文化政策まで見えてきます。",
  ],
  "シュテファン大聖堂": [
    "シュテファン大聖堂の起源は12世紀の教会にさかのぼります。ハプスブルク家のルドルフ4世は、ウィーンを公国の中心から王朝の都へ高めるため、教会を大規模なゴシック大聖堂へ改造しました。南塔は都市の目印となり、モザイク屋根は遠くからでもウィーンを識別できる象徴になりました。",
    "大聖堂は王朝の祝祭だけでなく、市民の日常、葬送、戦争の記憶を受け止めてきました。第二次世界大戦末期の火災で屋根や内部が損傷し、戦後に市民の寄付も受けて復旧されます。古い石材と新しい修復部分を見比べると、保存とは時間を止めることではなく、使い続けながら記憶をつなぐ行為だと分かります。",
  ],
  "グラーベンとペーター教会": [
    "グラーベンという名前は、ローマ時代の要塞都市ウィンドボナの防御溝に由来するとされます。中世には市場と交通の通りとなり、17世紀のペスト流行後には、都市を再生し神に感謝する記念柱が建てられました。通りの華やかさの背後には、疫病と人口減少の記憶があります。",
    "現在のペーター教会は18世紀初めに建てられたウィーン初期バロックの代表例です。外観は周囲の建物に埋もれるように見えますが、内部に入ると楕円形のドームと祭壇が視線を上へ引き上げます。都市の商業空間から宗教空間へ、短い距離で感覚が切り替わることがこの一帯の特徴です。",
  ],
  "国立図書館プルンクザール": [
    "プルンクザールは、一般の貸出図書館というより、皇帝が所有する知識を示す宮廷図書館として計画されました。カール6世の命で建設され、長いホールの中央に皇帝の像、両側に書架、天井に知識と平和を讃えるフレスコ画が置かれます。書物は実用品であると同時に、統治者の教養と権威を表す宝物でした。",
    "蔵書には神学、法律、地理、古典、科学に関する本が含まれ、ハプスブルク領域が集めた知識の広がりを示します。現代の国立図書館として公開されているため、かつて宮廷の内部に限られていた知識の空間を市民と旅行者が歩けます。写真では天井だけでなく、書架の反復がつくる奥行きにも注目します。",
  ],
  "市庁舎とクリスマスマーケット": [
    "1857年、皇帝フランツ・ヨーゼフはウィーンの城壁を取り払い、広い環状道路を整備する方針を示しました。リング通りには宮廷の建物だけでなく、議会、市庁舎、大学、劇場、美術館が並びます。市庁舎は1872年から1883年に建てられ、市民自治と都市行政を象徴するネオゴシック建築になりました。",
    "市庁舎前の冬市は、建物と同じ時代に始まった一つの行事ではなく、現代の都市文化として発展したものです。ライトアップと屋台のにぎわいの背後に、帝国が市民都市へ変わった19世紀の空間があります。塔やファサードを先に見てからマーケットを歩くと、華やかなイベントが建物の歴史を背景に持つことが分かります。",
  ],
  "シェーンブルン宮殿・庭園・グロリエッテ": [
    "シェーンブルンの土地は、もとは狩猟館や庭園として使われていました。オスマン軍による1683年のウィーン包囲後、ハプスブルク家は王朝の威信を示す離宮を必要とし、17世紀末から宮殿計画を進めます。マリア・テレジアの時代に居住空間、庭園、劇場、動物園が整えられ、皇室の家族生活と外交の舞台になりました。",
    "宮殿の窓から庭園の中央軸を通してグロリエッテを見る構成は、視線そのものを権力の道具にしています。丘の上の建物は軍事的な勝利を記念し、宮殿から見上げることで皇室の領域が遠くまで続くように感じさせます。モーツァルトが幼少期に演奏したという鏡の間の逸話も、宮殿が政治だけでなく音楽と祝祭の舞台だったことを伝えます。",
  ],
  "美術史美術館": [
    "美術史美術館は、ハプスブルク家が婚姻・外交・収集を通じて蓄積した絵画、彫刻、工芸、古代遺物を一つの制度にまとめるために建てられました。1891年の開館は、皇室の私的コレクションを国家的な文化資産として公開する転換点です。",
    "建物は自然史博物館と向かい合い、帝国が自然界と人間の文化を分類し所有するという19世紀の世界観を表します。大階段やドームの装飾は、作品を見る前から来館者に王朝の歴史を感じさせるよう設計されています。ブリューゲルの農民画などを鑑賞するときも、作品単体だけでなく、なぜそれがウィーンへ集められたのかを考えると見方が深まります。",
  ],
  "ベルヴェデーレ宮殿": [
    "ベルヴェデーレは、オスマン軍との戦いで名声を得たオイゲン公の夏の邸宅でした。下宮を住居、上宮を祝宴と迎賓の場とし、その間を庭園で結ぶ構成は、軍人の私邸を王宮に匹敵する政治的舞台へ変えています。建築家ヒルデブラントは、丘の高低差を利用して上宮の正面を都市から見上げられるようにしました。",
    "ハプスブルク家のコレクションを経て美術館となり、現在はクリムトの『接吻』をはじめとする近代美術の殿堂です。さらに1955年には上宮でオーストリア国家条約が調印され、第二次世界大戦後の主権回復を記念する場所にもなりました。バロックの権力、近代美術、戦後国家の再出発が同じ建物に重なっています。",
  ],
  "シュピッテルベルク": [
    "シュピッテルベルクは、かつて城壁の外側にあった小さな居住・職人地区です。帝都の大通りのような記念建築ではなく、細い路地、低い家、共同住宅の中庭が残り、ウィーンの人口増加と庶民の生活を想像できる場所です。",
    "19世紀の町並みは一度は古びた地区と見なされましたが、保存と再生によって現在のカフェ、工房、冬市のある地域へ変化しました。シェーンブルンやベルヴェデーレで王朝の空間を見た後に歩くと、帝国を支えた都市住民の生活のスケールを感じられます。",
  ],
  "旧市街広場とティーン聖母教会": [
    "旧市街広場は12世紀以来の市場で、遠方から来る商人、職人、宗教行列、政治集会が交差するプラハの公共空間でした。周囲にはロマネスク、ゴシック、ルネサンス、バロック、ロココの建物が並び、一つの様式で統一されていないことが長い都市史の証拠です。",
    "ティーン教会は商人地区の教区教会として発展し、15世紀の宗教改革ではフス派・ウトラキストの中心の一つになりました。広場の中心に立つヤン・フス像と教会の双塔を見ると、信仰が個人の内面だけでなく、都市の政治と共同体の帰属意識を形づくったことが分かります。",
  ],
  "旧市庁舎の天文時計": [
    "旧市庁舎は、複数の商人町を統合していく中世都市の行政拠点でした。1410年に設置されたオルロイは、時刻だけでなく太陽と月の位置、黄道十二宮、暦、宗教的な祝祭日を示します。時計は、都市の市民が空と季節を理解するための公共の知識装置でした。",
    "ミクラーシュ・カダーニュと天文学者ヤン・シンデルの関与は史料で確認されますが、時計職人を盲目にしたという『マスター・ハヌシュ』の物語は後世の伝説です。毎正時の使徒像や死の寓意は、時間が人間の富や美貌を等しく終わらせるという中世的な世界観を表します。動く仕掛けと、背後にある宇宙観を分けて見るのがポイントです。",
  ],
  "カレル橋": [
    "カレル橋の前身であるユディト橋は洪水で失われ、カレル4世の都市計画の中で新しい石橋が計画されました。1357年に着工し、ペトル・パルレーシュらが橋塔とアーチを整えます。橋は王宮、旧市街、帝国の西側を結ぶ『王の道』の一部で、戴冠式の行列が通る政治的な舞台でした。",
    "現在並ぶ30体の聖人像の多くは17〜18世紀に設置されたバロック期の作品で、橋が完成した当初から同じ姿だったわけではありません。聖ヤン・ネポムツキーはヴァーツラフ4世の時代に川へ投げ込まれた司祭として記憶され、像に触れる再訪祈願の習慣も後世に育ちました。橋は建築物であると同時に、宗教的な物語を歩いて読む屋外ギャラリーです。",
  ],
  "マラー・ストラナ、カンパ島、ジョン・レノンの壁": [
    "マラー・ストラナは1257年、王によってドイツ系の商人・職人を集める町として計画されました。1541年の大火の後には貴族や教会が土地を取得し、バロック宮殿と庭園の地区へ変わります。カンパ島は水路と水車に囲まれ、宮廷都市の華やかさを支える職人・商業の風景を残しています。",
    "ジョン・レノンの壁は、1980年のレノン暗殺後に若者が平和のメッセージや歌詞を描き始めた場所です。レノン本人がプラハを訪れた場所ではなく、彼の名前を自由と非暴力の象徴として借りたチェコの市民表現です。古い石壁に現代のメッセージが上書きされ続けることで、歴史が完成品ではなく更新されるものだと分かります。",
  ],
  "ストラホフ修道院と図書館": [
    "ストラホフ修道院は1143年、プレモントレ修道会の修道士を迎えて創設されました。修道院は祈りの場であると同時に、写本、教育、農園、醸造を担う知識と経済の拠点でした。図書館の神学の間は17世紀末、哲学の間は18世紀後半に整えられ、蔵書の増加に合わせて空間も変化しました。",
    "天井画は神学や哲学の知識を寓意的に描き、書架の分類と一体になっています。20世紀の共産主義政権下では修道院が接収され、宗教施設としての機能が制限されましたが、体制転換後に修道会へ返還されました。観光では美しい内装だけでなく、知識を守る制度が政治体制によって揺れたことも意識します。",
  ],
  "フラッチャニ広場とロレッタ教会": [
    "フラッチャニはプラハ城の西側に発展した城下町で、14世紀には独立した町として整えられました。広場の周囲には貴族の宮殿、修道院、教会が並び、城へ向かう人々を迎える儀礼的な前庭の役割を持ちます。高台から旧市街を見下ろす景観も、王宮都市の地形を理解する手がかりです。",
    "ロレッタは17世紀、三十年戦争後の再カトリック化と巡礼文化の中で整備されました。聖なる家の複製、回廊、宝物庫、鐘の音を組み合わせ、信仰を遠くから訪れる人にも体験させる装置です。プラハ城の王権と、ロレッタの巡礼・救済の空間を並べて見ると、丘全体が政治と宗教の複合都市だったことが分かります。",
  ],
  "プラハ城と聖ヴィート大聖堂": [
    "プラハ城は9世紀後半の要塞と教会から始まり、ボヘミア公、王、神聖ローマ皇帝、ハプスブルク君主、現在の大統領へと統治者が変わるたびに増改築されました。城は一つの建物ではなく、宮殿、教会、修道院、庭園、行政施設が集まった『都市の中の都市』です。",
    "聖ヴィート大聖堂は1344年、プラハ司教区が大司教区へ昇格した時に本格的な建設が始まりました。マティアス・フォン・アラスとペトル・パルレーシュが工事を進めましたが、宗教戦争や財政事情で中断し、最終的な完成は1929年です。ゴシックの柱、王の墓、近代のミュシャのステンドグラスが同居するのは、六百年を越える建設史そのものです。",
  ],
  "黄金の小路": [
    "黄金の小路は、16世紀末に城壁沿いへ建てられた小さな住居に由来します。城の衛兵や職人が暮らしたと考えられ、錬金術師が金をつくったという物語は、後世に広まった伝説です。実際の家の小ささは、王宮の華やかな儀礼を支えた人々の生活条件を想像させます。",
    "20世紀初頭には作家フランツ・カフカが22番の家を仕事場として使いました。カフカの滞在は短期間ですが、城壁の内側にある小さな部屋と、官僚制・父権・都市の不安を描いた文学との結びつきが、通りの現代的な印象を強めています。伝説と史実を分けながら歩くと、建物の魅力が増します。",
  ],
  "市民会館と火薬塔": [
    "市民会館の敷地には、かつてボヘミア王の宮廷施設がありました。1905〜1912年に建てられた新しい会館は、チェコ語とチェコ人の文化を公に示す市民の記念碑でした。アール・ヌーヴォーの装飾、スメタナ・ホール、カフェ、展示室を備え、政治・音楽・社交を一つの建物に集めています。",
    "1918年にはスメタナ・ホールでチェコスロバキア独立に関わる重要な政治行動が行われました。隣の火薬塔は15世紀に建てられ、戴冠式の行列が通る王の道の入口でした。中世の王権を示す塔と、近代の市民国家を示す会館が接しているため、プラハの政体の変化を短い距離で読めます。",
  ],
  "ヴァーツラフ広場": [
    "ヴァーツラフ広場は、カレル4世が1348年に造った新市街の馬市場を起源とします。19世紀に聖ヴァーツラフの名を冠した大通りへ変わり、商店、ホテル、劇場、駅を結ぶ近代都市の中心になりました。長い形は、広場というより行進・集会・交通のための都市軸です。",
    "ここでは1918年の独立、1968年のプラハの春とソ連軍侵攻への抗議、1989年のビロード革命など、チェコ近現代史の節目が記憶されています。国立博物館と騎馬像を結ぶ視線は、王の記憶と市民の政治を重ねます。夜に歩くときも、単なる繁華街ではなく、言葉を発するための公共空間として眺めます。",
  ],
  "朝のカレル橋": [
    "昼と夜の橋が観光の舞台になるのに対し、早朝の橋は、王の道が本来持っていた『川を渡って仕事や礼拝へ向かう道』という性格に近づきます。石の欄干、橋塔、聖人像は、観光客の列がなくても、都市の東西を結ぶ構造として残っています。",
    "前日に見た像や城の輪郭を朝の斜光で見直すと、彫像の表情、橋の勾配、川霧の向こうの丘が変わって見えます。歴史を知ることは、説明を増やすだけでなく、同じ場所を別の時間に見たときに比較できる視点を持つことでもあります。",
  ],
};

const SPOT_KEY_FACTS = {
  "セーチェーニ鎖橋": [
    "1849年開通。ブダとペストを結んだ最初の恒久的なドナウ橋。",
    "セーチェーニ伯爵が構想を進め、英国人技師ウィリアム・ティアニー・クラークが設計。",
    "第二次世界大戦末期に破壊され、戦後に再建された。現在の橋は近代化と復興の両方を記憶する。",
  ],
  "ヴァールケルト・バザール": [
    "19世紀後半、王宮の丘へ向かうドナウ河畔の玄関として整備された。",
    "ミクローシュ・イブルが庭園、回廊、店舗、階段を一つの景観として設計。",
    "戦争と用途変更で荒廃した後、21世紀の修復で再び王宮と河畔をつなぐ場所になった。",
  ],
  "ブダ王宮": [
    "1241年のモンゴル襲来後、ベーラ4世が高台の城塞都市を整備したことが出発点。",
    "マーチャーシュ1世の時代にルネサンス文化の宮廷となり、イタリアの芸術家や人文主義者が集まった。",
    "オスマン支配、ハプスブルク再建、第二次大戦後の復旧という複数の層が重なる。",
  ],
  "マーチャーシュ教会": [
    "王の結婚や戴冠式と結びついた、王宮地区の宗教と政治の中心。",
    "オスマン時代にはモスクとして使われ、奪還後にカトリック教会へ戻った。",
    "19世紀のフリジェシュ・シュレクの修復で、現在の彩色とジョルナイ製屋根が整えられた。",
  ],
  "漁夫の砦": [
    "1895〜1902年の建国千年祭期に造られた展望建築で、軍事要塞そのものではない。",
    "七つの塔はマジャール人七部族を象徴し、マーチャーシュ教会と調和するよう設計された。",
    "国会議事堂とドナウを一望することで、王宮の丘と近代国家の議会を同じ景色に収められる。",
  ],
  "ハンガリー国会議事堂": [
    "1885年着工、1896年の建国千年祭に一部使用、1904年に完成。",
    "イムレ・シュテインドルがネオゴシックの外観とバロック的な内部を組み合わせた。",
    "高さ96mはマジャール人の定住年と千年祭を意識した数字で、王冠は国家の連続性を示す。",
  ],
  "旧郵便貯金局": [
    "19世紀末の郵便・金融制度の拡大を象徴する公共建築。",
    "レフネル・エデンが民俗文様とジョルナイ陶器を使い、ハンガリー独自のアール・ヌーヴォーを表現した。",
    "蜂や植物の装飾は、自然・勤勉・豊かさを建物の外観に重ねている。",
  ],
  "聖イシュトヴァーン大聖堂": [
    "1851年着工、ドーム崩壊と設計変更を経て1905年完成。",
    "ヒルド、イブル、カウザーの三世代の建築家が完成まで関わった。",
    "初代国王の右手の聖遺物を祀り、王権とカトリック信仰の記憶を現代へ伝える。",
  ],
  "アンドラーシ通り": [
    "1870年代に旧市街と市民公園を結ぶ近代首都の軸として建設された。",
    "1896年開業のM1線は大陸ヨーロッパ初期の地下鉄で、地上の大通りと一体の都市計画だった。",
    "貴族邸宅、歌劇場、地下鉄が、王国の近代化を一つの断面に見せる。",
  ],
  "ハンガリー国立歌劇場": [
    "1884年開場。ハンガリー語の音楽文化を育て、ウィーンに対抗する首都の象徴とされた。",
    "ミクローシュ・イブルが馬蹄形の客席、大階段、金箔や天井画を設計。",
    "王室の後援を受けながら、ハンガリーの作曲家と観客が共有する公共の劇場でもあった。",
  ],
  "リスト・フェレンツ記念館": [
    "フランツ・リストが晩年に暮らし、ブダペスト音楽院で若い音楽家を教えた住居。",
    "リストはワイマール、ローマ、ブダペストを行き来する国際的な音楽家だった。",
    "ピアノ、譜面、家具、書斎から、作曲家を『名曲』だけでなく教育者と生活者として見られる。",
  ],
  "英雄広場": [
    "1896年の建国千年祭に合わせ、マジャール人の定住からの歴史を記念碑に編集した。",
    "中央のアールパード像と列柱の王・指導者像が、国家の物語を人物の一覧として示す。",
    "像の選び方や配置は時代の政治を反映するため、称えられた人物だけでなく語られない人々にも目を向ける。",
  ],
  "市民公園・ヴァイダフニャディ城": [
    "建国千年祭の仮設展示から発展し、1900年代初頭に恒久建築となった。",
    "イグナーツ・アルパールがロマネスク、ゴシック、ルネサンス、バロックを一つの城に組み合わせた。",
    "実在の一城ではなく、ハンガリーの建築史を歩いて学ぶ『建築の教科書』である。",
  ],
  "国立民族博物館": [
    "19世紀から集められた衣服、道具、住居、祭礼など、名もない人々の生活を歴史として保存する。",
    "2022年の新館はリゲット・ブダペスト再整備の一部で、屋上緑地と展示空間を結ぶ。",
    "古建築を保存するだけでなく、現代の博物館が過去をどう見せるかを考える場所。",
  ],
  "シュテファン大聖堂": [
    "12世紀の教会をもとに、ルドルフ4世が王朝の都にふさわしいゴシック大聖堂へ拡張した。",
    "南塔、モザイク屋根、カタコンベが、ウィーンの宗教・市民生活・都市景観をつなぐ。",
    "第二次大戦末期の火災後に市民も復旧を支え、使い続けることで記憶を継承している。",
  ],
  "グラーベンとペーター教会": [
    "グラーベンはローマ時代の防御溝を起源とする通りで、後に市場と商業の道になった。",
    "ペスト後の三位一体柱は、人口を失った都市の再生と信仰を記念する。",
    "ペーター教会の楕円ドームは、商業通りからバロックの宗教空間へ視線を切り替える。",
  ],
  "国立図書館プルンクザール": [
    "カール6世の宮廷図書館として1723〜1726年に建設された。",
    "約20万冊の蔵書、中央ドーム、ダニエル・グランの天井画が知識を皇帝の権威として演出する。",
    "かつて宮廷に限られた知識の空間が、現在は公共の博物館として開かれている。",
  ],
  "市庁舎とクリスマスマーケット": [
    "1872〜1883年、城壁跡のリング通り沿いに市民自治の建物として建設された。",
    "フリードリヒ・フォン・シュミットのネオゴシック建築は、皇宮とは異なる公共の威信を示す。",
    "冬市は現代の行事だが、広場の大きさと建物の正面性は19世紀の市民都市計画を受け継ぐ。",
  ],
  "シェーンブルン宮殿・庭園・グロリエッテ": [
    "狩猟館から発展し、マリア・テレジアの時代に皇室の夏宮と外交の舞台になった。",
    "宮殿、庭園、丘のグロリエッテが一直線に配置され、遠くまで届く視線そのものが権力を表す。",
    "モーツァルトの演奏伝承、動物園、劇場など、王朝の生活と祝祭を支える複合施設だった。",
  ],
  "美術史美術館": [
    "1891年、ハプスブルク家が何世代も集めたコレクションを帝国の美術館として公開した。",
    "ゼンパーとハーゼナウアーが自然史博物館と対になる建物を設計した。",
    "作品だけでなく、何を収集し、誰に見せるかという帝国の知識政策まで建築に表れている。",
  ],
  "ベルヴェデーレ宮殿": [
    "オイゲン公の夏宮として1714〜1723年に下宮・上宮・庭園が整えられた。",
    "ヒルデブラントは丘の高低差を使い、軍人の邸宅を王宮に匹敵する迎賓空間へ変えた。",
    "1955年の国家条約調印の舞台でもあり、バロックの権力と戦後オーストリアの主権回復が重なる。",
  ],
  "シュピッテルベルク": [
    "城壁外の職人・居住地区として形成され、低い家と細い路地に生活のスケールを残す。",
    "帝都の大通りとは異なり、職人、商人、家族の暮らしがウィーンを支えた場所。",
    "保存と再生によってカフェや冬市が生まれ、古い町並みが現代の市民文化へつながった。",
  ],
  "旧市街広場とティーン聖母教会": [
    "12世紀以来の市場で、商人、職人、宗教行列、政治集会が交差したプラハの公共空間。",
    "ティーン教会は15世紀のフス派・ウトラキストの中心の一つで、宗教と都市政治の結節点だった。",
    "広場のロマネスク、ゴシック、バロック、ロココは、町が一度に完成しなかった証拠。",
  ],
  "旧市庁舎の天文時計": [
    "1410年のオルロイは、時刻、太陽と月、黄道、暦、宗教的祝祭を一つの機械で示した。",
    "時計職人ミクラーシュ・カダーニュと天文学者ヤン・シンデルの関与は史料で確認される。",
    "マスター・ハヌシュが盲目にされた話は伝説で、毎正時の人形は中世の死生観を表す。",
  ],
  "カレル橋": [
    "洪水で失われたユディト橋に代わり、1357年に着工された王の道の中心。",
    "カレル4世とペトル・パルレーシュの都市計画が、王宮・旧市街・帝国西部を結んだ。",
    "現在の30体の聖人像は主に17〜18世紀のバロック作品で、橋の完成後に加えられた。",
  ],
  "マラー・ストラナ、カンパ島、ジョン・レノンの壁": [
    "1257年に王が計画した町で、1541年の大火後に貴族宮殿とバロック教会が増えた。",
    "カンパ島の水路や水車は、王宮都市を支えた職人・商業の風景を伝える。",
    "レノンの壁は本人が訪れた場所ではなく、1980年代の若者が自由と平和の象徴として名前を借りた市民表現。",
  ],
  "ストラホフ修道院と図書館": [
    "1143年創立のプレモントレ修道会の拠点で、祈り、写本、教育、農園、醸造を担った。",
    "神学の間と哲学の間は17〜18世紀に整えられ、天井画と分類された書架が知識の体系を示す。",
    "共産主義政権下の接収を経て返還され、知識と信仰の場所が政治体制で揺れることも伝える。",
  ],
  "フラッチャニ広場とロレッタ教会": [
    "プラハ城西側の城下町で、宮殿、修道院、巡礼地が王宮への前庭を形づくった。",
    "ロレッタは三十年戦争後の再カトリック化と巡礼文化の中で17世紀に整備された。",
    "広場から旧市街を見下ろす景観は、城が町を支配する地形と宗教的な巡礼路を同時に示す。",
  ],
  "プラハ城と聖ヴィート大聖堂": [
    "9世紀後半の要塞・教会から始まり、王、皇帝、大統領の拠点として増改築された『都市の中の都市』。",
    "聖ヴィート大聖堂は1344年に着工し、マティアス・フォン・アラス、ペトル・パルレーシュらが工事を進めた。",
    "中断を挟んで1929年に完成し、ゴシックの柱、王の墓、ミュシャの近代ステンドグラスが同居する。",
  ],
  "黄金の小路": [
    "16世紀末、城壁沿いに城の衛兵や職人の小さな住居が建てられた。",
    "錬金術師の街という話は後世の伝説で、実際には王宮を支えた人々の生活空間だった。",
    "22番の家で仕事をしたフランツ・カフカの文学的記憶が、城壁の小さな家々に現代的な意味を加えた。",
  ],
  "市民会館と火薬塔": [
    "火薬塔は1475年の王の道の門、市民会館は1905〜1912年のチェコ市民文化の記念碑。",
    "アルフォンス・ミュシャらの装飾とスメタナ・ホールは、チェコ語・音楽・芸術を国家の核にした。",
    "1918年の独立と関係する市民会館の隣に、王の戴冠行列が通った火薬塔が立つ。",
  ],
  "ヴァーツラフ広場": [
    "1348年、カレル4世が造った新市街の馬市場が起源で、19世紀に聖ヴァーツラフの名を冠した。",
    "1918年の独立、1968年のプラハの春、1989年のビロード革命を記憶する市民の広場。",
    "国立博物館と騎馬像へ伸びる軸は、王の記憶と近代の政治運動を一つの景観に重ねる。",
  ],
  "朝のカレル橋": [
    "昼の観光名所ではなく、王の道が本来持っていた生活・仕事・礼拝のための通路として見直せる時間帯。",
    "朝霧と斜光は聖人像、橋塔、プラハ城の輪郭を変え、前日の夜景と異なる歴史の表情をつくる。",
    "同じ場所を時刻を変えて見ることは、歴史を知識だけでなく比較の体験にする方法。",
  ],
};

const CITY_FOOD_HISTORY = {
  "ハンガリー": {
    city: {
      title: "ブダペストという町",
      summary: "ブダペストは、ドナウ川西岸の丘の町ブダ、東岸の平地に広がるペスト、北の古都オーブダが1873年に統合されて生まれた都市です。",
      detail: [
        "ブダ側の丘には王宮と城塞が置かれ、川を見下ろす政治・軍事の中心になりました。一方、ペスト側は平らで道を広げやすく、商業、議会、駅、劇場が集まる近代都市へ成長します。オーブダにはローマ帝国の都市アクインクムの記憶が残り、三つの地区は異なる時代の都市像を持っています。",
        "1873年の統合後、橋と大通りが両岸を一体化し、鎖橋、アンドラーシ通り、国会議事堂、地下鉄が近代国家の首都を形づくりました。観光では、ブダの高低差、ペストの広い道路、ドナウの水運を意識すると、同じ都市の中に異なる町が共存していることが見えてきます。",
      ],
      image: CHAIN_BRIDGE_IMAGE,
      diagram: {
        type: "relationship",
        title: "ドナウ川が分け、橋が結んだ都市",
        items: [
          { marker: "丘", label: "ブダ", text: "王宮と城塞" },
          { marker: "橋", label: "鎖橋", text: "両岸を恒久的に接続" },
          { marker: "平地", label: "ペスト", text: "商業と議会" },
          { marker: "1873", label: "ブダペスト", text: "三都市の統合" },
        ],
        caption: "ドナウ川を境界として眺め、橋を都市統合の装置として見直します。",
      },
      districts: [
        { name: "ブダ", role: "王宮と丘の町", story: "城塞・王宮・教会が集まり、地形そのものが防御と権力を支えた地区。" },
        { name: "ペスト", role: "商業と議会の平地", story: "国会議事堂、歌劇場、カフェ、駅が並び、19世紀の近代化を担った地区。" },
        { name: "オーブダ", role: "ローマ都市の記憶", story: "古代アクインクムから続く、ブダペストのさらに古い層を示す地区。" },
      ],
      sources: [
        { label: "Budapestinfo公式", href: "https://www.budapestinfo.hu/" },
        { label: "UNESCO：ブダペスト", href: "https://whc.unesco.org/en/list/400/" },
      ],
    },
    foodDiagram: {
      type: "timeline",
      title: "ハンガリーの食卓に重なる4つの層",
      items: [
        { marker: "農村", label: "牧童の鍋", text: "グヤーシュの出発点" },
        { marker: "近世", label: "パプリカ", text: "新大陸・オスマン経由" },
        { marker: "帝国", label: "菓子とカフェ", text: "都市の社交文化" },
        { marker: "現在", label: "市場と屋台", text: "伝統の再編集" },
      ],
      caption: "料理は国境を越えて伝わり、都市で新しい意味を与えられます。",
    },
    foods: [
      {
        icon: "🍲",
        name: "グヤーシュ（gulyás）",
        summary: "もとは牧童の野外料理だった煮込み・スープが、都市のレストランで国民的な料理として定着しました。",
        image: HUNGARIAN_GOULASH_IMAGE,
        detail: "ハンガリー語のgulyásは牛飼いを意味し、肉と玉ねぎを大鍋で煮る素朴な料理が出発点です。パプリカが広く使われるようになったのは近世以降で、オスマン帝国との接触、農村の食材、19世紀の国民文化づくりが重なって現在の味になりました。日本で想像する濃いシチューだけでなく、汁の多い料理も本来の姿です。",
        onTrip: "アンドラーシ通り周辺のランチで、パンやクネーデルと一緒に味わうと、歩くための食事という性格が分かります。",
      },
      {
        icon: "🌶",
        name: "パプリカとハンガリー料理",
        summary: "パプリカは単なる辛味ではなく、赤い色と香りで家庭料理と国民的な食卓をつなぐ食材です。",
        image: HUNGARIAN_PAPRIKA_IMAGE,
        detail: "原産地はアメリカ大陸ですが、ヨーロッパへ伝わった後にバルカンやオスマン圏を経てハンガリーに根付きました。辛味を抑えた品種も育てられ、グヤーシュ、パプリカーシュ、ソーセージなどに広く使われます。19世紀の民族文化の形成とともに、パプリカは『ハンガリーらしさ』を示す色と香りになりました。",
        onTrip: "市場や土産店で粉末の色と辛さを比べると、同じパプリカでも料理の役割が違うことを感じられます。",
      },
      {
        icon: "🍰",
        name: "クレーメシュとキュルテーシュ・カラーチ",
        summary: "王宮の丘の菓子店や街の屋台には、宮廷菓子と庶民の祝祭菓子という二つの食文化があります。",
        image: HUNGARIAN_KREMES_IMAGE,
        detail: "ルスヴルムのクレーメシュのようなカスタード菓子は、ハプスブルク時代の菓子職人と都市のカフェ文化の中で洗練されました。一方、円筒形の生地を焼いて砂糖やシナモンをまとわせるキュルテーシュ・カラーチは、屋外の祭りや市場で親しまれてきた菓子です。店内の銀器と屋台の炭火は対照的ですが、どちらも人が集まる都市の甘味です。",
        onTrip: "王宮地区ではルスヴルムのケーキ、マーケットでは焼きたての香りを探すと、階級と場の違いを食べ比べできます。",
      },
      {
        icon: "☕",
        name: "カフェとトカイワイン",
        summary: "コーヒー店とワインは、王宮・商業都市・知識人の社交を支えたブダペストの飲み物文化です。",
        image: HUNGARIAN_CAFE_IMAGE,
        detail: "オスマン支配期以降のコーヒー文化と、ハプスブルク時代の都市カフェが混ざり、新聞を読み、議論し、芸術家が集まる店が発展しました。北東部のトカイ地方の甘口ワインは王侯にも献上された名産で、ハンガリーの食卓が農村・宮廷・国際交易をつないでいたことを示します。",
        onTrip: "カフェでは飲み物だけでなく、席に長く滞在すること自体が文化だと意識して休憩します。",
      },
    ],
  },
  "オーストリア": {
    city: {
      title: "ウィーンという町",
      summary: "ウィーンはローマ軍営ウィンドボナ、バーベンベルク家の都、ハプスブルク帝国の宮廷、共和国の首都という役割を重ねてきました。",
      detail: [
        "旧市街のインネレ・シュタットには、城壁に囲まれた中世都市と王宮の機能が凝縮されています。19世紀に城壁が撤去されてリング通りが整備されると、市庁舎、議会、大学、美術館、劇場が並び、宮廷だけでなく市民社会のための都市が生まれました。",
        "シェーンブルンは皇室の夏宮、ベルヴェデーレは貴族の邸宅、シュピッテルベルクは職人と住民の町です。これらを同じ日に見ると、ウィーンが一つの均質な『宮殿都市』ではなく、身分・職業・行政の空間が積み重なった大都市であることが分かります。",
      ],
      image: ST_STEPHANS_VIENNA_IMAGE,
      diagram: {
        type: "timeline",
        title: "ローマ軍営から市民都市へ",
        items: [
          { marker: "古代", label: "ウィンドボナ", text: "ドナウ国境の軍営" },
          { marker: "中世", label: "旧市街", text: "教会と王宮の都" },
          { marker: "19世紀", label: "リング通り", text: "城壁跡の公共建築" },
          { marker: "現在", label: "共和国", text: "宮廷遺産を共有" },
        ],
        caption: "中心部の建物を、帝国の私的空間から市民の公共空間へ続く流れで見ます。",
      },
      districts: [
        { name: "インネレ・シュタット", role: "中世都市と宮廷", story: "シュテファン大聖堂、王宮、図書館が集まる旧市街の核。" },
        { name: "リング通り", role: "市民都市の大通り", story: "城壁跡に議会・市庁舎・美術館・劇場を並べた19世紀の都市計画。" },
        { name: "シェーンブルン・ノイバウ", role: "離宮と生活の町", story: "皇室の夏宮と、職人・商人の生活地区が現在のウィーンを支える。" },
      ],
      sources: [
        { label: "WienTourismus公式", href: "https://www.wien.info/ja" },
        { label: "UNESCO：ウィーン歴史地区", href: "https://whc.unesco.org/en/list/1033/" },
      ],
    },
    foodDiagram: {
      type: "relationship",
      title: "ウィーンの食文化を支えた場所",
      items: [
        { marker: "宮廷", label: "料理人", text: "肉料理と菓子" },
        { marker: "カフェ", label: "知識人", text: "新聞と会話" },
        { marker: "ガストハウス", label: "市民", text: "日常の食卓" },
        { marker: "市場", label: "観光客", text: "伝統の体験" },
      ],
      caption: "料理の由来だけでなく、誰がどこで食べたかを考えるとウィーンの食文化が立体的になります。",
    },
    foods: [
      {
        icon: "🍽",
        name: "ヴィーナー・シュニッツェル",
        summary: "仔牛を薄く叩いて衣をつけて揚げる料理で、宮廷料理と市民のレストラン文化をつなぐウィーン料理の代表です。",
        image: VIENNA_SCHNITZEL_IMAGE,
        detail: "似たカツレツは中欧や北イタリアにもあり、起源を一人の人物や一つの国に決めることはできません。ウィーンでは19世紀に仔牛料理として形式が整い、パン粉の衣をふくらませて揚げる技法とともに名物化しました。薄さ、肉の種類、揚げ油、レモンの添え方までが料理の作法です。",
        onTrip: "Meissl & Schadnでは、肉を叩く工程と衣が膨らむ様子を料理の歴史として観察できます。",
      },
      {
        icon: "🥩",
        name: "ターフェルシュピッツ",
        summary: "牛肉をブイヨンで煮る宮廷料理で、肉だけでなくスープ、骨髄、ソースを順番に味わいます。",
        image: VIENNA_TAFELSPITZ_IMAGE,
        detail: "ターフェルシュピッツは、皇帝フランツ・ヨーゼフ1世が好んだ料理として知られます。煮込み料理は高価な肉を柔らかくし、スープまで無駄なく使う家庭料理の知恵でもありました。宮廷の食卓で洗練された後、ガストハウスへ広がり、現在は『皇帝の料理』と『市民の鍋料理』の両方の顔を持っています。",
        onTrip: "Plachuttaなどで食べる場合は、最初のスープから肉、骨髄トースト、ソースまで順番を楽しみます。",
      },
      {
        icon: "☕",
        name: "ウィーンのコーヒーハウス",
        summary: "カフェは飲み物を買ってすぐ出る場所ではなく、新聞、音楽、文学、政治を語る市民の第二の居間でした。",
        image: KHM_CAFE_IMAGE,
        detail: "1683年のコーヒー豆にまつわる起源譚は伝説を含みますが、18〜19世紀にコーヒーハウスが都市生活へ深く根付いたことは確かです。メランジェ、新聞、水、席に長く座る習慣は、帝都に集まった知識人や芸術家の交流を支えました。カフェの内装も、社交のための舞台装置です。",
        onTrip: "Gerstnerやカフェで、注文した飲み物を急いで飲み切らず、空間と滞在時間を含めて体験します。",
      },
      {
        icon: "🍫",
        name: "ザッハトルテとアプフェルシュトゥルーデル",
        summary: "チョコレート菓子とりんご菓子は、帝国の交易・菓子職人・カフェ文化が家庭と観光へ広がった例です。",
        image: SACHERTORTE_IMAGE,
        detail: "ザッハトルテは1832年、宮廷の宴席で若いフランツ・ザッハがつくったと伝えられ、後にホテル・ザッハーとデメルの販売権をめぐる争いで名を高めました。アプフェルシュトゥーデルは薄い生地で果物を包む菓子で、ハプスブルク領域の食文化交流を感じさせます。どちらも菓子そのものと、食べる場所の格式が一体です。",
        onTrip: "ザッハトルテは甘さをコーヒーで受け、マーケットでは温かいプンシュや焼き菓子と季節の関係を見ます。",
      },
    ],
  },
  "チェコ": {
    city: {
      title: "プラハという町",
      summary: "プラハは旧市街、新市街、マラー・ストラナ、フラッチャニ、プラハ城がヴルタヴァ川と橋で結ばれた、複数の町の集合体です。",
      detail: [
        "旧市街は12世紀以来の商人と職人の市場町、新市街は1348年にカレル4世が計画した広い都市、マラー・ストラナは城下の職人町と貴族の町、フラッチャニは城の西側の宮殿・巡礼地区でした。それぞれの地区が異なる制度と住民を持っていたため、同じプラハでも道幅、建物の高さ、広場の使い方が変わります。",
        "カレル橋はそれらを結ぶ王の道であり、川を越える交通路、戴冠式の行列、聖人像の屋外ギャラリーを兼ねました。旧市街広場から橋を渡り、マラー・ストラナを上って城へ向かうルートは、単なる観光コースではなく、中世の権力と商業の構造を歩いて追体験する道です。",
      ],
      image: PRAGUE_OLD_TOWN_IMAGE,
      diagram: {
        type: "relationship",
        title: "川と丘に沿って育ったプラハ",
        items: [
          { marker: "丘", label: "城とフラッチャニ", text: "王権と巡礼" },
          { marker: "橋", label: "カレル橋", text: "王の道" },
          { marker: "岸", label: "旧市街", text: "市場と商人" },
          { marker: "南", label: "新市街", text: "計画都市と市民" },
        ],
        caption: "高台の城、川、商業の広場を一本の歩行ルートとして読みます。",
      },
      districts: [
        { name: "旧市街（Staré Město）", role: "市場と商人の町", story: "旧市街広場、天文時計、ティーン教会が集まる都市の商業中心。" },
        { name: "新市街（Nové Město）", role: "カレル4世の都市計画", story: "ヴァーツラフ広場を中心に、広い市場と近代の市民運動が重なる地区。" },
        { name: "マラー・ストラナとフラッチャニ", role: "城下と宮殿の丘", story: "バロック宮殿、巡礼地、職人町がプラハ城へ続く斜面を形づくる。" },
      ],
      sources: [
        { label: "Prague City Tourism公式", href: "https://prague.eu/en/" },
        { label: "UNESCO：プラハ歴史地区", href: "https://whc.unesco.org/en/list/616/" },
      ],
    },
    foodDiagram: {
      type: "timeline",
      title: "プラハの食卓ができるまで",
      items: [
        { marker: "修道院", label: "醸造と保存", text: "ビール・パン・発酵" },
        { marker: "市場", label: "肉と穀物", text: "煮込みと団子" },
        { marker: "ビアホール", label: "町の社交", text: "料理と樽生" },
        { marker: "カフェ", label: "近代都市", text: "菓子と会話" },
      ],
      caption: "プラハの料理は、修道院・市場・宿屋・カフェという町の場所と一緒に発達しました。",
    },
    foods: [
      {
        icon: "🍺",
        name: "チェコのビール文化",
        summary: "ビールは飲み物であるだけでなく、食事、会話、町の社交を組み立てる日常の文化です。",
        image: CZECH_BEER_IMAGE,
        detail: "チェコでは修道院や町の醸造所が中世からビールをつくり、19世紀にはピルゼンで下面発酵の淡色ビールが広まりました。プラハのビアホールでは、銘柄、注ぎ方、泡の量、料理との組み合わせまでが習慣になっています。ビールをワインのような特別な飲み物としてではなく、スープや肉料理と一緒に日常的に味わう点が特徴です。",
        onTrip: "U PinkasůやLokálでは、料理とビールを別々に考えず、パン・ソース・苦味の組み合わせを見ます。",
      },
      {
        icon: "🥩",
        name: "スヴィーチコヴァーとクネドリーキ",
        summary: "牛肉を根菜のクリームソースで煮込み、蒸しパンのようなクネドリーキを添えるチェコの家庭料理です。",
        image: SVICKOVA_IMAGE,
        detail: "スヴィーチコヴァーは、肉を焼き付けてから根菜とともに煮込み、裏ごししたソースにクリームを加える料理です。甘酸っぱいクランベリーや生クリームが添えられ、塩味・酸味・甘味が一皿にまとまります。クネドリーキはソースを受け止めるための主食で、パンやじゃがいもの種類によって食感が変わります。",
        onTrip: "U Pinkasůで料理が出たら、肉だけでなくソースをクネドリーキに含ませて、食卓の構造ごと味わいます。",
      },
      {
        icon: "🍖",
        name: "グラーシュ、鴨料理、豚肉料理",
        summary: "煮込み、ロースト、ザワークラウトは、ボヘミアの寒い季節とビールに合う食事として発展しました。",
        image: CZECH_GOULASH_IMAGE,
        detail: "グラーシュはハンガリー語圏と中欧全体に広がった料理で、チェコでは牛肉や豚肉を煮込み、クネドリーキと合わせます。鴨のローストや豚肉料理にはキャベツ、パン、芥子などが添えられ、保存しやすい穀物・肉・発酵食品の組み合わせが見えます。宮廷料理よりも、宿屋と家庭の鍋から発展した味に近いのが魅力です。",
        onTrip: "Café Imperialや市民会館のレストランでは、豪華な内装と、もとは日常食だった料理の対比を意識します。",
      },
      {
        icon: "🥨",
        name: "菓子、コラーチ、トルデルニーク",
        summary: "チェコの菓子には、家庭で焼く発酵菓子と観光地の屋台菓子という二つの層があります。",
        image: TRDELNIK_IMAGE,
        detail: "コラーチは果物やチーズをのせた丸い発酵菓子で、祭礼や家庭の焼き菓子として中欧に広く見られます。トルデルニークは筒状の生地を焼いて砂糖やナッツをまぶす菓子で、現在のプラハ観光地で目立ちますが、チェコ全土の古い国民菓子と単純に言い切ることはできません。伝統と観光向けの新しい名物を区別して味わうのがポイントです。",
        onTrip: "カフェ・ルーヴルや市場では、座って食べる菓子と歩きながら食べる菓子の場の違いも楽しみます。",
      },
    ],
  },
};

const CITY_STORY = {
  "ハンガリー": {
    history: [
      {
        era: "古代〜9世紀",
        title: "ドナウ川の境界に町が生まれる",
        summary: "ブダペストの始まりは、一つの首都ではなく、川と丘を利用する複数の集落でした。",
        detail: [
          "ローマ帝国はドナウ川を北方の国境線とし、現在のオーブダ付近にアクインクムという軍事・商業都市を築きました。川は人や物を運ぶ道である一方、帝国の外側を意識させる境界でもありました。ローマの道路、水道、浴場の記憶は、現在の都市の地下や博物館に残っています。",
          "その後、さまざまな民族の移動を経て、マジャール人がカルパチア盆地に定住します。ブダ側の丘は守りやすく、ペスト側の平地は市場を開きやすいという地形の違いが、後の二つの町の性格を決めました。",
        ],
        image: CHAIN_BRIDGE_IMAGE,
        links: [
          { label: "ブダ王宮", href: "https://budacastlebudapest.com/" },
          { label: "ブダペスト世界遺産", href: "https://whc.unesco.org/en/list/400/" },
        ],
        diagram: {
          type: "relationship",
          title: "地形がつくった都市の役割",
          items: [
            { marker: "丘", label: "ブダ", text: "防御と王宮" },
            { marker: "川", label: "ドナウ", text: "交通と境界" },
            { marker: "平地", label: "ペスト", text: "市場と商業" },
          ],
          caption: "同じ都市でも、地形が違えば暮らしと権力の置かれ方が変わります。",
        },
      },
      {
        era: "1000年前後〜15世紀",
        title: "キリスト教王国と王宮文化",
        summary: "聖イシュトヴァーン1世の王国づくりと、マーチャーシュ1世のルネサンス宮廷が、ハンガリーの歴史の二つの柱です。",
        detail: [
          "イシュトヴァーン1世は、部族連合を西ヨーロッパの王国に近い制度へまとめ、司教区、郡、法律、王冠を整えました。キリスト教化は信仰の変更だけでなく、文字による行政と国際的な外交関係を導入する国家建設でした。聖イシュトヴァーンの右手が現在も聖遺物として祀られるのは、王と国家の記憶が結びついているためです。",
          "15世紀のマーチャーシュ1世は、王宮にイタリアの人文主義やルネサンス美術を取り入れました。王宮、教会、図書館は、軍事拠点だった丘を知識と芸術の中心へ変えます。ブダ城地区を歩くときは、城壁だけでなく、王がどのような文化を集めたかを想像します。",
        ],
        image: MATTHIAS_CHURCH_IMAGE,
        links: [
          { label: "マーチャーシュ教会", href: "https://matyas-templom.hu/" },
          { label: "聖イシュトヴァーン大聖堂", href: "https://www.bazilika.biz/" },
        ],
        diagram: {
          type: "timeline",
          title: "王国を支えた二つの転換",
          items: [
            { marker: "1000年頃", label: "聖イシュトヴァーン", text: "キリスト教王国" },
            { marker: "中世", label: "王宮と教会", text: "制度と信仰" },
            { marker: "15世紀", label: "マーチャーシュ", text: "ルネサンス宮廷" },
          ],
          caption: "宗教による国家形成と、王宮による文化形成を分けて考えます。",
        },
      },
      {
        era: "1526〜18世紀",
        title: "オスマン帝国とハプスブルク家の境界",
        summary: "ブダペストの建物が何度も姿を変えた理由は、ハンガリーが帝国同士の境界に置かれていたからです。",
        detail: [
          "1526年のモハーチの戦いで中世ハンガリー王国は大きく揺らぎ、1541年にはブダがオスマン帝国の支配下に入りました。王宮はイスラム帝国の軍事拠点として使われ、浴場や市場など、オスマンの都市文化も加わります。現在の温泉文化や食材の一部を考えるとき、この時代を単なる『占領』で終わらせないことが大切です。",
          "1686年のブダ奪還戦で城地区は大きく破壊され、その後ハプスブルク家の支配下で再建されます。現在のバロック的な王宮と、地下に残る中世・オスマンの層が同居するのは、都市が壊れては建て直されてきた結果です。",
        ],
        image: BUDA_CASTLE_IMAGE,
        links: [
          { label: "ブダ王宮", href: "https://budacastlebudapest.com/" },
          { label: "ヴァールケルト・バザール", href: "https://varkertbazar.hu/" },
          { label: "漁夫の砦", href: "https://www.fishermansbastion.com/" },
        ],
      },
      {
        era: "19世紀後半〜現在",
        title: "三つの町がブダペストになる",
        summary: "1873年の統合と近代化によって、王宮の町、商業都市、帝国の首都が一つの都市景観にまとめられました。",
        detail: [
          "1867年のアウスグライヒでハンガリーの自治が広がると、首都を近代化する大規模な都市計画が進みます。1873年にブダ、ペスト、オーブダが統合され、鎖橋や新しい橋、アンドラーシ通り、国会議事堂、歌劇場、地下鉄が相互に結びつきました。建物は観光名所であると同時に、新しい国家が自分の力を示すためのメッセージでした。",
          "国会議事堂がドナウ河畔に置かれ、王宮と向き合う構図は、王朝の丘と議会国家の平地を一つの景色にしています。英雄広場や市民公園では、歴史を記念碑として編集する19世紀の考え方も見ることができます。",
        ],
        image: PARLIAMENT_IMAGE,
        links: [
          { label: "セーチェーニ鎖橋", href: "https://maps.google.com/?q=Sz%C3%A9chenyi+L%C3%A1nch%C3%ADd" },
          { label: "ハンガリー国会議事堂", href: "https://www.parlament.hu/en/web/house-of-the-national-assembly/" },
          { label: "ハンガリー国立歌劇場", href: "https://www.opera.hu/" },
          { label: "英雄広場", href: "https://maps.google.com/?q=H%C5%91s%C3%B6k+tere+Budapest" },
        ],
        diagram: {
          type: "relationship",
          title: "近代首都を構成した施設",
          items: [
            { marker: "接続", label: "鎖橋", text: "両岸を結ぶ" },
            { marker: "政治", label: "国会議事堂", text: "自治と議会" },
            { marker: "文化", label: "歌劇場", text: "国民文化" },
            { marker: "記憶", label: "英雄広場", text: "千年の物語" },
          ],
          caption: "観光地を別々に見るのではなく、国家が都市へ置いた役割としてつなげます。",
        },
      },
    ],
    food: [
      {
        era: "農村の食卓",
        title: "牧童の鍋からグヤーシュへ",
        summary: "グヤーシュは、牛飼いの野外料理が都市のレストランで国民料理になった例です。",
        detail: [
          "ハンガリー語のgulyásは牛飼いを意味します。肉、玉ねぎ、野菜を大鍋で煮る料理は、保存しやすい材料を使い、長時間の移動や仕事の合間に食べられるものでした。都市に入ると、汁の多いスープから濃い煮込みまで、店ごとの形に分かれていきます。",
          "食べるときは『ハンガリー料理だから辛い』と決めつけず、パプリカの香り、肉の煮込み方、パンや付け合わせとの関係に注目します。農村の鍋が国家の食文化として語られるようになった背景には、19世紀の民族文化づくりもあります。",
        ],
        image: HUNGARIAN_GOULASH_IMAGE,
        links: [
          { label: "アンドラーシ通り周辺", href: "https://maps.google.com/?q=Andr%C3%A1ssy+%C3%BAt+Budapest" },
        ],
      },
      {
        era: "近世〜近代",
        title: "パプリカが国民料理をつくる",
        summary: "新大陸由来の植物が、オスマン圏との交流を経てハンガリー料理の象徴になりました。",
        detail: [
          "パプリカはもともとアメリカ大陸の植物で、ヨーロッパへ伝わった後、バルカンやオスマン圏を通ってハンガリーに定着しました。辛味の強い品種だけでなく、甘く赤い品種も育てられ、料理に色と香りを加えます。",
          "グヤーシュ、パプリカーシュ、ソーセージなどで使われるパプリカは、単なる調味料ではなく、農業、交易、家庭料理、国民意識をつなぐ食材です。市場で粉の色を比べることも、歴史を味覚へ近づける方法です。",
        ],
        image: HUNGARIAN_PAPRIKA_IMAGE,
        links: [
          { label: "市民公園・ヴァイダフニャディ城", href: "https://ligetbudapest.hu/" },
        ],
      },
      {
        era: "帝国都市の菓子文化",
        title: "クレーメシュと屋台菓子",
        summary: "王宮の菓子店とマーケットの焼き菓子は、同じ都市にある異なる食の場を見せてくれます。",
        detail: [
          "ルスヴルムのクレーメシュのようなカスタード菓子は、ハプスブルク時代の菓子職人と都市のカフェで洗練されました。薄い生地、クリーム、砂糖を重ねる菓子は、材料の豊かさだけでなく、店内で座って味わう時間も商品にしています。",
          "一方、円筒形の生地を焼くキュルテーシュ・カラーチは、屋外の祭りや市場で香りを広げます。銀器の店と炭火の屋台を比べると、宮廷文化と庶民の祝祭が別の形で甘味を育てたことが分かります。",
        ],
        image: HUNGARIAN_KREMES_IMAGE,
        links: [
          { label: "ルスヴルム・ツクラースダ", href: "http://www.ruszwurm.hu/" },
          { label: "ブダ城地区", href: "https://budacastlebudapest.com/" },
        ],
      },
      {
        era: "社交と交易",
        title: "カフェ、ワイン、長居する文化",
        summary: "食事だけでなく、飲み物を片手に話し続ける時間も、都市の食文化です。",
        detail: [
          "オスマン支配期以降のコーヒー文化と、ハプスブルク時代の都市カフェが重なり、新聞を読む人、芸術家、政治を議論する人が店に集まりました。カフェは食堂というより、仕事場、情報交換の場、社交の部屋でした。",
          "トカイ地方の甘口ワインは王侯にも献上され、ブダペストの食卓を農村の生産地や国際交易と結びます。カフェで席に長く座り、ワインや菓子の背景を話すこと自体が、町の歴史を体験する行為になります。",
        ],
        image: HUNGARIAN_CAFE_IMAGE,
        links: [
          { label: "ルスヴルム・ツクラースダ", href: "http://www.ruszwurm.hu/" },
          { label: "ブダペスト観光公式", href: "https://www.budapestinfo.hu/" },
        ],
      },
    ],
  },
  "オーストリア": {
    history: [
      {
        era: "古代〜中世",
        title: "ウィンドボナから中世都市へ",
        summary: "ローマ帝国の国境軍営、バーベンベルク家の都、教会都市という層が、現在の旧市街の下に重なっています。",
        detail: [
          "ローマ軍営ウィンドボナはドナウ川の北方国境を守る拠点でした。軍人、商人、職人が集まり、道と河川交通が都市の基盤になります。帝国が去った後も、川と道の位置は変わらず、ウィーンは東西を結ぶ場所として再び重要になります。",
          "中世にはバーベンベルク家が宮廷を置き、シュテファン大聖堂を中心に城壁都市が発展します。旧市街を歩くとき、ローマ軍営、中世の教会、後世の王宮が同じ地面に積み重なっていることを意識します。",
        ],
        image: ST_STEPHANS_VIENNA_IMAGE,
        links: [
          { label: "シュテファン大聖堂", href: "https://www.stephanskirche.at/" },
          { label: "ウィーン歴史地区", href: "https://whc.unesco.org/en/list/1033/" },
        ],
      },
      {
        era: "13〜18世紀",
        title: "ハプスブルク家と宮廷都市",
        summary: "ウィーンは王朝の住居から、広大な帝国を運営する政治・文化の中心へ変わりました。",
        detail: [
          "ハプスブルク家は婚姻、相続、戦争を通じて領域を広げ、ウィーンに行政官、外交官、軍人、芸術家を集めました。オスマン帝国の包囲を経験した後、宮殿、教会、庭園はバロック様式で整えられ、王朝の秩序と勝利を目に見える形にします。",
          "シェーンブルンは家族生活と外交、ベルヴェデーレは貴族の祝宴、国立図書館は知識の所有を示す空間でした。建物の豪華さは、単なる趣味ではなく、帝国を治める力を演出する道具でした。",
        ],
        image: SCHONBRUNN_IMAGE,
        links: [
          { label: "シェーンブルン宮殿", href: "https://www.schoenbrunn.at/en/" },
          { label: "ベルヴェデーレ", href: "https://www.belvedere.at/en" },
          { label: "国立図書館プルンクザール", href: "https://www.onb.ac.at/en/museums/state-hall" },
        ],
        diagram: {
          type: "relationship",
          title: "宮廷が支えた都市の機能",
          items: [
            { marker: "居住", label: "シェーンブルン", text: "家族と外交" },
            { marker: "祝宴", label: "ベルヴェデーレ", text: "貴族の社交" },
            { marker: "知識", label: "プルンクザール", text: "宮廷の蔵書" },
          ],
          caption: "宮殿を『豪華な建物』で終わらせず、帝国運営の機能として見ます。",
        },
      },
      {
        era: "19世紀",
        title: "城壁を取り払い、市民都市をつくる",
        summary: "リング通り沿いの公共建築は、皇帝の都が市民社会の首都へ変わったことを表します。",
        detail: [
          "1857年以降、城壁の撤去とリング通りの整備が進みました。議会、市庁舎、大学、美術館、劇場が並ぶ新しい都市軸は、王宮の内部だけでなく、市民が利用する制度と文化を可視化します。",
          "市庁舎前のマーケットを歩くときは、屋台の光だけでなく、ネオゴシックの塔と広場の大きさを見ます。冬の行事が開かれる場所そのものが、19世紀に設計された公共空間なのです。",
        ],
        image: RATHAUS_MARKET_IMAGE,
        links: [
          { label: "ウィーン市庁舎", href: "https://www.wien.gv.at/english/cityhall.html" },
          { label: "市庁舎前マーケット", href: "https://www.christkindlmarkt.at/en/" },
          { label: "美術史美術館", href: "https://www.khm.at/en/" },
        ],
      },
      {
        era: "1918年〜現在",
        title: "帝国の遺産を共和国が使い続ける",
        summary: "帝国が崩壊した後も、宮殿・美術館・カフェは公共文化として新しい意味を持ちました。",
        detail: [
          "第一次世界大戦後、ハプスブルク帝国は解体され、ウィーンは共和国の首都になります。王朝の宮殿やコレクションをすべて捨てるのではなく、美術館、図書館、観光施設として市民に開くことで、過去を現在の文化資産へ置き換えました。",
          "ベルヴェデーレで1955年の国家条約を思い出し、カフェや美術館で近代の芸術を見ると、ウィーンは『昔の帝都』ではなく、帝国の記憶を再利用している現代都市だと分かります。",
        ],
        image: BELVEDERE_PALACE_IMAGE,
        links: [
          { label: "ベルヴェデーレ", href: "https://www.belvedere.at/en" },
          { label: "ウィーン観光公式", href: "https://www.wien.info/ja" },
        ],
      },
    ],
    food: [
      {
        era: "宮廷と市民の鍋",
        title: "シュニッツェルとターフェルシュピッツ",
        summary: "ウィーン料理は、宮廷の技法と市民のガストハウスが出会って成立しました。",
        detail: [
          "ヴィーナー・シュニッツェルは、薄く叩いた仔牛に衣をつけて揚げる料理です。似たカツレツは中欧や北イタリアにもあるため、起源を一国に決めることはできませんが、ウィーンで肉の種類や揚げ方が料理の作法として整えられました。",
          "ターフェルシュピッツは牛肉をブイヨンで煮、スープ、肉、骨髄、ソースを順に味わいます。皇帝フランツ・ヨーゼフ1世の好物として宮廷の印象が強い一方、鍋を無駄なく使う家庭料理の知恵も残っています。",
        ],
        image: VIENNA_TAFELSPITZ_IMAGE,
        links: [
          { label: "Meissl & Schadn", href: "https://meisslundschadn.at/en/meissl-schadn-vienna/" },
          { label: "Plachutta", href: "https://www.plachutta.at/en/" },
        ],
      },
      {
        era: "18〜19世紀",
        title: "コーヒーハウスは都市の第二の居間",
        summary: "コーヒーハウスは、飲み物を飲むだけでなく、新聞、音楽、文学、政治を語る公共空間でした。",
        detail: [
          "1683年のコーヒー豆にまつわる起源譚には伝説が含まれますが、18〜19世紀にカフェがウィーンの都市生活へ深く根付いたことは確かです。メランジェ、水、新聞、チェス、長時間の席が、知識人や芸術家の交流を支えました。",
          "店の内装や給仕の作法も文化の一部です。カフェでは、注文を急いで飲み切るのではなく、席に滞在して人と情報が交差する時間まで含めて楽しみます。",
        ],
        image: KHM_CAFE_IMAGE,
        links: [
          { label: "Gerstner", href: "https://www.gerstner-konditorei.at/" },
          { label: "オーストリアのカフェ文化", href: "https://www.austria.info/ja/inspiration/coffeehouse-culture/" },
        ],
      },
      {
        era: "19世紀の菓子職人",
        title: "ザッハトルテとアプフェルシュトゥーデル",
        summary: "帝国の交易と菓子職人の技術が、カフェで食べる『ウィーンらしい甘味』を育てました。",
        detail: [
          "ザッハトルテは1832年、宮廷の宴席で若いフランツ・ザッハがつくったと伝えられます。後にホテル・ザッハーとデメルの販売権をめぐる争いで名前が広まり、菓子の味だけでなく『どの店で食べるか』まで文化になりました。",
          "アプフェルシュトゥーデルは薄い生地でりんごを包む菓子で、ハプスブルク領域の食文化交流を感じさせます。温かい菓子とコーヒー、銀器とサロンの組み合わせは、食べ物を社交の時間へ変えるウィーンの特徴です。",
        ],
        image: SACHERTORTE_IMAGE,
        links: [
          { label: "Gerstner", href: "https://www.gerstner-konditorei.at/" },
          { label: "美術史美術館カフェ", href: "https://www.khm.at/en/visit/cafe-restaurant/" },
        ],
      },
      {
        era: "季節の都市文化",
        title: "プンシュと冬のマーケット",
        summary: "クリスマスマーケットの飲み物や焼き菓子は、寒い季節に人を広場へ集める都市の食文化です。",
        detail: [
          "プンシュは温めた酒や果汁、香辛料を合わせる冬の飲み物で、屋台ごとに味が異なります。歴史的な宮廷料理ではありませんが、広場、照明、音楽、陶器のマグカップと一緒に味わうことで、現代のウィーンらしい季節行事になります。",
          "市庁舎前、シェーンブルン、ベルヴェデーレなど、異なる歴史背景を持つ場所が冬市の会場になります。料理の由来だけでなく、どの建物の前で誰と食べるのかまで含めて観察します。",
        ],
        image: RATHAUS_MARKET_IMAGE,
        links: [
          { label: "市庁舎前マーケット", href: "https://www.christkindlmarkt.at/en/" },
          { label: "シェーンブルンのマーケット", href: "https://www.weihnachtsmarkt.co.at/" },
        ],
      },
    ],
  },
  "チェコ": {
    history: [
      {
        era: "9〜12世紀",
        title: "城、川、商人の市場",
        summary: "プラハは一つの城下町ではなく、川の両岸に生まれた市場町と城下町が結びついて成長しました。",
        detail: [
          "プラハ城は9世紀後半から政治と宗教の中心となり、川を挟んだ旧市街では商人と職人が市場を開きました。渡河点は物資と人が集まる場所で、旧市街広場は交易の情報が交わる公共空間になります。",
          "マラー・ストラナは城のふもとの職人町として整えられ、フラッチャニには宮殿と巡礼地が並びました。現在の観光ルートは、王宮、橋、市場、城下をつなぐ中世の都市構造をそのまま歩く道でもあります。",
        ],
        image: PRAGUE_OLD_TOWN_IMAGE,
        links: [
          { label: "プラハ城", href: "https://www.hrad.cz/en" },
          { label: "旧市街広場", href: "https://prague.eu/en/objevujte/old-town-square-staromestske-namesti/" },
          { label: "マラー・ストラナ", href: "https://prague.eu/en/objevujte/mala-strana/" },
        ],
      },
      {
        era: "14世紀",
        title: "カレル4世がつくった黄金期",
        summary: "大学、新市街、橋、大聖堂が整備され、プラハは神聖ローマ帝国の首都として大きく飛躍しました。",
        detail: [
          "カレル4世は1348年に大学と新市街を創設し、プラハを皇帝の都にふさわしい都市へ計画しました。広い市場、教会、行政施設を配置することで、旧市街に集中していた人と機能を南へ広げます。",
          "カレル橋と聖ヴィート大聖堂の建設は、政治と信仰を都市の景観に刻む事業でした。橋を渡り、城へ向かい、大聖堂の内部へ入る順番は、皇帝が示した『王の道』の考え方を体験する順路です。",
        ],
        image: CHARLES_BRIDGE_IMAGE,
        links: [
          { label: "カレル橋", href: "https://prague.eu/en/objevujte/charles-bridge-karluv-most/" },
          { label: "聖ヴィート大聖堂・プラハ城", href: "https://www.hrad.cz/en" },
        ],
        diagram: {
          type: "timeline",
          title: "カレル4世の都市計画",
          items: [
            { marker: "1348", label: "大学", text: "知識の中心" },
            { marker: "1348", label: "新市街", text: "人口と市場を拡大" },
            { marker: "1357", label: "石橋", text: "両岸を接続" },
            { marker: "14世紀", label: "大聖堂", text: "帝都の象徴" },
          ],
          caption: "プラハの名所は、同じ皇帝の都市計画の中で互いに関係しています。",
        },
      },
      {
        era: "15〜18世紀",
        title: "フス派、ハプスブルク、バロック",
        summary: "宗教改革と戦争の後、プラハはゴシック都市からバロック都市へ姿を変えました。",
        detail: [
          "ヤン・フスの説教と宗教改革は、教会の権威、聖書、都市の自治をめぐる大きな議論を生みました。旧市街広場のティーン教会やヤン・フス像は、その宗教的・市民的な記憶を示します。",
          "1620年の白山の戦い以後、ボヘミアはハプスブルク君主国の支配下に入り、再カトリック化とバロック化が進みました。ロレッタ、ストラホフ、マラー・ストラナの宮殿は、戦争後に信仰と王朝の秩序を見せるための建物でもあります。",
        ],
        image: STRAHOV_LIBRARY_IMAGE,
        links: [
          { label: "ティーン聖母教会", href: "https://prague.eu/en/objevujte/church-of-our-lady-before-tyn/" },
          { label: "ストラホフ修道院", href: "https://www.strahovskyklaster.cz/en/" },
          { label: "ロレッタ", href: "https://www.loreta.cz/en/" },
        ],
      },
      {
        era: "19〜20世紀",
        title: "市民文化と近代国家",
        summary: "チェコ語・音楽・建築を通じた民族復興が、市民会館や広場の景観へ表れます。",
        detail: [
          "19世紀の民族復興では、チェコ語の文学、歴史研究、音楽、劇場が国民意識を育てました。市民会館はアール・ヌーヴォーの装飾をまといながら、チェコの芸術家と音楽家が国の文化を示す場となります。",
          "1918年のチェコスロバキア成立、1968年のプラハの春、1989年のビロード革命では、ヴァーツラフ広場が市民の声を集めました。王の名前を持つ広場が、近代には民主化を求める市民の空間になったことが重要です。",
        ],
        image: MUNICIPAL_HOUSE_IMAGE,
        links: [
          { label: "プラハ市民会館", href: "https://www.obecnidum.cz/en/" },
          { label: "ヴァーツラフ広場", href: "https://prague.eu/en/objevujte/wenceslas-square-vaclavske-namesti/" },
        ],
      },
    ],
    food: [
      {
        era: "修道院と町の醸造所",
        title: "ビールは町のインフラだった",
        summary: "チェコのビールは特別な酒というより、食事と会話を組み立てる日常の飲み物です。",
        detail: [
          "中世の修道院や町の醸造所では、水の衛生や保存の問題もあり、発酵飲料が重要な役割を持ちました。19世紀にピルゼンで淡色のピルスナーが普及すると、チェコのビールは工業技術と職人の管理を両立させながら広がります。",
          "プラハのビアホールでは、泡の量、注ぎ方、温度、料理との相性までが文化になっています。ビールを飲むことは、町の人間関係と食事の時間へ参加することでもあります。",
        ],
        image: CZECH_BEER_IMAGE,
        links: [
          { label: "U Pinkasů", href: "https://www.upinkasu.cz/" },
          { label: "Lokál Dlouhááá", href: "https://lokal-dlouha.ambi.cz/en/" },
        ],
      },
      {
        era: "市場と家庭料理",
        title: "クネドリーキがソースを受け止める",
        summary: "肉、根菜、発酵食品、パンを組み合わせる食卓は、寒い気候と中欧の市場文化から生まれました。",
        detail: [
          "スヴィーチコヴァーは、肉を根菜とともに煮込み、裏ごししたクリームソースで食べる料理です。クネドリーキは単なる付け合わせではなく、ソースを受け止め、皿の味を最後まで食べるための主食です。",
          "塩味、酸味、甘味、生クリーム、クランベリーが一皿に並ぶため、料理の中に保存食と祝祭食の両方が見えます。高級店でも家庭料理でも、ソースと団子の組み合わせがチェコらしさを支えています。",
        ],
        image: SVICKOVA_IMAGE,
        links: [
          { label: "U Pinkasů", href: "https://www.upinkasu.cz/" },
          { label: "カフェ・ルーヴル", href: "https://www.cafelouvre.cz/en" },
        ],
      },
      {
        era: "宿屋とビアホール",
        title: "グラーシュとロースト料理",
        summary: "煮込みとローストは、ボヘミアの冬、宿屋、ビールをつなぐ食の中心です。",
        detail: [
          "グラーシュはハンガリー語圏から中欧全体へ広がり、チェコでは牛肉や豚肉を煮込み、クネドリーキと合わせます。鴨や豚肉のローストにはキャベツやパンが添えられ、保存しやすい穀物・肉・発酵食品の組み合わせが見えます。",
          "これらの料理は、宮廷の特別料理というより、旅人と町の人が宿屋で同じ鍋を囲むことで育ちました。豪華な内装のレストランで食べるときも、料理の出発点が日常の食卓だったことを忘れないようにします。",
        ],
        image: CZECH_GOULASH_IMAGE,
        links: [
          { label: "Café Imperial", href: "https://www.cafeimperial.cz/en/" },
          { label: "市民会館のレストラン", href: "https://www.plzenskarestaurace.cz/en/" },
        ],
      },
      {
        era: "カフェと観光地の菓子",
        title: "コラーチとトルデルニークを区別する",
        summary: "家庭の発酵菓子と観光地の屋台菓子は、どちらも甘いですが、歴史のたどり方は異なります。",
        detail: [
          "コラーチは果物やチーズをのせた丸い発酵菓子で、家庭や祭礼の焼き菓子として中欧に広く見られます。カフェで菓子を食べる習慣は、19世紀の都市化と知識人の交流を支えました。",
          "トルデルニークは筒状の生地を焼いて砂糖やナッツをまぶす菓子で、現在のプラハ観光地では目立つ名物です。ただし、チェコ全土の古い国民菓子と単純に言い切るのではなく、伝統菓子と観光市場が結びついた現代の食文化として見ると理解しやすくなります。",
        ],
        image: TRDELNIK_IMAGE,
        links: [
          { label: "カフェ・ルーヴル", href: "https://www.cafelouvre.cz/en" },
          { label: "旧市街広場", href: "https://prague.eu/en/objevujte/old-town-square-staromestske-namesti/" },
        ],
      },
    ],
  },
};

// ─── データ定数 ───────────────────────────────────────────────────────────────

const DAYS = [
  {
    day: 0,
    date: "11月17日（火）",
    title: "前日移動 ─ 羽田第3ターミナルへ",
    color: "#5a6a8a",
    icon: "✈",
    schedule: [
      { time: "〜21:05", label: "羽田 第3ターミナル 到着（推奨）", desc: "出発3時間前。首都圏外から向かう場合は夕方に出発。新幹線なら品川・浜松町乗換でモノレール or 京急", icon: "🚄", important: true },
      { time: "深夜", label: "保安検査・出国", desc: "搭乗は日付が変わる直前（00:05発）。免税ショップや両替はターミナル内で", icon: "🛂" },
    ],
  },
  {
    day: 1,
    date: "11月18日（水）",
    title: "羽田発 ─ ドバイ乗継 ─ ブダペスト着 ＆ 王宮の丘・夜景コース",
    color: "#7a5c9a",
    icon: "🛫",
    schedule: [
      { time: "00:05 JST", label: "羽田（HND）出発", desc: "EK313・エミレーツ。第3ターミナル。Boeing 777-300ER／飛行11時間50分", icon: "✈", important: true },
      { time: "06:55 DXB", label: "ドバイ（DXB）着", desc: "EK313到着。乗継 3時間10分。ターミナル3内で乗り継ぎ", icon: "🇦🇪" },
      { time: "10:05 DXB", label: "ドバイ（DXB）発", desc: "EK111・エミレーツ。Boeing 777-300ER／飛行6時間。現地時間", icon: "✈" },
      { time: "13:05 BUD", label: "ブダペスト（BUD）着", desc: "EK111到着。ターミナル2B。入国審査でEES（EU新入域システム）の生体登録があり通常より時間がかかる可能性あり。総所要21時間", icon: "🏁", important: true, coords: [47.4369, 19.2556] },
      { time: "14:00頃", label: "100E エアポートエクスプレス 乗車", desc: "市内行き直通バスに乗車。「Astoria M（アストリア）」で降車（約35分・専用券 2,500HUF/人・クレカタッチ決済可）", icon: "🚌", coords: [47.4369, 19.2556] },
      { time: "14:45頃", label: "Astoria M 降車 ─ ホテルへ移動", desc: "Astoria Mバス停からホテル（Károly krt. 10）へ徒歩約1分。大通り沿いでアクセス抜群", icon: "🚶", coords: [47.4947, 19.0595] },
      { time: "15:00頃", label: "Budapest Panorama Central チェックイン", desc: "チェックインして荷物を置きひと息・身支度。スーペリア ダブルルーム スパバス付（2泊）", icon: "🏨", important: true, url: "https://budapestpanoramacentral.com/", mapUrl: "https://maps.google.com/?q=Budapest+Panorama+Central", coords: [47.4947, 19.0595] },
      { time: "15:45", label: "ホテル出発 ─ ドナウ河畔・くさり橋へ", desc: "Astoriaから徒歩約10分、またはトラム47/49番でDeák Ferenc tér経由でドナウ河畔へ移動。くさり橋ペシュト側へ", icon: "🚃", coords: [47.4947, 19.0595] },
      { time: "16:15", label: "くさり橋（Széchenyi Lánchíd）渡橋", desc: "【コース1】ドナウ川にかかるブダペスト最古の美しい吊り橋。歩行者専用歩道を歩きながらペシュト側からブダ側へ渡橋（徒歩約15分）。日没（16:15頃）の夕暮れの光が差し込む絶景", icon: "🌉", important: true, mapUrl: "https://maps.google.com/?q=Sz%C3%A9chenyi+L%C3%A1nch%C3%ADd", coords: [47.4990, 19.0437], image: CHAIN_BRIDGE_IMAGE },
      { time: "16:30", label: "ヴァールケルト・バザール（Várkert Bazár）", desc: "【コース2】王宮の東麓に広がるネオルネサンス様式の庭園・回廊建築（ミクローシュ・イブル設計）。美しい庭園からエスカレーター/エレベーターを使って王宮の丘へ無料で上がれる（徒歩5分）", icon: "🏛", url: "https://varkertbazar.hu/", mapUrl: "https://maps.google.com/?q=V%C3%A1rkert+Baz%C3%A1r+Budapest", coords: [47.4947, 19.0416], image: VARKERT_BAZAR_IMAGE },
      { time: "16:45", label: "ブダ王宮（Budavári Palota）＆ 展望テラス", desc: "【コース3】歴代国王の居城であった壮大な宮殿。サヴォイア公オイゲン騎馬像前のテラスから、夕暮れ〜ライトアップで黄金に輝き始めるドナウ川・くさり橋・対岸の国会議事堂を一望（徒歩15分）", icon: "🏰", important: true, url: "https://budacastlebudapest.com/", mapUrl: "https://maps.google.com/?q=Buda+Castle+Budapest", coords: [47.4962, 19.0396], image: BUDA_CASTLE_IMAGE },
      { time: "17:15", label: "ルスヴルム・ツクラースダ（Ruszwurm Cukrászda）", desc: "【コース4】1827年創業、王宮の丘で最も古くハプスブルク皇妃エリザベート（シシィ）も愛した老舗カフェ。名物の伝統カスタードケーキ「ルスヴルム・クレーメシュ」で優雅なカフェ休憩（徒歩1分）", icon: "☕", important: true, url: "http://www.ruszwurm.hu/", mapUrl: "https://maps.google.com/?q=Ruszwurm+Cukr%C3%A1szda+Budapest", coords: [47.5015, 19.0331] },
      { time: "17:50", label: "三位一体広場（Szentháromság tér）", desc: "【コース5】王宮地区の中心広場。ペスト終息を神に感謝して18世紀初頭に建てられたバロック様式の「三位一体の柱」が中央にそびえる（徒歩すぐ）", icon: "🏛", mapUrl: "https://maps.google.com/?q=Szenth%C3%A1roms%C3%A1g+t%C3%A9r+Budapest", coords: [47.5017, 19.0341] },
      { time: "18:00", label: "マーチャーシュ教会（Mátyás-templom）", desc: "【コース6】歴代ハンガリー国王の戴冠式が行われたゴシック様式の名教会。色鮮やかなジョルナイ製ダイヤモンド柄の屋根瓦と壮麗な尖塔がライトアップされて夜空に浮かび上がる（徒歩すぐ）", icon: "⛪", important: true, url: "https://matyas-templom.hu/", mapUrl: "https://maps.google.com/?q=Matthias+Church+Budapest", coords: [47.5019, 19.0342], image: MATTHIAS_CHURCH_IMAGE },
      { time: "18:20", label: "漁夫の砦（Halászbástya）", desc: "【コース7】7つの尖塔と白亜の回廊が連なるロマンチックな展望砦。回廊のアーチ窓越しに、漆黒のドナウ川と黄金色に輝く国会議事堂を見渡すブダペスト随一の夜景名所（徒歩すぐ・夜間は上層テラスも無料開放）", icon: "🏰", important: true, url: "https://www.fishermansbastion.com/", mapUrl: "https://maps.google.com/?q=Fisherman%27s+Bastion+Budapest", coords: [47.5022, 19.0347], image: FISHERMANS_BASTION_IMAGE },
      { time: "18:50", label: "ホワイト・レイヴン・スカイバー＆ラウンジ", desc: "【コース8・GOAL】ヒルトン・ブダペストの屋上に位置する最高峰ルーフトップバー。マーチャーシュ教会の屋根瓦とドナウ夜景を間近に見下ろしながら、特製カクテルとディナーで初日の夜を乾杯（スマートカジュアル・要事前予約）", icon: "🍸", important: true, url: "https://whiteravenskybar.com/", mapUrl: "https://maps.google.com/?q=White+Raven+Skybar+Budapest", coords: [47.5027, 19.0340] },
      { time: "21:00", label: "ホテル帰着 ＆ 就寝", desc: "三位一体広場前から16番バスでDeák Ferenc térへ（約10分）。徒歩約5分またはトラムでBudapest Panorama Centralへ戻り就寝", icon: "🏨", coords: [47.4947, 19.0595] },
    ],
    booking: {
      title: "エミレーツ航空券（往路）",
      details: [
        { label: "予約番号", value: "K78ZN2" },
        { label: "搭乗者", value: "Mr Hiroki Nomura ／ Ms Rino Nomura" },
        { label: "区間", value: "東京（羽田）→ ドバイ → ブダペスト" },
        { label: "便名", value: "EK313 ／ EK111" },
        { label: "出発", value: "2026年11月18日（水）00:05 羽田（HND）" },
        { label: "到着", value: "2026年11月18日（水）13:05 ブダペスト（BUD）" },
        { label: "所要時間", value: "21時間00分（ドバイ乗継 3時間10分）" },
        { label: "機材", value: "Boeing 777-300ER（両便）" },
        { label: "運賃", value: "エコノミー ／ Saver（確定）" },
      ],
      url: "https://www.emirates.com/jp/japanese/manage-booking/",
    },
    extraBookings: [
      {
        key: "budapest-panorama-central-d1",
        icon: "🏨",
        title: "Budapest Panorama Central（ブダペスト 2泊）",
        url: "https://budapestpanoramacentral.com/",
        mapUrl: "https://maps.google.com/?q=Budapest+Panorama+Central",
        details: [
          { label: "施設名", value: "Budapest Panorama Central（ブダペスト パノラマ セントラル）" },
          { label: "宿泊期間", value: "2026年11月18日（水）〜 11月20日（金）（2泊）" },
          { label: "部屋・人数", value: "スーペリア ダブルルーム スパバス付 ／ 大人2名・1部屋" },
          { label: "住所", value: "1052 Budapest, Károly krt. 10, Hungary" },
          { label: "最寄り", value: "地下鉄M2「Astoria」駅 徒歩1分 ／ 100E空港バス「Astoria M」降車すぐ" },
          { label: "チェックイン", value: "14:00〜 ／ チェックアウト 〜11:00" },
          { label: "料金", value: "換算目安 ¥26,397（合計料金・2泊）" },
          { label: "予約状況", value: "予約確定" },
        ],
      },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f0eef8,#ede8f5)",
      border: "#c8bce8",
      titleColor: "#5a3a9a",
      textColor: "#3a2a6a",
      icon: "🇭🇺",
      title: "ブダペスト初日 ＆ 王宮の丘コース情報メモ",
      body: (
        <>
          <b>100E エアポートエクスプレス</b>：空港 ⇄ 市内を約35〜40分で結ぶ直通バス（専用券 2,500HUF/人・約¥1,050）。車内決済端末にクレカタッチ決済で乗車可能。<br/>
          <b>王宮の丘へのアクセス</b>：くさり橋を渡った後、ヴァールケルト・バザール（Várkert Bazár）の庭園内にあるエレベーター＆エスカレーターを利用すると、王宮の丘上層まで無料でスムーズに上がれます。<br/>
          <b>ルスヴルム・ツクラースダ（Ruszwurm）</b>：1827年創業。名物「ルスヴルム・クレーメシュ（Ruszwurm krémes）」は必食の伝統カスタードパイ。営業時間 10:00〜19:00。<br/>
          <b>漁夫の砦（Halászbástya）</b>：夜間は上層展望テラスも無料開放。アーチ窓から国会議事堂のライトアップを望む絶景写真スポット。<br/>
          <b>ホワイト・レイヴン・スカイバー（White Raven）</b>：ヒルトン屋上（14:00〜24:00）。人気店のため公式サイト（whiteravenskybar.com）から3週間前より要予約（スマートカジュアル）。<br/>
          <b>日の入り時刻</b>：11月中旬は16:15頃。16時過ぎから日没のマジックアワーとライトアップが始まり、王宮の丘からの夜景が最も美しい時間帯になります。
        </>
      ),
    },
  },
  {
    day: 2,
    date: "11月19日（木）",
    title: "ブダペスト ─ 国会議事堂・アンドラーシ通り・英雄広場 ＆ ナイトクルーズ",
    color: "#7a5c9a",
    icon: "🏰",
    schedule: [
      { time: "09:00", label: "ホテル出発 → Kossuth Lajos térへ", desc: "地下鉄M2「Astoria」駅から直通2駅で「Kossuth Lajos tér」駅へ移動（約5分・乗換なし）", icon: "🚇", coords: [47.4947, 19.0595] },
      { time: "09:30", label: "ハンガリー国会議事堂（Országház）", desc: "【コース1】ドナウ河畔に佇む壮麗なネオゴシック建築。大階段の間・ドームの間（聖イシュトヴァーンの王冠）・旧上院議場を巡る内部ツアー（非EU大人14,000HUF・要事前予約）。河畔の「ドナウ川遊歩道の靴」もすぐ（徒歩10分）", icon: "🏛", important: true, url: "https://www.parlament.hu/en/web/house-of-the-national-assembly/", mapUrl: "https://maps.google.com/?q=Hungarian+Parliament+Building", coords: [47.5071, 19.0457], image: PARLIAMENT_IMAGE },
      { time: "10:45", label: "旧郵便貯金局（Postatakarékpénztár）", desc: "【コース2】「ハンガリーのガウディ」レフネル・エデン設計のアール・ヌーヴォー建築傑作（現ハンガリー国立銀行別館・Hold u. 4）。ジョルナイ陶器のカラフルな屋根飾りやミツバチ・植物モチーフの外観レリーフが見どころ（外観見学・徒歩5分）", icon: "🏦", mapUrl: "https://maps.google.com/?q=Postatakar%C3%A9kp%C3%A9nzt%C3%A1r+Hold+utca+4+Budapest", coords: [47.5034, 19.0532], image: POSTAL_SAVINGS_BANK_IMAGE },
      { time: "11:15", label: "聖イシュトヴァーン大聖堂（Szent István-bazilika）", desc: "【コース3】初代国王を祀るブダペスト最大のカトリック教会。高さ96mの大ドーム、黄金の天井装飾、聖遺物（右手のミイラ）が見どころ。展望パノラマテラスからは市内360度を一望（徒歩10分）", icon: "⛪", important: true, url: "https://www.bazilika.biz/", mapUrl: "https://maps.google.com/?q=St.+Stephen%27s+Basilica+Budapest", coords: [47.5009, 19.0540], image: ST_STEPHEN_BASILICA_IMAGE },
      { time: "12:00", label: "アンドラーシ通り（Andrássy út）散策 ＆ ランチ", desc: "【コース4】「ブダペストのシャンゼリゼ」と称される世界遺産の大通り。優美な19世紀貴族邸宅が並ぶ並木道を散策しながら、伝統レストランで名物グヤーシュやパプリカーシュ・チルケのランチ（徒歩3分）", icon: "🍽", important: true, mapUrl: "https://maps.google.com/?q=Andr%C3%A1ssy+%C3%BAt+Budapest", coords: [47.5018, 19.0583] },
      { time: "13:30", label: "ハンガリー国立歌劇場（Magyar Állami Operaház）", desc: "【コース5】ミクローシュ・イブル設計によるネオルネサンス様式の豪奢な歌劇場。大理石の大階段、金箔とフレスコ画で飾られた壮麗な客席、スフィンクス像が美しい（徒歩10分）", icon: "🎭", url: "https://www.opera.hu/", mapUrl: "https://maps.google.com/?q=Hungarian+State+Opera+House", coords: [47.5028, 19.0582], image: OPERA_HOUSE_IMAGE },
      { time: "14:15", label: "リスト・フェレンツ記念館（Liszt Ferenc Emlékmúzeum）", desc: "【コース6】大作曲家フランツ・リストが晩年に暮らした旧音楽院のアパートメント（Vörösmarty u. 35）。愛用のベーゼンドルファーやチッカリングのピアノ、直筆楽譜、書斎が当時のまま保存されている（入場2,000HUF・徒歩7分）", icon: "🎼", important: true, url: "https://lisztmuseum.hu/", mapUrl: "https://maps.google.com/?q=Liszt+Ferenc+Memorial+Museum+Budapest", coords: [47.5070, 19.0664] },
      { time: "15:15", label: "英雄広場（Hősök tere）", desc: "【コース7】地下鉄M1線（世界遺産）に乗車またはアンドラーシ通りを進み、ハンガリー建国1000年を記念して造られた大広場へ。大天使ガブリエル像と歴代英雄の列柱像が立ち並ぶ（徒歩3分）", icon: "🏛", important: true, mapUrl: "https://maps.google.com/?q=H%C5%91s%C3%B6k+tere+Budapest", coords: [47.5149, 19.0779], image: HEROES_SQUARE_IMAGE },
      { time: "15:45", label: "市民公園（Városliget）", desc: "【コース8】英雄広場の背後に広がる広大な歴史的公園。池やヴァイダフニャディ城の景観を楽しみながら散策（徒歩8分）", icon: "🌳", url: "https://ligetbudapest.hu/", mapUrl: "https://maps.google.com/?q=V%C3%A1rosliget+Budapest", coords: [47.5142, 19.0833], image: VAJDAHUNYAD_CASTLE_IMAGE },
      { time: "16:15", label: "国立民族博物館（Néprajzi Múzeum）", desc: "【コース9・GOAL】市民公園内に2022年オープンした世界最高峰の現代建築（リゲット・ブダペスト計画）。緩やかに湾曲した巨大な屋上緑地テラスから公園と市内を一望。伝統文化・民族資料の充実展示（GOAL）", icon: "🏛", important: true, url: "https://www.neprajz.hu/", mapUrl: "https://maps.google.com/?q=Museum+of+Ethnography+Budapest", coords: [47.5126, 19.0805] },
      { time: "18:00", label: "ペシュト中心部へ移動 ＆ ディナー", desc: "世界遺産の地下鉄M1線（レトロな黄色い車両）で市内中心Vörösmarty tér方面へ戻りディナー。乗船場所のヴィガード広場（Vigadó tér）へ移動", icon: "🍽", coords: [47.4950, 19.0505] },
      { time: "20:00", label: "ドナウ川 ナイト観光クルーズ（ウェルカムドリンク付）", desc: "Vigadó tér 5番桟橋（Mahart Cruises）から出航。漆黒のドナウ川から黄金色に輝く国会議事堂・ブダ城・くさり橋を船上から一望する約1時間のパノラマクルーズ（ドリンク1杯付）", icon: "🚢", important: true, url: "https://www.getyourguide.com/ja-jp/budapest-l29/budapest-by-night-sightseeing-cruise-with-welcome-drink-t69093/?ranking_uuid=fe4b4ba7-6cca-4332-84b1-3f2915ccea8c&q=%E3%82%AF%E3%83%AB%E3%83%BC%E3%82%BA%EF%BC%86%E3%83%9C%E3%83%BC%E3%83%88%E3%83%84%E3%82%A2%E3%83%BC%2C+%E3%83%96%E3%83%80%E3%83%9A%E3%82%B9%E3%83%88", coords: [47.4950, 19.0505] },
      { time: "21:30", label: "ホテル帰着 ＆ 翌朝の移動準備", desc: "Budapest Panorama Centralへ帰着。翌朝のウィーン行きRailjet（Keleti 08:40発）に向けて荷造り・就寝", icon: "🏨", coords: [47.4947, 19.0595] },
    ],
    booking: {
      title: "ドナウ川 ナイト観光クルーズ（GetYourGuide）",
      details: [
        { label: "ツアー名", value: "ブダペスト：ウェルカムドリンク付き ナイト観光クルーズ" },
        { label: "日時目安", value: "2026年11月19日（木）夜（20:00頃出航便推奨）" },
        { label: "所要時間", value: "約50〜60分" },
        { label: "集合場所", value: "Vigadó tér 5. ponton（ヴィガード広場 第5桟橋・Mahart Cruises）" },
        { label: "含まれるもの", value: "クルーズ乗船券、ウェルカムドリンク1杯（スパークリングワイン/ワイン/ジュース等）" },
        { label: "料金目安", value: "約 €18 / 人（2名で約 ¥6,000）" },
        { label: "予約サイト", value: "GetYourGuide（商品コード: t69093）" },
      ],
      url: "https://www.getyourguide.com/ja-jp/budapest-l29/budapest-by-night-sightseeing-cruise-with-welcome-drink-t69093/?ranking_uuid=fe4b4ba7-6cca-4332-84b1-3f2915ccea8c&q=%E3%82%AF%E3%83%AB%E3%83%BC%E3%82%BA%EF%BC%86%E3%83%9C%E3%83%BC%E3%83%88%E3%83%84%E3%82%A2%E3%83%BC%2C+%E3%83%96%E3%83%80%E3%83%9A%E3%82%B9%E3%83%88",
    },
    extraBookings: [
      {
        key: "budapest-panorama-central-d2",
        icon: "🏨",
        title: "Budapest Panorama Central（連泊 2日目）",
        url: "https://budapestpanoramacentral.com/",
        mapUrl: "https://maps.google.com/?q=Budapest+Panorama+Central",
        details: [
          { label: "施設名", value: "Budapest Panorama Central（ブダペスト パノラマ セントラル）" },
          { label: "部屋", value: "スーペリア ダブルルーム スパバス付" },
          { label: "住所", value: "1052 Budapest, Károly krt. 10, Hungary" },
          { label: "最寄り", value: "地下鉄M2「Astoria」駅 徒歩1分" },
          { label: "翌朝アクセス", value: "チェックアウト後、地下鉄M2「Astoria」からKeleti駅へ直通2駅（約4分）" },
        ],
      },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f8f0ec,#f5ece8)",
      border: "#e8c8b8",
      titleColor: "#9a4a2a",
      textColor: "#5a3020",
      icon: "🇭🇺",
      title: "ブダペスト2日目 観光＆料金メモ",
      body: (
        <>
          <b>国会議事堂（Országház）</b>：外観見学は無料。内部ガイドツアーは非EU大人14,000HUF（約¥5,800/人・要事前予約）。公式サイト（parlament.hu）から早めのチケット確保を推奨。<br/>
          <b>郵便貯金局（Postatakarékpénztár）</b>：レフネル・エデン設計（Hold u. 4）。外観のジョルナイ陶器タイルや有機的装飾を鑑賞。<br/>
          <b>聖イシュトヴァーン大聖堂</b>：教会入場料 2,300HUF、パノラマ展望テラス＋宝物館 4,300HUF。<br/>
          <b>リスト・フェレンツ記念館</b>：大人 2,000HUF。月〜金 10:00〜18:00、土 9:00〜17:00（日祝休館）。地下鉄M1線 Vörösmarty utca駅すぐ。<br/>
          <b>国立民族博物館（Néprajzi Múzeum）</b>：2022年オープンの現代建築。屋上庭園散策。常設展 1,700HUF〜（火〜日 10:00〜18:00/木〜20:00、月曜休館）。<br/>
          <b>ドナウ川 ナイトクルーズ</b>：GetYourGuideにて約€18/人（約¥3,000/人・ウェルカムドリンク付）。出航15分前にはVigadó tér 5番桟橋へ。<br/>
          <b>市内交通 24時間乗車券</b>：2,500HUF（約¥1,050/人）。地下鉄M1〜M4・トラム・路線バスが24時間乗り放題。BudapestGOアプリまたは券売機で購入。
        </>
      ),
    },
  },
  {
    day: 3,
    date: "11月20日（金）",
    title: "ブダペスト → ウィーン ＆ 旧市街散策・バロック宮廷図書館・市庁舎クリスマスマーケット",
    color: "#4a7a9a",
    icon: "🚄",
    schedule: [
      { time: "07:45頃", label: "ホテル チェックアウト・Keleti駅へ移動", desc: "Budapest Panorama Centralをチェックアウト。地下鉄M2「Astoria」から「Keleti pályaudvar」へ直通2駅（約4分）。出発30分前には駅に到着", icon: "🏨", coords: [47.4947, 19.0595] },
      { time: "08:40", label: "ブダペスト東駅（Keleti）発", desc: "Railjet 62（直通・約2時間40分）。ÖBB/MÁV共同運行。車内Wi-Fi・電源あり。車窓の風景を眺めながら快適に移動", icon: "🚆", important: true, coords: [47.5001, 19.0839] },
      { time: "11:20", label: "ウィーン中央駅（Wien Hbf）着", desc: "音楽と芸術の都ウィーンに到着。駅構内で48時間市内交通券を購入（またはWienMobilアプリで有効化）", icon: "🚉", coords: [48.1848, 16.3765] },
      { time: "11:50", label: "ウィーン中央駅 → ARCOTEL Wimberger Wien", desc: "Wien Hbfからトラム18番でWestbahnhof方面へ直通約18分。ホテルはNeubaugürtel 34-36、西駅・U6駅すぐの好立地", icon: "🚋", coords: [48.2049, 16.3378] },
      { time: "12:15", label: "ホテル到着・荷物預け（アーリーチェックイン確認）", desc: "12:00〜13:00の到着をリクエスト済み。入室できれば身支度、できなければ荷物を預けて身軽になり旧市街へ", icon: "🏨", important: true, url: "https://www.arcotel.com/en/hotels/vienna/arcotel-wimberger/", mapUrl: "https://maps.google.com/?q=ARCOTEL+Wimberger+Wien", coords: [48.2049, 16.3378] },
      { time: "12:45", label: "地下鉄U3で旧市街中心へ移動", desc: "徒歩4分のWestbahnhof（西駅）から地下鉄U3に乗車。乗換なし直通8分で「Stephansplatz」駅へ到着", icon: "🚇", coords: [48.2085, 16.3721] },
      { time: "13:00", label: "Lugeck（ルゲック）でウィーンランチ", desc: "【ランチ】フィグルミュラー系列のモダンタバーン。歴史的洋館（Regensburger Hof）で名物シュニッツェルやグラシュを気取らず上質に堪能（徒歩3分）", icon: "🍽", important: true, url: "https://www.lugeck.com/", mapUrl: "https://maps.google.com/?q=Lugeck+Vienna", coords: [48.2096, 16.3749] },
      { time: "14:00", label: "シュテファン大聖堂（Stephansdom）＆ 北塔展望台", desc: "【コース1】ウィーンの象徴。壮麗なゴシック建築と色鮮やかなモザイク屋根。エレベーターで上がれる「北塔（Pummerinの大鐘）」から旧市街の街並みを一望（徒歩すぐ）", icon: "⛪", important: true, url: "https://www.stephanskirche.at/", mapUrl: "https://maps.google.com/?q=Stephansdom+Vienna", coords: [48.2085, 16.3721], image: ST_STEPHANS_VIENNA_IMAGE },
      { time: "14:45", label: "グラーベン ＆ ペーター教会（Peterskirche）散策", desc: "【コース2】歩行者天国の優美な大通り「グラーベン」を散策。ペスト記念柱と、壮麗なバロック装飾が施されたペーター教会へ立ち寄り（入場無料・徒歩5分）", icon: "🏛", url: "https://www.peterskirche.at/", mapUrl: "https://maps.google.com/?q=Peterskirche+Vienna", coords: [48.2094, 16.3700], image: PETERSKIRCHE_IMAGE },
      { time: "15:30", label: "オーストリア国立図書館 プルンクザール（Prunksaal）", desc: "【コース3】ホーフブルク（王宮）ヨーゼフ広場にある「世界一美しいバロック宮廷図書館」。20万冊の革装丁古書と壮大な天井フレスコ画が織りなす空間（入場€10・徒歩5分）", icon: "📚", important: true, url: "https://www.onb.ac.at/en/museums/state-hall", mapUrl: "https://maps.google.com/?q=Prunksaal+der+%C3%96sterreichischen+Nationalbibliothek", coords: [48.2064, 16.3669], image: PRUNKSAAL_IMAGE },
      { time: "16:30", label: "ゲルストナー皇室御用達菓子店（Gerstner）カフェ休憩", desc: "【カフェ】1847年創業、国立歌劇場向かいの老舗。1階ショップから3階サロンへ上がると宮殿のような豪奢な空間。本場のザッハトルテやメランジェで贅沢なティータイム（徒歩7分）", icon: "☕", important: true, url: "https://www.gerstner-konditorei.at/", mapUrl: "https://maps.google.com/?q=Gerstner+K.u.K.+Hofzuckerb%C3%A4cker+Vienna", coords: [48.2033, 16.3698] },
      { time: "17:30", label: "市庁舎前広場 クリスマスマーケット（Christkindlmarkt）", desc: "【コース4】ウィーン最大規模の夢のマーケット。壮麗なネオゴシック様式の市庁舎が金色にライトアップされ、巨大ツリーと無数の屋台が輝く絶景。特製マグカップで温かいプンシュを味わう（トラム1番で移動約10分）", icon: "🎄", important: true, url: "https://www.christkindlmarkt.at/", mapUrl: "https://maps.google.com/?q=Christkindlmarkt+Rathausplatz+Vienna", coords: [48.2109, 16.3575], image: RATHAUS_MARKET_IMAGE },
      { time: "19:15", label: "Meissl & Schadn で正統派ディナー", desc: "【ディナー】リング通り沿いの上品なレストラン。オープンキッチンで揚げる本場仔牛のウィーナーシュニッツェルをゆったりと堪能（市庁舎からトラム1番で約10分・要事前予約）", icon: "🍽", important: true, url: "https://meisslundschadn.at/en/meissl-schadn-vienna/", mapUrl: "https://maps.google.com/?q=Meissl+%26+Schadn+Wien", coords: [48.2017, 16.3734] },
      { time: "21:15", label: "夜景トラム ＆ ホテル帰着", desc: "ライトアップされたリング通りの建築美を眺めながらトラムまたは地下鉄でWestbahnhofへ戻り、ARCOTEL Wimbergerでゆっくり休む", icon: "🏨", coords: [48.2049, 16.3378] },
    ],
    dinner: {
      title: "ウィーン初日 ディナー候補（金曜夜・予約推奨）",
      options: [
        {
          name: "Meissl & Schadn Wien",
          genre: "正統派仔牛シュニッツェル・オープンキッチン",
          desc: "リング通り沿いの格式ある名店。職人が目の前で叩いて揚げる本場仔牛のシュニッツェル。落ち着いた夫婦ディナーに最適",
          tel: "+43 1 90211",
          url: "https://meisslundschadn.at/en/meissl-schadn-vienna/",
          mapUrl: "https://maps.google.com/?q=Meissl+%26+Schadn+Wien",
          coords: [48.2017, 16.3734],
        },
        {
          name: "Plachutta Wollzeile",
          genre: "皇帝が愛した名物宮廷料理ターフェルシュピッツ",
          desc: "ブイヨンで柔らかく煮込んだ最高級牛肉。熱々スープから骨髄トースト、ホースラディッシュソースまで味わう至高の体験",
          tel: "+43 1 5121577",
          url: "https://www.plachutta.at/en/",
          mapUrl: "https://maps.google.com/?q=Plachutta+Wollzeile+Vienna",
          coords: [48.2089, 16.3780],
        },
        {
          name: "Lugeck（フィグルミュラー系列）",
          genre: "現代風ウィーン料理＆オーストリアワイン",
          desc: "歴史あるRegensburger Hof内のスタイリッシュなタバーン。名物シュニッツェルやグラシュを気取らず上質な雰囲気で",
          tel: "+43 1 5125060",
          url: "https://www.lugeck.com/",
          mapUrl: "https://maps.google.com/?q=Lugeck+Vienna",
          coords: [48.2096, 16.3749],
        },
      ],
    },
    booking: {
      title: "鉄道チケット（ブダペスト → ウィーン）",
      details: [
        { label: "推奨列車", value: "Railjet 62（直通）" },
        { label: "区間", value: "ブダペスト東駅（Keleti）→ ウィーン中央駅（Wien Hbf）" },
        { label: "出発", value: "2026年11月20日（金）08:40発" },
        { label: "到着", value: "2026年11月20日（金）11:20着" },
        { label: "所要時間", value: "2時間40分" },
        { label: "運賃目安", value: "早割 €19.90〜 ＋ 指定席 €3 / 人" },
        { label: "予約先", value: "ÖBB（オーストリア連邦鉄道）または MÁV（ハンガリー国鉄）" },
      ],
      url: "https://www.oebb.at/en/",
    },
    memo: {
      bg: "linear-gradient(135deg,#eef4fa,#e8f0f8)",
      border: "#b8d0e8",
      titleColor: "#2a5a8a",
      textColor: "#1a3a5a",
      icon: "🚆",
      title: "ウィーン初日 到着＆市内観光メモ",
      body: (
        <>
          <b>48時間市内交通券</b>：大人 €14.10 /人（WienMobilアプリまたは駅券売機で購入）。地下鉄・トラム・バスが48時間乗り放題。<br/>
          <b>ホテルアクセス</b>：ウィーン西駅（Westbahnhof）から徒歩4分、U6 Burggasse-Stadthalleから徒歩1分。西駅から旧市街中心（Stephansplatz）へは地下鉄U3で直通わずか8分。<br/>
          <b>国立図書館プルンクザール</b>：王宮ヨーゼフ広場。開館 10:00〜18:00。入場料大人€10。世界屈指のバロック宮廷図書館。<br/>
          <b>ゲルストナー（Gerstner）</b>：オペラ座前（10:00〜21:00）。3階の宮殿サロンが格別。名物ザッハトルテとメランジェ。<br/>
          <b>市庁舎前クリスマスマーケット</b>：10:00〜22:00（入場無料）。16:30の日没以降、市庁舎の黄金ライトアップとイルミネーションが最高潮を迎えます。<br/>
          <b>ディナー予約</b>：金曜夜は混み合うため、Meissl & Schadn や Plachutta は日本出発前のweb予約を推奨。
        </>
      ),
    },
    extraBookings: [
      {
        key: "arcotel-wimberger-vienna",
        icon: "🏨",
        title: "ARCOTEL Wimberger Wien（ウィーン 2泊）",
        url: "https://www.arcotel.com/en/hotels/vienna/arcotel-wimberger/",
        mapUrl: "https://maps.google.com/?q=ARCOTEL+Wimberger+Wien",
        details: [
          { label: "施設名", value: "ARCOTEL Wimberger Wien" },
          { label: "宿泊期間", value: "2026年11月20日（金）〜 11月22日（日）（2泊）" },
          { label: "部屋・人数", value: "コンフォート ダブルルーム ／ 大人2名・1部屋" },
          { label: "住所", value: "Neubaugürtel 34-36, 07区 ノイバウ, 1070 ウィーン, オーストリア" },
          { label: "電話", value: "+43 1 521650" },
          { label: "チェックイン", value: "15:00から（12:00〜13:00の到着・チェックインをリクエスト済み／空き状況による）" },
          { label: "チェックアウト", value: "2026年11月22日（日）11:00まで" },
          { label: "食事", value: "なし（禁煙ルーム）" },
          { label: "料金", value: "€198.61（支払済・約¥40,277／税・サービス料込み）" },
          { label: "予約状況", value: "Booking.com 予約済（予約番号 5340692962）" },
        ],
      },
    ],
  },
  {
    day: 4,
    date: "11月21日（土）",
    title: "ウィーン ─ シェーンブルン宮殿・ベルヴェデーレ上宮 ＆ 芸術とマーケット巡り",
    color: "#4a7a9a",
    icon: "👑",
    schedule: [
      { time: "08:45", label: "ホテル出発 → 西駅からシェーンブルンへ", desc: "Westbahnhofからトラム52/60番またはU6→U4で約15〜20分。朝の澄んだ空気の中、夏の離宮へ向かう", icon: "🚋", coords: [48.2049, 16.3378] },
      { time: "09:15", label: "シェーンブルン宮殿（Schloss Schönbrunn）", desc: "【コース1】ハプスブルク家の夏の離宮（世界遺産）。マリア・テレジアが愛した壮麗な大広間やモーツァルトが演奏した鏡の間を巡るグランドツアー（要事前予約・日本語オーディオ付・約50分）", icon: "👑", important: true, url: "https://www.schoenbrunn.at/en/", mapUrl: "https://maps.google.com/?q=Sch%C3%B6nbrunn+Palace+Vienna", coords: [48.1858, 16.3128], image: SCHONBRUNN_IMAGE },
      { time: "10:30", label: "宮殿庭園 ＆ グロリエッテ遠望", desc: "【コース2】幾何学模様の広大なバロック庭園を散策。丘の上に立つ優美な凱旋門「グロリエッテ」の景観を楽しむ（徒歩15分）", icon: "🌳", mapUrl: "https://maps.google.com/?q=Gloriette+Sch%C3%B6nbrunn", coords: [48.1782, 16.3087] },
      { time: "11:15", label: "シェーンブルン宮殿前 クリスマスマーケット", desc: "【コース3】宮殿の前庭に広がる優雅なマーケット（11/6開幕）。壮麗な宮殿を背景に、質の高い伝統工芸品や木製オーナメントが並ぶ（徒歩すぐ）", icon: "🎄", important: true, url: "https://www.weihnachtsmarkt.co.at/", mapUrl: "https://maps.google.com/?q=Kultur-+und+Weihnachtsmarkt+Schloss+Sch%C3%B6nbrunn", coords: [48.1870, 16.3140] },
      { time: "12:15", label: "地下鉄U4で市内中心へ移動", desc: "地下鉄U4「Schönbrunn」駅から「Karlsplatz」へ直通約9分。リンク通り方面へ移動", icon: "🚇", coords: [48.2000, 16.3690] },
      { time: "12:45", label: "美術史美術館 カフェ・レストラン（KHM Café）でランチ", desc: "【ランチ＆カフェ】「世界一美しいミュージアムカフェ」。八角形の大ドーム直下、壮麗な大理石と金箔の空間で伝統料理やスイーツを堪能（美術館入場券が必要・徒歩7分）", icon: "🍽", important: true, url: "https://www.khm.at/en/visit/cafe-restaurant/", mapUrl: "https://maps.google.com/?q=Kunsthistorisches+Museum+Wien", coords: [48.2038, 16.3617], image: KHM_CAFE_IMAGE },
      { time: "14:15", label: "ベルヴェデーレ上宮（Oberes Belvedere）", desc: "【コース4】バロックの傑作宮殿。クリムトの世界的名作『接吻（The Kiss）』や『ユディト』、エゴン・シーレの絵画を鑑賞。上宮南庭園からの眺めも格別（要日時指定予約・トラムD番または18番で移動）", icon: "🖼", important: true, url: "https://www.belvedere.at/en", mapUrl: "https://maps.google.com/?q=Upper+Belvedere+Vienna", coords: [48.1915, 16.3809], image: BELVEDERE_PALACE_IMAGE },
      { time: "15:45", label: "ベルヴェデーレ宮殿 クリスマス村", desc: "【コース5】上宮前のバロック池を取り囲むロマンチックなクリスマス村。池の水面に宮殿とイルミネーションが映り込む絶好の写真スポット（徒歩すぐ）", icon: "🎄", mapUrl: "https://maps.google.com/?q=Weihnachtsdorf+Schloss+Belvedere", coords: [48.1925, 16.3815] },
      { time: "17:00", label: "シュピッテルベルク クリスマスマーケット", desc: "【コース6】ホテル近くのノイバウ地区。石畳の小道に暖色のランプと屋台が並び、ウィーンっ子に最も親しまれる温かいマーケット。散策しながらオーガニックフードや温かいドリンクを楽しむ（トラム18番→西駅、またはU3 Volkstheater）", icon: "🧣", important: true, url: "https://spittelberg.at/", mapUrl: "https://maps.google.com/?q=Weihnachtsmarkt+am+Spittelberg", coords: [48.2033, 16.3536] },
      { time: "18:45", label: "Glacis Beisl（グラシス・バイスル）で夫婦ディナー", desc: "【ディナー】ミュージアム・クォーター裏手の洗練されたビストロ。地元で評判のグラシュや旬のウィーン料理、オーストリアワインを落ち着いた雰囲気で堪能（シュピッテルベルクから徒歩5分・ホテルへも徒歩10分）", icon: "🍽", important: true, url: "https://www.glacisbeisl.at/", mapUrl: "https://maps.google.com/?q=Glacis+Beisl+Vienna", coords: [48.2040, 16.3570] },
      { time: "20:45", label: "ホテル帰着 ＆ 翌朝プラハ移動の荷造り・就寝", desc: "ホテル（ARCOTEL Wimberger）へ徒歩で帰着。翌朝はウィーン中央駅07:10発のRailjet 72（プラハ行き）のため早めに就寝", icon: "🏨", coords: [48.2049, 16.3378] },
    ],
    dinner: {
      title: "ウィーン2日目 ディナー候補（ホテル近く＆名店）",
      options: [
        {
          name: "Glacis Beisl（グラシス・バイスル）",
          genre: "洗練されたウィーン郷土ビストロ・中庭",
          desc: "MQ裏手、ホテルから徒歩10分。観光客の喧騒を離れ、地元の大人が通う本格グラシュや季節のウィーン料理を上質ワインとともに",
          tel: "+43 1 5265660",
          url: "https://www.glacisbeisl.at/",
          mapUrl: "https://maps.google.com/?q=Glacis+Beisl+Vienna",
          coords: [48.2040, 16.3570],
        },
        {
          name: "Zum Schwarzen Kameel（黒ラクダ）",
          genre: "1618年創業の歴史的名店・アールヌーヴォー",
          desc: "ベートーヴェンも愛した伝説の老舗。手軽なオープンサンドイッチとワインのバーから、格調高いダイニングルームまで",
          tel: "+43 1 5338125",
          url: "https://www.kameel.at/",
          mapUrl: "https://maps.google.com/?q=Zum+Schwarzen+Kameel+Vienna",
          coords: [48.2100, 16.3686],
        },
        {
          name: "Gasthaus Steman",
          genre: "地元で愛されるアットホームな老舗バイスル",
          desc: "6区の住宅街に佇む温かい木の内装。家庭的で丁寧なターフェルシュピッツやシュニッツェルをリーズナブルに味わえる隠れ家",
          tel: "+43 1 5877864",
          url: "https://www.steman.at/",
          mapUrl: "https://maps.google.com/?q=Gasthaus+Steman+Vienna",
          coords: [48.1970, 16.3548],
        },
      ],
    },
    memo: {
      bg: "linear-gradient(135deg,#f8f4e8,#f5efdc)",
      border: "#e8d8a0",
      titleColor: "#8a6a10",
      textColor: "#5a4808",
      icon: "👑",
      title: "ウィーン2日目 観光＆予約・移動メモ",
      body: (
        <>
          <b>シェーンブルン宮殿</b>：時間指定・要予約（グランドツアー推奨・日本語オーディオ付）。午前中（09:30前）が最も空いています。<br/>
          <b>ベルヴェデーレ上宮</b>：クリムト『接吻』所蔵。<b>日時指定チケットの事前購入が必須</b>（時間枠を過ぎると入場制限あり）。<br/>
          <b>美術史美術館カフェ</b>：大ドーム下の絶景カフェ。美術館チケットで入場可能。12:00〜13:30は混み合うため少し早めの入店がスムーズ。<br/>
          <b>シュピッテルベルク・マーケット</b>：土曜11:00〜21:30。ホテル徒歩圏。石畳の路地に地元工芸品やオーガニック屋台が立ち並ぶ隠れ家マーケット。<br/>
          <b>翌朝の移動（注意）</b>：Day 5はウィーン中央駅 07:10発（Railjet 72）。日曜早朝はトラム間隔が開くため、ホテルは06:30頃に出発推奨（トラム18番約20分またはタクシー約10分）。
        </>
      ),
    },
  },
  {
    day: 5,
    date: "11月22日（日）",
    title: "ウィーン → プラハ ＆ 旧市街広場・天文時計・カレル橋トワイライト",
    color: "#3a7a5a",
    icon: "🚄",
    schedule: [
      { time: "06:30頃", label: "ホテル チェックアウト・駅へ移動", desc: "ARCOTEL Wimbergerをチェックアウト。ウィーン中央駅へ移動し、駅構内のベーカリーで朝食やコーヒーを調達", icon: "🥐", coords: [48.1848, 16.3765] },
      { time: "07:10", label: "ウィーン中央駅（Wien Hbf）発", desc: "Railjet 72（直通・約4時間13分）。食堂車や車内Wi-Fi完備。日曜は混雑するため座席指定必須", icon: "🚆", important: true, coords: [48.1848, 16.3765] },
      { time: "11:23", label: "プラハ本駅（hlavní nádraží）着", desc: "百塔の街プラハに到着。地下鉄C線またはトラム・徒歩で宿（Youngmann House）へ移動（約15分）", icon: "🚉", coords: [50.0833, 14.4356] },
      { time: "11:50", label: "Youngmann House 荷物預け", desc: "Jungmannovo náměstí 14。地下鉄Můstek駅すぐの好立地。チェックイン（15:00）前に荷物を預けて身軽に旧市街へ", icon: "🏨", important: true, mapUrl: "https://maps.google.com/?q=Youngmann+House+Jungmannovo+n%C3%A1m%C4%9Bst%C3%AD+14+Prague", coords: [50.0837, 14.4205] },
      { time: "12:15", label: "U Pinkasů（ウ・ピンカスー）でチェコランチ", desc: "【ランチ】宿のすぐ真向かい！1843年にピルゼンから届いたピルスナー・ウルケルをプラハで初めて提供した歴史的ビアホール。名物スヴィーチコヴァー（牛肉のクリーム煮・クネドリーキ添え）と極上のウルケル生で乾杯（徒歩1分）", icon: "🍺", important: true, url: "https://www.upinkasu.cz/", mapUrl: "https://maps.google.com/?q=U+Pinkas%C5%AF+Prague", coords: [50.0832, 14.4223] },
      { time: "13:30", label: "旧市街広場（Staroměstské náměstí）＆ ティーン教会", desc: "【コース1】ゴシック・バロック・ロココ建築が立ち並ぶプラハの中心広場。おとぎ話の城のような2本の尖塔を持つ「ティーン聖母教会」の威容を鑑賞（徒歩7分）", icon: "🏰", important: true, mapUrl: "https://maps.google.com/?q=Old+Town+Square+Prague", coords: [50.0875, 14.4213], image: TYN_CHURCH_IMAGE },
      { time: "14:00", label: "旧市庁舎 天文時計（Orloj）＆ 展望塔", desc: "【コース2】600年以上の歴史を刻む世界最古級の天文時計。毎正時のからくり仕掛け「使徒の行進」を見学後、エレベーターで高さ約70mの展望塔へ。旧市街広場と赤い屋根の海を見渡す360度の大パノラマ（徒歩すぐ）", icon: "🕰", important: true, url: "https://prague.eu/en/objevujte/old-town-hall-with-astronomical-clock-staromestska-radnice-s-orlojem/", mapUrl: "https://maps.google.com/?q=Old+Town+Hall+Prague", coords: [50.0870, 14.4207], image: ASTRONOMICAL_CLOCK_IMAGE },
      { time: "15:15", label: "Youngmann House チェックイン", desc: "宿に戻りチェックイン。ダブルまたはツインルームで荷解き＆ひと息ついて夕暮れ観光の身支度（徒歩5分）", icon: "🏨", important: true, mapUrl: "https://maps.google.com/?q=Youngmann+House+Jungmannovo+n%C3%A1m%C4%9Bst%C3%AD+14+Prague", coords: [50.0837, 14.4205] },
      { time: "16:00", label: "旧市街橋塔 ＆ カレル橋トワイライト", desc: "【コース3】11月の日没は16:15頃！旧市街橋塔の上から、夕暮れに染まるヴルタヴァ川とライトアップされ始めたカレル橋・対岸のプラハ城を一望。その後、ガス灯が灯るカレル橋を渡り、聖ヤン・ネポムツキー像のレリーフに触れて幸運と再訪を祈願（徒歩10分）", icon: "🌉", important: true, url: "https://prague.eu/en/objevujte/old-town-bridge-tower-staromestska-mostecka-vez/", mapUrl: "https://maps.google.com/?q=Charles+Bridge+Prague", coords: [50.0865, 14.4114], image: CHARLES_BRIDGE_IMAGE },
      { time: "17:15", label: "マラー・ストラーナ ＆ カンパ島散策", desc: "【コース4】カレル橋を渡った先の小地区。ヴルタヴァ川沿いの静かなカンパ島、水車小屋の景観、平和のシンボル「ジョン・レノンの壁」をそぞろ歩き（徒歩すぐ）", icon: "🎨", mapUrl: "https://maps.google.com/?q=Lennon+Wall+Prague", coords: [50.0862, 14.4069] },
      { time: "18:30", label: "ディナー ＆ ヴルタヴァ川の夜景", desc: "【ディナー】カレル橋の夜景を目の前に望むリバーサイドレストラン「Mlýnec」または1902年創業の伝統サロン「Café Louvre」で優雅な夫婦ディナー", icon: "🍽", important: true, coords: [50.0858, 14.4137] },
      { time: "21:00", label: "夜景散策 ＆ ホテル帰着", desc: "黄金色に輝くカレル橋や旧市街の夜景を眺めながら、Youngmann Houseへ徒歩で戻り就寝", icon: "🏨", coords: [50.0837, 14.4205] },
    ],
    dinner: {
      title: "プラハ初日 ディナー候補（夫婦で楽しむ名店）",
      options: [
        {
          name: "Mlýnec（ムリーネツ）",
          genre: "カレル橋を目の前に望む最高峰モダンチェコ料理",
          desc: "カレル橋のたもと、ヴルタヴァ川に面した特等席。ミシュラン推奨。ライトアップされた橋を眺めながら、洗練されたモダンチェコ料理とワインを味わうロマンチックな夜に",
          tel: "+420 277 000 777",
          url: "https://www.mlynec.cz/",
          mapUrl: "https://maps.google.com/?q=Mlynec+Restaurant+Prague",
          coords: [50.0858, 14.4137],
        },
        {
          name: "Café Louvre（カフェ・ルーヴル）",
          genre: "1902年創業のアールヌーヴォー伝統カフェレストラン",
          desc: "カフカやアインシュタインが愛した優美なピンクのサロン。ホテルから徒歩3分。伝統チェコ料理（グヤーシュや鴨のロースト）を気品ある空間でリーズナブルに楽しめます",
          tel: "+420 224 930 949",
          url: "https://www.cafelouvre.cz/en",
          mapUrl: "https://maps.google.com/?q=Cafe+Louvre+Prague",
          coords: [50.0821, 14.4184],
        },
        {
          name: "Lokál Dlouhááá（ロカール）",
          genre: "活気あふれる最高品質タンク生ビール＆チェコ家庭料理",
          desc: "アンビアンテ系列の超人気店。徹底管理された新鮮なピルスナー・ウルケル（ハラディンカ）と、手作りのチェコ伝統家庭料理をカジュアルに堪能",
          tel: "+420 734 283 874",
          url: "https://lokal-dlouha.ambi.cz/en/",
          mapUrl: "https://maps.google.com/?q=Lokal+Dlouha+Prague",
          coords: [50.0903, 14.4258],
        },
      ],
    },
    booking: {
      title: "鉄道チケット（ウィーン → プラハ）",
      details: [
        { label: "推奨列車", value: "Railjet 72（直通）" },
        { label: "後発候補", value: "Railjet 256（09:10発 → 13:23着）" },
        { label: "区間", value: "ウィーン中央駅（Wien Hbf）→ プラハ本駅（Praha hl.n.）" },
        { label: "出発", value: "2026年11月22日（日）07:10発" },
        { label: "到着", value: "2026年11月22日（日）11:23着" },
        { label: "所要時間", value: "4時間13分" },
        { label: "運賃目安", value: "早割 €14.90〜 ＋ 指定席 €3 / 人" },
        { label: "予約先", value: "ÖBB公式サイト（oebb.at）または ČDチェコ鉄道（cd.cz）" },
      ],
      url: "https://www.oebb.at/en/",
    },
    memo: {
      bg: "linear-gradient(135deg,#eef8f0,#e8f5ec)",
      border: "#b8e0c8",
      titleColor: "#2a6a4a",
      textColor: "#1a4a30",
      icon: "🇨🇿",
      title: "プラハ初日 到着＆旧市街・カレル橋メモ",
      body: (
        <>
          <b>市内交通（PID 24時間券）</b>：車内または駅改札のオレンジ色端末にクレカタッチで購入（150 CZK/人・約¥1,000）。地下鉄・トラムが24時間乗り放題。<br/>
          <b>U Pinkasů（ウ・ピンカスー）</b>：宿（Youngmann House）の目の前。1843年創業。名物「スヴィーチコヴァー」は必食。<br/>
          <b>旧市庁舎 天文時計＆展望塔</b>：毎正時（9:00〜23:00）に使徒のからくり行進。展望塔はエレベーター完備（大人350 CZK）。広場と赤い屋根の街並みが一望できます。<br/>
          <b>旧市街橋塔＆トワイライト</b>：11月の日没は16:15頃。日没30分前の15:45〜16:00頃に橋塔へ上がると、夕暮れからガス灯・ライトアップへの美しいグラデーションを楽しめます（大人250 CZK）。<br/>
          <b>ディナー予約</b>：日曜日夜のMlýnecやCafé Louvreは事前予約（webまたは英語）を推奨。
        </>
      ),
    },
    extraBookings: [
      {
        key: "youngmann-house-prague",
        icon: "🏨",
        title: "Youngmann House（プラハ 2泊）",
        mapUrl: "https://maps.google.com/?q=Youngmann+House+Prague",
        details: [
          { label: "施設名", value: "Youngmann House" },
          { label: "住所", value: "Jungmannovo náměstí 757/14, 110 00 Praha 1, Czech Republic" },
          { label: "宿泊期間", value: "2026年11月22日（日）〜 11月24日（火）（2泊）" },
          { label: "部屋・人数", value: "ダブルまたはツインルーム ／ 大人2名" },
          { label: "チェックイン", value: "2026年11月22日（日）15:00〜" },
          { label: "チェックアウト", value: "2026年11月24日（火）午前" },
          { label: "料金", value: "¥28,407（支払い合計）／換算目安 ¥27,579" },
          { label: "予約状況", value: "Booking.com 予約済・返金不可" },
        ],
      },
    ],
  },
  {
    day: 6,
    date: "11月23日（月）",
    title: "プラハ ─ 絶景トラム22番・ストラホフ修道院・プラハ城・黄金の小路 ＆ 市民会館アールヌーヴォー",
    color: "#3a7a5a",
    icon: "🏰",
    schedule: [
      { time: "08:45", label: "ホテル出発 → トラム22番で丘の上へ", desc: "徒歩4分の国民劇場（Národní divadlo）停留所から名物トラム22番に乗車。ヴルタヴァ川を渡りマラー・ストラーナの坂を登る「動く展望台」を楽しみ、ストラホフ修道院最寄りの「Pohořelec」駅へ（約20分）", icon: "🚋", coords: [50.0811, 14.4138] },
      { time: "09:15", label: "ストラホフ修道院図書館（Strahovská knihovna）", desc: "【コース1】世界一美しいと称されるバロック様式の修道院図書館。壮大な天井フレスコ画が広がる「哲学の間」と「神学の間」を、混雑前の静かな朝一番にゆったり鑑賞（徒歩すぐ・入場150 CZK）", icon: "📚", important: true, url: "https://www.strahovskyklaster.cz/en/", mapUrl: "https://maps.google.com/?q=Strahov+Monastery+Library+Prague", coords: [50.0866, 14.3891], image: STRAHOV_LIBRARY_IMAGE },
      { time: "10:15", label: "ロレッタ教会前 ＆ フラッチャニ広場 展望テラス", desc: "【コース2】バロック建築のロレッタ教会前を通りプラハ城正門前のフラッチャニ広場へ。展望テラスから眼下に広がるプラハ市街の赤い屋根の海を一望（徒歩10分）", icon: "🏛", mapUrl: "https://maps.google.com/?q=Hradcany+Square+Prague", coords: [50.0895, 14.3980] },
      { time: "10:45", label: "プラハ城（Pražský hrad）メインサーキット", desc: "【コース3】千年の歴史を誇る世界最大級の城郭。聖ヴィート大聖堂（St. Vitus）の圧巻のゴシック建築とアルフォンス・ミュシャ（ムハ）制作の息をのむステンドグラス『聖キリルと聖メトディウス』、旧王宮の壮大なヴラディスラフ・ホール、聖イジー聖堂を見学（メインサーキットチケット 450 CZK）", icon: "🏰", important: true, url: "https://www.hrad.cz/en", mapUrl: "https://maps.google.com/?q=Prague+Castle", coords: [50.0909, 14.4005], image: ST_VITUS_CATHEDRAL_IMAGE },
      { time: "12:15", label: "黄金の小路（Zlatá ulička）", desc: "【コース4】城壁沿いに並ぶパステルカラーの可愛らしい小さな家々。かつて錬金術師や城警備兵が暮らし、作家フランツ・カフカが一時期仕事場とした22番の青い家を見学（サーキットチケットに含まれる・徒歩すぐ）", icon: "🏘", important: true, mapUrl: "https://maps.google.com/?q=Golden+Lane+Prague", coords: [50.0919, 14.4040], image: GOLDEN_LANE_IMAGE },
      { time: "13:00", label: "Kuchyň（クヒィニ）で絶景テラスランチ", desc: "【ランチ】プラハ城正門前（サラーバ宮殿テラス）。アンビアンテ系列。厨房の大鍋のフタを開けて好みの料理を直接選ぶユニークな伝統チェコ料理店。プラハの街並みを見下ろすパノラマテラスで極上のピルスナー生とチェコ料理を堪能（徒歩10分）", icon: "🍽", important: true, url: "https://kuchyn.ambi.cz/en/", mapUrl: "https://maps.google.com/?q=Kuchyn+Restaurant+Prague+Castle", coords: [50.0894, 14.3972] },
      { time: "14:30", label: "旧登城道（Staré zámecké schody）を下り新市街へ", desc: "【散策】プラハ城東門からブドウ畑沿いの「旧登城道」階段を下り、マラー・ストラーナ側へ。地下鉄A線「Malostranská」またはトラムでヴルタヴァ川を渡り「Náměstí Republiky（共和国広場）」へ移動（約15分）", icon: "🚶", coords: [50.0918, 14.4098] },
      { time: "15:30", label: "市民会館（Obecní dům）＆ 火薬塔（Prašná brána）", desc: "【コース5】プラハ・アールヌーヴォー建築の最高傑作。アルフォンス・ミュシャが壁画と天井画を手掛けた「市長の間」やスメタナホール、隣接する15世紀ゴシック様式の火薬塔を鑑賞（徒歩すぐ）", icon: "🏛", important: true, url: "https://www.obecnidum.cz/en/", mapUrl: "https://maps.google.com/?q=Municipal+House+Prague", coords: [50.0877, 14.4282], image: MUNICIPAL_HOUSE_IMAGE },
      { time: "16:30", label: "Kavárna Obecní dům または Café Imperialでカフェ休憩", desc: "【カフェ】市民会館1階の華麗なアールヌーヴォーカフェ、または徒歩5分の「Café Imperial」へ。大理石のテーブルとシャンデリアの下、名物ケーキとヴィエナコーヒーで優雅なティータイム", icon: "☕", important: true, url: "https://www.cafeimperial.cz/en/", mapUrl: "https://maps.google.com/?q=Cafe+Imperial+Prague", coords: [50.0898, 14.4326] },
      { time: "18:30", label: "Café Imperial で優雅なディナー", desc: "【ディナー】1914年創業、壁一面の陶器モザイク装飾が息をのむ美しさのアールデコ名店（ミシュラン選出）。有名シェフZdeněk Pohlreichによる名物「仔牛の頬肉の赤ワイン煮込み」や伝統スヴィーチコヴァーで特別な夫婦ディナー（要事前予約）", icon: "🍽", important: true, url: "https://www.cafeimperial.cz/en/", mapUrl: "https://maps.google.com/?q=Cafe+Imperial+Prague", coords: [50.0898, 14.4326] },
      { time: "20:30", label: "夜のヴァーツラフ広場散策 ＆ ホテル帰着", desc: "共和国広場からヴァーツラフ広場を通り、ライトアップされた国立博物館を遠望しながらYoungmann Houseへ徒歩で帰着。翌朝の帰国フライトに向けて荷造り・就寝", icon: "🧳", coords: [50.0837, 14.4205] },
    ],
    dinner: {
      title: "プラハ2日目 ディナー候補（アールデコ名店＆伝統料理）",
      options: [
        {
          name: "Café Imperial（カフェ・インペリアル）",
          genre: "1914年創業・壁一面の陶器モザイクが壮麗なアールデコ名店",
          desc: "ミシュランガイド選出。有名シェフ監修の「仔牛の頬肉の赤ワイン煮込み」や洗練されたチェコ料理。歴史的宮殿のような贅沢な空間で夫婦の忘れられない夜に",
          tel: "+420 246 011 440",
          url: "https://www.cafeimperial.cz/en/",
          mapUrl: "https://maps.google.com/?q=Cafe+Imperial+Prague",
          coords: [50.0898, 14.4326],
        },
        {
          name: "Plzeňská restaurace v Obecním domě",
          genre: "市民会館地下の壮麗なアールヌーヴォー伝統ビアホール",
          desc: "美しい陶器タイルとステンドグラスに囲まれたアールヌーヴォー地下ホール。伝統的なローストポーク、鴨料理、焼きたてプレッツェルとピルスナー生",
          tel: "+420 222 002 780",
          url: "https://www.plzenskarestaurace.cz/en/",
          mapUrl: "https://maps.google.com/?q=Plzenska+restaurace+v+Obecnim+dome",
          coords: [50.0877, 14.4282],
        },
        {
          name: "Čestr（チェストル）",
          genre: "熟成チェコ牛ステーキとクラフトビールのモダン名店",
          desc: "アンビアンテ系列のモダン肉料理店。国立博物館そば。チェコ原産の熟成牛を炭火で焼き上げる絶品ステーキを落ち着いたモダンな空間で堪能",
          tel: "+420 734 684 000",
          url: "https://cestr.ambi.cz/en/",
          mapUrl: "https://maps.google.com/?q=Cestr+Restaurant+Prague",
          coords: [50.0802, 14.4312],
        },
      ],
    },
    memo: {
      bg: "linear-gradient(135deg,#f0f8f4,#eaf5f0)",
      border: "#b0dcc8",
      titleColor: "#1a6a40",
      textColor: "#0a3a20",
      icon: "🏰",
      title: "プラハ城・ストラホフ修道院・市民会館 観光メモ",
      body: (
        <>
          <b>トラム22番の活用</b>：プラハ城へ徒歩で登ると長い急坂になりますが、トラム22番で「Pohořelec」まで上がると、ストラホフ修道院からプラハ城へ下り勾配で楽に周遊できます。<br/>
          <b>ストラホフ修道院図書館</b>：開館 9:00〜17:00（12:00〜13:00昼休み休館あり）。入場料 150 CZK。朝一番（9:15頃）が最も空いていて美しい光が差し込みます。<br/>
          <b>プラハ城 メインサーキット</b>：大人 450 CZK（2日間有効）。聖ヴィート大聖堂、旧王宮、聖イジー聖堂、黄金の小路に入場可能。聖ヴィート大聖堂のミュシャ（ムハ）ステンドグラスは必見。<br/>
          <b>Kuchyň（クヒィニ）</b>：プラハ城正門前サラーバ宮殿テラス。大鍋から直接料理を選ぶスタイルで、味もロケーションもプラハ屈指（web予約推奨）。<br/>
          <b>市民会館（Obecní dům）</b>：1階カフェ（Kavárna）は予約なしで利用可能。内部ガイドツアー（英語）に参加するとミュシャ装飾の「市長の間」に入場できます。<br/>
          <b>Café Imperial</b>：ディナーは大変人気のため、日本出発前に公式サイト（cafeimperial.cz）からテーブル予約を強く推奨します。
        </>
      ),
    },
  },
  {
    day: 7,
    date: "11月24日（火）",
    title: "朝のカレル橋静寂散歩 ＆ カフェ・ルーヴル朝食 ─ 空港出発 ─ ドバイ乗継",
    color: "#7a5a3a",
    icon: "🛫",
    schedule: [
      { time: "07:30", label: "朝の静寂のカレル橋 散策", desc: "【朝散歩】昼間の喧騒とは打って変わり、澄んだ空気と朝霧に包まれる早朝のカレル橋。朝日を浴びるプラハ城とヴルタヴァ川を眺めながら、ご夫婦で静かに記念撮影（ホテルから徒歩10分）", icon: "🌅", important: true, coords: [50.0865, 14.4114] },
      { time: "08:30", label: "Café Louvre（カフェ・ルーヴル）で優雅な朝食", desc: "【朝食】1902年創業の歴史的グランドカフェ（ホテル徒歩3分）。カフカやアインシュタインが過ごした気品あふれるサロンで、焼きたてオムレツやペストリー、ホットチョコレートの朝食をゆったり味わう", icon: "☕", important: true, url: "https://www.cafelouvre.cz/en", mapUrl: "https://maps.google.com/?q=Cafe+Louvre+Prague", coords: [50.0821, 14.4184] },
      { time: "09:30", label: "Youngmann House チェックアウト ＆ 荷造り", desc: "宿に戻りチェックアウト。荷物をピックアップし、空港移動の身支度を完了", icon: "🧳", important: true, mapUrl: "https://maps.google.com/?q=Youngmann+House+Jungmannovo+n%C3%A1m%C4%9Bst%C3%AD+14+Prague", coords: [50.0837, 14.4205] },
      { time: "10:30", label: "Youngmann House 発 → プラハ空港へ移動", desc: "地下鉄A線「Můstek」から直通10分で「Nádraží Veleslavín」駅へ。トロリーバス59番に乗換えて約17分でプラハ空港第1ターミナルへ到着（総所要約45分・90分券またはクレカタッチで約50 CZK/人）", icon: "🚌", important: true, mapUrl: "https://maps.google.com/?q=Youngmann+House+Jungmannovo+n%C3%A1m%C4%9Bst%C3%AD+14+Prague", coords: [50.0837, 14.4205] },
      { time: "11:45", label: "プラハ・ヴァーツラフ・ハヴェル空港 着", desc: "出発3時間前。第1ターミナル（非シェンゲン域便）にてエミレーツ航空チェックイン、手荷物預け、免税手続き（Tax Refund）、保安検査、出国審査", icon: "✈", important: true, coords: [50.1008, 14.26] },
      { time: "14:45 PRG", label: "プラハ（PRG）出発", desc: "EK140・エミレーツ。第1ターミナル。Airbus A380-800／飛行5時間55分。JST 22:45", icon: "✈", important: true, coords: [50.1008, 14.26] },
      { time: "23:40 DXB", label: "ドバイ（DXB）着", desc: "EK140到着。乗継 3時間15分の深夜乗継。ターミナル3内で乗り継ぎ。JST 翌04:40頃", icon: "🇦🇪" },
      { time: "02:55 DXB", label: "ドバイ（DXB）発", desc: "EK318・エミレーツ。Airbus A380-800／飛行9時間25分。日付は11月25日（水）", icon: "😴" },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f8f0e8,#f5ebe0)",
      border: "#e0c8a8",
      titleColor: "#8a5a20",
      textColor: "#5a3a10",
      icon: "✈",
      title: "プラハ最終日 空港アクセス＆フライトメモ",
      body: (
        <>
          <b>朝のカレル橋（必見）</b>：日中は世界中からの観光客で混み合いますが、早朝7:30〜8:00は静寂に包まれ、写真撮影に最高の時間帯です。<br/>
          <b>空港アクセス（地下鉄A線＋トロリーバス59番）</b>：宿最寄りのMůstek駅から地下鉄A線で約10分の「Nádraží Veleslavín」へ。地上に出てすぐのバス乗り場から最新の連結トロリーバス59番に乗車（約17分・約5〜10分間隔で運行）。第1ターミナル（Terminal 1）で降車。90分券（40〜50 CZK）1枚で通し乗車可能です。<br/>
          <b>第1ターミナル（非シェンゲン便）</b>：日本・ドバイ行きは第1ターミナル発。出国審査と保安検査が出発ゲート直前にあるため、時間に余裕を持って行動を。<br/>
          <b>ドバイ深夜乗継</b>：3時間15分。ターミナル3のカフェやラウンジで休憩し、成田行きEK318便へ搭乗。
        </>
      ),
    },
    booking: {
      title: "エミレーツ航空券（復路）",
      details: [
        { label: "予約番号", value: "K78ZN2" },
        { label: "搭乗者", value: "Mr Hiroki Nomura ／ Ms Rino Nomura" },
        { label: "区間", value: "プラハ → ドバイ → 東京（成田）" },
        { label: "便名", value: "EK140 ／ EK318" },
        { label: "出発", value: "2026年11月24日（火）14:45 プラハ（PRG）" },
        { label: "到着", value: "2026年11月25日（水）17:20 成田（NRT）" },
        { label: "所要時間", value: "18時間35分（ドバイ乗継 3時間15分）" },
        { label: "機材", value: "Airbus A380-800（両便）" },
        { label: "運賃", value: "エコノミー ／ Saver（確定）" },
      ],
      url: "https://www.emirates.com/jp/japanese/manage-booking/",
    },
  },
  {
    day: 8,
    date: "11月25日（水）",
    title: "成田着 ─ 帰国",
    color: "#5a6a8a",
    icon: "🏠",
    schedule: [
      { time: "02:55 DXB", label: "ドバイ（DXB）発", desc: "EK318・エミレーツ。Airbus A380-800／飛行9時間25分", icon: "✈" },
      { time: "17:20 NRT", label: "成田（NRT）着", desc: "第2ターミナル。Visit Japan Web の入国・税関申告は機内で済ませておくと並ばずに済む", icon: "🏁", important: true },
      { time: "18:30頃", label: "入国・手荷物受取 完了", desc: "首都圏外へ向かう場合、この時刻から在来線＋新幹線の最終に間に合うか事前確認を。厳しければ都内1泊を検討", icon: "🚄" },
    ],
    memo: {
      bg: "linear-gradient(135deg,#eef4f8,#e8f0f5)",
      border: "#b8cce0",
      titleColor: "#2a4a6a",
      textColor: "#1a3050",
      icon: "📱",
      title: "帰国前に済ませておくこと",
      body: (
        <>
          <b>Visit Japan Web</b>：乳幼児を含む全員分。入国審査・税関申告をオンライン登録。ドバイ→成田の機内で完了させると成田での列が短い。予約画面にも必須と明記あり<br/>
          <b>⚠ 出発空港に注意</b>：出発は羽田（HND）、帰着は成田（NRT）。羽田に車を置いた・羽田で買い物した、という前提は使えません<br/>
          <b>首都圏外への最終</b>：成田18:30頃発を起算点に在来線＋新幹線の終電を確認。厳しければ都内1泊が安全
        </>
      ),
    },
  },
];

const COSTS = [
  { item: "エミレーツ 往復航空券（大人2名・エコノミー）", cost: 457440, note: "予約済・予約番号 K78ZN2 ／ 運賃¥222,400・航空会社サーチャージ¥202,400・税金等¥32,640" },
  { item: "ブダペスト 2泊（Budapest Panorama Central）", cost: 26397, note: "予約済 換算目安 ¥26,397（スーペリア ダブルルーム スパバス付・2泊）" },
  { item: "ドナウ川 ナイトクルーズ（ウェルカムドリンク付・2名）", cost: 6000, note: "GetYourGuide 約€18×2名（約¥6,000）" },
  { item: "鉄道 ブダペスト→ウィーン（2名）", cost: 0, note: "手配要 早割€13〜/人（MÁV）または €19.90〜/人（ÖBB）" },
  { item: "鉄道 ウィーン→プラハ（2名）", cost: 0, note: "手配要 早割€14.90〜/人（ÖBB）または €15〜/人（RegioJet）" },
  { item: "ウィーン 2泊（ARCOTEL Wimberger Wien・2名）", cost: 40277, note: "予約済・支払済 €198.61（約¥40,277／税・サービス料込み）・予約番号 5340692962" },
  { item: "プラハ 2泊（Youngmann House・2名）", cost: 28407, note: "予約済・支払済 Booking.com（¥28,407／換算目安¥27,579）・返金不可" },
  { item: "空港バス 100E（ブダペスト空港→Astoria、2名）", cost: 2100, note: "2,500HUF×2名（クレカタッチ決済 約¥2,100）" },
  { item: "ブダペスト市内交通 24時間券（2名）", cost: 2100, note: "2,500HUF×2名（地下鉄・トラム乗り放題 約¥2,100）" },
  { item: "ウィーン市内交通 48時間券（2名）", cost: 4650, note: "€14.10×2名（WienMobilアプリまたは券売機 約¥4,650・乗り放題）" },
  { item: "国会議事堂 ガイドツアー（2名・任意）", cost: 0, note: "見学希望時 14,000HUF×2名（約¥11,600・要事前予約）／外観散策は無料" },
  { item: "シェーンブルン宮殿 グランドツアー（2名・任意）", cost: 0, note: "大人約€32×2名（要事前予約・日本語オーディオ付）" },
  { item: "ベルヴェデーレ上宮 入場券（2名・任意）", cost: 0, note: "大人約€19×2名（クリムト『接吻』・要日時指定予約）" },
  { item: "国立図書館 プルンクザール（2名・任意）", cost: 0, note: "大人€10×2名（約¥3,300）" },
  { item: "ブダ城 ＆ 英雄広場 散策", cost: 0, note: "外観・敷地散策無料（シクロー利用時 往復約5,000HUF/人）" },
  { item: "宿泊税 ブダペスト（室料の4%×2泊）", cost: 1000, note: "現地ホテル払い 目安約¥1,000" },
  { item: "宿泊税 ウィーン", cost: 0, note: "宿泊料金に市税5%を含む（追加支払いなし）" },
  { item: "宿泊税 プラハ（50CZK×2名×2泊）", cost: 0, note: "現地払い 約¥1,200" },
];

// ─── ヘルパー ──────────────────────────────────────────────────────────────────

const WebLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" className="eu-tl-icon-link"
    style={{ textDecoration:"none", fontSize:".82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }}
    aria-label="公式サイト" onClick={e => e.stopPropagation()}>
    <span aria-hidden="true">🌐</span>
  </a>
) : null;

const MapLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" className="eu-tl-icon-link"
    style={{ textDecoration:"none", fontSize:".82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }}
    aria-label="Google Map" onClick={e => e.stopPropagation()}>
    <span aria-hidden="true">📍</span>
  </a>
) : null;

const PhotoLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" className="eu-tl-icon-link"
    style={{ textDecoration:"none", fontSize:".82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }}
    aria-label="予約写真" onClick={e => e.stopPropagation()}>
    <span aria-hidden="true">📷</span>
  </a>
) : null;

const HistoryDiagram = ({ diagram }) => {
  if (!diagram) return null;

  return (
    <figure className={`eu-history-diagram eu-history-diagram-${diagram.type}`}>
      <figcaption className="eu-history-diagram-title">{diagram.title}</figcaption>
      <ol className="eu-history-diagram-track">
        {diagram.items.map((item, index) => (
          <li className="eu-history-diagram-step" key={`${item.marker}-${item.label}`}>
            <span className="eu-history-diagram-marker" aria-hidden="true">{item.marker}</span>
            <strong className="eu-history-diagram-label">{item.label}</strong>
            <span className="eu-history-diagram-text">{item.text}</span>
            {index < diagram.items.length - 1 && (
              <span className="eu-history-diagram-arrow" aria-hidden="true">→</span>
            )}
          </li>
        ))}
      </ol>
      {diagram.caption && <p className="eu-history-diagram-caption">{diagram.caption}</p>}
    </figure>
  );
};

const HistorySourceLinks = ({ sources }) => {
  if (!sources?.length) return null;

  return (
    <div className="eu-history-sources">
      <span className="eu-history-sources-label">参考：</span>
      {sources.map((source) => (
        <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">🌐</span> {source.label}
        </a>
      ))}
    </div>
  );
};

const HistorySpot = ({ spot, hideHeading = false }) => {
  const longHistory = SPOT_LONG_HISTORY[spot.name];
  const keyFacts = SPOT_KEY_FACTS[spot.name];

  return (
    <article className="eu-history-card">
      {!hideHeading && (
        <div className="eu-history-card-heading">
          <p className="eu-history-era">{spot.era}</p>
          <h4 className="eu-history-card-title">{spot.name}</h4>
        </div>
      )}
      <div className="eu-history-card-content">
        <div className="eu-history-card-copy">
          <div className="eu-history-fact">
            <strong>歴史・成り立ち</strong>
            <p>{spot.summary}</p>
          </div>
          <div className="eu-history-fact">
            <strong>関係する人物</strong>
            <p>{spot.people}</p>
          </div>
          <div className="eu-history-fact eu-history-fact-highlight">
            <strong>現地で見るポイント</strong>
            <p>{spot.see}</p>
          </div>
        </div>
        {spot.image && <PlacePreview image={spot.image} variant="history" />}
      </div>
      {keyFacts && (
        <div className="eu-history-key-facts">
          <h5>歴史を読むための3つの要点</h5>
          <ul>
            {keyFacts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        </div>
      )}
      {longHistory && (
        <div className="eu-history-detail eu-history-detail-inline">
          <div className="eu-history-reading-label">詳しい背景</div>
          <div className="eu-history-detail-body">
            {longHistory.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      )}
      <HistoryDiagram diagram={spot.diagram} />
      <HistorySourceLinks sources={spot.sources} />
    </article>
  );
};

const CityFoodPanel = ({ culture }) => {
  if (!culture) return null;

  return (
    <section className="eu-history-life" aria-label="町と食文化">
      <h3 className="eu-history-life-title">町と食文化</h3>
      <div className="eu-history-life-grid">
        <article className="eu-life-card eu-town-card">
          <p className="eu-history-kicker">町の成り立ち</p>
          <h4>{culture.city.title}</h4>
          <p className="eu-life-summary">{culture.city.summary}</p>
          {culture.city.image && <PlacePreview image={culture.city.image} variant="history" />}
          <div className="eu-history-detail eu-history-detail-inline">
            <div className="eu-history-reading-label">町の背景</div>
            <div className="eu-history-detail-body">
              {culture.city.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <h5 className="eu-life-subtitle">地区で見る町の構造</h5>
          <ol className="eu-town-districts">
            {culture.city.districts.map((district) => (
              <li key={district.name}>
                <strong>{district.name}</strong>
                <span className="eu-town-district-role">{district.role}</span>
                <p>{district.story}</p>
              </li>
            ))}
          </ol>
          <HistoryDiagram diagram={culture.city.diagram} />
          <HistorySourceLinks sources={culture.city.sources} />
        </article>

        <article className="eu-life-card eu-food-card">
          <p className="eu-history-kicker">食べ物の背景</p>
          <h4>この旅で出会う味</h4>
          <HistoryDiagram diagram={culture.foodDiagram} />
          <div className="eu-food-list">
            {culture.foods.map((food) => (
              <article className="eu-food-item" key={food.name}>
                <h5 className="eu-food-item-title">
                  <span aria-hidden="true">{food.icon}</span> {food.name}
                </h5>
                {food.image && <PlacePreview image={food.image} variant="history" />}
                <p className="eu-life-summary">{food.summary}</p>
                <div className="eu-history-detail eu-history-detail-inline">
                  <div className="eu-history-reading-label">食の背景</div>
                  <div className="eu-history-detail-body">
                    <p>{food.detail}</p>
                    <p><strong>現地での楽しみ方：</strong>{food.onTrip}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

const StoryTimeline = ({ title, icon, entries, variant, placeDetails = [] }) => (
  <details className={`eu-story-section eu-story-section-${variant}`} open>
    <summary className="eu-story-section-summary">
      <span aria-hidden="true">{icon}</span> {title}
    </summary>
    <div className="eu-story-section-body">
      <ol className="eu-story-timeline">
        {entries.map((entry, index) => (
          <li className={`eu-story-item ${entry.kind === "food" ? "eu-story-item-food" : ""}`} key={`${variant}-${entry.title}`}>
            <div className="eu-story-node" aria-hidden="true">{index + 1}</div>
            <article className="eu-story-card">
              <p className="eu-story-era">{entry.era}</p>
              <p className={`eu-story-kind ${entry.kind === "food" ? "eu-story-kind-food" : "eu-story-kind-history"}`}>
                {entry.kind === "food" ? "食文化" : "歴史・町"}
              </p>
              <h4 className="eu-story-title">{entry.title}</h4>
              <p className="eu-story-summary">{entry.summary}</p>
              {entry.links?.length > 0 && (
                <div className="eu-story-links">
                  <span className="eu-story-links-label">関連する場所：</span>
                  {entry.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                      <span aria-hidden="true">📍</span> {link.label}
                    </a>
                  ))}
                </div>
              )}
              {entry.image && <PlacePreview image={entry.image} variant="history-story" />}
              {entry.detail?.length > 0 && (
                <div className="eu-history-detail eu-history-detail-inline">
                  <div className="eu-history-reading-label">背景を深く読む</div>
                  <div className="eu-history-detail-body">
                    {entry.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              )}
              <HistoryDiagram diagram={entry.diagram} />
            </article>
          </li>
        ))}
      </ol>
      {placeDetails.length > 0 && (
        <div className="eu-story-place-details">
          <h4 className="eu-story-place-title">この流れに登場する訪問場所</h4>
          <div className="eu-story-place-list">
            {placeDetails.map((spot) => (
              <details className="eu-story-place-detail" key={spot.name}>
                <summary>
                  <span aria-hidden="true">📍</span> {spot.name}
                  <span className="eu-story-place-era">{spot.era}</span>
                </summary>
                <HistorySpot spot={spot} hideHeading />
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  </details>
);

const HistoryPanel = ({ history }) => {
  if (!history) {
    return (
      <section className="eu-history-panel" aria-label="本日の歴史・背景">
        <div className="eu-history-empty">
          <h3>本日の歴史ガイド</h3>
          <p>今日は移動が中心の日です。到着後に訪れる街の歴史は、次の観光日のタブからご覧いただけます。</p>
        </div>
      </section>
    );
  }

  const countryLongHistory = COUNTRY_LONG_HISTORY[history.country.name];
  const cityStory = CITY_STORY[history.country.name];

  return (
    <section className="eu-history-panel" aria-label={`${history.country.name}の歴史・背景`}>
      <div className="eu-history-country">
        <p className="eu-history-kicker">今日の国</p>
        <h3 className="eu-history-country-title">
          <span aria-hidden="true">{history.country.flag}</span> {history.country.name}
        </h3>
        <p className="eu-history-country-summary">{history.country.summary}</p>
        <p className="eu-history-country-focus">{history.country.focus}</p>
        {countryLongHistory && (
          <div className="eu-history-detail eu-history-detail-inline eu-history-country-detail">
            <div className="eu-history-reading-label">国の歴史を時代順に読む</div>
            <div className="eu-history-detail-body">
              {countryLongHistory.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        )}
        <HistoryDiagram diagram={history.country.diagram} />
        <HistorySourceLinks sources={history.country.sources} />
      </div>

      {cityStory && (
        <div className="eu-story-panel">
          <StoryTimeline
            title="歴史と暮らしの流れ"
            icon="📖"
            entries={cityStory.history.map((entry) => ({ ...entry, kind: "history" }))}
            variant="history"
            placeDetails={history.spots}
          />
        </div>
      )}
    </section>
  );
};

const FoodPanel = ({ history }) => {
  if (!history) {
    return (
      <section className="eu-history-panel" aria-label="本日の食文化">
        <div className="eu-history-empty">
          <h3>本日の食文化ガイド</h3>
          <p>今日は移動が中心の日です。到着後の食文化は、観光日のタブからご覧いただけます。</p>
        </div>
      </section>
    );
  }

  const cityStory = CITY_STORY[history.country.name];
  if (!cityStory) return null;

  return (
    <section className="eu-history-panel" aria-label={`${history.country.name}の食文化`}>
      <div className="eu-history-country">
        <p className="eu-history-kicker">今日の食文化</p>
        <h3 className="eu-history-country-title">
          <span aria-hidden="true">{history.country.flag}</span> {history.country.name}の食卓
        </h3>
        <p className="eu-history-country-summary">
          料理を単独の名物としてではなく、町の成り立ち、交易、身分、宗教、季節の行事と結びついた暮らしとして読みます。
        </p>
      </div>
      <div className="eu-story-panel">
        <StoryTimeline
          title="食文化の流れ"
          icon="🍽"
          entries={cityStory.food.map((entry) => ({ ...entry, kind: "food" }))}
          variant="food"
        />
      </div>
    </section>
  );
};

const handleCardKeyDown = (e, callback) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); }
};

const formatShortDate = (date) => {
  const m = date.match(/(\d+)月(\d+)日（(.)）/);
  return m ? `${m[1]}/${m[2]}(${m[3]})` : "";
};

// ─── コンポーネント ────────────────────────────────────────────────────────────

export default function EuropeTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const [activePanel, setActivePanel] = useState("timeline");
  const [showCost, setShowCost] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const totalFixed = COSTS.filter(c => c.cost > 0).reduce((s, c) => s + c.cost, 0);
  const historyForDay = DAY_HISTORY[DAYS[activeDay].day];

  return (
    <div style={{ fontFamily:"'Noto Serif JP','Hiragino Mincho ProN',serif", background:"#F7F3ED", minHeight:"100vh", color:"#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .eu-cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#0d2847 0%,#1a3f6e 35%,#2a5a9a 58%,#7a3b8f 82%,#a04a7a 100%); overflow:hidden; padding:2rem; }
        .eu-cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(122,59,143,.35) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(13,40,71,.45) 0%,transparent 50%); }
        .eu-cover-pattern { position:absolute; inset:0; opacity:.05; background-image:repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#fff 40px,#fff 41px); }
        .eu-cover-content { position:relative; z-index:2; text-align:center; color:white; animation:euFadeUp 1.2s ease-out; }
        @keyframes euFadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes euFadeIn { from{opacity:0} to{opacity:1} }
        .eu-cover-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.5em; opacity:.8; margin-bottom:1.5rem; }
        .eu-cover-title { font-size:clamp(2rem,6vw,4rem); font-weight:700; letter-spacing:.15em; line-height:1.3; margin-top:0; margin-bottom:.5rem; text-shadow:0 4px 30px rgba(0,0,0,.3); }
        .eu-cover-sub { font-size:clamp(.95rem,2.5vw,1.3rem); font-weight:300; letter-spacing:.3em; opacity:.85; margin-bottom:2rem; }
        .eu-cover-date { font-family:'Zen Maru Gothic',sans-serif; display:inline-block; border:1px solid rgba(255,255,255,.4); padding:.6rem 2rem; font-size:.95rem; letter-spacing:.2em; border-radius:2px; }
        .eu-cover-members { margin-top:2rem; font-size:.95rem; opacity:.85; letter-spacing:.15em; }
        .eu-cover-back { position:absolute; top:1.5rem; left:1.5rem; z-index:3; color:rgba(255,255,255,.7); text-decoration:none; font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.05em; transition:color .2s; }
        .eu-cover-back:hover { color:white; }
        .eu-cover-back:focus-visible { color:white; outline:2px solid white; outline-offset:2px; border-radius:2px; }
        .eu-nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:safe center; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .eu-nav-btn { flex:0 0 auto; font-family:'Zen Maru Gothic',sans-serif; border:none; background:none; padding:1rem 1.2rem; font-size:.82rem; cursor:pointer; color:#6a6058; letter-spacing:.05em; white-space:nowrap; transition:all .3s; border-bottom:2px solid transparent; }
        .eu-nav-btn:hover { color:#2C2421; }
        .eu-nav-btn:focus-visible { color:#2C2421; outline:2px solid #2C2421; outline-offset:-2px; border-radius:2px; }
        .eu-nav-btn.active { color:#2C2421; font-weight:700; border-bottom-color:currentColor; }
        .eu-nav-btn-date { font-size:.72rem; color:#6a6058; letter-spacing:0; display:block; }
        .eu-nav-btn.active .eu-nav-btn-date { color:currentColor; }
        .eu-nav-btn.cost-btn { color:#8B6914; }
        .eu-nav-btn.cost-btn.active { color:#8B6914; border-bottom-color:#8B6914; }
        .eu-day-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:euFadeIn .5s ease-out; }
        .eu-day-header { display:flex; align-items:center; gap:1rem; margin-bottom:.5rem; }
        .eu-day-number { font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; font-weight:700; letter-spacing:.15em; padding:.3rem .8rem; border-radius:2px; color:white; }
        .eu-day-date { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; color:#756d65; letter-spacing:.1em; }
        .eu-day-title { font-size:clamp(1.3rem,3.5vw,1.7rem); font-weight:600; letter-spacing:.06em; margin-bottom:2rem; line-height:1.4; margin-top:0; }
        .eu-view-tabs { display:flex; gap:.35rem; margin-bottom:2rem; border-bottom:1px solid #ded7ce; }
        .eu-view-tab { font-family:'Zen Maru Gothic',sans-serif; border:1px solid transparent; border-bottom:none; border-radius:5px 5px 0 0; background:transparent; color:#6a6058; padding:.65rem .9rem; font-size:.8rem; cursor:pointer; transition:color .2s, background .2s; }
        .eu-view-tab:hover { color:#2C2421; background:#f0ece6; }
        .eu-view-tab[aria-selected="true"] { color:#2C2421; background:white; border-color:#ded7ce; font-weight:700; margin-bottom:-1px; }
        .eu-view-tab:focus-visible { outline:2px solid #2C2421; outline-offset:1px; }
        .eu-history-panel { display:grid; gap:1.5rem; }
        .eu-story-panel { display:grid; gap:1rem; }
        .eu-story-section { overflow:hidden; background:white; border:1px solid #ded7ce; border-radius:6px; box-shadow:0 1px 6px rgba(0,0,0,.04); }
        .eu-story-section-summary { display:flex; align-items:center; gap:.45rem; padding:1rem 1.2rem; color:#2C2421; font-family:'Zen Maru Gothic',sans-serif; font-size:.95rem; font-weight:700; cursor:pointer; list-style-position:inside; }
        .eu-story-section-summary:hover { background:#fbf8f3; }
        .eu-story-section-summary:focus-visible { outline:2px solid #2C2421; outline-offset:-2px; }
        .eu-story-section-body { padding:0 1.2rem 1.2rem; }
        .eu-story-timeline { position:relative; list-style:none; padding:1rem 0 0 2.15rem; margin:0; }
        .eu-story-timeline::before { content:''; position:absolute; left:.42rem; top:1rem; bottom:1rem; width:1px; background:#cfc7bd; }
        .eu-story-item { position:relative; padding-bottom:1.2rem; }
        .eu-story-item:last-child { padding-bottom:0; }
        .eu-story-node { position:absolute; left:-2.15rem; top:.15rem; display:grid; place-items:center; width:1.55rem; height:1.55rem; border:2px solid #2a5a9a; border-radius:50%; background:#fbf8f3; color:#2a5a9a; font-family:'Zen Maru Gothic',sans-serif; font-size:.67rem; font-weight:700; z-index:1; }
        .eu-story-item-food .eu-story-node { border-color:#b06a2a; color:#9a5520; }
        .eu-story-card { border:1px solid #e2dbd2; border-radius:5px; padding:.9rem 1rem; background:#fffefa; }
        .eu-story-era { color:#756d65; font-family:'Zen Maru Gothic',sans-serif; font-size:.72rem; letter-spacing:.08em; margin-bottom:.25rem; }
        .eu-story-kind { display:inline-block; margin-bottom:.35rem; padding:.12rem .45rem; border-radius:3px; font-family:'Zen Maru Gothic',sans-serif; font-size:.66rem; font-weight:700; }
        .eu-story-kind-history { color:#2a5a9a; background:#edf3f9; }
        .eu-story-kind-food { color:#9a5520; background:#fbf1e7; }
        .eu-story-title { color:#2C2421; font-size:1.05rem; line-height:1.45; letter-spacing:.03em; margin:0 0 .5rem; text-wrap:balance; }
        .eu-story-summary { color:#4a4038; font-size:.83rem; line-height:1.8; text-wrap:pretty; }
        .eu-story-links { display:flex; align-items:center; flex-wrap:wrap; gap:.35rem .55rem; margin-top:.75rem; font-family:'Zen Maru Gothic',sans-serif; font-size:.7rem; line-height:1.5; }
        .eu-story-links-label { color:#756d65; }
        .eu-story-links a { color:#2a5a9a; text-underline-offset:2px; }
        .eu-story-links a:hover { color:#1d4374; }
        .eu-story-links a:focus-visible { outline:2px solid currentColor; outline-offset:2px; border-radius:2px; }
        .eu-story-card > .place-preview--history-story { margin:.8rem 0 0; }
        .eu-story-place-details { margin-top:1.2rem; padding-top:1rem; border-top:1px solid #e2dbd2; }
        .eu-story-place-title { color:#5a5048; font-family:'Zen Maru Gothic',sans-serif; font-size:.82rem; margin:0 0 .6rem; }
        .eu-story-place-list { display:grid; gap:.45rem; }
        .eu-story-place-detail { border:1px solid #e2dbd2; border-radius:4px; background:#fffefa; }
        .eu-story-place-detail > summary { display:flex; align-items:center; flex-wrap:wrap; gap:.35rem; padding:.65rem .75rem; color:#2a5a9a; font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; font-weight:700; cursor:pointer; }
        .eu-story-place-detail > summary:hover { background:#fbf8f3; }
        .eu-story-place-detail > summary:focus-visible { outline:2px solid #2C2421; outline-offset:-2px; border-radius:4px; }
        .eu-story-place-era { color:#756d65; font-size:.68rem; font-weight:400; }
        .eu-story-place-detail > .eu-history-card { border:0; border-top:1px solid #f0ece6; border-radius:0; box-shadow:none; padding:.9rem; background:transparent; }
        .eu-history-reference { border:1px solid #ded7ce; border-radius:6px; background:#fdfbf7; }
        .eu-history-reference > summary { padding:.8rem 1rem; color:#5a5048; font-family:'Zen Maru Gothic',sans-serif; font-size:.8rem; font-weight:700; cursor:pointer; }
        .eu-history-reference > summary:hover { color:#2a5a9a; }
        .eu-history-reference > summary:focus-visible { outline:2px solid #2C2421; outline-offset:-2px; border-radius:6px; }
        .eu-history-reference-body { display:grid; gap:1.5rem; padding:0 1rem 1rem; }
        .eu-history-life { display:grid; gap:1rem; }
        .eu-history-life-title { font-size:1.1rem; letter-spacing:.06em; margin:0; text-wrap:balance; }
        .eu-history-life-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; }
        .eu-life-card { background:white; border:1px solid #e2dbd2; border-radius:6px; padding:1.1rem 1.2rem; box-shadow:0 1px 6px rgba(0,0,0,.04); }
        .eu-life-card > .place-preview--history { margin:.8rem 0 0; }
        .eu-food-item .place-preview--history { margin:.55rem 0; }
        .eu-life-card h4 { font-size:1.05rem; line-height:1.45; letter-spacing:.04em; margin:0 0 .7rem; text-wrap:balance; }
        .eu-life-summary { color:#6a6058; font-size:.8rem; line-height:1.75; text-wrap:pretty; }
        .eu-life-subtitle { font-family:'Zen Maru Gothic',sans-serif; color:#5a5048; font-size:.76rem; margin:1rem 0 .6rem; }
        .eu-town-districts { display:grid; gap:.6rem; list-style:none; padding:0; margin:0; }
        .eu-town-districts li { border-left:2px solid #2a5a9a; padding:.55rem .7rem; background:#fbf8f3; }
        .eu-town-districts strong { display:block; font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#2C2421; }
        .eu-town-district-role { display:block; color:#756d65; font-family:'Zen Maru Gothic',sans-serif; font-size:.68rem; margin-top:.15rem; }
        .eu-town-districts p { color:#6a6058; font-size:.74rem; line-height:1.6; margin-top:.2rem; }
        .eu-food-list { display:grid; gap:.8rem; }
        .eu-food-item { padding-top:.8rem; border-top:1px solid #f0ece6; }
        .eu-food-item:first-child { padding-top:0; border-top:none; }
        .eu-food-item-title { font-family:'Zen Maru Gothic',sans-serif; font-size:.82rem; line-height:1.5; margin:0 0 .25rem; }
        .eu-history-country { background:white; border-left:3px solid #2a5a9a; border-radius:6px; padding:1.2rem 1.3rem; box-shadow:0 1px 8px rgba(0,0,0,.05); }
        .eu-history-kicker { font-family:'Zen Maru Gothic',sans-serif; color:#756d65; font-size:.72rem; letter-spacing:.12em; margin-bottom:.35rem; }
        .eu-history-country-title { font-size:1.25rem; line-height:1.4; letter-spacing:.06em; margin:0 0 .7rem; text-wrap:balance; }
        .eu-history-country-summary, .eu-history-country-focus { font-size:.84rem; line-height:1.8; color:#4a4038; text-wrap:pretty; }
        .eu-history-country-focus { margin-top:.5rem; color:#6a6058; }
        .eu-history-spots { display:grid; gap:1rem; }
        .eu-history-spots-title { font-size:1.1rem; letter-spacing:.06em; margin:0; text-wrap:balance; }
        .eu-history-card { background:white; border:1px solid #e2dbd2; border-radius:6px; padding:1.1rem 1.2rem; box-shadow:0 1px 6px rgba(0,0,0,.04); }
        .eu-history-card-heading { margin-bottom:.8rem; }
        .eu-history-era { font-family:'Zen Maru Gothic',sans-serif; color:#756d65; font-size:.72rem; letter-spacing:.08em; margin-bottom:.25rem; }
        .eu-history-card-title { font-size:1.05rem; line-height:1.45; letter-spacing:.04em; margin:0; text-wrap:balance; }
        .eu-history-card-content { display:grid; grid-template-columns:minmax(0,1fr) minmax(170px,32%); gap:1rem; align-items:start; }
        .eu-history-card-copy { display:grid; gap:.7rem; }
        .eu-history-fact { font-size:.8rem; line-height:1.7; }
        .eu-history-fact strong { display:block; font-family:'Zen Maru Gothic',sans-serif; font-size:.74rem; color:#5a5048; margin-bottom:.12rem; }
        .eu-history-fact p { color:#6a6058; text-wrap:pretty; }
        .eu-history-fact-highlight { border-left:2px solid #5a8a6e; padding-left:.7rem; }
        .eu-history-card-content .place-preview--history { margin:0; }
        .eu-history-key-facts { margin-top:1rem; padding:.8rem .9rem; border-left:3px solid #2a5a9a; background:#f3f6fa; }
        .eu-history-key-facts h5 { color:#2a5a9a; font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; margin:0 0 .45rem; }
        .eu-history-key-facts ul { display:grid; gap:.35rem; list-style:none; margin:0; padding:0; }
        .eu-history-key-facts li { position:relative; padding-left:1rem; color:#4a4038; font-size:.78rem; line-height:1.65; text-wrap:pretty; }
        .eu-history-key-facts li::before { content:""; position:absolute; left:.1rem; top:.65em; width:.35rem; height:.35rem; border-radius:50%; background:#2a5a9a; }
        .eu-history-detail { margin-top:1rem; border-top:1px solid #e2dbd2; }
        .eu-history-detail summary { padding:.75rem 0 .2rem; color:#2a5a9a; font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; font-weight:700; cursor:pointer; text-underline-offset:2px; }
        .eu-history-detail summary:hover { color:#1d4374; }
        .eu-history-detail summary:focus-visible { outline:2px solid #2C2421; outline-offset:2px; border-radius:2px; }
        .eu-history-reading-label { padding:.75rem 0 .2rem; color:#2a5a9a; font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; font-weight:700; }
        .eu-history-detail-body { display:grid; gap:.7rem; padding:.6rem 0 .2rem; }
        .eu-history-detail-body p { color:#4a4038; font-size:.82rem; line-height:1.9; text-wrap:pretty; }
        .eu-history-country-detail { margin-top:1rem; }
        .eu-history-sources { display:flex; align-items:center; flex-wrap:wrap; gap:.35rem .6rem; margin-top:1rem; font-family:'Zen Maru Gothic',sans-serif; font-size:.7rem; line-height:1.5; }
        .eu-history-sources-label { color:#756d65; }
        .eu-history-sources a { color:#5a5048; text-underline-offset:2px; }
        .eu-history-sources a:hover { color:#2C2421; }
        .eu-history-sources a:focus-visible { outline:2px solid currentColor; outline-offset:2px; border-radius:2px; }
        .eu-history-diagram { margin:1rem 0 0; padding:.9rem; border:1px solid #e2dbd2; border-radius:5px; background:#fbf8f3; }
        .eu-history-diagram-title { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; font-weight:700; color:#5a5048; margin-bottom:.7rem; text-wrap:balance; }
        .eu-history-diagram-track { display:grid; grid-template-columns:repeat(auto-fit,minmax(125px,1fr)); gap:.65rem; list-style:none; padding:0; margin:0; }
        .eu-history-diagram-step { position:relative; display:flex; flex-direction:column; gap:.22rem; min-height:84px; padding:.65rem .6rem; border:1px solid #e2dbd2; border-radius:4px; background:white; }
        .eu-history-diagram-marker { font-family:'Zen Maru Gothic',sans-serif; font-size:.68rem; font-weight:700; color:#2a5a9a; letter-spacing:.04em; }
        .eu-history-diagram-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; color:#2C2421; line-height:1.4; }
        .eu-history-diagram-text { font-size:.7rem; color:#6a6058; line-height:1.5; }
        .eu-history-diagram-arrow { position:absolute; right:-.55rem; top:50%; z-index:1; color:#756d65; font-family:'Zen Maru Gothic',sans-serif; font-size:.9rem; transform:translateY(-50%); }
        .eu-history-diagram-relationship .eu-history-diagram-marker { color:#7a3b8f; }
        .eu-history-diagram-observation .eu-history-diagram-marker { color:#5a8a6e; }
        .eu-history-diagram-caption { margin-top:.7rem; color:#756d65; font-size:.72rem; line-height:1.6; }
        .eu-history-empty { background:white; border:1px solid #e2dbd2; border-radius:6px; padding:1.3rem; }
        .eu-history-empty h3 { font-size:1rem; margin-bottom:.45rem; }
        .eu-history-empty p { color:#6a6058; font-size:.82rem; line-height:1.7; }
        .eu-timeline { position:relative; padding-left:2rem; list-style:none; }
        .eu-timeline::before { content:''; position:absolute; left:5px; top:8px; bottom:8px; width:1px; background:#d4cdc5; }
        .eu-tl-item { position:relative; padding-bottom:1.8rem; padding-left:1rem; }
        .eu-tl-item:last-child { padding-bottom:0; }
        .eu-tl-dot { position:absolute; left:-2rem; top:4px; width:11px; height:11px; border-radius:50%; background:#d4cdc5; border:2px solid #F7F3ED; z-index:1; }
        .eu-tl-dot.important { width:13px; height:13px; }
        .eu-tl-time { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#756d65; letter-spacing:.05em; margin-bottom:.2rem; }
        .eu-tl-label { font-weight:500; font-size:1rem; letter-spacing:.04em; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
        .eu-tl-label .eu-emoji { font-size:1.1rem; }
        .eu-tl-desc { font-size:.82rem; color:#6a6058; margin-top:.2rem; line-height:1.6; }
        .eu-tl-item.important .eu-tl-label { font-weight:600; }
        .eu-tl-links { display:inline-flex; gap:.35rem; margin-left:.2rem; }
        .eu-tl-links a:hover { opacity:1!important; }
        .eu-tl-links a:focus-visible { outline:2px solid #2C2421; outline-offset:1px; border-radius:2px; }
        .eu-tl-icon-link:focus-visible { outline:2px solid #2C2421; outline-offset:1px; border-radius:2px; }
        .eu-booking-card { margin-top:2.5rem; background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); cursor:pointer; transition:box-shadow .3s; }
        .eu-booking-card:hover { box-shadow:0 2px 16px rgba(0,0,0,.1); }
        .eu-booking-card:focus-visible { outline:2px solid #2C2421; outline-offset:1px; box-shadow:0 2px 16px rgba(0,0,0,.1); }
        .eu-booking-header { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.2rem; font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.9rem; letter-spacing:.05em; }
        .eu-booking-toggle { font-size:.75rem; color:#756d65; transition:transform .3s; }
        .eu-booking-details { padding:0 1.2rem 1.2rem; display:grid; gap:.6rem; }
        .eu-booking-row { display:flex; font-size:.82rem; line-height:1.5; }
        .eu-booking-row-label { font-family:'Zen Maru Gothic',sans-serif; color:#756d65; min-width:90px; flex-shrink:0; }
        .eu-booking-row-value { font-weight:500; word-break:break-all; }
        .eu-booking-links { display:flex; gap:.5rem; padding:.5rem 1.2rem 1rem; flex-wrap:wrap; }
        .eu-booking-links a { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#5a8a6e; text-decoration:none; padding:.3rem .7rem; border:1px solid #d4e8dc; border-radius:3px; transition:all .2s; display:inline-flex; align-items:center; gap:.3rem; }
        .eu-booking-links a:hover { background:#eef6f0; border-color:#5a8a6e; }
        .eu-booking-links a:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; }
        .eu-memo-box { border-radius:6px; padding:1rem 1.2rem; margin-bottom:2rem; font-size:.82rem; line-height:1.7; }
        .eu-memo-title { font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.88rem; margin-bottom:.5rem; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
        .eu-memo-link:focus-visible { outline:2px solid currentColor; outline-offset:1px; border-radius:3px; }
        .dinner-map-link { font-family:'Zen Maru Gothic',sans-serif; font-size:.72rem; color:#5a8a6e; text-decoration:none; border:1px solid #d4e8dc; padding:.15rem .5rem; border-radius:3px; display:inline-flex; align-items:center; gap:.2rem; transition:all .2s; }
        .dinner-map-link:hover { background:#eef6f0; }
        .dinner-map-link:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; border-radius:3px; }
        .eu-cost-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:euFadeIn .5s ease-out; }
        .eu-cost-title { font-size:1.6rem; font-weight:600; letter-spacing:.08em; margin-bottom:2rem; text-align:center; margin-top:0; }
        .eu-cost-table { background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); width:100%; border-collapse:collapse; }
        .eu-cost-row td { padding:1rem 1.4rem; font-size:.85rem; border-bottom:1px solid #f0ece6; vertical-align:top; }
        .eu-cost-row:last-child td { border-bottom:none; }
        .eu-cost-row-item { font-family:'Zen Maru Gothic',sans-serif; color:#5a5048; }
        .eu-cost-row-value { font-weight:600; font-variant-numeric:tabular-nums; text-align:right; white-space:nowrap; }
        .eu-cost-row-note { font-size:.75rem; color:#756d65; margin-top:.2rem; }
        .eu-cost-total td { padding:1.2rem 1.4rem; background:#2C2421; color:white; }
        .eu-cost-total-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.9rem; letter-spacing:.1em; }
        .eu-cost-total-value { font-size:1.3rem; font-weight:700; font-variant-numeric:tabular-nums; text-align:right; }
        .eu-cost-note { text-align:center; margin-top:1.5rem; font-size:.78rem; color:#756d65; line-height:1.7; }
        .eu-route-box { background:white; border-radius:6px; padding:1.2rem 1.4rem; margin-bottom:2rem; box-shadow:0 1px 8px rgba(0,0,0,.06); font-size:.82rem; line-height:2; }
        .eu-route-title { font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.88rem; margin-bottom:.8rem; color:#2a5a9a; display:flex; align-items:center; gap:.4rem; }
        .eu-route-row { display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; color:#4a4038; }
        .eu-route-sep { color:#d4cdc5; font-size:.7rem; }
        @media (max-width:500px) {
          .eu-nav-btn{padding:.8rem .7rem;font-size:.72rem}
          .eu-nav-btn-date{font-size:.65rem}
          .eu-day-section{padding:2rem 1rem}
          .eu-booking-row-label{min-width:75px}
          .eu-view-tab{flex:1;padding:.6rem .45rem;font-size:.74rem}
          .eu-history-card{padding:.95rem}
          .eu-history-card-content{grid-template-columns:1fr}
          .eu-history-card-content .place-preview--history{order:-1}
          .eu-story-section-summary{padding:.8rem .9rem}
          .eu-story-section-body{padding:0 .8rem .8rem}
          .eu-story-timeline{padding-left:1.85rem}
          .eu-story-node{left:-1.85rem}
          .eu-story-card{padding:.8rem}
          .eu-history-life-grid{grid-template-columns:1fr}
          .eu-history-diagram-track{grid-template-columns:1fr}
          .eu-history-diagram-step{min-height:0;padding:.55rem .6rem}
          .eu-history-diagram-arrow{right:auto;left:50%;top:auto;bottom:-.65rem;font-size:0;transform:translateX(-50%)}
          .eu-history-diagram-arrow::after{content:"↓";font-size:.9rem}
        }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>

      <header className="eu-cover">
        <a href="#/" className="eu-cover-back">← 旅の一覧</a>
        <div className="eu-cover-pattern" aria-hidden="true" />
        <div className="eu-cover-content">
          <div className="eu-cover-label">Travel Booklet</div>
          <h1 className="eu-cover-title">中欧の旅</h1>
          <div className="eu-cover-sub">Budapest ・ Wien ・ Praha</div>
          <div className="eu-cover-date">2026. 11. 18 wed — 11. 25 wed</div>
          <div className="eu-cover-members">のむら ひろき ・ りの</div>
        </div>
      </header>

      <nav className="eu-nav-bar" aria-label="日程ナビゲーション">
        {DAYS.map((d, i) => (
          <button key={i}
            className={`eu-nav-btn ${!showCost && activeDay === i ? "active" : ""}`}
            aria-pressed={!showCost && activeDay === i}
            onClick={() => { setActiveDay(i); setShowCost(false); setExpandedBooking(null); setActivePanel("timeline"); }}>
            <span aria-hidden="true">{d.icon}</span>{" "}
            {d.day === 0 ? "前日" : `Day${d.day}`}
            <span className="eu-nav-btn-date">{formatShortDate(d.date)}</span>
          </button>
        ))}
        <button
          className={`eu-nav-btn cost-btn ${showCost ? "active" : ""}`}
          aria-pressed={showCost}
          onClick={() => { setShowCost(true); setActivePanel("timeline"); }}>
          <span aria-hidden="true">💰</span> 費用
        </button>
      </nav>

      <main>
        <div
          aria-live="polite" aria-atomic="true"
          style={{ position:"absolute", width:1, height:1, overflow:"hidden", clipPath:"inset(50%)", whiteSpace:"nowrap" }}>
          {showCost
            ? "旅費まとめを表示中"
            : `${DAYS[activeDay].day === 0 ? "前日" : `Day${DAYS[activeDay].day}`} ${
              activePanel === "history" ? "歴史・背景" : activePanel === "food" ? "食文化" : "タイムライン"
            }を表示中`}
        </div>

        {showCost ? (
          <div className="eu-cost-section" key="cost">
            <h2 className="eu-cost-title">旅費まとめ</h2>
            <table className="eu-cost-table" aria-label="旅費一覧">
              <tbody>
                {COSTS.map((c, i) => (
                  <tr className="eu-cost-row" key={i}>
                    <td className="eu-cost-row-item">
                      {c.item}
                      {c.note && <div className="eu-cost-row-note">{c.note}</div>}
                    </td>
                    <td className="eu-cost-row-value">
                      {c.cost > 0 ? `¥${c.cost.toLocaleString()}` : "─"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="eu-cost-total">
                  <td className="eu-cost-total-label">確定済み小計</td>
                  <td className="eu-cost-total-value">¥{totalFixed.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
            <div className="eu-cost-note">
              ※ 航空券（2名合計¥457,440）、ウィーン宿泊（2名2泊・¥40,277相当）、プラハ宿泊（2名2泊・¥28,407）は予約済み・支払済みです。<br />
              宿泊税（ブダペスト4%・プラハ50CZK/人泊）は現地払いです。ウィーン市税5%は宿泊料金に含まれています。<br />
              食費・市内交通・観光入場料は含まれていません。
            </div>
          </div>
        ) : (
          <div className="eu-day-section" key={`day-${activeDay}`}>
            {/* 全体ルート（Day0のみ表示） */}
            {activeDay === 0 && (
              <div className="eu-route-box">
                <div className="eu-route-title"><span aria-hidden="true">🗺</span> 全体ルート</div>
                <div className="eu-route-row">
                  <span><span aria-hidden="true">✈</span> 羽田 11/18 00:05</span>
                  <span className="eu-route-sep">─ドバイ乗継─</span>
                  <span><span aria-hidden="true">🇭🇺</span> ブダペスト 11/18着</span>
                  <span className="eu-route-sep">─鉄道─</span>
                  <span><span aria-hidden="true">🇦🇹</span> ウィーン 11/20</span>
                  <span className="eu-route-sep">─鉄道─</span>
                  <span><span aria-hidden="true">🇨🇿</span> プラハ 11/22</span>
                  <span className="eu-route-sep">─ドバイ乗継─</span>
                  <span><span aria-hidden="true">✈</span> 成田 11/25 17:20</span>
                </div>
                <div style={{ marginTop:".8rem", fontSize:".78rem", color:"#756d65", lineHeight:1.7 }}>
                  地上6泊（ブダペスト2泊・ウィーン2泊・プラハ2泊）＋機中2泊 ／ 大人2名・エコノミー<br/>
                  <span style={{ color:"#9a4a2a", fontWeight:600 }}>⚠ 出発：羽田（HND）第3ターミナル ／ 帰着：成田（NRT）第2ターミナル（空港が違います）</span>
                </div>
              </div>
            )}

            <div className="eu-day-header">
              <span className="eu-day-number" style={{ background: DAYS[activeDay].color }}>
                {DAYS[activeDay].day === 0 ? "前日" : `DAY ${DAYS[activeDay].day}`}
              </span>
              <span className="eu-day-date">{DAYS[activeDay].date}</span>
            </div>
            <h2 className="eu-day-title" style={{ color: DAYS[activeDay].color }}>{DAYS[activeDay].title}</h2>

            <div className="eu-view-tabs" role="tablist" aria-label="日程の表示切替">
              <button
                id={`eu-day-tab-timeline-${activeDay}`}
                className="eu-view-tab"
                type="button"
                role="tab"
                aria-selected={activePanel === "timeline"}
                aria-controls={`eu-day-panel-${activeDay}`}
                onClick={() => setActivePanel("timeline")}>
                <span aria-hidden="true">🗓</span> タイムライン
              </button>
              <button
                id={`eu-day-tab-history-${activeDay}`}
                className="eu-view-tab"
                type="button"
                role="tab"
                aria-selected={activePanel === "history"}
                aria-controls={`eu-day-panel-${activeDay}`}
                onClick={() => setActivePanel("history")}>
                <span aria-hidden="true">📖</span> 歴史・背景
              </button>
              <button
                id={`eu-day-tab-food-${activeDay}`}
                className="eu-view-tab"
                type="button"
                role="tab"
                aria-selected={activePanel === "food"}
                aria-controls={`eu-day-panel-${activeDay}`}
                onClick={() => setActivePanel("food")}>
                <span aria-hidden="true">🍽</span> 食文化
              </button>
            </div>

            <div
              id={`eu-day-panel-${activeDay}`}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`eu-day-tab-${activePanel}-${activeDay}`}>
              {activePanel === "history" ? (
                <HistoryPanel history={historyForDay} />
              ) : activePanel === "food" ? (
                <FoodPanel history={historyForDay} />
              ) : (
                <>
            {/* メモボックス */}
            {DAYS[activeDay].memo && (
              <div className="eu-memo-box"
                style={{ background: DAYS[activeDay].memo.bg, border: `1px solid ${DAYS[activeDay].memo.border}`, color: DAYS[activeDay].memo.textColor }}>
                <h3 className="eu-memo-title" style={{ color: DAYS[activeDay].memo.titleColor }}>
                  <span aria-hidden="true">{DAYS[activeDay].memo.icon}</span>
                  {DAYS[activeDay].memo.title}
                </h3>
                <div>{DAYS[activeDay].memo.body}</div>
              </div>
            )}

            {/* マップ */}
            {DAYS[activeDay].schedule.some(s => s.coords) && (
              <DayMap
                schedule={DAYS[activeDay].schedule}
                color={DAYS[activeDay].color}
                dinner={DAYS[activeDay].dinner}
              />
            )}

            <ol className="eu-timeline">
              {DAYS[activeDay].schedule.map((item, i) => (
                <li key={i} className={`eu-tl-item ${item.important ? "important" : ""}`}>
                  <div
                    className={`eu-tl-dot ${item.important ? "important" : ""}`}
                    aria-hidden="true"
                    style={item.important ? { background: DAYS[activeDay].color } : {}}
                  />
                  <div className="eu-tl-time">{item.time}</div>
                  <div className="eu-tl-label">
                    <span className="eu-emoji" aria-hidden="true">{item.icon}</span>
                    {item.label}
                    {(item.url || item.mapUrl || item.photo) && (
                      <span className="eu-tl-links">
                        <WebLink href={item.url} />
                        <MapLink href={item.mapUrl} />
                        <PhotoLink href={item.photo} />
                      </span>
                    )}
                  </div>
                  {item.desc && <div className="eu-tl-desc">{item.desc}</div>}
                  <PlacePreview image={item.image} />
                </li>
              ))}
            </ol>

            {DAYS[activeDay].booking && (
              <div
                className="eu-booking-card"
                role="button" tabIndex={0}
                aria-expanded={expandedBooking === `booking-${activeDay}`}
                onClick={() => setExpandedBooking(expandedBooking === `booking-${activeDay}` ? null : `booking-${activeDay}`)}
                onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === `booking-${activeDay}` ? null : `booking-${activeDay}`))}>
                <div className="eu-booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
                  <span><span aria-hidden="true">{DAYS[activeDay].booking.icon || "📋"}</span> {DAYS[activeDay].booking.title}</span>
                  <span className="eu-booking-toggle" aria-hidden="true"
                    style={{ transform: expandedBooking === `booking-${activeDay}` ? "rotate(180deg)" : "none" }}>▼</span>
                </div>
                {expandedBooking === `booking-${activeDay}` && (
                  <>
                    <div className="eu-booking-details">
                      {DAYS[activeDay].booking.details.map((d, i) => (
                        <div className="eu-booking-row" key={i}>
                          <span className="eu-booking-row-label">{d.label}</span>
                          <span className="eu-booking-row-value">{d.value}</span>
                        </div>
                      ))}
                    </div>
                    <PlacePreview image={DAYS[activeDay].booking.image} variant="booking" />
                    {(DAYS[activeDay].booking.url || DAYS[activeDay].booking.mapUrl) && (
                      <div className="eu-booking-links">
                        {DAYS[activeDay].booking.url && (
                          <a href={DAYS[activeDay].booking.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <span aria-hidden="true">🌐</span> 公式サイト
                          </a>
                        )}
                        {DAYS[activeDay].booking.mapUrl && (
                          <a href={DAYS[activeDay].booking.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <span aria-hidden="true">📍</span> Google Map
                          </a>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {DAYS[activeDay].extraBookings && DAYS[activeDay].extraBookings.map((b, bIdx) => {
              const bKey = b.key || `extra-${activeDay}-${bIdx}`;
              const isExp = expandedBooking === bKey;
              return (
                <div
                  key={bKey}
                  className="eu-booking-card"
                  style={{ marginTop: "1rem" }}
                  role="button" tabIndex={0}
                  aria-expanded={isExp}
                  onClick={() => setExpandedBooking(isExp ? null : bKey)}
                  onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(isExp ? null : bKey))}>
                  <div className="eu-booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
                    <span><span aria-hidden="true">{b.icon || "📋"}</span> {b.title}</span>
                    <span className="eu-booking-toggle" aria-hidden="true"
                      style={{ transform: isExp ? "rotate(180deg)" : "none" }}>▼</span>
                  </div>
                  {isExp && (
                    <>
                      <div className="eu-booking-details">
                        {b.details.map((d, i) => (
                          <div className="eu-booking-row" key={i}>
                            <span className="eu-booking-row-label">{d.label}</span>
                            <span className="eu-booking-row-value">{d.value}</span>
                          </div>
                        ))}
                      </div>
                      <PlacePreview image={b.image} variant="booking" />
                      {(b.url || b.mapUrl) && (
                        <div className="eu-booking-links">
                          {b.url && (
                            <a href={b.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              <span aria-hidden="true">🌐</span> 公式サイト
                            </a>
                          )}
                          {b.mapUrl && (
                            <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              <span aria-hidden="true">📍</span> Google Map
                            </a>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}

            {/* ディナー候補カード */}
            {DAYS[activeDay].dinner && (
              <div
                className="eu-booking-card"
                style={{ marginTop: "1.5rem" }}
                role="button" tabIndex={0}
                aria-expanded={expandedBooking === `dinner-${activeDay}`}
                onClick={() => setExpandedBooking(expandedBooking === `dinner-${activeDay}` ? null : `dinner-${activeDay}`)}
                onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === `dinner-${activeDay}` ? null : `dinner-${activeDay}`))}>
                <div className="eu-booking-header" style={{ borderLeft: "3px solid #E8734A" }}>
                  <span><span aria-hidden="true">🍽</span> {DAYS[activeDay].dinner.title}</span>
                  <span className="eu-booking-toggle" aria-hidden="true"
                    style={{ transform: expandedBooking === `dinner-${activeDay}` ? "rotate(180deg)" : "none" }}>▼</span>
                </div>
                {expandedBooking === `dinner-${activeDay}` && (
                  <div style={{ padding: "0 1.2rem 1.2rem" }}>
                    {DAYS[activeDay].dinner.options.map((opt, i) => (
                      <div key={i} style={{ padding: ".8rem 0", borderBottom: i < DAYS[activeDay].dinner.options.length - 1 ? "1px solid #f0ece6" : "none" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:".5rem", marginBottom:".25rem", flexWrap:"wrap" }}>
                          <span style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".92rem" }}>{opt.name}</span>
                          <span style={{ fontSize:".7rem", background:"#f0ece6", padding:".15rem .5rem", borderRadius:"2px", color:"#6a6058", fontFamily:"'Zen Maru Gothic',sans-serif" }}>{opt.genre}</span>
                          {opt.url && (
                            <a href={opt.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                              className="dinner-map-link">
                              <span aria-hidden="true">🌐</span> 公式サイト
                            </a>
                          )}
                          {opt.mapUrl && (
                            <a href={opt.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                              className="dinner-map-link">
                              <span aria-hidden="true">📍</span> Map
                            </a>
                          )}
                        </div>
                        <div style={{ fontSize:".8rem", color:"#6a6058", lineHeight:1.5 }}>{opt.desc}</div>
                        {opt.tel && <div style={{ fontSize:".75rem", color:"#756d65", marginTop:".2rem" }}>TEL: {opt.tel}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
