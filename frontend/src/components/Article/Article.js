import React from "react"
import Chapter1 from "./Chapter_1"
import Chapter2 from "./Chapter_2/index"
import Chapter3 from "./Chapter_3"
import Chapter4 from "./Chapter_4/index"
import Chapter5 from "./Chapter_5/index"
import Chapter8 from "./Chapter_8/index"
import Chapter9 from "./Chapter_9"
import Chapter10 from "./Chapter_10"
import Preface from "./Preface/index"
import ContentsThumbnail from "./ContentsThumbnail/index"

import BEM from "../../helpers/BEM.js"
import "./Article.scss"
import { TriggerContext } from "../Trigger"

const b = BEM("Article")

const Article = () => (
  <>
    <ContentsThumbnail />
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
