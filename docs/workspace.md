

# Init  Workspace

```bash
pnpm init
pnpm add -D typescript eslint

```


create file `pnpm-workspace.yaml`

```
packages:
  - 'packages/*'
  - 'apps/*'
```

cd packages/package-a
pnpm  init

add dependency
```json5
[{
  "dependencies": {
    "package-b": "*"
  }
},
//或者, "workspace:*" 是一个版本约束，表示该依赖项在同一工作区中被定义。
  // 这种方式通常用于在工作区内共享配置包或本地开发的包，意味着 pnpm 会在当前工作区中查找并链接对应的包，
  // 而不是从远程注册表（例如 npm）中下载。
{
    "dependencies": {
     "package-b": "workspace:*"
    }
}
]

```


# Init TypeScript


```bash
pnpm add -D typescript
pnpm tsc --init
mkdir src
echo "console.log('Hello, TypeScript!');" > src/index.ts
```

open 'tsconfig.json', add or change following configurations.
```json
{
  "target": "es2022",
  "rootDir": "./src",
"outDir": "./dist"
}
```

open 'package.json'
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```