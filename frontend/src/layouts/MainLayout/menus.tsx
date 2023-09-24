import {
  MdSupervisorAccount,
  MdRequestQuote,
  MdInsertInvitation,
  MdMap,
} from "react-icons/md";

import roles from "utils/roles";

export const menus = [
  {
    url: "/quote",
    label: "Quotes",
    icon: <MdRequestQuote />,
    roles: [roles.admin, roles.mad, roles.ecr],
  },
  {
    url: "/user",
    label: "Users",
    icon: <MdSupervisorAccount />,
    roles: [roles.admin],
  },
  {
    url: "/invitation",
    label: "Invitations",
    icon: <MdInsertInvitation />,
    roles: [roles.admin],
  },
  {
    url: "/state",
    label: "States",
    icon: <MdMap />,
    roles: [roles.admin],
  },
];
