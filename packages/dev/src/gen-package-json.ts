import { buildUmbrellaPackageJson } from './build-umbrella-package-json.js'

export async function genPackageJson() {
  await buildUmbrellaPackageJson()
}
