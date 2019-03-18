import React from "react"
import { TriggerContext } from "../Trigger"
import Illustration from "../Illustration"
import Article from "../Article"

import "./ArticleLayout.scss"

import BEM from "../../helpers/BEM"
import { withProps } from "recompose"

const b = BEM("ArticleLayout")

const ArticleLayout = ({ article, illustration }) => (
  <TriggerContext>
    <section className={b()}>
      <div className={b("article")}>{article}</div>
      {/*<div className={b("illustration")}>{illustration}</div>*/}
    </section>
  </TriggerContext>
)

const enhancer = withProps({
  article: <Article />,
  illustration: <Illustration />
})

export default enhancer(ArticleLayout)
