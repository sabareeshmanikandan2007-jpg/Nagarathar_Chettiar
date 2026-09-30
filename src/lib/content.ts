export const DISCLAIMER =
  "This is a cultural and heritage guide to traditional Nattukottai Nagarathar / Chettiar wedding practices. Families do not necessarily follow every ritual listed. Confirm the exact sequence, materials, and roles with your elders and priest.";

export type HouseId = "mappillai" | "ponnu";

export type VendorField = {
  key: string;
  label: string;
  placeholder: string;
};

export type Ceremony = {
  slug: string;
  tamil: string;
  title: string;
  house: HouseId;
  order: number;
  summary: string;
  meaning: string;
  who: string;
  materials: string[];
  historicalNote: string;
  image: string;
  imageAlt: string;
  meyyappanTip: string;
  vendorId?: string;
};

export type ChecklistItem = {
  id: string;
  house: HouseId | "both";
  label: string;
  tamil?: string;
  ceremonySlug?: string;
  vendorId?: string;
};

export type VendorBox = {
  id: string;
  title: string;
  description: string;
  fields: VendorField[];
};

export const VENDORS: VendorBox[] = [
  {
    id: "band",
    title: "Nadaswaram & Thavil (Band set)",
    description: "Book traditional music for azhaippu, procession, and muhurtham.",
    fields: [
      { key: "troupe", label: "Troupe / nadaswaram vidwan", placeholder: "Name of troupe" },
      { key: "phone", label: "Phone", placeholder: "Contact number" },
      { key: "date", label: "Booking date", placeholder: "Function date & slot" },
      { key: "advance", label: "Advance paid", placeholder: "Yes / amount" },
    ],
  },
  {
    id: "catering",
    title: "Chettinad catering",
    description: "Wedding feast and hospitality for relatives and guests.",
    fields: [
      { key: "caterer", label: "Caterer", placeholder: "Name" },
      { key: "phone", label: "Phone", placeholder: "Contact number" },
      { key: "menu", label: "Menu notes", placeholder: "Traditional / mixed" },
      { key: "count", label: "Guest count", placeholder: "Approximate number" },
    ],
  },
  {
    id: "jewellery",
    title: "Jewellery & Kaluthiru",
    description: "Ceremonial gold, chain, and the Nagarathar kaluthiru.",
    fields: [
      { key: "jeweller", label: "Jeweller / family set", placeholder: "Where it is kept" },
      { key: "kaluthiru", label: "Kaluthiru ready?", placeholder: "Yes / to arrange" },
      { key: "trial", label: "Trial / fitting date", placeholder: "Date" },
    ],
  },
  {
    id: "mandapam",
    title: "Mandapam / venue",
    description: "Home, kalyana mandapam, or Chettinad house setting.",
    fields: [
      { key: "venue", label: "Venue", placeholder: "Name / address" },
      { key: "date", label: "Booking", placeholder: "Dates" },
      { key: "kolam", label: "Kolam / décor contact", placeholder: "Name" },
    ],
  },
];

const IMG = {
  palace:
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80",
  temple:
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1400&q=80",
  gold:
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=80",
  flowers:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80",
  wedding:
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80",
  feast:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  invitation:
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=80",
  home:
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80",
  music:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80",
  fire:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80",
  elders:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
  swing:
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
};

