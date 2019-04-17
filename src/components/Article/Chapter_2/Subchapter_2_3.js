import CityInfoBlock from "../../CityInfoBlock"
import React from "react"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"

const b = BEM("Article")

const Subchapter_2_3 = () => (
  <section>
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
      <img className={b("image")} src={"img/chapter2/londonOmnibus.jpg"} alt={"London Omnibus"} />
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
      <img className={b("image")} src={"img/chapter2/londonHorseTram.jpg"} alt={"London Horse Tram"} />
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
  </section>
)

export default Subchapter_2_3
