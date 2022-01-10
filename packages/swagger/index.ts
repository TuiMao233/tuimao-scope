/*
 * @Author: Mr'Mao https://github.com/TuiMao233
 * @Date: 2021-12-29 10:36:04
 * @LastEditors: Mr'Mao
 * @LastEditTime: 2022-01-06 14:49:11
 */
import { generate } from './generator'
import fs from 'fs-extra'
import { merge } from 'lodash'

import ora from 'ora'
import { parseOutput } from './parser/output'
import { SwaggerBuildConfig } from './_types'
import { parseSource } from './parser/source'

export interface HairySwaggerType {
  (config: SwaggerBuildConfig | SwaggerBuildConfig[]): Promise<void>
  default: SwaggerBuildConfig
}

export const hairySwagger: HairySwaggerType = async (config) => {
  const writeOptions = { encoding: 'utf8' as const, flag: 'w' as const }
  // const spinner = ora('Generate Interface ...\n').start()
  const configs: SwaggerBuildConfig[] = Array.isArray(config) ? config : [config]

  for (const iterator of configs) {
    // 合并 default 构建 config
    const config = merge(hairySwagger.default, iterator)
    // 解析 config  生成 output
    const output = parseOutput(config)
    // 解析 swagger 生成 swagger ast
    const ast = await parseSource(config)

    // 使用 buildConfig, output, transform 生成代码
    const { apiFileCode, typeFileCode } = generate({ build: config, output, ast })

    // 确保 api 与 type 路径存在, 避免影响后续写入
    await Promise.all([fs.ensureDir(output.api.root), fs.ensureDir(output.type.root)])
    // 写入 api 与 type 文件
    await Promise.all([
      fs.writeFileSync(output.api.file, apiFileCode, writeOptions),
      fs.writeFileSync(output.type.file, typeFileCode, writeOptions)
    ])
  }
  // spinner.succeed()
  // spinner.clear()
}

export { parseSource, parseOutput }

hairySwagger.default = {
  output: { api: 'src/api/index.ts', type: 'src/api/index.type.ts', cwd: '' },
  baseURL: '',
  uri: '',
  import: { http: 'axios' }
}
