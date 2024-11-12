

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
```
{
  "dependencies": {
    "package-b": "*"
  }
}
```


# Init TypeScript


```bash
pnpm add -D typescript
pnpm tsc --init
mkdir src
echo "console.log('Hello, TypeScript!');" > src/index.ts
```

open 'tsconfig.json'
```json
{"rootDir": "./src",
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