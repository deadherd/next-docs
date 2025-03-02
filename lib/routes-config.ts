// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Introduction",
    href: "/introduction",
    noLink: true,
    items: [
      { title: "Welcome", href: "/welcome" },
      { title: "Artificial Reality", href: "/artificial-reality" },
      { title: "Cryotech", href: "/cryotech" },
      { title: "Workforce", href: "/workforce" },
      { title: "Workpaths", href: "/workpaths" },
    ],
  },
  {
    title: "The Arxpanse",
    href: "/arxpanse",
    noLink: true,
    items: [
      { title: "Artificial Reality X (ARX)", href: "/artificial-reality-x" },
      { title: "Artificial Reality", href: "/artificial-reality" },
      { title: "Board, The", href: "/board" },
      { title: "Deadnet", href: "/deadnet" },
      { title: "Scramble, The", href: "/scramble" },
      { title: "System, The", href: "/system" },
      {
        title: "Characters",
        href: "/characters",
        noLink: true,
        items: [
          { title: "Deadherd", href: "/deadherd" },
          { title: "BUD-E", href: "/bud-e" },
        ],
      },
      {
        title: "Factions",
        href: "/factions",
        noLink: true,
        items: [
          { title: "Chromecutters", href: "/chromecutters" },
          { title: "Datapriests", href: "/datapriests" },
          { title: "Dreamsmiths", href: "/dreamsmiths" },
          { title: "Lightbenders", href: "/lightbenders" },
          { title: "Oathkeepers", href: "/oathkeepers" },
          { title: "Netrunners", href: "/netrunners" },
          { title: "Neuromancers", href: "/neuromancers" },
          { title: "Terraformers", href: "/terraformers" },
        ],
      },
      {
        title: "Locations",
        href: "/locations",
        noLink: true,
        items: [
          { title: "Astrolux Station", href: "/astrolux" },
          { title: "Freezer Belt", href: "/freezer-belt" },
          { title: "Silver Sands", href: "/silver-sands" },
          { title: "Spires", href: "/spires" },
        ],
      },
      {
        title: "Products",
        href: "/products",
        noLink: true,
        items: [{ title: "DreamVault", href: "/dreamvault" }],
      },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
