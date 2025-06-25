import { buildUmbrellaPackageJson } from './build-umbrella-package-json'

export async function genPackageJson() {
  await buildUmbrellaPackageJson()
}
