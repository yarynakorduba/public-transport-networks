import React from "react"
import Trigger from "../Trigger"
import londonBusNetwork from "../../images/london_bus_network_1.png"
import bristolBusNetwork from "../../images/bristol_bus_network.png"
import lvivBusNetwork from "../../images/lviv_bus_network.png"
import trafficJam from "../../images/traffic_jam.png"

import "./Article.scss"
const Article = () => (
  <div className={"Article"}>
    <header className={"Article__chapter"}>Вступ</header>
    <h1 className={"Article__header"}>Опис&nbsp;проблеми & Історичний&nbsp;прецедент</h1>
    <p className={"Article__paragraph Article__paragraph_first"}>
      Робота транспортної системи - важливий аспект життя кожного міста. Для створення стабільної і добре структурованої
      мережі громадського транспорту важливо не тільки забезпечити пасажирам якнайшвидше добирання до будь-якого пункту
      із найменшою кількістю пересадок, але й подбати про безпеку при виникненні непередбачуваних ситуацій у мережі.
    </p>
    <p className={"Article__paragraph"}>
      Нестійка мережа може швидко розвалитися як через випадкові "випадання" зупинок, так і при спрямованих атаках.
      Випадкові події включають у себе аварії, сильні затори чи навіть погані погодні умови у певній частині мережі,
      через що частина зупинок чи навіть увесь маршрут стають недоступними.
      <img className={"Article__image"} src={trafficJam} alt={"Traffic Jam"} />
      Та ще більш небезпечними є спрямовані атаки, наприклад, страйк на одній із зупинок чи терористичний акт. Такі
      події зазвичай трапляються у найбільш зв'язних точках мережі, так званих хабах, які є найбільш важливими для всієї
      мережі, оскільки обслуговують велику кількість маршрутів.
    </p>
    <h1 className={"Article__header"}>Науковий підхід</h1>
    <p className={"Article__paragraph Article__paragraph_first"}>
      У науковому світі з'явилося багато підходів для визначення ефективності та стійкості різних систем. Дане
      дослідження базується на побудові ненапрямленого графа маршрутів у трьох різних просторах* (оскільки зазвичай
      зупинки прямого та зворотного маршрутів знаходяться через дорогу одна від одної, останніми можна знехтувати. Для
      побудови графа у цьому дослідженні використовуються лише прямі маршрути): <i>L-space</i>, <i>P-space</i> i{" "}
      <i>C-space</i>, кожен із яких відображає різні аспекти роботи транспортної системи. <i>L-space</i> - найпростіший
      для нашого розуміння вимір, адже він відтворює "топографію" мережі. У цьому відображенні зупинки - це вузли графа,
      і два вузли пов'язані між собою ребром лише, якщо вони суміжні на маршруті. Маршрути пов'язані між собою через
      спільні зупинки. <i>P-space</i> відображає кількість пересадок, яку потрібно зробити, щоби здійснити поїздку між
      будь-якими двома зупинками. У цьому просторі всі зупинки-вузли, що належать до одного маршруту, з'єднані одна з
      одною прямим ребром, адже між кожними двома зупинками одного маршруту можна проїхати, не змінюючи транспорту. У{" "}
      <i>C-space</i> інформація більш узагальнена. Цей простір відображає зв'язки не між зупинками, а між маршрутами для
      того, щоби прослідкувати, скільки пересадок потрібно здійснити, щоби дістатися від зупинки одного маршруту до
      зупинки іншого маршруту.
    </p>
    <h1 className={"Article__header"}>Історія про три міста</h1>
    <p className={"Article__paragraph Article__paragraph_first"}>
      Для проведення дослідження ми обрали три різні транспортні системи: автобусні маршрути Лондона та Брістоля і
      мережу громадського транспорту Львова. У Лондоні - 767 маршрутів зі 16397 зупинками. Автобусна мережа Брістоля
      налічує 2873 зупинки, які входять до 143 маршрутів. Мережа Львова налічує 100 міських маршрутів, що обслуговують
      771 зупинку. Таким чином ми мали змогу дослідити подібні та відмінні характеристики трьох різних за розміром та
      систем.
    </p>
    <header className={"Article__chapter"}>Лондон та Брістоль</header>
    <p className={"Article__paragraph Article__paragraph_first"}>
      Дослідження для Лондона та Брістоля в <i>L-просторі</i> проводили раніше. Ці результати, а також характеристики
      транспортних систем 12 інших міст представлені у статті{" "}
      <a href={"https://arxiv.org/pdf/1705.07266.pdf"}>"Public transportation in UK viewed as a complex network"</a>.
      Спочатку для отримання повної картини ми відтворили результати двох міст у <i>L-space</i> і порівняли їх із
      попередніми даними, пізніше відобразили системи у двох інших вимірах.
    </p>
    <h1 className={"Article__header"}>Результати в &nbsp;L-просторі</h1>
    <p className={"Article__paragraph"}>
      Одною із перших характеристик, якими можна є охарактеризувати топографію мережі, є ступінь вузла{" "}
      <i>
        k<sub>i</sub>
      </i>
      . Він слугує одним із показників, що відображають важливість цього вузла для загальної системи. Найбільш зв'язні
      вузли називають хабами. У <i>L-просторі</i> ступінь вузла-зупинки показує, до скількох інших зупинок можна
      дістатися за один "крок". Узагальнений показник - середній ступінь вузла &lt;k&gt; надає інформацію про те, до
      скількох у середньому зупинок має зв'язок будь-яка зупинка мережі. Для Лондона і Брістоля ці показники приблизно
      однакові - 2.25 і . Більшість транспортних мереж мають подібний ступінь вузла в <i>L-space</i>, адже зазвичай у
      мережі є певна кількість кінцевих зупинок із лише одним з'єднанням, невелика кількість хабів і багато проміжних
      зупинок зі ступенем 2.
    </p>
    <p className={"Article__paragraph"}>
      Для пасажира важливо, щоби поїздка, яку потрібно здійснити до наступного пункту призначення, була якомога
      коротшою. Цей показник називають найкоротшим шляхом{" "}
      <i>
        l<sub>ij</sub>
      </i>{" "}
      для зупинок <i>i</i> та <i>j</i>. В аналізі ефективності системи транспорту використовують узагальнену
      характеристику - середній найкоротший шлях &lt;l&gt;. У відображенні системи Брістоля в L-просторі цей показник
      складає 27.755 зупинок, а в найдовший оптимальний маршрут входять 122 зупинки. Пасажиру лондонської автобусної
      мережі в середньому доведеться проїхати 64.364 зупинки, щоби дістатися до пункту призначення, а найдовша подорож
      буде складатися із 206 зупинок. Звичайно ж, цей показник залежить від величини мережі, і порівняння
      восьмимільйонника-Лондона до Брістоля із 500 000 людей не можна здійснювати за абсолютними характеристиками. Інший
      показник, - ефективність найкоротшого шляху l<sub>&eta;</sub> - відображає довжину середнього оптимального шляху
      відносно середнього найкоротшого шляху випадкового графа. (Випадкові графи - графи, які можуть бути описані через
      розподіл імовірності або випадковим процесом, що генерує їх. Випадкові графи використовують, щоби відповісти на
      запитання про характеристики типових графів. [Вікіпедія])
    </p>
    <p className={"Article__paragraph"}>Clustering coefficient (0.012 for London, 0.034 for Bristol)</p>
    <p className={"Article__paragraph"}>Assortativity (0.19 for London, 0.26 for Bristol)</p>
    <p className={"Article__paragraph"}>Betweenness centrality (0.01 for Bristol)</p>
    <p className={"Article__paragraph"}>Resilience --- Molloy-Reed criterion (2.471 for London, 2.734 for Bristol)</p>
    <h3>Далі буде...</h3>

    <p className={"Article__paragraph"}>
      The second transport system is the bus network of Bristol.
      <Trigger data={{ name: "London" }}>London bus network</Trigger> in L-space.
      <img className={"Article__image"} alt="London Bus Network" src={londonBusNetwork} />{" "}
      <img className={"Article__image"} alt="Bristol Bus Network" src={bristolBusNetwork} />
    </p>
    <p className={"Article__paragraph"}>
      Last but not least, we will explore Lviv public transport system.
      <img className={"Article__image"} alt="Lviv Bus Network" src={lvivBusNetwork} />
    </p>
    <p className={"Article__paragraph"}>
      Transport networks can be represented in different spaces. L-space is a representation where all the stops are the
      nodes and two stops are connected if they are adjacent in a route. A{" "}
      <Trigger data={{ name: "Bristol" }}>Bristol bus network</Trigger> in
      <Trigger data={{ space: "L" }}>L-space</Trigger> representation is shown on the right side of the page. This type
      of representation is the most understandable for people as it displays routes and their connections as they look
      in the real world.
    </p>
    <p className={"Article__paragraph"}>
      Another useful type of representation displays each route as a complete subgraph with the stops represented by the
      nodes. Two routes are connected if they share at least one stop. Such perspective is called{" "}
      <Trigger data={{ space: "P" }}>P-space</Trigger>. On the right side you can see the representation of Bristol bus
      network in P-space.
    </p>
    <p className={"Article__paragraph"}>
      To explore the network from different perspective, one can represent the routes by the nodes of the graph and show
      connections between them by the edges. Such perspective is called <Trigger data={{ space: "C" }}>C-space</Trigger>
      . Below is the representation of Bristol bus network in C-space.
    </p>
    <p className={"Article__paragraph"}>
      Explorations of <Trigger data={{ name: "London" }}>London public transport network</Trigger> were also made in
      three different spaces. Few years ago the scientists generated <Trigger data={{ space: "L" }}>L-space</Trigger>{" "}
      representation and extracted some features, such as mean node degree, mean shortest path length and the overall
      network resilience. Later, the representation in <Trigger>C-space</Trigger> was generated to analyse the network
      from the routes perspective.
    </p>
    <p className={"Article__paragraph"}>
      What's the use of buses? Buses may be used for scheduled bus transport, scheduled coach transport, school
      transport, private hire, or tourism; promotional buses may be used for political campaigns and others are
      privately operated for a wide range of purposes, including rock and pop band tour vehicles. Horse-drawn buses were
      used from the 1820s, followed by steam buses in the 1830s, and electric trolleybuses in 1882. The first internal
      combustion engine buses, or motor buses, were used in 1895.[3] Recently, interest has been growing in hybrid
      electric buses, fuel cell buses, and electric buses, as well as ones powered by compressed natural gas or
      biodiesel. As of the 2010s, bus manufacturing is increasingly globalised, with the same designs appearing around
      the world.
    </p>
    <p className={"Article__paragraph"}>
      Now let's look at busways busway or transitway, is a bus-based public transport system designed to improve
      capacity and reliability relative to a conventional bus system.[2] Typically, a BRT system includes roadways that
      are dedicated to buses, and gives priority to buses at intersections where buses may interact with other traffic;
      alongside design features to reduce delays caused by passengers boarding or leaving buses, or purchasing fares.
      BRT aims to combine the capacity and speed of a metro with the flexibility, lower cost and simplicity of a bus
      system.
    </p>
    <p className={"Article__paragraph"}>
      Lets look at the shortest route of Bristol public transport network, which describes a high-capacity urban
      public-transit system with its own right of way, multiple-car vehicles at short headways, and longer stop spacing
      than traditional streetcars and buses. BRT uses buses on a wide variety of rights-of-way, including mixed traffic,
      dedicated lanes on surface streets, and busways separated from traffic. The expression "BRT" is mainly used in the
      Americas and China; in India, it is called "BRTS" (BRT System); in Europe and Indonesia, it is often called a
      "busway"; while in the British Isles, it may be called a "quality bus".
    </p>
    <p className={"Article__paragraph"}>
      <Trigger data={{ name: "Lviv" }}>Critics</Trigger> have charged that the term "bus rapid transit" has sometimes
      been misapplied to systems that lack most or all the essential features which differentiate it from conventional
      bus services. The term "bus rapid transit creep" has been used to describe severely degraded levels of bus service
      which fall far short of the BRT Standard promoted by the Institute for Transportation and Development Policy and
      other organizations.
    </p>
    <h1 className={"Article__header"}>New&nbsp;Explorations: P-space and&nbsp;C-space</h1>
    <p className={"Article__paragraph"}>
      Lets look at the longest route ofBristol public transport network, It was converted from trolley to bus use in
      1948. However, the first BRT system in the world was the OC Transpo system in Ottawa, Canada. Introduced in 1973,
      the first element of its BRT system was dedicated bus lanes through the city centre, with platformed stops. The
      introduction of the first exclusive separate busways (termed 'Transitway') occurred in 1983. By 1996, all of the
      originally envisioned 31 km Transitway system was in operation; further expansions were opened in 2009, 2011, and
      2014. As of 2017, the central part of the Transitway is being converted to a Light Rail Transit, due to the
      downtown section being operated beyond its designed capacity.[4]
    </p>
    <header className={"Article__chapter"}>Lviv</header>
    <h1 className={"Article__header"}>Lviv Public&nbsp;Transport&nbsp;Dataset</h1>
    <p className={"Article__paragraph Article__paragraph_first"}>
      In the United States, BRT began in 1977, with Pittsburgh's South Busway,[10] operating on 4.3 miles (6.9 km) of
      exclusive lanes. Its success led to the Martin Luther King Jr. East Busway in 1983, a fuller BRT deployment
      including a dedicated busway of 9.1 miles (14.6 km), traffic signal preemption, and peak service headway as low as
      two minutes. After the opening of the West Busway, 5.1 miles (8.2 km) in length in 1990, Pittsburgh’s Busway
      system is today over 18.5 miles long.
    </p>
    <p className={"Article__paragraph"}>
      Bus-only lanes make for faster travel and ensure that buses are not delayed by mixed traffic congestion. A median
      alignment bus-only keeps buses away from busy curb-side side conflicts, where cars and trucks are parking,
      standing and turning. Separate rights of way may be used such as the completely elevated Xiamen BRT. Transit malls
      or 'bus streets' may also be created in city centers.
    </p>
    <h1 className={"Article__header"}>L-, P- and C-spaces: three views on Lviv`s Public Transport Network</h1>
    <p className={"Article__paragraph"}>...</p>
    <header>Conclusions</header>
    <p className={"Article__paragraph"}>...</p>
    <h1 className={"Article__header"}>Another visualizations</h1>
  </div>
)

export default Article
