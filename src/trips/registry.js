import KyushuTrip from './kyushu-2026/KyushuTrip.jsx';
import OsakaShigaTrip from './osaka-shiga-2026/OsakaShigaTrip.jsx';
import HiroshimaTrip from './hiroshima-2026/HiroshimaTrip.jsx';
import EuropePlansTrip from './europe-2026-plans/EuropePlansTrip.jsx';
import EuropeTrip from './europe-2026/EuropeTrip.jsx';

export const TRIPS = [
  {
    id: 'europe-2026',
    title: '中欧の旅',
    subtitle: 'Budapest ・ Wien ・ Praha',
    dates: '2026. 11. 18 — 11. 25',
    icon: '🏰',
    color: '#0d2847',
    colorEnd: '#7a3b8f',
    members: 'のむら ひろき ・ りの',
    component: EuropeTrip,
  },
  {
    id: 'europe-2026-plans',
    title: 'ヨーロッパの旅（候補）',
    subtitle: 'A案 ・ C案 ・ D案',
    dates: '2026. 11. 22 — 12. 1',
    icon: '🎄',
    color: '#0d2847',
    colorEnd: '#7a3b8f',
    members: 'のむら ひろき ・ りの',
    component: EuropePlansTrip,
  },
  {
    id: 'hiroshima-2026',
    title: '広島の旅',
    subtitle: '宮島 ・ 呉 ・ 広島',
    dates: '2026. 7. 31 — 8. 2',
    icon: '⛩',
    color: '#b34a4a',
    colorEnd: '#e0955a',
    members: 'のむら ひろき ・ りの',
    component: HiroshimaTrip,
  },
  {
    id: 'osaka-shiga-2026',
    title: '大阪・滋賀の旅',
    subtitle: '大阪 ・ 南草津 ・ 琵琶湖',
    dates: '2026. 3. 19 — 3. 23',
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
];
