import React from "react"
import Latex from "react-latex"
import Trigger from "../Trigger"
import londonBusNetwork from "../../images/london_bus_network_1.png"
import bristolBusNetwork from "../../images/bristol_bus_network.png"
import lvivBusNetwork from "../../images/lviv_bus_network.png"
import trafficJam from "../../images/traffic_jam.png"
import BristolLSpace from "../../images/bristolLSpace.png"
import BristolCSpace from "../../images/bristolCSpace.png"
import bristolLSpaceRandomAttack from "../../images/simulations/bristol_l_space_random_attacks_5_trials.png"
import bristolLSpaceTargetedByBetweennessInitial from "../../images/simulations/bristol_l_space_targeted_attack_by_betweenness_initial.png"
import bristolLSpaceTargetedByBetweennessRecalculated from "../../images/simulations/bristol_l_space_targeted_attack_by_betweenness_recalculated.png"
import { ReactComponent as ExampleLSpace } from "../../images/exampleLSpace.svg"
import { ReactComponent as ExamplePSpace } from "../../images/examplepSpace.svg"
import { ReactComponent as ExampleCSpace } from "../../images/exampleCSpace.svg"
import BEM from "../../helpers/BEM.js"
import "./Article.scss"

const b = BEM("Article")

const Article = () => (
  <div className={b()}>
    <header className={b("chapter")}>Вступ</header>
    <h1 className={b("header")}>Опис проблеми & Історичний прецедент</h1>
    <p className={b("paragraph", ["first"])}>
      Робота транспортної системи - важливий аспект життя кожного міста. Для створення стабільної і добре структурованої
      мережі громадського транспорту важливо не тільки забезпечити пасажирам якнайшвидше добирання до будь-якого пункту
      із найменшою кількістю пересадок, але й подбати про безпеку при виникненні непередбачуваних ситуацій у мережі.
    </p>
    <p className={b("paragraph")}>
      Нестійка мережа може швидко розвалитися як через випадкові "випадання" зупинок, так і при спрямованих атаках.
      Випадкові події включають у себе аварії, сильні затори чи навіть погані погодні умови у певній частині мережі,
      через що частина зупинок чи навіть увесь маршрут стають недоступними.
      <img className={b("image")} src={trafficJam} alt={"Traffic Jam"} />
      Та ще більш небезпечними є спрямовані атаки, наприклад, страйк на одній із зупинок чи терористичний акт. Такі
      події зазвичай трапляються у найбільш зв'язних точках мережі, так званих хабах, які є найбільш важливими для всієї
      мережі, оскільки обслуговують велику кількість маршрутів.
    </p>
    <h1 className={b("header")}>Науковий підхід</h1>
    <p className={b("paragraph", ["first"])}>
      У науковому світі з'явилося багато підходів для визначення ефективності та стійкості різних систем. Дане
      дослідження базується на побудові ненапрямленого графа маршрутів у трьох різних просторах:{" "}
      <Latex>$L\text-space$</Latex>, <Latex>$P\text-space$</Latex> i <Latex>$C\text-space$</Latex>, кожен із яких
      відображає різні аспекти роботи транспортної системи. <Latex>$L\text-space$</Latex> - найпростіший для нашого
      розуміння вимір, адже він відтворює "топографію" мережі. У цьому відображенні зупинки - це вузли графа, і два
      вузли пов'язані між собою ребром лише, якщо вони суміжні на маршруті. Маршрути пов'язані між собою через спільні
      зупинки. (Оскільки зазвичай зупинки прямого та зворотного маршрутів знаходяться через дорогу одна від одної,
      останніми можна знехтувати. Для побудови графа у цьому дослідженні використовуються лише прямі маршрути)
      <ExampleLSpace className={b("image", ["small"])} />
      <Latex>$P\text-space$</Latex> відображає кількість пересадок, яку потрібно зробити, щоби здійснити поїздку між
      будь-якими двома зупинками. У цьому просторі всі зупинки-вузли, що належать до одного маршруту, з'єднані одна з
      одною прямим ребром, адже між кожними двома зупинками одного маршруту можна проїхати, не змінюючи транспорту.{" "}
      <ExamplePSpace className={b("image", ["small"])} />У <Latex>$C\text-space$</Latex> інформація більш узагальнена.
      Цей простір відображає зв'язки не між зупинками, а між маршрутами для того, щоби прослідкувати, скільки пересадок
      потрібно здійснити, щоби дістатися від зупинки одного маршруту до зупинки іншого маршруту.
      <ExampleCSpace className={b("image", ["small"])} />
    </p>
    <h1 className={b("header")}>Історія про три міста</h1>
    <p className={b("paragraph", ["first"])}>
      Завдяки проведеним дослідженням науковці помітили, що набір певних характеристик у багатьох мереж транспорту
      незалежно від розміру є подібним. Однак існують ознаки, між якими часто відсутня кореляція. Для розуміння
      функціонування мереж та знаходження шляхів для їх оптимізації важливо навчитися відслідковувати як наявність, так
      і відсутність закономірностей.
    </p>
    <p className={b("paragraph")}>
      Для проведення дослідження ми обрали три різні транспортні системи: автобусні маршрути Лондона та Брістоля і
      мережу громадського транспорту Львова. У Лондоні - 767 маршрутів зі 16397 зупинками.
      <img className={b("image")} alt="London Bus Network" src={londonBusNetwork} /> Автобусна мережа Брістоля налічує
      2873 зупинки, які входять до 143 маршрутів.{" "}
      <img className={b("image")} alt="Bristol Bus Network" src={bristolBusNetwork} />
      Мережа Львова налічує 100 міських маршрутів, що обслуговують 771 зупинку.{" "}
      <img className={b("image")} alt="Lviv Bus Network" src={lvivBusNetwork} />
      Таким чином ми мали змогу порівняти характеристики трьох різних за розміром та систем.
    </p>
    <header className={b("chapter")}>Лондон та Брістоль</header>
    <p className={b("paragraph", ["first"])}>
      Дослідження для Лондона та Брістоля в <Latex>$L\text-просторі$</Latex> проводили раніше. Ці результати, а також
      аналіз транспортних систем 12 інших міст представлені у статті{" "}
      <a href={"https://arxiv.org/pdf/1705.07266.pdf"}>"Public transportation in UK viewed as a complex network"</a>.
      Для отримання повної картини ми відтворили результати двох міст у <Latex>$L\text-space$</Latex> і порівняли їх із
      попередніми даними, пізніше відобразили системи у двох інших вимірах. На зображенні представлена візуалізація
      Брістоля в L-просторі. Білі вузли - кінцеві зупинки. Жовті - зупинки із більш, ніж п'ятьма з'єднаннями. (Задля
      покращення сприйняття інформації проміжні зупинки (зупинки із двома з'єднаннями) не відображаються.)
      <img src={BristolLSpace} className={b("image")} />
    </p>
    <h1 className={b("header")}>Топографічні характеристики в &nbsp;L-просторі</h1>
    <p className={b("paragraph")}>
      Одною із перших характеристик, якими можна є охарактеризувати топографію мережі, є ступінь вузла{" "}
      <Latex>$k_i$</Latex>. Він слугує одним із показників, що відображають важливість цього вузла для загальної
      системи. Найбільш зв'язні вузли називають хабами. В <Latex>$L\text-просторі$</Latex> ступінь вузла-зупинки
      показує, до скількох інших зупинок можна дістатися за один "крок". Узагальнений показник - середній ступінь вузла
      &lt;k&gt; надає інформацію про те, до скількох у середньому зупинок має зв'язок будь-яка зупинка мережі. Для
      Лондона і Брістоля ці показники приблизно однакові - 2.25 і . Більшість транспортних мереж мають подібний ступінь
      вузла в <Latex>$L\text-space$</Latex>, адже зазвичай у мережі є певна кількість кінцевих зупинок із лише одним
      з'єднанням, невелика кількість хабів і багато проміжних зупинок зі ступенем 2.
    </p>
    <p className={b("paragraph")}>
      Для пасажира важливо, щоби поїздка, яку потрібно здійснити до наступного пункту призначення, була якомога
      коротшою. Цей показник називають найкоротшим шляхом <Latex>$l_ij$</Latex> для зупинок <Latex>$i$</Latex> та{" "}
      <Latex>$j$</Latex>. В аналізі ефективності системи транспорту використовують узагальнену характеристику - середній
      найкоротший шлях <Latex>$\lang l \rang$</Latex>. У відображенні системи Брістоля в L-просторі цей показник складає
      27.755 зупинок, а в найдовший оптимальний маршрут входять 122 зупинки. Пасажиру лондонської автобусної мережі в
      середньому доведеться проїхати 64.364 зупинки, щоби дістатися до пункту призначення, а найдовша подорож буде
      складатися із 206 зупинок. Звичайно ж, цей показник залежить від величини мережі, і порівняння
      восьмимільйонника-Лондона до Брістоля із 500 000 людей не можна здійснювати за абсолютними характеристиками. Інший
      показник, - ефективність найкоротшого шляху
      <Latex>$l_\beta$</Latex> - відображає довжину середнього оптимального шляху відносно середнього найкоротшого шляху
      випадкового графа. (Випадкові графи - графи, які можуть бути описані через розподіл імовірності або випадковим
      процесом, що генерує їх. Випадкові графи використовують, щоби відповісти на запитання про характеристики типових
      графів. [Вікіпедія])
    </p>
    <p className={b("paragraph")}>
      Ще один показник для досліджень - коефіцієнт кластерності <Latex>$С$</Latex>. Ця характеристика показує, скільки
      найближчих сусідів певного вузла є сусідами одне одного. І в Брістоля і в Лондона коефіцієнти кластерності доволі
      високі, причому показник першого є вищим - 0.034 у Брістоля і 0.012 у Лондона.
    </p>
    <p className={b("paragraph")}>
      Мережі Лондона та Брістоля мають також високі значення асортативності: 0.19 та 0.26. Асортативність{" "}
      <Latex>$r$</Latex> - тенденція вузлів одного ступеня приєднуватися. Мережі, де така тенденція спостерігається,
      тобто <Latex>$r \gt 0$</Latex>, називають асортативними. І навпаки, якщо <Latex>$r \lt 0$</Latex>, можна зробити
      висновок, що вузли високого ступеня частіше будують зв'язки із вузлами невисокого ступеня. Такі мережі називають
      неасортативними.
    </p>
    <p className={b("paragraph")}>
      Що може вказувати на важливість певної зупинки у мережі? Раніше ми описували, що одним із таких показників є її
      ступінь. Однак пасажиру громадського транспорту зазвичай важливі не зупинки на перетині найбільшої кількості
      маршрутів, а станції, через які проходить найбільша кількість оптимальних шляхів. Тому для характеристики вузла
      вагомішим за ступінь може бути показник центральності (betweenness centrality)
      <Latex>$C_\beta$</Latex>. Значення betweenness centrality пов'язане зі зв'язністю мережі. Наявність вузлів із дуже
      високою центральністю робить мережу більш вразливою до атак. Припинення функціонування однієї із зупинок із
      високим значенням <Latex>$C_\beta$</Latex> може призвести до суттєвого збільшення довжини оптимальних шляхів, а в
      гіршому випадку до роз'єднання мережі. (0.01 for Bristol)
    </p>
    <p className={b("paragraph")}>
      Загальна стійкість мережі до вилучення вузлів може вимірюватися різними способами. Один із них - Molloy-Reed
      criterion (
      <a href={"https://onlinelibrary.wiley.com/doi/abs/10.1002/rsa.3240060204"}>
        Molloy and Reed "A critical point for random graphs with a given degree sequence"
      </a>
      ) <Latex>$к$</Latex>. Цей критерій дозволяє визначити стійкість до рандомних атак і відображає наявність
      гігантської зв'язної компоненти (Giant Connected Component) у мережі. Вважається, що мережа є стійкою, якщо{" "}
      <Latex>$$ \kappa \lang k^2 \rang \div \lang k \rang \geq 2 $$</Latex> (відношення квадрата середнього ступеня
      вузлів до середнього ступеня вузлів). Molloy-Reed критерій показав, що обидві досліджувані мережі є стійкими,
      причому транспортна системи Брістоля в <Latex>$L\text-просторі$</Latex> має краще значення стійкості -{" "}
      <Latex>$к=2.734$</Latex>, в той час, як для Лондона <Latex>$k=2.471$</Latex>.
    </p>
    <h1 className={b("header")}>
      Топографічні характеристики &nbsp;<Latex>$P$</Latex> та <Latex>$C\text-space$</Latex>
    </h1>
    <h3>Далі буде...</h3>
    <p className={b("paragraph", ["first"])}>
      У <Latex>$P\text-просторі$</Latex> мережа є сильно зв'язною.
    </p>
    <p className={b("paragraph", ["first"])}>
      <Latex>$C\text-space$</Latex> - найбільш компактний. Адже замість зв'язків між зупинками він відображає перетини
      маршрутів. Цей простір є корисним, наприклад, для визначення середньої кількості пересадок між різними маршрутами.
      Ось як виглядає автобусна мережа Брістоля у цьому відображенні:
      <img className={b("image")} src={BristolCSpace} />У цій мережі є 143 вузли-маршрути, які поєднуються 1897
      зв'язками. Значення k (середня кількість зв'язків, що відходять від вузла), відповідно, високе - 26.5. Це означає,
      що маршрут брістольської мережі у середньому поєднаний із ще 26.5 іншими маршрутами (має з ними хоча б одну
      спільну зупинку). А максимальний ступінь вузла k max (max node найбільша кількість зв'язків, що зустрічається у
      мережі) дорівнює 48. Довжина середнього оптимального шляху між маршрутами - 1.96, а найдовший оптимальний шлях
      складається із 4 "кроків", тобто пасажиру потрібно здійснити 4 пересадки, щоби здійснити поїздку між двома
      найбільш віддаленими вузлами мережі (тут про віддаленість йдеться у контексті кількості вузлів, які потрібно
      "пройти", а не просторових відстаней). Асортативність такої мережі додатня - 0.14, тобто маршрути із великою
      кількістю зв'язків зазвичай поєднані між собою. Коефіцієнт кластерності (характеристика, що відображає, з якою
      імовірністю сусіди певного вузла є сусідами одне одного) Брістоля в C-просторі доволі високий - 0.503 у порівнянні
      з 0.034 в L-просторі. Можемо припустити, що через високе значення цієї характеристики, мережа в контексті
      функціонування і видалення певної частки маршрутів є стійкішою, ніж при видаленні такої ж частки зупинок. Середнє
      значення центральності вузлів (mean betweenness centrality) <Latex>$C_\beta=0.007$</Latex>.
    </p>
    <p>
      ..в той час як у лондонській мережі їх кількість -{" "}
      <span style={{ background: "orange", padding: "0.3rem" }}>?</span>
    </p>
    <h1 className={b("header")}>Стійкість до атак</h1>
    <p className={b("paragraph")}>
      Існує багато характеристик, які різними методами означують стійкість мережі при незвичайних випадках. Та жодна з
      них не відобразить стан справ краще за симуляцію атак. Щоби порівняти стійкість мережі за різних умов, ми провели
      декілька видів симуляцій:
    </p>
    <ul>
      <li>випадкові "падіння" зупинок</li>
      <li>атаки на вузли із найбільшим ступенем</li>
      <li>атаки на вузли із найбільшою проміжною центральністю (betweenness centrality)</li>
    </ul>
    <p className={b("paragraph")}>
      Для симуляції атак ми почергово видаляємо із мережі 1% від початкової кількості вузлів доки мережа повністю не
      зникне. Після кожного видалення обраховуємо розмір найбільшої зв'язної компоненти (<Latex>$GCC$</Latex>) відносно
      початкового розміру мережі. У ситуації з випадковими атаками 1% вузлів завжди визначається рандомно. Для симуляцій
      спрямованих атак вузли сортують у спадному порядку за певним критерієм і щоразу видаляють елементи із початку
      списку. Важливо, що після видалень певної кількості вузлів характеристики тих, що залишилися, а через те і їх
      порядок, можуть змінитися. Тому в дослідженні спрямованих атак кожна із симуляцій має два підтипи:{" "}
    </p>
    <ul>
      <li>видалення вузлів за первинним порядком</li>
      <li>видалення із пересортуванням</li>
    </ul>
    <p className={b("paragraph")}>
      Видалення вузлів у кожному з відображень має окреме значення. B <Latex>$L\text-space$</Latex> видалення вузла
      означає, що зупинка є заблокованою. Тобто, якщо на якійсь зупинці трапилася аварія, то щоби дістатися інших
      зупинок того ж маршруту, потрібно користуватися іншими маршрутами. В <Latex>$P\text-space$</Latex>, оскільки всі
      станції одного маршруту є поєднаними між собою, випадіння вузла не означає, що аби дістатися інших зупинок того ж
      маршруту, потрібно робити пересадку. Тут видалення вузла може прирівнюватися до ситуації, коли автобус проїжджає
      повз станцію, але більше там не зупиняється. В <Latex>$C\text-space$</Latex> атака на вузол означає припинення
      курсування певного маршруту.
    </p>
    <p className={b("paragraph")}>
      Симуляція атак на Брістоль в <Latex>$L\text-просторі$</Latex> показує, що випадкові атаки руйнують мережу
      найповільніше.
      <img className={b("image")} alt={"Bristol L Space Random Attack"} src={bristolLSpaceRandomAttack} />
      Трошки швидше мережа руйнується при атаках на вузли за значенням betweenness centrality, причому видалення із
      пересортуванням є значно ефективнішим, ніж видалення за первинним порядком.
    </p>
    <img
      className={b("image", ["small", "inline"])}
      alt={"Bristol L Space Targeted Attack By Betweenness Initial"}
      src={bristolLSpaceTargetedByBetweennessInitial}
    />
    <img
      className={b("image", ["small", "inline"])}
      alt={"Bristol L Space Targeted Attack By Betweenness Recalculated"}
      src={bristolLSpaceTargetedByBetweennessRecalculated}
    />
    <p className={b("paragraph")}>
      <Trigger data={{ name: "Bristol" }}>Bristol bus network</Trigger>
      <Trigger data={{ space: "L" }}>L-space</Trigger>
      Another useful type of representation displays each route as a complete subgraph with the stops represented by the
      nodes. Two routes are connected if they share at least one stop. Such perspective is called{" "}
      <Trigger data={{ space: "P" }}>P-space</Trigger>. On the right side you can see the representation of Bristol bus
      network in P-space.
    </p>
    <p className={b("paragraph")}>
      To explore the network from different perspective, one can represent the routes by the nodes of the graph and show
      connections between them by the edges. Such perspective is called <Trigger data={{ space: "C" }}>C-space</Trigger>
      . Below is the representation of Bristol bus network in C-space.
    </p>
    <p className={b("paragraph")}>
      Explorations of <Trigger data={{ name: "London" }}>London public transport network</Trigger> were also made in
      three different spaces. Few years ago the scientists generated <Trigger data={{ space: "L" }}>L-space</Trigger>{" "}
      representation and extracted some features, such as mean node degree, mean shortest path length and the overall
      network resilience. Later, the representation in <Trigger>C-space</Trigger> was generated to analyse the network
      from the routes perspective.
    </p>
    <p className={b("paragraph")}>
      What's the use of buses? Buses may be used for scheduled bus transport, scheduled coach transport, school
      transport, private hire, or tourism; promotional buses may be used for political campaigns and others are
      privately operated for a wide range of purposes, including rock and pop band tour vehicles. Horse-drawn buses were
      used from the 1820s, followed by steam buses in the 1830s, and electric trolleybuses in 1882. The first internal
      combustion engine buses, or motor buses, were used in 1895.[3] Recently, interest has been growing in hybrid
      electric buses, fuel cell buses, and electric buses, as well as ones powered by compressed natural gas or
      biodiesel. As of the 2010s, bus manufacturing is increasingly globalised, with the same designs appearing around
      the world.
    </p>
    <p className={b("paragraph")}>
      Now let's look at busways busway or transitway, is a bus-based public transport system designed to improve
      capacity and reliability relative to a conventional bus system.[2] Typically, a BRT system includes roadways that
      are dedicated to buses, and gives priority to buses at intersections where buses may interact with other traffic;
      alongside design features to reduce delays caused by passengers boarding or leaving buses, or purchasing fares.
      BRT aims to combine the capacity and speed of a metro with the flexibility, lower cost and simplicity of a bus
      system.
    </p>
    <p className={b("paragraph")}>
      Lets look at the shortest route of Bristol public transport network, which describes a high-capacity urban
      public-transit system with its own right of way, multiple-car vehicles at short headways, and longer stop spacing
      than traditional streetcars and buses. BRT uses buses on a wide variety of rights-of-way, including mixed traffic,
      dedicated lanes on surface streets, and busways separated from traffic. The expression "BRT" is mainly used in the
      Americas and China; in India, it is called "BRTS" (BRT System); in Europe and Indonesia, it is often called a
      "busway"; while in the British Isles, it may be called a "quality bus".
    </p>
    <h1 className={b("header")}>New&nbsp;Explorations: P-space and&nbsp;C-space</h1>
    <header className={b("chapter")}>Lviv</header>
    <h1 className={b("header")}>Lviv Public&nbsp;Transport&nbsp;Dataset</h1>
    <h1 className={b("header")}>L-, P- and C-spaces: three views on Lviv`s Public Transport Network</h1>
    <p className={b("paragraph")}>...</p>
    <header>Conclusions</header>
    <p className={b("paragraph")}>...</p>
    <h1 className={b("header")}>Another visualizations</h1>
  </div>
)
export default Article
