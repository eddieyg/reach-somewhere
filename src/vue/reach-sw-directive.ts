import type { App } from 'vue'
import type { ReachSwParams } from 'src/type'
import { ReachSw } from 'src/core'

export interface ReachSwDirectiveOptions {
  name?: string
}

function install(app: App, options?: ReachSwDirectiveOptions) {
  const {
    name = 'reach-sw',
  } = options || {}
  let reachSw: ReachSw | undefined

  app.directive(name, {
    mounted(el: HTMLElement, binding) {
      const params: ReachSwParams = binding.value
      if (!params)
        return

      reachSw = new ReachSw(el, params)
      reachSw.listen()
    },

    unmounted() {
      if (reachSw) {
        reachSw.rmListen()
        reachSw = undefined
      }
    },
  })
}

export const ReachSwDirective = {
  install,
}
