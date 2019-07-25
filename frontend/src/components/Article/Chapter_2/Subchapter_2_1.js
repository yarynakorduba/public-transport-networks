import React from "react"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"

const b = BEM("Article")

const Subchapter_2_1 = () => (
  <section>
    <h2 id="bristol">Брістоль</h2>
    <p className={b("paragraph")}>Подорожувати у Брістолі можна автобусами, трамваями і поромами.</p>
    <img className={b("image")} src={"img/chapter2/bristolTransport.png"} alt={"Bristol Transport"} />
    <p className={b("paragraph")}>
      За дослідженням <a href={"https://www.the-espgroup.com/"}>ESP Group</a> (транспортний контактний центр
      Великобританії) мережа міського транспорту Брістоля є однією з{" "}
      <a href={"https://www.bristolpost.co.uk/news/bristol-news/bristols-public-transport-among-most-702808"}>
        найменш
      </a>{" "}
      комфортних у Британії. Місто займає останню 26-у позицію{" "}
      <a
        href={
          "https://www.dailymail.co.uk/travel/travel_news/article-3667738/Edinburgh-ranked-UK-s-easiest-city-travel-Bristol-Cambridge-hardest-tourist-hotspots-explore.html"
        }
      >
        із індексом 5.31 з 10
      </a>
      . Існує декілька причин такої оцінки:
    </p>{" "}
    <ul className={b("list")}>
      <li>непунктуальність і повільність транспорту</li>
      <li>недостатня кількість громадського транспорту</li>
      <li>високі ціни попри низьку якість сервісу</li>
      <li>зупинки без накриття</li>
      <li>перевантаженість доріг</li>
    </ul>
    <p className={b("paragraph")}>
      Ще однією проблемою є високий рівень викидів газу.{" "}
      <a
        href={"https://www.bristol247.com/news-and-features/news/step-towards-tackling-bristols-killer-air-pollution/"}
      >
        За дослідженнями
      </a>
      , одна з десяти смертей у місті щороку може бути пов’язана із забрудненням повітря.
    </p>{" "}
    <p className={b("paragraph")}>
      Для збільшення швидкості пересування вже оновили два історичних мости і{" "}
      <a href={"https://www.volkerlaser.co.uk/en/case-studies/detail/bathurst-basin-bridge"}>побудували</a> один новий.
      Частину центру (The Centre) зробили пішохідною. У 2018 відкрили{" "}
      <a href={"https://en.wikipedia.org/wiki/MetroBus_(Bristol)"}>мережу швидких автобусів Metrobus</a>. До неї входять
      три маршрути. Мета цього проекту - заповнити діри, які не покривають автобусні та трамвайні лінії.
    </p>{" "}
    <p className={b("paragraph")}>
      Жителі міста{" "}
      <a
        href={
          "https://thebristolbugle.com/2018/07/28/bristol-could-have-its-own-teleportation-based-transport-system-within-the-next-700-years/"
        }
      >
        жартують
      </a>
      , що зараз у розробці новий транспортний проект - система телепортації. Її планують реалізувати за найближчі 700
      років.
    </p>{" "}
  </section>
)

export default Subchapter_2_1
