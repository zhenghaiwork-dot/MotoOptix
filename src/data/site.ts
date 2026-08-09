export const site = {
  brand: 'MotoOptix',
  descriptor: 'Motorcycle Vision Supply',
  email: import.meta.env.PUBLIC_RFQ_EMAIL || 'sales@example.com',
};

export type EvidenceStage = 'concept' | 'sample-requested' | 'sample-tested' | 'commercially-approved';

export interface ProductPlatform {
  id: string;
  code: string;
  name: string;
  type: string;
  summary: string;
  highlights: string[];
  status: string;
  evidenceStage: EvidenceStage;
  idealFor: string[];
  options: string[];
  verification: string[];
  relatedProducts: string[];
  relatedApplications: string[];
  relatedRequirements: string[];
  relatedSolutions: string[];
  relatedSupport: string[];
}

export const products: ProductPlatform[] = [
  {
    id: 'road-eye-d2',
    code: 'MO-DVR-D2',
    name: 'Dual-Channel Motorcycle DVR',
    type: 'Compact recording system',
    summary: 'A discreet front-and-rear recording platform for dealers, installers and daily-use fleets.',
    highlights: ['Dual-channel configurations', 'Hardwired ACC operation', 'Optional GPS and Wi-Fi'],
    status: 'Configuration verified per order',
    evidenceStage: 'concept',
    idealFor: ['Motorcycle installers', 'Delivery fleet trials', 'Value-focused distributors'],
    options: ['Front + rear camera packages', 'GPS module', 'Wi-Fi connectivity', 'Storage card bundles', 'Alternative cable lengths'],
    verification: ['Native recording resolution', 'Ingress protection by component', 'Operating temperature', 'Storage capacity', 'Available compliance documents'],
    relatedProducts: ['ride-view-5'], relatedApplications: ['delivery-courier-motorcycle-camera', 'motorcycle-installer-program', 'scooter-urban-commuter-camera'], relatedRequirements: ['waterproof-motorcycle-camera-system', 'acc-hardwired-motorcycle-camera-kit', 'motorcycle-dash-cam-vibration-resistance', 'motorcycle-camera-storage-and-footage-retrieval'], relatedSolutions: ['installers', 'fleets'], relatedSupport: ['request-spec-sheet-and-sample', 'installation-and-after-sales-planning', 'spare-parts-and-replacement-planning'],
  },
  {
    id: 'ride-view-5',
    code: 'MO-VISION-5',
    name: '5-inch Smart Ride Display',
    type: 'CarPlay + camera platform',
    summary: 'A compact smart display platform for accessory retailers and motorcycle installation shops.',
    highlights: ['Wireless phone projection', 'Front/rear camera options', 'Private-label packaging'],
    status: 'Samples available by configuration',
    evidenceStage: 'concept',
    idealFor: ['Accessory retailers', 'Motorcycle dealers', 'Entry private-label programs'],
    options: ['Wireless CarPlay / Android Auto', 'Front + rear cameras', 'TPMS bundles', 'Logo boot screen', 'Branded retail packaging'],
    verification: ['Panel brightness', 'Display lamination', 'Camera sensor and encoding', 'Waterproof scope', 'Phone compatibility'],
    relatedProducts: ['tour-view-625', 'road-eye-d2'], relatedApplications: ['touring-adventure-motorcycle-display', 'motorcycle-installer-program'], relatedRequirements: ['waterproof-motorcycle-camera-system', 'acc-hardwired-motorcycle-camera-kit', 'motorcycle-screen-sunlight-readability'], relatedSolutions: ['distributors', 'installers'], relatedSupport: ['request-spec-sheet-and-sample', 'private-label-artwork-and-boot-logo', 'installation-and-after-sales-planning'],
  },
  {
    id: 'tour-view-625',
    code: 'MO-VISION-625',
    name: '6.25-inch Touring Display',
    type: 'Large-format smart cockpit',
    summary: 'A larger display platform designed for touring, adventure and premium accessory programs.',
    highlights: ['Sunlight-ready panel options', 'TPMS-ready configurations', 'Logo and boot-screen options'],
    status: 'Specification confirmed before quote',
    evidenceStage: 'concept',
    idealFor: ['Touring accessory brands', 'Premium installers', 'Regional distributors'],
    options: ['Display and camera packages', 'TPMS support', 'GPS configurations', 'Language selection', 'Logo and packaging'],
    verification: ['Usable display brightness', 'Touch operation in wet conditions', 'Camera resolution', 'Power input and protection', 'Available certifications'],
    relatedProducts: ['ride-view-5'], relatedApplications: ['touring-adventure-motorcycle-display'], relatedRequirements: ['waterproof-motorcycle-camera-system', 'motorcycle-screen-sunlight-readability'], relatedSolutions: ['distributors', 'installers'], relatedSupport: ['request-spec-sheet-and-sample', 'private-label-artwork-and-boot-logo', 'compliance-document-verification'],
  },
];