export const MAPPILLAI_CEREMONIES: Ceremony[] = [
  {
    slug: "clan-temple",
    tamil: "குலம் & கோயில்",
    title: "Clan, family & temple considerations",
    house: "mappillai",
    order: 1,
    summary: "Confirm lineage, kuladeivam, and elders before dates are locked.",
    meaning:
      "A Nagarathar wedding joins two families as well as two people. Clan identity and temple affiliation traditionally guided whether an alliance could proceed.",
    who: "Parents, elders, and close pankalis on the groom’s side.",
    materials: ["Family details", "Clan / temple notes", "Proposed dates for priestly advice"],
    historicalNote:
      "Marriage within the same traditional clan division was restricted. Today families may combine these checks with contemporary planning.",
    image: IMG.temple,
    imageAlt: "South Indian temple tower against the sky",
    meyyappanTip: "Speak with elders first. A calm alliance conversation saves confusion later.",
  },
  {
    slug: "prepare-mappillai",
    tamil: "மப்பிள்ளை தயாரிப்பு",
    title: "Preparing the mappillai",
    house: "mappillai",
    order: 2,
    summary: "Attire, morai, salavai, chain, gifts, and the groom’s ceremonial readiness.",
    meaning:
      "The groom’s house prepares him for the ceremonial journey: traditional clothing, jewellery, presentation items, and the people who will accompany him.",
    who: "Groom’s parents, sister, and close relatives.",
    materials: ["Veshti / salavai", "Morai (turban)", "Gold chain", "Gifts for the bride’s family"],
    historicalNote: "The groom’s sister often has a specific role in the traditional sequence.",
    image: IMG.gold,
    imageAlt: "Traditional gold jewellery laid out for a ceremony",
    meyyappanTip: "Keep the morai, chain, and salavai together in one ready set the night before.",
    vendorId: "jewellery",
  },
  {
    slug: "invitation",
    tamil: "அழைப்பிதழ்",
    title: "Invitations",
    house: "mappillai",
    order: 3,
    summary: "Traditional and modern invitations for relatives and community.",
    meaning: "Inviting relatives makes the wedding a shared family event, not a private contract.",
    who: "Groom’s family, often with the bride’s family coordinating overlapping guest lists.",
    materials: ["Invitation wording (Tamil & English)", "Guest list", "Print or digital cards"],
    historicalNote: "Elders still expect personal invitation for close kin, even if cards are printed.",
    image: IMG.invitation,
    imageAlt: "Elegant invitation table setting",
    meyyappanTip: "Send to elders first. Then print the wider list.",
  },
  {
    slug: "seer-gifts",
    tamil: "சீர் / சீர் வரிசை",
    title: "Seer items from the groom’s side",
    house: "mappillai",
    order: 4,
    summary: "Ceremonial gifts — not a fixed price list.",
    meaning:
      "Seer expresses family participation and blessing. Scale and contents vary greatly from family to family.",
    who: "Groom’s parents and women of the household who arrange trays.",
    materials: ["Clothing", "Jewellery according to custom", "Household or ceremonial articles"],
    historicalNote:
      "Historical records describe cir tanam and cir varicai and documentation of gifts. Present this as blessing, not a mandatory financial demand.",
    image: IMG.gold,
    imageAlt: "Gold and ceremonial gift presentation",
    meyyappanTip: "Write a simple tray list with elders. Do not copy another family’s seer as a rule.",
  },
  {
    slug: "uppu-eduththal",
    tamil: "உப்பு எடுத்தல்",
    title: "Uppu eduththal (salt-carrying tradition)",
    house: "mappillai",
    order: 5,
    summary: "Historical groom-side ceremony; often kept only as symbolism today.",
    meaning:
      "The groom’s side traditionally carried salt, grains, and auspicious materials to the bride’s house — practical household symbols as well as ritual ones.",
    who: "Groom’s relatives assigned to carry ceremonial items.",
    materials: ["Salt (historical)", "Nine kinds of grains (historical accounts)", "Betel and auspicious items"],
    historicalNote:
      "A marriage document was historically associated with this ceremony. Many present-day families preserve the idea rather than the full procedure.",
    image: IMG.palace,
    imageAlt: "Traditional South Indian mansion architecture",
    meyyappanTip: "Ask your priest if your family still performs this, or only remembers it.",
  },
  {
    slug: "temple-procession",
    tamil: "கோயில் & ஊர்வலம்",
    title: "Pillayar worship, procession & music",
    house: "mappillai",
    order: 6,
    summary: "Temple prayer, then ceremonial travel toward the bride’s space.",
    meaning:
      "The groom proceeds with relatives, music, and honour toward the wedding. Today this may be a decorated car and a shorter venue procession.",
    who: "Groom, sister, relatives, nadaswaram party.",
    materials: ["Temple offering", "Procession plan", "Nadaswaram and thavil booking"],
    historicalNote: "Traditional accounts include waiting near a Pillayar temple before the bride’s family welcome.",
    image: IMG.music,
    imageAlt: "Musicians performing at a celebration",
    meyyappanTip: "Book the band set early. Empty music details will delay the whole morning.",
    vendorId: "band",
  },
  {
    slug: "mappillai-azhaippu",
    tamil: "மப்பிள்ளை அழைப்பு",
    title: "Mappillai azhaippu — from the groom’s side",
    house: "mappillai",
    order: 7,
    summary: "Arrive, wait at the agreed place, and receive the bride family’s welcome.",
    meaning:
      "This is the public transition from the groom’s journey into the bride’s wedding space.",
    who: "Groom’s party, coordinated with the bride’s father or elders.",
    materials: ["Agreed meeting point", "Timing with muhurtham", "Music and honours"],
    historicalNote: "Documented practice: wait near a Pillayar temple or community location until formally welcomed.",
    image: IMG.wedding,
    imageAlt: "Wedding ceremony gathering",
    meyyappanTip: "Do not rush past the welcome. Elders notice how the two parties greet.",
  },
  {
    slug: "maalai-maatral",
    tamil: "மாலை மாற்றல்",
    title: "Maalai maatral — garland exchange",
    house: "mappillai",
    order: 8,
    summary: "Public acceptance of the union.",
    meaning: "Exchanging garlands is a visible sign of mutual acceptance and celebration.",
    who: "Bride, groom, and witnessing families.",
    materials: ["Floral garlands", "Photography plan"],
    historicalNote: "Order can vary by family and wedding format.",
    image: IMG.flowers,
    imageAlt: "Wedding flowers and garlands",
    meyyappanTip: "Stand so both families can see. This photograph becomes a family record.",
  },
  {
    slug: "oonjal",
    tamil: "ஊஞ்சல்",
    title: "Oonjal — swing ceremony",
    house: "mappillai",
    order: 9,
    summary: "The couple sit together while family bless them.",
    meaning: "The swing suggests life’s changing motion while relatives support the couple.",
    who: "Couple, women and elders of both families.",
    materials: ["Decorated swing", "Songs", "Ceremonial offerings"],
    historicalNote: "Not every Nagarathar family performs the same version.",
    image: IMG.swing,
    imageAlt: "Romantic wedding portrait suggesting a ceremonial swing moment",
    meyyappanTip: "If your venue has no swing, ask the priest for a simple seated blessing instead.",
  },
  {
    slug: "muhurtham",
    tamil: "முகூர்த்தம்",
    title: "Muhurtham — supporting the sacred ceremony",
    house: "mappillai",
    order: 10,
    summary: "Priest-led rites; the groom ties the marriage necklace.",
    meaning:
      "Prayers, customary commitments, and the tying of the kaluthiru form the sacred centre of the wedding.",
    who: "Priest, couple, both families’ elders.",
    materials: ["Kaluthiru", "Ritual materials as the priest lists", "Sacred fire items if homam is followed"],
    historicalNote:
      "Chettiar weddings have distinctive details. Do not copy a generic Tamil checklist over your priest’s order.",
    image: IMG.fire,
    imageAlt: "Ceremonial fire light",
    meyyappanTip: "Your role is to be present, listen to the priest, and tie the kaluthiru with a steady mind.",
    vendorId: "jewellery",
  },
  {
    slug: "marriage-document",
    tamil: "திருமண ஆவணம்",
    title: "Marriage document — heritage & legal registration",
    house: "mappillai",
    order: 11,
    summary: "Historical written record is heritage; today’s legal registration is separate.",
    meaning:
      "Nattukottai Chettiar culture carefully recorded family, jewellery, and marriage arrangements.",
    who: "Families historically; today also the registrar for legal marriage.",
    materials: ["Heritage notes if the family keeps them", "Legal registration appointments"],
    historicalNote: "Copies could be retained by bride and groom. This is not a substitute for modern law.",
    image: IMG.invitation,
    imageAlt: "Paper documents and formal writing",
    meyyappanTip: "Keep heritage papers safe. Complete legal registration as a separate task.",
  },
  {
    slug: "moi",
    tamil: "மொய்",
    title: "Moi — gifts from guests",
    house: "mappillai",
    order: 12,
    summary: "Record gifts with the same care the community historically used.",
    meaning: "Moi connects guests to the celebration. Amounts are not universal.",
    who: "A trusted relative who can sit with a notebook.",
    materials: ["Moi notebook", "Envelopes or digital note method"],
    historicalNote: "Historical descriptions mention dedicated account books and categories of relatives.",
    image: IMG.elders,
    imageAlt: "Family and guests gathered together",
    meyyappanTip: "Assign one calm person to the moi book. Do not leave it unattended.",
  },
  {
    slug: "grihapravesham",
    tamil: "கிருகப்பிரவேசம்",
    title: "Welcoming the bride into the grooms home",
    house: "mappillai",
    order: 13,
    summary: "Intimate household blessing after the public wedding.",
    meaning: "The bride’s entry marks the start of shared household life.",
    who: "Groom’s elders, women of the house, the couple.",
    materials: ["Auspicious entry items as family custom", "Simple prayer arrangement"],
    historicalNote: "Modern couples may adapt this to a rented home or a later date.",
    image: IMG.home,
    imageAlt: "Warm traditional home interior",
    meyyappanTip: "Prepare a quiet welcome. This is for family, not a second public show.",
  },
  {
    slug: "feast-blessings",
    tamil: "விருந்து & ஆசீர்வாதம்",
    title: "Feasts, blessings & family gatherings",
    house: "mappillai",
    order: 14,
    summary: "Marriage continues as kinship, meals, and blessings.",
    meaning: "The wedding creates an ongoing relationship between families.",
    who: "Both families, elders, community guests.",
    materials: ["Feast plan", "Family photograph time", "Rest for the couple"],
    historicalNote: "Hospitality is part of Chettinad identity as much as ritual.",
    image: IMG.feast,
    imageAlt: "Festive shared meal",
    meyyappanTip: "Feed elders first. Then take the family photograph while everyone is still present.",
    vendorId: "catering",
  },
];

