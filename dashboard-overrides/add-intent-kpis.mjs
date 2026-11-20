import fs from 'node:fs';
import path from 'node:path';

const projectDir = process.argv[2];
if (!projectDir) throw new Error('Project directory argument is required.');
const file = path.join(projectDir, 'src/components/sections/OverviewSection.tsx');
let source = fs.readFileSync(file, 'utf8');

if (!source.includes('const rentInterestedCount =')) {
  source = source.replace('  Handshake,\n  Plus,', '  Handshake,\n  House,\n  KeyRound,\n  Plus,');
  source = source.replace(
    "  const activePropertiesCount = properties.filter((p) => p.status === 'available' || p.status === 'reserved').length;",
    "  const activePropertiesCount = properties.filter((p) => p.status === 'available' || p.status === 'reserved').length;\n  const rentInterestedCount = leads.filter((lead) => lead.transaction_type === 'rent').length;\n  const buyInterestedCount = leads.filter((lead) => lead.transaction_type === 'sale').length;"
  );

  const anchor = `        <KpiCard
          title={t.overview.kpis.activeProperties}
          value={formatNumber(activePropertiesCount, language)}
          delta={5.2}
          deltaLabel={t.overview.vsPrevPeriod}
          icon={<Building2 className="h-4 w-4" />}
          tone="indigo"
        />`;
  const addition = `${anchor}
        <KpiCard
          title={language === 'ar' ? 'الراغبون في الكراء' : language === 'fr' ? 'Candidats à la location' : 'Rent seekers'}
          value={formatNumber(rentInterestedCount, language)}
          icon={<KeyRound className="h-4 w-4" />}
          tone="sky"
        />
        <KpiCard
          title={language === 'ar' ? 'الراغبون في الشراء' : language === 'fr' ? 'Candidats à l’achat' : 'Buyers'}
          value={formatNumber(buyInterestedCount, language)}
          icon={<House className="h-4 w-4" />}
          tone="teal"
        />`;
  if (!source.includes(anchor)) throw new Error('Could not find the active properties KPI card to extend.');
  source = source.replace(anchor, addition);
  fs.writeFileSync(file, source);
}