export const solutions = [
  {
    id: 'distributors',
    eyebrow: 'Distributors & accessory brands',
    title: 'Build a focused motorcycle electronics range',
    summary: 'Use samples, clear configuration records and practical private label to launch a range without developing new hardware.',
    problem: 'Marketplace catalogs contain hundreds of overlapping products, inconsistent specifications and unclear branding thresholds. A distributor needs a small range that sales and support teams can understand.',
    priorities: ['Clear price-position ladder', 'Stable repeat-order configuration', 'Packaging and SKU ownership', 'Usable sales and installation material'],
    deliverables: ['Shortlist by market and price position', 'Paid sample configuration', 'Tiered quantity quotation', 'Branding MOQ by component', 'Approved artwork and batch record'],
    recommendedProducts: ['detachable-56-smart-display', 'vision-pro-625'],
    cta: 'Plan a distributor range',
  },
  {
    id: 'installers',
    eyebrow: 'Installers & motorcycle dealers',
    title: 'Standardize installs and reduce support friction',
    summary: 'Select repeatable hardware packages with the wiring, mounts, accessories and replacement process your installation team needs.',
    problem: 'A product can look attractive online and still create expensive workshop problems through short cables, bulky connectors, unstable mounts or unclear power behavior.',
    priorities: ['Repeatable installation method', 'Cable and connector dimensions', 'ACC power behavior', 'Accessible replacement components'],
    deliverables: ['Installation-focused sample kit', 'Cable and component list', 'Mounting and routing review', 'Accessory bundle options', 'Replacement and spare-unit plan'],
    recommendedProducts: ['screenless-dual-dvr', 'compact-camera-mt100'],
    cta: 'Build an installer kit',
  },
  {
    id: 'fleets',
    eyebrow: 'Delivery & local fleets',
    title: 'Evaluate durable recording before wider deployment',
    summary: 'Run a controlled hardware trial around automatic recording, storage, installation time and evidence retrieval.',
    problem: 'Fleet recording is an operational system, not simply a camera purchase. A useful trial must test rider interaction, file retrieval, power behavior and maintenance workload.',
    priorities: ['Automatic low-touch operation', 'Predictable loop recording', 'Installation consistency', 'Practical footage retrieval'],
    deliverables: ['Trial configuration and quantity', 'Installation and power checklist', 'Storage-duration estimate inputs', 'Fault and maintenance record', 'Volume quotation after evaluation'],
    recommendedProducts: ['screenless-dual-dvr'],
    cta: 'Discuss a fleet trial',
  },
];

export interface BuyingPath {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  problem: string;
  priorities: string[];
  verification: string[];
  recommendedProducts: string[];
  relatedSolutions: string[];
  cta: string;
}

