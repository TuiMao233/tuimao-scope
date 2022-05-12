/*
 * @Author: Mr'Mao https://github.com/TuiMao233
 * @Date: 2021-12-29 10:36:04
 * @LastEditors: Mr'Mao
 * @LastEditTime: 2022-01-21 11:11:32
 */
import { generate } from './generator'
import fs from 'fs-extra'
import { cloneDeep, merge } from 'lodash'

import ora from 'ora'
import { parseOutput } from './parser/output'
import { SwaggerBuildConfig, SwaggerDefineConfig } from './_types'
import { parseSource } from './parser/source'
import { DEFAULT_CONFIG } from './internal'

export interface SwaggerWebClientGeneratorType {
  (config: SwaggerBuildConfig | SwaggerBuildConfig[]): Promise<void>
  default: SwaggerBuildConfig
}

/**
 * swagger Web 客户端代码生成器
 * @description http 模块, 需类似 axios 结构调用
 * @param config
 */
export const swaggerWebClientGenerator: SwaggerWebClientGeneratorType = async (config) => {
  const writeOptions = { encoding: 'utf8' as const, flag: 'w' as const }
  const spinner = ora('Generate Interface ...\n').start()
  const configs: SwaggerBuildConfig[] = Array.isArray(config) ? config : [config]
  const process = configs.map(async (iterator) => {
    // 合并 default 构建 config
    const config = merge(cloneDeep(swaggerWebClientGenerator.default), iterator)
    // 解析 config  生成 output
    const output = parseOutput(config)
    // 解析 swagger 生成 swagger ast
    const ast = await parseSource.call({ definitions: [] }, config)

    // 使用 buildConfig, output, transform 生成代码
    const { apiFileCode, typeFileCode } = generate({ build: config, output, ast })

    // 确保 api 与 type 路径存在, 避免影响后续写入
    await Promise.all([fs.ensureDir(output.api.root), fs.ensureDir(output.type.root)])
    // 写入 api 与 type 文件
    await Promise.all([fs.writeFile(output.api.file, apiFileCode, writeOptions), fs.writeFile(output.type.file, typeFileCode, writeOptions)])
  })

  await Promise.all(process)
  spinner.succeed()
  spinner.clear()
}

/**
 * 处理 swagger define config ，使得使用扩展更加方便
 * 该 config 提供给 @hairy/cli 的 hairy swagger 使用
 * @param config
 * @returns
 */
export const defineConfig = (config: SwaggerDefineConfig) => config

export { parseSource, parseOutput }

export * from './_types'

swaggerWebClientGenerator.default = DEFAULT_CONFIG
