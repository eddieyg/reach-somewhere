# Reach Somewhere
Easily monitor content (scroll) to reach a certain position, in vue react framework.

## ✨ Features

- Listen for the roll arrival position
- Support for multiple listening
- vue react `hook` and `directive` available

## 👨‍💻 Usage

### Install

```shell
pnpm add reach-somewhere
```

### Use of Vue

#### Directive

```typescript
import { createApp } from 'vue'
import { ReachSwDirective } from 'reach-somewhere/vue'
const app = createApp(App)

// install ReachSwDirective
app.use(
  ReachSwDirective,
  {
    name: 'reach-sw', // customize directive name, default 'reach-sw'
  }
)

app.mount('#app')
```

```html
<template>
  <div v-reach-sw="reachSwParams">
    ...
  </div>
</template>

<script setup lang="ts">
  const reachTop = {
    position: 'top 0px',
    debounceMs: 100,
    onReach: () => {},
    onLeave: () => {},
  }
  const reachBottom = {
    position: 'bottom 0px',
    debounceMs: 100,
    onReach: () => {},
  }
  const reachSwParams = [
    reachTop,
    reachBottom,
  ]
</script>
```

#### Hook

```html
<template>
  <div ref="elRef">
    ...
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useReachSw } from 'reach-somewhere/vue'

  const elRef = ref<HTMLElement>()
  const reachSwParams = {
    position: 'bottom 0px',
    debounceMs: 100,
    onReach: () => {},
  }
  const reachSw = useReachSw(elRef, reachSwParams, { auto: true })
  // reachSw.listen()
  // reachSw.rmListen()
</script>
```


### Use of React

#### Hook

```tsx
import { useRef } from 'react'
import { useReachSw } from 'reach-somewhere/react'

function MyComponent() {
  const elRef = useRef(null)
  const reachSwParams = {
    position: 'bottom 0px',
    debounceMs: 100,
    onReach: () => {},
  }
  const reachSw = useReachSw(elRef, reachSwParams, { auto: true })
  // reachSw.listen()
  // reachSw.rmListen()

  return <div ref={elRef}>...</div>
}
```

## License

Licensed under the [MIT License](LICENSE).
