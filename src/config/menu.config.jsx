export const PRIMARY_MENU_SIDEBAR = [];

export const SECONDARY_MENU_SIDEBAR = [
  {
    title: "Home Page",
    icon: "home",
    children: [],
  },
  {
    title: "News",
    icon: "document",
    children: [
      {
        title: "News",
        path: "/news",
      },
      {
        title: "Add news",
        path: "/news/add-news",
        disabled: true,
      },
      {
        title: "Edit news",
        path: "/news/edit-news",
        disabled: true,
      },
      {
        title: "News Categories",
        path: "/news/news-categories",
      },
    ],
  },
  {
    title: "Jobs",
    icon: "briefcase",
    children: [
      {
        title: "Jobs",
        path: "/jobs",
      },
      {
        title: "Add Job",
        path: "/jobs/add-job",
        disabled: true,
      },
      {
        title: "Edit Job",
        path: "/jobs/edit-job",
        disabled: true,
      },
      {
        title: "Job Applications",
        path: "/job-applications",
      },
    ],
  },
];

export const SETTING_MENU_SIDEBAR = [
  {
    title: "Site settings",
    icon: "setting",
    children: [
      {
        title: "Settings",
        path: "/settings",
      },
      {
        title: "Contact",
        path: "/contact",
      },
    ],
  },
];

export const MENU_MEGA = [];
export const MENU_ROOT = [];
