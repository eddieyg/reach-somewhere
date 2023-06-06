import { copyFileSync } from 'node:fs'

function main() {
  copyFileSync(
    'package.json',
    'dist/package.json',
  )
  copyFileSync(
    'README.md',
    'dist/README.md',
  )
}
main()