export const applications: BuyingPath[] = [
  { id: 'delivery-courier-motorcycle-camera', eyebrow: 'Application · delivery & courier', title: 'Motorcycle camera systems for delivery and courier operations', summary: 'Assess automatic recording hardware for delivery riders where installation consistency, file retrieval and low-touch operation matter.', problem: 'A delivery operation needs evidence that works during a shift—not a consumer camera that depends on a rider remembering to charge, start or manage it.', priorities: ['Automatic recording behavior', 'Repeatable hardwired installation', 'Practical storage and retrieval', 'Replacement-unit planning'], verification: ['ACC power behavior', 'Loop recording behavior', 'Cable routing and connector protection', 'Storage-media compatibility'], recommendedProducts: ['screenless-dual-dvr', 'waterproof-dual-dvr-t30a'], relatedSolutions: ['fleets', 'installers'], cta: 'Plan a delivery fleet trial' },
  { id: 'touring-adventure-motorcycle-display', eyebrow: 'Application · touring & ADV', title: 'Smart displays for touring and adventure motorcycle programs', summary: 'Evaluate larger smart display platforms for riders and dealers who value navigation visibility, camera integration and durable cockpit packaging.', problem: 'Touring buyers expect usable cockpit hardware in changing light and weather, while dealers need an installation package they can repeat.', priorities: ['Display visibility in real riding conditions', 'Mount and cable routing review', 'Phone projection compatibility', 'Accessory bundle logic'], verification: ['Panel brightness evidence', 'Waterproof scope by component', 'Phone compatibility', 'Mounting hardware and cable lengths'], recommendedProducts: ['vision-pro-625', 'multi-size-smart-display'], relatedSolutions: ['distributors', 'installers'], cta: 'Build a touring display sample brief' },
  { id: 'motorcycle-installer-program', eyebrow: 'Application · workshop installation', title: 'Motorcycle camera programs for installers and dealers', summary: 'Standardize a sellable camera or display package around mounts, cable routes, power behavior and replacement parts.', problem: 'Workshop margins disappear when a product is difficult to mount, has unsuitable cable lengths or creates unclear after-sales work.', priorities: ['Installation time and routing', 'Accessory and replacement plan', 'Consistent configuration record', 'Customer handover material'], verification: ['Mounting surfaces and brackets', 'ACC and constant-power requirements', 'Connector dimensions', 'Spare-component availability'], recommendedProducts: ['screenless-dual-dvr', 'compact-camera-mt100'], relatedSolutions: ['installers'], cta: 'Build an installer evaluation kit' },
  { id: 'scooter-urban-commuter-camera', eyebrow: 'Application · scooter & commuter', title: 'Motorcycle DVR platforms for urban scooter and commuter programs', summary: 'Select a compact recording platform for city riders, local dealers and distributors focused on practical daily-use hardware.', problem: 'Urban riders often need a discreet setup that does not make a commuter scooter harder to use, charge or service.', priorities: ['Compact installation footprint', 'Low-touch daily operation', 'Clear price position', 'Simple dealer explanation'], verification: ['Host and lens installation space', 'Power behavior', 'Weather-exposure scope', 'Storage and footage retrieval'], recommendedProducts: ['mini-dvr-d8', 'portable-tube-camera'], relatedSolutions: ['distributors', 'installers'], cta: 'Discuss a commuter-market shortlist' },
];