export const PONNU_CEREMONIES: Ceremony[] = [
  {
    slug: "clan-temple",
    tamil: "குலம் & கோயில்",
    title: "Clan, family & temple considerations",
    house: "ponnu",
    order: 1,
    summary: "Confirm lineage, kuladeivam, and elders before dates are locked.",
    meaning:
      "Bride’s family elders participate in confirming the alliance and auspicious timing, with temple and family custom in mind.",
    who: "Parents, maternal relatives, and elders of the bride’s house.",
    materials: ["Family details", "Temple / kuladeivam notes", "Proposed muhurtham discussion"],
    historicalNote: "Practices differ by clan temple, locality, and generation.",
    image: IMG.temple,
    imageAlt: "Temple gopuram",
    meyyappanTip: "Write down what your kuladeivam tradition expects so visiting relatives are not surprised.",
  },
  {
    slug: "prepare-bride",
    tamil: "பெண் தயாரிப்பு",
    title: "Preparing the pen / bride",
    house: "ponnu",
    order: 2,
    summary: "Attire, jewellery, bath and adornment, seer, and the ceremonial home.",
    meaning:
      "The bride’s house prepares the bride and the setting for the groom’s arrival: clothing, jewellery, kolam, and welcome.",
    who: "Mother, sisters, close female relatives, and elders.",
    materials: ["Wedding attire", "Jewellery", "Seer articles", "Kolam materials"],
    historicalNote: "Women of the family traditionally participate in songs, rituals, and welcoming activities.",
    image: IMG.gold,
    imageAlt: "Bridal gold jewellery",
    meyyappanTip: "Keep jewellery and the kaluthiru in a named person’s care until muhurtham.",
    vendorId: "jewellery",
  },
  {
    slug: "seer-display",
    tamil: "சீர் வரிசை",
    title: "Seer / sir varisai display",
    house: "ponnu",
    order: 3,
    summary: "Arrange ceremonial gifts for relatives to see, according to your custom.",
    meaning: "Seer is a ceremonial expression of family participation, not a fixed shopping list.",
    who: "Women and elders who know the family’s usual trays.",
    materials: ["Sarees and clothing", "Jewellery if customary", "Household articles", "Traditional food gifts"],
    historicalNote: "Modern families may simplify the display. Explain seer as blessing, not as pressure.",
    image: IMG.flowers,
    imageAlt: "Decorative ceremonial flowers",
    meyyappanTip: "Photograph the seer once it is arranged. Relatives who cannot attend will still feel included.",
  },
  {
    slug: "home-kolam",
    tamil: "கோலம் & வரவேற்பு",
    title: "Home, kolam and welcome setting",
    house: "ponnu",
    order: 4,
    summary: "Decorate the house or mandapam and prepare the welcome line.",
    meaning: "The bride’s space becomes the ceremonial threshold for the groom’s family.",
    who: "Bride’s household, décor helpers, elders who will greet.",
    materials: ["Kolam", "Lamps", "Seating for elders", "Water / honour items as custom"],
    historicalNote: "Welcome is led by the bride’s father or family elders in documented azhaippu practice.",
    image: IMG.palace,
    imageAlt: "Ornate traditional architecture",
    meyyappanTip: "Leave a clear path from the gate to the welcome spot. Processions need space.",
    vendorId: "mandapam",
  },
  {
    slug: "mappillai-azhaippu",
    tamil: "மப்பிள்ளை அழைப்பு",
    title: "Mappillai azhaippu — welcoming the groom",
    house: "ponnu",
    order: 5,
    summary: "Bride’s family formally receives the groom’s party.",
    meaning: "Music, honours, and greetings publicly acknowledge the arrival of the groom and his family.",
    who: "Bride’s father or elders; women of the house; nadaswaram if used at the entrance.",
    materials: ["Meeting point (temple, street, or venue)", "Honour items", "Timing with the priest"],
    historicalNote: "Groom’s family may wait at a Pillayar temple until the bride’s side comes forward.",
    image: IMG.wedding,
    imageAlt: "Wedding welcome gathering",
    meyyappanTip: "Decide who speaks first in the welcome. One elder, one clear greeting.",
    vendorId: "band",
  },
  {
    slug: "pen-eduththu",
    tamil: "பெண் எடுத்து காட்டுதல்",
    title: "Pen eduththu kattuthal",
    house: "ponnu",
    order: 6,
    summary: "The bride is ceremonially brought forward and presented.",
    meaning: "It symbolises the joining of two families. Contemporary couples may already know each other; the ritual keeps the family form.",
    who: "Bride, close relatives, groom and selected kin.",
    materials: ["Entrance arrangement", "Photography plan"],
    historicalNote: "Older physical customs may be modified. Keep dignity and consent at the centre.",
    image: IMG.wedding,
    imageAlt: "Couple at a wedding ceremony",
    meyyappanTip: "Tell the photographer this moment is for family, not a long pose session.",
  },
  {
    slug: "nalangu",
    tamil: "நலங்கு",
    title: "Nalangu — pre-wedding family ceremony",
    house: "ponnu",
    order: 7,
    summary: "Turmeric, song, play, and blessing before the main day tension.",
    meaning: "Nalangu creates a relaxed family space. Exact form is not identical in every house.",
    who: "Women and elders; the bride, and sometimes the groom at a separate or combined function.",
    materials: ["Turmeric / sandalwood as followed", "Traditional snacks", "Songs"],
    historicalNote: "Modern weddings may combine nalangu with other pre-wedding events.",
    image: IMG.flowers,
    imageAlt: "Festive floral decoration",
    meyyappanTip: "Keep nalangu joyful and short if elders are travelling. Tired guests cannot bless well.",
  },
  {
    slug: "maalai-maatral",
    tamil: "மாலை மாற்றல்",
    title: "Maalai maatral — garland exchange",
    house: "ponnu",
    order: 8,
    summary: "The bride and groom exchange garlands before families.",
    meaning: "A visual sign of acceptance and the beginning of married life.",
    who: "Couple and both families.",
    materials: ["Garlands", "Helpers to hold extra flowers"],
    historicalNote: "Timing relative to muhurtham varies.",
    image: IMG.flowers,
    imageAlt: "Wedding floral garlands",
    meyyappanTip: "Have a spare garland. Heat and travel spoil flowers quickly.",
  },
  {
    slug: "oonjal",
    tamil: "ஊஞ்சல்",
    title: "Oonjal — swing ceremony",
    house: "ponnu",
    order: 9,
    summary: "Couple on a decorated swing; songs and blessings.",
    meaning: "Family support through the motion of married life.",
    who: "Women of the family, elders, couple.",
    materials: ["Swing", "Flowers", "Song lead"],
    historicalNote: "Included in many Tamil sequences; not identical in every Chettiar family.",
    image: IMG.swing,
    imageAlt: "Wedding couple in a ceremonial setting",
    meyyappanTip: "If older relatives cannot stand long, place chairs around the oonjal.",
  },
  {
    slug: "kaluthiru",
    tamil: "கழுத்திறு",
    title: "Kaluthiru — Nattukottai Chettiar marriage necklace",
    house: "ponnu",
    order: 10,
    summary: "Heritage thali: distinctive large ceremonial design worn at the wedding.",
    meaning:
      "The groom’s tying of the kaluthiru is a central visual and cultural moment of a Nagarathar wedding.",
    who: "Groom ties; bride wears; jeweller or family custodian prepares it.",
    materials: ["Kaluthiru", "Yellow thread or chain as your priest directs", "Cloth to handle gold"],
    historicalNote:
      "Described as a large ceremonial thali with a distinctive pendant, worn for the wedding and special occasions.",
    image: IMG.gold,
    imageAlt: "Traditional gold necklace",
    meyyappanTip: "Show the kaluthiru to the priest the day before. Last-minute knots cause delay.",
    vendorId: "jewellery",
  },
  {
    slug: "muhurtham",
    tamil: "முகூர்த்தம்",
    title: "Muhurtham — main marriage ceremony",
    house: "ponnu",
    order: 11,
    summary: "Sacred fire, vows, kaluthiru, and elder blessings as your priest conducts them.",
    meaning: "The central sacred portion of the wedding under priestly guidance.",
    who: "Priest, couple, both houses.",
    materials: ["Priest’s list", "Homam materials if followed", "Seating for parents"],
    historicalNote: "Confirm order with your family’s priest rather than a generic internet checklist.",
    image: IMG.fire,
    imageAlt: "Sacred ceremonial light",
    meyyappanTip: "Give the priest water, a quiet corner, and the exact names of the couple beforehand.",
  },
  {
    slug: "moi-feast",
    tamil: "மொய் & விருந்து",
    title: "Moi, feast and hosting",
    house: "ponnu",
    order: 12,
    summary: "Guest gifts, hospitality, and the wedding meal.",
    meaning: "The bride’s house often carries heavy hosting work: relatives, food, and honour.",
    who: "Bride’s parents, siblings, trusted cousins for moi and kitchen coordination.",
    materials: ["Moi book", "Catering plan", "Seating for elders"],
    historicalNote: "Moi may be cash, envelopes, or other gifts. Record without announcing amounts publicly.",
    image: IMG.feast,
    imageAlt: "Festive food hospitality",
    meyyappanTip: "Separate kitchen lead and moi lead. One person cannot do both well.",
    vendorId: "catering",
  },
  {
    slug: "send-off",
    tamil: "விடைபெறுதல்",
    title: "Blessings, send-off and grihapravesham support",
    house: "ponnu",
    order: 13,
    summary: "Elders bless the couple; the bride leaves for the new household when the family is ready.",
    meaning: "Marriage is an ongoing kinship, not a single hour on stage.",
    who: "Parents, maternal uncles and aunts, close friends of the bride.",
    materials: ["Blessing tray", "Travel plan", "A quiet room for the bride to rest"],
    historicalNote: "The entry into the groom’s home may happen the same day or later.",
    image: IMG.home,
    imageAlt: "Home doorway and warm interior",
    meyyappanTip: "Pack a small bag for the bride with medicines, a change of clothes, and the jewellery list.",
  },
];

