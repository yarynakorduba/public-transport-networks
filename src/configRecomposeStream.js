import { from } from "rxjs"
import { setObservableConfig } from "recompose"

export default () =>
  setObservableConfig({
    fromESObservable: from
  })
