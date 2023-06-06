import type { Ref } from 'vue'
import { effect, onUnmounted } from 'vue'
import type { ReachSwParams } from 'src/type'
import { ReachSw } from 'src/core'

export interface UseReachSwOptions {
  auto?: boolean
}

export function useReachSw(
  elRef: Ref<HTMLElement>,
  params: ReachSwParams,
  options?: UseReachSwOptions,
) {
  const {
    auto = true,
  } = options || {}
  let reachSw: ReachSw | undefined

  function listen() {
    if (elRef.value && !reachSw) {
      reachSw = new ReachSw(elRef.value, params)
      reachSw.listen()
    }
  }

  function rm() {
    if (reachSw) {
      reachSw.rmListen()
      reachSw = undefined
    }
  }

  if (auto) {
    effect(() => {
      listen()
    })
  }

  onUnmounted(() => {
    rm()
  })

  return {
    rm,
    listen,
  }
}
