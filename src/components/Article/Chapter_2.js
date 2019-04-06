import React from "react"
import Latex from "react-latex"
import BEM from "../../helpers/BEM.js"
import "./Article.scss"
import HeatMap from "../HeatMap/index"
import CityInfoBlock from "../CityInfoBlock/CityInfoBlock"
const b = BEM("Article")

const Chapter_2 = () => (
  <section>
    <h1 className={b("header")}>Історія трьох міст</h1>
    <h2>Лондон</h2>
    <div className={b("illustration", ["sticky"])} style={{ height: "100vh" }}>
      <CityInfoBlock />
    </div>
    <p className={b("article")}>
      Лондон - своєрідний хаб транспортної системи Англії. Історія громадського транспорту міста почалася ще в 19
      столітті, коли з’явилися перші 12 кабріолетів для регулярних перевезень. Через високу ціну вони були доступні
      тільки багатіям. У 1829 році з’явився дешевший транспорт -{" "}
      <a href={"http://knowledgeoflondon.com/buses.html"}>омнібуси на 22 людей</a>.
    </p>
    <figure>
      <img className={b("image")} src={"img/chapter3/londonOmnibus.jpg"} alt={"London Omnibus"} />
      <figcaption className={b("image-caption")}>
        Лондонський омнібус. (Фото з{" "}
        <a href={"https://commons.wikimedia.org/wiki/File:London_General_Omnibus_Company_(c.1903).jpg"}>Вікіпедії</a>)
      </figcaption>
    </figure>
    <p className={b("article")}>
      Частина населення була неграмотною, тому маршрути розрізняли за кольором карети. Омнібуси проіснували досить
      довго, лише на початку 20 століття їх витіснили автобуси. У 1860 році з’явився{" "}
      <a href={"https://en.wikipedia.org/wiki/Trams_in_London#Horse_trams"}>кінний трамвай</a>. Він з’єднував місто з
      околицями і вміщав 40-50 людей.
    </p>
    <figure>
      <img className={b("image")} src={"img/chapter3/londonHorseTram.jpg"} alt={"London Horse Tram"} />
      <figcaption className={b("image-caption")}>
        Лондонський кінний трамвай. (Фото з{" "}
        <a href={"https://commons.wikimedia.org/wiki/File:London_Tramways_Horse_tram.jpg"}>Вікіпедії</a>)
      </figcaption>
    </figure>
    <p className={b("article")}>
      У 1863 в Лондоні побудували перше у світі метро. Через неприємну пару і відсутність вентиляції, спочатку це був
      транспорт для бідних. Після першої світової війни станції та вагони почали оновлювати. Зараз London Underground -
      <a
        href={"https://www.railway-technology.com/features/featurethe-worlds-longest-metro-and-subway-systems-4144725/"}
      >
        четвертий за довжиною метрополітен у світі
      </a>{" "}
      і один із найзручніших способів пересування по місту. 11 ліній метро обслуговують більше 3 мільйонів пасажирів
      щодня.
    </p>
    <p className={b("article")}>
      Інший популярний транспорт - автобуси.{" "}
      <a
        href={
          "https://www.statista.com/statistics/300850/number-of-bus-passenger-journeys-in-london-in-the-united-kingdom/"
        }
      >
        Річна кількість їхніх пасажирів
      </a>{" "}
      перевищує 2.2 мільйони. До транспортної системи Лондона також входять трамваї (Tramlink), “лондонська наземка”
      (London Overground), міські електрички, канатна дорога і катери.
    </p>{" "}
    <p className={b("article")}>
      Розвиток лондонського транспорту мав проблемні періоди. В кінці 20 століття місто почало “задихатися” від
      вихлопних газів. Дороги були перевантажені. Середня швидкість руху знизилася до 12 миль/год., а це “повільніше ніж
      за короля Едуарда, коли більша частина транспорту була гужовою” (
      <a href={"https://geopoliticaleconomy.org/people/alan-freeman/"}>Алан Фріман</a>, колишній радник мера з питань
      економіки). Мер Лондона Лівінгстон розпочав{" "}
      <a href={"http://rabkor.ru/columns/edu/2015/11/06/public-transport-in-london/"}>ряд транспортних реформ</a>.
      Однією з них була модель{" "}
      <a href={"https://tfl.gov.uk/modes/driving/congestion-charge"}>платного в’їзду в центральну частину міста</a>. На
      кордонах центру розмістили автостоянки. Попри боязнь конфліктів з водіями, зміни зустріли позитивно. Навантаження
      доріг знизилося на 26%, а викиди газів - на 16%. Кількість пасажирів автобусів у центрі збільшилася на 37%.
    </p>{" "}
    <p className={b("article")}>
      Сьогодні транспортні питання залишаються відкритими. Прогнозують, що за наступні 30 років кількість міських
      поїздок{" "}
      <a href={"https://www.london.gov.uk/sites/default/files/Transport%20Supporting%20Paper_3.pdf"}>
        підвищиться на 35-40%
      </a>
      . Критичними залишаються питання забруднення повітря і навантаження транспорту. Один із кроків для вирішення -
      створення <a href={"https://tfl.gov.uk/modes/driving/ultra-low-emission-zone"}>зони наднизьких викидів</a>. З
      квітня 2019 власники машин із високим рівнем CO2 платитимуть нові внески за в’їзд до центру. Продовжується
      спорудження <a href={"https://uk.wikipedia.org/wiki/Crossrail"}>Crossrail</a> - залізничної лінії із 21 км тунелів
      під центром Лондона. Вона з’єднуватиме центр із Беркширом, Бакінгемширом та Ессексом. Зараз це найбільший у Європі
      проект будівництва інфраструктури.
    </p>{" "}
    <p className={b("article")}>
      Додатково:{" "}
      <a href={"https://www.london.gov.uk/sites/default/files/Transport%20Supporting%20Paper_3.pdf\n"}>
        візія інфраструктури Лондона до 2050 року
      </a>
    </p>{" "}
    <h2>Брістоль</h2>
    <div className={b("illustration", ["sticky"])} style={{ height: "100vh" }}>
      <HeatMap />
    </div>
    <p className={b("article")}>
      Подорожувати у Брістолі можна автобусами, трамваями і поромами. За дослідженням ESP Group мережа міського
      транспорту Брістоля є одною з{" "}
      <a href={"https://www.bristolpost.co.uk/news/bristol-news/bristols-public-transport-among-most-702808"}>
        найменш
      </a>{" "}
      комфортних у Британії. Місто займає 26-у позицію{" "}
      <a
        href={
          "https://www.dailymail.co.uk/travel/travel_news/article-3667738/Edinburgh-ranked-UK-s-easiest-city-travel-Bristol-Cambridge-hardest-tourist-hotspots-explore.html"
        }
      >
        із індексом 5.31 з 10
      </a>
      . Жителі називають декілька причин:
    </p>{" "}
    <ul>
      <li>непунктуальність і повільність транспорту</li>
      <li>транспортні засоби не витримують напливу пасажирів у години-пік</li>
      <li>високі ціни попри низьку якість сервісу</li>
      <li>зупинки часто не мають накриття</li>
      <li>перевантаженість доріг</li>
    </ul>
    <p className={b("article")}>
      Ще однією проблемою є високий рівень викидів газу.{" "}
      <a
        href={"https://www.bristol247.com/news-and-features/news/step-towards-tackling-bristols-killer-air-pollution/"}
      >
        За дослідженнями
      </a>
      , одна з десяти смертей у місті щороку може бути пов’язана із забрудненням повітря.
    </p>{" "}
    <p className={b("article")}>
      Для збільшення швидкості пересування вже оновили два історичних мости і{" "}
      <a href={"https://www.volkerlaser.co.uk/en/case-studies/detail/bathurst-basin-bridge"}>побудували</a> один новий.
      Частину центру (The Centre) зробили пішохідною. У 2018 відкрили{" "}
      <a href={"https://en.wikipedia.org/wiki/MetroBus_(Bristol)"}>мережу швидких автобусів Metrobus</a>. До неї входять
      три маршрути. Мета цього проекту - заповнити діри, які не покривають автобусні та трамвайні лінії.
    </p>{" "}
    <p className={b("article")}>
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
    <p className={b("article")} /> <p className={b("article")} /> <p className={b("article")} />{" "}
    <p className={b("article")} /> <p className={b("article")} /> <h2>Львів</h2>
    <p>Короткий історичний ракурс і проблематики Львова. </p>
    <h3>Цифри.</h3>
    <p className={b("paragraph", ["first"])}>
      Науковці помітили, що набір певних характеристик у багатьох мереж транспорту незалежно від розміру є подібним.
      Однак існують ознаки, між якими часто відсутня кореляція. Для розуміння функціонування мереж та знаходження шляхів
      для їх оптимізації важливо навчитися відслідковувати як наявність, так і відсутність закономірностей.
    </p>
    <p className={b("paragraph")}>
      Для проведення дослідження ми обрали три різні транспортні системи: автобусні маршрути Лондона та Брістоля і
      мережу громадського транспорту Львова. У Лондоні - 767 маршрутів зі 16397 зупинками. Автобусна мережа Брістоля
      налічує 2873 зупинки, які входять до 143 маршрутів. Мережа Львова налічує 100 міських маршрутів, що обслуговують
      771 зупинку. Таким чином ми мали змогу порівняти характеристики трьох різних за розміром та систем.
    </p>
    <h2 className={b("chapter")}>Лондон та Брістоль</h2>
    <p className={b("paragraph", ["first"])}>
      Дослідження для Лондона та Брістоля в <Latex>$L$</Latex> просторі проводили раніше. Ці результати, а також аналіз
      транспортних систем 12 інших міст представлені у статті{" "}
      <a href={"https://arxiv.org/pdf/1705.07266.pdf"}>"Public transportation in UK viewed as a complex network"</a>.
      Для отримання повної картини ми відтворили результати двох міст у<Latex>$L\text-space$</Latex> і порівняли їх із
      попередніми даними, пізніше відобразили системи у двох інших вимірах. Погляньте на візуалізацію Брістоля в{" "}
      <Latex>$L$</Latex> просторі . Розмір та колір вузла відображає кількість з'єднань, які від нього відходять. (Задля
      покращення сприйняття інформації проміжні зупинки (зупинки із двома з'єднаннями) не відображаються.)
    </p>
    <p className={b("paragraph")}>
      Ось інша, альтернативна версія того ж L-простору .Кількість зупинок в автобусній мережі Лондона більша за
      брістольську у більш, ніж 6 разів. Тому в L-space також набагато більше вузлів та ребер.
    </p>
  </section>
)

export default Chapter_2
