import groups from './extensions.json' with { type: 'json' }

export function generateExtensionsSidebar() {
  return groups.map(g => ({
    label: g.label,
    items: g.items.map(slug => `extensions/${slug}`),
  }))
}
