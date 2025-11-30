import { buildUmbrellaPackageJson } from './build-umbrella-package-json'

export async function genPackageJson(): Promise<void> {
  await buildUmbrellaPackageJson()
}