export const requirements: BuyingPath[] = [
  { id: 'waterproof-motorcycle-camera-system', eyebrow: 'Requirement · water & weather', title: 'How to evaluate a waterproof motorcycle camera system', summary: 'Use component-level questions to compare hosts, lenses, connectors and harnesses instead of accepting a single broad waterproof claim.', problem: 'A lens may be rated differently from the host, connector or cable entry point. A whole-system claim is only useful when its scope is clear.', priorities: ['Separate host, lens and connector claims', 'Ask what test or document exists', 'Review installation exposure points', 'Confirm the exact configuration'], verification: ['Ingress rating by component', 'Connector and harness protection', 'Supplier document model match', 'Sample inspection after installation'], recommendedProducts: ['waterproof-dual-dvr-t30a', 'screenless-dual-dvr', 'vision-pro-625'], relatedSolutions: ['installers', 'fleets'], cta: 'Request a waterproofing checklist' },
  { id: 'acc-hardwired-motorcycle-camera-kit', eyebrow: 'Requirement · power & installation', title: 'Planning an ACC hardwired motorcycle camera kit', summary: 'Build a clearer installation brief around switched power, fuse protection, cable routes and the actual behavior required when the bike is parked.', problem: '“Hardwired” does not explain which power source is needed, how the system starts, or what happens when a motorcycle is left unused.', priorities: ['Identify switched and constant-power needs', 'Confirm fuse and voltage protection', 'Map cable lengths and routes', 'Set installation time expectations'], verification: ['Power input range', 'ACC startup and shutdown behavior', 'Cable length options', 'Installer sample trial'], recommendedProducts: ['screenless-dual-dvr', 'compact-camera-mt100'], relatedSolutions: ['installers', 'fleets'], cta: 'Plan a hardwired sample kit' },
  { id: 'motorcycle-screen-sunlight-readability', eyebrow: 'Requirement · display visibility', title: 'How to compare motorcycle screen sunlight readability', summary: 'Ask for usable brightness, bonding, reflection control and sample evidence before positioning a smart display for outdoor riding.', problem: 'A marketing brightness number alone does not establish whether a rider can use the screen in direct sun, with gloves or in mixed weather.', priorities: ['Ask for brightness measurement context', 'Compare panel and bonding approach', 'Test angle and reflection', 'Match the promise to the market'], verification: ['Panel brightness evidence', 'Lamination or optical treatment', 'Touch behavior in wet conditions', 'Outdoor sample review'], recommendedProducts: ['vision-pro-625', 'detachable-56-smart-display'], relatedSolutions: ['distributors', 'installers'], cta: 'Request a display evaluation brief' },
  { id: 'motorcycle-dash-cam-vibration-resistance', eyebrow: 'Requirement · vibration & mounting', title: 'Evaluating motorcycle dash cam vibration resistance', summary: 'Review mounting, cable retention and video stability as a system before claiming suitability for rough roads or high-vibration motorcycles.', problem: 'A camera can work on a bench and still fail when a mount loosens, a connector frets or footage becomes unusable in real riding.', priorities: ['Inspect the mount and cable strain relief', 'Review camera position', 'Test after a controlled ride', 'Keep claims conditional on evidence'], verification: ['Mounting hardware', 'Cable retention', 'Ride-sample footage', 'Component inspection after trial'], recommendedProducts: ['compact-camera-mt100', 'detachable-56-smart-display'], relatedSolutions: ['installers', 'fleets'], cta: 'Build a vibration test checklist' },
  { id: 'motorcycle-camera-storage-and-footage-retrieval', eyebrow: 'Requirement · storage & evidence', title: 'Motorcycle camera storage and footage retrieval planning', summary: 'Choose a recording configuration around expected ride time, loop behavior, storage media and the practical steps required to retrieve evidence.', problem: 'A large card capacity does not automatically provide useful evidence if retrieval is slow, media is unsuitable or the recording behavior is unclear.', priorities: ['Estimate operating hours', 'Define retrieval workflow', 'Choose approved storage media', 'Test file playback and export'], verification: ['Supported storage capacity', 'Loop recording behavior', 'File format and access method', 'Sample footage retrieval'], recommendedProducts: ['screenless-dual-dvr', 'helmet-dual-camera-c20'], relatedSolutions: ['fleets', 'installers'], cta: 'Discuss a recording workflow' },
];

