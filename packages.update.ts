import * as childprocess from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

const npmpackage: string = path.join(__dirname, 'package.json')

type NodeError = NodeJS.ErrnoException

const exists = (filename: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject): void => {
    try {
      fs.exists(filename, (exist: boolean) => resolve(exist))
    } catch (error) {
      reject(error)
    }
  })
}

const readfile = (filename: string): Promise<Buffer> => {
  return exists(filename).then((exist: boolean) => {
    if (exist === false) {
      throw new Error(`${filename} does not exist.`)
    }

    return new Promise<Buffer>((resolve, reject): void => {
      try {
        fs.readFile(filename, (err: NodeError, data: Buffer): void => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  })
}

const update = (packages: string[], ...options: string[]): Promise<any> => {
  const cprocess: childprocess.ChildProcess = childprocess
    .spawn('npm', ['install', ...options, ...packages])

  cprocess.stderr.pipe(process.stderr)
  cprocess.stdin.pipe(process.stdin)
  cprocess.stdout.pipe(process.stdout)

  return new Promise<any>((resolve, reject): void => {
    cprocess.on('close', (code: number, signal: string): void => {
      if (code !== 0) {
        reject(code)
      } else {
        resolve()
      }
    })
  })
}

interface Config {
  package: any
}

readfile(npmpackage)
  .then((file: Buffer) => ({ package: JSON.parse(file.toString()) }))
  .then(async (config: Config) => {
    if (config.package.dependencies) {
      await update(Object.keys(config.package.dependencies), '--save')
    }

    if (config.package.devDependencies) {
      await update(Object.keys(config.package.devDependencies), '--save-dev')
    }

    if (config.package.peerDependencies) {
      await update(Object.keys(config.package.peerDependencies), '--save-dev')
    }
  })
