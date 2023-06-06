import { debounce, isArray, isFunction, isNumber, uniqueId } from 'lodash'
import type { ReachSwEvent, ReachSwParams } from 'src/type'

export class ReachSw {
  protected listenHandler: EventListenerOrEventListenerObject | undefined
  protected debounceMs = 0
  protected paramsListMap: Record<string, ReachSwEvent> = {}
  public get paramsList() {
    return Object.values(this.paramsListMap)
  }

  // ReachSwEvent reach flag, use id as key
  private reachFlags: Record<string, boolean> = {}

  constructor(public el: HTMLElement, params: ReachSwParams) {
    for (const p of isArray(params) ? params : [params])
      this.paramsListMap[uniqueId()] = p

    const minDebounceMs = getMinDebounceMs(this.paramsList)
    if (isNumber(minDebounceMs))
      this.debounceMs = minDebounceMs
  }

  listen() {
    const handler = (event: any) => {
      const target = event.target! as HTMLElement
      for (const id in this.paramsListMap) {
        const rse = this.paramsListMap[id]
        const isReach = checkReachSwEvent(rse, target)
        if (isReach) {
          this.reachFlags[id] = true
          isFunction(rse.onReach) && rse.onReach()
        }
        else if (this.reachFlags[id]) {
          this.reachFlags[id] = false
          isFunction(rse.onLeave) && rse.onLeave()
        }
      }
    }
    this.listenHandler = debounce(handler, this.debounceMs)
    this.el.addEventListener('scroll', this.listenHandler)
  }

  rmListen() {
    if (this.listenHandler)
      this.el.removeEventListener('scroll', this.listenHandler)
  }
}

function checkReachSwEvent(reachSwEvent: ReachSwEvent, target: HTMLElement) {
  const position = parsePosition(reachSwEvent.position)
  let isReach = false
  let value = 0
  switch (position.offset.type) {
    case 'pixel': {
      value = position.offset.value
      break
    }
    case 'percent': {
      const rate = position.offset.value / 100
      value = Math.floor(target.offsetHeight * rate)
      break
    }
  }
  switch (position.direction) {
    case 'top': {
      isReach = target.scrollTop <= value
      break
    }
    case 'bottom': {
      isReach = target.offsetHeight + target.scrollTop >= target.scrollHeight - value
      break
    }
  }
  return isReach
}

type PositionDirection = 'top' | 'bottom'
type PositionType = 'pixel' | 'percent'

function parsePosition(position: string) {
  const positionArr = position.split(' ')
  const direction = positionArr[0] as PositionDirection
  const offset = {
    type: '' as PositionType,
    value: 0,
  }
  if (/^.*px$/.test(positionArr[1]))
    offset.type = 'pixel'
  else if (/^.*%$/.test(positionArr[1]))
    offset.type = 'percent'
  return {
    direction,
    offset,
  }
}

function getMinDebounceMs(list: ReachSwEvent[]) {
  let value
  for (const a of list) {
    if (
      (!isNumber(value) && isNumber(a.debounceMs))
      || (isNumber(value) && isNumber(a.debounceMs) && a.debounceMs < value)
    )
      value = a.debounceMs
  }
  return value
}
