# create-estrella

Create a starter project for [Estrella](https://github.com/rsms/estrella), the [esbuild](https://github.com/evanw/esbuild) based build system.

```bash
$ npm init estrella <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

If using Yarn:

```bash
$ yarn create estrella <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

## Languages

By default templates are provided in Javascript. If you prefer Typescript add the `--ts` option:

```bash
$ npm init estrella <project-name> --ts
```

## Templates

Available templates:

- `basic` (default)
- `module`

To scaffold with specific template:

```bash
$ npm init estrella <project-name> --template <template>
```

For example to set up the module named "my-module":

```bash
$ npm init estrella my-module --template module
```

---

This package was created using <https://github.com/vitejs/create-vite-app> as model. Thanks!
