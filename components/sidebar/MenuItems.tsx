import {
  Home as HomeIcon,
  LibraryMusic as SongsIcon,
  AccessTime as RecentlyAddedIcon,
  Album as AlbumsIcon,
  Star as FavoriteIcon,
  GridView as PlaylistsIcon,
  Apps as NewIcon,
} from "@mui/icons-material";
import { routes } from "../../utils/constants";

const SIDEBAR_ICON_SIZE = 15;
const SIDEBAR_ICON_COLOR = "#A06BAF";

export const menuItems = [
  {
    text: "Home",
    icon: (
      <HomeIcon
        sx={{ color: SIDEBAR_ICON_COLOR, fontSize: SIDEBAR_ICON_SIZE }}
      />
    ),
    link: "/",
  },
  {
    text: "New",
    icon: (
      <NewIcon
        sx={{ color: SIDEBAR_ICON_COLOR, fontSize: SIDEBAR_ICON_SIZE }}
      />
    ),
    link: "/",
  },
  { divider: true },
  { header: "Library" },
  {
    text: "Songs",
    icon: (
      <SongsIcon
        sx={{ color: SIDEBAR_ICON_COLOR, fontSize: SIDEBAR_ICON_SIZE }}
      />
    ),
    link: routes.albums,
  },
  {
    text: "Recently Added",
    icon: (
      <RecentlyAddedIcon
        sx={{ color: SIDEBAR_ICON_COLOR, fontSize: SIDEBAR_ICON_SIZE }}
      />
    ),
    link: routes.albums,
  },
  {
    text: "Albums",
    icon: (
      <AlbumsIcon
        sx={{ color: SIDEBAR_ICON_COLOR, fontSize: SIDEBAR_ICON_SIZE }}
      />
    ),
    link: routes.albums,
  },
  {
    text: "Favourite Songs",
    icon: (
      <FavoriteIcon
        sx={{ color: SIDEBAR_ICON_COLOR, fontSize: SIDEBAR_ICON_SIZE }}
      />
    ),
    link: routes.albums,
  },
  {
    text: "All Playlists",
    icon: (
      <PlaylistsIcon
        sx={{ color: SIDEBAR_ICON_COLOR, fontSize: SIDEBAR_ICON_SIZE }}
      />
    ),
    link: routes.albums,
  },
];
