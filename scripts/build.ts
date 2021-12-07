import assert from 'assert'
import path from 'path'
import consola from 'consola'
import fs from 'fs-extra'
import { execSync as exec } from 'child_process'
import { packages } from '../meta/packages'
import { updateImport } from './utils'
import fg from 'fast-glob'

const rootDir = path.resolve(__dirname, '..')

const FILES_COPY_ROOT = ['LICENSE']

const FILES_COPY_LOCAL = ['package.json', 'README.md']

assert(process.cwd() !== __dirname)

export const buildTransferDist = async (cwd: string) => {
  const files = await fg('*', { cwd, ignore: ['_*', 'dist', 'node_modules'] })
  const dirs = await fg('*', { cwd, onlyDirectories: true, ignore: ['_*', 'dist', 'node_modules'] })
  const packageDist = path.resolve(cwd, 'dist')
  await fs.emptyDir(packageDist)
  for (const file of [...files, ...dirs]) {
    await fs.copy(path.join(cwd, file), path.join(packageDist, file))
  }
}

export const buildMetaFiles = async () => {
  for (const { name, build } of packages) {
    const packageRoot = path.resolve(__dirname, '..', 'packages', name)
    const packageDist = path.resolve(packageRoot, 'dist')

    // 不需要打包的将源文件移植到 dist 文件夹
    if (build === false) {
      await buildTransferDist(packageRoot)
      continue
    }

    await fs.ensureDir(packageDist)

    // 向打包后的 dist 添加包的源信息
    for (const file of FILES_COPY_ROOT)
      await fs.copyFile(path.join(rootDir, file), path.join(packageDist, file))
    for (const file of FILES_COPY_LOCAL)
      await fs.copyFile(path.join(packageRoot, file), path.join(packageDist, file))
  }
}

export const build = async () => {
  consola.info('Clean up')
  exec('yarn clean', { stdio: 'inherit' })

  consola.info('Generate Imports')
  await updateImport(packages)

  consola.info('Rollup')
  try {
    exec('yarn build:rollup', { stdio: 'inherit' })
  } catch (error) {
    consola.warn(error)
  }

  await buildMetaFiles()
}

async function cli() {
  try {
    await build()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// 这里用了个小技巧，判断当前执行环境是否是直接执行
if (require.main === module) cli()
