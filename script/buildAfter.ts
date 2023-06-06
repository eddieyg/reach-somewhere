import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'

function main() {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
  delete packageJson.publishConfig
  writeFileSync(
    'dist/package.json',
    JSON.stringify(packageJson, null, 2),
    'utf8',
  )
  copyFileSync(
    'README.md',
    'dist/README.md',
  )
}
main()
