

pnpm init
pnpm add -D typescript eslint



create file `pnpm-workspace.yaml`

```
packages:
  - 'packages/*'
  - 'apps/*'
```

cd packages/package-a
pnpm init -y


add dependency
```
{
  "dependencies": {
    "package-b": "*"
  }
}
```