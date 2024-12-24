/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import {
  Navbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  Collapse,
  MenuHandler,
  ListItem,
  Menu,
} from "@material-tailwind/react";

import { Link, useLocation } from "react-router-dom";

import Cookies from "js-cookie";

import Profile from "../Profile/Profile";

import { jwtDecode } from "jwt-decode";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import cartechlogo2 from "/cars/cartechlogo2.png";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  // eslint-disable-next-line no-unused-vars

  const DealerId = token ? jwtDecodes?.dealerId : null;
  // const userid = token ? jwtDecodes?.userId : null;
  const InspectorProfileId = token ? jwtDecodes?.inspectorProfileId : null;

  const salesPersonId = token ? jwtDecodes?.salesPersonId : null;

  const UserId = token ? jwtDecodes?.userId : null;
  const userProfileId = token ? jwtDecodes?.userProfileId : null;

  const location = useLocation();

  const handleMenuItemClick = () => {
    setOpenNav(false);
  };

  const active = location.pathname === `/dealer/${jwtDecodes?.dealerId}`;
  function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navListMenuItems = [
      {
        title: "Bidding Car",
        link:
          userRole === "DEALER"
            ? "/dealer/biddingcar"
            : userRole === "ADMIN"
            ? "/admin/biddingcar"
            : userRole === "SALESPERSON"
            ? "/sales/biddingcar"
            : null,
      },
    ];
    if (userRole === "ADMIN") {
      navListMenuItems.unshift(
        {
          title: "Dashboard",

          link: `/`,
        },
        {
          title: "Car Models",
          link: "/carlistmodel",
        },

        {
          title: "Car Colors",
          link: "/admin/addcolor",
        },

        // {
        //   title: "User Request",
        //   link: "/Admin/UserRequest",
        // },
        {
          title: "Premium Car List",
          link: "/carlistadmin",
        },
        {
          title: "B2B Cars",
          link: "/adminB2B",
        }
      );
    }

    if (userRole === "DEALER") {
      navListMenuItems.unshift(
        {
          title: "Cars",
          link: `/dealer/${jwtDecodes?.dealerId}`,
        },
        {
          title: "Premium Cars",
          link: `/dealer/premium/${jwtDecodes?.dealerId}`,
        },
        {
          title: "Winner Section",
          link: `/dealer/winnersection`,
        },
      );
    }
    if (userRole === "SALESPERSON") {
      navListMenuItems.unshift(
        {
          title: "B2B",
          link: `/Seller/b2b/pending`,
        },
       
      );
    }
    const renderItems = navListMenuItems.map(({ title, link }, key) => (
      <Link to={link} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg hover:bg-[#2d3483]">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-normal text-white"
            >
              {title}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ));

    return (
      <React.Fragment>
        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className={`flex items-center gap-2 p-3 font-medium text-white hover:bg-indigo-400`}
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                Dashboard
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-[#626deb] border-none">
            <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
              {renderItems}
            </ul>
          </MenuList>
        </Menu>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
        </div>
      </React.Fragment>
    );
  }
function PendingListMenu() {
  const [isMenuOpen1, setIsMenuOpen1] = useState(false);
  const [isMobileMenuOpen1, setIsMobileMenuOpen1] = useState(false);
  const navListMenuItems = [
  
  ];
  

  if (userRole === "DEALER") {
    navListMenuItems.unshift(
      {
        title: "Pending Request",
        link: `/dealer/${jwtDecodes?.dealerId}/allpending`,
      },
      {
        title: "B2B Pending Booking",
        link: `/dealer/${jwtDecodes?.dealerId}/b2bpending`,
      }
    );
  }
  const renderItems1 = navListMenuItems.map(({ title, link }, key) => (
    <Link to={link} key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg hover:bg-[#2d3483]">
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-normal text-white"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen1}
        handler={setIsMenuOpen1}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className={`flex items-center gap-2 p-3 font-medium text-white hover:bg-indigo-400`}
              selected={isMenuOpen1 || isMobileMenuOpen1}
              onClick={() => setIsMobileMenuOpen1((cur) => !cur)}
            >
              Pending Booking
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen1 ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen1 ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-[#626deb] border-none">
          <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
            {renderItems1}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen1}>{renderItems1}</Collapse>
      </div>
    </React.Fragment>
  );
}

function ConfermListMenu() {
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [isMobileMenuOpen2, setIsMobileMenuOpen2] = useState(false);
  const navListMenuItems = [];

  if (userRole === "DEALER") {
    navListMenuItems.unshift(
      {
        title: "Confirm Booking",
        link: `/dealer/${jwtDecodes?.dealerId}/booking/confirm`,
      },
      {
        title: "B2B Confirm Booking ",
        link: `/dealer/${jwtDecodes?.dealerId}/b2b/confirm`,
      }
    );
  }
  const renderItems2 = navListMenuItems.map(({ title, link }, key) => (
    <Link to={link} key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg hover:bg-[#2d3483]">
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-normal text-white"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen2}
        handler={setIsMenuOpen2}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className={`flex items-center gap-2 p-3 font-medium text-white hover:bg-indigo-400`}
              selected={isMenuOpen2 || isMobileMenuOpen2}
              onClick={() => setIsMobileMenuOpen2((cur) => !cur)}
            >
              Confirm Booking
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen2 ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen2 ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-[#626deb] border-none">
          <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
            {renderItems2}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen2}>{renderItems2}</Collapse>
      </div>
    </React.Fragment>
  );
}

  const adminDashboard = userRole?.includes("ADMIN") ? (
    <>
      

      <Link to={"/admin"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/admin"
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Dealers
        </Typography>
      </Link>
      <NavListMenu />

      <Link to={"/inspector"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/inspector"
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Inspectors
        </Typography>
      </Link>
      <Link to={"/admin/salesuser"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/admin/salesuser"
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Seller
        </Typography>
      </Link>

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  const inspectorDashboard = userRole?.includes("INSPECTOR") ? (
    <>
      <Link to={`/inspector/car`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === `/inspector/car`
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Cars
        </Typography>
      </Link>
      <Link to={`/inspector/user/cars`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === `/inspector/user/cars`
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          User Cars
        </Typography>
      </Link>
     
      {/* <NotificationDialog /> */}
    </>
  ) : null;

  const salePersonDashboard = userRole?.includes("SALESPERSON") ? (
    <>
      <Link to={"/sales/salesDealers"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/sales/salesDealers"
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Dealers
        </Typography>
      </Link>
      <Link to={`/seller/request/active`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === `/Seller/UserRequest`
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
         User Cars
        </Typography>
      </Link>
      <NavListMenu />

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  const dealerDashboard = userRole?.includes("DEALER") ? (
    <>
      <Link to={"/carlist"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/carlist"
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Buy Car
        </Typography>
      </Link>

      <Link to={`/dealer/B2B`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname ===
            `/dealer/B2B`
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          B2B
        </Typography>
      </Link>

      <Link to={"/dealer/live/cars"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/dealer/live/cars"
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
          onClick={handleMenuItemClick}
        >
          Live Cars
        </Typography>
      </Link>

      <NavListMenu />

      <PendingListMenu/>

      <ConfermListMenu/>

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  const userDashboard = userRole?.includes("USER") ? (
    <>
      <Link to={`/sellcarlist`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/sellcarlist"
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
        >
          Sell Car
        </Typography>
      </Link>

      <Link to={`/pendinrequest/${jwtDecodes?.userId}`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/pendinrequest"
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
        >
          All Request
        </Typography>
      </Link>

      {/* <Link to={`/user/booking/${jwtDecodes?.userId}`}>

        <Typography

          as="li"

          variant="small"

          color="blue-gray"

          className={`p-3 rounded-md font-normal ${window.location.pathname === `/user/booking/${jwtDecodes?.userId}` ? "bg-indigo-200 text-white" : ""}`}

        >

          Confirm Booking

        </Typography>

      </Link> */}

      <Link to={`/user/${jwtDecodes?.userId}/favorite`}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname ===
            `/dealer/${jwtDecodes?.userId}/booking/confirm`
              ? "bg-[#5e67c7] text-white"
              : ""
          }hover:bg-indigo-400`}
        >
          Favourite
        </Typography>
      </Link>

      {/* <NotificationDialog /> */}
    </>
  ) : null;

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    // if(location.pathname !== priv.location.pathname){
    //   window.scrollTo(0, 0);
    // }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 p-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to={"/"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/" ? "bg-[#5e67c7] text-white" : ""
          } hover:bg-indigo-400 `}
          onClick={handleMenuItemClick}
        >
          Home
        </Typography>
      </Link>

      <Link to={"/premiumcars"}>
        <Typography
          as="li"
          variant="small"
          color="white"
          className={`p-3 rounded-md font-normal ${
            window.location.pathname === "/premiumcars"
              ? "bg-[#5e67c7] text-white"
              : ""
          } hover:bg-indigo-400 `}
          onClick={handleMenuItemClick}
        >
          Premium Cars
        </Typography>
      </Link>

      {userRole == "DEALER" ||
      userRole == "INSPECTOR" ||
      userRole == "SALESPERSON" ? null : (
        <>
          <Link to={"/carlist"}>
            <Typography
              as="li"
              variant="small"
              color="white"
              className={`p-3 rounded-md font-normal ${
                window.location.pathname === "/carlist"
                  ? "bg-[#5e67c7] text-white"
                  : ""
              }hover:bg-indigo-400 `}
              onClick={handleMenuItemClick}
            >
              Buy Car
            </Typography>
          </Link>
          {/* <Link to={"/buypremiumcars"}>
            <Typography
              as="li"
              variant="small"
              color="white"
              className={`p-3 rounded-md font-normal ${
                window.location.pathname === "/dealer/live/cars"
                  ? "bg-[#5e67c7] text-white"
                  : ""
              }hover:bg-indigo-400`}
              onClick={handleMenuItemClick}
            >
              Buy Premium Car
            </Typography>
          </Link> */}
        </>
      )}
      {adminDashboard}
      {dealerDashboard}
      {userDashboard}
      {inspectorDashboard}
      {salePersonDashboard}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-[#8a90d4] border-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to={"/"}>
          {/* <Typography className="mr-4 cursor-pointer py-1.5 font-bold text-2xl ">
            CarTechIndia
          </Typography> */}
          <img
            src={cartechlogo2}
            alt="logo"
            className="w-12 lg:w-[70px] lg:h-[64px] "
          />
        </Link>

        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>

          <div className="flex items-center gap-x-1">
            {token ? (
              <Profile
                userId={UserId}
                dealer_id={DealerId}
                userrole={userRole}
                inspectorProfileId={InspectorProfileId}
                salesPersonId={salesPersonId}
                userProfileId={userProfileId}
              />
            ) : (
              <>
                <Link to="/signin">
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block text-white"
                  >
                    <span>Sign In</span>
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button
                    variant="gradient"
                    size="sm"
                    color="indigo"
                    className="hidden lg:inline-block bg-indigo-400"
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>

      <Collapse open={openNav}>
        {navList}
        {token ? null : (
          <div className="flex items-center gap-x-1">
            <Link to="/signin">
              <Button fullWidth variant="text" size="sm" className="">
                <span>Sign In</span>
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                fullWidth
                color="indigo"
                variant="gradient"
                size="sm"
                className=""
              >
                <span>Sign up</span>
              </Button>
            </Link>
          </div>
        )}
      </Collapse>
    </Navbar>
  );
}
