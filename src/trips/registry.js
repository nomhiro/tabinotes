import KyushuTrip from './kyushu-2026/KyushuTrip.jsx';
import OsakaShigaTrip from './osaka-shiga-2026/OsakaShigaTrip.jsx';
import ShizuokaTrip from './shizuoka-2026/ShizuokaTrip.jsx';

export const TRIPS = [
  {
    id: 'osaka-shiga-2026',
    title: '大阪・滋賀の旅',
    subtitle: '新大阪 ・ 南草津 ・ 琵琶湖',
    dates: '2026. 3. 21 — 3. 23',
    icon: '🏨',
    color: '#1a3a5c',
    colorEnd: '#6b4c9a',
    members: 'のむら ひろき ・ りの',
    component: OsakaShigaTrip,
  },
  {
    id: 'kyushu-2026',
    title: '九州の旅',
    subtitle: '別府 ・ 阿蘇 ・ 高千穂 ・ 熊本',
    dates: '2026. 5. 5 — 5. 9',
    icon: '⛴',
    color: '#2d5a4a',
    colorEnd: '#e87040',
    members: 'のむら ひろき ・ りの',
    component: KyushuTrip,
  },
  {
    id: 'shizuoka-2026',
    title: '静岡・桜の旅',
    subtitle: '浜松 ・ 静岡 ・ 日本平',
    dates: '2026. 4. 4 — 4. 5',
    icon: '🌸',
    color: '#E87EA1',
    colorEnd: '#7BAF5E',
    members: 'のむら ひろき ・ ふとし',
    component: ShizuokaTrip,
  },
];
