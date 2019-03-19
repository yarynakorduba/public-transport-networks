import React from "react"
import Latex from "react-latex"
import Note from "../Note"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"

const b = BEM("Article")

const Chapter_4 = () => (
  <section>
    <h1 className={b("header")}>
      Топографічні характеристики в &nbsp;<Latex>$L$</Latex> просторі{" "}
    </h1>
    <p className={b("paragraph")}>
      Одною із перших характеристик, якими можна є охарактеризувати топографію мережі, є ступінь вузла{" "}
      <Latex>$k_i$</Latex>. Він слугує одним із показників, що відображають важливість цього вузла для загальної
      системи. Найбільш зв'язні вузли називають хабами. В <Latex>$L\text-space$</Latex> ступінь вузла-зупинки показує,
      до скількох інших зупинок можна дістатися за один "крок". Узагальнений показник - середній ступінь вузла &lt;k&gt;
      надає інформацію про те, до скількох у середньому зупинок має зв'язок будь-яка зупинка мережі. Для Лондона і
      Брістоля ці показники приблизно однакові - 2.25 і . Більшість транспортних мереж мають подібний ступінь вузла в{" "}
      <Latex>$L\text-space$</Latex>, адже зазвичай у мережі є певна кількість кінцевих зупинок із лише одним з'єднанням,
      невелика кількість хабів і багато проміжних зупинок зі ступенем 2.
    </p>
    <p className={b("paragraph")}>
      Для пасажира важливо, щоби поїздка, яку потрібно здійснити до наступного пункту призначення, була якомога
      коротшою. Цей показник називають найкоротшим шляхом <Latex>$l_ij$</Latex> для зупинок <Latex>$i$</Latex> та{" "}
      <Latex>$j$</Latex>. В аналізі ефективності системи транспорту використовують узагальнену характеристику - середній
      найкоротший шлях <Latex>$\langle l \rangle$</Latex>. У відображенні системи Брістоля в <Latex>$L$</Latex> просторі
      цей показник складає 27.755 зупинок, а в найдовший оптимальний маршрут входять 122 зупинки. Пасажиру лондонської
      автобусної мережі в середньому доведеться проїхати 64.364 зупинки, щоби дістатися до пункту призначення, а
      найдовша подорож буде складатися із 206 зупинок. Звичайно ж, цей показник залежить від величини мережі, і
      порівняння восьмимільйонника-Лондона до Брістоля із 500 000 людей не можна здійснювати за абсолютними
      характеристиками. Інший показник, - ефективність найкоротшого шляху
      <Latex>$l_\beta$</Latex> - відображає довжину середнього оптимального шляху відносно середнього найкоротшого шляху
      <Note
        noteText={
          <>
            (Випадкові графи - графи, які можуть бути описані через розподіл імовірності або випадковим процесом, що
            генерує їх. Випадкові графи використовують, щоби відповісти на запитання про характеристики типових графів.
            [Вікіпедія])
          </>
        }
      >
        {" "}
        випадкового графа.
      </Note>
    </p>
    <p className={b("paragraph")}>
      Ще один показник для досліджень - коефіцієнт кластерності <Latex>$C$</Latex>. Ця характеристика показує, скільки
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
      ступінь. Однак пасажиру громадського транспорту зазвичай важливі не зупинки із найбільшою кількістю маршрутів, а
      станції, через які проходить найбільша кількість оптимальних шляхів. Тому для характеристики вузла вагомішим за
      ступінь може бути показник центральності (betweenness centrality)
      <Latex>$C_\beta$</Latex>. Значення betweenness centrality пов'язане зі зв'язністю мережі. Наявність вузлів із дуже
      високою центральністю робить мережу більш вразливою до атак. Припинення функціонування однієї із зупинок із
      високим значенням <Latex>$C_\beta$</Latex> може призвести до суттєвого збільшення довжини оптимальних шляхів, а в
      гіршому випадку до роз'єднання мережі. (0.01 for Bristol)
    </p>
    <p className={b("paragraph")}>
      Загальна стійкість мережі до вилучення вузлів може вимірюватися різними способами. Один із них -{" "}
      <Note
        noteText={
          <a href={"https://onlinelibrary.wiley.com/doi/abs/10.1002/rsa.3240060204"}>
            Molloy and Reed "A critical point for random graphs with a given degree sequence"
          </a>
        }
      >
        {" "}
        Molloy-Reed criterion{" "}
      </Note>
      <Latex>$\kappa$</Latex>. Цей критерій дозволяє визначити стійкість до рандомних атак і відображає наявність
      гігантської зв'язної компоненти (Giant Connected Component) у мережі. Вважається, що мережа є стійкою, якщо{" "}
      <Latex displayMode={true}>$$ \kappa = \langle k^2 \rangle \div \langle k \rangle \geq 2 $$</Latex> (відношення
      квадрата середнього ступеня вузлів до середнього ступеня вузлів). Molloy-Reed критерій показав, що обидві
      досліджувані мережі є стійкими, причому транспортна системи Брістоля в <Latex>$L$</Latex> просторі має краще
      значення стійкості - <Latex>$\kappa=2.734$</Latex>, в той час, як для Лондона <Latex>$k=2.471$</Latex>.
    </p>
  </section>
)

export default Chapter_4