export const supportTopics: BuyingPath[] = [
  { id: 'request-spec-sheet-and-sample', eyebrow: 'Support · buying brief', title: 'Request a motorcycle electronics spec sheet and sample', summary: 'Turn an initial requirement into a focused sample request with the configuration, evidence questions and commercial assumptions recorded.', problem: 'A generic “send catalog” request often produces irrelevant options and leaves no record of which configuration was actually quoted.', priorities: ['State market and buyer type', 'List non-negotiable requirements', 'Choose sample configuration', 'Record open verification questions'], verification: ['Configuration reference', 'Supplier and model identity', 'Evidence requested', 'Sample quotation and lead time'], recommendedProducts: ['road-eye-d2', 'ride-view-5', 'tour-view-625'], relatedSolutions: ['distributors', 'installers', 'fleets'], cta: 'Request a focused spec sheet' },
  { id: 'installation-and-after-sales-planning', eyebrow: 'Support · installer readiness', title: 'Installation and after-sales planning for motorcycle electronics', summary: 'Prepare cable, accessory, replacement and customer-handover details before listing a product for installation or resale.', problem: 'After-sales costs are often created before the first order when installation variables and spare-part expectations were not recorded.', priorities: ['Map installation dependencies', 'Define spare parts', 'Prepare handover material', 'Set fault-reporting workflow'], verification: ['Accessory list', 'Replacement part availability', 'Installation notes', 'Escalation contact and response process'], recommendedProducts: ['road-eye-d2', 'ride-view-5', 'tour-view-625'], relatedSolutions: ['installers', 'distributors'], cta: 'Prepare an installer support brief' },
  { id: 'compliance-document-verification', eyebrow: 'Support · documentation', title: 'How to verify compliance documents for motorcycle electronics', summary: 'Request and match available supplier documents to the exact model, supplier entity and destination requirement before relying on them commercially.', problem: 'A document with a familiar logo is not enough if its product model, applicant, scope or validity do not match the offered configuration.', priorities: ['Identify destination requirement', 'Match document to product identity', 'Confirm supplier entity', 'Keep a batch-level record'], verification: ['Model number match', 'Supplier/applicant match', 'Document scope and date', 'Destination-market suitability'], recommendedProducts: ['road-eye-d2', 'ride-view-5', 'tour-view-625'], relatedSolutions: ['distributors', 'fleets'], cta: 'Request a document verification checklist' },
  { id: 'private-label-artwork-and-boot-logo', eyebrow: 'Support · light private label', title: 'Private-label artwork, packaging and boot-logo planning', summary: 'Use a practical checklist for the parts that commonly support a ready-made product: logo, boot screen, packaging, manual and language.', problem: 'Light private label can be useful, but it becomes expensive when artwork, language approval and MOQ are discussed after a configuration has already changed.', priorities: ['Choose the branding level', 'Confirm MOQ per component', 'Prepare artwork ownership', 'Approve samples before volume'], verification: ['Logo format and placement', 'Boot-screen feasibility', 'Packaging MOQ', 'Manual and language proof'], recommendedProducts: ['ride-view-5', 'tour-view-625'], relatedSolutions: ['distributors'], cta: 'Plan a private-label brief' },
  { id: 'spare-parts-and-replacement-planning', eyebrow: 'Support · commercial continuity', title: 'Spare parts and replacement planning for motorcycle electronics', summary: 'Build a basic replacement plan for mounts, cables, cameras and other high-touch components before a dealer or fleet program scales.', problem: 'A small missing component can take a sellable unit out of service. Replacement planning should be part of the commercial configuration, not an afterthought.', priorities: ['Identify field-replaceable parts', 'Set initial spare ratio', 'Record compatible revisions', 'Define return and fault information'], verification: ['Accessory part numbers', 'Replacement lead times', 'Revision compatibility', 'Fault-reporting fields'], recommendedProducts: ['road-eye-d2', 'ride-view-5', 'tour-view-625'], relatedSolutions: ['installers', 'fleets', 'distributors'], cta: 'Build a spare-parts plan' },
];

export interface ComparisonGuide {
  id: string;
  title: string;
  description: string;
  leftTitle: string;
  rightTitle: string;
  rows: { label: string; left: string; right: string }[];
  recommendation: string;
  productIds: string[];
  relatedLinks: { label: string; href: string }[];
}

