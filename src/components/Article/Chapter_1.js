import React from "react"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"
const b = BEM("Article")

const Chapter_1 = () => (
  <section>
    <h1 className={b("header")}>Опис проблеми & Історичний прецедент</h1>
    <p>
      Одним із ключових факторів сучасного світу є розвиток і збільшення важливості міст. Яким чином зробити місто
      комфортним для всіх верств населення. Як вплинути на розвиток бізнесу, інфраструктури, культури, завдяки
      грамотному проектуванню міст, про це говорить відностно нова галузь знань -- урбаністика. .... <br />
      Так наприклад часто приводять приклад невдалої ідеї як "американький шлях" побудови інфраструктури міста.
      (Проблема Детройту https://www.youtube.com/watch?v=I3MLIa7Xw8Y)
      <br />
      (Розповістки історію смерті громадського транспорту в Америці)
      <br />
      Альтернативна історія -- це "європейський" шлях. (Історія про страйки в Амстердамі проти автомібілізації міста
      https://gre4ark.livejournal.com/216872.html )<br />
      Однак основною проблемою урбаністики є система правил і рекомендацій побудована на "відчуттях" і осмисленні
      "історичних помилок".
      <br />
      І в даній статті я б хотіла розглянути кілька наукових підходів щодо проектування міста, а конткретніше, про
      проектування транспортних систем.
      <br />
    </p>

    <p className={b("paragraph", ["first"])}>
      Робота транспортної системи - важливий аспект життя кожного міста. Для створення стабільної і добре структурованої
      мережі громадського транспорту важливо не тільки забезпечити пасажирам якнайшвидше добирання до будь-якого пункту
      із найменшою кількістю пересадок, але й подбати про безпеку при виникненні непередбачуваних ситуацій у мережі.
    </p>
    <p className={b("paragraph")}>
      Нестійка мережа може швидко розвалитися як через випадкові "випадання" зупинок, так і при спрямованих атаках.
      Випадкові події включають у себе аварії, сильні затори чи навіть погані погодні умови у певній частині мережі,
      через що частина зупинок чи навіть увесь маршрут стають недоступними. Та ще більш небезпечними є спрямовані атаки,
      наприклад, страйк на одній із зупинок чи терористичний акт. Такі події зазвичай трапляються у найбільш зв'язних
      точках мережі, так званих хабах, які є найбільш важливими для всієї мережі, оскільки обслуговують велику кількість
      маршрутів.
    </p>
  </section>
)

export default Chapter_1
