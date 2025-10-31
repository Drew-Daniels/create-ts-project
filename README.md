# `create-ts-project`

## Usage

```bash
npm init git@github.com:Drew-Daniels/ts-project.git your-project-name
```

## Roadmap

- [ ] Ensure `package.json` and `tsconfig.json` are properly formatted
- [ ] Add step to copy or create `flake.nix`
- [ ] Publish npm package
- [ ] Create stub unit tests
- [ ] Create stub BDD tests
- [ ] Enable package manager choice
- [ ] Enable runtime manager choice (`mise`, `volta`, `nvm`, etc.)
- [ ] Enable workspaces choice

## Development

```bash
git clone https://github.com/Drew-Daniels/create-ts-project.git
cd create-ts-project
# Optionally - if using NixOS and direnv
# direnv allow .
npm i
```

After updating `src`, rebuild to update `dist`:

```bash
npm run build
```
