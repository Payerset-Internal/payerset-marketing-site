export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

// Single source of truth for the glossary. Consumed by:
//   - src/pages/glossary.astro (visible page + DefinedTermSet JSON-LD)
//   - src/pages/llms-full.txt.ts (full-text AI export)
export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'allowed-amount',
    term: 'Allowed Amount',
    definition:
      "The allowed amount (or allowed charge) is the maximum dollar amount a health plan considers payable for a covered service. For in-network care it equals the plan's negotiated rate; for out-of-network care it is a plan-determined amount. The allowed amount — not the provider's list price — is the basis for calculating plan payment and patient cost-sharing.",
  },
  {
    id: 'billing-code',
    term: 'Billing Code',
    definition:
      'A billing code is a standardized identifier for a medical service, procedure, drug, or supply used on healthcare claims and in price transparency files. Common code systems include CPT, HCPCS, ICD-10, DRG, and NDC. Negotiated rates in machine-readable files are reported per billing code, which is why accurate code mapping is essential to comparing rates.',
  },
  {
    id: 'cpt-hcpcs-code',
    term: 'CPT and HCPCS Codes',
    definition:
      'Current Procedural Terminology (CPT) codes, maintained by the American Medical Association, describe medical, surgical, and diagnostic services. The Healthcare Common Procedure Coding System (HCPCS) extends CPT to cover items such as drugs, supplies, and equipment. Together they are the primary code sets used to report and price professional and outpatient services.',
  },
  {
    id: 'drg',
    term: 'Diagnosis-Related Group (DRG)',
    definition:
      'A Diagnosis-Related Group (DRG) is a classification that groups inpatient hospital stays with similar clinical characteristics and resource use into a single payment category. Payers often reimburse inpatient care as a fixed amount per DRG rather than per individual service, making DRG-based rates a key benchmark for hospital inpatient contracting.',
  },
  {
    id: 'hospital-price-transparency',
    term: 'Hospital Price Transparency',
    definition:
      'Hospital Price Transparency is a U.S. federal rule, effective January 1, 2021, that requires every hospital to publish a machine-readable file of standard charges — gross charges, discounted cash prices, and payer-specific negotiated rates — along with a consumer-friendly display of shoppable services. CMS has progressively strengthened the required file format and enforcement.',
  },
  {
    id: 'in-network-rate',
    term: 'In-Network Rate',
    definition:
      "An in-network rate is the price a health plan and a provider have contractually agreed to for a covered service when the provider participates in the plan's network. In-network rates are typically lower than a provider's billed charges and are disclosed in Transparency in Coverage machine-readable files.",
  },
  {
    id: 'machine-readable-file',
    term: 'Machine-Readable File (MRF)',
    definition:
      'A machine-readable file (MRF) is a structured data file — usually JSON or CSV — that payers and hospitals publish to comply with price transparency rules. MRFs list negotiated rates by payer, provider, and billing code. Their large size, inconsistent schemas, and data-quality issues make them difficult to analyze without significant normalization and enrichment.',
  },
  {
    id: 'negotiated-rate',
    term: 'Negotiated Rate',
    definition:
      'A negotiated rate is the dollar amount a health plan and a healthcare provider have agreed to as payment for a specific covered service. These rates were historically confidential but are now disclosed under federal price transparency rules, forming the basis for reimbursement benchmarking and managed care contract negotiations.',
  },
  {
    id: 'npi',
    term: 'National Provider Identifier (NPI)',
    definition:
      'A National Provider Identifier (NPI) is a unique 10-digit number assigned to U.S. healthcare providers — both individuals and organizations — by CMS. NPIs identify which providers a negotiated rate applies to in machine-readable files, making them essential for linking rates to specific physicians, facilities, and health systems.',
  },
  {
    id: 'out-of-network-rate',
    term: 'Out-of-Network Rate',
    definition:
      'An out-of-network rate refers to the amounts payers report for care delivered by providers outside their contracted network. Under Transparency in Coverage, plans publish historical out-of-network allowed amounts and billed charges, which help reveal payment patterns where no negotiated contract exists.',
  },
  {
    id: 'payer',
    term: 'Payer',
    definition:
      'A payer is an organization — typically a health insurance company, group health plan, or third-party administrator (TPA) — that finances or reimburses the cost of healthcare services. Payers negotiate rates with providers and are required to publish those rates under the Transparency in Coverage rule.',
  },
  {
    id: 'reimbursement-benchmarking',
    term: 'Reimbursement Benchmarking',
    definition:
      "Reimbursement benchmarking is the practice of comparing a provider's negotiated rates against those of peers and competitors across payers, services, and geographies. Using price transparency data, organizations benchmark rates to see where they stand, identify underpaid services, and build evidence for contract negotiations.",
  },
  {
    id: 'tin',
    term: 'Taxpayer Identification Number (TIN)',
    definition:
      'A Taxpayer Identification Number (TIN) is the IRS-issued number that identifies the business entity billing for healthcare services. In price transparency files, TINs help associate negotiated rates with the organization — such as a medical group or hospital — that holds the payer contract, complementing the provider-level NPI.',
  },
  {
    id: 'transparency-in-coverage',
    term: 'Transparency in Coverage (TiC)',
    definition:
      'Transparency in Coverage (TiC) is a U.S. federal rule requiring health insurers and group health plans to publish their in-network negotiated rates and out-of-network allowed amounts as machine-readable files, updated monthly. Effective for plan years beginning in 2022, TiC files cover nearly every commercial plan and are the most comprehensive public source of payer rate data.',
  },
];