export const CHECKLIST: ChecklistItem[] = [
  { id: "m-clan", house: "mappillai", label: "Speak with elders about clan / temple", ceremonySlug: "clan-temple" },
  { id: "m-attire", house: "mappillai", label: "Ready morai, salavai and chain", ceremonySlug: "prepare-mappillai", vendorId: "jewellery" },
  { id: "m-invite", house: "mappillai", label: "Finish invitation list", ceremonySlug: "invitation" },
  { id: "m-seer", house: "mappillai", label: "Agree seer trays with elders", ceremonySlug: "seer-gifts" },
  { id: "m-uppu", house: "mappillai", label: "Ask priest about uppu eduththal", ceremonySlug: "uppu-eduththal" },
  { id: "m-band", house: "mappillai", label: "Book nadaswaram & thavil", ceremonySlug: "temple-procession", vendorId: "band" },
  { id: "m-azhaippu", house: "mappillai", label: "Confirm azhaippu meeting point", ceremonySlug: "mappillai-azhaippu" },
  { id: "m-maalai", house: "mappillai", label: "Garlands for maalai maatral", ceremonySlug: "maalai-maatral" },
  { id: "m-oonjal", house: "mappillai", label: "Oonjal or seated blessing plan", ceremonySlug: "oonjal" },
  { id: "m-muhurtham", house: "mappillai", label: "Kaluthiru in groom’s hand at muhurtham", ceremonySlug: "muhurtham", vendorId: "jewellery" },
  { id: "m-register", house: "mappillai", label: "Legal marriage registration appointment", ceremonySlug: "marriage-document" },
  { id: "m-moi", house: "mappillai", label: "Assign moi notebook keeper", ceremonySlug: "moi" },
  { id: "m-home", house: "mappillai", label: "Plan bride’s welcome at home", ceremonySlug: "grihapravesham" },
  { id: "m-feast", house: "mappillai", label: "Feast / reception plan", ceremonySlug: "feast-blessings", vendorId: "catering" },
  { id: "p-clan", house: "ponnu", label: "Elders confirm alliance & temple notes", ceremonySlug: "clan-temple" },
  { id: "p-bride", house: "ponnu", label: "Bride attire and jewellery ready", ceremonySlug: "prepare-bride", vendorId: "jewellery" },
  { id: "p-seer", house: "ponnu", label: "Arrange seer display", ceremonySlug: "seer-display" },
  { id: "p-kolam", house: "ponnu", label: "Kolam, lamps and welcome path", ceremonySlug: "home-kolam", vendorId: "mandapam" },
  { id: "p-azhaippu", house: "ponnu", label: "Who will welcome the mappillai", ceremonySlug: "mappillai-azhaippu", vendorId: "band" },
  { id: "p-pen", house: "ponnu", label: "Pen eduththu kattuthal plan", ceremonySlug: "pen-eduththu" },
  { id: "p-nalangu", house: "ponnu", label: "Nalangu time and materials", ceremonySlug: "nalangu" },
  { id: "p-maalai", house: "ponnu", label: "Spare garlands for maalai maatral", ceremonySlug: "maalai-maatral" },
  { id: "p-oonjal", house: "ponnu", label: "Oonjal flowers, songs and seating", ceremonySlug: "oonjal" },
  { id: "p-kaluthiru", house: "ponnu", label: "Kaluthiru checked with priest", ceremonySlug: "kaluthiru", vendorId: "jewellery" },
  { id: "p-muhurtham", house: "ponnu", label: "Priest list for muhurtham", ceremonySlug: "muhurtham" },
  { id: "p-moi", house: "ponnu", label: "Moi book and catering lead", ceremonySlug: "moi-feast", vendorId: "catering" },
  { id: "p-send", house: "ponnu", label: "Send-off and rest plan for the bride", ceremonySlug: "send-off" },
];

export function ceremoniesFor(house: HouseId): Ceremony[] {
  return (house === "mappillai" ? MAPPILLAI_CEREMONIES : PONNU_CEREMONIES).slice().sort((a, b) => a.order - b.order);
}

export function getCeremony(house: HouseId, slug: string): Ceremony | undefined {
  return ceremoniesFor(house).find((c) => c.slug === slug);
}

export function nextCeremony(house: HouseId, slug: string): Ceremony | undefined {
  const list = ceremoniesFor(house);
  const i = list.findIndex((c) => c.slug === slug);
  return i >= 0 ? list[i + 1] : undefined;
}

export function checklistFor(house: HouseId): ChecklistItem[] {
  return CHECKLIST.filter((c) => c.house === house || c.house === "both");
}
