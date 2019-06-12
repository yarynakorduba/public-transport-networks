import React from "react"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"
const b = BEM("Article")

const Chapter_1 = () => (
  <section id={"chapter1"}>
    <h1 className={b("header")}>Опис проблеми & Історичний прецедент</h1>
    <div className={b("illustration", ["sticky", "ref"])}>
      Про{" "}
      <a href={"https://data.worldbank.org/indicator/sp.urb.totl.in.zs?end=2017&start=1960&view=chart"}>
        зміни в кількості міського населення
      </a>
    </div>
    <p className={b("paragraph", ["first"])}>
      Однією з ключових характеристик сучасного світу є зростання ролі міста. В 1800 році лише{" "}
      <a className={b("ref-anchor")} href={"https://zbruc.eu/node/60862"}>
        3% людей проживали у містах
      </a>
      . Та вже в 2007 році кількість міського населення планети{" "}
      <a href={"https://data.worldbank.org/indicator/sp.urb.totl.in.zs?end=2017&start=1960&view=chart"}>
        перевищила 50%
      </a>
      <div className={b("ref-anchor")} />. Який простір є комфортним для життя? Як стимулювати розвиток міського
      бізнесу, інфраструктури та культури? Обговорення цих питань привели до виникнення урбаністики. Урбаністика -
      наука, спрямована на вирішення потреб сучасного міста і створення комфортних умов для його розвитку. Урбаністика
      поєднує різні галузі знань: соціологію, антропологію, економіку, щоби зробити міську територію зручною для кожного
      жителя.
    </p>
    <div className={b("illustration", ["sticky", "ref"])}>
      Про{" "}
      <a href={"https://globalurbanhistory.com/2015/12/06/detroit-capital-of-the-automotive-age/"}>
        "автомобільну столицю світу"
      </a>
    </div>
    <p className={b("paragraph")}>
      Існує багато відверто невдалих ідей проектування міст, наприклад, “американський шлях”. Його головні риси - масова
      автомобілізація та повільний розвиток громадського транспорту. Такою концепцією керувались у проектуванні
      Детройта. У 50 роках ХХ століття місто було{" "}
      <a href={"https://globalurbanhistory.com/2015/12/06/detroit-capital-of-the-automotive-age/"}>
        “автомобільною столицею світу”
      </a>{" "}
      та однією з найбагатших частин США. Завдяки заводам Ford, Chrysler i General Motors з’являлися тисячі робочих
      місць. Все більше жителів купували автомобілі за доступними цінами. Водночас система міського транспорту
      занепадала. У маркетингових кампаніях корпорації показували громадський транспорт як засіб пересування для
      бідняків.
    </p>
    <p className={b("paragraph")}>
      Підприємства виступали за ліквідацію трамвайних та тролейбусних ліній. Як альтернативу, почали будувати мережу
      швидкісних магістралей. Врешті, масова автомобілізація привела місто до краху. Детройт перетворився на територію
      для машин, велику автостоянку некомфортну для життя. Кричущим наслідком стало перетворення{" "}
      <a href={"https://afterthefinalcurtain.net/2013/04/30/the-michigan-theatre/"}>приміщення The Michigan Theatre</a>{" "}
      у парковку.
    </p>
    <div className={b("illustration", ["sticky", "ref"])}>
      Про <a href={"https://afterthefinalcurtain.net/2013/04/30/the-michigan-theatre/"}>The Michigan Theatre</a>
    </div>
    <figure>
      <img className={b("image")} src={"img/chapter1/michiganTheatre.png"} alt={"Michigan Theatre in Detroit"} />
      <figcaption className={b("image-caption")}>
        Michigan Theatre. (фото зі{" "}
        <a href={"https://afterthefinalcurtain.net/2013/04/30/the-michigan-theatre/"}>статті</a> Matthew Lambros "The
        Michigan Theatre" © Matthew Lambros and After the Final Curtain, 2013. )
      </figcaption>
    </figure>
    <p className={b("paragraph")}>
      Представники середнього класу почали переїжджати, покидаючи цілі квартали порожніми. Залишилися лише безробітні та
      робітники з низьким доходом. З’явилися кримінальні угрупування. В 70-их роках через{" "}
      <a
        href={
          "https://uk.wikipedia.org/wiki/%D0%9D%D0%B0%D1%84%D1%82%D0%BE%D0%B2%D0%B0_%D0%BA%D1%80%D0%B8%D0%B7%D0%B0_1973_%D1%80%D0%BE%D0%BA%D1%83"
        }
      >
        нафтову кризу
      </a>{" "}
      багато заводів закрили і відтік населення став ще більшим. Загалом за останні півстоліття кількість населення
      зменшилася в 2.5 рази. Сучасний Детройт - це{" "}
      <a href={"https://birdinflight.com/ru/vdohnovenie/20180417-ghost-town-detroit.html"}>місто порожніх вулиць</a>, у
      якому страшно покидати власний автомобіль.{" "}
      <a href="https://uk.wikipedia.org/wiki/%D0%94%D0%B5%D1%82%D1%80%D0%BE%D0%B9%D1%82#%D0%9F%D0%BE%D1%87%D0%B0%D1%82%D0%BE%D0%BA_%D0%B7%D0%B0%D0%BD%D0%B5%D0%BF%D0%B0%D0%B4%D1%83">
        [Вікіпедія]
      </a>
    </p>
    <figure>
      <img
        className={b("image")}
        src={"img/chapter1/detroitPackardPlant.png"}
        alt={"Abandoned Packard Plant in Detroit"}
      />
      <figcaption className={b("image-caption")}>
        Покинутий завод Packard. (Фото з{" "}
        <a
          href={
            "https://uk.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Abandoned_Packard_Automobile_Factory_Detroit_200.jpg"
          }
        >
          Вікіпедії
        </a>
        )
      </figcaption>
    </figure>
    <p className={b("paragraph")}>
      Та існує інший, “європейський” шлях розвитку. Один із його прикладів - Амстердам,{" "}
      <a
        href={
          "https://www.theguardian.com/cities/2015/may/05/amsterdam-bicycle-capital-world-transport-cycling-kindermoord"
        }
      >
        велосипедна столиця світу
      </a>
      .
    </p>{" "}
    <div className={b("illustration", ["sticky", "ref"])}>
      Про <a href={"https://velogen.ua/ukraine/statti/niderland"}>Амстердам та велосипеди</a>
    </div>
    <p className={b("paragraph")}>
      В середині ХХ століття це місто також могло стати на шлях автомобілізації. Влада{" "}
      <a
        href={
          "https://uk.wikipedia.org/wiki/%D0%90%D0%BC%D1%81%D1%82%D0%B5%D1%80%D0%B4%D0%B0%D0%BC#XX_%D1%81%D1%82%D0%BE%D0%BB%D1%96%D1%82%D1%82%D1%8F"
        }
      >
        почала зносити цілі квартали
      </a>{" "}
      задля будівництва доріг. Але такі дії викликали спротив жителів. Ще одною причиною невдоволення була висока
      смертність на дорогах. Активісти групи Stop de Kindermoord (“зупинимо вбивство дітей”) регулярно влаштовували
      страйки і перекривали автошляхи велосипедами.
    </p>{" "}
    <p className={b("paragraph")}>
      В 70-х роках через високі ціни на нафту влада почала нову політику, спрямовану на зменшення використання
      особистого транспорту. Відбувалися акції{" "}
      <a href={"https://bicycledutch.wordpress.com/2013/12/01/car-free-sundays-a-40-year-anniversary/"}>
        “День без автомобілів”
      </a>
      . З’явилися мережі велодоріжок. Зараз вулиці Амстердама проектують, виходячи у першу чергу з потреб пішоходів. У
      місті практично немає заторів, адже автомобілів тут небагато. Жителі переважно користуються велосипедами або
      громадським транспортом. <a href={"https://www.amsterdam.info/transport/public-transport/"}>Транспортна мережа</a>{" "}
      включає 4 лінії метро, 15 трамвайних ліній, 43 автобусні маршрути та 6 поромів. Останніми можна подорожувати
      безкоштовно.
    </p>{" "}
    <div className={b("illustration", ["sticky", "ref"])}>
      Про <a href={"http://urbanua.org/dosvid/zakordonni-pryklady/289"}>дороги та безпеку пересування</a>
    </div>
    <p className={b("paragraph")}>
      Амстердам та загалом Нідерланди - це приклад хорошого планування. Найбільші транспортні вузли часто побудовані, як
      багаторівневі станції із метро, автостанцією, залізницею та велопарковкою на різних поверхах. Основні їх
      характеристики - елегантність, продуманість і очевидність. У пасажирів не виникає питань, куди їм потрібно іти.
      Одна із таких розв’язок - Центральний вокзал Гааги.
    </p>{" "}
    <div className={b("illustration", ["sticky", "ref"])}>
      Про <a href={"https://alex-shutyuk.livejournal.com/375362.html"}>залізниці Нідерландів</a>
    </div>
    <figure>
      <img className={b("image")} src={"img/chapter1/haagCentralStation.png"} alt={"Haag Central Station"} />
      <figcaption className={b("image-caption")}>
        Гаазький багаторівневий вокзал (фото з <a href={"https://alex-shutyuk.livejournal.com/375362.html"}>блогу</a>{" "}
        Олександра Шутюка)
      </figcaption>
    </figure>
    <p className={b("paragraph")}>
      Урбаністика досліджує багато прикладів планування. Адже основне її завдання - осмислення історичних помилок і
      вироблення системи рекомендацій, базованих на досвіді та відчуттях. У даній статті ми хочемо розглянути кілька
      наукових підходів із проектування міст, а саме - проектування транспортних систем на прикладі Брістоля і
      Львова.
    </p>
  </section>
)

export default Chapter_1
