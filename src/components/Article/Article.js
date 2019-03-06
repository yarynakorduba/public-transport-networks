import React from "react"
import Trigger from "../Trigger"
import londonBusNetwork from "../../images/london_bus_network_1.png"
import bristolBusNetwork from "../../images/bristol_bus_network.png"
import lvivBusNetwork from "../../images/lviv_bus_network.png"
import trafficJam from "../../images/traffic_jam.png"
import * as BristolLSpace from "../../images/bristolLSpace.png"
import * as BristolCSpace from "../../images/bristolCSpace.png"
import { ReactComponent as ExampleLSpace } from "../../images/exampleLSpace.svg"
import { ReactComponent as ExamplePSpace } from "../../images/examplepSpace.svg"
import { ReactComponent as ExampleCSpace } from "../../images/exampleCSpace.svg"
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
      дослідження базується на побудові ненапрямленого графа маршрутів у трьох різних просторах: <i>L-space</i>,{" "}
      <i>P-space</i> i <i>C-space</i>, кожен із яких відображає різні аспекти роботи транспортної системи.{" "}
      <i>L-space</i> - найпростіший для нашого розуміння вимір, адже він відтворює "топографію" мережі. У цьому
      відображенні зупинки - це вузли графа, і два вузли пов'язані між собою ребром лише, якщо вони суміжні на маршруті.
      Маршрути пов'язані між собою через спільні зупинки. (Оскільки зазвичай зупинки прямого та зворотного маршрутів
      знаходяться через дорогу одна від одної, останніми можна знехтувати. Для побудови графа у цьому дослідженні
      використовуються лише прямі маршрути)
      <ExampleLSpace className={"Article__image Article__image_small"} />
      <i>P-space</i> відображає кількість пересадок, яку потрібно зробити, щоби здійснити поїздку між будь-якими двома
      зупинками. У цьому просторі всі зупинки-вузли, що належать до одного маршруту, з'єднані одна з одною прямим
      ребром, адже між кожними двома зупинками одного маршруту можна проїхати, не змінюючи транспорту.{" "}
      <ExamplePSpace className={"Article__image Article__image_small"} />У <i>C-space</i> інформація більш узагальнена.
      Цей простір відображає зв'язки не між зупинками, а між маршрутами для того, щоби прослідкувати, скільки пересадок
      потрібно здійснити, щоби дістатися від зупинки одного маршруту до зупинки іншого маршруту.
      <ExampleCSpace className={"Article__image Article__image_small"} />
    </p>
    <h1 className={"Article__header"}>Історія про три міста</h1>
    <p className={"Article__paragraph Article__paragraph_first"}>
      Завдяки проведеним дослідженням науковці помітили, що набір певних характеристик у багатьох мереж транспорту
      незалежно від розміру є подібним. Однак існують ознаки, між якими часто відсутня кореляція. Для розуміння
      функціонування мереж та знаходження шляхів для їх оптимізації важливо навчитися відслідковувати як наявність, так
      і відсутність закономірностей.
    </p>
    <p className={"Article__paragraph"}>
      Для проведення дослідження ми обрали три різні транспортні системи: автобусні маршрути Лондона та Брістоля і
      мережу громадського транспорту Львова. У Лондоні - 767 маршрутів зі 16397 зупинками.
      <img className={"Article__image"} alt="London Bus Network" src={londonBusNetwork} /> Автобусна мережа Брістоля
      налічує 2873 зупинки, які входять до 143 маршрутів.{" "}
      <img className={"Article__image"} alt="Bristol Bus Network" src={bristolBusNetwork} />
      Мережа Львова налічує 100 міських маршрутів, що обслуговують 771 зупинку.{" "}
      <img className={"Article__image"} alt="Lviv Bus Network" src={lvivBusNetwork} />
      Таким чином ми мали змогу порівняти характеристики трьох різних за розміром та систем.
    </p>
    <header className={"Article__chapter"}>Лондон та Брістоль</header>
    <p className={"Article__paragraph Article__paragraph_first"}>
      Дослідження для Лондона та Брістоля в <i>L-просторі</i> проводили раніше. Ці результати, а також аналіз
      транспортних систем 12 інших міст представлені у статті{" "}
      <a href={"https://arxiv.org/pdf/1705.07266.pdf"}>"Public transportation in UK viewed as a complex network"</a>.
      Для отримання повної картини ми відтворили результати двох міст у <i>L-space</i> і порівняли їх із попередніми
      даними, пізніше відобразили системи у двох інших вимірах. На зображенні представлена візуалізація Брістоля в
      L-просторі. Білі вузли - кінцеві зупинки. Жовті - зупинки із більш, ніж п'ятьма з'єднаннями. (Задля покращення
      сприйняття інформації проміжні зупинки (зупинки із двома з'єднаннями) не відображаються.)
      <img alt="Bristol L Space" src={BristolLSpace} className={"Article__image Article__image_small"} />
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
    <p className={"Article__paragraph"}>
      Ще один показник для досліджень - коефіцієнт кластерності <i>С</i>. Ця характеристика показує, скільки найближчих
      сусідів певного вузла є сусідами одне одного. І в Брістоля і в Лондона коефіцієнти кластерності доволі високі,
      причому показник першого є вищим - 0.034 у Брістоля проти 0.012 у Лондона.
    </p>
    <p className={"Article__paragraph"}>
      Мережі Лондона та Брістоля мають також високі значення асортативності: 0.19 та 0.26. Асортативність <i>r</i> -
      тенденція вузлів одного ступеня приєднуватися. Мережі, де така тенденція спостерігається, тобто <i>r &gt; 0</i>,
      називають асортативними. І навпаки, якщо <i>r &lt; 0</i>, можна зробити висновок, що вузли високого ступеня
      частіше будують зв'язки із вузлами невисокого ступеня. Такі мережі називають неасортативними.
    </p>
    <p className={"Article__paragraph"}>
      Що може вказувати на важливість певної зупинки у мережі? Раніше ми описували, що одним із таких показників є її
      ступінь. Однак пасажиру громадського транспорту зазвичай важливі не зупинки на перетині найбільшої кількості
      маршрутів, а станції, через які проходить найбільша кількість оптимальних шляхів. Тому для характеристики вузла
      вагомішим за ступінь може бути показник центральності (betweenness centrality)
      <i>
        C<sub>&beta;</sub>
      </i>
      . Значення betweenness centrality пов'язане зі зв'язністю мережі. Наявність вузлів із дуже високою центральністю
      робить мережу більш вразливою до атак. Припинення функціонування однієї із зупинок із високим значенням{" "}
      <i>
        C<sub>&beta;</sub>
      </i>{" "}
      може призвести до суттєвого збільшення довжини оптимальних шляхів, а в гіршому випадку до роз'єднання мережі. Для
      аналізу мережі використовують середню центральність (mean betweenness centrality). Для Брістоля цей показник
      складає 0.01, а в Лондона 0.004.
    </p>
    <p className={"Article__paragraph"}>
      Загальна стійкість мережі до вилучення вузлів може вимірюватися різними способами. Один із них - Molloy-Reed
      criterion (
      <a href={"https://onlinelibrary.wiley.com/doi/abs/10.1002/rsa.3240060204"}>
        Molloy and Reed "A critical point for random graphs with a given degree sequence"
      </a>
      ) <i>к</i>. Цей критерій дозволяє визначити стійкість до рандомних атак і відображає наявність гігантської
      зв'язної компоненти (Giant Connected Component) у мережі. Вважається, що мережа є стійкою, якщо{" "}
      <i>
        к = &lt;k<sup>2</sup>&gt;/&lt;k&gt; &lte;2
      </i>{" "}
      (відношення квадрата середнього ступеня вузлів до середнього ступеня вузлів). Molloy-Reed критерій показав, що
      обидві досліджувані мережі є стійкими, причому транспортна системи Брістоля в <i>L-просторі</i> має краще значення
      стійкості - <i>к=2.734</i>, в той час, як для Лондона <i>k=2.471</i>.
    </p>
    <h1 className={"Article__header"}>
      Лондон і Брістоль в &nbsp;<i>P-</i> та <i> C-просторі</i>
    </h1>
    <h3>Далі буде...</h3>
    <p className={"Article__paragraph Article__paragraph_first"}>
      C-простір - найбільш компактний. Адже замість зв'язків між зупинками він відображає перетини маршрутів.
      <img alt="Bristol C Space" className="Article__image Article__image_small" src={BristolCSpace} />
    </p>
    <p className={"Article__paragraph"}>
      <Trigger data={{ name: "Bristol" }}>Bristol bus network</Trigger>
      <Trigger data={{ space: "L" }}>L-space</Trigger>
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
    <h1 className={"Article__header"}>New&nbsp;Explorations: P-space and&nbsp;C-space</h1>
    <header className={"Article__chapter"}>Lviv</header>
    <h1 className={"Article__header"}>Lviv Public&nbsp;Transport&nbsp;Dataset</h1>
    <h1 className={"Article__header"}>L-, P- and C-spaces: three views on Lviv`s Public Transport Network</h1>
    <p className={"Article__paragraph"}>...</p>
    <header>Conclusions</header>
    <p className={"Article__paragraph"}>...</p>
    <h1 className={"Article__header"}>Another visualizations</h1>
  </div>
)

export default Article
