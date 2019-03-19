import React from "react"

import Chapter1 from "./Chapter_1"
import Chapter2 from "./Chapter_2"
import Chapter3 from "./Chapter_3"
import Chapter4 from "./Chapter_4"
import Chapter5 from "./Chapter_5"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"
import { TriggerContext } from "../Trigger"

const b = BEM("Article")

const Article = () => (
  <TriggerContext>
    <div className={b()}>
      <h1>Науковий підхід в проектуванні громадського транспорту</h1>

      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
    </div>
  </TriggerContext>
)
export default Article
