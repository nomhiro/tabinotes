import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import DayMap from "../src/components/DayMap.jsx";
import days from "./europe-2026.json";
import "./share.css";

function shortDate(date) {
  const match = date.match(/(\d+)月(\d+)日（([^）]+)）/);
  return match ? `${match[1]}/${match[2]}(${match[3]})` : date;
}

export default function SharedTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];
  const dayName = day.day === 0 ? "前日" : `Day${day.day}`;

  return (
    <>
      <header className="cover">
        <p>Travel Booklet</p>
        <h1>中欧の旅</h1>
        <p>Budapest ・ Wien ・ Praha</p>
        <p>2026. 11. 17 — 11. 25</p>
        <p className="share-notice">共有用しおり：名前・費用・予約番号は表示していません</p>
      </header>
      <nav className="nav" aria-label="日程ナビゲーション">
        {days.map((item, index) => (
          <button key={item.day} type="button" aria-pressed={index === activeDay} onClick={() => setActiveDay(index)}>
            {item.day === 0 ? "前日" : `Day${item.day}`} <span>{shortDate(item.date)}</span>
          </button>
        ))}
      </nav>
      <main>
        <div className="sr-only" aria-live="polite" aria-atomic="true">{dayName} {day.date}を表示中</div>
        <section className="day" aria-labelledby="day-title">
          <p className="day-date">{dayName} · {day.date}</p>
          <h2 id="day-title">{day.title}</h2>
          <DayMap schedule={day.schedule} color="#315e72" />
          {day.bookings.length > 0 && (
            <section aria-labelledby="booking-title" className="bookings">
              <h3 id="booking-title">予約情報</h3>
              {day.bookings.map((booking, index) => (
                <details key={index}>
                  <summary>{booking.title}</summary>
                  <dl>
                    {booking.details.map((detail, detailIndex) => (
                      <div key={detailIndex}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>
                    ))}
                  </dl>
                  {booking.photo && <a href={booking.photo} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">📷</span> 予約写真</a>}
                </details>
              ))}
            </section>
          )}
          <ol className="timeline">
            {day.schedule.map((item, index) => (
              <li key={index}>
                <p className="time">{item.time}</p>
                <h3><span aria-hidden="true">{item.icon}</span> {item.label}</h3>
                {item.desc && <p className="description">{item.desc}</p>}
                <div className="links">
                  {item.mapUrl && <a href={item.mapUrl} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">📍</span> 地図</a>}
                  {item.photo && <a href={item.photo} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">📷</span> 予約写真</a>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