export const comparisonGuides: ComparisonGuide[] = [
  {
    id: 'motorcycle-dvr-vs-smart-display',
    title: 'Motorcycle DVR vs Smart Display: Which Platform Fits Your Program?',
    description: 'Compare a screenless motorcycle DVR with a connected smart display by buyer type, installation, rider interaction and support workload.',
    leftTitle: 'Screenless motorcycle DVR', rightTitle: 'Smart motorcycle display',
    rows: [
      { label: 'Primary buying job', left: 'Automatic front/rear recording with limited rider interaction.', right: 'Phone projection and cockpit interaction, often combined with camera options.' },
      { label: 'Typical buyer', left: 'Fleet trial, installer or value-focused distributor.', right: 'Accessory retailer, dealer or private-label brand.' },
      { label: 'Installation focus', left: 'Hidden host, camera positions, ACC power and footage access.', right: 'Visible mount, screen position, phone compatibility and cable routing.' },
      { label: 'Support focus', left: 'Storage media, recording behavior and evidence retrieval.', right: 'Phone pairing, display use, mounts, accessories and firmware revision.' },
    ],
    recommendation: 'Choose a DVR when automatic recording is the central job. Choose a smart display when the cockpit experience and phone projection are central to the offer.',
    productIds: ['road-eye-d2', 'ride-view-5'], relatedLinks: [{ label: 'Delivery & courier application', href: '/applications/delivery-courier-motorcycle-camera/' }, { label: 'Installer buying path', href: '/solutions/installers/' }],
  },
  {
    id: '5-inch-vs-6-25-inch-motorcycle-display',
    title: '5-inch vs 6.25-inch Motorcycle Smart Display',
    description: 'Compare compact and large-format motorcycle smart display platforms by positioning, installation space and channel strategy.',
    leftTitle: '5-inch smart display', rightTitle: '6.25-inch touring display',
    rows: [
      { label: 'Commercial position', left: 'Compact, accessible connected upgrade.', right: 'Larger-format touring or premium accessory offer.' },
      { label: 'Typical channel', left: 'Dealer, accessory retailer or entry private-label program.', right: 'Touring brand, premium installer or regional distributor.' },
      { label: 'Evaluation focus', left: 'Mounting flexibility, pairing and bundle simplicity.', right: 'Cockpit space, outdoor visibility and premium bundle logic.' },
      { label: 'Key evidence', left: 'Panel, waterproof scope, phone compatibility and camera configuration.', right: 'Usable brightness, touch behavior, power protection and available documents.' },
    ],
    recommendation: 'The screen size should follow motorcycle cockpit space, target retail position and installation method—not a belief that a larger screen is automatically better.',
    productIds: ['ride-view-5', 'tour-view-625'], relatedLinks: [{ label: 'Touring & adventure application', href: '/applications/touring-adventure-motorcycle-display/' }, { label: 'Sunlight readability requirement', href: '/requirements/motorcycle-screen-sunlight-readability/' }],
  },
  {
    id: 'hardwired-dvr-vs-action-camera-for-dealers',
    title: 'Hardwired Motorcycle DVR vs Action Camera for Dealers',
    description: 'Understand the different buying jobs served by a permanently installed motorcycle DVR and a removable action camera.',
    leftTitle: 'Hardwired motorcycle DVR', rightTitle: 'Removable action camera',
    rows: [
      { label: 'Core purpose', left: 'Routine automatic ride recording and evidence capture.', right: 'Portable creative or recreational footage.' },
      { label: 'Daily operation', left: 'Designed around vehicle power and automatic behavior.', right: 'Typically depends on charging, mounting and manual operation.' },
      { label: 'Dealer opportunity', left: 'Installation service, accessories and repeatable vehicle integration.', right: 'Portable retail product with less vehicle-specific integration.' },
      { label: 'Evaluation focus', left: 'Power, routing, loop recording, storage and replacement parts.', right: 'Battery runtime, stabilization, audio and removable mounts.' },
    ],
    recommendation: 'A dealer should position these as different categories. A hardwired DVR is the stronger starting point when the customer wants low-touch evidence recording rather than content creation.',
    productIds: ['road-eye-d2'], relatedLinks: [{ label: 'Installer program', href: '/applications/motorcycle-installer-program/' }, { label: 'ACC hardwire planning', href: '/requirements/acc-hardwired-motorcycle-camera-kit/' }],
  },
  {
    id: 'motorcycle-dash-cam-installers-vs-fleets',
    title: 'Motorcycle Dash Cam Requirements: Installers vs Fleets',
    description: 'Compare how an installation business and a delivery fleet evaluate the same motorcycle camera platform.',
    leftTitle: 'Installer or dealer program', rightTitle: 'Fleet trial and deployment',
    rows: [
      { label: 'Success measure', left: 'Repeatable installation, sellable package and manageable customer support.', right: 'Reliable operation, evidence retrieval and predictable maintenance workload.' },
      { label: 'Sample focus', left: 'Mounts, cable lengths, workshop time and handover material.', right: 'Shift operation, storage duration, rider interaction and fault logging.' },
      { label: 'Commercial focus', left: 'Margin, accessory bundle and replacement components.', right: 'Trial quantity, deployment consistency and total operating effort.' },
      { label: 'After-sales focus', left: 'Customer troubleshooting and component replacement.', right: 'Fleet-wide fault reporting, spares and revision control.' },
    ],
    recommendation: 'Use the same hardware platform only after creating separate evaluation and support plans for the installer and fleet buying jobs.',
    productIds: ['road-eye-d2'], relatedLinks: [{ label: 'Installer solution', href: '/solutions/installers/' }, { label: 'Fleet solution', href: '/solutions/fleets/' }],
  },
];
