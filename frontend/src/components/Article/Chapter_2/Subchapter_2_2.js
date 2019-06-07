import React from "react"
import BEM from "../../../helpers/BEM.js"
import "../Article.scss"
import RadialStops from "../../RadialStops/RadialStops"

const b = BEM("Article")

const Subchapter_2_2 = () => (
  <section>
    <h2>Львів</h2>
    <p className={b("paragraph")}>
      Історію громадського транспорту Львова розпочав{" "}
      <a href={"https://uk.wikipedia.org/wiki/%D0%9E%D0%BC%D0%BD%D1%96%D0%B1%D1%83%D1%81"}>омнібус</a>. Багатомісний
      візок перевозив пасажирів із 1835 року. У 1880 на вулицях міста з’явився перший{" "}
      <a
        href={
          "https://uk.wikipedia.org/wiki/%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D1%82%D1%80%D0%B0%D0%BC%D0%B2%D0%B0%D0%B9#%D0%9A%D1%96%D0%BD%D0%BD%D0%B8%D0%B9_%D1%82%D1%80%D0%B0%D0%BC%D0%B2%D0%B0%D0%B9"
        }
      >
        кінний трамвай
      </a>
      . Темнокоричневі вагони курсували двома маршрутами: Залізничний вокзал - вул. Митна і Залізничний вокзал -
      Підзамче.
    </p>
    <figure>
      <img className={b("image")} src={"img/chapter2/lvivHorseTram.png"} alt={"Lviv Horse Tram"} />
      <figcaption className={b("image-caption")}>
        Закритий вагон кінного трамвая на площі Митній. (Фото з{" "}
        <a
          href={
            "https://uk.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:%D0%9F%D0%BB%D0%BE%D1%89%D0%B0_%D0%BC%D0%B8%D1%82%D0%BD%D0%B0_2%D0%B0.jpg"
          }
        >
          Вікіпедії
        </a>
        )
      </figcaption>
    </figure>
    <p className={b("paragraph")}>
      У кінці 19 століття конка не справлялась із потоком пасажирів. Тому в 1893 відбувся тендер на будівництво
      електричних трамвайних ліній. У конкурсі перемогла німецька фірма{" "}
      <a href={"https://en.wikipedia.org/wiki/Siemens_%26_Halske"}>Simens & Halske</a>. Компанія проклала 8.3 км
      трамвайних ліній і побудувала на вул. Сахарова трамвайне депо з електростанцією. В 1894 році 16 трамваїв вперше
      вийшли на маршрут.
    </p>
    <figure>
      <img className={b("image")} src={"img/chapter2/lvivHalytskaSquare.png"} alt={"Lviv Halytska Square"} />
      <figcaption className={b("image-caption")}>
        Площа Галицька. Зліва припарковані карети-таксі. Попереду - кінний трамвай, а ззаду - новий електричний вагон.
        Цікаво,{" "}
        <a
          href={
            "https://uk.wikipedia.org/wiki/%D0%9B%D1%96%D0%B2%D0%BE%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%BD%D0%BD%D1%96%D0%B9_%D1%80%D1%83%D1%85#%D0%9A%D1%80%D0%B0%D1%97%D0%BD%D0%B8,_%D1%89%D0%BE_%D0%B7%D0%BC%D1%96%D0%BD%D0%B8%D0%BB%D0%B8_%D0%BB%D1%96%D0%B2%D0%BE%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%BD%D0%BD%D1%96%D0%B9_%D1%80%D1%83%D1%85"
          }
        >
          що рух транспорту - лівосторонній
        </a>
        . Напрямок змінили на правосторонній лише в 1922 році.
      </figcaption>
    </figure>
    <p className={b("paragraph")}>
      Вагони працювали і в час німецької окупації. Але на деяких був{" "}
      <a href={"http://tvoemisto.tv/exclusive/lvivskyy_gromadskyy_transport_istoriya_u_fotografiyah_93007.html"}>
        надпис
      </a>{" "}
      “Тільки для німців”. Причепними вагонами часом перевозили в’язнів. До середини ХХ століття трамвай залишався
      основним транспортом міста. У 1928 році на вулицях з’явилися автобуси, а в 1952 році - тролейбуси.
    </p>
    <p className={b("paragraph")}>
      У 60-х роках виникла ідея будівництва{" "}
      <a
        href={
          "https://uk.wikipedia.org/wiki/%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9_%D0%BF%D1%96%D0%B4%D0%B7%D0%B5%D0%BC%D0%BD%D0%B8%D0%B9_%D1%82%D1%80%D0%B0%D0%BC%D0%B2%D0%B0%D0%B9"
        }
      >
        підземного трамваю
      </a>
      . У проекті були три лінії. Перша - від вулиці Сахарова до Мечнікова. Друга - між вулицями Снопківська і
      Гайдамацька. Останній тунель мав з’єднати північні райони із Новим Львовом і Сиховом.
    </p>
    <figure>
      <img src="/img/chapter2/lvivMetro.svg" alt={"Lviv Metro"} className={b("image")} />
      <figcaption className={b("image-caption")}>Схема львівського підземного трамваю</figcaption>
    </figure>
    <p className={b("paragraph")}>
      У 1987 запрацювала наземна частина колії по вул. Княгині Ольги. Будівництво першої підземної станції почали за
      палацом Потоцьких. Та ґрунт швидко почав просідати. На будівлі палацу виникла{" "}
      <a href={"https://intvua.com/news/society/1545305519-zherva-aviakatastrofi-ta-lvivskogo-metro-prolitayuchi.html"}>
        тріщина
      </a>{" "}
      шириною 30 сантиметрів. Роботу припинили, а викопану шахту залили бетоном. У 2008 ідея будівництва метро знову
      з’явилася у <a href={"https://www.city-adm.lviv.ua/lmr/images/stories/arhitect/123/01_genplan.pdf"}>генплані</a>{" "}
      міста, але до реалізації так і не дійшло.
    </p>
    <p className={b("paragraph")}>
      Про{" "}
      <a
        href={
          "http://tvoemisto.tv/exclusive/smilyve_rishennya_yak_shvydkisnyy_tramvay_mozhe_rozvantazhyty_lviv_92840.html"
        }
      >
        ідею будівництва львівського метро
      </a>{" "}
    </p>
    <p className={b("paragraph")}>
      Про <a href={"http://photo-lviv.in.ua/lvivski-tramvajni-depo-istoriya-i-suchasnist/"}>історію львівських депо</a>
    </p>
    <p className={b("paragraph")}>
      У дев’яностих на дорогах Львова з’явилися{" "}
      <a
        href={
          "https://uk.wikipedia.org/wiki/%D0%9F%D0%B8%D0%B6%D0%B8%D0%BA_(%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%BD%D0%B5_%D1%82%D0%B0%D0%BA%D1%81%D1%96)"
        }
      >
        “пижики”
      </a>
      . Їх назва пішла від назви моделі - “Peugeot Karsan J9”. При розрахунку на 20 осіб, у години-пік у салоні
      вміщалося до 50 пасажирів. Замість вирішення транспортної проблеми маленькі “Пижики” переповнили дороги і
      спричинили затори.
    </p>
    <figure>
      <img className={b("image")} src={"img/chapter2/lvivPyzhyk.png"} alt={"Lviv Pyzhyk"} />
      <figcaption className={b("image-caption")}>
        Peugeot Karsan J9 (фото з{" "}
        <a href={"https://commons.wikimedia.org/wiki/File:Peugeot_J9_Karsan_(1991-2006).jpg"}>Вікіпедії</a>)
      </figcaption>
    </figure>
    <p className={b("paragraph")}>
      На початку двохтисячних автомобілів у центрі стало ще більше. Люди потрапляли в корки, а транспорт відставав від
      розкладу. У місті було шумно і загазовано. До Євро-2012 французька компанія{" "}
      <a href={"https://www.louisberger.com/"}>Louis Berger</a> розпочала{" "}
      <a href={"https://zaxid.net/lvivskiy_transport_zmina_radikalna_ruh__radialniy_n1232279"}>
        реорганізацію транспортної системи
      </a>
      . Кошти для цього виділив ЄБРР.
    </p>
    <p className={b("paragraph")}>
      Однією з цілей проекту було полегшення руху в центрі. Тому до автобусних маршрутів додали шість радіальних ліній.
      Їх кінцеві зупинки розташували навколо центральної частини міста : “Добробут”, вул. Підвальна, пл. Галицька і пр.
      Свободи.
    </p>


    <div className={b("illustration", ["sticky"])} style={{ height: "180vh" }}>
      <div style={{ height: "65vh"}}>
        <RadialStops />
      </div>
    </div>
    {/*<img className={b("image")} src={"./img/chapter2/lvivCityCenter.png"} alt={"Lviv City Center"} />*/}


    <p className={b("paragraph")}>
      Для поїздок між околицями запланували 40 хордових маршрутів. Із транспортної схеми зникли автобуси, що дублювали
      шляхи електротранспорту. На автобусах встановили GPS пристрої. В кінці 2012 запрацював Центр управління дорожнім
      рухом. Він контролює систему “розумних світлофорів” і відслідковує рух громадського транспорту. Почали з’являтися
      велодоріжки. У 2013 центр Львова став пішохідним. Трамвайна мережа також зазнала змін: у 2016 відкрили швидкісну
      лінію на Сихів.
    </p>
    <p className={b("paragraph")}>
      Щоб пришвидшити рух громадського транспорту, на проспекті Свободи, біля Привокзального ринку, на вул. Січових
      Стрільців та вул. Мечникова облаштували окремі смуги для автобусів. Та вже з перших днів там почали паркувати
      приватні автомобілі. Попри те, що проблему вирішили не до кінця, у міськраді планують облаштувати ще сім таких
      смуг. Також влада працює над збільшенням кількості громадського транспорту. Пріоритет надають трамваю та
      тролейбусу.
    </p>
  </section>
)

export default Subchapter_2_2
