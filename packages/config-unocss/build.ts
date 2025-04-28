import fs from 'node:fs'

import * as Classes from './src/classes'

const code = JSON.stringify(Classes, null, 2) + '\n'

fs.writeFileSync('lib/classes.gen.json', code)
