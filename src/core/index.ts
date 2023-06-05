import { debounce, isArray, isFunction, isNumber } from 'lodash'
import type { ReachSwEvent, ReachSwParams } from 'src/type'

export function createReachSw(el: HTMLElement, params: ReachSwParams) {
  const paramsList = isArray(params) ? params : [params]
  let listenHandler: EventListenerOrEventListenerObject
  const debounceMs = paramsList.reduce(
    (pre, curr) =>
      isNumber(curr.debounceMs) && curr.debounceMs < pre
        ? curr.debounceMs
        : pre,
    0,
  )

  function listen() {
    listenHandler = debounce(
      (event: any) => {
        const target = event.target! as HTMLElement
        paramsList.forEach((e) => {
          const isReach = checkReachSwEvent(e, target)
          if (isReach && isFunction(e.onReach))
            e.onReach()
          // @todo e.onLeave
        })
      },
      debounceMs,
    )
    el.addEventListener('scroll', listenHandler)
  }

  function rmListen() {
    el.removeEventListener('scroll', listenHandler)
  }

  return {
    listen,
    rmListen,
  }
}

export type ReachSw = ReturnType<typeof createReachSw>

function checkReachSwEvent(reachSwEvent: ReachSwEvent, target: HTMLElement) {
  // @todo
  // top -> target.scrollTop <= 0
  // bottom -> target.offsetHeight + target.scrollTop >= target.scrollHeight
  return false
}
