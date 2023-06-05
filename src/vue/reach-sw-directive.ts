import type { App } from 'vue'
import type { ReachSwParams } from 'src/type'
import type { ReachSw } from 'src/core'
import { createReachSw } from 'src/core'

export interface ReachSwDirectiveOptions {
  name?: string
}

function install(app: App, options?: ReachSwDirectiveOptions) {
  const {
    name = 'reach-sw',
  } = options || {}

  let reachSw: ReachSw

  app.directive(name, {
    mounted(el: HTMLElement, binding) {
      const params: ReachSwParams = binding.value
      if (!params)
        return

      reachSw = createReachSw(el, params)
      reachSw.listen()
    },

    unmounted() {
      if (reachSw)
        reachSw.rmListen()
    },
  })
}

export const ReachSwDirective = {
  install,
}
