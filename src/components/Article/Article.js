import React from "react"
import Chapter1 from "./Chapter_1"
import Chapter2 from "./Chapter_2"
import Chapter3 from "./Chapter_3"
import Chapter4 from "./Chapter_4"
import Chapter5 from "./Chapter_5"
import Chapter8 from "./Chapter_8"
import Chapter9 from "./Chapter_9"
import Chapter10 from "./Chapter_10"
import Preface from "./Preface"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"
import { TriggerContext } from "../Trigger"

const b = BEM("Article")

const Article = () => (
  <>
    <Preface />
    <TriggerContext>
      <div className={b()}>
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />
        <Chapter4 />
        <Chapter5 />
        <Chapter8 />
        <Chapter9 />
        <Chapter10 />
      </div>
    </TriggerContext>
  </>
)
export default Article
