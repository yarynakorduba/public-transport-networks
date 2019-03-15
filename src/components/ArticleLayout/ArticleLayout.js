import React from "react"
import { TriggerContext } from "../Trigger"
import "./ArticleLayout.scss"

import BEM from "../../helpers/BEM"

const b = BEM("ArticleLayout")

const ArticleLayout = ({ article, illustration }) => (
  <TriggerContext>
    <section className={b()}>
      <div className={b("article")}>{article}</div>
      <div className={b("illustration")}>{illustration}</div>
    </section>
  </TriggerContext>
)

export default ArticleLayout
