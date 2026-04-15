export const navigation = [
  {
    key: "dashboard",
    label: "Dashboard",
    to: "/app",
    children: [{ label: "Home", to: "/app" }],
  },
  {
    key: "contracts",
    label: "Contracten",
    to: "/app/contracts",
    children: [
      { label: "Overzicht", to: "/app/contracts" },
      { label: "Nieuw contract", to: "/app/contracts/new" },
      { label: "Actief", to: "/app/contracts/active" },
      { label: "Afgesloten", to: "/app/contracts/closed" },
    ],
  },
  {
    key: "hours",
    label: "Uren",
    to: "/app/time-entries",
    children: [
      { label: "Nieuwe boeking", to: "/app/time-entries/new" },
      { label: "Mijn uren", to: "/app/time-entries" },
      { label: "Goedkeuren", to: "/app/time-entries/approvals" },
    ],
  },
  {
    key: "invoices",
    label: "Facturen",
    to: "/app/invoices",
    children: [
      { label: "Overzicht", to: "/app/invoices" },
      { label: "Concepten", to: "/app/invoices/drafts" },
      { label: "Verzonden", to: "/app/invoices/sent" },
      { label: "Betaald", to: "/app/invoices/paid" },
    ],
  },
  {
    key: "admin",
    label: "Beheer",
    to: "/app/admin/users",
    roles: ["ADMIN", "SUPER_ADMIN"],
    children: [
      { label: "Gebruikers", to: "/app/admin/users" },
      { label: "Uitnodigingen", to: "/app/admin/invitations" },
      { label: "Roltoewijzingen", to: "/app/admin/role-assignments" },
      { label: "Mijn account", to: "/app/admin/account" },
    ],
  },
];