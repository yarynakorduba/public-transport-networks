import React from "react"
import Latex from "react-latex"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"

const b = BEM("Article")

const Chapter_5 = () => (
  <section>
    <h1 className={b("header")}>Стійкість до атак</h1>
    <p className={b("paragraph")}>
      Існує багато характеристик, які різними методами означують стійкість мережі при незвичайних випадках. Та жодна з
      них не відобразить стан справ краще за симуляцію атак. Щоби порівняти стійкість мережі за різних умов, ми провели
      декілька видів симуляцій:
    </p>
    <ul className={b("list")}>
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
      Симуляція атак на Брістоль в <Latex>$L$</Latex> просторі показує, що випадкові атаки руйнують мережу
      найповільніше.
      <img
        className={b("image")}
        alt={"Bristol L Space Random Attack"}
        src="img/simulations/bristol_l_space_random_attacks_5_trials.png"
      />
      Трошки швидше мережа руйнується при атаках на вузли за значенням betweenness centrality, причому видалення із
      пересортуванням є значно ефективнішим, ніж видалення за первинним порядком.
    </p>
    <img
      className={b("image")}
      alt={"Bristol L Space Targeted Attack By Betweenness Initial"}
      src="img/simulations/bristol_l_space_targeted_attack_by_betweenness_initial.png"
    />
    <img
      className={b("image")}
      alt={"Bristol L Space Targeted Attack By Betweenness Recalculated"}
      src="img/simulations/bristol_l_space_targeted_attack_by_betweenness_recalculated.png"
    />
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
  </section>
)

export default Chapter_5
