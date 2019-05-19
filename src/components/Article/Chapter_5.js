import React from "react"
import Latex from "react-latex"
import BEM from "../../helpers/BEM.js"
import "./Article.scss"
import CitiesInfoBlock from "../CitiesInfoBlock/CitiesInfoBlock"
import ForceGraph from "../ForceGraph/ForceGraph"
import RadialForceGraph from "../ForceGraph/RadialForceGraph"

const b = BEM("Article")

const Chapter_5 = () => (
  <section>
    <h1 className={b("header")}>
      Топологічні характеристики в <Latex>$\mathbb L$-space</Latex>
    </h1>
    <p className={b("paragraph")}>
      Мережу характеризують різні математичні показники: ступінь вузла, найкоротший шлях, асортативність, коефіцієнт
      кластерності тощо.
    </p>
    <p className={b("paragraph")}>
      <b>
        Ступінь вузла <Latex>$k$</Latex>
      </b>{" "}
      - це кількість ребер, які з’єднують його з іншими вузлами. Тобто в <Latex>$\mathbb L$</Latex>-space ступінь
      вузла-зупинки вказує на кількість сусідніх до неї станцій. Ступінь вузла відображає його значення для системи.
      Аварія на зупинці з одним ребром не спричинить транспортного колапсу. Водночас аварія на центральній зупинці, де
      перетинаються багато маршрутів, може зупинити роботу всієї мережі.
    </p>
    <p className={b("paragraph")}>
      У Брістолі найбільший ступінь вузла
      <Latex>{"$k_{max BRS} = 25$"}</Latex> , а у Львові <Latex>{"$k_{max LWO} = 10$"}</Latex>. В контексті всієї мережі
      ми розглядаємо середній ступінь вузла <Latex>{"$k_{avg}$"}</Latex>.{" "}
      <Latex displayMode={true}>{"$k_{avg} = \\sum_{\\mathclap{i}} {k_i} / N,$"}</Latex> де <Latex>$N$</Latex> - це
      кількість вузлів мережі. У Брістолі середній ступінь вузла набагато вищий, ніж у Львові -{" "}
      <Latex>{"$k_{avg BRS}=3.4$"}</Latex>,<Latex>{"$k_{avg LWO}=2.6$"}</Latex>. Тобто середньостатистична брістольська
      зупинка має набагато більше зв’язків, ніж львівська. Значення <Latex>{"$k_{avg}$"}</Latex> часто є близьким до
      двох. Адже основна частина мережі - це проміжні зупинки маршрутів із двома ребрами. Те, що їх у мережах найбільше,
      також видно на графіку <a href={"http://konect.uni-koblenz.de/plots/bidd"}>розподілу ступенів вузлів</a>.
    </p>
    <img
      className={b("image")}
      alt={"L-space Degree Distribution"}
      src={"./img/chapter5/lSpaceDegreeDistribution.png"}
    />
    <p className={b("paragraph")}>
      <b>
        Центральність посередництва <Latex>{"$C_{\\beta}$"}</Latex>
      </b>
      . Значення вузла для мережі відображає не тільки ступінь <Latex>$k$</Latex>. Важливими є також вузли, через які
      проходить найбільше оптимальних шляхів. Щоби визначити ці вузли, використовують показник центральності
      посередництва <Latex>{"$C_{\\beta}$"}</Latex>. <Latex>{"$C_{\\beta}$"}</Latex> для вузла <Latex>{"$ i $"}</Latex>{" "}
      показує, яка частина найкоротших шляхів усього графа проходять через вузол <Latex>{"$ i $"}</Latex>:{" "}
      <Latex displayMode={true}>{"$C_{\\beta} (i) = \\sum_{i} {\\frac{\\sigma(i)} {\\sigma}},$"}</Latex> де{" "}
      <Latex>$\sigma$</Latex>- це кількість оптимальних шляхів у графі, а <Latex>$\sigma (i)$</Latex> - кількість тих,
      що проходять через вузол і Вузли із високою центральністю посередництва - це своєрідні точки вразливості мережі.
      Якщо зупинка із високим <Latex>{"$C_{\\beta}$"}</Latex>припинить роботу, довжина оптимальних шляхів може різко
      зрости. А в гіршому випадку мережа роз’єднається.
    </p>
    <p className={b("paragraph")}>
      <b>
        Найкоротший шлях <Latex>$l$</Latex>
      </b>
      . Між двома зупинками мережі може існувати кілька варіантів маршрутів. Найкоротшим шляхом{" "}
      <Latex>{"$l_{AB}$"}</Latex> між зупинками “A” та “B” називають шлях із найменшою кількістю вузлів. Для аналізу
      мережі ми використовуємо середній найкоротший шлях <Latex>{"$l_{avg}$"}</Latex>. Для Брістоля{" "}
      <Latex>{"$l_{avg BRS}=12$"}</Latex> зупинок, а для Львова <Latex>{"$l_{avg LWO} = 14$"}</Latex> зупинок.
    </p>
    <p className={b("paragraph")}>
      <b>
        Діаметр мережі <Latex>$D$</Latex>
      </b>{" "}
      - це найдовший із оптимальних шляхів. В <Latex>$\mathbb L$</Latex>-space він показує кількість зупинок між двома
      найвіддаленішими станціями мережі. Діаметр брістольської мережі <Latex>{"$D_{BRS} = 37$"}</Latex> зупинок. А
      найдовший оптимальний шлях львівської <Latex>{"$D_{LWO} = 40$"}</Latex> зупинок.
    </p>
    <img
      className={b("image")}
      alt="L-space path length distribution"
      src={"./img/chapter5/lSpacePathLengthDistribution.png"}
    />
    <p className={b("paragraph")}>
      <b>
        Коефіцієнт кластерності <Latex>$ C $</Latex>
      </b>{" "}
      показує тенденцію вузлів до групування. <Latex>{"$ C_i $"}</Latex> вузла <Latex>$i$</Latex> відображає, яка
      частина його сусідів пов’язані між собою.
    </p>{" "}
    <img alt="Clustering coefficient" className={b("image")} src={"./img/chapter5/exampleClusteringCoefficient.png"} />
    <p className={b("paragraph")}>
      {" "}
      Так можна дізнатися, чи сильно зв’язана наша мережа. Коефіцієнт кластерності для Брістоля набагато більший, ніж
      для львівської мережі - <Latex>{"$ C_{avg BRS} = 0.1 $"}</Latex>, а <Latex>{"$ C_{avg LWO} = 0.05 $"}</Latex>.
    </p>
    <p className={b("paragraph")}>
      <b>
        Асортативність <Latex>$r$</Latex>
      </b>{" "}
      показує тенденції формування зв’язків у мережі. Якщо <Latex>{"$r > 0$"}</Latex>, то вузлол мережі зазвичай формує
      зв’язки із вузлами подібного ступеня (великі вузли із великими, а маленькі із маленькими). Таку мережу називають
      асортативною. Якщо ж <Latex>{"$r gte 0$"}</Latex>, то навпаки вузли з високим ступенем частіше мають зв’язок із
      вузлами низького ступеня. Таку мережу називають дисортативною. У Брістоля <Latex>{"$r_{BRS} = 0.31$"}</Latex>, а у
      Львові <Latex>{"$r_{LWO} = -0.03$"}</Latex>. Тому львівська мережа - дисортативна, а брістольська навпаки -
      асортативна.
    </p>
    <div className={b("illustration", ["wide"])} style={{ height: "100vh" }}>
      <RadialForceGraph representationOf={"lviv"} space={"l"} />
    </div>
  </section>
)

export default Chapter_5
